var PortalLinkGeometry = (function(){

  // TODO: Parameterize this concept a little better
  // this has potential to be a really flexible and powerful way of
  // making, essentially, extruded geometry.

  // 9 sets of 6 points, breaking the link into 8 pieces, each providing 6 faces, something like that?
  var _len = 9, _size = _len * 6;
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

  var baseColor = new THREE.Vector4(0.46, 0.18, 0.18, 1.0);

  var baseOffset = new THREE.Vector3();

  var fillChunk = function(vert, pos, tex, col, index, f1, f2, f3, f4, f5, v1, f6, v2)
  {
    var off = index * 4;
    vert[index * 3 + 0] = f1;
    vert[index * 3 + 1] = f2;
    vert[index * 3 + 2] = f3;
    pos[off + 0] = f1;
    pos[off + 1] = f2;
    pos[off + 2] = f3;
    pos[off + 3] = f6;
    tex[off + 0] = f4;
    tex[off + 1] = f5;
    tex[off + 2] = v1.x;
    tex[off + 3] = v1.z;
    col[off + 0] = v2.x;
    col[off + 1] = v2.y;
    col[off + 2] = v2.z;
    col[off + 3] = v2.w;
  };

  var linkgeometry = function(options)
  {
    options = options || {};
    options.transparent = true;
    Geometry.call(this, options);
    this.position = new THREE.BufferAttribute(new Float32Array(), 3);
    this.index = new THREE.BufferAttribute(new Uint16Array(), 1);
    this.a_position = new THREE.BufferAttribute(new Float32Array(), 4);
    this.a_texCoord0 = new THREE.BufferAttribute(new Float32Array(), 4);
    this.a_color = new THREE.BufferAttribute(new Float32Array(), 4);
    this.geometry.addAttribute('position', this.position);
    this.geometry.addAttribute('index', this.index);
    this.geometry.addAttribute('a_position', this.a_position);
    this.geometry.addAttribute('a_texCoord0', this.a_texCoord0);
    this.geometry.addAttribute('a_color', this.a_color);
    this.attributes = {
      "a_position": { type: "v4", values: null },
      "a_texCoord0": { type: "v4", values: null },
      "a_color": { type: "v4", values: null }
    };
    this.linkCount = 0;
  };
  inherits(linkgeometry, Geometry);

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

imv.Geometry = imv.Geometry || {};
imv.Geometry.PortalLinkGeometry = PortalLinkGeometry;