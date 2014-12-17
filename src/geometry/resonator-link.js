var ResonatorLinkGeometry = (function(){

  // 5 sets of 4 points, breaking the link into 4 pieces, each providing 4 faces
  var _len = 5, _size = _len * 4;
  var j = new Array(_len),
    k = new Array(_len),
    l = new Array(_len);

  var clampedSin = function(f)
  {
    return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
  };

  for(var i = 0; i < _len; i++)
  {
    var f = i / 4.0;
    j[i] = f;
    l[i] = 3.5 * Math.max(1.0 - Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4.0), 0.2);
    k[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
  }

  var baseColor = new THREE.Vector4(0.78, 0.31, 0.31, 1.0);

  var portalBaseOffset = new THREE.Vector3();
  var resonatorMidOffset = new THREE.Vector3();

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

  linkgeometry.prototype.addLink = function(portal, reso, color)
  {
    // f1 = resonator midpoint y value
    // f2 = portal min y value
    var dist = Math.sqrt((reso.x - portal.x) * (reso.x - portal.x) + (reso.y - portal.y) * (reso.y - portal.y));
    var f1 = resonatorMidOffset.y,
      f2 = portalBaseOffset.y,
      f3 = reso.percent,
      f4 = (2 / 30) * dist,
      f5 = 0.9 + 0.1 * f3,
      f6 = 0.65 + 0.35 * f3,
      f7 = 0.75 + 0.25 * f3,
      f8 = 0.1 + 0.3 * f3;
    var cl = baseColor.clone();
    cl.lerp(color, 0.1 + f3 * 0.85);
    cl.w = f7 * cl.w;
    var vec = new THREE.Vector3(reso.x, 0, reso.y).sub(new THREE.Vector3(portal.x, 0, portal.y));
    var up = new THREE.Vector3(0, 1, 0);
    var right = vec.clone().cross(up).normalize();
    var pos = this.extendBuffer(this.a_position, _size),
      tex = this.extendBuffer(this.a_texCoord0, _size),
      col = this.extendBuffer(this.a_color, _size),
      vert = this.extendBuffer(this.position, _size);
    var off = this.linkCount * _size;
    var step = _len * 2;
    var f10 = 5.0 * ((portal.x + portal.y) - Math.floor(portal.x + portal.y));
    for(var i = 0; i < _len; i++)
    {
      var f11 = j[i],
        f12 = portal.x + f11 * vec.x,
        f13 = portal.y + f11 * vec.z,
        f14 = f2 + f11 * (f1 - f2) + f5 * k[i],
        f15 = f6 * l[i],
        f16 = f11 * f4;
      fillChunk(vert, pos, tex, col, off + (i * 2) + 0, f12 + f15 * right.x, f14, f13 + f15 * right.z, 0.0, f16 + f10, up, f8, cl);
      fillChunk(vert, pos, tex, col, off + (i * 2) + 1, f12 - f15 * right.x, f14, f13 - f15 * right.z, 1.0, f16 + f10, up, f8, cl);

      fillChunk(vert, pos, tex, col, off + step + (i * 2) + 0, f12, f14 + f15, f13, 0.0, f16 + f10, right, f8, cl);
      fillChunk(vert, pos, tex, col, off + step + (i * 2) + 1, f12, f14 - f15, f13, 1.0, f16 + f10, right, f8, cl);
    }
    var ind = new Uint16Array((this.linkCount + 1) * 48);
    ind.set(this.index.array);
    var vOff = this.linkCount * _size;
    var iOff = this.linkCount * 48;
    for(i = 0; i < 2; i++)
    {
      for(var i2 = 0; i2 < _len - 1; i2++)
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
imv.Geometry.ResonatorLinkGeometry = ResonatorLinkGeometry;
