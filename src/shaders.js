var ShaderSet = (function(){

  var types = {
    'mat4': 'm4',
    'vec4': 'v4',
    'vec3': 'v3',
    'vec2': 'v2',
    'float': 'f',
    'sampler2D': 't',
    'int': 'i'
  };
  var getUniforms = function(program)
  {
    var uMatch = /uniform ([^ ]+) ([^;]+);/ig;
    var uniforms = {};
    var matches;
    while((matches = uMatch.exec(program)) !== null)
    {
      var t = matches[1];
      if(types.hasOwnProperty(t))
      {
        t = types[t];
      }
      else
      {
        console.warn('no known conversion from ' + t);
      }
      uniforms[matches[2]] = { type: t };
    }
    return uniforms;
  };

  var getAttributes = function(program)
  {
    var aMatch = /attribute ([^ ]+) ([^;]+);/ig;
    var attributes = {};
    var matches;
    while((matches = aMatch.exec(program)) !== null)
    {
      var t = matches[1];
      if(types.hasOwnProperty(t))
      {
        t = types[t];
      }
      else
      {
        console.warn('no known conversion from ' + t);
      }
      attributes[matches[2]] = { type: t };
    }
    return attributes;
  };

  var fixPrecision = function(shader)
  {
    if(/precision mediump float/g.test(shader))
    {
      return shader;
    }
    else
    {
      var lines = shader.split("\n");
      lines.splice(1, 0, "#ifdef GL_ES", "precision mediump float;", "#endif");
      return lines.join("\n");
    }
  };

  var shaderset = function(vertex, fragment)
  {
    this.vertex = fixPrecision(vertex);
    this.fragment = fragment;
    this.uniforms = getUniforms(vertex + "\n" + fragment);
    this.attributes = getAttributes(vertex + "\n" + fragment);
  };

  shaderset.prototype.getUniformsList = function()
  {
    return Object.keys(this.uniforms);
  };

  shaderset.prototype.getAttributesList = function()
  {
    return Object.keys(this.attributes);
  };

  return shaderset;
}());

imv.ShaderSet = ShaderSet;