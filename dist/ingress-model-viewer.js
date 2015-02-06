(function(root, undefined) {

  "use strict";

  var imv = {};


if(!JavaDeserializer || !glMatrix || !libtga)
{
  throw 'Missing dependencies';
}

var console = window.console || {
  log: function(){},
  warn: function(){},
  info: function(){}
};

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

var constants = {
  teamColors: {
    RESISTANCE: vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    ENLIGHTENED: vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0),
    NEUTRAL: vec4.fromValues(0.9764705882352941, 0.9764705882352941, 0.9764705882352941, 1.0),
    LOKI: vec4.fromValues(1, 0.1568627450980392, 0.1568627450980392, 1.0)
  },
  qualityColors: {
    EXTREMELY_RARE: vec4.fromValues(0.9803921568627451, 0.39215686274509803, 0.39215686274509803, 1.0),
    VERY_RARE: vec4.fromValues(0.9568627450980393, 0.5215686274509804, 0.9254901960784314, 1.0),
    MORE_RARE: vec4.fromValues(0.7647058823529411, 0, 1, 1.0),
    RARE: vec4.fromValues(0.6666666666666666, 0.5372549019607843, 0.984313725490196, 1.0),
    LESS_COMMON: vec4.fromValues(0.45098039215686275, 0.6588235294117647, 1, 1.0),
    COMMON: vec4.fromValues(0.5098039215686274, 0.9529411764705882, 0.7058823529411765, 1.0),
    VERY_COMMON: vec4.fromValues(0.6980392156862745, 0.6980392156862745, 0.6980392156862745, 1.0),
    L1: vec4.fromValues(0.996078431372549, 0.807843137254902, 0.35294117647058826, 1.0),
    L2: vec4.fromValues(1, 0.6509803921568628, 0.18823529411764706, 1.0),
    L3: vec4.fromValues(1, 0.45098039215686275, 0.08235294117647059, 1.0),
    L4: vec4.fromValues(0.8941176470588236, 0, 0, 1.0),
    L5: vec4.fromValues(0.9921568627450981, 0.1607843137254902, 0.5725490196078431, 1.0),
    L6: vec4.fromValues(0.9215686274509803, 0.14901960784313725, 0.803921568627451, 1.0),
    L7: vec4.fromValues(0.7568627450980392, 0.1411764705882353, 0.8784313725490196, 1.0),
    L8: vec4.fromValues(0.5882352941176471, 0.15294117647058825, 0.9568627450980393, 1.0)
  },
  anomalyColors: {
    1: vec4.fromValues(1.0, 0.5686274509803921, 0.21176470588235294, 1.0),
    2: vec4.fromValues(1.0, 0.3215686274509804, 0.9058823529411765, 1.0),
    3: vec4.fromValues(0.6196078431372549, 0.35294117647058826, 1.0, 1.0),
    4: vec4.fromValues(0.8431372549019608, 0.27058823529411763, 0.27058823529411763, 1.0),
    5: vec4.fromValues(1.0, 0.9450980392156862, 0.0, 1.0),
    6: vec4.fromValues(0.6509803921568628, 1.0, 0.9019607843137255, 1.0),
    7: vec4.fromValues(0.5725490196078431, 0.5803921568627451, 0.592156862745098, 1.0)
  },
  artifactColors: {
    Helios: {
      RedGlow: vec4.fromValues(0.92, 0.51, 0.14, 1.0),
      PurpleGlow: vec4.fromValues(1.0, 0.87, 0.55, 1.0),
      TargetGlow: vec4.fromValues(1.0, 0.72, 0.0, 1.0)
    },
    Amar: {
      TargetGlow: vec4.fromValues(0.62, 0.22, 0.62, 1.0),
      RedGlow: vec4.fromValues(0.79, 0.11, 0.49, 1.0),
      PurpleGlow: vec4.fromValues(0.58, 0.17, 1.0, 1.0)
    },
    Jarvis: {
      TargetGlow: vec4.fromValues(0.62, 0.22, 0.62, 1.0),
      RedGlow: vec4.fromValues(0.79, 0.11, 0.49, 1.0),
      PurpleGlow: vec4.fromValues(0.58, 0.17, 1.0, 1.0)
    }
  },
  xmColors: {
    coreGlow: vec4.fromValues(0.92, 0.7, 0.89, 1.0),
    coreGlowAlt: vec4.fromValues(0.6, 0.4, 0.6, 0.8),
    coreGlowAda: vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    coreGlowJarvis: vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0)
  }
};

imv.Constants = constants;

var inherits = function(a, b) {
  function C(){}
  C.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new C();
  a.prototype.constructor = a;
};

imv.Utilities = imv.Utilities || {};
imv.Utilities.inherits = inherits;

var loadResource = function(url, type, callback)
{
  if(type === 'image' || type === 'image.co')
  {
    if(/\.tga$/.test(url))
    {
      libtga.loadFile(url, function(err, tga) {
        if(err)
        {
          callback(err, null);
          return;
        }
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(tga.width, tga.height);
        imageData.data.set(tga.imageData);
        canvas.height = tga.height;
        canvas.width = tga.width;
        context.putImageData(imageData, 0, 0);
        var image = new Image();
        image.onload = function() {
          callback(null, this);
        };
        image.onerror = function(e) {
          callback(e, null);
        };
        image.src = canvas.toDataURL();
      });
    }
    else
    {
      var i = new Image();
      // cross-origin image:
      if(type === 'image.co')
      {
        i.crossOrigin = 'anoymous';
      }
      i.onload = function()
      {
        callback(null, this);
      };
      i.onerror = function(e)
      {
        callback(e, null);
      };
      i.src = url;
    }
  }
  else
  {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;
    xhr.onload = function() {
      callback(null, this.response);
    };
    xhr.onerror = function(e) {
      callback(e, null);
    };

    xhr.send();
  }
};

