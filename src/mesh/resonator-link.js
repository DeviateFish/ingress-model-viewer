import Mesh from '../mesh';
import VertexAttribute from '../vertex-attribute';
import GLIndex from '../gl/gl-index';
import GLAttribute from '../gl/gl-attribute';
import { vec2, vec3, vec4 } from 'gl-matrix';

// TODO: Parameterize this concept a little better
// this has potential to be a really flexible and powerful way of
// making, essentially, extruded geometry.

// 5 sets of 4 points, breaking the link into 4 pieces, each providing 4 faces
// chunksize is size of each element in the packed vertex array, in bytes
var _len = 5, _size = _len * 4, _chunkSize = 12;
var j = new Array(_len),
  k = new Array(_len),
  l = new Array(_len);

function clampedSin(f)
{
  return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
}

for(var i = 0; i < _len; i++)
{
  var f = i / 4.0;
  j[i] = f;
  l[i] = 3.5 * Math.max(1.0 - Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4.0), 0.2);
  k[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
}

const BASE_COLOR = vec4.fromValues(0.78, 0.31, 0.31, 1.0);
const RESONATOR_MID_OFFSET = 0;
const PORTAL_BASE_OFFSET = 0;
const UP = vec3.fromValues(0, 1, 0);

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

function _generateLinkAttributes(portal, resonator, color, resonatorPercent) {
  resonatorPercent = resonatorPercent === undefined ? 1 : Math.max(Math.min(resonatorPercent, 1), 0);
  var values = new Float32Array(_size * _chunkSize);
  var dist = Math.sqrt(
    (resonator[0] - portal[0]) * (resonator[0] - portal[0]) +
    (resonator[1] - portal[1]) * (resonator[1] - portal[1])
  );
  var f4 = (2 / 30) * dist,
    f5 = 0.9 + 0.1 * resonatorPercent,
    f6 = 0.65 + 0.35 * resonatorPercent,
    f8 = 0.1 + 0.3 * resonatorPercent;
  var cl = vec4.lerp(vec4.create(), BASE_COLOR, color, 0.1 + resonatorPercent * 0.85);
  cl[3] = 0.75 + 0.25 * resonatorPercent * cl[3];
  var vec = vec3.fromValues(resonator[0], 0, resonator[1]);
  vec3.subtract(vec, vec, vec3.fromValues(portal[0], 0, portal[1]));
  var right = vec3.cross(vec3.create(), vec, UP);
  vec3.normalize(right, right);
  var step = _len * 2;
  var f10 = 5.0 * ((portal[0] + portal[1]) - Math.floor(portal[0] + portal[1]));
  for(var i = 0; i < _len; i++)
  {
    var f11 = j[i],
      f12 = portal[0] + f11 * vec[0],
      f13 = portal[1] + f11 * vec[2],
      f14 = PORTAL_BASE_OFFSET + f11 * (RESONATOR_MID_OFFSET - PORTAL_BASE_OFFSET) + f5 * k[i],
      f15 = f6 * l[i],
      f16 = f11 * f4;
    fillChunk(values, (i * 2) + 0, f12 + f15 * right[0], f14, f13 + f15 * right[2], 0.0, f16 + f10, UP, f8, cl);
    fillChunk(values, (i * 2) + 1, f12 - f15 * right[0], f14, f13 - f15 * right[2], 1.0, f16 + f10, UP, f8, cl);
    fillChunk(values, step + (i * 2) + 0, f12, f14 + f15, f13, 0.0, f16 + f10, right, f8, cl);
    fillChunk(values, step + (i * 2) + 1, f12, f14 - f15, f13, 1.0, f16 + f10, right, f8, cl);
  }
  return values;
}

function _generateFaces(vertexOffset) {
  var ind = new Uint16Array(48),
    iOff = 0;

  for(i = 0; i < 2; i++)
  {
    for(var i2 = 0; i2 < _len - 1; i2++)
    {
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
 * A ResonatorLinkMesh is a Mesh that represents a single link between a portal and a resonator
 *
 * TODO: Make disco
 *
 * @extends {Mesh}
 */
class ResonatorLinkMesh extends Mesh {

  /**
   * Construct a resonator link mesh
   * @param  {context} gl              WebGL context
   * @param  {vec2} portalPosition     X,Z of the portal
   * @param  {Number} slot             Resonator slot (0-7)
   * @param  {Number} distance         Distance from the portal
   * @param  {vec4} color              Color of the resonator link
   * @param  {Number} resonatorPercent Percent health of the resonator
   */
  constructor(gl, portalPosition, slot, distance, color, resonatorPercent) {
    var theta = slot / 8 * 2 * Math.PI;
    var end = vec2.create();
    var relative = vec2.fromValues(distance * Math.cos(theta), distance * Math.sin(theta));
    vec2.add(end, portalPosition, relative);
    var buf = _generateLinkAttributes(portalPosition, end, color, resonatorPercent);
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

export default ResonatorLinkMesh;
