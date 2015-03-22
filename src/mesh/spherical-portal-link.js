var SphericalPortalLinkMesh = (function(){

  var _chunkSize = 12;
  var MAX_LINKS = 50; // seems reasonable.
  var EST_CHUNKS = 25; // half a hemisphere

  var clampedSin = function(f)
  {
    return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
  };

  var buildMatrix = function(lat, lng, radius) {
    var mat = mat4.create();
    mat4.rotateY(mat, mat, lng);
    mat4.rotateZ(mat, mat, (lat - Math.PI / 2));
    mat4.translate(mat, mat, [0, radius, 0]);
    return mat;
  };

  var getInnerAngle = function(s, e) {
    var dx = Math.cos(e[0]) * Math.cos(e[1]) - Math.cos(s[0]) * Math.cos(s[1]),
        dy = Math.cos(e[0]) * Math.sin(e[1]) - Math.cos(s[0]) * Math.sin(s[1]),
        dz = Math.sin(e[0]) - Math.sin(s[0]),
        chord = Math.sqrt(dx * dx + dy * dy + dz * dz),
        angle = 2 * Math.asin(chord / 2);
    return angle;
  };

  var toRadians = function(point) {
    return vec2.fromValues(point[0] * Math.PI / 180, point[1] * Math.PI / 180);
  };

  var baseColor = vec4.fromValues(0.46, 0.18, 0.18, 1.0);

  var baseOffset = vec4.create();

  var fillChunk = function(buf, index, pos, uv, normal, f6, color)
  {
    var off = index * _chunkSize;
    buf[off + 0] = pos[0];
    buf[off + 1] = pos[1];
    buf[off + 2] = pos[2];
    buf[off + 3] = f6;
    buf[off + 4] = uv[0];
    buf[off + 5] = uv[1];
    buf[off + 6] = normal[0];
    buf[off + 7] = normal[2];
    buf[off + 8] = color[0];
    buf[off + 9] = color[1];
    buf[off + 10] = color[2];
    buf[off + 11] = color[3];
  };

  // start and end should probably be in radians?
  var _generateLinkAttributes = function(radius, start, end, color, startPercent, endPercent) {
    start = toRadians(start);
    end = toRadians(end);
    var angle = getInnerAngle(start, end);
    var segments = Math.floor(angle / Math.PI * 50) + 1; // 50 segments for a half-circle sounds good, I guess.
    startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
    endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
    var values = new Float32Array(segments * _chunkSize * 6);
    var length = angle * radius;
    var yMin = baseOffset[1],
      yMax = yMin + Math.min(radius * 0.01, 0.08 * length),
      avgPercent = (startPercent + endPercent) / 2.0,
      f6 = 0.01 * length,
      f7 = 0.1 + avgPercent * 0.3;
    var step = segments * 2;
    for(var i = 0; i < segments; i++)
    {
      var f8 = i / (segments - 1),
        f9 = startPercent + f8 * (endPercent - startPercent),
        f10 = 0.6 + 0.35 * f9,
        // v as in "uv" as in texcoords
        v = f8 * f6,
        // "current" point in progression
        curr = vec2.lerp(vec2.create(), start, end, f8),
        // "next" point in the progression
        next = vec2.lerp(vec2.create(), start, end, f8 + (1 / (segments - 1))),
        transform = buildMatrix(curr[0], curr[1], radius),
        nextTransform = buildMatrix(next[0], next[1], radius),
        // point on the surface of the sphere that's the base of the cross-shaped structure we're generating
        base = vec3.transformMat4(vec3.create(), vec3.fromValues(curr[0], 0, curr[1]), transform),
        // "next" point on the sphere on the path.
        nextBase = vec3.transformMat4(vec3.create(), vec3.fromValues(next[0], 0, next[1]), nextTransform),
        // normalized, base poiont also functions as the "up" direction
        up = vec3.normalize(vec3.create(), base),
        // direction the link is "facing"
        heading = vec3.subtract(vec3.create(), nextBase, base),
        // determines what's "to the right"
        right = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), heading, up)),
        // "height" of the centerpoint of the link.
        h = yMin + (3.0 + (-1.5 * Math.pow(clampedSin(2.0 * Math.abs(f8 - 0.5)), 4))) * (yMax - yMin),
        // "radius" of the link
        w = radius * 0.01 * clampedSin(1.0 - 2.0 * Math.abs(f8 - 0.5)),
        hVec = vec3.scale(vec3.create(), up, h),
        wRight = vec3.scale(vec3.create(), right, w),
        wUp = vec3.scale(vec3.create(), up, w),
        cl = vec4.lerp(vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
      cl[3] = f10;

      // top horizontal segment
      // right point
      fillChunk(values, (i * 2),
        vec3.add(vec3.create(), base, vec3.add(vec3.create(), hVec, wRight)),
        vec2.fromValues(0, v),
        up,
        f7,
        cl);
      // left point
      fillChunk(values, (i * 2) + 1,
        vec3.add(vec3.create(), base, vec3.subtract(vec3.create(), hVec, wRight)),
        vec2.fromValues(0.5, v),
        up,
        f7,
        cl);

      // top vertical segment
      fillChunk(values, step + (i * 2),
        vec3.add(vec3.create(), base, vec3.add(vec3.create(), hVec, wUp)),
        vec2.fromValues(0, v),
        right,
        f7,
        cl);
      fillChunk(values, step + (i * 2) + 1,
        vec3.add(vec3.create(), base, vec3.subtract(vec3.create(), hVec, wUp)),
        vec2.fromValues(0.5, v),
        right,
        f7,
        cl);

      // bottom vertical segment
      fillChunk(values, 2 * step + (i * 2),
        vec3.add(vec3.create(), base, vec3.subtract(vec3.create(), hVec, wUp)),
        vec2.fromValues(0.5, v),
        right,
        f7,
        cl);
      fillChunk(values, 2 * step + (i * 2) + 1,
        base,
        vec2.fromValues(1.0, v),
        right,
        f7,
        cl);
    }
    return values;
  };

  var _generateFaces = function(vertexOffset, segments) {
    var ind = new Uint16Array(6 * (segments - 1) * 3),
        iOff = 0;
    for(var i = 0; i < 3; i++) {

      for(var j = 0; j < segments - 1; j++) {

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

  var linkmesh = function(gl, sphereRadius) {
    var buf = new Float32Array(EST_CHUNKS * _chunkSize * MAX_LINKS);
    var attributes = [];
    attributes.push(new VertexAttribute('a_position', 4));
    attributes.push(new VertexAttribute('a_texCoord0', 4));
    attributes.push(new VertexAttribute('a_color', 4));
    var attribute = new GLAttribute(gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new GLIndex(gl, new Uint16Array(EST_CHUNKS * 18 * MAX_LINKS), gl.TRIANGLES);
    this.radius = sphereRadius;
    this.vertexOffset = 0;
    this.faceOffset = 0;
    Mesh.call(this, gl, attribute, faces);
    return this;
  };
  inherits(linkmesh, Mesh);

  linkmesh.prototype.addLink = function(start, end, color, startPercent, endPercent) {

    var linkAttributes = _generateLinkAttributes(this.radius, start, end, color, startPercent, endPercent);
    var len = linkAttributes.length, segments = Math.floor(len / _chunkSize / 6);
    var ind = _generateFaces(this.vertexOffset, segments);
    this.attributes.setValues(linkAttributes, this.vertexOffset);
    this.vertexOffset += len;
    this.faces.setValues(ind, this.faceOffset);
    this.faceOffset += ind.length;
    return this;
  };

  return linkmesh;
}());

imv.Meshes = imv.Meshes || {};
imv.Meshes.SphericalPortalLink = SphericalPortalLinkMesh;
