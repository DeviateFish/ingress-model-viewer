var FileMesh = (function(){

  var parseAttributes = function(buf)
  {
    var v = new DataView(buf), c = 0;
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
  };

  var fileMesh = function(gl, arraybuf)
  {
    var jd = new JavaDeserializer(arraybuf);
    var stream = jd.getStream();
    var blocks = stream.getContents();

    // should be Float32Array
    var values = blocks[0].contents.toArray();

    // should be ArrayBuffer
    var attributeData = blocks[3].contents.toArray();

    // array of VertexAttributes
    var spec = parseAttributes(attributeData);

    // should be Uint16Array
    var faces = new GLIndex(gl, blocks[1].contents.toArray(), gl.TRIANGLES);
    var attributes = new GLAttribute(gl, spec, values);

    // should be Uint16Array
    var lines = new GLIndex(gl, blocks[2].contents.toArray(), gl.LINES);

    Mesh.call(this, gl, attributes, faces, lines);
  };
  inherits(fileMesh, Mesh);

  return fileMesh;
}());

imv.Meshes = imv.Meshes || {};
imv.Meshes.File = FileMesh;
