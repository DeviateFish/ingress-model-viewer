import Mesh from '../mesh';
import VertexAttribute from '../vertex-attribute';
import GLIndex from '../gl/gl-index';
import GLAttribute from '../gl/gl-attribute';
import { vec3, vec4 } from 'gl-matrix';

// TODO: Parameterize this concept a little better
// this has potential to be a really flexible and powerful way of
// making, essentially, extruded geometry.

// 9 sets of 6 points, breaking the link into 8 pieces, each providing 6 faces, something like that?
var _len = 9, _size = _len * 6, _chunkSize = 12;
var c = new Array(_len),
  d = new Array(_len),
  e = new Array(_len);

var baseColor = vec4.fromValues(0.46, 0.18, 0.18, 1.0);
var baseOffset = vec4.create();

function clampedSin(f)
{
  return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
}

for(var i = 0; i < _len; i++)
{
  var f = i / 8.0;
  c[i] = f;
  e[i] = (3.0 + (-1.5 * Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4)));
  d[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
}

function fillChunk(buf, index, x, y, z, u, v, normal, f6, color)
{
  var off = index * _chunkSize;
  buf[off + 0] = x;
  buf[off + 1] = y;
  buf[off + 2] = z;
  buf[off + 3] = f6;
  buf[off + 4] = u;
  buf[off + 5] = v;
  buf[off + 6] = normal[0];
  buf[off + 7] = normal[2];
  buf[off + 8] = color[0];
  buf[off + 9] = color[1];
  buf[off + 10] = color[2];
  buf[off + 11] = color[3];
}

function _generateLinkAttributes(start, end, color, startPercent, endPercent) {
  startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
  endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
  var values = new Float32Array(_size * _chunkSize);
  var length = Math.sqrt((end[0] - start[0]) * (end[0] - start[0]) + (end[1] - start[1]) * (end[1] - start[1]));
  var yMin = baseOffset[1],
    yMax = yMin + Math.min(30.0, 0.08 * length),
    avgPercent = (startPercent + endPercent) / 2.0,
    f6 = 0.01 * length,
    f7 = 0.1 + avgPercent * 0.3;
  var vec = vec3.fromValues(end[0], 0, end[1]);
  vec3.subtract(vec, vec, vec3.fromValues(start[0], 0, start[1]));
  var up = vec3.fromValues(0, 1, 0);
  var right = vec3.cross(vec3.create(), vec, up);
  vec3.normalize(right, right);
  var step = _len * 2;
  for(var i = 0; i < _len; i++)
  {
    var f8 = c[i],
      f9 = startPercent + f8 * (endPercent - startPercent),
      f10 = 0.6 + 0.35 * f9,
      f12 = f8 * f6,
      f13 = start[0] + f8 * vec[0],
      f14 = start[1] + f8 * vec[2],
      f15 = yMin + d[i] * (yMax - yMin),
      f16 = e[i];
    var cl = vec4.lerp(vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
    cl[3] = f10;
    fillChunk(values, (i * 2), f13 + f16 * right[0], f15, f14 + f16 * right[2], 0, f12, up, f7, cl);
    fillChunk(values, (i * 2) + 1, f13 - f16 * right[0], f15, f14 - f16 * right[2], 0.5, f12, up, f7, cl);
    fillChunk(values, step + (i * 2), f13, f15 + f16, f14, 0, f12, right, f7, cl);
    fillChunk(values, step + (i * 2) + 1, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
    fillChunk(values, 2 * step + (i * 2), f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
    fillChunk(values, 2 * step + (i * 2) + 1, f13, 0, f14, 1.0, f12, right, f7, cl);
  }
  return values;
}

function _generateFaces(vertexOffset) {
  var ind = new Uint16Array(144),
      iOff = 0;
  for(var i = 0; i < 3; i++) {

    for(var j = 0; j < _len - 1; j++) {

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
 * A PortalLinkMesh represents the mesh for a single portal link.
 *
 * @extends {Mesh}
 */
class PortalLinkMesh extends Mesh {

  /**
   * Programatically constructs the mesh for a link between two points
   * @param  {context} gl          WebGL context
   * @param  {vec2} start          X,Z of the origin point
   * @param  {vec2} end            X,Z of the destination point
   * @param  {vec4} color          Color of the link
   * @param  {Number} startPercent Origin point percentage
   * @param  {Number} endPercent   Destination point percentage
   */
  constructor(gl, start, end, color, startPercent, endPercent) {
    var buf = _generateLinkAttributes(start, end, color, startPercent, endPercent);
    var ind = _generateFaces(0);
    var attributes = [];
    attributes.push(new VertexAttribute('a_position', 4));
    attributes.push(new VertexAttribute('a_texCoord0', 4));
    attributes.push(new VertexAttribute('a_color', 4));
    var attribute = new GLAttribute(gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new GLIndex(gl, ind, gl.TRIANGLES);
    super(gl, attribute, faces);
  }
}

export default PortalLinkMesh;
