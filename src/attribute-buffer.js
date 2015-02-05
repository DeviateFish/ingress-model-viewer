var AttributeBuffer = function(gl, attributes, values)
{
  GLBound.call(this, gl);
  this.attributes = attributes;
  this.values = values;
  this.glBuf = this.size = this.count = null;
};
inherits(AttributeBuffer, GLBound);

AttributeBuffer.prototype.init = function()
{
  var gl = this._gl;
  this.glBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.values), gl.STATIC_DRAW);
  this.size = 0;
  var width = 0;
  for(var i = 0, a; i < this.attributes.length; i++)
  {
    a = this.attributes[i];
    this.size += 4 * a.size;
    width += a.size;
  }
  if(this.values.length % width !== 0)
  {
    console.warn('values array length is not an even multiple of the total size of the attributes');
  }
  this.count = Math.floor(this.values.length / width);
};

AttributeBuffer.prototype.draw = function(locations)
{
  var gl = this._gl;
  var a, s = 0;
  if(!this.glBuf)
  {
    this.init();
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
  for(var i = 0; i < this.attributes.length; i++)
  {
    a = this.attributes[i];
    if(!(a.name in locations))
    {
      // I don't know if I should suppress this, but if I
      // don't, it generates one warning per frame.
      //console.warn('Program is missing attribute ' + a.name);
      continue;
    }
    gl.enableVertexAttribArray(locations[a.name]);
    gl.vertexAttribPointer(locations[a.name], a.size, gl.FLOAT, false, this.size, s);
    s += 4 * a.size;
  }
};

imv.AttributeBuffer = AttributeBuffer;