var AssetLoader = function()
{
  var _callbacks = {};
  var _assets = {};

  this.loadAsset = function(url, type, callback)
  {
    var name = '_' + encodeURIComponent(url);
    if(_assets[name])
    {
      callback(null, _assets[name]);
      return;
    }
    _callbacks[name] = _callbacks[name] || [];
    _callbacks[name].push(callback);
    if(!_assets.hasOwnProperty(name))
    {
      _assets[name] = false;
      loadResource(url, type, function(err, value) {
        if(!err)
        {
          _assets[name] = value;
        }
        var cb;
        while((cb = _callbacks[name].shift()))
        {
          cb(err, value);
        }
      });
    }
  };

  this.loadAssetGroup = function(urls, types, callback)
  {
    if(urls.length !== types.length)
    {
      throw 'Incompatible types: types.length = ' + types.length + '; urls.length = ' + urls.length;
    }
    var len = urls.length, results = new Array(len);
    var onEach = function(idx, err, value) {
      if(err) {
        callback(err, null);
        return;
      }
      results[idx] = value;
      var i, r = true;
      for(i = 0; i < len; i++)
      {
        r = r && results[i];
      }
      if(r)
      {
        callback(null, results);
      }
    };
    for(var i = 0; i < urls.length; i++)
    {
      this.loadAsset(urls[i], types[i], onEach.bind(undefined, i));
    }
  };

  this.getAsset = function(name)
  {
    return _assets[name];
  };
};

imv.AssetLoader = AssetLoader;
imv.Utilities = imv.Utilities || {};
imv.Utilities.loadResource = loadResource;

var GLBound = function(gl)
{
  this._gl = gl;
};

imv.GLBound = GLBound;

var Texture = function(gl, info, image)
{
  GLBound.call(this, gl);
  this.info = info;
  var map = {
    'MipMapLinearLinear': gl.LINEAR_MIPMAP_LINEAR,
    'Linear': gl.LINEAR,
    'MipMapLinearNearest': gl.LINEAR_MIPMAP_NEAREST,
    'MipMapNearestLinear': gl.NEAREST_MIPMAP_LINEAR,
    'Repeat': gl.REPEAT,
    'ClampToEdge': gl.CLAMP_TO_EDGE
  };
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, map[info.minFilter]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, map[info.magFilter]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, map[info.wrapS]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, map[info.wrapT]);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  if(/MipMap/.test(info.minFilter))
  {
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  gl.bindTexture(gl.TEXTURE_2D, null);

  this.texture = texture;
};

Texture.prototype.use = function(index)
{
  var gl = this._gl;
  index = index || 0;
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.activeTexture(gl.TEXTURE0 + index);
};

imv.Texture = Texture;


var VertexAttribute = function(name, size)
{
  this.name = name;
  this.size = size;
};

imv.VertexAttribute = VertexAttribute;

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

var Mesh = function(gl, attributeBuf, attributeSpec, faces)
{
  GLBound.call(this, gl);
  this.attributes = new AttributeBuffer(gl, attributeSpec, attributeBuf);
  this.faces = faces;
  this.indexBuf = null;
};
inherits(Mesh, GLBound);

Mesh.prototype.init = function()
{
  var gl = this._gl;
  this.attributes.init();
  this.indexBuf = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faces), gl.STATIC_DRAW);
};

Mesh.prototype.draw = function(locations)
{
  var gl = this._gl;
  if(!this.indexBuf)
  {
    this.init();
  }
  this.attributes.draw(locations);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuf);
  gl.drawElements(gl.TRIANGLES, this.faces.length, gl.UNSIGNED_SHORT, 0);
};

imv.Mesh = Mesh;

var FileMesh = (function(){

  var parseAttributes = function(buf)
  {
    var v = new DataView(buf), c = 0;
    var n = v.getUint32(c), type, size, len, j, name;
    c += 4;
    var attributes = [];
    for(var i = 0; i < n; i++)
    {
      type = v.getUint32(c);
      if(type != 0x01 && type != 0x10)
      {
        console.warn('unknown type ' + type);
      }
      c += 4;
      size = v.getUint32(c);
      c += 4;
      len = v.getUint16(c);
      c += 2;
      name = '';
      for(j = 0; j < len; j++)
      {
        name += String.fromCharCode(v.getUint8(c+j));
      }
      c += len;
      attributes.push(new VertexAttribute(name, size));
    }
    return attributes;
  };

  var fileMesh = function(gl, arraybuf)
  {
    var jd = new JavaDeserializer(arraybuf);
    var stream = jd.getStream();
    var blocks = stream.getContents();
    var values = blocks[0].contents.toArray();
    var attributeData = blocks[3].contents.toArray();
    var attributes = parseAttributes(attributeData);
    var faces = blocks[1].contents.toArray();
    //var lines = blocks[2].contents.toArray();
    Mesh.call(this, gl, values, attributes, faces);
  };
  inherits(fileMesh, Mesh);

  return fileMesh;
}());

