var GLAttribute = (function() {

  var glAttribute = function(gl, attributes, values, usage)
  {
    usage = usage || gl.STATIC_DRAW;
    GLBuffer.call(this, gl, gl.ARRAY_BUFFER, usage);
    this.attributes = attributes;
    this.values = values;
    this.size = this.count = null;
    this._validate = false;
    this.size = 0;
    this.width = 0;
    for(var i = 0, a; i < this.attributes.length; i++)
    {
      a = this.attributes[i];
      this.size += 4 * a.size; // 4 because float is 4 bytes.
      this.width += a.size;
    }
    return this;
  };
  inherits(glAttribute, GLBuffer);

  glAttribute.prototype.validate = function() {
    if(this._validate) {
      if(this.values.length % this.width !== 0)
      {
        console.warn('values array length is not an even multiple of the total size of the attributes');
      }
    }
  };

  glAttribute.prototype.updateValues = function(values) {
    this.values = values;
    this.validate();
    return this.update();
  };

  glAttribute.prototype.draw = function(locations)
  {
    var gl = this._gl;
    var a, s = 0;
    if(!this.glBuf) {
      this.update();
    } else {
      this.bindBuffer();
    }
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
    return this; //.unbindBuffer();  // maybe?
  };

  glAttribute.prototype.eachAttribute = function(attributeIndex, callback) {
    var offset = 0, size, i;
    if(attributeIndex >= 0 && attributeIndex < this.attributes.length) {
      for(i = 0; i < attributeIndex; i++) {
        offset += this.attributes[i].size;
      }
      size = this.attributes[attributeIndex].size;
      for(i = offset; i < this.values.length; i += this.width) {
        callback(this.values.subarray(i, i + size));
      }
    }
  };

  return glAttribute;
}());

imv.GL = imv.GL || {};
imv.GL.Attribute = GLAttribute;
