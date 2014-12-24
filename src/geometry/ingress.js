var IngressGeometry = (function(){

  //typed arrays only, plz.
  var eachSlice = function(array, size, callback)
  {
    for(var i = 0; i < Math.floor(array.length / size); i++)
    {
      callback(array.subarray(i * size, (i + 1) * size), i);
    }
  };

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
      attributes.push({
        name: name,
        type: type,
        size: size
      });
    }
    return attributes;
  };

  var loadGeometry = function(geom)
  {
    var jd = new JavaDeserializer(geom.buf);
    var stream = jd.getStream();
    var blocks = stream.getContents();
    var attributeData = blocks[3].contents.toArray(), total = 0;
    var attributes = parseAttributes(attributeData);
    var nAttributes = attributes.length;
    var points = blocks[0].contents.toArray();
    var arrays = [], i, a, type;
    for(i = 0; i < nAttributes; i++)
    {
      a = attributes[i];
      type = 'v' + a.size;
      total += a.size;
      geom.attributes[a.name] = { type: type, values: null };
    }
    var len = Math.floor(points.length / total);
    for(i = 0; i < nAttributes; i++)
    {
      arrays.push(new Float32Array(attributes[i].size * len));
    }
    var position = new Float32Array(3 * len);
    eachSlice(points, total, function(slice, index) {
      var off = 0, i;
      for(i = 0; i < nAttributes; i++)
      {
        var l = attributes[i].size;
        for(var j = 0; j < l; j++)
        {
          arrays[i][index * l + j] = slice[off+j];
        }
        off += l;
      }
      // this always assumes position comes first and is xyz
      // unfortunately, three.js makes some assumptions about
      // there being 'position' and 'index' attributes
      for(i = 0; i < 3; i++)
      {
        position[index + i] = slice[i];
      }
    });
    for(i = 0; i < nAttributes; i++)
    {
      a = attributes[i];
      geom.geometry.addAttribute(a.name, new THREE.BufferAttribute(arrays[i], a.size));
    }
    geom.geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
    var faces = blocks[1].contents.toArray();
    var index = new Uint16Array(faces.length);
    index.set(faces);
    geom.geometry.addAttribute('index', new THREE.BufferAttribute(index, 1));
  };

  var ingressgeometry = function(arraybuf, options)
  {
    Geometry.call(this, options);
    this.buf = arraybuf;
    loadGeometry(this);
    return this;
  };
  inherits(ingressgeometry, Geometry);

  return ingressgeometry;
}());

imv.Geometries = imv.Geometries || {};
imv.Geometries.Ingress = IngressGeometry;