var Program = (function(){

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

  // Taken from PhiloGL's program class:
  //Returns a Magic Uniform Setter
  var getUniformSetter = function(gl, program, info, isArray) {
    var name = info.name,
        loc = gl.getUniformLocation(program, name),
        type = info.type,
        matrix = false,
        vector = true,
        glFunction, typedArray;

    if (info.size > 1 && isArray) {
      switch(type) {
        case gl.FLOAT:
          glFunction = gl.uniform1fv;
          typedArray = Float32Array;
          vector = false;
          break;
        case gl.INT: case gl.BOOL: case gl.SAMPLER_2D: case gl.SAMPLER_CUBE:
          glFunction = gl.uniform1iv;
          typedArray = Uint16Array;
          vector = false;
          break;
      }
    }

    if (vector) {
      switch (type) {
        case gl.FLOAT:
          glFunction = gl.uniform1f;
          break;
        case gl.FLOAT_VEC2:
          glFunction = gl.uniform2fv;
          typedArray = isArray ? Float32Array : new Float32Array(2);
          break;
        case gl.FLOAT_VEC3:
          glFunction = gl.uniform3fv;
          typedArray = isArray ? Float32Array : new Float32Array(3);
          break;
        case gl.FLOAT_VEC4:
          glFunction = gl.uniform4fv;
          typedArray = isArray ? Float32Array : new Float32Array(4);
          break;
        case gl.INT: case gl.BOOL: case gl.SAMPLER_2D: case gl.SAMPLER_CUBE:
          glFunction = gl.uniform1i;
          break;
        case gl.INT_VEC2: case gl.BOOL_VEC2:
          glFunction = gl.uniform2iv;
          typedArray = isArray ? Uint16Array : new Uint16Array(2);
          break;
        case gl.INT_VEC3: case gl.BOOL_VEC3:
          glFunction = gl.uniform3iv;
          typedArray = isArray ? Uint16Array : new Uint16Array(3);
          break;
        case gl.INT_VEC4: case gl.BOOL_VEC4:
          glFunction = gl.uniform4iv;
          typedArray = isArray ? Uint16Array : new Uint16Array(4);
          break;
        case gl.FLOAT_MAT2:
          matrix = true;
          glFunction = gl.uniformMatrix2fv;
          break;
        case gl.FLOAT_MAT3:
          matrix = true;
          glFunction = gl.uniformMatrix3fv;
          break;
        case gl.FLOAT_MAT4:
          matrix = true;
          glFunction = gl.uniformMatrix4fv;
          break;
      }
    }

    //TODO(nico): Safari 5.1 doesn't have Function.prototype.bind.
    //remove this check when they implement it.
    if (glFunction.bind) {
      glFunction = glFunction.bind(gl);
    } else {
      var target = glFunction;
      glFunction = function() { target.apply(gl, arguments); };
    }

    //Set a uniform array
    if (isArray && typedArray) {
      return function(val) {
        glFunction(loc, new typedArray(val));
      };

    //Set a matrix uniform
    } else if (matrix) {
      return function(val) {
        glFunction(loc, false, val);
      };

    //Set a vector/typed array uniform
    } else if (typedArray) {
      return function(val) {
        typedArray.set(val.toFloat32Array ? val.toFloat32Array() : val);
        glFunction(loc, typedArray);
      };

    //Set a primitive-valued uniform
    } else {
      return function(val) {
        glFunction(loc, val);
      };
    }

    // FIXME: Unreachable code
    throw "Unknown type: " + type;

  };

  var program = function(gl, vertex, fragment)
  {
    GLBound.call(this, gl);
    this.program = null;
    this.vertexSource = fixPrecision(vertex);
    this.fragmentSource = fragment;
    this.attributes = {};
    this.uniforms = {};
  };
  inherits(program, GLBound);

  program.prototype.setupLocations = function()
  {
    var gl = this._gl, program = this.program;
    // this is taken partly from PhiloGL's Program class.
    //fill attribute locations
    var len = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES), info, name;
    for (var i = 0; i < len; i++) {
      info = gl.getActiveAttrib(program, i);
      this.attributes[info.name] = gl.getAttribLocation(program, info.name);
    }

    //create uniform setters
    len = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (i = 0; i < len; i++) {
      info = gl.getActiveUniform(program, i);
      name = info.name;
      //if array name then clean the array brackets
      name = name[name.length -1] == ']' ? name.substr(0, name.length -3) : name;
      this.uniforms[name] = getUniformSetter(gl, program, info, info.name != name);
    }
  };

  program.prototype.init = function()
  {
    var gl = this._gl, vertex, fragment;
    vertex = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex, this.vertexSource);
    gl.compileShader(vertex);
    if(!gl.getShaderParameter(vertex, gl.COMPILE_STATUS))
    {
      console.warn(gl.getShaderInfoLog(vertex));
      console.error('could not compile vertex shader: ' + this.vertexSource);
      throw 'Vertex shader compile error!';
    }
    fragment = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment, this.fragmentSource);
    gl.compileShader(fragment);
    if(!gl.getShaderParameter(fragment, gl.COMPILE_STATUS))
    {
      console.warn(gl.getShaderInfoLog(fragment));
      console.error('could not compile fragment shader: ' + this.fragmentSource);
      throw 'Fragment shader compile error!';
    }

    this.program = gl.createProgram();
    gl.attachShader(this.program, vertex);
    gl.attachShader(this.program, fragment);

    gl.linkProgram(this.program);

    if(!gl.getProgramParameter(this.program, gl.LINK_STATUS))
    {
      // TODO: verbose like above
      throw 'Could not link program';
    }
    gl.useProgram(this.program);

    this.setupLocations();

    //gl.useProgram(0);
  };

  program.prototype.use = function(fn)
  {
    var gl = this._gl;
    if(!this.program)
    {
      this.init();
    }
    else
    {
      gl.useProgram(this.program);
    }
    fn(this.attributes, this.uniforms);
    //gl.useProgram(0);
  };

  return program;
}());


