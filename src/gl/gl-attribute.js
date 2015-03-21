var GLAttribute = (function() {

  var glAttribute = function(gl, attributes, values, usage)
  {
    usage = usage || gl.STATIC_DRAW;
    GLBuffer.call(this, gl, gl.ARRAY_BUFFER, usage);
    this.attributes = attributes;
    this.values = values;
    this.size = this.count = null;
    this.validate = false;
    this.getSize();
    return this;
  };
  inherits(glAttribute, GLBuffer);

  // these are float-based types only, for now.
  glAttribute.prototype.getSize = function()
  {
    var gl = this._gl;
    this.size = 0;
    var width = 0;
    for(var i = 0, a; i < this.attributes.length; i++)
    {
      a = this.attributes[i];
      this.size += 4 * a.size; // 4 because float is 4 bytes.
      width += a.size;
    }
  };

  glAttribute.prototype.validate = function() {
    if(this.validate) {
      var width = this.attributes.reduce(function(sum, attr){
        return sum + attr.size;
      }, 0);
      if(this.values.length % width !== 0)
      {
        console.warn('values array length is not an even multiple of the total size of the attributes');
      }
    }
  };

  glAttribute.prototype.updateValues = function(values) {
    this.values = values;
    this.validate();
    this.update();
  };

  glAttribute.prototype.draw = function(locations)
  {
    var gl = this._gl;
    var a, s = 0;
    this.bindBuffer();
    for(var i = 0; i < this.attributes.length; i++)
    {
      a = this.attributes[i];
      if(!(a.name in locations))
      {
        // I don't know if I should suppress this, but if I
        // don't, it generates one warning per frame.
        console.warn('Program is missing attribute ' + a.name);
        continue;
      }
      gl.enableVertexAttribArray(locations[a.name]);
      gl.vertexAttribPointer(locations[a.name], a.size, gl.FLOAT, false, this.size, s);
      s += 4 * a.size;
    }
    return this; //.unbindBuffer();  // maybe?
  };

  return glAttribute;
}());

IMV.GL = IMV.GL || {};
IMV.GL.Attribute = GLAttribute;