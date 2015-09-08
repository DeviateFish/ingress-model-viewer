import Mesh from '../mesh';
import VertexAttribute from '../vertex-attribute';
import GLIndex from '../gl/gl-index';
import GLAttribute from '../gl/gl-attribute';
import { vec3 } from 'gl-matrix';

// part of doing away with the THREE.js dependency
// means giving up a lot of helper code for doing things
// like this.
//
// Needless to say, this borrows heavily from THREE.SphereGeometry
// https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js
function createSphere(radius, phiSlices, thetaSlices) {
  var i, j, u, v, vec, v1, v2, v3, v4,
      verticesRow, faces,
      phi = Math.PI * 2,
      theta = Math.PI,
      // size is 8 for vec3 a_position + vec2 a_texCoord + vec3 a_normal
      values = new Float32Array((phiSlices + 1) * (thetaSlices + 1) * 8),
      faceArray = [],
      vertices = [],
      aIdx = 0,
      attributes = [];
  phiSlices = Math.max(3, phiSlices || 8);
  thetaSlices = Math.max(2, thetaSlices || 6);

  for(i = 0; i <= phiSlices; i++) {
    verticesRow = [];
    for(j = 0; j <= thetaSlices; j++)
    {
      u = j / phiSlices;
      v = i / thetaSlices;
      vec = vec3.fromValues(
        -radius * Math.cos(u * phi) * Math.sin(v * theta),
        radius * Math.cos(v * theta),
        radius * Math.sin(u * phi) * Math.sin(v * theta)
      );

      values[aIdx * 8 + 0] = vec[0];
      values[aIdx * 8 + 1] = vec[1];
      values[aIdx * 8 + 2] = vec[2];
      values[aIdx * 8 + 3] = u;
      values[aIdx * 8 + 4] = v;
      // normalized:
      vec3.normalize(vec, vec);
      values[aIdx * 8 + 5] = vec[0];
      values[aIdx * 8 + 6] = vec[1];
      values[aIdx * 8 + 7] = vec[2];

      verticesRow.push(aIdx++);
    }
    vertices.push(verticesRow);
  }

  for(i = 0; i < phiSlices; i++) {
    for(j = 0; j < thetaSlices; j++) {
      v1 = vertices[i][j + 1];
      v2 = vertices[i][j];
      v3 = vertices[i + 1][j];
      v4 = vertices[i + 1][j + 1];

      if(Math.abs(values[v1 * 8 + 1]) === radius) {
        faceArray.push.apply(faceArray, [v1, v3, v4]);
        values[v1 * 8 + 3] = (values[v1 * 8 + 3] + values[v2 * 8 + 3]) / 2;
      }
      else if(Math.abs(values[v3 * 8 + 1]) === radius) {
        faceArray.push.apply(faceArray, [v1, v2, v3]);
        values[v3 * 8 + 3] = (values[v3 * 8 + 3] + values[v4 * 8 + 3]) / 2;
      }
      else {
        faceArray.push.apply(faceArray, [v1, v2, v4]);
        faceArray.push.apply(faceArray, [v2, v3, v4]);
      }
    }
  }

  faces = new Uint16Array(faceArray.length);
  faceArray.forEach(function(v, i) {
    faces[i] = v;
  });
  attributes.push(new VertexAttribute('a_position', 3));
  attributes.push(new VertexAttribute('a_texCoord0', 2));
  attributes.push(new VertexAttribute('a_normal', 3));
  return {
    values: values,
    faces: faces,
    attributes: attributes
  };
}

/**
 * A SphereMesh is a Mesh that is a sphere, made of a number of quads determined
 * by the number of horizontal and vertical slices involved in its construction
 *
 * @extends {Mesh}
 */
class SphereMesh extends Mesh {

  /**
   * Construct a sphere
   * @param  {context} gl     WebGL context
   * @param  {Number} radius  Radius of the sphere
   * @param  {Number} vSlices Number of vertical slices
   * @param  {Number} hSlices Number of horizontal slices
   */
  constructor(gl, radius, vSlices, hSlices) {
    var parsed = createSphere(radius, vSlices, hSlices);
    var attributes = new GLAttribute(gl, parsed.attributes, parsed.values);
    var faces = new GLIndex(gl, parsed.faces, gl.TRIANGLES);
    super(gl, attributes, faces);
  }
}

export default SphereMesh;
