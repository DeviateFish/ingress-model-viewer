import GLBound from './gl-bound';

/**
 * Fixes an issue with shaders where the shader doesn't set a precision,
 * leading it to have a mismatch with its counterpart
 *
 * I.e. the vertex shader might set a precision, but the fragment shader
 * does not, leading to precision mismatch errors.
 * @param  {String} shader The shader to check/fix
 * @return {String}        The fixed shader, or the original if it needed
 *                         no patching.
 */
export function fixPrecision(shader)
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
}

// Taken from PhiloGL's program class:
//Returns a Magic Uniform Setter
function getUniformSetter(gl, program, info, isArray) {
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
      glFunction(loc, new typedArray(val)); // jshint ignore:line
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
}

/**
 * Represents a shader program consisting of a vertex shader and a fragment
 * shader.
 * @extends {GLBound}
 */
class Program extends GLBound {

  /**
   * Constructs a program from the given vertex and fragment shader strings.
   *
   * Manages the shader's attributes and uniforms.
   * @param  {context} gl      Webgl context
   * @param  {String} vertex   Vertex shader
   * @param  {String} fragment Fragment shader
   */
  constructor(gl, vertex, fragment) {
    super(gl);
    this.program = null;
    this.vertexSource = fixPrecision(vertex);
    this.fragmentSource = fragment;
    this.attributes = {};
    this.uniforms = {};
  }

  /**
   * Initialize the shader
   *
   * Parses out shader parameters, compiles the shader, and binds it to
   * the context.
   */
  init() {
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

    this._setupLocations();
  }

  /**
   * Use the program with the given draw function
   * @param  {Function} fn Function to handle the actual drawing.
   *                       The programs attributes and uniforms will
   *                       be passed to the draw function for use.
   */
  use(fn) {
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
  }

  _setupLocations() {
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
  }
}

export default Program;
