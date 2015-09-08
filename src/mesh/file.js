import Mesh from '../mesh';
import VertexAttribute from '../vertex-attribute';
import GLIndex from '../gl/gl-index';
import GLAttribute from '../gl/gl-attribute';
import JavaDeserializer from 'java-deserializer';

function parseAttributes(buf)
{
  var v = new DataView(buf.buffer, buf.byteOffset, buf.byteLength), c = 0;
  var n = v.getUint32(c), type, size, len, j, name;
  c += 4;
  var attributes = [];
  for(var i = 0; i < n; i++)
  {
    type = v.getUint32(c);
    if(type != 0x01 && type != 0x10)
    {
      console.warn('unknown type ' + type);
    }
    c += 4;
    size = v.getUint32(c);
    c += 4;
    len = v.getUint16(c);
    c += 2;
    name = '';
    for(j = 0; j < len; j++)
    {
      name += String.fromCharCode(v.getUint8(c+j));
    }
    c += len;
    attributes.push(new VertexAttribute(name, size));
  }
  return attributes;
}

/**
 * A FileMesh is a Mesh that is loaded from a serialzied Java object,
 * as found in the apk.
 *
 * @extends {Mesh}
 */
class FileMesh extends Mesh {

  /**
   * Construct the Mesh from the given file
   * @param  {context} gl           WebGL context
   * @param  {ArrayBuffer} arraybuf ArrayBuffer representing the entire .obj file
   */
  constructor(gl, arraybuf) {
    var jd = new JavaDeserializer(arraybuf);
    var blocks = jd.getContents();

    // should be Float32Array
    var values = blocks[0].elements;

    // should be ArrayBuffer
    var attributeData = blocks[3];

    // array of VertexAttributes
    var spec = parseAttributes(attributeData);

    // should be Uint16Array
    var faces = new GLIndex(gl, blocks[1].elements, gl.TRIANGLES);
    var attributes = new GLAttribute(gl, spec, values);

    // should be Uint16Array
    var lines = new GLIndex(gl, blocks[2].elements, gl.LINES);

    super(gl, attributes, faces, lines);
  }
}

export default FileMesh;
