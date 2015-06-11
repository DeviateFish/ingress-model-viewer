var ResonatorLinkMesh = (function(){

  // TODO: Parameterize this concept a little better
  // this has potential to be a really flexible and powerful way of
  // making, essentially, extruded geometry.

  // 5 sets of 4 points, breaking the link into 4 pieces, each providing 4 faces
  // chunksize is size of each element in the packed vertex array, in bytes
  var _len = 5, _size = _len * 4, _chunkSize = 12;
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

  var baseColor = vec4.fromValues(0.78, 0.31, 0.31, 1.0);
  var resonatorMidOffset = 0;
  var portalBaseOffset = 0;
  var up = vec3.fromValues(0, 1, 0);

  var fillChunk = function(buf, index, x, y, z, u, v, normal, f6, color)
  {
    var off = index * _chunkSize;
    buf[off + 0] = x;
    buf[off + 1] = y;
    buf[off + 2] = z;
    buf[off + 3] = f6;
    buf[off + 4] = u;
    buf[off + 5] = v;
    buf[off + 6] = normal[0];
    buf[off + 7] = normal[2];
    buf[off + 8] = color[0];
    buf[off + 9] = color[1];
    buf[off + 10] = color[2];
    buf[off + 11] = color[3];
  };

  var _generateLinkAttributes = function(portal, resonator, color, resonatorPercent) {
    resonatorPercent = resonatorPercent === undefined ? 1 : Math.max(Math.min(resonatorPercent, 1), 0);
    var values = new Float32Array(_size * _chunkSize);
    var dist = Math.sqrt(
      (resonator[0] - portal[0]) * (resonator[0] - portal[0]) +
      (resonator[1] - portal[1]) * (resonator[1] - portal[1])
    );
    var f4 = (2 / 30) * dist,
      f5 = 0.9 + 0.1 * resonatorPercent,
      f6 = 0.65 + 0.35 * resonatorPercent,
      f8 = 0.1 + 0.3 * resonatorPercent;
    var cl = vec4.lerp(vec4.create(), baseColor, color, 0.1 + resonatorPercent * 0.85);
    cl[3] = 0.75 + 0.25 * resonatorPercent * cl[3];
    var vec = vec3.fromValues(resonator[0], 0, resonator[1]);
    vec3.subtract(vec, vec, vec3.fromValues(portal[0], 0, portal[1]));
    var right = vec3.cross(vec3.create(), vec, up);
    vec3.normalize(right, right);
    var step = _len * 2;
    var f10 = 5.0 * ((portal[0] + portal[1]) - Math.floor(portal[0] + portal[1]));
    for(var i = 0; i < _len; i++)
    {
      var f11 = j[i],
        f12 = portal[0] + f11 * vec[0],
        f13 = portal[1] + f11 * vec[2],
        f14 = portalBaseOffset + f11 * (resonatorMidOffset - portalBaseOffset) + f5 * k[i],
        f15 = f6 * l[i],
        f16 = f11 * f4;
      fillChunk(values, (i * 2) + 0, f12 + f15 * right[0], f14, f13 + f15 * right[2], 0.0, f16 + f10, up, f8, cl);
      fillChunk(values, (i * 2) + 1, f12 - f15 * right[0], f14, f13 - f15 * right[2], 1.0, f16 + f10, up, f8, cl);
      fillChunk(values, step + (i * 2) + 0, f12, f14 + f15, f13, 0.0, f16 + f10, right, f8, cl);
      fillChunk(values, step + (i * 2) + 1, f12, f14 - f15, f13, 1.0, f16 + f10, right, f8, cl);
    }
    return values;
  };

  var _generateFaces = function(vertexOffset) {
    var ind = new Uint16Array(48),
      iOff = 0;

    for(i = 0; i < 2; i++)
    {
      for(var i2 = 0; i2 < _len - 1; i2++)
      {
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
    LinkMesh.call(this, gl);
    this.nLinks = 0;
  };
  inherits(linkmesh, LinkMesh);

  linkmesh.prototype.addLink = function(portal, resonator, color, resonatorPercent) {
    var linkAttributes = _generateLinkAttributes(portal, resonator, color, resonatorPercent);
    var ind = _generateFaces(this.attributeOffset / _chunkSize);
    return LinkMesh.prototype.addLink.call(this, linkAttributes, ind);
  };

  return linkmesh;
}());

imv.Meshes = imv.Meshes || {};
imv.Meshes.ResonatorLink = ResonatorLinkMesh;
