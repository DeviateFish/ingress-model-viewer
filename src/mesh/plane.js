import Mesh from '../mesh';
import VertexAttribute from '../vertex-attribute';
import GLIndex from '../gl/gl-index';
import GLAttribute from '../gl/gl-attribute';

/**
 * A PlaneMesh is a Mesh that represents a unit square plane, centered on
 * 0,0.  Consists of a single quad.
 *
 * @extends {Mesh}
 */
class PlaneMesh extends Mesh {

  /**
   * Construct a sphere
   * @param  {context} gl     WebGL context
   */
  constructor(gl) {
    var attributes = [];
    attributes.push(new VertexAttribute('a_position', 3));
    attributes.push(new VertexAttribute('a_texCoord0', 2));
    var values = new Float32Array(4 * 5);  // 4 vertices, 5 bytes each.
    var faces = new Uint16Array(2 * 3); // two triangles

    // Upper left:
    values[0] = -0.5;
    values[1] = 0;
    values[2] = 0.5;
    values[3] = 0;
    values[4] = 0;
    // Upper right:
    values[5] = 0.5;
    values[6] = 0;
    values[7] = 0.5;
    values[8] = 1;
    values[9] = 0;
    // Lower left:
    values[10] = -0.5;
    values[11] = 0;
    values[12] = -0.5;
    values[13] = 0;
    values[14] = 1;
    // Lower right:
    values[15] = 0.5;
    values[16] = 0;
    values[17] = -0.5;
    values[18] = 1;
    values[19] = 1;

    // Faces:
    faces[0] = 0;
    faces[1] = 1;
    faces[2] = 2;
    faces[3] = 1;
    faces[4] = 3;
    faces[5] = 2;
    super(
      gl,
      new GLAttribute(gl, attributes, values),
      new GLIndex(gl, faces, gl.TRIANGLES)
    );
  }
}

export default PlaneMesh;
