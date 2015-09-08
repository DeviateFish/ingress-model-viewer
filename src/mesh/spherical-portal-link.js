import Mesh from '../mesh';
import VertexAttribute from '../vertex-attribute';
import GLIndex from '../gl/gl-index';
import GLAttribute from '../gl/gl-attribute';
import { vec2, vec3, vec4, mat4 } from 'gl-matrix';

const _chunkSize = 13;
const baseColor = vec4.fromValues(0.46, 0.18, 0.18, 1.0);
const baseOffset = vec4.create();

function clampedSin(f)
{
  return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
}

function getBearing(start, end) {
  var s = start[0],
      e = end[0],
      dl = (end[1] - start[1]);
  var y = Math.sin(dl) * Math.cos(e),
      x = Math.cos(s) * Math.sin(e) - Math.sin(s) * Math.cos(e) * Math.cos(dl);

  return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
}

function dest(p, bearing, angle) {
  var lat = Math.asin(Math.sin(p[0]) * Math.cos(angle) + Math.cos(p[0]) * Math.sin(angle) * Math.cos(bearing)),
      lon = p[1] + Math.atan2(Math.sin(bearing) * Math.sin(angle) * Math.cos(p[0]), Math.cos(angle) - Math.sin(p[0]) * Math.sin(lat));

  lon = (lon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
  return vec2.fromValues(lat, lon);
}

function buildMatrix(s, e, radius) {
  var mat = mat4.create();
  mat4.rotateY(mat, mat, s[1]);
  mat4.rotateZ(mat, mat, s[0] - Math.PI / 2);
  mat4.rotateY(mat, mat, -getBearing(s, e));
  mat4.translate(mat, mat, [0, radius, 0]);
  return mat;
}

function getRadialDistance(s, e) {
  var dLat = e[0] - s[0],
      dLon = e[1] - s[1];

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(s[0]) * Math.cos(e[0]) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRadians(point) {
  return vec2.fromValues(point[0] * Math.PI / 180, point[1] * Math.PI / 180);
}

function fillChunk(buf, index, pos, uv, normal, f6, color)
{
  var off = index * _chunkSize;
  vec3.normalize(normal, normal);
  buf[off + 0] = pos[0];
  buf[off + 1] = pos[1];
  buf[off + 2] = pos[2];
  buf[off + 3] = f6;
  buf[off + 4] = uv[0];
  buf[off + 5] = uv[1];
  buf[off + 6] = normal[0];
  buf[off + 7] = normal[1];
  buf[off + 8] = normal[2];
  buf[off + 9] = color[0];
  buf[off + 10] = color[1];
  buf[off + 11] = color[2];
  buf[off + 12] = color[3];
}

// start and end should probably be in radians?
function _generateLinkAttributes(radius, start, end, color, startPercent, endPercent) {
  var s = toRadians(start);
  var e = toRadians(end);
  var angle = getRadialDistance(s, e);
  var bearing = getBearing(s, e);
  var length = angle * radius;
  var segments = Math.max(Math.floor(angle / Math.PI * 50) + 1, 8); // 50 segments for a half-circle sounds good, I guess.
  startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
  endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
  var values = new Float32Array(segments * _chunkSize * 6);
  var yMin = baseOffset[1],
    yMax = yMin + Math.min(radius * 0.01, 0.08 * length),
    avgPercent = (startPercent + endPercent) / 2.0,
    f6 = 0.01 * length,
    f7 = 0.1 + avgPercent * 0.3,
    up = vec3.fromValues(0, 1, 0),
    right = vec3.fromValues(0, 0, 1);
  var step = segments * 2;
  for(var i = 0; i < segments; i++)
  {
    var f8 = i / (segments - 1),
      f9 = startPercent + f8 * (endPercent - startPercent),
      f10 = 0.6 + 0.35 * f9,
      // v as in "uv" as in texcoords
      v = f8 * f6,
      // "current" point in progression
      curr = f8 === 0 ? s : dest(s, bearing, angle * f8),
      // "next" point in the progression
      next = dest(s, bearing, angle * (f8 + 1 / (segments - 1))),
      transform = buildMatrix(curr, next, radius),
      // "height" of the centerpoint of the link.
      h = vec3.fromValues(0, yMin + (3.0 + (-1.5 * Math.pow(clampedSin(2.0 * Math.abs(f8 - 0.5)), 4))) * (yMax - yMin), 0),
      // "radius" of the link
      w = radius * 0.01 * clampedSin(1.0 - 2.0 * Math.abs(f8 - 0.5)),
      wUp = vec3.fromValues(0, w, 0),
      wRight = vec3.fromValues(0, 0, w),
      cl = vec4.lerp(vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
    cl[3] = f10;

    // top horizontal segment
    // right point
    fillChunk(values, (i * 2),
      vec3.transformMat4(vec3.create(), vec3.add(vec3.create(), h, wRight), transform),
      vec2.fromValues(0, v),
      vec3.transformMat4(vec3.create(), up, transform),
      f7,
      cl);
    // left point
    fillChunk(values, (i * 2) + 1,
      vec3.transformMat4(vec3.create(), vec3.subtract(vec3.create(), h, wRight), transform),
      vec2.fromValues(0.5, v),
      vec3.transformMat4(vec3.create(), up, transform),
      f7,
      cl);

    // top vertical segment
    fillChunk(values, step + (i * 2),
      vec3.transformMat4(vec3.create(), vec3.add(vec3.create(), h, wUp), transform),
      vec2.fromValues(0, v),
      vec3.transformMat4(vec3.create(), right, transform),
      f7,
      cl);
    fillChunk(values, step + (i * 2) + 1,
      vec3.transformMat4(vec3.create(), vec3.subtract(vec3.create(), h, wUp), transform),
      vec2.fromValues(0.5, v),
      vec3.transformMat4(vec3.create(), right, transform),
      f7,
      cl);

    // bottom vertical segment
    fillChunk(values, 2 * step + (i * 2),
      vec3.transformMat4(vec3.create(), vec3.subtract(vec3.create(), h, wUp), transform),
      vec2.fromValues(0.5, v),
      vec3.transformMat4(vec3.create(), right, transform),
      f7,
      cl);
    fillChunk(values, 2 * step + (i * 2) + 1,
      vec3.transformMat4(vec3.create(), vec3.fromValues(0, 0, 0), transform),
      vec2.fromValues(1.0, v),
      vec3.transformMat4(vec3.create(), right, transform),
      f7,
      cl);
  }
  return values;
}

function _generateFaces(vertexOffset, segments) {
  var ind = new Uint16Array(6 * (segments - 1) * 3),
      iOff = 0;
  for(var i = 0; i < 3; i++) {

    for(var j = 0; j < segments - 1; j++) {

      ind[iOff + 0] = vertexOffset + 1;
      ind[iOff + 1] = vertexOffset + 0;
      ind[iOff + 2] = vertexOffset + 2;
      ind[iOff + 3] = vertexOffset + 1;
      ind[iOff + 4] = vertexOffset + 2;
      ind[iOff + 5] = vertexOffset + 3;
      vertexOffset += 2;
      iOff += 6;
    }
    vertexOffset += 2;
  }

  return ind;
}

/**
 * A SphereicalPortalLinkMesh is a Mesh that represents a portal link betwen two portals
 * on the surface of a sphere
 *
 * @extends {Mesh}
 */
class SphericalPortalLinkMesh extends Mesh {

  /**
   * Construct a spherical portal link
   * @param  {context} gl          WebGL context
   * @param  {Number} sphereRadius Radius of the sphere
   * @param  {vec2} start          lat,lng of the origin point
   * @param  {vec2} end            lat,lng of the destionation point
   * @param  {vec4} color          Color of the link
   * @param  {Number} startPercent Origin portal health percentage
   * @param  {Number} endPercent   Destination portal health percentage
   */
  constructor(gl, sphereRadius, start, end, color, startPercent, endPercent) {
    var buf = _generateLinkAttributes(sphereRadius, start, end, color, startPercent, endPercent);
    var len = buf.length, segments = Math.floor(len / _chunkSize / 6);
    var ind = _generateFaces(0, segments);
    var attributes = [];
    attributes.push(new VertexAttribute('a_position', 4));
    attributes.push(new VertexAttribute('a_texCoord0', 2));
    attributes.push(new VertexAttribute('a_normal', 3));
    attributes.push(new VertexAttribute('a_color', 4));
    var attribute = new GLAttribute(gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new GLIndex(gl, ind, gl.TRIANGLES);
    super(gl, attribute, faces);
    return this;
  }
}

export default SphericalPortalLinkMesh;