imv.Program = Program;

var OpaqueProgram = (function(){

  var opaque = function(gl, vertex, fragment) {
    Program.call(this, gl, vertex, fragment);
  };
  inherits(opaque, Program);

  opaque.prototype.use = function(fn)
  {
    if(!this.program)
    {
      this.init();
    }
    var gl = this._gl;
    gl.useProgram(this.program);
    // init stuffs.
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    gl.depthMask(true);

    fn(this.attributes, this.uniforms);
    //gl.useProgram(0);
  };

  return opaque;
}());

imv.Programs = imv.Programs || {};
imv.Programs.Opaque = OpaqueProgram;

var GlowrampProgram = (function(){

  var glowramp = function(gl, vertex, fragment) {
    Program.call(this, gl, vertex, fragment);
  };
  inherits(glowramp, Program);

  glowramp.prototype.use = function(fn)
  {
    if(!this.program)
    {
      this.init();
    }
    var gl = this._gl;
    gl.useProgram(this.program);
    // init stuffs.
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.depthMask(false);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    fn(this.attributes, this.uniforms);
    //gl.useProgram(0);
  };

  return glowramp;
}());

imv.Programs = imv.Programs || {};
imv.Programs.Glowramp = GlowrampProgram;

var MeshDrawable = (function() {

  // private function ;)
  var _draw = function(locations, uniforms)
  {
    for(var i in this.uniforms)
    {
      if(this.uniforms.hasOwnProperty(i) && (i in uniforms))
      {
        uniforms[i](this.uniforms[i]);
      }
    }
    this.mesh.draw(locations);
  };

  var meshDrawable = function(program, mesh)
  {
    this.program = program;
    this.mesh = mesh;
    this.uniforms = {};
    this.elapsed = 0;
  };

  meshDrawable.prototype.draw = function()
  {
    this.program.use(_draw.bind(this));
  };

  meshDrawable.prototype.setUniform = function(name, value)
  {
    this.uniforms[name] = value;
  };

  meshDrawable.prototype.updateTime = function(delta) {
    this.elapsed += delta;
    if(this.onUpdate)
    {
      return this.onUpdate(delta, this.elapsed);
    }
    return true;
  };

  return meshDrawable;
}());

imv.MeshDrawable = MeshDrawable;

