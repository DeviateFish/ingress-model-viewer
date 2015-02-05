var PortalLinkMesh = (function(){

  // TODO: Parameterize this concept a little better
  // this has potential to be a really flexible and powerful way of
  // making, essentially, extruded geometry.

  // 9 sets of 6 points, breaking the link into 8 pieces, each providing 6 faces, something like that?
  var _len = 9, _size = _len * 6, _chunkSize = 12;
  var c = new Array(_len),
    d = new Array(_len),
    e = new Array(_len);

  var clampedSin = function(f)
  {
    return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
  };

  for(var i = 0; i < _len; i++)
  {
    var f = i / 8.0;
    c[i] = f;
    e[i] = (3.0 + (-1.5 * Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4)));
    d[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
  }

  var baseColor = vec4.fromValues(0.46, 0.18, 0.18, 1.0);

  var baseOffset = vec4.create();

  var attributes = {
    "a_position": { name: "a_position", size: 4 },
    "a_texCoord0": { name: "a_texCoord0", size: 4 },
    "a_color": { name: "a_color", size: 4 }
  };

  var fillChunk = function(buf, index, f1, f2, f3, f4, f5, v1, f6, v2)
  {
    var off = index * _chunkSize;
    buf[off + 0] = f1;
    buf[off + 1] = f2;
    buf[off + 2] = f3;
    buf[off + 3] = f6;
    buf[off + 4] = f4;
    buf[off + 5] = f5;
    buf[off + 6] = v1.x;
    buf[off + 7] = v1.z;
    buf[off + 8] = v2.x;
    buf[off + 9] = v2.y;
    buf[off + 10] = v2.z;
    buf[off + 11] = v2.w;
  };

  var vertexValuess = (function() {
    var buf = new Float32Array(_chunkSize * _len * _size);
    for(var i = 0; i < _len; i++)
    {
      var f8 = c[i],
        f9 = f3 + f8 * (f4 - f3),
        f10 = 0.6 + 0.35 * f9,
        f12 = f8 * f6,
        f13 = start.x + f8 * vec.x,
        f14 = start.y + f8 * vec.z,
        f15 = f1 + d[i] * (f2 - f1),
        f16 = e[i];
      var cl = baseColor.clone();
      cl.lerp(color, 0.25 + f9 * 0.75);
      cl.w = f10;
      fillChunk(buf, off + (i * 2), f13 + f16 * right.x, f15, f14 + f16 * right.z, 0, f12, up, f7, cl);
      fillChunk(buf, off + (i * 2) + 1, f13 - f16 * right.x, f15, f14 - f16 * right.z, 0.5, f12, up, f7, cl);
      fillChunk(buf, off + step + (i * 2), f13, f15 + f16, f14, 0, f12, right, f7, cl);
      fillChunk(buf, off + step + (i * 2) + 1, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(buf, off + 2 * step + (i * 2), f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(buf, off + 2 * step + (i * 2) + 1, f13, 0, f14, 1.0, f12, right, f7, cl);
    }

    return buf;
  }());

  var linkmesh = function(gl)
  {
    var values = new Float32Array()
  };
  inherits(linkmesh, Mesh);

  linkgeometry.prototype.extendBuffer = function(attribute, count)
  {
    var buf = new Float32Array(attribute.length + (count * attribute.itemSize));
    buf.set(attribute.array);
    attribute.array = buf;
    return buf;
  };

  linkgeometry.prototype.addLink = function(start, end, color, distance)
  {
    distance = distance || Math.sqrt((end.x - start.x) * (end.x - start.x) + (end.y - start.y) * (end.y - start.y));
    var f1 = baseOffset.y,
      f2 = f1 + Math.min(30.0, 0.08 * distance),
      f3 = start.percent,
      f4 = end.percent,
      f5 = (f3 + f4) / 2.0,
      f6 = 0.01 * distance,
      f7 = 0.1 + f5 * 0.3;
    var vec = new THREE.Vector3(end.x, 0, end.y).sub(new THREE.Vector3(start.x, 0, start.y));
    var up = new THREE.Vector3(0, 1, 0);
    var right = vec.clone().cross(up).normalize();
    var pos = this.extendBuffer(this.a_position, _size),
      tex = this.extendBuffer(this.a_texCoord0, _size),
      col = this.extendBuffer(this.a_color, _size),
      vert = this.extendBuffer(this.position, _size);
    var off = this.linkCount * _size;
    var step = _len * 2;
    for(var i = 0; i < _len; i++)
    {
      var f8 = c[i],
        f9 = f3 + f8 * (f4 - f3),
        f10 = 0.6 + 0.35 * f9,
        f12 = f8 * f6,
        f13 = start.x + f8 * vec.x,
        f14 = start.y + f8 * vec.z,
        f15 = f1 + d[i] * (f2 - f1),
        f16 = e[i];
      var cl = baseColor.clone();
      cl.lerp(color, 0.25 + f9 * 0.75);
      cl.w = f10;
      fillChunk(vert, pos, tex, col, off + (i * 2), f13 + f16 * right.x, f15, f14 + f16 * right.z, 0, f12, up, f7, cl);
      fillChunk(vert, pos, tex, col, off + (i * 2) + 1, f13 - f16 * right.x, f15, f14 - f16 * right.z, 0.5, f12, up, f7, cl);
      fillChunk(vert, pos, tex, col, off + step + (i * 2), f13, f15 + f16, f14, 0, f12, right, f7, cl);
      fillChunk(vert, pos, tex, col, off + step + (i * 2) + 1, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(vert, pos, tex, col, off + 2 * step + (i * 2), f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(vert, pos, tex, col, off + 2 * step + (i * 2) + 1, f13, 0, f14, 1.0, f12, right, f7, cl);
    }
    var ind = new Uint16Array((this.linkCount + 1) * 144);
    ind.set(this.index.array);
    var vOff = this.linkCount * _size;
    var iOff = this.linkCount * 144;
    for(i = 0; i < 3; i++)
    {
      for(var j = 0; j < _len - 1; j++)
      {
        ind[iOff + 0] = vOff + 1;
        ind[iOff + 1] = vOff + 0;
        ind[iOff + 2] = vOff + 2;
        ind[iOff + 3] = vOff + 1;
        ind[iOff + 4] = vOff + 2;
        ind[iOff + 5] = vOff + 3;
        vOff += 2;
        iOff += 6;
      }
      vOff += 2;
    }
    this.linkCount++;
    this.index.array = ind;
    this.position.needsUpdate = true;
    this.index.needsUpdate = true;
    this.a_position.needsUpdate = true;
    this.a_texCoord0.needsUpdate = true;
    this.a_color.needsUpdate = true;
    this.geometry.needsUpdate = true;
    return this;
  };

  return linkgeometry;
}());

imv.Geometries = imv.Geometries || {};
imv.Geometries.PortalLink = PortalLinkGeometry;