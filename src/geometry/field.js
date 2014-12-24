var FieldGeometry = (function(){

  // 5 sets of 4 points, breaking the link into 4 pieces, each providing 4 faces
  var fillChunk = function(vert, pos, col, index, v1, f1, f2, v2)
  {
    var off = index * 4;
    vert[index * 3 + 0] = v1.x;
    vert[index * 3 + 1] = 0;
    vert[index * 3 + 2] = v1.y;
    pos[off + 0] = v1.x;
    pos[off + 1] = v1.y;
    pos[off + 2] = f1;
    pos[off + 3] = f2;
    col[off + 0] = v2.x;
    col[off + 1] = v2.y;
    col[off + 2] = v2.z;
    col[off + 3] = v2.w;
    return index + 1;
  };

  var fillVectors = function(vert, pos, col, index, v1, f1, v2, f2, v3, f3, v4)
  {
    return fillChunk(vert, pos, col, fillChunk(vert, pos, col, fillChunk(vert, pos, col, index, v1, 0, f1, v4), v2, 0, f2, v4), v3, ((v2.x - v1.x) * (v1.y - v3.y) - (v2.y - v1.y) * (v1.x - v3.x)) / v1.distanceTo(v2), f3, v4);
  };

  var fieldgeometry = function(options)
  {
    options = options || {};
    options.transparent = true;
    Geometry.call(this, options);
    this.position = new THREE.BufferAttribute(new Float32Array(), 3);
    this.index = new THREE.BufferAttribute(new Uint16Array(), 1);
    this.a_position = new THREE.BufferAttribute(new Float32Array(), 4);
    this.a_color = new THREE.BufferAttribute(new Float32Array(), 4);
    this.geometry.addAttribute('position', this.position);
    this.geometry.addAttribute('index', this.index);
    this.geometry.addAttribute('a_position', this.a_position);
    this.geometry.addAttribute('a_color', this.a_color);
    this.attributes = {
      "a_position": { type: "v4", values: null },
      "a_color": { type: "v4", values: null }
    };
    this.fieldCount = 0;
    this.lastOffset = 0;
  };
  inherits(fieldgeometry, Geometry);

  fieldgeometry.prototype.extendBuffer = function(attribute, count)
  {
    var buf = new Float32Array(attribute.length + (count * attribute.itemSize));
    buf.set(attribute.array);
    attribute.array = buf;
    return buf;
  };

  fieldgeometry.prototype.addField = function(A, B, C, color, duration /* ? */)
  {
    duration = 1.0;
    var f1 = 1.1,
      f2 = A.percent,
      f3 = B.percent,
      f4 = C.percent;
    var vert = this.extendBuffer(this.position, 9),
      pos = this.extendBuffer(this.a_position, 9),
      col = this.extendBuffer(this.a_color, 9);
    if(duration < 1.0)
    {
      var f6 = Math.max(0.0, duration);
      f1 = 1.1 * f6;
      var f7 = f6 * f6;
      f2 *= f7;
      f3 *= f7;
      f4 *= f7;
    }
    var aVec = new THREE.Vector2(A.x, A.y),
      bVec = new THREE.Vector2(B.x, B.y),
      cVec = new THREE.Vector2(C.x, C.y);
    var center = aVec.clone().add(bVec).add(cVec).multiplyScalar(0.333333333333);
    var start = this.lastOffset;
    this.lastOffset = fillVectors(vert, pos, col, this.lastOffset, aVec, f2, bVec, f3, center, f1, color);
    this.lastOffset = fillVectors(vert, pos, col, this.lastOffset, bVec, f3, cVec, f4, center, f1, color);
    this.lastOffset = fillVectors(vert, pos, col, this.lastOffset, cVec, f4, aVec, f2, center, f1, color);
    var ind = new Uint16Array((this.fieldCount + 1) * 9);
    ind.set(this.index.array);
    for(var i = 0; i < 9; i++)
    {
      ind[start + i] = start + i;
    }
    this.index.array = ind;
    this.index.needsUpdate = true;
    this.position.needsUpdate = true;
    this.a_position.needsUpdate = true;
    this.a_color.needsUpdate = true;
    this.geometry.needsUpdate = true;
    this.fieldCount++;
    return this.fieldCount;
  };

  return fieldgeometry;
}());

imv.Geometries = imv.Geometries || {};
imv.Geometries.Field = FieldGeometry;