var ModelDrawable = (function() {

  var modelDrawable = function(program, mesh) {
    MeshDrawable.call(this, program, mesh);
    this.viewProject = mat4.create();
    this.model = mat4.create();
  };
  inherits(modelDrawable, MeshDrawable);

  modelDrawable.prototype.updateMatrix = function() {
    var mvp = mat4.create();
    mat4.multiply(mvp, this.viewProject, this.model);
    this.uniforms.u_modelViewProject = mvp;
  };

  modelDrawable.prototype.updateView = function(viewProject) {
    this.viewProject = viewProject;
    this.updateMatrix();
  };

  modelDrawable.prototype.setMatrix = function(mat) {
    this.model = mat;
    this.updateMatrix();
  };

  return modelDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Model = ModelDrawable;

var TexturedDrawable = function(program, mesh, texture) {
  ModelDrawable.call(this, program, mesh);
  this.texture = texture;
};
inherits(TexturedDrawable, ModelDrawable);

TexturedDrawable.prototype.draw = function()
{
  this.texture.use(0);
  this.uniforms.u_texture = 0;
  ModelDrawable.prototype.draw.call(this);
};

imv.Drawables = imv.Drawables || {};
imv.Drawables.Textured = TexturedDrawable;

var BicoloredDrawable = (function(){

  // default quality color: very rare
  var defaultColor0 = vec4.clone(constants.qualityColors.VERY_RARE);

  // default glow color: xm color
  var defaultColor1 = vec4.clone(constants.xmColors.coreGlow);

  var bicolorDrawable = function(program, mesh, texture, u_color0, u_color1) {
    TexturedDrawable.call(this, program, mesh, texture);
    this.uniforms.u_color0 = u_color0 || (vec4.clone(defaultColor0));
    this.uniforms.u_color1 = u_color1 || (vec4.clone(defaultColor1));
  };
  inherits(bicolorDrawable, TexturedDrawable);

  bicolorDrawable.prototype.setPrimaryColor = function(color)
  {
    this.uniforms.u_color0 = color;
  };

  bicolorDrawable.prototype.setSecondaryColor = function(color)
  {
    this.uniforms.u_color1 = color;
  };

  return bicolorDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Bicolored = BicoloredDrawable;

var GlowrampDrawable = (function(){

  // default base color: neutral portal color
  var defaultBaseColor = vec4.clone(imv.Constants.teamColors.NEUTRAL);

  var glowrampDrawable = function(program, mesh, texture, baseColor, rotation, rampTarget, alpha) {
    TexturedDrawable.call(this, program, mesh, texture);
    this.uniforms.u_baseColor = vec4.clone(defaultBaseColor);
    this.uniforms.u_rotation = rotation || 0;
    this.uniforms.u_rampTarget = rampTarget || 0;
    this.uniforms.u_alpha = alpha || 0.6;
  };
  inherits(glowrampDrawable, TexturedDrawable);

  glowrampDrawable.prototype.setBaseColor = function(color) {
    this.uniforms.u_baseColor = color;
  };

  glowrampDrawable.prototype.setAlpha = function(alpha) {
    this.uniforms.u_alpha = alpha;
  };

  glowrampDrawable.prototype.updateTime = function(tick) {
    var ret = ModelDrawable.prototype.updateTime.call(this, tick);
    var inc = this.elapsed / 5000;
    this.uniforms.u_rotation = inc;
    this.uniforms.u_rampTarget = Math.sin(Math.PI / 2 * (inc - Math.floor(inc)));
    this.uniforms.u_alpha = Math.sin(inc) * 0.05 + 0.75;
    return ret;
  };

  return glowrampDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Glowramp = GlowrampDrawable;

var XmDrawable = (function(){

  var defaultTeamColor = vec4.clone(constants.xmColors.coreGlow);
  var defaultAltColor = vec4.clone(constants.xmColors.coreGlowAlt);

  var xmDrawable = function(program, mesh, texture, teamColor, altColor, elapsed) {
    TexturedDrawable.call(this, program, mesh, texture);
    this.uniforms.u_elapsedTime = elapsed || 0;
    this.uniforms.u_teamColor = teamColor || vec4.clone(defaultTeamColor);
    this.uniforms.u_altColor = altColor || vec4.clone(defaultAltColor);
  };
  inherits(xmDrawable, TexturedDrawable);

  xmDrawable.prototype.setTeamColor = function(color) {
    this.uniforms.u_teamColor = color;
  };

  xmDrawable.prototype.setAltColor = function(color) {
    this.uniforms.u_altColor = color;
  };

  xmDrawable.prototype.updateTime = function(delta) {
    var ret = MeshDrawable.prototype.updateTime.call(this, delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  };

  return xmDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Xm = XmDrawable;

var ShieldEffectDrawable = (function(){

  // these defaults are whack.  Need to find the real
  // functions used to update these, too
  // As of 1.62.0, that was in ...ingress.common.scanner.b.a.d
  // The baksmali is a little jacked up, though.
  var defaultColor = vec4.clone(imv.Constants.teamColors.NEUTRAL),
    defaultRampTargetInv = vec2.fromValues(0.5, 1.3),
    defaultContributions = vec3.fromValues(0.5, 0.5, 0.5);

  var shieldEffectDrawable = function(program, mesh, texture, color, rampTargetInvWidth, contributions) {
    TexturedDrawable.call(this, program, mesh, texture);
    this.uniforms.u_color = color || vec4.clone(defaultColor);
    this.uniforms.u_rampTargetInvWidth = rampTargetInvWidth || vec2.clone(defaultRampTargetInv);
    this.uniforms.u_contributionsAndAlpha = contributions || vec3.clone(defaultContributions);
  };
  inherits(shieldEffectDrawable, TexturedDrawable);

  shieldEffectDrawable.prototype.setColor = function(color) {
    this.uniforms.u_color = color;
  };

  shieldEffectDrawable.prototype.updateTime = function(delta) {
    var ret = ModelDrawable.prototype.updateTime.call(this, delta);
    var inc = this.elapsed / 10000;
    this.uniforms.u_rampTargetInvWidth[0] = (inc - Math.floor(inc)) * -2.0 + 1.0;
    this.uniforms.u_rampTargetInvWidth[1] = (inc - Math.floor(inc)) * 2.0;
    return ret;
  };

  return shieldEffectDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.ShieldEffect = ShieldEffectDrawable;

var AssetManager = (function() {

  var assetManager = function(gl, manifest) {
    GLBound.call(this, gl);
    this.manifest = manifest;
    this.loader = new AssetLoader();
    this.textures = {};
    this.meshes = {};
    this.programs = {};
    this.queues = {
      texture: [],
      mesh: [],
      program: []
    };
    this.path = '/assets/';
  };
  inherits(assetManager, GLBound);

  assetManager.prototype.handleTexture = function(idx, name, info, err, value) {
    if(err)
    {
      this.queues.texture[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.textures[name] = new Texture(this._gl, info, value);
    this.queues.texture[idx] = 1;
    console.info('loaded texture ' + name);
  };

  assetManager.prototype.handleMesh = function(idx, name, info, err, value) {
    if(err)
    {
      this.queues.mesh[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.meshes[name] = new FileMesh(this._gl, value);
    this.queues.mesh[idx] = 1;
    console.info('loaded mesh ' + name);
  };

  assetManager.prototype.handleProgram = function(idx, name, info, err, vals) {
    if(err)
    {
      this.queues.program[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    var klass = Program;
    if(info.program in imv.Programs)
    {
      klass = imv.Programs[info.program];
    }
    this.programs[name] = new klass(this._gl, vals[0], vals[1]);
    this.queues.program[idx] = 1;
    console.info('loaded program ' + name);
  };

  assetManager.prototype.getTexture = function(name) {
    return this.textures[name];
  };

  assetManager.prototype.getMesh = function(name) {
    return this.meshes[name];
  };

  assetManager.prototype.getProgram = function(name) {
    return this.programs[name];
  };

  assetManager.prototype.loadAll = function() {
    var i, asset, manifest = this.manifest;
    for(i in manifest.texture)
    {
      if(manifest.texture.hasOwnProperty(i) && !(i in this.textures))
      {
        this.textures[i] = null;
        asset = manifest.texture[i];
        this.loader.loadAsset(
          this.path + asset.path,
          'image',
          this.handleTexture.bind(this, this.queues.texture.length, i, asset)
        );
        this.queues.texture.push(0);
      }
    }
    for(i in manifest.mesh)
    {
      if(manifest.mesh.hasOwnProperty(i) && !(i in this.meshes))
      {
        this.meshes[i] = null;
        asset = manifest.mesh[i];
        this.loader.loadAsset(
          this.path + asset.path,
          'arraybuffer',
          this.handleMesh.bind(this, this.queues.mesh.length, i, asset)
        );
        this.queues.mesh.push(0);
      }
    }
    for(i in manifest.program)
    {
      if(manifest.program.hasOwnProperty(i) && !(i in this.programs))
      {
        this.programs[i] = null;
        asset = manifest.program[i];
        this.loader.loadAssetGroup(
          [this.path + asset.vertex, this.path + asset.fragment],
          ['text', 'text'],
          this.handleProgram.bind(this, this.queues.program.length, i, asset)
        );
        this.queues.program.push(0);
      }
    }

    return this.getStatus.bind(this);
  };

  var areLoading = function(n, e) {
    if(e === 0) {
      n++;
    }
    return n;
  };

  var areLoaded = function(n, e) {
    if(e > 0) {
      n++;
    }
    return n;
  };

  var areError = function(n, e) {
    if(e < 0) {
      n++;
    }
    return n;
  };

  var summarize = function(queue) {
    return {
      total: queue.length,
      loading: queue.reduce(areLoading, 0),
      loaded: queue.reduce(areLoaded, 0),
      error: queue.reduce(areError, 0)
    };
  };

  assetManager.prototype.getStatus = function() {
    return {
      textures: summarize(this.queues.texture),
      meshes: summarize(this.queues.meshes),
      programs: summarize(this.queues.programs)
    };
  };

  return assetManager;
}());

imv.AssetManager = AssetManager;

var ObjectRenderer = (function(){

  var objectRenderer = function(gl, manager) {
    GLBound.call(this, gl);
    this.manager = manager;
    this.entities = [];
    this.viewProject = mat4.create();
  };
  inherits(objectRenderer, GLBound);

  objectRenderer.prototype.createDrawable = function(textureName, programName, meshName, proto) {
    var texture = this.manager.getTexture(textureName),
      program = this.manager.getProgram(programName),
      mesh = this.manager.getMesh(meshName);
    if(!texture) {
      console.warn('missing texture ' + textureName);
      return false;
    }
    if(!program) {
      console.warn('missing program ' + programName);
      return false;
    }
    if(!mesh) {
      console.warn('missing mesh ' + meshName);
      return false;
    }

    return new proto(program, mesh, texture);
  };

  objectRenderer.prototype.addDrawable = function(drawable) {
    if(drawable)
    {
      if(drawable.updateView)
      {
        drawable.updateView(this.viewProject);
      }
      this.entities.push(drawable);
    }
  };

  objectRenderer.prototype.loadDrawable = function(textureName, programName, meshName, drawable) {
    var item = this.createDrawable(textureName, programName, meshName, drawable);
    this.addDrawable(item);
    return item;
  };

  objectRenderer.prototype.addBicoloredDrawable = function(textureName, programName, meshName) {
    return this.loadDrawable(textureName, programName, meshName, BicoloredDrawable);
  };

  objectRenderer.prototype.addXmDrawable = function(textureName, programName, meshName) {
    return this.loadDrawable(textureName, programName, meshName, XmDrawable);
  };

  objectRenderer.prototype.addGlowrampDrawable = function(textureName, programName, meshName) {
    return this.loadDrawable(textureName, programName, meshName, GlowrampDrawable);
  };

  objectRenderer.prototype.addShieldEffectDrawable = function(textureName, programName, meshName) {
    return this.loadDrawable(textureName, programName, meshName, ShieldEffectDrawable);
  };

  objectRenderer.prototype.updateView = function(view, project) {
    var i, len = this.entities.length;
    mat4.multiply(this.viewProject, project, view);
    for(i = 0; i < len; i++)
    {
      if(this.entities[i].updateView) {
        this.entities[i].updateView(this.viewProject, view, project);
      }
    }
  };

  objectRenderer.prototype.render = function() {
    var i, len = this.entities.length;
    for(i = 0; i < len; i++)
    {
      this.entities[i].draw();
    }
  };

  objectRenderer.prototype.updateTime = function(delta) {
    var i, len = this.entities.length;
    for(i = 0; i < len; i++)
    {
      // if these return false, remove them from the render loop:
      if(!this.entities[i].updateTime(delta))
      {
        this.entities.splice(i, 1);
        i--;
        len--;
      }
    }
  };

  return objectRenderer;
}());

imv.Renderers = imv.Renderers || {};
imv.Renderers.Object = ObjectRenderer;

var DrawableSpec = function(texture, program, mesh, baseClass) {
  this.texture = texture;
  this.program = program;
  this.mesh = mesh;
  this.baseClass = baseClass;
};

DrawableSpec.prototype.createInstance = function(renderer) {
  return renderer.createDrawable(this.texture, this.program, this.mesh, this.baseClass);
};

imv.DrawableSpec = DrawableSpec;

var Entity = function(drawables) {

  var _specs = drawables;

  var entity = function(renderer) {
    this.drawables = [];
    this.renderer = renderer;
    for(var i = 0; i < _specs.length; i++)
    {
      this.drawables.push(_specs[i].createInstance(renderer));
    }
    this.transform = mat4.create();
  };

  entity.prototype.add = function() {
    for(var i = 0; i < this.drawables.length; i++)
    {
      this.renderer.addDrawable(this.drawables[i]);
    }
  };

  entity.prototype.applyTransform = function() {
    for(var i = 0; i < this.drawables.length; i++)
    {
      this.drawables[i].setMatrix(this.transform);
    }
  };

  entity.prototype.translate = function(vec) {
    mat4.translate(this.transform, this.transform, vec);
    this.applyTransform();
  };

  entity.prototype.rotate = function(quat) {
    var rotate = mat4.create();
    mat4.fromQuat(rotate, quat);
    mat4.multiply(this.transform, this.transform, rotate);
    this.applyTransform();
  };

  entity.prototype.setAnimation = function(animate) {
    for(var i = 0; i < this.drawables.length; i++)
    {
      this.drawables[i].onUpdate = animate;
    }
  };

  return entity;
};

imv.Entity = Entity;

var InventoryItemEntity = function(itemSpec, coreSpec, defaultQualityColor, defaultCoreColor) {

  //let's predictably order these, so we can access them
  // by index, for part-specific tasks (setting xm core
  // color, etc, etc.
  var drawables = [
    itemSpec,
    coreSpec
  ];
  var DEFAULT_QUALITY_COLOR = vec4.clone(defaultQualityColor);
  var DEFAULT_GLOW_COLOR = vec4.clone(defaultCoreColor);
  var DEFAULT_ALT_COLOR = vec4.clone(imv.Constants.xmColors.coreGlow);

  var base = Entity(drawables);

  var leveledItem = function(renderer, qualityColor, glowColor) {
    base.call(this, renderer);
    this.drawables[0].uniforms.u_color0 = qualityColor || DEFAULT_QUALITY_COLOR;
    this.drawables[0].uniforms.u_color1 =
      this.drawables[1].uniforms.u_teamColor = glowColor || DEFAULT_GLOW_COLOR;
    this.drawables[1].uniforms.u_altColor = DEFAULT_ALT_COLOR;
  };
  inherits(leveledItem, base);

  leveledItem.prototype.setQualityColor = function(color) {
    this.drawables[0].uniforms.u_color0 = color;
  };

  leveledItem.prototype.setCoreColor = function(color) {
    this.drawables[0].u_color0 = color;
    this.drawables[1].u_teamColor = color;
  };

  leveledItem.prototype.setQuality = function(quality) {
    var color;
    if(!(quality in imv.Constants.qualityColors))
    {
      console.warn("quality should be one of:\n" + Object.keys(imv.Constants.qualityColors).join("\n"));
      console.warn('use setQualityColor to set arbitrary colors');
      color = vec4.clone(DEFAULT_QUALITY_COLOR);
    }
    else
    {
      color = vec4.clone(imv.Constants.qualityColors[quality]);
    }
    this.setQualityColor(color);
  };

  // shortcut for ADA Refactor:
  leveledItem.prototype.setAdaCore = function() {
    var color = vec4.clone(imv.Constants.xmColors.coreGlowAda);
    this.setCoreColor(color);
  };

  leveledItem.prototype.setJarvisCore = function() {
    var color = vec4.clone(imv.Constants.xmColors.coreGlowJarvis);
    this.setCoreColor(color);
  };

  // shortcut (if necessary) for default core colors:
  leveledItem.prototype.setDefaultCore = function() {
    var color = vec4.clone(imv.Constants.xmColors.coreGlow);
    this.setCoreColor(color);
  };

  return leveledItem;
};

imv.Entities = imv.Entities || {};
imv.Entities.InventoryItem = InventoryItemEntity;

imv.Primitives = imv.Primitives || {};

// inventory items:
imv.Primitives.Inventory = imv.Primitives.Inventory || {};
imv.Primitives.Artifact = imv.Primitives.Artifact || {};
imv.Primitives.Resource = imv.Primitives.Resource || {};
imv.Entities = imv.Entities || {};

(function() {
  var createInventoryItem = function(name, itemMesh, coreMesh) {
    var item = new DrawableSpec('FlipCardTexture', 'bicolor_textured', itemMesh, BicoloredDrawable);
    var core = new DrawableSpec('ObjectXMTexture', 'xm', coreMesh, XmDrawable);
    imv.Primitives.Inventory[name] = item;
    imv.Primitives.Inventory[name + 'Core'] = core;
    imv.Entities[name] = Entity([item, core]);
  };

  var createResourceUnit = function(name) {
    imv.Primitives.Resource[name] =
      new DrawableSpec('FlipCardTexture', 'bicolor_textured', name + 'ResourceUnitMesh', BicoloredDrawable);
  };

  var createArtifact = function(series, index, frozen) {
    var suffix = frozen ? 'Frozen' : '';
    var name = series + suffix + index;
    imv.Primitives.Artifact[name] =
      new DrawableSpec('Artifact' + series + 'Texture', 'textured', name, TexturedDrawable);
  };

  var createSimple = function(name, caps) {
    createInventoryItem(name, name + 'Mesh', name + 'X' + (caps ? 'M' : 'm') + 'Mesh');
  };

  // inventory items:
  createSimple('Xmp', true);
  createSimple('Resonator', true);
  createSimple('Ultrastrike', true);
  createSimple('ResShield', true);
  createSimple('PowerCube', false);
  createSimple('LinkAmp', false);
  createSimple('HeatSink', false);
  createSimple('MultiHack', false);
  createSimple('ForceAmp', false);
  createSimple('Turret', false);
  createSimple('Capsule', false);
  createSimple('ExtraShield', true);
  createInventoryItem('FlipCardAda', 'FlipCardMeshAda', 'FlipCardXmMesh');
  createInventoryItem('FlipCardJarvis', 'FlipCardMeshJarvis', 'FlipCardXmMesh');

  // resource units:
  createResourceUnit('Xmp');
  createResourceUnit('Resonator');
  createResourceUnit('Ultrastrike');
  createResourceUnit('PortalShield');
  createResourceUnit('PowerCube');
  createResourceUnit('LinkAmp');
  createResourceUnit('HeatSink');
  createResourceUnit('MultiHack');
  createResourceUnit('ForceAmp');
  createResourceUnit('Turret');
  createResourceUnit('Capsule');
  createResourceUnit('ExtraShield');

  // artifacts:
  var series = {
    'Jarvis': 13,
    'Amar': 17,
    'Helios': 40
  };
  for(var i in series)
  {
    for(var j = 0; j < series[i]; j++)
    {
      createArtifact(i, j + 1, false);
      if(i !== 'Jarvis') {
        createArtifact(i, j + 1, true);
      }
    }
  }



}());

var Engine = function(canvas, assets)
{
  this.canvas = canvas;
  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if(!gl)
  {
    throw 'Could not initialize webgl';
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  this.gl = gl;
  this.view = mat4.create();
  mat4.lookAt(this.view, [0.0, 4.0, 10.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);
  this.project = mat4.create();
  this.assetManager = new AssetManager(this.gl, assets);
  this.objectRenderer = new ObjectRenderer(this.gl, this.assetManager);
  this.resize(canvas.width, canvas.height);
  this.start = this.last = null;
  this.paused = false;
  this.cleared = false;
  this.frame = null;
};

Engine.prototype.resize = function(width, height)
{
  this.gl.viewport(0, 0, width, height);
  mat4.perspective(this.project, 45, width / height, 0.1, 100);
  this.objectRenderer.updateView(this.view, this.project);
};

Engine.prototype.stop = function() {
  this.paused = true;
  this.cleared = false;
  if(this.frame) {
    window.cancelAnimationFrame(this.frame);
  }
};

Engine.prototype.start = function() {
  this.resize(this.canvas.width, this.canvas.height);
  this.render(0);
};

Engine.prototype.demo = function() {
  var x = -5, y = 0, z = 0;
  var i, j, item;
  for(i in imv.Primitives) {
    for(j in imv.Primitives[i])
    {
      item = imv.Primitives[i][j].createInstance(this.objectRenderer);
      if(item) {
        if(i === 'Artifact') {
          y = -14;
        }
        else {
          y = 0;
        }
        mat4.translate(item.model, item.model, vec3.fromValues(x, y, z));
        x++;
        if(x > 5) {
          x = -5;
          z--;
        }
        this.objectRenderer.addDrawable(item);
      }
    }
  }
};

Engine.prototype.render = function(tick)
{
  if(this.paused) {
    this.cleared = true;
    this.paused = false;
    return;
  }
  var delta = 0;
  if(!this.start)
  {
    this.start = tick;
    this.last = tick;
  }
  else
  {
    delta = tick - this.last;
    this.last = tick;
  }
  var gl = this.gl;
  // default setup stuff:
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.lineWidth(1.0);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  //gl.enable(gl.BLEND);
  //gl.depthMask(false);

  gl.disable(gl.BLEND);
  gl.depthMask(true);

  // render passes:
  this.objectRenderer.render();

  // run animations
  this.objectRenderer.updateTime(delta);

  // queue up next frame:
  this.frame = window.requestAnimationFrame(this.render.bind(this));
};

Engine.prototype.preload = function() {
  this.assetManager.load();
};

imv.Engine = Engine;

  imv.VERSION = '0.12.0';

  root.IMV = imv;

}(this));

//# sourceMappingURL=ingress-model-viewer.js.map