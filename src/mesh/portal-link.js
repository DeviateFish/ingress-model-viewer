var PortalLinkMesh = (function(){

  // TODO: Parameterize this concept a little better
  // this has potential to be a really flexible and powerful way of
  // making, essentially, extruded geometry.

  // 9 sets of 6 points, breaking the link into 8 pieces, each providing 6 faces, something like that?
  var _len = 9, _size = _len * 6, _chunkSize = 12;
  var c = new Array(_len),
    d = new Array(_len),
    e = new Array(_len);

  var MAX_LINKS = 100; // seems reasonable.

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

  var fillChunk = function(buf, index, f1, f2, f3, f4, f5, v1, f6, v2)
  {
    var off = index * _chunkSize;
    buf[off + 0] = f1;
    buf[off + 1] = f2;
    buf[off + 2] = f3;
    buf[off + 3] = f6;
    buf[off + 4] = f4;
    buf[off + 5] = f5;
    buf[off + 6] = v1[0];
    buf[off + 7] = v1[2];
    buf[off + 8] = v2[0];
    buf[off + 9] = v2[1];
    buf[off + 10] = v2[2];
    buf[off + 11] = v2[3];
  };

  var _generateLinkAttributes = function(start, end, color, startPercent, endPercent) {
    startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
    endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
    var values = new Float32Array(_size * _chunkSize);
    var length = Math.sqrt((end[0] - start[0]) * (end[0] - start[0]) + (end[1] - start[1]) * (end[1] - start[1]));
    var yMin = baseOffset[1],
      yMax = yMin + Math.min(30.0, 0.08 * length),
      avgPercent = (startPercent + endPercent) / 2.0,
      f6 = 0.01 * length,
      f7 = 0.1 + avgPercent * 0.3;
    var vec = vec3.fromValues(end[0], 0, end[1]);
    vec3.subtract(vec, vec, vec3.fromValues(start[0], 0, start[1]));
    var up = vec3.fromValues(0, 1, 0);
    var right = vec3.cross(vec3.create(), vec, up);
    vec3.normalize(right, right);
    var step = _len * 2;
    for(var i = 0; i < _len; i++)
    {
      var f8 = c[i],
        f9 = startPercent + f8 * (endPercent - startPercent),
        f10 = 0.6 + 0.35 * f9,
        f12 = f8 * f6,
        f13 = start[0] + f8 * vec[0],
        f14 = start[1] + f8 * vec[2],
        f15 = yMin + d[i] * (yMax - yMin),
        f16 = e[i];
      var cl = vec4.lerp(vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
      cl[3] = f10;
      fillChunk(values, (i * 2), f13 + f16 * right[0], f15, f14 + f16 * right[2], 0, f12, up, f7, cl);
      fillChunk(values, (i * 2) + 1, f13 - f16 * right[0], f15, f14 - f16 * right[2], 0.5, f12, up, f7, cl);
      fillChunk(values, step + (i * 2), f13, f15 + f16, f14, 0, f12, right, f7, cl);
      fillChunk(values, step + (i * 2) + 1, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(values, 2 * step + (i * 2), f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(values, 2 * step + (i * 2) + 1, f13, 0, f14, 1.0, f12, right, f7, cl);
    }
    return values;
  };

  var _generateFaces = function(vertexOffset) {
    var ind = new Uint16Array(144),
        iOff = 0;
    for(var i = 0; i < 3; i++) {

      for(var j = 0; j < _len - 1; j++) {

        ind[iOff + 0] = vertexOffset + 1;
        ind[iOff + 1] = vertexOffset + 0;
        ind[iOff + 2] = vertexOffset + 2;
        ind[iOff + 3] = vertexOffset + 1;
        ind[iOff + 4] = vertexOffset + 2;
        ind[iOff + 5] = vertexOffset + 3;
        vertexOffset += 2;
        iOff += 6;
      }
      vertexOffset += 2;
    }

    return ind;
  };

  var linkmesh = function(gl) {
    // make room for some max number links... though technically, since we
    // have to rebind these every time we update them anyway, we could just
    // grow this to whatever arbitrary limit, on the fly.
    var buf = new Float32Array(_size * _chunkSize * MAX_LINKS);
    var attributes = [];
    attributes.push(new VertexAttribute('a_position', 4));
    attributes.push(new VertexAttribute('a_texCoord0', 4));
    attributes.push(new VertexAttribute('a_color', 4));
    Mesh.call(this, gl, attributes, buf);
    this.faces = new Uint16Array(144 * MAX_LINKS);
    this.nFaces = 0;
    this.nLinks = 0;
  };
  inherits(linkmesh, Mesh);

  linkmesh.prototype.addLink = function(start, end, color, startPercent, endPercent) {

    var linkAttributes = _generateLinkAttributes(start, end, color, startPercent, endPercent);
    var vertexOffset = this.nLinks * _size;
    var ind = _generateFaces(vertexOffset);
    this.attributes.setValues(linkAttributes, vertexOffset * _chunkSize);
    this.faces.set(ind, this.nLinks * 144);
    this.nFaces += 144;
    this.bindFaces();
    return this.nLinks++;
  };

  return linkmesh;
}());

imv.Meshes = imv.Meshes || {};
imv.Meshes.PortalLink = PortalLinkMesh;