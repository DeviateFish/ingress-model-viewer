import Mesh from '../mesh';
import VertexAttribute from '../vertex-attribute';
import GLIndex from '../gl/gl-index';
import GLAttribute from '../gl/gl-attribute';

// const MAX_SYSTEMS = 40;
const NUM_PARTICLES_PER_SYSTEM = 96;
const NUM_VERTICES_PER_PARTICLE = 4;
const NUM_INDICES_PER_FACE = 6;
const TOTAL_VERTEX_SIZE = 3 + 2 + 1 + 1 + 1 + 1;
const U = [0.0, 0.0, 1.0, 1.0];
const V = [1.0, 0.0, 1.0, 0.0];

var seeds = [];
for(var i = 0; i < NUM_PARTICLES_PER_SYSTEM; i++)
{
  seeds.push({
    x: Math.random() - 0.5,
    y: 0.4 * Math.random() - 0.2,
    z: Math.random() - 0.5,
    a_scale: 10.0 * (0.1 + 0.9 * Math.random()),
    a_speed: 6.0 * (0.5 + 0.5 * Math.random())
  });
}

/**
 * A ParticlePortalMesh is a Mesh that represents a single system or portal particles.
 *
 * @extends {Mesh}
 */
class ParticlePortalMesh extends Mesh {

  /**
   * Construct a system of portal particles
   * @param  {context} gl     WebGL context
   */
  constructor(gl) {
    var attributes = [];
    attributes.push(new VertexAttribute('a_position', 3));
    attributes.push(new VertexAttribute('a_texCoord0', 2));
    attributes.push(new VertexAttribute('a_scale', 1));
    attributes.push(new VertexAttribute('a_speed', 1));
    attributes.push(new VertexAttribute('a_portalIndex', 1));
    attributes.push(new VertexAttribute('a_index', 1));
    var values = new Float32Array(NUM_PARTICLES_PER_SYSTEM * NUM_VERTICES_PER_PARTICLE * TOTAL_VERTEX_SIZE);
    var seed, i, j, idx = 0;
    for(i = 0; i < NUM_PARTICLES_PER_SYSTEM; i++)
    {
      seed = seeds[i];
      for(j = 0; j < NUM_VERTICES_PER_PARTICLE; j++)
      {
        values[idx * TOTAL_VERTEX_SIZE + 0] = seed.x;
        values[idx * TOTAL_VERTEX_SIZE + 1] = seed.y;
        values[idx * TOTAL_VERTEX_SIZE + 2] = seed.z;
        values[idx * TOTAL_VERTEX_SIZE + 3] = U[j];
        values[idx * TOTAL_VERTEX_SIZE + 4] = V[j];
        values[idx * TOTAL_VERTEX_SIZE + 5] = seed.a_scale;
        values[idx * TOTAL_VERTEX_SIZE + 6] = seed.a_speed;
        values[idx * TOTAL_VERTEX_SIZE + 7] = 0;
        values[idx * TOTAL_VERTEX_SIZE + 8] = i;
        idx++;
      }
    }

    var faces = new Uint16Array(NUM_PARTICLES_PER_SYSTEM * NUM_INDICES_PER_FACE);
    var indices = [0, 1, 2, 1, 3, 2];
    idx = 0;
    var f = 0;
    for(i = 0; i < NUM_PARTICLES_PER_SYSTEM; i++)
    {
      for(j = 0; j < NUM_INDICES_PER_FACE; j++)
      {
        faces[f + j] = idx + indices[j];
      }
      f += 6;
      idx += 4;
    }
    super(
      gl,
      new GLAttribute(gl, attributes, values),
      new GLIndex(gl, faces, gl.TRIANGLES)
    );
  }
}

export default ParticlePortalMesh;
