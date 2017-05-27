var IMV =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.1
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (false) {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/*
* Rotate a 3D vector around the x-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/*
* Rotate a 3D vector around the y-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/*
* Rotate a 3D vector around the z-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[7]-m[5])*fRoot;
        out[1] = (m[2]-m[6])*fRoot;
        out[2] = (m[3]-m[1])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glMatrix = __webpack_require__(0);

/**
 * A bunch of useful constants.
 * @type {Object}
 */
var Constants = {
  /**
   * Short list of team colors by internal name.
   * @type {Object}
   */
  teamColors: {
    RESISTANCE: _glMatrix.vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    ENLIGHTENED: _glMatrix.vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0),
    NEUTRAL: _glMatrix.vec4.fromValues(0.9764705882352941, 0.9764705882352941, 0.9764705882352941, 1.0),
    LOKI: _glMatrix.vec4.fromValues(1, 0.1568627450980392, 0.1568627450980392, 1.0)
  },
  /**
   * Quality and level colors, by internal name.
   * @type {Object}
   */
  qualityColors: {
    EXTREMELY_RARE: _glMatrix.vec4.fromValues(0.9803921568627451, 0.39215686274509803, 0.39215686274509803, 1.0),
    VERY_RARE: _glMatrix.vec4.fromValues(0.9568627450980393, 0.5215686274509804, 0.9254901960784314, 1.0),
    MORE_RARE: _glMatrix.vec4.fromValues(0.7647058823529411, 0, 1, 1.0),
    RARE: _glMatrix.vec4.fromValues(0.6666666666666666, 0.5372549019607843, 0.984313725490196, 1.0),
    LESS_COMMON: _glMatrix.vec4.fromValues(0.45098039215686275, 0.6588235294117647, 1, 1.0),
    COMMON: _glMatrix.vec4.fromValues(0.5098039215686274, 0.9529411764705882, 0.7058823529411765, 1.0),
    VERY_COMMON: _glMatrix.vec4.fromValues(0.6980392156862745, 0.6980392156862745, 0.6980392156862745, 1.0),
    L1: _glMatrix.vec4.fromValues(0.996078431372549, 0.807843137254902, 0.35294117647058826, 1.0),
    L2: _glMatrix.vec4.fromValues(1, 0.6509803921568628, 0.18823529411764706, 1.0),
    L3: _glMatrix.vec4.fromValues(1, 0.45098039215686275, 0.08235294117647059, 1.0),
    L4: _glMatrix.vec4.fromValues(0.8941176470588236, 0, 0, 1.0),
    L5: _glMatrix.vec4.fromValues(0.9921568627450981, 0.1607843137254902, 0.5725490196078431, 1.0),
    L6: _glMatrix.vec4.fromValues(0.9215686274509803, 0.14901960784313725, 0.803921568627451, 1.0),
    L7: _glMatrix.vec4.fromValues(0.7568627450980392, 0.1411764705882353, 0.8784313725490196, 1.0),
    L8: _glMatrix.vec4.fromValues(0.5882352941176471, 0.15294117647058825, 0.9568627450980393, 1.0)
  },
  /**
   * Color constants for anomaly markers.
   * @type {Object}
   */
  anomalyColors: {
    1: _glMatrix.vec4.fromValues(1.0, 0.5686274509803921, 0.21176470588235294, 1.0),
    2: _glMatrix.vec4.fromValues(1.0, 0.3215686274509804, 0.9058823529411765, 1.0),
    3: _glMatrix.vec4.fromValues(0.6196078431372549, 0.35294117647058826, 1.0, 1.0),
    4: _glMatrix.vec4.fromValues(0.8431372549019608, 0.27058823529411763, 0.27058823529411763, 1.0),
    5: _glMatrix.vec4.fromValues(1.0, 0.9450980392156862, 0.0, 1.0),
    6: _glMatrix.vec4.fromValues(0.6509803921568628, 1.0, 0.9019607843137255, 1.0),
    7: _glMatrix.vec4.fromValues(0.5725490196078431, 0.5803921568627451, 0.592156862745098, 1.0)
  },
  /**
   * Glow colors for the various artifact<color>Glow decorations for shard portals and
   * target portals, by series.
   * @type {Object}
   */
  artifactGlowColors: {
    Helios: {
      Red: _glMatrix.vec4.fromValues(0.92, 0.51, 0.14, 1.0),
      Purple: _glMatrix.vec4.fromValues(1.0, 0.87, 0.55, 1.0),
      Target: _glMatrix.vec4.fromValues(1.0, 0.72, 0.0, 1.0)
    },
    Amar: {
      Target: _glMatrix.vec4.fromValues(0.62, 0.22, 0.62, 1.0),
      Red: _glMatrix.vec4.fromValues(0.79, 0.11, 0.49, 1.0),
      Purple: _glMatrix.vec4.fromValues(0.58, 0.17, 1.0, 1.0)
    },
    Jarvis: {
      Target: _glMatrix.vec4.fromValues(0.62, 0.22, 0.62, 1.0),
      Red: _glMatrix.vec4.fromValues(0.79, 0.11, 0.49, 1.0),
      Purple: _glMatrix.vec4.fromValues(0.58, 0.17, 1.0, 1.0)
    },
    Shonin: {
      Red: _glMatrix.vec4.fromValues(0.78, 0.84, 1.0, 1.0),
      Purple: _glMatrix.vec4.fromValues(0.25, 0.81, 1.0, 1.0),
      Target: _glMatrix.vec4.fromValues(0.70, 0.70, 0.70, 1.0)
    },
    Lightman: {
      Red: _glMatrix.vec4.fromValues(1.0, 0.44, 0.45, 1.0),
      Purple: _glMatrix.vec4.fromValues(1.0, 0.24, 0.25, 1.0),
      Target: _glMatrix.vec4.fromValues(0.74, 0.0, 0.02, 1.0)
    },
    Abaddon1: {
      Red: _glMatrix.vec4.fromValues(1.0, 0.7, 0.86, 1.0),
      Purple: _glMatrix.vec4.fromValues(0.82, 0.7, 1.0, 1.0),
      Target: _glMatrix.vec4.fromValues(0.0, 0.95, 0.4, 1.0)
    },
    Abaddon2: {
      Red: _glMatrix.vec4.fromValues(0.7, 1.0, 0.87, 1.0),
      Purple: _glMatrix.vec4.fromValues(0.86, 0.7, 1.0, 1.0),
      Target: _glMatrix.vec4.fromValues(0.0, 0.59, 1.0, 1.0)
    },
    Shard2017: {
      Red: _glMatrix.vec4.fromValues(0.7, 1.0, 0.87, 1.0),
      Purple: _glMatrix.vec4.fromValues(0.86, 0.7, 1.0, 1.0),
      Target: _glMatrix.vec4.fromValues(0.0, 0.59, 1.0, 1.0)
    }
  },
  /**
   * Constants for xm glow colors (for item xm cores)
   * @type {Object}
   */
  xmColors: {
    coreGlow: _glMatrix.vec4.fromValues(0.92, 0.7, 0.89, 1.0),
    coreGlowAlt: _glMatrix.vec4.fromValues(0.6, 0.4, 0.6, 0.8),
    coreGlowAda: _glMatrix.vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    coreGlowJarvis: _glMatrix.vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0)
  },
  /**
   * Mesh internal name constants.
   * @type {Object}
   */
  Mesh: {
    Inventory: {
      Xmp: 'XmpMesh',
      XmpXm: 'XmpXMMesh',
      Ultrastrike: 'UltrastrikeMesh',
      UltrastrikeXm: 'UltrastrikeXMMesh',
      ResShield: 'ResShieldMesh',
      ResShieldXm: 'ResShieldXMMesh',
      PowerCube: 'PowerCubeMesh',
      PowerCubeXm: 'PowerCubeXmMesh',
      LinkAmp: 'LinkAmpMesh',
      LinkAmpXm: 'LinkAmpXmMesh',
      UltraLinkAmp: 'UltraLinkAmpMesh',
      UltraLinkAmpXm: 'UltraLinkAmpXmMesh',
      HeatSink: 'HeatSinkMesh',
      HeatSinkXm: 'HeatSinkXmMesh',
      MultiHack: 'MultiHackMesh',
      MultiHackXm: 'MultiHackXmMesh',
      ForceAmp: 'ForceAmpMesh',
      ForceAmpXm: 'ForceAmpXmMesh',
      Turret: 'TurretMesh',
      TurretXm: 'TurretXmMesh',
      FlipCardAda: 'FlipCardMeshAda',
      FlipCardJarvis: 'FlipCardMeshJarvis',
      FlipCardXm: 'FlipCardXmMesh',
      Resonator: 'ResonatorMesh',
      ResonatorXm: 'ResonatorXMMesh',
      Capsule: 'CapsuleMesh',
      InterestCapsule: 'InterestCapsuleMesh',
      KeyCapsule: 'KeyCapsuleMesh',
      CapsuleXm: 'CapsuleXmMesh',
      Mysterious: 'MysteriousMesh',
      MysteriousXm: 'MysteriousXmMesh',
      Niantic: 'NianticMesh',
      ExtraShield: 'ExtraShieldMesh',
      MediaCube: 'MediaCubeMesh',
      MediaPlaneMesh: 'MediaPlaneMesh'
    },
    Resource: {
      Xmp: 'XmpResourceUnitMesh',
      PortalKeyResourceUnit: 'PortalKeyResourceUnit',
      Ultrastrike: 'UltrastrikeResourceUnitMesh',
      PowerCube: 'PowerCubeResourceUnitMesh',
      LinkAmp: 'LinkAmpResourceUnitMesh',
      UltraLinkAmp: 'UltraLinkAmpResourceUnitMesh',
      HeatSink: 'HeatSinkResourceUnitMesh',
      MultiHack: 'MultiHackResourceUnitMesh',
      ForceAmp: 'ForceAmpResourceUnitMesh',
      Turret: 'TurretResourceUnitMesh',
      FlipCardAda: 'FlipCardResourceUnitMeshAda',
      FlipCardJarvis: 'FlipCardResourceUnitMeshJarvis',
      Resonator: 'ResonatorResourceUnitMesh',
      PortalShield: 'PortalShieldResourceUnitMesh',
      Capsule: 'CapsuleResourceUnitMesh',
      InterestCapsule: 'InterestCapsuleResourceUnitMesh',
      Mysterious: 'MysteriousResourceUnitMesh',
      ExtraShield: 'ExtraShieldResourceUnitMesh'
    },
    Player: {
      Player: 'PlayerMesh',
      PlayerEdge: 'PlayerMeshEdge',
      PlayerReflection: 'PlayerMeshReflection',
      PlayerGlow: 'PlayerMeshGlow',
      BreadCrumb: 'BreadCrumbMesh',
      Compass: 'CompassMesh'
    },
    Ornament: {
      MeetupPoint: 'OrnamentMeetupPointMesh',
      FinishPoint: 'OrnamentFinishPointMesh',
      Cluster: 'OrnamentClusterMesh',
      Volatile: 'OrnamentVolatileMesh'
    },
    World: {
      Shield: 'PortalShieldMesh',
      Portal: 'TexturedPortalMesh',
      Waypoint: 'TexturedScannerFTMesh',
      Resonator: 'ResonatorUnitLowResMesh',
      XmpRing: 'XmpRingMesh',
      UltraStrikeRing: 'UltraStrikeRingMesh',
      UltraStrikeColumn: 'UltraStrikeColumnMesh',
      ArtifactsRedGlow: 'ArtifactsRedGlow',
      ArtifactsGreenGlow: 'ArtifactsGreenGlow',
      ArtifactsPurpleGlow: 'ArtifactsPurpleGlow',
      ArtifactsTargetGlow: 'ArtifactsTargetGlow',
      SingleResonator: 'SingleResonatorMesh',
      OrnamentMeetupPoint: 'OrnamentMeetupPointMesh',
      OrnamentFinishPoint: 'OrnamentFinishPointMesh',
      OrnamentCluster: 'OrnamentClusterMesh',
      OrnamentVolatile: 'OrnamentVolatileMesh'
    }
  },
  /**
   * Program internal name constants.
   * @type {Object}
   */
  Program: {
    Bicolored: 'bicolor_textured',
    Textured: 'textured',
    RegionTextured: 'region_textured',
    Glowramp: 'portal_scanner',
    Xm: 'xm',
    ShieldEffect: 'shield',
    Atmosphere: 'atmosphere',
    Link: 'LinkShader',
    SphericalLink: 'link3d',
    ParticlePortal: 'particle_portals'
  },
  /**
   * Texture internal name constants.
   * @type {Object}
   */
  Texture: {
    FlipCard: 'FlipCardTexture',
    Xm: 'ObjectXMTexture',
    Glowramp: 'GlowrampTexture',
    Media: 'MediaCubeTexture',
    Waypoint: 'FtWaypointTexture',
    ShieldEffect: 'PortalShieldTexture',
    ColorGlow: 'ColorGlowTexture',
    TargetGlow: 'TargetGlowTexture',
    PortalLink: 'PortalLinkTexture',
    ResonatorLink: 'ResonatorLinkTexture',
    OrnamentMeetupPoint: 'OrnamentMeetupPointTexture',
    OrnamentFinishPoint: 'OrnamentFinishPointTexture',
    OrnamentCluster: 'OrnamentClusterTexture',
    OrnamentVolatile: 'OrnamentVolatileTexture',
    Particle: 'ParticleTexture'
  }
};

exports.default = Constants;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _drawable = __webpack_require__(9);

var _drawable2 = _interopRequireDefault(_drawable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A TexturedDrawable is a Drawable with a specific texture
 *
 * @param  {String} programName Program internal name
 * @param  {String} meshName    Mesh internal name
 * @param  {String} textureName Texture internal name
 */
var TexturedDrawable = function (_Drawable) {
  _inherits(TexturedDrawable, _Drawable);

  function TexturedDrawable(programName, meshName, textureName) {
    _classCallCheck(this, TexturedDrawable);

    var _this = _possibleConstructorReturn(this, (TexturedDrawable.__proto__ || Object.getPrototypeOf(TexturedDrawable)).call(this, programName, meshName));

    _this.textureName = textureName;
    _this.texture = null;
    return _this;
  }

  /**
   * Draw the textured object
   *
   * @return {void}
   */


  _createClass(TexturedDrawable, [{
    key: 'draw',
    value: function draw() {
      if (this.ready) {
        this.texture.use(0);
        this.uniforms.u_texture = 0;
        _get(TexturedDrawable.prototype.__proto__ || Object.getPrototypeOf(TexturedDrawable.prototype), 'draw', this).call(this);
      }
    }
  }, {
    key: '_loadAssets',
    value: function _loadAssets(manager) {
      var _this2 = this;

      var promises = _get(TexturedDrawable.prototype.__proto__ || Object.getPrototypeOf(TexturedDrawable.prototype), '_loadAssets', this).call(this, manager);
      promises.push(manager.loadTexture(this.textureName).then(function (texture) {
        _this2.texture = texture;
      }).catch(function (err) {
        console.warn('missing texture ' + _this2.textureName); // eslint-disable-line no-console
        return Promise.reject(err);
      }));
      return promises;
    }
  }]);

  return TexturedDrawable;
}(_drawable2.default);

exports.default = TexturedDrawable;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glBound = __webpack_require__(4);

var _glBound2 = _interopRequireDefault(_glBound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MODE_TRIANGLES = 'triangles';
var MODE_LINES = 'lines';

/**
 * Base class for all meshes
 *
 * @extends {GLBound}
 * @param  {context} gl              A webgl context
 * @param  {Float32Array} attributes A typed array of vertex attributes
 * @param  {Uint16Array} faces       A typed array of face indices
 * @param  {Uint16Array} lines       A typed array of line indices
 */

var Mesh = function (_GLBound) {
  _inherits(Mesh, _GLBound);

  function Mesh(gl, attributes, faces, lines) {
    _classCallCheck(this, Mesh);

    var _this = _possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this, gl));

    _this.attributes = attributes;
    _this.faces = faces;
    _this.lines = lines;
    _this.bounds = null;
    _this.center = null;
    return _this;
  }

  /**
   * Given a set of locations from the currently-active shader, draw this mesh
   * @param {Object} locations A hash of locations by name
   * @param {String} mode (optional) The draw mode
   *                      Either MODE_TRIANGLES or MODE_LINES
   * @return {void}
   */


  _createClass(Mesh, [{
    key: 'draw',
    value: function draw(locations, mode) {
      mode = mode || MODE_TRIANGLES;
      this.attributes.draw(locations);
      if (mode === MODE_TRIANGLES) {
        this.faces.draw();
      } else if (mode === MODE_LINES) {
        this.lines.draw();
      }
    }

    /**
     * Calculate the bounding box of the mesh
     * @param  {Number} coordAttribute Index of the attribute representing vertex position
     * @return {Object}                An object consisting of two arrays of the same length
     *                                 as the coordinate attribute, representing min and max
     *                                 coordinates.
     */

  }, {
    key: 'boundingBox',
    value: function boundingBox(coordAttribute) {
      if (!this.bounds) {
        coordAttribute = coordAttribute === undefined ? 0 : coordAttribute;
        var bounds = {
          max: null,
          min: null
        };
        this.attributes.eachAttribute(coordAttribute, function (arr) {
          if (bounds.max) {
            bounds.max = bounds.max.map(function (e, i) {
              return Math.max(e, arr[i]);
            });
          } else {
            bounds.max = Array.prototype.slice.call(arr);
          }
          if (bounds.min) {
            bounds.min = bounds.min.map(function (e, i) {
              return Math.min(e, arr[i]);
            });
          } else {
            bounds.min = Array.prototype.slice.call(arr);
          }
        });
        this.bounds = bounds;
      }
      return this.bounds;
    }
  }, {
    key: 'centerOfMass',
    value: function centerOfMass(coordAttribute) {
      if (!this.center) {
        coordAttribute = coordAttribute === undefined ? 0 : coordAttribute;
        var sum = null,
            count = 0;
        this.attributes.eachAttribute(coordAttribute, function (arr) {
          count++;
          if (sum) {
            sum = sum.map(function (e, i) {
              return e + arr[i];
            });
          } else {
            sum = Array.prototype.slice.call(arr);
          }
        });
        this.center = sum.map(function (e) {
          return e / count;
        });
      }
      return this.center;
    }

    /**
     * Calculate the center of the bounding box.
     * @param  {Number} coordAttribute Index of the attribute represention vertex position.
     * @return {mixed}                 A vector of the same size as the position attribute,
     *                                 representing the center of the bounding box.
     */

  }, {
    key: 'boundingBoxCenter',
    value: function boundingBoxCenter(coordAttribute) {
      if (!this.bounds) {
        this.boundingBox(coordAttribute);
      }
      return this.bounds.max.map(function (e, i) {
        return (e - this.bounds.min[i]) / 2;
      }.bind(this));
    }
  }]);

  return Mesh;
}(_glBound2.default);

/**
 * Specifies drawing in `lines` mode
 * @type {String}
 */


Mesh.MODE_LINES = MODE_LINES;

/**
 * Specifies drawing in `triangles` mode
 * @type {String}
 */
Mesh.MODE_TRIANGLES = MODE_TRIANGLES;

exports.default = Mesh;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for all things bound to a gl context.
 *
 * @param  {context} gl  A webgl context
 */
var GLBound = function GLBound(gl) {
  _classCallCheck(this, GLBound);

  this._gl = gl;
};

exports.default = GLBound;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glBuffer = __webpack_require__(23);

var _glBuffer2 = _interopRequireDefault(_glBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A GLAttribute is a GLBuffer that represents vertex attributes
 *
 * @private
 * @extends {GLBuffer}
 * @chainable
 * @param  {context} gl             WebGLContext
 * @param  {Array} attributes       An array of VertexAttributes
 * @param  {ArrayBuffer} values     Values to fill the buffer with
 * @param  {enum} usage             Usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
 * @return {this} The new GLAttribute
 */
var GLAttribute = function (_GLBuffer) {
  _inherits(GLAttribute, _GLBuffer);

  function GLAttribute(gl, attributes, values, usage) {
    var _ret;

    _classCallCheck(this, GLAttribute);

    usage = usage || gl.STATIC_DRAW;

    var _this = _possibleConstructorReturn(this, (GLAttribute.__proto__ || Object.getPrototypeOf(GLAttribute)).call(this, gl, gl.ARRAY_BUFFER, usage));

    _this.attributes = attributes;
    _this.values = values;
    _this.size = _this.count = null;
    _this._validate = false;
    _this.size = 0;
    _this.width = 0;
    for (var i = 0, a; i < _this.attributes.length; i++) {
      a = _this.attributes[i];
      _this.size += 4 * a.size; // 4 because float is 4 bytes.
      _this.width += a.size;
    }
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Confirms that the underlying buffer's length is an even multiple
   * of total size of the attributes for the buffer
   *
   * Issues a warning if not.
   *
   * @return {void}
   */


  _createClass(GLAttribute, [{
    key: 'validate',
    value: function validate() {
      if (this._validate) {
        if (this.values.length % this.width !== 0) {
          console.warn('values array length is not an even multiple of the total size of the attributes'); // eslint-disable-line no-console
        }
      }
    }

    /**
     * Update the values in the buffer and pushes the buffer to the gpu
     *
     * @chainable
     * @param  {ArrayBuffer} values New values to write to the buffer
     *
     * @return {this} Returns `this`
     */

  }, {
    key: 'updateValues',
    value: function updateValues(values) {
      this.values = values;
      this.validate();
      return this.update();
    }

    /**
     * Given a set of program locations, set up the attribute pointers
     *
     * @chainable
     * @param  {Object} locations Map of attribute names to program locations
     *
     * @return {this} Returns `this`
     */

  }, {
    key: 'draw',
    value: function draw(locations) {
      var gl = this._gl;
      var a,
          s = 0;
      if (!this.glBuf) {
        this.update();
      } else {
        this.bindBuffer();
      }
      for (var i = 0; i < this.attributes.length; i++) {
        a = this.attributes[i];
        if (a.name in locations) {
          gl.enableVertexAttribArray(locations[a.name]);
          gl.vertexAttribPointer(locations[a.name], a.size, gl.FLOAT, false, this.size, s);
        }
        // I don't know if I should suppress this, but if I
        // don't, it generates one warning per frame.
        //console.warn('Program is missing attribute ' + a.name);
        s += 4 * a.size;
      }
      return this; //.unbindBuffer();  // maybe?
    }

    /**
     * Perform some operation on each set of values for some attribute
     *
     * @chainable
     * @param  {Number}   attributeIndex Index of the attribute to select
     * @param  {Function} callback       Callback
     *
     * @return {this} Returns `this`
     */

  }, {
    key: 'eachAttribute',
    value: function eachAttribute(attributeIndex, callback) {
      var offset = 0,
          size,
          i;
      if (attributeIndex >= 0 && attributeIndex < this.attributes.length) {
        for (i = 0; i < attributeIndex; i++) {
          offset += this.attributes[i].size;
        }
        size = this.attributes[attributeIndex].size;
        for (i = offset; i < this.values.length; i += this.width) {
          callback(this.values.subarray(i, i + size));
        }
      }
      return this;
    }
  }]);

  return GLAttribute;
}(_glBuffer2.default);

exports.default = GLAttribute;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glBuffer = __webpack_require__(23);

var _glBuffer2 = _interopRequireDefault(_glBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A GLIndex is a GLBuffer representing an index buffer of some kind
 *
 * @private
 * @extends {GLBuffer}
 * @chainable
 * @param  {context} gl           WebGL context
 * @param  {ArrayBuffer} values   Values to initialize the buffer with
 * @param  {enum} drawMode        Draw mode @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.11
 * @param  {enum} usage           Usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
 * @return {this} The new GLIndex
 */
var GLIndex = function (_GLBuffer) {
  _inherits(GLIndex, _GLBuffer);

  function GLIndex(gl, values, drawMode, usage) {
    var _ret;

    _classCallCheck(this, GLIndex);

    usage = usage || gl.STATIC_DRAW;

    var _this = _possibleConstructorReturn(this, (GLIndex.__proto__ || Object.getPrototypeOf(GLIndex)).call(this, gl, gl.ELEMENT_ARRAY_BUFFER, usage));

    _this.mode = drawMode;
    _this.values = values;
    _this.count = null;
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Perform a draw call using this index buffer.
   *
   * @chainable
   * @return {this} Returns `this`
   */


  _createClass(GLIndex, [{
    key: 'draw',
    value: function draw() {
      var gl = this._gl;
      if (!this.glBuf) {
        this.update();
      } else {
        this.bindBuffer();
      }
      gl.drawElements(this.mode, this.values.length, gl.UNSIGNED_SHORT, 0);
      return this;
    }
  }]);

  return GLIndex;
}(_glBuffer2.default);

exports.default = GLIndex;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A vertex attribute
 *
 * @param  {String} name Name of the attribute
 * @param  {Number} size Size of the attribute (in bytes)
 * @param  {Number} type The type of vertex attribute
 */
var VertexAttribute = function VertexAttribute(name, size, type) {
  _classCallCheck(this, VertexAttribute);

  this.name = name;
  this.size = size;
  this.type = type;
};

exports.default = VertexAttribute;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.resetGL = resetGL;
exports.setParams = setParams;
exports.disco = disco;
exports.makeArtifact = makeArtifact;
exports.generateArtifacts = generateArtifacts;

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Reset the GL state to some base state
 * @param  {context} gl A WebGL context
 * @return {void}
 */
function resetGL(gl) {
  gl.lineWidth(1.0);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.blendEquation(gl.FUNC_ADD);
  //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.BLEND);
  gl.depthMask(true);
}

/**
 * Set parameters base on some base set of defaults
 * @param {Object} base  Parameter definition with defaults
 * @param {Object} opts  Options (overrides)
 * @param {Boolean} deep Do deep copying on objects.
 * @return {Object} The base object
 */
function setParams(base, opts, deep) {
  for (var i in base) {
    if (base.hasOwnProperty(i) && opts.hasOwnProperty(i)) {
      if (deep && _typeof(base[i]) == 'object' && _typeof(opts[i]) == 'object') {
        base[i] = setParams(base[i], opts[i], deep);
      } else {
        base[i] = opts[i];
      }
    }
  }
  return base;
}

/**
 * Disco portal animation
 * @param  {Number} delta   Time since last frame
 * @param  {Number} elapsed Total time elapsed
 * @return {Boolean}        Returns true to continue animation
 */
function disco(delta, elapsed) {
  var inc = elapsed / 1000;
  this.uniforms.u_baseColor[0] = Math.sin(inc);
  this.uniforms.u_baseColor[1] = Math.sin(inc + 2 * Math.PI / 3);
  this.uniforms.u_baseColor[2] = Math.sin(inc + 4 * Math.PI / 3);
  return true;
}

/**
 * Makes an artifact drawable class
 * @param  {String} meshName    Name of the mesh to use
 * @param  {String} textureName Name of the texture to use
 * @return {ArtifactDrawable}   A new drawable class for this artifact
 */
function makeArtifact(meshName, textureName) {
  var artifact = function (_TexturedDrawable) {
    _inherits(artifact, _TexturedDrawable);

    function artifact() {
      _classCallCheck(this, artifact);

      return _possibleConstructorReturn(this, (artifact.__proto__ || Object.getPrototypeOf(artifact)).call(this, _constants2.default.Program.Textured, meshName, textureName));
    }

    return artifact;
  }(_textured2.default);

  return artifact;
}

/**
 * Generate a set of artifacts
 *
 * @private
 * @param  {String}  series    Series name
 *                             Should match the internal name of the resources
 * @param  {Number}  num       Number of artifacts in the series
 * @param  {Boolean} hasFrozen Whether or not the series also includes frozen
 *                             variants
 * @return {Object}            Object containing artifact drawable classes
 *                             for each artifact.
 */
function generateArtifacts(series, num, hasFrozen) {
  var i,
      meshName,
      textureName = 'Artifact' + series + 'Texture';

  var artifacts = {};

  for (i = 1; i <= num; i++) {
    meshName = series + i;
    artifacts['' + i] = makeArtifact(meshName, textureName);
  }
  if (hasFrozen) {
    for (i = 1; i <= num; i++) {
      meshName = series + 'Frozen' + i;
      artifacts['Frozen' + i] = makeArtifact(meshName, textureName);
    }
  }

  return artifacts;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(0);

var _animator = __webpack_require__(21);

var _animator2 = _interopRequireDefault(_animator);

var _mesh = __webpack_require__(3);

var _mesh2 = _interopRequireDefault(_mesh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for all "drawable" things.
 *
 * Requires, at the very least, a program to run.
 */
var Drawable = function () {

  /**
   * Given a mesh internal name and a program internal name, construct
   * a Drawable
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal Name
   */
  function Drawable(programName, meshName) {
    _classCallCheck(this, Drawable);

    this.programName = programName;
    this.meshName = meshName;
    this.mesh = null;
    this.program = null;
    this.uniforms = {};
    this.drawfn = this._draw.bind(this);
    this.elapsed = 0;
    this.ready = false;
    this.viewProject = _glMatrix.mat4.create();
    this._translate = _glMatrix.vec3.create();
    this._rotate = _glMatrix.quat.create();
    this._scale = _glMatrix.vec3.fromValues(1, 1, 1);
    this._model = _glMatrix.mat4.create();
    this._ray = _glMatrix.vec3.create();
    this.local = _glMatrix.mat4.create();
    this.world = _glMatrix.mat4.create();
    this.uniforms.u_modelViewProject = _glMatrix.mat4.create();
    this.children = [];
    this.drawMode = _mesh2.default.MODE_TRIANGLES;
    this.animator = new _animator2.default();
  }

  _createClass(Drawable, [{
    key: '_loadAssets',
    value: function _loadAssets(manager) {
      var _this = this;

      var promises = [];
      if (this.meshName) {
        promises.push(manager.loadMesh(this.meshName).then(function (mesh) {
          _this.mesh = mesh;
          return mesh;
        }).catch(function (err) {
          console.warn('missing mesh ' + _this.meshName); // eslint-disable-line no-console
          return Promise.reject(err);
        }));
      }
      if (this.programName) {
        promises.push(manager.loadProgram(this.programName).then(function (program) {
          _this.program = program;
          return program;
        }).catch(function (err) {
          console.warn('missing program' + _this.programName); // eslint-disable-line no-console
          return Promise.reject(err);
        }));
      }
      return promises;
    }

    /**
     * Initializer for the drawable
     *
     * Hooks up the drawable to all its gl-bound resources
     *
     * @param  {AssetManager} manager AssetManager containing the managed resources for this
     *                                drawable.
     * @return {Promise}              Resolves if the assets are successfully found and initialized,
     *                                rejects (and generates a warning) otherwise.
     */

  }, {
    key: 'init',
    value: function init(manager) {
      var _this2 = this;

      var promises = this._loadAssets(manager);
      return Promise.all(promises).then(function () {
        _this2.ready = true;
        return _this2;
      });
    }

    /**
     * Sets the specific draw function for this drawable
     *
     * @chainable
     * @param {Function} fn The draw function to use when drawable this object
     * @return {this} Returns `this`
     */

  }, {
    key: 'setDrawFn',
    value: function setDrawFn(fn) {
      this.drawfn = fn;
      return this;
    }

    /**
     * Executes a draw call for this object
     *
     * Issues a warning if the drawable has not yet been initialized with `init`
     * @return {void}
     */

  }, {
    key: 'draw',
    value: function draw() {
      if (this.ready) {
        if (this.program) {
          this.program.use(this.drawfn);
        }
      }
    }

    /**
     * Sets a uniform on the drawable
     *
     * @chainable
     * @param {String} name  Name of the drawable to set
     * @param {mixed} value  Value to set on the drawable.
     * @returns {this} Returns `this`
     */

  }, {
    key: 'setUniform',
    value: function setUniform(name, value) {
      this.uniforms[name] = value;
      return this;
    }

    /**
     * Updates the elapsed time for this object.
     *
     * Also executes any periodic updates that have been applied to the drawable
     * (i.e. animations).  If this function returns a falsey value, it signals that the
     * animation has ended, and that the object should be removed from the draw loop.
     *
     * @param  {Number} delta Amount of time that has elapsed since the last draw call
     * @return {boolean}      Return false if the object should be removed from the
     *                        return loop.
     */

  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      this.elapsed += delta;
      this.animator.runAnimations(delta, this);
      return true;
    }

    /**
     * Adds a drawable as a child of this one.
     * @param {Drawable} drawable The child drawable.
     * @return {void}
     */

  }, {
    key: 'addChild',
    value: function addChild(drawable) {
      if (!(drawable instanceof Drawable)) {
        throw new Error('Child drawable should be an instance of Drawable');
      }
      drawable.updateWorld(this._model);
      this.children.push(drawable);
    }

    /**
     * Update the internal u_modelViewProject uniform
     * by applying world and local transforms to the model
     * matrix.  Then, propagate the new local transform to all the children
     * by way of their world transforms.
     * @return {void}
     */

  }, {
    key: 'updateMatrix',
    value: function updateMatrix() {
      var _this3 = this;

      var translateRotate = _glMatrix.mat4.create();
      _glMatrix.mat4.fromRotationTranslation(translateRotate, this._rotate, this._translate);
      _glMatrix.mat4.scale(this.local, translateRotate, this._scale);
      _glMatrix.mat4.multiply(this._model, this.world, this.local);
      _glMatrix.mat4.multiply(this.uniforms.u_modelViewProject, this.viewProject, this._model);
      this.children.forEach(function (child) {
        child.updateWorld(_this3._model);
      });
    }

    /**
     * Updates the model's "world" transform.
     * @param  {mat4} world   A world transform
     * @return {void}
     */

  }, {
    key: 'updateWorld',
    value: function updateWorld(world) {
      this.world = world;
      this.updateMatrix();
    }

    /**
     * Update the internal viewProject matrix (projection * view matrices)
     * @param  {mat4} viewProject Projection matrix multiplied by view matrix
     * @return {void}
     */

  }, {
    key: 'updateView',
    value: function updateView(viewProject /*, camera*/) {
      this.viewProject = viewProject;
      this.updateMatrix();
      this.updateRay();
    }

    /**
     * Updates the internal representation of the ray from the camera to the
     * drawable
     * @return {void}
     */

  }, {
    key: 'updateRay',
    value: function updateRay() {
      _glMatrix.vec3.copy(this._ray, this._translate);
      _glMatrix.vec3.transformMat4(this._ray, this._ray, this.world);
      _glMatrix.vec3.transformMat4(this._ray, this._ray, this.viewProject);
    }

    /**
     * Translate a model along some vector
     * @param  {vec3} vec   The vector
     * @return {void}
     */

  }, {
    key: 'translate',
    value: function translate(vec) {
      _glMatrix.vec3.add(this._translate, this._translate, vec);
      this.updateMatrix();
      this.updateRay();
    }

    /**
     * Sets the position to some vector
     * @param {vec3} vec The new position
     * @return {void}
     */

  }, {
    key: 'setTranslation',
    value: function setTranslation(vec) {
      this._translate = _glMatrix.vec3.create();
      this.translate(vec);
    }

    /**
     * Scale a model by some vector
     * @param  {vec3} vec   The vector
     * @return {void}
     */

  }, {
    key: 'scale',
    value: function scale(vec) {
      _glMatrix.vec3.multiply(this._scale, this._scale, vec);
      this.updateMatrix();
    }

    /**
     * Sets the scale of the local transform
     * @param {vec3} vec The scale to set to.
     * @return {void}
     */

  }, {
    key: 'setScale',
    value: function setScale(vec) {
      this._scale = _glMatrix.vec3.fromValues(1, 1, 1);
      this.scale(vec);
    }

    /**
     * Rotate a model with a quaternion
     * @param  {quat} q   The quaternion
     * @return {void}
     */

  }, {
    key: 'rotate',
    value: function rotate(q) {
      _glMatrix.quat.multiply(this._rotate, this._rotate, q);
      this.updateMatrix();
    }

    /**
     * Sets the object's rotation from a quaternion
     * @param {quat} q The new rotation
     * @return {void}
     */

  }, {
    key: 'setRotation',
    value: function setRotation(q) {
      this._rotate = _glMatrix.quat.create();
      this.rotate(q);
    }

    /**
     * Translate the model along the X axis
     * @param  {float} dist  Distance to translate
     * @return {void}
     */

  }, {
    key: 'translateX',
    value: function translateX(dist) {
      this.translate(_glMatrix.vec3.fromValues(dist, 0, 0));
    }

    /**
     * Translate the model along the Y axis
     * @param  {float} dist  Distance to translate
     * @return {void}
     */

  }, {
    key: 'translateY',
    value: function translateY(dist) {
      this.translate(_glMatrix.vec3.fromValues(0, dist, 0));
    }

    /**
     * Translate the model along the Z axis
     * @param  {float} dist  Distance to translate
     * @return {void}
     */

  }, {
    key: 'translateZ',
    value: function translateZ(dist) {
      this.translate(_glMatrix.vec3.fromValues(0, 0, dist));
    }

    /**
     * Scale all dimensions by the same value
     * @param  {Number} f The amount to _scale
     * @return {void}
     */

  }, {
    key: 'scalarScale',
    value: function scalarScale(f) {
      this.scale(_glMatrix.vec3.fromValues(f, f, f));
    }

    /**
     * Sets the local scale to some scalar value (for x, y, and z)
     * @param {Number} f Amount to set the scale to.
     * @return {void}
     */

  }, {
    key: 'setScalarScale',
    value: function setScalarScale(f) {
      this.setScale(_glMatrix.vec3.fromValues(f, f, f));
    }

    /**
     * Sets the drawing mode for this drawable.  Should be one of the modes
     * found on Mesh
     *
     * @see  Mesh
     * @param {enum} mode One of the Mesh.MODE_* constants
     * @return {void}
     */

  }, {
    key: 'setDrawMode',
    value: function setDrawMode(mode) {
      var modes = [_mesh2.default.MODE_TRIANGLES, _mesh2.default.MODE_LINES];
      if (modes.indexOf(mode) === -1) {
        throw new Error('mode should be one of ' + modes.join(', '));
      }
      this.drawMode = mode;
    }

    /**
     * Sets the draw mode to draw lines
     * @return {void}
     */

  }, {
    key: 'drawLines',
    value: function drawLines() {
      this.setDrawMode(_mesh2.default.MODE_LINES);
    }

    /**
     * Sets the draw mode to draw triangles
     * @return {void}
     */

  }, {
    key: 'drawFaces',
    value: function drawFaces() {
      this.setDrawMode(_mesh2.default.MODE_TRIANGLES);
    }

    /**
     * NYI
     * @return {void}
     */

  }, {
    key: 'dispose',
    value: function dispose() {}
    // noop;


    /**
     * Adds an animation
     *
     * @chainable
     * @param {Animation} animation The animation to be run.
     *                              This will need to be started independently, or prior to being added.
     * @return {this} Returns `this`
     */

  }, {
    key: 'addAnimation',
    value: function addAnimation(animation) {
      this.animator.addAnimation(animation);
      return this;
    }
  }, {
    key: '_draw',
    value: function _draw(locations, uniforms) {
      for (var i in this.uniforms) {
        if (this.uniforms.hasOwnProperty(i) && i in uniforms) {
          uniforms[i](this.uniforms[i]);
        }
      }
      this.mesh.draw(locations, this.drawMode);
    }
  }]);

  return Drawable;
}();

exports.default = Drawable;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _bicolored = __webpack_require__(12);

var _bicolored2 = _interopRequireDefault(_bicolored);

var _xm = __webpack_require__(40);

var _xm2 = _interopRequireDefault(_xm);

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Contains drawable primitives for many of the inventory items.
 */
var Inventory = {};

var meshes = _constants2.default.Mesh.Inventory;
var textures = _constants2.default.Texture;

/**
 * Creates the outer "shell" for an xm item.
 *
 * @private
 * @param  {String} name Internal name of the mesh
 * @return {itembase}    A BicoloredDrawable with the specified mesh name
 *                       and the flipcard texture
 */
function createShell(name) {
  var itembase = function (_BicoloredDrawable) {
    _inherits(itembase, _BicoloredDrawable);

    function itembase() {
      _classCallCheck(this, itembase);

      return _possibleConstructorReturn(this, (itembase.__proto__ || Object.getPrototypeOf(itembase)).call(this, meshes[name], textures.FlipCard));
    }

    return itembase;
  }(_bicolored2.default);

  return itembase;
}

/**
 * Creates the xm "core" of an item
 *
 * @private
 * @param  {String} name Internal name of the xm mesh
 * @return {xmbase}      An XmDrawable with the specified mesh name
 *                       and the Xm texture.
 */
function createCore(name) {
  var xmbase = function (_XmDrawable) {
    _inherits(xmbase, _XmDrawable);

    function xmbase() {
      _classCallCheck(this, xmbase);

      return _possibleConstructorReturn(this, (xmbase.__proto__ || Object.getPrototypeOf(xmbase)).call(this, meshes[name], textures.Xm));
    }

    return xmbase;
  }(_xm2.default);

  return xmbase;
}

/**
 * Creates a media item
 *
 * @private
 * @param  {String} name Media mesh internal name
 * @return {media}       A TexturedDrawable with the Textured program,
 *                       the specified mesh, and the flipcard texture.
 */
function createMedia(name) {
  var media = function (_TexturedDrawable) {
    _inherits(media, _TexturedDrawable);

    function media() {
      _classCallCheck(this, media);

      return _possibleConstructorReturn(this, (media.__proto__ || Object.getPrototypeOf(media)).call(this, _constants2.default.Program.Textured, meshes[name], _constants2.default.Texture.FlipCard));
    }

    return media;
  }(_textured2.default);

  return media;
}

for (var i in meshes) {
  if (/^Media/.test(i)) {
    if (i === 'MediaPlane') {
      continue;
    }
    Inventory[i] = createMedia(i);
  } else {
    if (/Xm$/.test(i)) {
      Inventory[i] = createCore(i);
    } else {
      Inventory[i] = createShell(i);
    }
  }
}

exports.default = Inventory;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _glowramp = __webpack_require__(35);

var _glowramp2 = _interopRequireDefault(_glowramp);

var _bicolored = __webpack_require__(12);

var _bicolored2 = _interopRequireDefault(_bicolored);

var _shieldEffect = __webpack_require__(39);

var _shieldEffect2 = _interopRequireDefault(_shieldEffect);

var _ornament = __webpack_require__(36);

var _ornament2 = _interopRequireDefault(_ornament);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Various world drawables
 *
 * Includes Portal, ShieldEffect, waypoints, resonators, and artifact glows
 * @type {Object}
 */
var World = {};

var meshes = _constants2.default.Mesh.World;
var textures = _constants2.default.Texture;

function makeGlowramp(mesh, texture) {
  var glowrampbase = function (_GlowrampDrawable) {
    _inherits(glowrampbase, _GlowrampDrawable);

    function glowrampbase() {
      _classCallCheck(this, glowrampbase);

      return _possibleConstructorReturn(this, (glowrampbase.__proto__ || Object.getPrototypeOf(glowrampbase)).call(this, mesh, texture));
    }

    return glowrampbase;
  }(_glowramp2.default);

  return glowrampbase;
}

function makeBicolored(mesh, texture) {
  var bicoloredbase = function (_BicoloredDrawable) {
    _inherits(bicoloredbase, _BicoloredDrawable);

    function bicoloredbase() {
      _classCallCheck(this, bicoloredbase);

      return _possibleConstructorReturn(this, (bicoloredbase.__proto__ || Object.getPrototypeOf(bicoloredbase)).call(this, mesh, texture));
    }

    return bicoloredbase;
  }(_bicolored2.default);

  return bicoloredbase;
}

function makeShieldEffect(mesh, texture) {
  var shieldeffectbase = function (_ShieldEffectDrawable) {
    _inherits(shieldeffectbase, _ShieldEffectDrawable);

    function shieldeffectbase() {
      _classCallCheck(this, shieldeffectbase);

      return _possibleConstructorReturn(this, (shieldeffectbase.__proto__ || Object.getPrototypeOf(shieldeffectbase)).call(this, mesh, texture));
    }

    return shieldeffectbase;
  }(_shieldEffect2.default);

  return shieldeffectbase;
}

function makeOrnament(mesh, texture) {
  var ornamentbase = function (_OrnamentDrawable) {
    _inherits(ornamentbase, _OrnamentDrawable);

    function ornamentbase() {
      _classCallCheck(this, ornamentbase);

      return _possibleConstructorReturn(this, (ornamentbase.__proto__ || Object.getPrototypeOf(ornamentbase)).call(this, mesh, texture));
    }

    return ornamentbase;
  }(_ornament2.default);

  return ornamentbase;
}

World.Portal = makeGlowramp(meshes.Portal, textures.Glowramp);
World.Waypoint = makeGlowramp(meshes.Waypoint, textures.Waypoint);
World.ArtifactsRedGlow = makeGlowramp(meshes.ArtifactsRedGlow, textures.ColorGlow);
World.ArtifactsGreenGlow = makeGlowramp(meshes.ArtifactsGreenGlow, textures.ColorGlow);
World.ArtifactsPurpleGlow = makeGlowramp(meshes.ArtifactsPurpleGlow, textures.ColorGlow);
World.ArtifactsTargetGlow = makeGlowramp(meshes.ArtifactsTargetGlow, textures.TargetGlow);

World.Shield = makeShieldEffect(meshes.Shield, textures.ShieldEffect);
World.Resonator = makeBicolored(meshes.Resonator, textures.FlipCard);

World.OrnamentMeetupPoint = makeOrnament(meshes.OrnamentMeetupPoint, textures.OrnamentMeetupPoint);
World.OrnamentFinishPoint = makeOrnament(meshes.OrnamentFinishPoint, textures.OrnamentFinishPoint);
World.OrnamentCluster = makeOrnament(meshes.OrnamentCluster, textures.OrnamentCluster);
World.OrnamentVolatile = makeOrnament(meshes.OrnamentVolatile, textures.OrnamentVolatile);

exports.default = World;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROGRAM = _constants2.default.Program.Bicolored;

/**
 * Default quality color.
 *
 * @private
 * @type {vec4}
 */
var defaultColor0 = _glMatrix.vec4.clone(_constants2.default.qualityColors.VERY_RARE);

/**
 * Default glow color
 *
 * @private
 * @type {vec4}
 */
var defaultColor1 = _glMatrix.vec4.clone(_constants2.default.xmColors.coreGlow);

/**
 * This is used for items and other renderables that have two visible colors
 *
 * The specifics of it are basically: if the texture has an opacity less than 0.5,
 * the texture color is blended with u_color0
 * Otherwise, it's the texture color blended with u_color1
 *
 * Or something like that.
 * @param  {String} meshName    Internal name of the mesh for this drawable
 * @param  {String} textureName Internal name of the texture for this drawble
 */

var BicoloredDrawable = function (_TexturedDrawable) {
  _inherits(BicoloredDrawable, _TexturedDrawable);

  function BicoloredDrawable(meshName, textureName) {
    _classCallCheck(this, BicoloredDrawable);

    var _this = _possibleConstructorReturn(this, (BicoloredDrawable.__proto__ || Object.getPrototypeOf(BicoloredDrawable)).call(this, PROGRAM, meshName, textureName));

    _this.uniforms.u_color0 = _glMatrix.vec4.clone(defaultColor0);
    _this.uniforms.u_color1 = _glMatrix.vec4.clone(defaultColor1);
    return _this;
  }

  return BicoloredDrawable;
}(_textured2.default);

exports.default = BicoloredDrawable;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The LinkDrawable represents the base class for link-type drawables.
 *
 * @param  {String} programName Internal name of the program to use
 * @param  {String} textureName Internal name of the texture to use
 */
var LinkDrawable = function (_TexturedDrawable) {
  _inherits(LinkDrawable, _TexturedDrawable);

  function LinkDrawable(programName, textureName) {
    _classCallCheck(this, LinkDrawable);

    var _this = _possibleConstructorReturn(this, (LinkDrawable.__proto__ || Object.getPrototypeOf(LinkDrawable)).call(this, programName, null, textureName));

    _this.uniforms.u_cameraFwd = _glMatrix.vec3.fromValues(0, 0, -1);
    _this.uniforms.u_elapsedTime = 0;
    return _this;
  }

  /**
   * Updates the camera transforms for the link drawables
   * @param  {mat4}   viewProject Combined view and project matrix
   * @param  {Camera} camera      The camera
   * @return {void}
   */


  _createClass(LinkDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject, camera) {
      _get(LinkDrawable.prototype.__proto__ || Object.getPrototypeOf(LinkDrawable.prototype), 'updateView', this).call(this, viewProject, camera);
      if (camera) {
        var rot = _glMatrix.mat3.fromMat4(_glMatrix.mat3.create(), camera.view);
        var q = _glMatrix.quat.fromMat3(_glMatrix.quat.create(), rot);
        var fwd = _glMatrix.vec3.transformQuat(_glMatrix.vec3.create(), _glMatrix.vec3.fromValues(0, 0, -1), q);
        _glMatrix.vec3.normalize(fwd, fwd);
        this.uniforms.u_cameraFwd = fwd;
      }
    }

    /**
     * Updates default periodic uniforms for links
     * @param  {Number} delta Time delta since last draw
     * @return {Boolean}      @see src/drawable.js#updateTime
     */

  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(LinkDrawable.prototype.__proto__ || Object.getPrototypeOf(LinkDrawable.prototype), 'updateTime', this).call(this, delta);
      this.uniforms.u_elapsedTime = this.elapsed / 1000 % 300.0 * 0.1;
      return ret;
    }
  }]);

  return LinkDrawable;
}(_textured2.default);

exports.default = LinkDrawable;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glBound = __webpack_require__(4);

var _glBound2 = _interopRequireDefault(_glBound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Taken from PhiloGL's program class:
//Returns a Magic Uniform Setter
function getUniformSetter(gl, program, info, isArray) {
  var name = info.name,
      loc = gl.getUniformLocation(program, name),
      type = info.type,
      matrix = false,
      vector = true,
      glFunction,
      typedArray;

  if (info.size > 1 && isArray) {
    switch (type) {
      case gl.FLOAT:
        glFunction = gl.uniform1fv;
        typedArray = Float32Array;
        vector = false;
        break;
      case gl.INT:case gl.BOOL:case gl.SAMPLER_2D:case gl.SAMPLER_CUBE:
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
      case gl.INT:case gl.BOOL:case gl.SAMPLER_2D:case gl.SAMPLER_CUBE:
        glFunction = gl.uniform1i;
        break;
      case gl.INT_VEC2:case gl.BOOL_VEC2:
        glFunction = gl.uniform2iv;
        typedArray = isArray ? Uint16Array : new Uint16Array(2);
        break;
      case gl.INT_VEC3:case gl.BOOL_VEC3:
        glFunction = gl.uniform3iv;
        typedArray = isArray ? Uint16Array : new Uint16Array(3);
        break;
      case gl.INT_VEC4:case gl.BOOL_VEC4:
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
    glFunction = function glFunction() {
      target.apply(gl, arguments);
    };
  }

  //Set a uniform array
  if (isArray && typedArray) {
    return function (val) {
      glFunction(loc, new typedArray(val)); // jshint ignore:line
    };

    //Set a matrix uniform
  } else if (matrix) {
    return function (val) {
      glFunction(loc, false, val);
    };

    //Set a vector/typed array uniform
  } else if (typedArray) {
    return function (val) {
      typedArray.set(val.toFloat32Array ? val.toFloat32Array() : val);
      glFunction(loc, typedArray);
    };

    //Set a primitive-valued uniform
  } else {
    return function (val) {
      glFunction(loc, val);
    };
  }
}

/**
 * Represents a shader program consisting of a vertex shader and a fragment
 * shader.
 *
 * Manages the shader's attributes and uniforms.
 *
 * @class
 * @extends {GLBound}
 * @param  {context} gl      Webgl context
 * @param  {String} vertex   Vertex shader
 * @param  {String} fragment Fragment shader
 */

var Program = function (_GLBound) {
  _inherits(Program, _GLBound);

  function Program(gl, vertex, fragment) {
    _classCallCheck(this, Program);

    var _this = _possibleConstructorReturn(this, (Program.__proto__ || Object.getPrototypeOf(Program)).call(this, gl));

    _this.program = null;
    _this.vertexSource = Program.fixPrecision(vertex);
    _this.fragmentSource = fragment;
    _this.attributes = {};
    _this.uniforms = {};
    return _this;
  }

  /**
   * Initialize the shader
   *
   * Parses out shader parameters, compiles the shader, and binds it to
   * the context.
   *
   * @return {void}
   */


  _createClass(Program, [{
    key: 'init',
    value: function init() {
      var gl = this._gl,
          vertex,
          fragment;
      vertex = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertex, this.vertexSource);
      gl.compileShader(vertex);
      if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(vertex)); // eslint-disable-line no-console
        console.error('could not compile vertex shader: ' + this.vertexSource); // eslint-disable-line no-console
        throw 'Vertex shader compile error!';
      }
      fragment = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragment, this.fragmentSource);
      gl.compileShader(fragment);
      if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(fragment)); // eslint-disable-line no-console
        console.error('could not compile fragment shader: ' + this.fragmentSource); // eslint-disable-line no-console
        throw 'Fragment shader compile error!';
      }

      this.program = gl.createProgram();
      gl.attachShader(this.program, vertex);
      gl.attachShader(this.program, fragment);

      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
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
     * @return {void}
     */

  }, {
    key: 'use',
    value: function use(fn) {
      var gl = this._gl;
      if (!this.program) {
        this.init();
      } else {
        gl.useProgram(this.program);
      }
      fn(this.attributes, this.uniforms);
      //gl.useProgram(0);
    }
  }, {
    key: '_setupLocations',
    value: function _setupLocations() {
      var gl = this._gl,
          program = this.program;
      // this is taken partly from PhiloGL's Program class.
      //fill attribute locations
      var len = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES),
          info,
          name;
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
        name = name[name.length - 1] == ']' ? name.substr(0, name.length - 3) : name;
        this.uniforms[name] = getUniformSetter(gl, program, info, info.name != name);
      }
    }

    /**
     * Fixes an issue with shaders where the shader doesn't set a precision,
     * leading it to have a mismatch with its counterpart
     *
     * I.e. the vertex shader might set a precision, but the fragment shader
     * does not, leading to precision mismatch errors.
     * @static
     * @param  {String} shader The shader to check/fix
     * @return {String}        The fixed shader, or the original if it needed
     *                         no patching.
     */

  }], [{
    key: 'fixPrecision',
    value: function fixPrecision(shader) {
      if (/precision mediump float/g.test(shader)) {
        return shader;
      } else {
        var lines = shader.split("\n");
        lines.splice(1, 0, "#ifdef GL_ES", "precision mediump float;", "#endif");
        return lines.join("\n");
      }
    }
  }]);

  return Program;
}(_glBound2.default);

exports.default = Program;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _easing = __webpack_require__(16);

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Simple class for hooking up animations to drawables.
 *
 * Animations refers specifically to things like moving objects/cameras around.
 * Animations handled by the existing shaders should be implemented that way, instead.
 */

var Animation = function () {

  /**
   * Create an animation for a drawable
   *
   * @chainable
   * @param  {Number}  duration   Duration of one cycle of the animation
   * @param  {Function} transform Animation callback
   *                              Parameter: Number t
   *                              Parameter: Drawable drawable
   * @param  {Function} timing    Timing function (i.e. easing)  Defaults. to Ease.linear
   * @param  {Boolean}  loop      Whether or not to loop the animation
   * @return {this}               The animation
   */
  function Animation(duration, transform, timing, loop) {
    _classCallCheck(this, Animation);

    this.elapsed = 0;
    this.duration = duration;
    this.transform = transform;
    this.timing = timing || _easing2.default.linear;
    this.loop = loop;
    this.running = false;
    this.next = [];
    return this;
  }

  /**
   * Starts the animation
   *
   * @chainable
   * @return {this} Returns `this`
   */


  _createClass(Animation, [{
    key: 'start',
    value: function start() {
      if (!this.running) {
        this.running = true;
      }
      return this;
    }

    /**
     * Stops the animation, and resets the elasped time to 0
     *
     * @chainable
     * @return {this} Returns `this`
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.elapsed = 0;
      return this.pause();
    }

    /**
     * Pauses the running animation
     *
     * @chainable
     * @return {this} Returns `this`
     */

  }, {
    key: 'pause',
    value: function pause() {
      if (this.running) {
        this.running = false;
      }
      return this;
    }

    /**
     * Perform a step of the animation
     * @param  {Number} delta      Time elasped since last frame
     * @param  {Drawable} drawable The drawable to operate on
     * @return {Boolean}           Return true to signal the end of the animation
     */

  }, {
    key: 'step',
    value: function step(delta, drawable) {
      if (!this.running) {
        return false;
      }
      this.elapsed += delta;
      // if we're done with the animation
      if (this.elapsed > this.duration && !this.loop) {
        var _t = this.timing(1);
        this.transform(_t, drawable);
        this.stop();
        return true;
      }
      var t = this.timing(this.elapsed / this.duration % 1);
      this.transform(t, drawable);
      return false;
    }

    /**
     * Allows for chaining of animations
     *
     * @chainable
     * @param  {Animation} animation  The animation to queue after this one
     *                                completes. Note that this isn't really
     *                                valid for looping animations
     * @return {this} Returns `this`
     */

  }, {
    key: 'chain',
    value: function chain(animation) {
      if (!(animation instanceof Animation)) {
        throw new Error('New animation should be an instance of an Animation');
      }
      this.next.push(animation);
      return this;
    }
  }]);

  return Animation;
}();

exports.default = Animation;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Easing functions
 *
 * Adapted from https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
 */

var Ease = function Ease() {
  _classCallCheck(this, Ease);

  throw "Ease cannot be instantiated.";
};

/**
 * @method linear
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} The transformed value
 **/


Ease.linear = function (t) {
  return t;
};

/**
 * Identical to linear.
 * @method none
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} The linear transform
 **/
Ease.none = Ease.linear;

/**
 * Mimics the simple -100 to 100 easing in Flash Pro.
 * @method get
 * @param {Number} amount A value from -1 (ease in) to 1 (ease out) indicating the strength and direction of the ease.
 * @static
 * @return {Function} The parametric easing function
 **/
Ease.get = function (amount) {
  if (amount < -1) {
    amount = -1;
  }
  if (amount > 1) {
    amount = 1;
  }
  return function (t) {
    if (amount === 0) {
      return t;
    }
    if (amount < 0) {
      return t * (t * -amount + 1 + amount);
    }
    return t * ((2 - t) * amount + (1 - amount));
  };
};

/**
 * Configurable exponential ease.
 * @method getPowIn
 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
 * @static
 * @return {Function} The parametric easing function
 **/
Ease.getPowIn = function (pow) {
  return function (t) {
    return Math.pow(t, pow);
  };
};

/**
 * Configurable exponential ease.
 * @method getPowOut
 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
 * @static
 * @return {Function} The parametric easing function
 **/
Ease.getPowOut = function (pow) {
  return function (t) {
    return 1 - Math.pow(1 - t, pow);
  };
};

/**
 * Configurable exponential ease.
 * @method getPowInOut
 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
 * @static
 * @return {Function} The parametric easing function
 **/
Ease.getPowInOut = function (pow) {
  return function (t) {
    if ((t *= 2) < 1) {
      return 0.5 * Math.pow(t, pow);
    }
    return 1 - 0.5 * Math.abs(Math.pow(2 - t, pow));
  };
};

/**
 * @method quadIn
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A quadratic ease-in
 **/
Ease.quadIn = Ease.getPowIn(2);
/**
 * @method quadOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a quadratic ease-out
 **/
Ease.quadOut = Ease.getPowOut(2);
/**
 * @method quadInOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a quadratic in-out ease
 **/
Ease.quadInOut = Ease.getPowInOut(2);

/**
 * @method cubicIn
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a cubic ease-in
 **/
Ease.cubicIn = Ease.getPowIn(3);
/**
 * @method cubicOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a cubic ease-out
 **/
Ease.cubicOut = Ease.getPowOut(3);
/**
 * @method cubicInOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a cubic ease in-out
 **/
Ease.cubicInOut = Ease.getPowInOut(3);

/**
 * @method quartIn
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a quartic ease-in
 **/
Ease.quartIn = Ease.getPowIn(4);
/**
 * @method quartOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a quartic ease-out
 **/
Ease.quartOut = Ease.getPowOut(4);
/**
 * @method quartInOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a quartic ease in-out
 **/
Ease.quartInOut = Ease.getPowInOut(4);

/**
 * @method quintIn
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a quintic ease-in
 **/
Ease.quintIn = Ease.getPowIn(5);
/**
 * @method quintOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a quintic ease-out
 **/
Ease.quintOut = Ease.getPowOut(5);
/**
 * @method quintInOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a quintic ease in-out
 **/
Ease.quintInOut = Ease.getPowInOut(5);

/**
 * @method sineIn
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a sine ease-in
 **/
Ease.sineIn = function (t) {
  return 1 - Math.cos(t * Math.PI / 2);
};

/**
 * @method sineOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a sine ease-out
 **/
Ease.sineOut = function (t) {
  return Math.sin(t * Math.PI / 2);
};

/**
 * @method sineInOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a sine ease in-out
 **/
Ease.sineInOut = function (t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
};

/**
 * Configurable "back in" ease.
 * @method getBackIn
 * @param {Number} amount The strength of the ease.
 * @static
 * @return {Function} The configured "back in" ease function
 **/
Ease.getBackIn = function (amount) {
  return function (t) {
    return t * t * ((amount + 1) * t - amount);
  };
};

/**
 * @method backIn
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a default "back in" ease
 **/
Ease.backIn = Ease.getBackIn(1.7);

/**
 * Configurable "back out" ease.
 * @method getBackOut
 * @param {Number} amount The strength of the ease.
 * @static
 * @return {Function} The configured "back out" ease function
 **/
Ease.getBackOut = function (amount) {
  return function (t) {
    return --t * t * ((amount + 1) * t + amount) + 1;
  };
};

/**
 * @method backOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a default "back out" ease
 **/
Ease.backOut = Ease.getBackOut(1.7);

/**
 * Configurable "back in out" ease.
 * @method getBackInOut
 * @param {Number} amount The strength of the ease.
 * @static
 * @return {Function} The configured "back in out" ease function
 **/
Ease.getBackInOut = function (amount) {
  amount *= 1.525;
  return function (t) {
    if ((t *= 2) < 1) {
      return 0.5 * (t * t * ((amount + 1) * t - amount));
    }
    return 0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2);
  };
};

/**
 * @method backInOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} a default "back in out" ease
 **/
Ease.backInOut = Ease.getBackInOut(1.7);

/**
 * @method circIn
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A "circIn" ease
 **/
Ease.circIn = function (t) {
  return -(Math.sqrt(1 - t * t) - 1);
};

/**
 * @method circOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A "circOut" ease
 **/
Ease.circOut = function (t) {
  return Math.sqrt(1 - --t * t);
};

/**
 * @method circInOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A "circInOut" ease
 **/
Ease.circInOut = function (t) {
  if ((t *= 2) < 1) {
    return -0.5 * (Math.sqrt(1 - t * t) - 1);
  }
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};

/**
 * @method bounceIn
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A "bounceIn" ease
 **/
Ease.bounceIn = function (t) {
  return 1 - Ease.bounceOut(1 - t);
};

/**
 * @method bounceOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A "bounceOut" ease
 **/
Ease.bounceOut = function (t) {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  } else if (t < 2.5 / 2.75) {
    return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  } else {
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
};

/**
 * @method bounceInOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A "bounceInOut" ease
 **/
Ease.bounceInOut = function (t) {
  if (t < 0.5) {
    return Ease.bounceIn(t * 2) * 0.5;
  }
  return Ease.bounceOut(t * 2 - 1) * 0.5 + 0.5;
};

/**
 * Configurable elastic ease.
 * @method getElasticIn
 * @param {Number} amplitude Amplitude of the bounce
 * @param {Number} period Period of the bounce
 * @static
 * @return {Function} A configured "elastic in" ease function
 **/
Ease.getElasticIn = function (amplitude, period) {
  var pi2 = Math.PI * 2;
  return function (t) {
    if (t === 0 || t === 1) {
      return t;
    }
    var s = period / pi2 * Math.asin(1 / amplitude);
    return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
  };
};

/**
 * @method elasticIn
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A default "elastic in" ease
 **/
Ease.elasticIn = Ease.getElasticIn(1, 0.3);

/**
 * Configurable elastic ease.
 * @method getElasticOut
 * @param {Number} amplitude Amplitude of the bounce
 * @param {Number} period Period of the bounce
 * @static
 * @return {Function} A configured "elastic out" ease function
 **/
Ease.getElasticOut = function (amplitude, period) {
  var pi2 = Math.PI * 2;
  return function (t) {
    if (t === 0 || t === 1) {
      return t;
    }
    var s = period / pi2 * Math.asin(1 / amplitude);
    return amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1;
  };
};

/**
 * @method elasticOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A default "elastic out" ease
 **/
Ease.elasticOut = Ease.getElasticOut(1, 0.3);

/**
 * Configurable elastic ease.
 * @method getElasticInOut
 * @param {Number} amplitude Amplitude of the bounce
 * @param {Number} period Period of the bounce
 * @static
 * @return {Function} A configured "elastic in-out" ease function
 **/
Ease.getElasticInOut = function (amplitude, period) {
  var pi2 = Math.PI * 2;
  return function (t) {
    var s = period / pi2 * Math.asin(1 / amplitude);
    if ((t *= 2) < 1) {
      return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
    }
    return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1;
  };
};

/**
 * @method elasticInOut
 * @param {Number} t Parametric value (from 0 to 1)
 * @static
 * @return {Number} A default "elastic in-out" ease
 **/
Ease.elasticInOut = Ease.getElasticInOut(1, 0.3 * 1.5);

exports.default = Ease;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _libtga = __webpack_require__(52);

var _libtga2 = _interopRequireDefault(_libtga);

var _es6Promises = __webpack_require__(25);

var _es6Promises2 = _interopRequireDefault(_es6Promises);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * An AssetLoader manages loading one or more assets.  It handles debouncing of
 * of multiple requests for the same asset, etc.
 *
 * @class
 */
var AssetLoader = function () {

  /**
   * Noop.
   */
  function AssetLoader() {
    _classCallCheck(this, AssetLoader);

    this._callbacks = {};
    this._assets = {};
  }

  /**
   * Loads a single asset.
   *
   * @param {String} url  The url of the asset to load.
   * @param {String} type The type of asset being requested
   *
   * @returns { Promise }  Returns a promise.  Resolves immediately
   *                       if the asset it already loaded.
   * @see AssetLoader.loadResource
   */


  _createClass(AssetLoader, [{
    key: 'loadAsset',
    value: function loadAsset(url, type) {
      var _this = this;

      var name = '_' + encodeURIComponent(url);
      if (this._assets[name]) {
        return _es6Promises2.default.resolve(this._assets[name]);
      } else {
        return new _es6Promises2.default(function (resolve, reject) {
          _this._callbacks[name] = _this._callbacks[name] || [];
          _this._callbacks[name].push({ resolve: resolve, reject: reject });
          if (!_this._assets.hasOwnProperty(name)) {
            _this._assets[name] = false;
            AssetLoader.loadResource(url, type).then(function (value) {
              _this._assets[name] = value;
              var cb;
              while (cb = _this._callbacks[name].shift()) {
                cb.resolve(value);
              }
            }).catch(function (err) {
              var cb;
              while (cb = _this._callbacks[name].shift()) {
                cb.reject(err);
              }
            });
          }
        });
      }
    }

    /**
     * Load a set of assets in parallel
     * @param  {Array} urls   Array of urls of resources
     * @param  {Array} types  Array of types of resources
     * @return {Promise}      A Promise that resolves when all assets are loaded,
     *                        or rejects when any fail.
     * @see  AssetLoader.loadResource
     */

  }, {
    key: 'loadAssetGroup',
    value: function loadAssetGroup(urls, types) {
      var _this2 = this;

      if (urls.length !== types.length) {
        throw 'Incompatible types: types.length = ' + types.length + '; urls.length = ' + urls.length;
      }
      return _es6Promises2.default.all(urls.map(function (url, i) {
        return _this2.loadAsset(url, types[i]);
      }));
    }

    /**
     * Directly retrieve an asset from the cache
     * @param  {String} name The cache key
     * @return {mixed}       The cached asset, if it exists.
     */

  }, {
    key: 'getAsset',
    value: function getAsset(name) {
      return this._assets[name];
    }

    /**
     * Loads a resource via xhr or Image
     *
     * @static
     * @param  {String}   url      href of the resource to fetch
     * @param  {String}   type     One of XHMLHttpRequest's supported responseType
     *                             values (arraybuffer, blob, document, json, text)
     *                             or 'image' or 'image.co' (for a cross-origin image)
     * @return {Promise}           Returns a promise that resolves on success, or rejects
     *                             on failure.
     */

  }], [{
    key: 'loadResource',
    value: function loadResource(url, type) {
      return new _es6Promises2.default(function (resolve, reject) {
        if (type === 'image' || type === 'image.co') {
          if (/\.tga$/.test(url)) {
            _libtga2.default.loadFile(url, function (err, tga) {
              if (err) {
                reject(err);
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
              image.onload = function () {
                resolve(this);
              };
              image.onerror = function (e) {
                reject(e);
              };
              image.src = canvas.toDataURL();
            });
          } else {
            var i = new Image();
            // cross-origin image:
            if (type === 'image.co') {
              i.crossOrigin = 'anoymous';
            }
            i.onload = function () {
              resolve(this);
            };
            i.onerror = function (e) {
              reject(e);
            };
            i.src = url;
          }
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.responseType = type;
          xhr.onload = function () {
            resolve(this.response);
          };
          xhr.onerror = function (e) {
            reject(e);
          };

          xhr.send();
        }
      });
    }
  }]);

  return AssetLoader;
}();

exports.default = AssetLoader;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _link = __webpack_require__(13);

var _link2 = _interopRequireDefault(_link);

var _resonatorLink = __webpack_require__(44);

var _resonatorLink2 = _interopRequireDefault(_resonatorLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A ResonatorLinkDrawable is a LinkDrawable that represents a link
 * between a portal and a resonator
 * @param  {vec2} portalPosition     X,Z of the portal (usually 0,0)
 * @param  {Number} slot             Slot (0-7)
 * @param  {Number} distance         Usually 0-40
 * @param  {vec4} color              Color of the resonator link (TODO: make this disco)
 * @param  {Number} resonatorPercent Percent health of the resonator
 */
var ResonatorLinkDrawable = function (_LinkDrawable) {
  _inherits(ResonatorLinkDrawable, _LinkDrawable);

  function ResonatorLinkDrawable(portalPosition, slot, distance, color, resonatorPercent) {
    _classCallCheck(this, ResonatorLinkDrawable);

    var _this = _possibleConstructorReturn(this, (ResonatorLinkDrawable.__proto__ || Object.getPrototypeOf(ResonatorLinkDrawable)).call(this, _constants2.default.Program.Link, _constants2.default.Texture.ResonatorLink));

    _this.portalPosition = portalPosition;
    _this.slot = slot;
    _this.distance = distance;
    _this.color = color;
    _this.resonatorPercent = resonatorPercent;
    return _this;
  }

  /**
   * Creates a ResonatorLinkMesh with the given params, and initializes the
   * texture/program
   * @param  {AssetManager} manager AssetManager containing the required program/texture
   * @return {Boolean}              Success/failure
   */


  _createClass(ResonatorLinkDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _resonatorLink2.default(manager._gl, this.portalPosition, this.slot, this.distance, this.color, this.resonatorPercent);
      return _get(ResonatorLinkDrawable.prototype.__proto__ || Object.getPrototypeOf(ResonatorLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return ResonatorLinkDrawable;
}(_link2.default);

exports.default = ResonatorLinkDrawable;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createItemEntity = createItemEntity;

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _entity = __webpack_require__(22);

var _entity2 = _interopRequireDefault(_entity);

var _inventory = __webpack_require__(10);

var _inventory2 = _interopRequireDefault(_inventory);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Deprecate in favor of a proper scene graph
var InventoryItems = {};

var simple = {
  Xmp: 'L8',
  Ultrastrike: 'L8',
  ResShield: 'VERY_RARE',
  PowerCube: 'L8',
  LinkAmp: 'EXTREMELY_RARE',
  HeatSink: 'VERY_RARE',
  MultiHack: 'VERY_RARE',
  ForceAmp: 'RARE',
  Turret: 'RARE',
  Resonator: 'L8',
  Capsule: 'RARE'
};

function createItemEntity(name, color) {
  var entitybase = function (_Entity) {
    _inherits(entitybase, _Entity);

    function entitybase(engine) {
      _classCallCheck(this, entitybase);

      var _this = _possibleConstructorReturn(this, (entitybase.__proto__ || Object.getPrototypeOf(entitybase)).call(this, engine));

      _this.addDrawable(name, new _inventory2.default[name]());
      _this.addDrawable(name + 'Xm', new _inventory2.default[name + 'Xm']());
      _this.drawables[name].uniforms.u_color0 = _glMatrix.vec4.clone(color);
      return _this;
    }

    return entitybase;
  }(_entity2.default);

  return entitybase;
}

for (var i in simple) {
  InventoryItems[i] = createItemEntity(i, _constants2.default.qualityColors[simple[i]]);
}

var FlipCardAda = function (_Entity2) {
  _inherits(FlipCardAda, _Entity2);

  function FlipCardAda(engine) {
    _classCallCheck(this, FlipCardAda);

    var _this2 = _possibleConstructorReturn(this, (FlipCardAda.__proto__ || Object.getPrototypeOf(FlipCardAda)).call(this, engine));

    _this2.addDrawable('FlipCardAda', new _inventory2.default.FlipCardAda());
    _this2.addDrawable('FlipCardXm', new _inventory2.default.FlipCardXm());
    _this2.drawables.FlipCardXm.uniforms.u_teamColor = _glMatrix.vec4.clone(_constants2.default.teamColors.RESISTANCE);
    _this2.drawables.FlipCardAda.uniforms.u_color1 = _glMatrix.vec4.clone(_constants2.default.teamColors.RESISTANCE);
    _this2.drawables.FlipCardAda.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2.default.qualityColors.VERY_RARE);
    return _this2;
  }

  return FlipCardAda;
}(_entity2.default);

InventoryItems.FlipCardAda = FlipCardAda;

var FlipCardJarvis = function (_Entity3) {
  _inherits(FlipCardJarvis, _Entity3);

  function FlipCardJarvis(engine) {
    _classCallCheck(this, FlipCardJarvis);

    var _this3 = _possibleConstructorReturn(this, (FlipCardJarvis.__proto__ || Object.getPrototypeOf(FlipCardJarvis)).call(this, engine));

    _this3.addDrawable('FlipCardJarvis', new _inventory2.default.FlipCardJarvis());
    _this3.addDrawable('FlipCardXm', new _inventory2.default.FlipCardXm());
    _this3.drawables.FlipCardXm.uniforms.u_teamColor = _glMatrix.vec4.clone(_constants2.default.teamColors.ENLIGHTENED);
    _this3.drawables.FlipCardJarvis.uniforms.u_color1 = _glMatrix.vec4.clone(_constants2.default.teamColors.ENLIGHTENED);
    _this3.drawables.FlipCardJarvis.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2.default.qualityColors.VERY_RARE);
    return _this3;
  }

  return FlipCardJarvis;
}(_entity2.default);

InventoryItems.FlipCardJarvis = FlipCardJarvis;

var ExtraShield = function (_Entity4) {
  _inherits(ExtraShield, _Entity4);

  function ExtraShield(engine) {
    _classCallCheck(this, ExtraShield);

    var _this4 = _possibleConstructorReturn(this, (ExtraShield.__proto__ || Object.getPrototypeOf(ExtraShield)).call(this, engine));

    _this4.addDrawable('ExtraShield', new _inventory2.default.ExtraShield());
    _this4.addDrawable('ResShieldXm', new _inventory2.default.ResShieldXm());
    _this4.drawables.ExtraShield.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2.default.qualityColors.VERY_RARE);
    return _this4;
  }

  return ExtraShield;
}(_entity2.default);

InventoryItems.ExtraShield = ExtraShield;

var InterestCapsule = function (_Entity5) {
  _inherits(InterestCapsule, _Entity5);

  function InterestCapsule(engine) {
    _classCallCheck(this, InterestCapsule);

    var _this5 = _possibleConstructorReturn(this, (InterestCapsule.__proto__ || Object.getPrototypeOf(InterestCapsule)).call(this, engine));

    _this5.addDrawable('InterestCapsule', new _inventory2.default.InterestCapsule());
    _this5.addDrawable('CapsuleXm', new _inventory2.default.CapsuleXm());
    _this5.drawables.InterestCapsule.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2.default.qualityColors.VERY_RARE);
    return _this5;
  }

  return InterestCapsule;
}(_entity2.default);

InventoryItems.InterestCapsule = InterestCapsule;

exports.default = InventoryItems;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _entity = __webpack_require__(22);

var _entity2 = _interopRequireDefault(_entity);

var _world = __webpack_require__(11);

var _world2 = _interopRequireDefault(_world);

var _resonatorLink = __webpack_require__(18);

var _resonatorLink2 = _interopRequireDefault(_resonatorLink);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Deprecate in favor of a proper scene graph
var PortalEntity = function (_Entity) {
  _inherits(PortalEntity, _Entity);

  function PortalEntity(engine) {
    _classCallCheck(this, PortalEntity);

    var _this = _possibleConstructorReturn(this, (PortalEntity.__proto__ || Object.getPrototypeOf(PortalEntity)).call(this, engine));

    _this.addDrawable('Portal', new _world2.default.Portal());
    // why 6? I dunno, ask Niantic
    _glMatrix.mat4.scale(_this.drawables.Portal.local, _this.drawables.Portal.local, _glMatrix.vec3.fromValues(6, 6, 6));
    _this.setColor(_glMatrix.vec4.clone(_constants2.default.teamColors.LOKI));
    return _this;
  }

  _createClass(PortalEntity, [{
    key: 'setColor',
    value: function setColor(color) {
      this.color = _glMatrix.vec4.clone(color);
      this.drawables.Portal.uniforms.u_baseColor = this.color;
      if (this.drawables.Shield) {
        this.drawables.Shield.uniforms.u_color = this.color;
      }
      if (this.drawables.ArtifactsGreenGlow) {
        this.drawables.ArtifactsGreenGlow.u_baseColor = this.color;
      }
      /*for(var i = 0; i < 8; i++) {
        this._redrawLink(i);sd
      }*/
    }
  }, {
    key: 'addResonator',
    value: function addResonator(level, slot, range, percent) {
      if (percent === undefined) {
        percent = 1.0;
      }
      if (+slot < 0 || +slot > 8) {
        throw new Error('slot out of bounds for resonator');
      }
      if (!(level in _constants2.default.qualityColors)) {
        throw new Error('level must be one of ' + Object.keys(_constants2.default.qualityColors).join(' '));
      }
      range = range === undefined ? 40 : range;
      var resonatorName = 'Resonator' + +slot;
      var linkName = 'Link' + +slot;
      var theta = slot / 8 * 2 * Math.PI;
      var resonator = new _world2.default.Resonator();
      var x = range * Math.cos(theta);
      var y = range * Math.sin(theta);
      var link = new _resonatorLink2.default([0, 0], slot, range, _glMatrix.vec4.clone(this.color), 1.0);
      resonator.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2.default.qualityColors[level]);
      resonator.world = _glMatrix.mat4.clone(this.drawables.Portal.local);
      //link.local = mat4.clone(this.drawables.Portal.local);
      _glMatrix.mat4.translate(resonator.world, resonator.world, _glMatrix.vec3.fromValues(x / 6, 0, y / 6));
      resonator.updateMatrix();
      link.updateMatrix();
      // keep the portal sorted last (this is a terrible way of doing this.)
      this.addDrawable(linkName, link);
      this.addDrawable(resonatorName, resonator);
      this.addDrawable('Portal', this.drawables.Portal);
    }
  }, {
    key: 'removeResonator',
    value: function removeResonator(slot) {
      if (+slot < 0 || +slot > 8) {
        throw new Error('slot out of bounds for resonator');
      }
      var name = 'Resonator' + +slot;
      var resonator = this.drawables[name] || null;
      if (resonator) {
        this.removeDrawable(name);
        this._removeResonatorLink(slot);
        this.addDrawable('Portal', this.drawables.Portal);
      }
    }
  }, {
    key: 'addShield',
    value: function addShield() {
      if (!('Shield' in this.drawables)) {
        this.addDrawable('Shield', new _world2.default.Shield());
        // why 12? I don't know.
        _glMatrix.mat4.scale(this.drawables.Shield.local, this.drawables.Shield.local, _glMatrix.vec3.fromValues(12, 12, 12));
        this.drawables.Shield.updateMatrix();
      }
      this.drawables.Shield.uniforms.u_color = this.color;
      this.applyTransform();
    }
  }, {
    key: 'addArtifact',
    value: function addArtifact(artifact, name) {
      var rotate = function rotate(delta /*, elapsed*/) {
        _glMatrix.mat4.rotateY(this.model, this.model, delta / 1000);
        this.updateMatrix();
        return true;
      };
      if (!(name in this.drawables)) {
        this.addDrawable(name, artifact);
      }
      this.drawables[name].onUpdate = rotate;
      this.applyTransform();
    }
  }, {
    key: 'addGlowMarker',
    value: function addGlowMarker(name, color) {
      var n = 'Artifacts' + name + 'Glow';
      if (!(n in this.drawables)) {
        this.addDrawable(n, new _world2.default[n]());
      }
      this.drawables[n].uniforms.u_baseColor = _glMatrix.vec4.clone(color);
    }
  }]);

  return PortalEntity;
}(_entity2.default);

exports.default = PortalEntity;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animation = __webpack_require__(15);

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class handles running animations on animatable objects.
 *
 * This is generally composed into a class (e.g. Camera or Drawable)
 */
var Animator = function () {
  function Animator() {
    _classCallCheck(this, Animator);

    this._animations = [];
  }

  /**
   * Adds an animation.
   *
   * Note that this does not start the animation.
   *
   * @chainable
   * @param {Animation} animation The animation to be run.
   *                              This will need to be started independently, or
   *                              prior to being added.
   * @return {this} Returns `this`
   */


  _createClass(Animator, [{
    key: 'addAnimation',
    value: function addAnimation(animation) {
      if (!(animation instanceof _animation2.default)) {
        throw new Error('New animation should be an instance of an Animation');
      }
      this._animations.unshift(animation);
      return this;
    }

    /**
     * @param  {Number} delta    Time since last update
     * @param  {Object} subject  Object to animate
     * @return {void}
     */

  }, {
    key: 'runAnimations',
    value: function runAnimations(delta, subject) {
      var i = this._animations.length - 1;
      for (; i >= 0; i--) {
        var animation = this._animations[i];
        if (animation.running && animation.step(delta, subject)) {
          this._animations.splice.apply(this._animations, [i, 1].concat(animation.next));
        }
      }
    }
  }]);

  return Animator;
}();

exports.default = Animator;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: Deprecate
var Entity = function () {
  function Entity(engine) {
    _classCallCheck(this, Entity);

    this.drawables = {};
    this.transform = _glMatrix.mat4.create();
    this.engine = engine;
  }

  _createClass(Entity, [{
    key: 'addDrawable',
    value: function addDrawable(name, drawable) {
      // add dispose if this already exists.
      this.removeDrawable(name);
      this.drawables[name] = drawable;
      this.engine.objectRenderer.addDrawable(drawable);
    }
  }, {
    key: 'removeDrawable',
    value: function removeDrawable(name, destroy) {
      // dispose stuffs.
      if (this.drawables[name]) {
        this.engine.objectRenderer.removeDrawable(this.drawables[name], destroy);
      }
    }
  }, {
    key: 'applyTransform',
    value: function applyTransform() {
      for (var i in this.drawables) {
        this.drawables[i].updateWorld(this.transform);
      }
    }
  }, {
    key: 'translate',
    value: function translate(vec) {
      _glMatrix.mat4.translate(this.transform, this.transform, vec);
      this.applyTransform();
    }
  }, {
    key: 'rotate',
    value: function rotate(quat) {
      var rotate = _glMatrix.mat4.create();
      _glMatrix.mat4.fromQuat(rotate, quat);
      _glMatrix.mat4.multiply(this.transform, this.transform, rotate);
      this.applyTransform();
    }
  }, {
    key: 'setAnimation',
    value: function setAnimation(animate) {
      for (var i in this.drawables) {
        this.drawables[i].onUpdate = animate;
      }
    }
  }]);

  return Entity;
}();

exports.default = Entity;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glBound = __webpack_require__(4);

var _glBound2 = _interopRequireDefault(_glBound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A GLBuffer is a buffer of some sort that will be passed to the gpu
 *
 * @private
 * @extends {GLBound}
 * @chainable
 * @param  {context} gl    WebGL context
 * @param  {enum} target   gl target  @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
 * @param  {enum} usage    gl usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
 * @return {this}          the GLBuffer
 */
var GLBuffer = function (_GLBound) {
  _inherits(GLBuffer, _GLBound);

  function GLBuffer(gl, target, usage) {
    var _ret;

    _classCallCheck(this, GLBuffer);

    var _this = _possibleConstructorReturn(this, (GLBuffer.__proto__ || Object.getPrototypeOf(GLBuffer)).call(this, gl));

    _this.target = target || gl.ARRAY_BUFFER; // probably shouldn't default this.
    _this.usage = usage || gl.STATIC_DRAW;
    _this.glBuf = null;
    _this.values = null;
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Binds the buffer to the gpu
   *
   * @chainable
   * @return {this} Returns `this`
   */


  _createClass(GLBuffer, [{
    key: 'bindBuffer',
    value: function bindBuffer() {
      if (!this.values) {
        throw new Error('trying to update a buffer with no values.');
      }
      if (!this.glBuf) {
        this.glBuf = this._gl.createBuffer();
      }
      this._gl.bindBuffer(this.target, this.glBuf);
      return this;
    }

    /**
     * Unbinds the buffer (NPI)
     *
     * @chainable
     * @return {this} Returns `this`
     */

  }, {
    key: 'unbindBuffer',
    value: function unbindBuffer() {
      // this._gl.bindBuffer(this.target, 0);  // apparently this makes webgl cranky
      return this;
    }

    /**
     * Update the buffer data on the gpu
     *
     * @chainable
     * @return {this} Returns `this`
     */

  }, {
    key: 'update',
    value: function update() {
      this.bindBuffer();
      // if I do it this way, does it break?
      // if it works, will updating the underlying buffer
      // update the buffer without needing to call gl.bufferData again??
      this._gl.bufferData(this.target, this.values, this.usage);
      return this; // .unbindBuffer(); // apparently this makes webgl angry.
    }

    /**
     * Sets the buffer contents
     *
     * @chainable
     * @param {ArrayBuffer} values Values to store in the buffer
     * @param {Number} offset      Offset to write the values
     * @return {this} Returns `this`
     */

  }, {
    key: 'setValues',
    value: function setValues(values, offset) {
      if (!this.values) {
        this.values = values;
      } else {
        this.values.set(values, offset);
      }
      this.update();
      return this;
    }

    /**
     * Deletes a chunk of a buffer
     *
     * @chainable
     * @param  {Number} start Start of deletion
     * @param  {Number} end   End of deletion
     * @return {this} Returns `this`
     */

  }, {
    key: 'deleteWithin',
    value: function deleteWithin(start, end) {
      if (!this.values) {
        throw new Error('Trying to splice a buffer that has no values.');
      }
      var nValues = end - start;
      var empty = new this.values.constructor(nValues);
      this.values.set(this.values.subarray(end), start);
      this.values.set(empty, this.values.length - nValues);
      this.update();
      return this;
    }

    /**
     * Do something with each elemnt of the buffer
     *
     * @chainable
     * @param  {Function} callback The callback (values returned will overwrite
     *                             the contents of the buffer at that offset)
     * @param  {Number}   start    Offset to start
     * @param  {Number}   end      Offset to end
     * @return {this} Returns `this`
     */

  }, {
    key: 'map',
    value: function map(callback, start, end) {
      start = start === undefined ? 0 : start;
      end = end === undefined ? this.values.length : end;
      for (var i = start; i < end; i++) {
        this.values[i] = callback(this.values[i], i);
      }
      return this;
    }

    /**
     * Update a buffer's values, and also update the buffer on the gpu
     *
     * @chainable
     * @param  {ArrayBuffer} values New values to fill the buffer with
     * @return {this} Returns `this`
     */

  }, {
    key: 'updateBuffer',
    value: function updateBuffer(values) {
      this.values = values;
      return this.update();
    }
  }]);

  return GLBuffer;
}(_glBound2.default);

exports.default = GLBuffer;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mesh = __webpack_require__(3);

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = __webpack_require__(7);

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glIndex = __webpack_require__(6);

var _glIndex2 = _interopRequireDefault(_glIndex);

var _glAttribute = __webpack_require__(5);

var _glAttribute2 = _interopRequireDefault(_glAttribute);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// part of doing away with the THREE.js dependency
// means giving up a lot of helper code for doing things
// like this.
//
// Needless to say, this borrows heavily from THREE.SphereGeometry
// https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js
function createSphere(radius, phiSlices, thetaSlices) {
  var i,
      j,
      u,
      v,
      vec,
      v1,
      v2,
      v3,
      v4,
      verticesRow,
      faces,
      phi = Math.PI * 2,
      theta = Math.PI,

  // size is 8 for vec3 a_position + vec2 a_texCoord + vec3 a_normal
  values = new Float32Array((phiSlices + 1) * (thetaSlices + 1) * 8),
      faceArray = [],
      vertices = [],
      aIdx = 0,
      attributes = [];
  phiSlices = Math.max(3, phiSlices || 8);
  thetaSlices = Math.max(2, thetaSlices || 6);

  for (i = 0; i <= phiSlices; i++) {
    verticesRow = [];
    for (j = 0; j <= thetaSlices; j++) {
      u = j / phiSlices;
      v = i / thetaSlices;
      vec = _glMatrix.vec3.fromValues(-radius * Math.cos(u * phi) * Math.sin(v * theta), radius * Math.cos(v * theta), radius * Math.sin(u * phi) * Math.sin(v * theta));

      values[aIdx * 8 + 0] = vec[0];
      values[aIdx * 8 + 1] = vec[1];
      values[aIdx * 8 + 2] = vec[2];
      values[aIdx * 8 + 3] = u;
      values[aIdx * 8 + 4] = v;
      // normalized:
      _glMatrix.vec3.normalize(vec, vec);
      values[aIdx * 8 + 5] = vec[0];
      values[aIdx * 8 + 6] = vec[1];
      values[aIdx * 8 + 7] = vec[2];

      verticesRow.push(aIdx++);
    }
    vertices.push(verticesRow);
  }

  for (i = 0; i < phiSlices; i++) {
    for (j = 0; j < thetaSlices; j++) {
      v1 = vertices[i][j + 1];
      v2 = vertices[i][j];
      v3 = vertices[i + 1][j];
      v4 = vertices[i + 1][j + 1];

      if (Math.abs(values[v1 * 8 + 1]) === radius) {
        faceArray.push.apply(faceArray, [v1, v3, v4]);
        values[v1 * 8 + 3] = (values[v1 * 8 + 3] + values[v2 * 8 + 3]) / 2;
      } else if (Math.abs(values[v3 * 8 + 1]) === radius) {
        faceArray.push.apply(faceArray, [v1, v2, v3]);
        values[v3 * 8 + 3] = (values[v3 * 8 + 3] + values[v4 * 8 + 3]) / 2;
      } else {
        faceArray.push.apply(faceArray, [v1, v2, v4]);
        faceArray.push.apply(faceArray, [v2, v3, v4]);
      }
    }
  }

  faces = new Uint16Array(faceArray.length);
  faceArray.forEach(function (v, i) {
    faces[i] = v;
  });
  attributes.push(new _vertexAttribute2.default('a_position', 3));
  attributes.push(new _vertexAttribute2.default('a_texCoord0', 2));
  attributes.push(new _vertexAttribute2.default('a_normal', 3));
  return {
    values: values,
    faces: faces,
    attributes: attributes
  };
}

/**
 * A SphereMesh is a Mesh that is a sphere, made of a number of quads determined
 * by the number of horizontal and vertical slices involved in its construction
 *
 * @extends {Mesh}
 */

var SphereMesh = function (_Mesh) {
  _inherits(SphereMesh, _Mesh);

  /**
   * Construct a sphere
   * @param  {context} gl     WebGL context
   * @param  {Number} radius  Radius of the sphere
   * @param  {Number} vSlices Number of vertical slices
   * @param  {Number} hSlices Number of horizontal slices
   */
  function SphereMesh(gl, radius, vSlices, hSlices) {
    _classCallCheck(this, SphereMesh);

    var parsed = createSphere(radius, vSlices, hSlices);
    var attributes = new _glAttribute2.default(gl, parsed.attributes, parsed.values);
    var faces = new _glIndex2.default(gl, parsed.faces, gl.TRIANGLES);
    return _possibleConstructorReturn(this, (SphereMesh.__proto__ || Object.getPrototypeOf(SphereMesh)).call(this, gl, attributes, faces));
  }

  return SphereMesh;
}(_mesh2.default);

exports.default = SphereMesh;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Promise polyfill v1.0.10
 * requires setImmediate
 *
 * © 2014–2015 Dmitry Korobkin
 * Released under the MIT license
 * github.com/Octane/Promise
 */
(function (global) {'use strict';

    var STATUS = '[[PromiseStatus]]';
    var VALUE = '[[PromiseValue]]';
    var ON_FUlFILLED = '[[OnFulfilled]]';
    var ON_REJECTED = '[[OnRejected]]';
    var ORIGINAL_ERROR = '[[OriginalError]]';
    var PENDING = 'pending';
    var INTERNAL_PENDING = 'internal pending';
    var FULFILLED = 'fulfilled';
    var REJECTED = 'rejected';
    var NOT_ARRAY = 'not an array.';
    var REQUIRES_NEW = 'constructor Promise requires "new".';
    var CHAINING_CYCLE = 'then() cannot return same Promise that it resolves.';

    var setImmediate = global.setImmediate || __webpack_require__(55).setImmediate;
    var isArray = Array.isArray || function (anything) {
        return Object.prototype.toString.call(anything) == '[object Array]';
    };

    function InternalError(originalError) {
        this[ORIGINAL_ERROR] = originalError;
    }

    function isInternalError(anything) {
        return anything instanceof InternalError;
    }

    function isObject(anything) {
        //Object.create(null) instanceof Object → false
        return Object(anything) === anything;
    }

    function isCallable(anything) {
        return typeof anything == 'function';
    }

    function isPromise(anything) {
        return anything instanceof Promise;
    }

    function identity(value) {
        return value;
    }

    function thrower(reason) {
        throw reason;
    }

    function enqueue(promise, onFulfilled, onRejected) {
        if (!promise[ON_FUlFILLED]) {
            promise[ON_FUlFILLED] = [];
            promise[ON_REJECTED] = [];
        }
        promise[ON_FUlFILLED].push(onFulfilled);
        promise[ON_REJECTED].push(onRejected);
    }

    function clearAllQueues(promise) {
        delete promise[ON_FUlFILLED];
        delete promise[ON_REJECTED];
    }

    function callEach(queue) {
        var i;
        var length = queue.length;
        for (i = 0; i < length; i++) {
            queue[i]();
        }
    }

    function call(resolve, reject, value) {
        var anything = toPromise(value);
        if (isPromise(anything)) {
            anything.then(resolve, reject);
        } else if (isInternalError(anything)) {
            reject(anything[ORIGINAL_ERROR]);
        } else {
            resolve(value);
        }
    }

    function toPromise(anything) {
        var then;
        if (isPromise(anything)) {
            return anything;
        }
        if(isObject(anything)) {
            try {
                then = anything.then;
            } catch (error) {
                return new InternalError(error);
            }
            if (isCallable(then)) {
                return new Promise(function (resolve, reject) {
                    setImmediate(function () {
                        try {
                            then.call(anything, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
            }
        }
        return null;
    }

    function resolvePromise(promise, resolver) {
        function resolve(value) {
            if (promise[STATUS] == PENDING) {
                fulfillPromise(promise, value);
            }
        }
        function reject(reason) {
            if (promise[STATUS] == PENDING) {
                rejectPromise(promise, reason);
            }
        }
        try {
            resolver(resolve, reject);
        } catch(error) {
            reject(error);
        }
    }

    function fulfillPromise(promise, value) {
        var queue;
        var anything = toPromise(value);
        if (isPromise(anything)) {
            promise[STATUS] = INTERNAL_PENDING;
            anything.then(
                function (value) {
                    fulfillPromise(promise, value);
                },
                function (reason) {
                    rejectPromise(promise, reason);
                }
            );
        } else if (isInternalError(anything)) {
            rejectPromise(promise, anything[ORIGINAL_ERROR]);
        } else {
            promise[STATUS] = FULFILLED;
            promise[VALUE] = value;
            queue = promise[ON_FUlFILLED];
            if (queue && queue.length) {
                clearAllQueues(promise);
                callEach(queue);
            }
        }
    }

    function rejectPromise(promise, reason) {
        var queue = promise[ON_REJECTED];
        promise[STATUS] = REJECTED;
        promise[VALUE] = reason;
        if (queue && queue.length) {
            clearAllQueues(promise);
            callEach(queue);
        }
    }

    function Promise(resolver) {
        var promise = this;
        if (!isPromise(promise)) {
            throw new TypeError(REQUIRES_NEW);
        }
        promise[STATUS] = PENDING;
        promise[VALUE] = undefined;
        resolvePromise(promise, resolver);
    }

    Promise.prototype.then = function (onFulfilled, onRejected) {
        var promise = this;
        var nextPromise;
        onFulfilled = isCallable(onFulfilled) ? onFulfilled : identity;
        onRejected = isCallable(onRejected) ? onRejected : thrower;
        nextPromise = new Promise(function (resolve, reject) {
            function tryCall(func) {
                var value;
                try {
                    value = func(promise[VALUE]);
                } catch (error) {
                    reject(error);
                    return;
                }
                if (value === nextPromise) {
                    reject(new TypeError(CHAINING_CYCLE));
                } else {
                    call(resolve, reject, value);
                }
            }
            function asyncOnFulfilled() {
                setImmediate(tryCall, onFulfilled);
            }
            function asyncOnRejected() {
                setImmediate(tryCall, onRejected);
            }
            switch (promise[STATUS]) {
                case FULFILLED:
                    asyncOnFulfilled();
                    break;
                case REJECTED:
                    asyncOnRejected();
                    break;
                default:
                    enqueue(promise, asyncOnFulfilled, asyncOnRejected);
            }
        });
        return nextPromise;
    };

    Promise.prototype['catch'] = function (onRejected) {
        return this.then(identity, onRejected);
    };

    Promise.resolve = function (value) {
        var anything = toPromise(value);
        if (isPromise(anything)) {
            return anything;
        }
        return new Promise(function (resolve, reject) {
            if (isInternalError(anything)) {
                reject(anything[ORIGINAL_ERROR]);
            } else {
                resolve(value);
            }
        });
    };

    Promise.reject = function (reason) {
        return new Promise(function (resolve, reject) {
            reject(reason);
        });
    };

    Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
            var i;
            var length;
            if (isArray(values)) {
                length = values.length;
                for (i = 0; i < length; i++) {
                    call(resolve, reject, values[i]);
                }
            } else {
                reject(new TypeError(NOT_ARRAY));
            }
        });
    };

    Promise.all = function (values) {
        return new Promise(function (resolve, reject) {
            var fulfilledCount = 0;
            var promiseCount = 0;
            var anything;
            var length;
            var value;
            var i;
            if (isArray(values)) {
                values = values.slice(0);
                length = values.length;
                for (i = 0; i < length; i++) {
                    value = values[i];
                    anything = toPromise(value);
                    if (isPromise(anything)) {
                        promiseCount++;
                        anything.then(
                            function (index) {
                                return function (value) {
                                    values[index] = value;
                                    fulfilledCount++;
                                    if (fulfilledCount == promiseCount) {
                                        resolve(values);
                                    }
                                };
                            }(i),
                            reject
                        );
                    } else if (isInternalError(anything)) {
                        reject(anything[ORIGINAL_ERROR]);
                    } else {
                        //[1, , 3] → [1, undefined, 3]
                        values[i] = value;
                    }
                }
                if (!promiseCount) {
                    resolve(values);
                }
            } else {
                reject(new TypeError(NOT_ARRAY));
            }
        });
    };

    if (typeof module != 'undefined' && module.exports) {
        module.exports = global.Promise || Promise;
    } else if (!global.Promise) {
        global.Promise = Promise;
    }

}(this));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _drawable = __webpack_require__(9);

var _drawable2 = _interopRequireDefault(_drawable);

var _sphere = __webpack_require__(24);

var _sphere2 = _interopRequireDefault(_sphere);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROGRAM = _constants2.default.Program.Atmosphere;

/**
 * Creates an "atmosphere" effect.
 *
 * This is a modified version of the atmosphere program from:
 * https://github.com/dataarts/webgl-globe/blob/master/globe/globe.js
 * @param  {Number} radius      Radius of the world.
 *                              This should match the radius of the world mesh the
 *                              atmosphere is being rendered over.
 * @param  {Number} vSlices     Number of vertical slices for the sphere mesh
 * @param  {Number} hSlices     Number of horizontal slices for the sphere mesh
 * @param  {Number} scaleFactor The percent to scale the mesh
 * @return {void}
 */

var AtmosphereDrawable = function (_Drawable) {
  _inherits(AtmosphereDrawable, _Drawable);

  function AtmosphereDrawable(radius, vSlices, hSlices, scaleFactor) {
    _classCallCheck(this, AtmosphereDrawable);

    var _this = _possibleConstructorReturn(this, (AtmosphereDrawable.__proto__ || Object.getPrototypeOf(AtmosphereDrawable)).call(this, PROGRAM, null));

    _this.radius = radius;
    _this.vSlices = vSlices;
    _this.hSlices = hSlices;
    _this.uniforms.u_normalMatrix = _glMatrix.mat3.create();
    _this.scaleFactor = scaleFactor || 1.1;
    _this.setScalarScale(_this.scaleFactor);
    return _this;
  }

  /**
   * Updates the view matrices of the model
   *
   * @chainable
   * @see    src/drawable/model.js#updateView
   * @param  {mat4} viewProject   combined projection matrix multiplied by view matrix.
   * @return {this} Returns `this`
   */


  _createClass(AtmosphereDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject) {
      _get(AtmosphereDrawable.prototype.__proto__ || Object.getPrototypeOf(AtmosphereDrawable.prototype), 'updateView', this).call(this, viewProject);
      var invert = _glMatrix.mat4.invert(_glMatrix.mat4.create(), viewProject),
          transpose = _glMatrix.mat4.transpose(_glMatrix.mat4.create(), invert);
      this.uniforms.u_normalMatrix = _glMatrix.mat3.fromMat4(_glMatrix.mat3.create(), transpose);
      return this;
    }

    /**
     * Initializes the drawable
     *
     * @see    src/drawable.js
     * @param  {AssetManager} manager The AssetManager containing the required assets.
     * @return {Promise}  A Promise that resolves when the asset is initialized
     */

  }, {
    key: 'init',
    value: function init(manager) {
      this.mesh = new _sphere2.default(manager._gl, this.radius, this.vSlices, this.hSlices);
      return _get(AtmosphereDrawable.prototype.__proto__ || Object.getPrototypeOf(AtmosphereDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return AtmosphereDrawable;
}(_drawable2.default);

exports.default = AtmosphereDrawable;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _particle = __webpack_require__(37);

var _particle2 = _interopRequireDefault(_particle);

var _particlePortal = __webpack_require__(42);

var _particlePortal2 = _interopRequireDefault(_particlePortal);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROGRAM = _constants2.default.Program.ParticlePortal;
var MAX_SYSTEMS = 40;

/**
 * A drawable representing a system of particles emanating from a portal
 *
 * @class
 * @extends {ParticleDrawable}
 * @param  {vec4}   color    The particle color
 * @param  {Number} height   The height to propagate
 * @param  {Number} count    The number of particles
 * @param  {Number} spread   The spread between particles
 * @param  {Number} distance The distance
 */

var ParticlePortalDrawable = function (_ParticleDrawable) {
  _inherits(ParticlePortalDrawable, _ParticleDrawable);

  function ParticlePortalDrawable(color, height, count, spread, distance) {
    _classCallCheck(this, ParticlePortalDrawable);

    var _this = _possibleConstructorReturn(this, (ParticlePortalDrawable.__proto__ || Object.getPrototypeOf(ParticlePortalDrawable)).call(this, PROGRAM));

    var modColor = _glMatrix.vec4.clone(color);
    modColor[3] = count;
    // uniforms should be flattened arrays.
    // Since they're expected to contain up to 40 systems, we'll need to create
    // arrays of 40 * 4 elements each.
    _this.uniforms.u_color = new Float32Array(MAX_SYSTEMS * 4);
    _this.uniforms.u_position = new Float32Array(MAX_SYSTEMS * 4);
    _this.uniforms.u_params = new Float32Array(MAX_SYSTEMS * 4);
    // fill in the first 4 slots.
    _glMatrix.vec4.copy(_this.uniforms.u_color, modColor);
    _glMatrix.vec4.copy(_this.uniforms.u_position, _glMatrix.vec4.fromValues(0, 0, 0, height));
    _glMatrix.vec4.copy(_this.uniforms.u_params, _glMatrix.vec4.fromValues(0, distance, spread, 1));
    return _this;
  }

  /**
   * Update the view, and uniforms pertaining to the view
   * @param  {mat4} viewProject   Camera's combine view and projection matrix
   * @param  {Camera} camera      The camera
   * @return {void}
   */


  _createClass(ParticlePortalDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject, camera) {
      _get(ParticlePortalDrawable.prototype.__proto__ || Object.getPrototypeOf(ParticlePortalDrawable.prototype), 'updateView', this).call(this, viewProject, camera);
      if (camera) {
        var dist = _glMatrix.vec3.length(camera.position);
        var scale = Math.pow(dist, 0.2);
        this.uniforms.u_params[3] = scale;
      }
    }

    /**
     * Update the time for the system
     * @param  {Number} delta Time since last tick
     * @return {Boolean}      Results of onUpdate
     */

  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(ParticlePortalDrawable.prototype.__proto__ || Object.getPrototypeOf(ParticlePortalDrawable.prototype), 'updateTime', this).call(this, delta);
      this.uniforms.u_params[0] = this.elapsed / 100000 * this.uniforms.u_params[1];
      return ret;
    }

    /**
     * Initialize the portal particle mesh
     * @param  {AssetManager} manager AssetManager containing the remaining assets
     * @return {Boolean}              Success/failure
     */

  }, {
    key: 'init',
    value: function init(manager) {
      this.mesh = new _particlePortal2.default(manager._gl);
      return _get(ParticlePortalDrawable.prototype.__proto__ || Object.getPrototypeOf(ParticlePortalDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return ParticlePortalDrawable;
}(_particle2.default);

exports.default = ParticlePortalDrawable;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _link = __webpack_require__(13);

var _link2 = _interopRequireDefault(_link);

var _portalLink = __webpack_require__(43);

var _portalLink2 = _interopRequireDefault(_portalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A LinkDrawable that represents a link from one portal to another
 * @extends {LinkDrawable}
 * @param  {vec2} start          X, Z of origin portal
 * @param  {vec2} end            X, Z of destination portal
 * @param  {vec4} color          Color of link
 * @param  {Number} startPercent Percent health of the origin portal
 * @param  {Number} endPercent   Percent health of the destination portal
 */
var PortalLinkDrawable = function (_LinkDrawable) {
  _inherits(PortalLinkDrawable, _LinkDrawable);

  function PortalLinkDrawable(start, end, color, startPercent, endPercent) {
    _classCallCheck(this, PortalLinkDrawable);

    var _this = _possibleConstructorReturn(this, (PortalLinkDrawable.__proto__ || Object.getPrototypeOf(PortalLinkDrawable)).call(this, _constants2.default.Program.Link, _constants2.default.Texture.PortalLink));

    _this.start = start;
    _this.end = end;
    _this.color = color;
    _this.startPercent = startPercent;
    _this.endPercent = endPercent;
    return _this;
  }

  /**
   * Construct the PortalLinkMesh for this link
   * @param  {AssetManager} manager AssetManager to look up the program and texture
   * @return {Boolean}              Success/failure
   */


  _createClass(PortalLinkDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _portalLink2.default(manager._gl, this.start, this.end, this.color, this.startPercent, this.endPercent);
      return _get(PortalLinkDrawable.prototype.__proto__ || Object.getPrototypeOf(PortalLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return PortalLinkDrawable;
}(_link2.default);

exports.default = PortalLinkDrawable;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _link = __webpack_require__(13);

var _link2 = _interopRequireDefault(_link);

var _sphericalPortalLink = __webpack_require__(45);

var _sphericalPortalLink2 = _interopRequireDefault(_sphericalPortalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a portal link that follows the surface of a sphere.
 *
 * Hooray for custom shaders, etc!
 *
 * @param  {Number} sphereRadius Radius of the sphere
 * @param  {vec2} start          Lat,lng of the origin portal
 * @param  {vec2} end            Lat,lng of the destination portal
 * @param  {vec4} color          Color of the link
 * @param  {Number} startPercent Percent health of the origin portal
 * @param  {Number} endPercent   Percent health of the destination portal
 */
var SphericalPortalLinkDrawable = function (_LinkDrawable) {
  _inherits(SphericalPortalLinkDrawable, _LinkDrawable);

  function SphericalPortalLinkDrawable(sphereRadius, start, end, color, startPercent, endPercent) {
    _classCallCheck(this, SphericalPortalLinkDrawable);

    var _this = _possibleConstructorReturn(this, (SphericalPortalLinkDrawable.__proto__ || Object.getPrototypeOf(SphericalPortalLinkDrawable)).call(this, _constants2.default.Program.SphericalLink, _constants2.default.Texture.PortalLink));

    _this.radius = sphereRadius;
    _this.start = start;
    _this.end = end;
    _this.color = color;
    _this.startPercent = startPercent;
    _this.endPercent = endPercent;
    _this.uniforms.u_model = _this._model;
    return _this;
  }

  /**
   * Constructs a mesh for the link, then initializes the remaining assets.
   * @param  {AssetManager} manager AssetManager containing the program/texture
   * @return {Boolean}              Success/failure
   */


  _createClass(SphericalPortalLinkDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _sphericalPortalLink2.default(manager._gl, this.radius, this.start, this.end, this.color, this.startPercent, this.endPercent);
      return _get(SphericalPortalLinkDrawable.prototype.__proto__ || Object.getPrototypeOf(SphericalPortalLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }, {
    key: 'updateView',
    value: function updateView(viewProject, camera) {
      _get(SphericalPortalLinkDrawable.prototype.__proto__ || Object.getPrototypeOf(SphericalPortalLinkDrawable.prototype), 'updateView', this).call(this, viewProject, camera);
      this.uniforms.u_model = this._model;
    }
  }]);

  return SphericalPortalLinkDrawable;
}(_link2.default);

exports.default = SphericalPortalLinkDrawable;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

var _sphere = __webpack_require__(24);

var _sphere2 = _interopRequireDefault(_sphere);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROGRAM = _constants2.default.Program.Textured;

/**
 * A sphere with a texture mapped to it
 *
 * @param  {String} textureName Internal name of the texture to use
 * @param  {Number} radius      Radius of the sphere
 * @param  {Number} vSlices     Number of vertical slices
 * @param  {Number} hSlices     Number of horizontal slices
 */

var TexturedSphereDrawable = function (_TexturedDrawable) {
  _inherits(TexturedSphereDrawable, _TexturedDrawable);

  function TexturedSphereDrawable(textureName, radius, vSlices, hSlices) {
    _classCallCheck(this, TexturedSphereDrawable);

    var _this = _possibleConstructorReturn(this, (TexturedSphereDrawable.__proto__ || Object.getPrototypeOf(TexturedSphereDrawable)).call(this, PROGRAM, null, textureName));

    _this.radius = radius;
    _this.vSlices = vSlices;
    _this.hSlices = hSlices;
    return _this;
  }

  /**
   * Create a sphere mesh and initialize the other resources
   * @param  {AssetManager} manager AssetManager containing the texture/program
   * @return {Boolean}              Success/failure
   */


  _createClass(TexturedSphereDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _sphere2.default(manager._gl, this.radius, this.vSlices, this.hSlices);
      return _get(TexturedSphereDrawable.prototype.__proto__ || Object.getPrototypeOf(TexturedSphereDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return TexturedSphereDrawable;
}(_textured2.default);

exports.default = TexturedSphereDrawable;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetManager = __webpack_require__(33);

var _assetManager2 = _interopRequireDefault(_assetManager);

var _object = __webpack_require__(49);

var _object2 = _interopRequireDefault(_object);

var _utils = __webpack_require__(8);

var _world = __webpack_require__(11);

var _world2 = _interopRequireDefault(_world);

var _resource = __webpack_require__(38);

var _resource2 = _interopRequireDefault(_resource);

var _inventory = __webpack_require__(10);

var _inventory2 = _interopRequireDefault(_inventory);

var _inventory3 = __webpack_require__(19);

var _inventory4 = _interopRequireDefault(_inventory3);

var _portal = __webpack_require__(20);

var _portal2 = _interopRequireDefault(_portal);

var _camera = __webpack_require__(34);

var _camera2 = _interopRequireDefault(_camera);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Engine provides nearly all the mechanics for actually drawing things to a canvas.
 *
 * Also includes a few simple functions for demoing various entities/drawables.  This
 * will probably go away in a future release.
 *
 * @param  {HTMLCanvas} canvas       A Canvas element
 * @param  {Object} assets           A manifest to pass to the internal AssetManager
 *                                   @see  AssetManager
 * @param  {Boolean} enableSnapshots If set to true, the canvas will preserve its drawing
 *                                   buffer, to allow for accurate .toDataURL calls.
 *                                   This will have a performance impact.
 */
var Engine = function () {
  function Engine(canvas, assets, enableSnapshots) {
    _classCallCheck(this, Engine);

    this.canvas = canvas;
    var opt = {};
    if (enableSnapshots) {
      opt.preserveDrawingBuffer = true;
    }
    this.canScreenshot = enableSnapshots && !!canvas.toBlob;
    var gl = canvas.getContext('webgl', opt) || canvas.getContext('experimental-webgl', opt);
    if (!gl) {
      throw 'Could not initialize webgl';
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl = gl;
    this.camera = new _camera2.default(canvas.width, canvas.height);
    this.camera.setPosition(_glMatrix.vec3.fromValues(0.0, 20.0, 25.0)).lookAt(_glMatrix.vec3.fromValues(0.0, 10.0, 0.0));

    this.assetManager = new _assetManager2.default(this.gl, assets);
    this.objectRenderer = new _object2.default(this.gl, this.assetManager);
    this._start = this._last = null;
    this._frame = null;
    this.scale = 1;
    this.resize();
  }

  /**
   * Resize the canvas and viewport to new dimensions.
   * Uses the canvas' clientWidth and clientHeight to determine viewport size,
   * if not provided.
   *
   * @chainable
   * @param {Number} width   (optional) width
   * @param {Number} height  (optional) height
   * @return {this} Returns `this`
   */


  _createClass(Engine, [{
    key: 'resize',
    value: function resize(width, height) {
      var devicePixels = window.devicePixelRatio;
      if (!width) {
        width = this.canvas.clientWidth;
      }
      if (!height) {
        height = this.canvas.clientHeight;
      }
      var targetWidth = Math.floor(width * this.scale * devicePixels);
      var targetHeight = Math.floor(height * this.scale * devicePixels);
      this.canvas.width = targetWidth;
      this.canvas.height = targetHeight;
      this.camera.setDimensions(targetWidth, targetHeight);
      this.gl.viewport(0, 0, targetWidth, targetHeight);
      return this.updateView();
    }

    /**
     * Sets the scaling factor for the canvas.
     *
     * @chainable
     * @param  {Number} factor The scale factor
     * @return {this} Returns `this`
     */

  }, {
    key: 'rescale',
    value: function rescale(factor) {
      this.scale = factor;
      return this.resize();
    }

    /**
     * Updates the current drawing viewport to the canvas' current dimensions
     *
     * @chainable
     * @return {this} Returns `this`
     */

  }, {
    key: 'updateView',
    value: function updateView() {
      this.objectRenderer.updateView(this.camera);
      return this;
    }

    /**
     * Stops the render loop, if it's running.
     *
     * @chainable
     * @return {this} Returns `this`
     */

  }, {
    key: 'stop',
    value: function stop() {
      this._last = this._start = null;
      if (this._frame) {
        window.cancelAnimationFrame(this._frame);
      }
      return this;
    }

    /**
     * Adds one of each inventory item, and a portal, to the scene
     * @return {void}
     */

  }, {
    key: 'demoEntities',
    value: function demoEntities() {
      var x = -5,
          y = 0,
          z = 4;
      var i, item;
      for (i in _inventory4.default) {
        item = new _inventory4.default[i](this);
        if (item) {
          item.translate(_glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
        }
      }
      var portal = new _portal2.default(this);
      portal.translate(_glMatrix.vec3.fromValues(x, y, z));
    }

    /**
     * Adds one of each drawable to the scene
     * @return {void}
     */

  }, {
    key: 'demo',
    value: function demo() {
      var x = -5,
          y = 0,
          z = 4;
      var i, item;
      for (i in _inventory2.default) {
        item = new _inventory2.default[i]();
        if (item) {
          _glMatrix.mat4.translate(item.world, item.world, _glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          this.objectRenderer.addDrawable(item);
        }
      }

      for (i in _resource2.default) {
        item = new _resource2.default[i]();
        if (item) {
          _glMatrix.mat4.translate(item.world, item.world, _glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          this.objectRenderer.addDrawable(item);
        }
      }

      for (i in _world2.default) {
        item = new _world2.default[i]();
        if (item) {
          _glMatrix.mat4.translate(item.world, item.world, _glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          this.objectRenderer.addDrawable(item);
        }
      }
    }

    /**
     * Draw a single frame, with a specified time since last draw
     * @param  {Number} delta Time since last render
     * @return {void}
     */

  }, {
    key: 'draw',
    value: function draw(delta) {
      var gl = this.gl;
      // default setup stuff:
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      (0, _utils.resetGL)(gl);
      //gl.enable(gl.BLEND);
      //gl.depthMask(false);

      // render passes:
      this.objectRenderer.render();

      // run animations
      this.objectRenderer.updateTime(delta);
      this.camera.updateTime(delta);
    }

    /**
     * Start the render loop.
     * @param  {Number} tick Time since last tick (optional)
     * @return {void}
     */

  }, {
    key: 'render',
    value: function render(tick) {
      var delta = 0;
      if (!this._start) {
        this._start = tick;
        this._last = tick;
      } else if (tick) {
        delta = tick - this._last;
        this._last = tick;
      }
      this.draw(delta);
      // queue up next frame:
      this._frame = window.requestAnimationFrame(this.render.bind(this));
    }

    /**
     * Preloads all assets
     * @param  {Function} callback Callback to invoke on completion
     * @return {void}
     */

  }, {
    key: 'preload',
    value: function preload() {
      return this.assetManager.loadAll();
    }

    /**
     * Captures a screenshot, if enabled
     *
     * @param  {String} mimeType The mime type of the image
     * @param  {Number} quality  Quality, if applicable (applies to image/jpeg)
     * @return {Promise}         A promise that resolves when the screenshot is complete
     */

  }, {
    key: 'capture',
    value: function capture(mimeType, quality) {
      var _this = this;

      if (this.canScreenshot) {
        this.stop();
        var promise = new Promise(function (resolve, reject) {
          try {
            _this.canvas.toBlob(function (blob) {
              resolve(blob);
            }, mimeType, quality);
          } catch (e) {
            reject(e);
          }
        });
        // promise.then(() => {
        //   this.render();
        // }, () => {
        //   this.render();
        // });
        return promise;
      } else {
        return Promise.reject(new Error('Screenshots not enabled.  Initialize engine with `enableSnapshots` and ensure `canvas.toBlob` is supported by your browser.'));
      }
    }
  }]);

  return Engine;
}();

exports.default = Engine;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(8);

var _glMatrix = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PI_HALF = Math.PI / 2.0;
var MIN_LOG_DIST = 5.0;

function cloneTouch(touch) {
  return { identifier: touch.identifier, x: touch.clientX, y: touch.clientY };
}

function getTouchIndex(touches, touch) {
  for (var i = 0; i < touches.length; i++) {
    if (touches[i].identifier == touch.identifier) {
      return i;
    }
  }
  return -1;
}

/**
 * Camera controls for controlling a camera that orbits a fixed point,
 * with variable position and depth.
 *
 * This is a port of the THREE.js OrbitControls found with the webgl globe.
 *
 * @class
 * @param  {HTMLElement} element  Target element to bind listeners to
 * @param  {Number} distance Starting distance from origin
 * @param  {Object} options  Hash of options for configuration
 */

var OrbitControls = function () {
  function OrbitControls(element, camera, distance, options) {
    _classCallCheck(this, OrbitControls);

    options = options || {};
    this.element = element;
    this.camera = camera;
    this.distance = distance || 2;
    this.distanceTarget = this.distance;
    var params = {
      zoomDamp: 0.5,
      distanceScale: 0.5,
      distanceMax: 1000,
      distanceMin: 1,
      touchScale: 0.1,
      wheelScale: 0.01,
      friction: 0.2,
      target: _glMatrix.vec3.create(),
      allowZoom: true
    };
    this.options = (0, _utils.setParams)(params, options);
    this.camera.lookAt(this.options.target);
    this.mouse = { x: 0, y: 0 };
    this.mouseOnDown = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0 };
    this.target = { x: Math.PI * 3 / 2, y: Math.PI / 6.0 };
    this.targetOnDown = { x: 0, y: 0 };
    this.overRenderer = false;
    // Pre-bind all these handlers so we can unbind the listeners later.
    this.mouseMove = this._onMouseMove.bind(this);
    this.mouseUp = this._onMouseUp.bind(this);
    this.mouseOut = this._onMouseOut.bind(this);
    this.mouseDown = this._onMouseDown.bind(this);
    this.mouseWheel = this._onMouseWheel.bind(this);

    this.touches = [];
    this.touchDelta = 0;
    this.touchMove = this._onTouchMove.bind(this);
    this.touchEnd = this._onTouchEnd.bind(this);
    this.touchLeave = this._onTouchLeave.bind(this);
    this.touchStart = this._onTouchStart.bind(this);
    this.mouseOver = function () {
      this.overRenderer = true;
    }.bind(this);
    this.mouseOut = function () {
      this.overRenderer = false;
    }.bind(this);
    this.enabled = false;
  }

  /**
   * Unbinds all listeners and disables the controls
   *
   * @return {void}
   */


  _createClass(OrbitControls, [{
    key: 'disable',
    value: function disable() {
      this.element.removeEventListener('mousedown', this.mouseDown, false);
      this.element.removeEventListener('mousemove', this.mouseMove, false);
      this.element.removeEventListener('mouseup', this.mouseUp, false);
      this.element.removeEventListener('mouseout', this.mouseOut, false);
      this.element.removeEventListener('touchstart', this.touchStart, false);
      this.element.removeEventListener('touchmove', this.touchMove, false);
      this.element.removeEventListener('touchend', this.touchEnd, false);
      this.element.removeEventListener('touchleave', this.touchLeave, false);
      this.element.removeEventListener('mousewheel', this.mouseWheel, false);
      this.element.removeEventListener('mouseover', this.mouseOver, false);
      this.element.removeEventListener('mouseout', this.mouseOut, false);
      this.enabled = false;
    }

    /**
     * Binds all listeners and enables the controls
     *
     * @return {void}
     */

  }, {
    key: 'enable',
    value: function enable() {
      this.element.addEventListener('mousedown', this.mouseDown, false);
      if (this.options.allowZoom) {
        this.element.addEventListener('mousewheel', this.mouseWheel, false);
      }
      this.element.addEventListener('touchstart', this.touchStart, false);
      this.element.addEventListener('mouseover', this.mouseOver, false);
      this.element.addEventListener('mouseout', this.mouseOut, false);
      this.enabled = true;
    }

    /**
     * Update the given camera matrix with new position information, etc
     * @param  {mat4} view   A view matrix
     * @return {void}
     */

  }, {
    key: 'updateView',
    value: function updateView() {
      var dx = this.target.x - this.rotation.x,
          dy = this.target.y - this.rotation.y,
          dz = this.distanceTarget - this.distance,
          cameraPosition = _glMatrix.vec3.create();

      if (Math.abs(dx) > 0.00001 || Math.abs(dy) > 0.00001 || Math.abs(dz) > 0.00001) {
        this.rotation.x += dx * this.options.friction;
        this.rotation.y += dy * this.options.friction;
        this.distance += dz * this.options.distanceScale;

        cameraPosition[0] = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y) + this.options.target[0];
        cameraPosition[1] = this.distance * Math.sin(this.rotation.y) + this.options.target[1];
        cameraPosition[2] = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y) + this.options.target[2];

        this.camera.setPosition(cameraPosition);
      }
    }
  }, {
    key: '_updateTargets',
    value: function _updateTargets() {
      var scale = this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance);
      var zoomDamp = scale / this.options.zoomDamp;

      this.target.x = this.targetOnDown.x + (this.mouse.x - this.mouseOnDown.x) * 0.005 * zoomDamp;
      this.target.y = this.targetOnDown.y + (this.mouse.y - this.mouseOnDown.y) * 0.005 * zoomDamp;

      this.target.y = this.target.y > PI_HALF ? PI_HALF : this.target.y;
      this.target.y = this.target.y < -PI_HALF ? -PI_HALF : this.target.y;
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(ev) {
      ev.preventDefault();
      this.element.addEventListener('mousemove', this.mouseMove, false);
      this.element.addEventListener('mouseup', this.mouseUp, false);
      this.element.addEventListener('mouseout', this.mouseOut, false);

      this.mouseOnDown.x = -ev.clientX;
      this.mouseOnDown.y = ev.clientY;
      this.targetOnDown.x = this.target.x;
      this.targetOnDown.y = this.target.y;

      this.element.style.cursor = 'move';
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(ev) {
      this.mouse.x = -ev.clientX;
      this.mouse.y = ev.clientY;
      this._updateTargets();
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(ev) {
      this._onMouseOut(ev);
      this.element.style.cursor = 'auto';
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut() {
      this.element.removeEventListener('mousemove', this.mouseMove, false);
      this.element.removeEventListener('mouseup', this.mouseUp, false);
      this.element.removeEventListener('mouseout', this.mouseOut, false);
    }
  }, {
    key: '_onMouseWheel',
    value: function _onMouseWheel(ev) {
      if (this.overRenderer) {
        this._zoom(ev.wheelDeltaY * this.options.wheelScale * (this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance)));
      }
      return true;
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(ev) {
      ev.preventDefault();
      if (this.touches.length === 0) {
        this.element.addEventListener('touchmove', this.touchMove, false);
        this.element.addEventListener('touchend', this.touchEnd, false);
        this.element.addEventListener('touchleave', this.touchLeave, false);
      }

      for (var i = 0; i < ev.changedTouches.length; i++) {
        this.touches.push(cloneTouch(ev.changedTouches[i]));
      }

      if (this.touches.length === 1) {
        this.mouseOnDown.x = -this.touches[0].x;
        this.mouseOnDown.y = this.touches[0].y;

        this.targetOnDown.x = this.target.x;
        this.targetOnDown.y = this.target.y;
      } else if (this.touches.length === 2 && this.options.allowZoom) {
        var x = Math.abs(this.touches[0].x - this.touches[1].x);
        var y = Math.abs(this.touches[0].y - this.touches[1].y);

        this.touchDelta = Math.sqrt(x * x + y * y);
      }

      this.element.style.cursor = 'move';
    }
  }, {
    key: '_onTouchMove',
    value: function _onTouchMove(ev) {
      var changed = ev.changedTouches,
          l = changed.length;
      for (var i = 0; i < l; i++) {
        var idx = getTouchIndex(this.touches, changed[i]);
        if (idx >= 0) {
          this.touches.splice(idx, 1, cloneTouch(changed[i]));
        } else {
          console.warn('could not find event ', changed[i]); // eslint-disable-line no-console
        }
      }

      if (this.touches.length === 1) {
        this.mouse.x = -this.touches[0].x;
        this.mouse.y = this.touches[0].y;
        this.updateTargets();
      } else if (this.touches.length === 2 && this.options.allowZoom) {
        var x = this.touches[0].x - this.touches[1].x;
        var y = this.touches[0].y - this.touches[1].y;

        var newDelta = Math.sqrt(x * x + y * y);
        this._zoom((newDelta - this.touchDelta) * this.options.touchScale);
        this.touchDelta = newDelta;
      }
    }
  }, {
    key: '_removeTouches',
    value: function _removeTouches(ev) {
      var changed = ev.changedTouches,
          l = changed.length;
      for (var i = 0; i < l; i++) {
        var idx = getTouchIndex(this.touches, changed[i]);
        if (idx >= 0) {
          this.touches.splice(idx, 1);
        }
      }
      if (this.touches.length === 0) {
        this.element.removeEventListener('touchmove', this.touchMove, false);
        this.element.removeEventListener('touchend', this.touchEnd, false);
        this.element.removeEventListener('touchleave', this.touchLeave, false);
      } else if (this.touches.length === 1) {
        this.mouseOnDown.x = -this.touches[0].x;
        this.mouseOnDown.y = this.touches[0].y;

        this.targetOnDown.x = this.target.x;
        this.targetOnDown.y = this.target.y;
      }
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(ev) {
      this._removeTouches(ev);
      this.element.style.cursor = 'auto';
    }
  }, {
    key: '_onTouchLeave',
    value: function _onTouchLeave(ev) {
      this._removeTouches(ev);
    }
  }, {
    key: '_onTouchCancel',
    value: function _onTouchCancel(ev) {
      this._removeTouches(ev);
    }
  }, {
    key: '_zoom',
    value: function _zoom(delta) {
      this.distanceTarget -= delta;
      this.distanceTarget = Math.min(this.distanceTarget, this.options.distanceMax);
      this.distanceTarget = Math.max(this.distanceTarget, this.options.distanceMin);
    }
  }]);

  return OrbitControls;
}();

exports.default = OrbitControls;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Promises = __webpack_require__(25);

var _es6Promises2 = _interopRequireDefault(_es6Promises);

var _glBound = __webpack_require__(4);

var _glBound2 = _interopRequireDefault(_glBound);

var _assetLoader = __webpack_require__(17);

var _assetLoader2 = _interopRequireDefault(_assetLoader);

var _file = __webpack_require__(41);

var _file2 = _interopRequireDefault(_file);

var _texture = __webpack_require__(50);

var _texture2 = _interopRequireDefault(_texture);

var _program = __webpack_require__(14);

var _program2 = _interopRequireDefault(_program);

var _glowramp = __webpack_require__(46);

var _glowramp2 = _interopRequireDefault(_glowramp);

var _opaque = __webpack_require__(47);

var _opaque2 = _interopRequireDefault(_opaque);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _programs = {
  'Glowramp': _glowramp2.default,
  'Opaque': _opaque2.default
};

function simpleMerge(left, right) {
  left = left || {};
  for (var i in right) {
    left[i] = right[i];
  }
  return left;
}

function mergeManifests(base, add) {
  var keys = ['texture', 'mesh', 'program', 'rawProgram'];
  keys.forEach(function (key) {
    if (key in add) {
      base[key] = simpleMerge(base[key], add[key]);
    }
  });
  return base;
}

/**
 * An AssetManager manages all the various types of assets that need to be bound to
 * to a gl context.  It uses an AssetLoader to handle the loading and caching of the
 * asset sources, and also maintains a parallel cache of the bound resources.
 */

var AssetManager = function (_GLBound) {
  _inherits(AssetManager, _GLBound);

  /**
   * Constructs an asset loader.
   * @param  {context} gl      A 3d context from a canvas
   * @param  {Object} manifest A mapping of key:value pairs for the following types:
   *                           texture, mesh, program, rawProgram
   */
  function AssetManager(gl, manifest) {
    _classCallCheck(this, AssetManager);

    var _this = _possibleConstructorReturn(this, (AssetManager.__proto__ || Object.getPrototypeOf(AssetManager)).call(this, gl));

    _this.manifest = manifest;
    _this.loader = new _assetLoader2.default();
    _this.textures = {};
    _this.meshes = {};
    _this.programs = {};
    _this.queues = {
      texture: [],
      mesh: [],
      program: []
    };
    _this.stats = {
      texture: {},
      mesh: {},
      program: {},
      rawProgram: {}
    };
    _this.path = '/assets/';
    return _this;
  }

  /**
   * Merges in another manifest to the existing asset manifest
   *
   * Additional manifests should be merged in before loading.
   * @param {Object} manifest @see constructor
   *
   * @return {void}
   */


  _createClass(AssetManager, [{
    key: 'addAssets',
    value: function addAssets(manifest) {
      this.manifest = mergeManifests(this.manifest, manifest);
    }

    /**
     * Adds a bound texture to the texture cache, under a given internal name
     * @param {String} name     Texture internal name
     * @param {Texture} texture A bound Texture
     *
     * @return {void}
     */

  }, {
    key: 'addTexture',
    value: function addTexture(name, texture) {
      this.textures[name] = texture;
    }

    /**
     * Adds a bound mesh to the mesh cache, under a given internal name
     * @param {String} name Mesh internal name
     * @param {Mesh} mesh   A bound mesh
     *
     * @return {void}
     */

  }, {
    key: 'addMesh',
    value: function addMesh(name, mesh) {
      this.meshes[name] = mesh;
    }

    /**
     * Adds a bound program to the program cache, under a given internal name
     * @param {String} name     Program internal name
     * @param {Program} program A bound Program
     *
     * @return {void}
     */

  }, {
    key: 'addProgram',
    value: function addProgram(name, program) {
      this.programs[name] = program;
    }

    /**
     * Returns a promise that resolves to a bound texture.
     * @param  {String} name Texture internal name
     * @return {Promise}     Resolves to the bound texture.
     */

  }, {
    key: 'loadTexture',
    value: function loadTexture(name) {
      var _this2 = this;

      if (!(name in this.manifest.texture)) {
        return _es6Promises2.default.reject(new Error('Unknown texture ' + name));
      } else if (this.textures[name]) {
        this._recordUsage('texture', name);
        return _es6Promises2.default.resolve(this.textures[name]);
      } else {
        var _ret = function () {
          var asset = _this2.manifest.texture[name];
          return {
            v: _this2.loader.loadAsset(_this2._getFullPath(asset.static, asset.path), 'image').then(function (texture) {
              if (!_this2.textures[name]) {
                _this2.textures[name] = new _texture2.default(_this2._gl, asset, texture);
              }
              _this2._recordUsage('texture', name);
              return _this2.textures[name];
            })
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }

    /**
     * Returns a promise that resolves to a bound mesh.
     * @param  {String} name Mesh internal name
     * @return {Promise}     Resolves to the bound mesh.
     */

  }, {
    key: 'loadMesh',
    value: function loadMesh(name) {
      var _this3 = this;

      if (!(name in this.manifest.mesh)) {
        return _es6Promises2.default.reject(new Error('Unknown mesh ' + name));
      } else if (this.meshes[name]) {
        this._recordUsage('mesh', name);
        return _es6Promises2.default.resolve(this.meshes[name]);
      } else {
        var asset = this.manifest.mesh[name];
        return this.loader.loadAsset(this._getFullPath(asset.static, asset.path), 'arraybuffer').then(function (mesh) {
          if (!_this3.meshes[name]) {
            _this3.meshes[name] = new _file2.default(_this3._gl, mesh);
          }
          _this3._recordUsage('mesh', name);
          return _this3.meshes[name];
        });
      }
    }

    /**
     * Returns a promise that resolves to a bound program.
     * @param  {String} name Program internal name (raw or loaded)
     * @return {Promise}     Resolves to the bound program.
     */

  }, {
    key: 'loadProgram',
    value: function loadProgram(name) {
      var _this4 = this;

      if (!(name in this.manifest.program) && !(name in this.manifest.rawProgram)) {
        return _es6Promises2.default.reject(new Error('Unknown program ' + name));
      } else if (this.programs[name]) {
        this._recordUsage('program', name);
        return _es6Promises2.default.resolve(this.programs[name]);
      } else {
        if (name in this.manifest.rawProgram) {
          var _ret2 = function () {
            var asset = _this4.manifest.rawProgram[name];
            return {
              v: new _es6Promises2.default(function (resolve) {
                if (!_this4.programs[name]) {
                  var Klass = _programs[asset.program] || _program2.default;
                  _this4.programs[name] = new Klass(_this4._gl, asset.vertex, asset.fragment);
                }
                _this4._recordUsage('program', name);
                resolve(_this4.programs[name]);
              })
            };
          }();

          if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        } else {
          var _ret3 = function () {
            var asset = _this4.manifest.program[name];
            return {
              v: _es6Promises2.default.all([_this4.loader.loadAsset(_this4._getFullPath(asset.static, asset.vertex), 'text'), _this4.loader.loadAsset(_this4._getFullPath(asset.static, asset.fragment), 'text')]).then(function (program) {
                if (!_this4.programs[name]) {
                  var Klass = _programs[asset.program] || _program2.default;
                  _this4.programs[name] = new Klass(_this4._gl, program[0], program[1]);
                }
                _this4._recordUsage('program', name);
                return _this4.programs[name];
              })
            };
          }();

          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        }
      }
    }

    /**
     * Loads all remote resources found in the manifest, and creates any static programs
     * included in the manifest's rawPrograms section, if it exists.
     * @return {Promise}          Promise that resolves when all assets are loaded
     */

  }, {
    key: 'loadAll',
    value: function loadAll() {
      var _this5 = this;

      var manifest = this.manifest;
      return _es6Promises2.default.all([Object.keys(manifest.texture).reduce(function (promise, name) {
        return promise.then(function () {
          return _this5.loadTexture(name);
        });
      }, _es6Promises2.default.resolve()), Object.keys(manifest.mesh).reduce(function (promise, name) {
        return promise.then(function () {
          return _this5.loadMesh(name);
        });
      }, _es6Promises2.default.resolve()), Object.keys(manifest.program).concat(Object.keys(manifest.rawProgram)).reduce(function (promise, name) {
        return promise.then(function () {
          return _this5.loadProgram(name);
        });
      }, _es6Promises2.default.resolve())]);
    }

    /**
     * Generates a compact manifest containing only the resources that have been
     * actually be fetched from the cache, after loading.  Useful to reduce loading
     * time for scenes that only use a few resources.
     * @return {Object} A manifest containing only the resources that were actually used
     *                  after loading.
     */

  }, {
    key: 'generateManifest',
    value: function generateManifest() {
      var manifest = {},
          keys = ['texture', 'mesh', 'rawProgram', 'program'];
      keys.forEach(function (section) {
        manifest[section] = {};
        for (var i in this.stats[section]) {
          if (this.stats[section].hasOwnProperty(i) && this.stats[section][i] > 0) {
            manifest[section][i] = this.manifest[section][i];
          }
        }
      }.bind(this));
      return manifest;
    }
  }, {
    key: '_getFullPath',
    value: function _getFullPath(isStatic, path) {
      return (isStatic ? '' : this.path) + path;
    }
  }, {
    key: '_recordUsage',
    value: function _recordUsage(type, name) {
      this.stats[type][name] = (this.stats[type][name] || 0) + 1;
    }
  }]);

  return AssetManager;
}(_glBound2.default);

exports.default = AssetManager;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(0);

var _animator = __webpack_require__(21);

var _animator2 = _interopRequireDefault(_animator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Camera is a class to manage view of the scene.
 *
 * @class
 * @chainable
 * @param {Number} width  The width of the viewport
 * @param {Number} height The height of the viewport
 * @return {this} The new Camera
 */
var Camera = function () {
  function Camera(width, height) {
    _classCallCheck(this, Camera);

    this.position = _glMatrix.vec3.create();
    this.view = _glMatrix.mat4.create();
    this.project = _glMatrix.mat4.create();
    this.viewProject = _glMatrix.mat4.create();
    this.hFoV = Math.PI / 4;
    this.near = 0.1;
    this.far = 100;
    this.width = width;
    this.height = height;
    this.focus = _glMatrix.vec3.create();
    this.up = _glMatrix.vec3.fromValues(0, 1, 0);
    this.animator = new _animator2.default();
    return this._updateProjection()._updateView();
  }

  /**
   * Generates a view matrix, as if the camera is looking at the specified point.
   *
   * @chainable
   * @param  {vec3} point   The point to look at
   * @return {this} Returns `this`
   */


  _createClass(Camera, [{
    key: 'lookAt',
    value: function lookAt(point) {
      _glMatrix.vec3.copy(this.focus, point);
      return this._updateView();
    }

    /**
     * Moves the camera's position in some direction
     *
     * Maintains the camera's current focus.
     *
     * @chainable
     * @param  {vec3} vec   The vector to translate by
     * @return {this} Returns `this`
     */

  }, {
    key: 'translate',
    value: function translate(vec) {
      _glMatrix.vec3.translate(this.position, this.position, vec);
      return this._updateView();
    }

    /**
     * Sets the camera's position
     *
     * @chainable
     * @param {vec3} position Camera position
     * @return {this} Returns `this`
     */

  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      _glMatrix.vec3.copy(this.position, position);
      return this._updateView();
    }

    /**
     * Set the viewport dimensions and update the projection matrix
     *
     * @chainable
     * @param {Number} width  Viewport width
     * @param {Number} height Viewport height
     * @return {this} Returns `this`
     */

  }, {
    key: 'setDimensions',
    value: function setDimensions(width, height) {
      this.width = width;
      this.height = height;
      return this._updateProjection();
    }

    /**
     * Set the horizontal field of view
     *
     * @chainable
     * @param {Number} fov Field of view, in radians
     * @return {this} Returns `this`
     */

  }, {
    key: 'setFieldOfView',
    value: function setFieldOfView(fov) {
      this.hFoV = fov;
      return this._updateProjection();
    }

    /**
     * Sets the far clip distance
     *
     * @chainable
     * @param {Number} far Max viewable distance
     * @return {this} Returns `this`
     */

  }, {
    key: 'setFar',
    value: function setFar(far) {
      this.far = far;
      return this._updateProjection();
    }

    /**
     * Adds an animation
     *
     * @chainable
     * @param {Animation} animation The animation to be run.
     *                              This will need to be started independently, or prior to being added.
     * @return {this} Returns `this`
     */

  }, {
    key: 'addAnimation',
    value: function addAnimation(animation) {
      this.animator.addAnimation(animation);
      return this;
    }

    /**
     * @param {Number} delta The time elapsed since the last draw
     * @return {this} Returns `this`
     */

  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      this.animator.runAnimations(delta, this);
      return this;
    }

    /**
     * Updates the camera's view matrix from all parameters.
     *
     * @chainable
     * @return {this} Returns `this`
     */

  }, {
    key: '_updateView',
    value: function _updateView() {
      _glMatrix.mat4.lookAt(this.view, this.position, this.focus, this.up);
      return this;
    }

    /**
     * Update the camera's projection matrix
     *
     * @chainable
     * @return {this} Returns `this`
     */

  }, {
    key: '_updateProjection',
    value: function _updateProjection() {
      _glMatrix.mat4.perspective(this.project, this.hFoV, this.width / this.height, this.near, this.far);
      return this;
    }
  }]);

  return Camera;
}();

exports.default = Camera;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROGRAM = _constants2.default.Program.Glowramp;

/**
 * Default base color for the glowramp drawable
 *
 * @private
 * @type {vec4}
 */
var defaultBaseColor = _glMatrix.vec4.clone(_constants2.default.teamColors.NEUTRAL);

/**
 * A "glowramp" refers to the usage of the red, green, and blue channels to create
 * a "glowing" texture.
 *
 * @param  {String} meshName    Internal name of the mesh
 * @param  {String} textureName Internal name of the texture
 */

var GlowrampDrawable = function (_TexturedDrawable) {
  _inherits(GlowrampDrawable, _TexturedDrawable);

  function GlowrampDrawable(meshName, textureName) {
    _classCallCheck(this, GlowrampDrawable);

    var _this = _possibleConstructorReturn(this, (GlowrampDrawable.__proto__ || Object.getPrototypeOf(GlowrampDrawable)).call(this, PROGRAM, meshName, textureName));

    _this.uniforms.u_baseColor = _glMatrix.vec4.clone(defaultBaseColor);
    _this.uniforms.u_rotation = 0;
    _this.uniforms.u_rampTarget = 0;
    _this.uniforms.u_alpha = 0.6;
    return _this;
  }

  /**
   * Updates default glowramp variables (rotation, ramp target, elapsed time
   * and alpha)
   * @param  {Number} tick Time delta since last tick
   * @return {Boolean}     @see src/drawable.js#updateTime
   */


  _createClass(GlowrampDrawable, [{
    key: 'updateTime',
    value: function updateTime(tick) {
      var ret = _get(GlowrampDrawable.prototype.__proto__ || Object.getPrototypeOf(GlowrampDrawable.prototype), 'updateTime', this).call(this, tick);
      var inc = this.elapsed / 5000;
      this.uniforms.u_rotation = inc;
      this.uniforms.u_rampTarget = Math.sin(Math.PI / 2 * (inc - Math.floor(inc)));
      this.uniforms.u_alpha = Math.sin(inc) * 0.05 + 0.75;
      return ret;
    }
  }]);

  return GlowrampDrawable;
}(_textured2.default);

exports.default = GlowrampDrawable;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROGRAM = _constants2.default.Program.RegionTextured;

/**
 * An OrnamentDrawable is a TextuedDrawable that draws an ornament on
 * a unit plane.
 * @param  {String} meshName    Internal name of the ornament mesh
 * @param  {String} textureName Internal name of the texture
 */

var OrnamentDrawable = function (_TexturedDrawable) {
  _inherits(OrnamentDrawable, _TexturedDrawable);

  function OrnamentDrawable(meshName, textureName) {
    _classCallCheck(this, OrnamentDrawable);

    var _this = _possibleConstructorReturn(this, (OrnamentDrawable.__proto__ || Object.getPrototypeOf(OrnamentDrawable)).call(this, PROGRAM, meshName, textureName));

    _this.uniforms.u_texCoordBase = _glMatrix.vec2.fromValues(0, 0);
    _this.uniforms.u_texCoordExtent = _glMatrix.vec2.fromValues(1, 1);
    _this.uniforms.u_color = _glMatrix.vec4.clone(_constants2.default.teamColors.LOKI);
    return _this;
  }

  return OrnamentDrawable;
}(_textured2.default);

exports.default = OrnamentDrawable;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEXTURE = _constants2.default.Texture.Particle;

/**
 * A ParticleDrawable represents the base class for particles
 *
 * @extends {TexturedDrawable}
 */

var ParticleDrawable = function (_TexturedDrawable) {
  _inherits(ParticleDrawable, _TexturedDrawable);

  function ParticleDrawable(programName) {
    _classCallCheck(this, ParticleDrawable);

    var _this = _possibleConstructorReturn(this, (ParticleDrawable.__proto__ || Object.getPrototypeOf(ParticleDrawable)).call(this, programName, null, TEXTURE));

    _this.uniforms.u_cameraPos = _glMatrix.vec3.fromValues(0, 0, 0);
    return _this;
  }

  _createClass(ParticleDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject, camera) {
      _get(ParticleDrawable.prototype.__proto__ || Object.getPrototypeOf(ParticleDrawable.prototype), 'updateView', this).call(this, viewProject, camera);
      if (camera) {
        _glMatrix.vec3.copy(this.uniforms.u_cameraPos, camera.position);
      }
    }
  }]);

  return ParticleDrawable;
}(_textured2.default);

exports.default = ParticleDrawable;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _bicolored = __webpack_require__(12);

var _bicolored2 = _interopRequireDefault(_bicolored);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = {};
var meshes = _constants2.default.Mesh.Resource;

/**
 * Creates a resource drawable
 *
 * @private
 * @param  {String} name InternalName
 * @return {itembase}    A BicoloredDrawable representing this resource item
 */
function createResource(name) {
  var itembase = function (_BicoloredDrawable) {
    _inherits(itembase, _BicoloredDrawable);

    function itembase() {
      _classCallCheck(this, itembase);

      return _possibleConstructorReturn(this, (itembase.__proto__ || Object.getPrototypeOf(itembase)).call(this, meshes[name], _constants2.default.Texture.FlipCard));
    }

    return itembase;
  }(_bicolored2.default);

  return itembase;
}

for (var i in meshes) {
  Resource[name] = createResource(i);
}

exports.default = Resource;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROGRAM = _constants2.default.Program.ShieldEffect;

// these defaults are whack.  Need to find the real
// functions used to update these, too
// As of 1.62.0, that was in ...ingress.common.scanner.b.a.d
// The baksmali is a little jacked up, though.
var defaultColor = _glMatrix.vec4.clone(_constants2.default.teamColors.NEUTRAL);
var defaultRampTargetInv = _glMatrix.vec2.fromValues(0.5, 1.3);
var defaultContributions = _glMatrix.vec3.fromValues(0.5, 0.5, 0.5);

/**
 * Represents the shield idle effect
 *
 * Note: This probably should actually be generalized differently...
 * Apparently all three shield effects use the same texture and mesh, but have
 * different programs and variables.
 *
 * So, perhaps a better way would be to have the base class hardcode the texture
 * and mesh internal names, and then the derived classes pick a program and handle
 * the variables.
 *
 * @param  {String} meshName    Mesh internal name
 * @param  {String} textureName Texture internal name
 */

var ShieldEffectDrawable = function (_TexturedDrawable) {
  _inherits(ShieldEffectDrawable, _TexturedDrawable);

  function ShieldEffectDrawable(meshName, textureName) {
    _classCallCheck(this, ShieldEffectDrawable);

    var _this = _possibleConstructorReturn(this, (ShieldEffectDrawable.__proto__ || Object.getPrototypeOf(ShieldEffectDrawable)).call(this, PROGRAM, meshName, textureName));

    _this.uniforms.u_color = _glMatrix.vec4.clone(defaultColor);
    _this.uniforms.u_rampTargetInvWidth = _glMatrix.vec2.clone(defaultRampTargetInv);
    _this.uniforms.u_contributionsAndAlpha = _glMatrix.vec3.clone(defaultContributions);
    return _this;
  }

  /**
   * Updates the default uniforms
   *
   * Note: these are nothing like what's in the apk, just some functions that
   * happen to look kinda sorta nice
   * @param  {Number} delta Time since last frame
   * @return {Boolean}      Returns true to continue the animation.
   */


  _createClass(ShieldEffectDrawable, [{
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(ShieldEffectDrawable.prototype.__proto__ || Object.getPrototypeOf(ShieldEffectDrawable.prototype), 'updateTime', this).call(this, delta);
      var inc = this.elapsed / 10000;
      // this is so shitty, but again, this java decompiler really doesn't like the file.
      // This is nothing close to what's 'supposed' to happen in these uniforms, just a hack
      // that's kinda sorta like the actual thing.
      this.uniforms.u_rampTargetInvWidth[0] = -(inc - Math.floor(inc));
      this.uniforms.u_rampTargetInvWidth[1] = Math.sin((inc - Math.floor(inc)) * Math.PI / 2);
      // u_contributionsAndAlpha?
      return ret;
    }
  }]);

  return ShieldEffectDrawable;
}(_textured2.default);

exports.default = ShieldEffectDrawable;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _textured = __webpack_require__(2);

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROGRAM = _constants2.default.Program.Xm;
var defaultTeamColor = _glMatrix.vec4.clone(_constants2.default.xmColors.coreGlow);
var defaultAltColor = _glMatrix.vec4.clone(_constants2.default.xmColors.coreGlowAlt);

/**
 * An XmDrawable is a drawable representing the animate "xm core" of inventory items
 *
 * @param  {String} meshName    Mesh internal name
 * @param  {String} textureName Texture internal name
 * @param  {vec4} teamColor     Color of the xm glow.
 * @return {[type]}             [description]
 */

var XmDrawable = function (_TexturedDrawable) {
  _inherits(XmDrawable, _TexturedDrawable);

  function XmDrawable(meshName, textureName, teamColor) {
    _classCallCheck(this, XmDrawable);

    var _this = _possibleConstructorReturn(this, (XmDrawable.__proto__ || Object.getPrototypeOf(XmDrawable)).call(this, PROGRAM, meshName, textureName));

    _this.uniforms.u_elapsedTime = 0;
    _this.uniforms.u_teamColor = _glMatrix.vec4.clone(teamColor || defaultTeamColor);
    _this.uniforms.u_altColor = _glMatrix.vec4.clone(defaultAltColor);
    return _this;
  }

  /**
   * Animates the xm core
   * @param  {Number} delta Time since last frame
   * @return {Boolean}      Returns true to continue the animation.
   */


  _createClass(XmDrawable, [{
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(XmDrawable.prototype.__proto__ || Object.getPrototypeOf(XmDrawable.prototype), 'updateTime', this).call(this, delta);
      this.uniforms.u_elapsedTime = this.elapsed / 1000 % 300.0 * 0.1;
      return ret;
    }
  }]);

  return XmDrawable;
}(_textured2.default);

exports.default = XmDrawable;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mesh = __webpack_require__(3);

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = __webpack_require__(7);

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glIndex = __webpack_require__(6);

var _glIndex2 = _interopRequireDefault(_glIndex);

var _glAttribute = __webpack_require__(5);

var _glAttribute2 = _interopRequireDefault(_glAttribute);

var _javaDeserializer = __webpack_require__(51);

var _javaDeserializer2 = _interopRequireDefault(_javaDeserializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function parseAttributes(buf) {
  var v = new DataView(buf.buffer, buf.byteOffset, buf.byteLength),
      c = 0;
  var n = v.getUint32(c),
      type,
      size,
      len,
      j,
      name;
  c += 4;
  var attributes = [];
  for (var i = 0; i < n; i++) {
    type = v.getUint32(c);
    c += 4;
    size = v.getUint32(c);
    c += 4;
    len = v.getUint16(c);
    c += 2;
    name = '';
    for (j = 0; j < len; j++) {
      name += String.fromCharCode(v.getUint8(c + j));
    }
    c += len;
    attributes.push(new _vertexAttribute2.default(name, size, type));
  }
  return attributes;
}

/**
 * A FileMesh is a Mesh that is loaded from a serialzied Java object,
 * as found in the apk.
 *
 * @extends {Mesh}
 */

var FileMesh = function (_Mesh) {
  _inherits(FileMesh, _Mesh);

  /**
   * Construct the Mesh from the given file
   * @param  {context} gl           WebGL context
   * @param  {ArrayBuffer} arraybuf ArrayBuffer representing the entire .obj file
   */
  function FileMesh(gl, arraybuf) {
    _classCallCheck(this, FileMesh);

    var jd = new _javaDeserializer2.default(arraybuf);
    var blocks = jd.getContents();

    // should be Float32Array
    var values = blocks[0].elements;

    // should be ArrayBuffer
    var attributeData = blocks[3];

    // array of VertexAttributes
    var spec = parseAttributes(attributeData);

    // should be Uint16Array
    var faces = new _glIndex2.default(gl, blocks[1].elements, gl.TRIANGLES);
    var attributes = new _glAttribute2.default(gl, spec, values);

    // should be Uint16Array
    var lines = new _glIndex2.default(gl, blocks[2].elements, gl.LINES);

    return _possibleConstructorReturn(this, (FileMesh.__proto__ || Object.getPrototypeOf(FileMesh)).call(this, gl, attributes, faces, lines));
  }

  return FileMesh;
}(_mesh2.default);

exports.default = FileMesh;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mesh = __webpack_require__(3);

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = __webpack_require__(7);

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glIndex = __webpack_require__(6);

var _glIndex2 = _interopRequireDefault(_glIndex);

var _glAttribute = __webpack_require__(5);

var _glAttribute2 = _interopRequireDefault(_glAttribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const MAX_SYSTEMS = 40;
var NUM_PARTICLES_PER_SYSTEM = 96;
var NUM_VERTICES_PER_PARTICLE = 4;
var NUM_INDICES_PER_FACE = 6;
var TOTAL_VERTEX_SIZE = 3 + 2 + 1 + 1 + 1 + 1;
var U = [0.0, 0.0, 1.0, 1.0];
var V = [1.0, 0.0, 1.0, 0.0];

var seeds = [];
for (var i = 0; i < NUM_PARTICLES_PER_SYSTEM; i++) {
  seeds.push({
    x: Math.random() - 0.5,
    y: 0.4 * Math.random() - 0.2,
    z: Math.random() - 0.5,
    a_scale: 10.0 * (0.1 + 0.9 * Math.random()),
    a_speed: 6.0 * (0.5 + 0.5 * Math.random())
  });
}

/**
 * A ParticlePortalMesh is a Mesh that represents a single system or portal particles.
 *
 * @extends {Mesh}
 */

var ParticlePortalMesh = function (_Mesh) {
  _inherits(ParticlePortalMesh, _Mesh);

  /**
   * Construct a system of portal particles
   * @param  {context} gl     WebGL context
   */
  function ParticlePortalMesh(gl) {
    _classCallCheck(this, ParticlePortalMesh);

    var attributes = [];
    attributes.push(new _vertexAttribute2.default('a_position', 3));
    attributes.push(new _vertexAttribute2.default('a_texCoord0', 2));
    attributes.push(new _vertexAttribute2.default('a_scale', 1));
    attributes.push(new _vertexAttribute2.default('a_speed', 1));
    attributes.push(new _vertexAttribute2.default('a_portalIndex', 1));
    attributes.push(new _vertexAttribute2.default('a_index', 1));
    var values = new Float32Array(NUM_PARTICLES_PER_SYSTEM * NUM_VERTICES_PER_PARTICLE * TOTAL_VERTEX_SIZE);
    var seed,
        i,
        j,
        idx = 0;
    for (i = 0; i < NUM_PARTICLES_PER_SYSTEM; i++) {
      seed = seeds[i];
      for (j = 0; j < NUM_VERTICES_PER_PARTICLE; j++) {
        values[idx * TOTAL_VERTEX_SIZE + 0] = seed.x;
        values[idx * TOTAL_VERTEX_SIZE + 1] = seed.y;
        values[idx * TOTAL_VERTEX_SIZE + 2] = seed.z;
        values[idx * TOTAL_VERTEX_SIZE + 3] = U[j];
        values[idx * TOTAL_VERTEX_SIZE + 4] = V[j];
        values[idx * TOTAL_VERTEX_SIZE + 5] = seed.a_scale;
        values[idx * TOTAL_VERTEX_SIZE + 6] = seed.a_speed;
        values[idx * TOTAL_VERTEX_SIZE + 7] = 0;
        values[idx * TOTAL_VERTEX_SIZE + 8] = i;
        idx++;
      }
    }

    var faces = new Uint16Array(NUM_PARTICLES_PER_SYSTEM * NUM_INDICES_PER_FACE);
    var indices = [0, 1, 2, 1, 3, 2];
    idx = 0;
    var f = 0;
    for (i = 0; i < NUM_PARTICLES_PER_SYSTEM; i++) {
      for (j = 0; j < NUM_INDICES_PER_FACE; j++) {
        faces[f + j] = idx + indices[j];
      }
      f += 6;
      idx += 4;
    }
    return _possibleConstructorReturn(this, (ParticlePortalMesh.__proto__ || Object.getPrototypeOf(ParticlePortalMesh)).call(this, gl, new _glAttribute2.default(gl, attributes, values), new _glIndex2.default(gl, faces, gl.TRIANGLES)));
  }

  return ParticlePortalMesh;
}(_mesh2.default);

exports.default = ParticlePortalMesh;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mesh = __webpack_require__(3);

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = __webpack_require__(7);

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glIndex = __webpack_require__(6);

var _glIndex2 = _interopRequireDefault(_glIndex);

var _glAttribute = __webpack_require__(5);

var _glAttribute2 = _interopRequireDefault(_glAttribute);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Parameterize this concept a little better
// this has potential to be a really flexible and powerful way of
// making, essentially, extruded geometry.

// 9 sets of 6 points, breaking the link into 8 pieces, each providing 6 faces, something like that?
var _len = 9,
    _size = _len * 6,
    _chunkSize = 12;
var c = new Array(_len),
    d = new Array(_len),
    e = new Array(_len);

var baseColor = _glMatrix.vec4.fromValues(0.46, 0.18, 0.18, 1.0);
var baseOffset = _glMatrix.vec4.create();

function clampedSin(f) {
  return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
}

for (var i = 0; i < _len; i++) {
  var f = i / 8.0;
  c[i] = f;
  e[i] = 3.0 + -1.5 * Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4);
  d[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
}

function fillChunk(buf, index, x, y, z, u, v, normal, f6, color) {
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
}

function _generateLinkAttributes(start, end, color, startPercent, endPercent) {
  startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
  endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
  var values = new Float32Array(_size * _chunkSize);
  var length = Math.sqrt((end[0] - start[0]) * (end[0] - start[0]) + (end[1] - start[1]) * (end[1] - start[1]));
  var yMin = baseOffset[1],
      yMax = yMin + Math.min(30.0, 0.08 * length),
      avgPercent = (startPercent + endPercent) / 2.0,
      f6 = 0.01 * length,
      f7 = 0.1 + avgPercent * 0.3;
  var vec = _glMatrix.vec3.fromValues(end[0], 0, end[1]);
  _glMatrix.vec3.subtract(vec, vec, _glMatrix.vec3.fromValues(start[0], 0, start[1]));
  var up = _glMatrix.vec3.fromValues(0, 1, 0);
  var right = _glMatrix.vec3.cross(_glMatrix.vec3.create(), vec, up);
  _glMatrix.vec3.normalize(right, right);
  var step = _len * 2;
  for (var i = 0; i < _len; i++) {
    var f8 = c[i],
        f9 = startPercent + f8 * (endPercent - startPercent),
        f10 = 0.6 + 0.35 * f9,
        f12 = f8 * f6,
        f13 = start[0] + f8 * vec[0],
        f14 = start[1] + f8 * vec[2],
        f15 = yMin + d[i] * (yMax - yMin),
        f16 = e[i];
    var cl = _glMatrix.vec4.lerp(_glMatrix.vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
    cl[3] = f10;
    fillChunk(values, i * 2, f13 + f16 * right[0], f15, f14 + f16 * right[2], 0, f12, up, f7, cl);
    fillChunk(values, i * 2 + 1, f13 - f16 * right[0], f15, f14 - f16 * right[2], 0.5, f12, up, f7, cl);
    fillChunk(values, step + i * 2, f13, f15 + f16, f14, 0, f12, right, f7, cl);
    fillChunk(values, step + i * 2 + 1, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
    fillChunk(values, 2 * step + i * 2, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
    fillChunk(values, 2 * step + i * 2 + 1, f13, 0, f14, 1.0, f12, right, f7, cl);
  }
  return values;
}

function _generateFaces(vertexOffset) {
  var ind = new Uint16Array(144),
      iOff = 0;
  for (var i = 0; i < 3; i++) {

    for (var j = 0; j < _len - 1; j++) {

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
}

/**
 * A PortalLinkMesh represents the mesh for a single portal link.
 *
 * @extends {Mesh}
 */

var PortalLinkMesh = function (_Mesh) {
  _inherits(PortalLinkMesh, _Mesh);

  /**
   * Programatically constructs the mesh for a link between two points
   * @param  {context} gl          WebGL context
   * @param  {vec2} start          X,Z of the origin point
   * @param  {vec2} end            X,Z of the destination point
   * @param  {vec4} color          Color of the link
   * @param  {Number} startPercent Origin point percentage
   * @param  {Number} endPercent   Destination point percentage
   */
  function PortalLinkMesh(gl, start, end, color, startPercent, endPercent) {
    _classCallCheck(this, PortalLinkMesh);

    var buf = _generateLinkAttributes(start, end, color, startPercent, endPercent);
    var ind = _generateFaces(0);
    var attributes = [];
    attributes.push(new _vertexAttribute2.default('a_position', 4));
    attributes.push(new _vertexAttribute2.default('a_texCoord0', 4));
    attributes.push(new _vertexAttribute2.default('a_color', 4));
    var attribute = new _glAttribute2.default(gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new _glIndex2.default(gl, ind, gl.TRIANGLES);
    return _possibleConstructorReturn(this, (PortalLinkMesh.__proto__ || Object.getPrototypeOf(PortalLinkMesh)).call(this, gl, attribute, faces));
  }

  return PortalLinkMesh;
}(_mesh2.default);

exports.default = PortalLinkMesh;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mesh = __webpack_require__(3);

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = __webpack_require__(7);

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glIndex = __webpack_require__(6);

var _glIndex2 = _interopRequireDefault(_glIndex);

var _glAttribute = __webpack_require__(5);

var _glAttribute2 = _interopRequireDefault(_glAttribute);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Parameterize this concept a little better
// this has potential to be a really flexible and powerful way of
// making, essentially, extruded geometry.

// 5 sets of 4 points, breaking the link into 4 pieces, each providing 4 faces
// chunksize is size of each element in the packed vertex array, in bytes
var _len = 5,
    _size = _len * 4,
    _chunkSize = 12;
var j = new Array(_len),
    k = new Array(_len),
    l = new Array(_len);

function clampedSin(f) {
  return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
}

for (var i = 0; i < _len; i++) {
  var f = i / 4.0;
  j[i] = f;
  l[i] = 3.5 * Math.max(1.0 - Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4.0), 0.2);
  k[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
}

var baseColor = _glMatrix.vec4.fromValues(0.78, 0.31, 0.31, 1.0);
var resonatorMidOffset = 0;
var portalBaseOffset = 0;
var up = _glMatrix.vec3.fromValues(0, 1, 0);

function fillChunk(buf, index, x, y, z, u, v, normal, f6, color) {
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
}

function _generateLinkAttributes(portal, resonator, color, resonatorPercent) {
  resonatorPercent = resonatorPercent === undefined ? 1 : Math.max(Math.min(resonatorPercent, 1), 0);
  var values = new Float32Array(_size * _chunkSize);
  var dist = Math.sqrt((resonator[0] - portal[0]) * (resonator[0] - portal[0]) + (resonator[1] - portal[1]) * (resonator[1] - portal[1]));
  var f4 = 2 / 30 * dist,
      f5 = 0.9 + 0.1 * resonatorPercent,
      f6 = 0.65 + 0.35 * resonatorPercent,
      f8 = 0.1 + 0.3 * resonatorPercent;
  var cl = _glMatrix.vec4.lerp(_glMatrix.vec4.create(), baseColor, color, 0.1 + resonatorPercent * 0.85);
  cl[3] = 0.75 + 0.25 * resonatorPercent * cl[3];
  var vec = _glMatrix.vec3.fromValues(resonator[0], 0, resonator[1]);
  _glMatrix.vec3.subtract(vec, vec, _glMatrix.vec3.fromValues(portal[0], 0, portal[1]));
  var right = _glMatrix.vec3.cross(_glMatrix.vec3.create(), vec, up);
  _glMatrix.vec3.normalize(right, right);
  var step = _len * 2;
  var f10 = 5.0 * (portal[0] + portal[1] - Math.floor(portal[0] + portal[1]));
  for (var i = 0; i < _len; i++) {
    var f11 = j[i],
        f12 = portal[0] + f11 * vec[0],
        f13 = portal[1] + f11 * vec[2],
        f14 = portalBaseOffset + f11 * (resonatorMidOffset - portalBaseOffset) + f5 * k[i],
        f15 = f6 * l[i],
        f16 = f11 * f4;
    fillChunk(values, i * 2 + 0, f12 + f15 * right[0], f14, f13 + f15 * right[2], 0.0, f16 + f10, up, f8, cl);
    fillChunk(values, i * 2 + 1, f12 - f15 * right[0], f14, f13 - f15 * right[2], 1.0, f16 + f10, up, f8, cl);
    fillChunk(values, step + i * 2 + 0, f12, f14 + f15, f13, 0.0, f16 + f10, right, f8, cl);
    fillChunk(values, step + i * 2 + 1, f12, f14 - f15, f13, 1.0, f16 + f10, right, f8, cl);
  }
  return values;
}

function _generateFaces(vertexOffset) {
  var ind = new Uint16Array(48),
      iOff = 0;

  for (i = 0; i < 2; i++) {
    for (var i2 = 0; i2 < _len - 1; i2++) {
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
}

/**
 * A ResonatorLinkMesh is a Mesh that represents a single link between a portal and a resonator
 *
 * TODO: Make disco
 *
 * @extends {Mesh}
 */

var ResonatorLinkMesh = function (_Mesh) {
  _inherits(ResonatorLinkMesh, _Mesh);

  /**
   * Construct a resonator link mesh
   * @param  {context} gl              WebGL context
   * @param  {vec2} portalPosition     X,Z of the portal
   * @param  {Number} slot             Resonator slot (0-7)
   * @param  {Number} distance         Distance from the portal
   * @param  {vec4} color              Color of the resonator link
   * @param  {Number} resonatorPercent Percent health of the resonator
   */
  function ResonatorLinkMesh(gl, portalPosition, slot, distance, color, resonatorPercent) {
    _classCallCheck(this, ResonatorLinkMesh);

    var theta = slot / 8 * 2 * Math.PI;
    var end = _glMatrix.vec2.create();
    var relative = _glMatrix.vec2.fromValues(distance * Math.cos(theta), distance * Math.sin(theta));
    _glMatrix.vec2.add(end, portalPosition, relative);
    var buf = _generateLinkAttributes(portalPosition, end, color, resonatorPercent);
    var ind = _generateFaces(0);
    var attributes = [];
    attributes.push(new _vertexAttribute2.default('a_position', 4));
    attributes.push(new _vertexAttribute2.default('a_texCoord0', 4));
    attributes.push(new _vertexAttribute2.default('a_color', 4));
    var attribute = new _glAttribute2.default(gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new _glIndex2.default(gl, ind, gl.TRIANGLES);
    return _possibleConstructorReturn(this, (ResonatorLinkMesh.__proto__ || Object.getPrototypeOf(ResonatorLinkMesh)).call(this, gl, attribute, faces));
  }

  return ResonatorLinkMesh;
}(_mesh2.default);

exports.default = ResonatorLinkMesh;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mesh = __webpack_require__(3);

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = __webpack_require__(7);

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glIndex = __webpack_require__(6);

var _glIndex2 = _interopRequireDefault(_glIndex);

var _glAttribute = __webpack_require__(5);

var _glAttribute2 = _interopRequireDefault(_glAttribute);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _chunkSize = 13;
var baseColor = _glMatrix.vec4.fromValues(0.46, 0.18, 0.18, 1.0);
var baseOffset = _glMatrix.vec4.create();

function clampedSin(f) {
  return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
}

function getBearing(start, end) {
  var s = start[0],
      e = end[0],
      dl = end[1] - start[1];
  var y = Math.sin(dl) * Math.cos(e),
      x = Math.cos(s) * Math.sin(e) - Math.sin(s) * Math.cos(e) * Math.cos(dl);

  return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
}

function dest(p, bearing, angle) {
  var lat = Math.asin(Math.sin(p[0]) * Math.cos(angle) + Math.cos(p[0]) * Math.sin(angle) * Math.cos(bearing)),
      lon = p[1] + Math.atan2(Math.sin(bearing) * Math.sin(angle) * Math.cos(p[0]), Math.cos(angle) - Math.sin(p[0]) * Math.sin(lat));

  lon = (lon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
  return _glMatrix.vec2.fromValues(lat, lon);
}

function buildMatrix(s, e, radius) {
  var mat = _glMatrix.mat4.create();
  _glMatrix.mat4.rotateY(mat, mat, s[1]);
  _glMatrix.mat4.rotateZ(mat, mat, s[0] - Math.PI / 2);
  _glMatrix.mat4.rotateY(mat, mat, -getBearing(s, e));
  _glMatrix.mat4.translate(mat, mat, [0, radius, 0]);
  return mat;
}

function getRadialDistance(s, e) {
  var dLat = e[0] - s[0],
      dLon = e[1] - s[1];

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(s[0]) * Math.cos(e[0]) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRadians(point) {
  return _glMatrix.vec2.fromValues(point[0] * Math.PI / 180, point[1] * Math.PI / 180);
}

function fillChunk(buf, index, pos, uv, normal, f6, color) {
  var off = index * _chunkSize;
  _glMatrix.vec3.normalize(normal, normal);
  buf[off + 0] = pos[0];
  buf[off + 1] = pos[1];
  buf[off + 2] = pos[2];
  buf[off + 3] = f6;
  buf[off + 4] = uv[0];
  buf[off + 5] = uv[1];
  buf[off + 6] = normal[0];
  buf[off + 7] = normal[1];
  buf[off + 8] = normal[2];
  buf[off + 9] = color[0];
  buf[off + 10] = color[1];
  buf[off + 11] = color[2];
  buf[off + 12] = color[3];
}

// start and end should probably be in radians?
function _generateLinkAttributes(radius, start, end, color, startPercent, endPercent) {
  var s = toRadians(start);
  var e = toRadians(end);
  var angle = getRadialDistance(s, e);
  var bearing = getBearing(s, e);
  var length = angle * radius;
  var segments = Math.max(Math.floor(angle / Math.PI * 50) + 1, 8); // 50 segments for a half-circle sounds good, I guess.
  startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
  endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
  var values = new Float32Array(segments * _chunkSize * 6);
  var yMin = baseOffset[1],
      yMax = yMin + Math.min(radius * 0.01, 0.08 * length),
      avgPercent = (startPercent + endPercent) / 2.0,
      f6 = 0.01 * length,
      f7 = 0.1 + avgPercent * 0.3,
      up = _glMatrix.vec3.fromValues(0, 1, 0),
      right = _glMatrix.vec3.fromValues(0, 0, 1);
  var step = segments * 2;
  for (var i = 0; i < segments; i++) {
    var f8 = i / (segments - 1),
        f9 = startPercent + f8 * (endPercent - startPercent),
        f10 = 0.6 + 0.35 * f9,

    // v as in "uv" as in texcoords
    v = f8 * f6,

    // "current" point in progression
    curr = f8 === 0 ? s : dest(s, bearing, angle * f8),

    // "next" point in the progression
    next = dest(s, bearing, angle * (f8 + 1 / (segments - 1))),
        transform = buildMatrix(curr, next, radius),

    // "height" of the centerpoint of the link.
    h = _glMatrix.vec3.fromValues(0, yMin + (3.0 + -1.5 * Math.pow(clampedSin(2.0 * Math.abs(f8 - 0.5)), 4)) * (yMax - yMin), 0),

    // "radius" of the link
    w = radius * 0.01 * clampedSin(1.0 - 2.0 * Math.abs(f8 - 0.5)),
        wUp = _glMatrix.vec3.fromValues(0, w, 0),
        wRight = _glMatrix.vec3.fromValues(0, 0, w),
        cl = _glMatrix.vec4.lerp(_glMatrix.vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
    cl[3] = f10;

    // top horizontal segment
    // right point
    fillChunk(values, i * 2, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.add(_glMatrix.vec3.create(), h, wRight), transform), _glMatrix.vec2.fromValues(0, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), up, transform), f7, cl);
    // left point
    fillChunk(values, i * 2 + 1, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.subtract(_glMatrix.vec3.create(), h, wRight), transform), _glMatrix.vec2.fromValues(0.5, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), up, transform), f7, cl);

    // top vertical segment
    fillChunk(values, step + i * 2, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.add(_glMatrix.vec3.create(), h, wUp), transform), _glMatrix.vec2.fromValues(0, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), right, transform), f7, cl);
    fillChunk(values, step + i * 2 + 1, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.subtract(_glMatrix.vec3.create(), h, wUp), transform), _glMatrix.vec2.fromValues(0.5, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), right, transform), f7, cl);

    // bottom vertical segment
    fillChunk(values, 2 * step + i * 2, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.subtract(_glMatrix.vec3.create(), h, wUp), transform), _glMatrix.vec2.fromValues(0.5, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), right, transform), f7, cl);
    fillChunk(values, 2 * step + i * 2 + 1, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.fromValues(0, 0, 0), transform), _glMatrix.vec2.fromValues(1.0, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), right, transform), f7, cl);
  }
  return values;
}

function _generateFaces(vertexOffset, segments) {
  var ind = new Uint16Array(6 * (segments - 1) * 3),
      iOff = 0;
  for (var i = 0; i < 3; i++) {

    for (var j = 0; j < segments - 1; j++) {

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
}

/**
 * A SphereicalPortalLinkMesh is a Mesh that represents a portal link betwen two portals
 * on the surface of a sphere
 *
 * @extends {Mesh}
 */

var SphericalPortalLinkMesh = function (_Mesh) {
  _inherits(SphericalPortalLinkMesh, _Mesh);

  /**
   * Construct a spherical portal link
   * @param  {context} gl          WebGL context
   * @param  {Number} sphereRadius Radius of the sphere
   * @param  {vec2} start          lat,lng of the origin point
   * @param  {vec2} end            lat,lng of the destionation point
   * @param  {vec4} color          Color of the link
   * @param  {Number} startPercent Origin portal health percentage
   * @param  {Number} endPercent   Destination portal health percentage
   */
  function SphericalPortalLinkMesh(gl, sphereRadius, start, end, color, startPercent, endPercent) {
    var _ret;

    _classCallCheck(this, SphericalPortalLinkMesh);

    var buf = _generateLinkAttributes(sphereRadius, start, end, color, startPercent, endPercent);
    var len = buf.length,
        segments = Math.floor(len / _chunkSize / 6);
    var ind = _generateFaces(0, segments);
    var attributes = [];
    attributes.push(new _vertexAttribute2.default('a_position', 4));
    attributes.push(new _vertexAttribute2.default('a_texCoord0', 2));
    attributes.push(new _vertexAttribute2.default('a_normal', 3));
    attributes.push(new _vertexAttribute2.default('a_color', 4));
    var attribute = new _glAttribute2.default(gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new _glIndex2.default(gl, ind, gl.TRIANGLES);

    var _this = _possibleConstructorReturn(this, (SphericalPortalLinkMesh.__proto__ || Object.getPrototypeOf(SphericalPortalLinkMesh)).call(this, gl, attribute, faces));

    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  return SphericalPortalLinkMesh;
}(_mesh2.default);

exports.default = SphericalPortalLinkMesh;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _program = __webpack_require__(14);

var _program2 = _interopRequireDefault(_program);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A GlowrampProgram is a program meant for drawing
 * transparent glowramp drawables
 *
 * @extends {Program}
 * @param  {context} gl      WebGL context
 * @param  {String} vertex   Vertex shader source
 * @param  {String} fragment Fragment shader source
 */
var GlowrampProgram = function (_Program) {
  _inherits(GlowrampProgram, _Program);

  function GlowrampProgram(gl, vertex, fragment) {
    _classCallCheck(this, GlowrampProgram);

    return _possibleConstructorReturn(this, (GlowrampProgram.__proto__ || Object.getPrototypeOf(GlowrampProgram)).call(this, gl, vertex, fragment));
  }

  /**
   * Use this program to draw
   *
   * Sets up the proper blending modes, etc
   * @param  {Function} fn The draw function
   * @return {void}
   */


  _createClass(GlowrampProgram, [{
    key: 'use',
    value: function use(fn) {
      if (!this.program) {
        this.init();
      }
      var gl = this._gl;
      gl.useProgram(this.program);
      // init stuffs.
      gl.disable(gl.CULL_FACE);
      gl.enable(gl.BLEND);
      gl.depthMask(false);
      gl.blendEquation(gl.FUNC_ADD);
      //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      fn(this.attributes, this.uniforms);

      (0, _utils.resetGL)(gl);
      //gl.useProgram(0);
    }
  }]);

  return GlowrampProgram;
}(_program2.default);

exports.default = GlowrampProgram;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _program = __webpack_require__(14);

var _program2 = _interopRequireDefault(_program);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * And OpaqueProgram is a Program used to draw opaque drawables
 *
 * @extends {Program}
 * @param  {context} gl      WebGL context
 * @param  {String} vertex   Vertex shader source
 * @param  {String} fragment Fragment shader source
 */
var OpaqueProgram = function (_Program) {
  _inherits(OpaqueProgram, _Program);

  function OpaqueProgram(gl, vertex, fragment) {
    _classCallCheck(this, OpaqueProgram);

    return _possibleConstructorReturn(this, (OpaqueProgram.__proto__ || Object.getPrototypeOf(OpaqueProgram)).call(this, gl, vertex, fragment));
  }

  /**
   * Use this program to draw.
   *
   * Sets up the proper culling for drawing opaque objects
   *
   * @param  {Function} fn The draw function
   * @return {void}
   */


  _createClass(OpaqueProgram, [{
    key: 'use',
    value: function use(fn) {
      if (!this.program) {
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

      (0, _utils.resetGL)(gl);
      //gl.useProgram(0);
    }
  }]);

  return OpaqueProgram;
}(_program2.default);

exports.default = OpaqueProgram;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glBound = __webpack_require__(4);

var _glBound2 = _interopRequireDefault(_glBound);

var _glMatrix = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ... In retrospect, I'm not sure exactly the purpose this class serves
 * It seems that ObjectRenderer inherits from this class, but it's also
 * the only renderer that's currently used.
 * TODO: Revisit this
 *
 * @class
 * @extends {GLBound}
 * @param  {context} gl           A WebGL context
 * @param  {AssetManager} manager An AssetManager to manage GL-bound
 */
var Renderer = function (_GLBound) {
  _inherits(Renderer, _GLBound);

  function Renderer(gl, manager) {
    _classCallCheck(this, Renderer);

    var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, gl));

    _this.manager = manager;
    _this.viewProject = _glMatrix.mat4.create();
    _this.view = _glMatrix.mat4.create();
    _this.project = _glMatrix.mat4.create();
    _this.elapsed = 0;
    return _this;
  }

  /**
   * Update the internal view and projection matrices
   *
   * @param  {Camera} camera    The camera
   * @return {void}
   */


  _createClass(Renderer, [{
    key: 'updateView',
    value: function updateView(camera) {
      this.view = camera.view;
      this.project = camera.project;
      _glMatrix.mat4.multiply(this.viewProject, this.project, this.view);
    }

    /**
     * Actually controls the render loop?
     *
     * @abstract
     * @return {void}
     */

  }, {
    key: 'render',
    value: function render() {
      throw new Error('render() must be implemented');
    }

    /**
     * Updates the internal counter of elapsed time.
     *
     * @param  {Number} delta Time elapsed since last render call
     * @return {void}
     */

  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      this.elapsed += delta;
    }
  }]);

  return Renderer;
}(_glBound2.default);

exports.default = Renderer;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _renderer = __webpack_require__(48);

var _renderer2 = _interopRequireDefault(_renderer);

var _drawable = __webpack_require__(9);

var _drawable2 = _interopRequireDefault(_drawable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO rework this.
var ObjectRenderer = function (_Renderer) {
  _inherits(ObjectRenderer, _Renderer);

  function ObjectRenderer(gl, manager) {
    _classCallCheck(this, ObjectRenderer);

    var _this = _possibleConstructorReturn(this, (ObjectRenderer.__proto__ || Object.getPrototypeOf(ObjectRenderer)).call(this, gl, manager));

    _this.drawables = [];
    return _this;
  }

  _createClass(ObjectRenderer, [{
    key: 'addDrawable',
    value: function addDrawable(drawable, excludeChildren) {
      var _this2 = this;

      if (!(drawable instanceof _drawable2.default)) {
        return Promise.reject(new Error('Drawables must always inherit from the base Drawable'));
      }
      var promise = drawable.init(this.manager).catch(function (err) {
        console.warn('could not initialize drawable: ', drawable); // eslint-disable-line no-console
        return Promise.reject(err);
      });
      if (drawable.updateView) {
        drawable.updateView(this.viewProject, null);
      }
      this.drawables.push(drawable);
      if (!excludeChildren) {
        drawable.children.forEach(function (c) {
          _this2.addDrawable(c);
        });
      }
      return promise;
    }
  }, {
    key: 'removeDrawable',
    value: function removeDrawable(drawable, destroy) {
      for (var i = 0; i < this.drawables.length; i++) {
        if (this.drawables[i] === drawable) {
          this.drawables.splice(i, 1);
          if (destroy) {
            drawable.dispose();
            return true;
          } else {
            return drawable;
          }
        }
      }
      return false;
    }
  }, {
    key: 'addEntity',
    value: function addEntity(entity) {
      for (var i in entity.drawables) {
        this.addDrawable(entity.drawables[i]);
      }
    }
  }, {
    key: 'updateView',
    value: function updateView(camera) {
      _get(ObjectRenderer.prototype.__proto__ || Object.getPrototypeOf(ObjectRenderer.prototype), 'updateView', this).call(this, camera);
      var i,
          len = this.drawables.length;
      for (i = 0; i < len; i++) {
        if (this.drawables[i].updateView) {
          this.drawables[i].updateView(this.viewProject, camera);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var i,
          len = this.drawables.length;
      for (i = 0; i < len; i++) {
        this.drawables[i].draw();
      }
    }
  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      _get(ObjectRenderer.prototype.__proto__ || Object.getPrototypeOf(ObjectRenderer.prototype), 'updateTime', this).call(this, delta);
      var i,
          len = this.drawables.length;
      for (i = 0; i < len; i++) {
        // if these return false, remove them from the render loop:
        if (!this.drawables[i].updateTime(delta)) {
          this.drawables.splice(i, 1);
          i--;
          len--;
        }
      }
    }
  }]);

  return ObjectRenderer;
}(_renderer2.default);

exports.default = ObjectRenderer;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glBound = __webpack_require__(4);

var _glBound2 = _interopRequireDefault(_glBound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A gl-bound texture
 * Supports most (all?) of the texture binding options.
 * Also generates mipmaps if the texture requires it.
 *
 * @class
 * @param  {context} gl   A WebGL context
 * @param  {Object} info  Texture parameters
 * @param  {Images} image An image to use as the texture
 */
var Texture = function (_GLBound) {
  _inherits(Texture, _GLBound);

  function Texture(gl, info, image) {
    _classCallCheck(this, Texture);

    var _this = _possibleConstructorReturn(this, (Texture.__proto__ || Object.getPrototypeOf(Texture)).call(this, gl));

    _this.info = info;
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
    if (/MipMap/.test(info.minFilter)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);

    _this.texture = texture;
    return _this;
  }

  /**
   * Bind the texture to a particular texture index
   *
   * @param  {Number} index Texture index to bind to
   * @return {void}
   */


  _createClass(Texture, [{
    key: 'use',
    value: function use(index) {
      var gl = this._gl;
      index = index || 0;
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.activeTexture(gl.TEXTURE0 + index);
    }

    /**
     * NYI: TODO
     *
     * @return {void}
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      // TODO: Figure out when this should be called.
      // noop;
    }
  }]);

  return Texture;
}(_glBound2.default);

exports.default = Texture;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*! java-deserializer 19-08-2015 */

!function(a){if(true)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JavaDeserializer=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return require(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a("./stream-reader"),h=d(g),i=44269,j=5,k=112,l=113,m=114,n=116,o=117,p=119,q=120,r=8257536,s=function(){function a(b){e(this,a),this.buffer=b,this.stream=new h["default"](b),this.repr=null,this.refs=[],this._checkMagic()}return f(a,[{key:"_checkMagic",value:function(){if(this.stream.readUint16()!==i)throw"invalid magic number!";if(this.stream.readUint16()!==j)throw"invalid version!"}},{key:"_readClassDescription",value:function(){var a="BCDFIJSZ",b=this.stream.readUint8(),c={};if(b!==k){if(b===l){var d=this.stream.readUint32()-r;return this.refs[d]}if(b!==m)return void console.log("I don't know how to handle this type yet: "+b);c.name=this.stream.readUtf8String(),c.versionId=[this.stream.readUint32(),this.stream.readUint32()],c.handle=this.refs.length,c.flags=this.stream.readUint8();for(var e=[],f=this.stream.readUint16(),g=0;f>g;g++){var h={};h.type=this.stream.readUint8(),h.name=this.stream.readUtf8String(),-1===a.indexOf(String.fromCharCode(h.type))&&console.log("this is not a primitive type: "+h.type),e.push(h)}return c.fields=e,c.annotation=this.stream.readUint8(),c.annotation!==q&&console.log("I don't know what to do with this: "+c.annotation),c.superClass=this._readClassDescription(),this.refs.push(c),c}}},{key:"_readArray",value:function(){var a,b,c={},d=this._readClassDescription();c.description=d,c.handle=this.refs.length,b=this.stream.readUint32();var e=d.name;if("[F"===e)c.elements=this.stream.readFloat32Array(b);else if("[S"===e)c.elements=this.stream.readUint16Array(b);else for(c.elements=[],a=0;b>a;a++){var f=this._readChunk();c.elements.push(f)}return this.refs.push(c),c}},{key:"_readBlockData",value:function(){var a=this.stream.readUint8();return this.stream.readUint8Array(a)}},{key:"_readChunk",value:function(){var a=this.stream.readUint8(),b=null;switch(a){case o:b=this._readArray();break;case p:b=this._readBlockData();break;case n:b=this.stream.readUtf8String();break;default:console.log("unhandled type")}return b}},{key:"getContents",value:function(){if(this.repr)return this.repr;for(this.repr=[];this.stream.getPosition()<this.stream.getLength();)this.repr.push(this._readChunk());return this.repr}}]),a}();s.VERSION="0.2.0",c["default"]=s,b.exports=c["default"]},{"./stream-reader":2}],2:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(b){d(this,a),this.buffer=b,this.dataview=new DataView(b),this.currentOffset=0}return e(a,[{key:"getLength",value:function(){return this.dataview.byteLength}},{key:"getPosition",value:function(){return this.currentOffset}},{key:"readUint32",value:function(){var a=this.dataview.getUint32(this.currentOffset);return this.currentOffset+=4,a}},{key:"readUint16",value:function(){var a=this.dataview.getUint16(this.currentOffset);return this.currentOffset+=2,a}},{key:"readUint8",value:function(){var a=this.dataview.getUint8(this.currentOffset);return this.currentOffset++,a}},{key:"readInt32",value:function(){var a=this.dataview.getInt32(this.currentOffset);return this.currentOffset+=4,a}},{key:"readInt16",value:function(){var a=this.dataview.getInt16(this.currentOffset);return this.currentOffset+=2,a}},{key:"readInt8",value:function(){var a=this.dataview.getInt8(this.currentOffset);return this.currentOffset++,a}},{key:"readFloat32",value:function(){var a=this.dataview.getFloat32(this.currentOffset);return this.currentOffset+=4,a}},{key:"readUtf8String",value:function(){for(var a=this.readUint16(),b="",c=0;a>c;c++)b+=String.fromCharCode(this.readUint8());return b}},{key:"readFloat32Array",value:function(a){for(var b=new Float32Array(a),c=0;a>c;c++)b[c]=this.readFloat32();return b}},{key:"readUint16Array",value:function(a){for(var b=new Uint16Array(a),c=0;a>c;c++)b[c]=this.readUint16();return b}},{key:"readUint8Array",value:function(a){var b=new Uint8Array(this.buffer,this.currentOffset,a);return this.currentOffset+=a,b}}]),a}();c["default"]=f,b.exports=c["default"]},{}]},{},[1])(1)});
//# sourceMappingURL=java-deserializer.min.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! libtga 13-08-2015 */

!function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports,module], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if("undefined"!=typeof exports&&"undefined"!=typeof module)b(exports,module);else{var c={exports:{}};b(c.exports,c),a.libtga=c.exports}}(this,function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d=18,e=0,f=1,g=2,h=3,i=8,j=15,k=48,l=192,m=2,n=1,o=2,p=1,q=function s(a){c(this,s),this.dataview=new DataView(a),this.header=s.readHeader(this.dataview),this.width=this.header.imageSpec.width,this.height=this.header.imageSpec.height,this.compressed=!!(this.header.imageType&i),this.imageId=s.readImageId(this.dataview,this.header),this.colorMap=s.readColorMap(this.dataview,this.header),this.imageData=s.readImage(this)};q.HEADER_SIZE=d,q.IMAGE_TYPE_NONE=e,q.IMAGE_TYPE_COLORMAPPED=f,q.IMAGE_TYPE_TRUECOLOR=g,q.IMAGE_TYPE_GREYSCALE=h,q.IMAGE_RUNLENGTH_ENCODED=i,q.readHeader=function(a){var b={idLength:a.getUint8(0,!0),mapType:a.getUint8(1,!0),imageType:a.getUint8(2,!0),colorMapSpec:q.readColorMapSpec(a,3),imageSpec:q.readImageSpec(a,8)};return b},q.readColorMapSpec=function(a,b){var c=a.getUint8(b+4,!0),d={firstEntry:a.getUint16(b,!0),length:a.getUint16(b+2,!0),entrySizeBits:c,entrySizeBytes:Math.floor((c+7)/8)};return d},q.readImageSpec=function(a,b){var c=a.getUint8(b+9),d={xOrigin:a.getUint16(b,!0),yOrigin:a.getUint16(b+2,!0),width:a.getUint16(b+4,!0),height:a.getUint16(b+6,!0),pixelDepth:a.getUint8(b+8),descriptor:c,attributeBits:c&j,origin:(c&k)>>4,interleave:(c&l)>>6};return d},q.readImageId=function(a,b){return new Uint8Array(a.buffer,d,b.idLength)},q.readColorMap=function(a,b){if(b.colorMapSpec.length<=0)return null;var c=new Uint8ClampedArray(4*b.colorMapSpec.length),e=null,f=d+b.idLength;switch(b.colorMapSpec.entrySizeBits){case 8:e=q.readPixel8;break;case 16:e=q.readPixel15;break;case 15:e=q.readPixel16;break;case 24:e=q.readPixel24;break;case 32:e=q.readPixel32;break;default:throw"Unsupported pixel depth"}for(var g=0;g<b.colorMapSpec.length;g++)e(a,f,g,c,g);return c},q.readPixel8=function(a,b,c,d,e){var f=a.getUint8(b+c);d[4*e+2]=f,d[4*e+1]=f,d[4*e+0]=f,d[4*e+3]=255},q.readPixel15=function(a,b,c,d,e){var f=a.getUint16(b+2*c,!0);d[4*e+2]=(31&f)<<3,d[4*e+1]=(f>>5&31)<<3,d[4*e+0]=(f>>10&31)<<3,d[4*e+3]=255},q.readPixel16=function(a,b,c,d,e){var f=a.getUint16(b+2*c,!0);d[4*e+2]=(31&f)<<3,d[4*e+1]=(f>>5&31)<<3,d[4*e+0]=(f>>10&31)<<3,d[4*e+3]=128==(128&f)?255:0},q.readPixel24=function(a,b,c,d,e){d[4*e+2]=a.getUint8(b+3*c+0),d[4*e+1]=a.getUint8(b+3*c+1),d[4*e+0]=a.getUint8(b+3*c+2),d[4*e+3]=255},q.readPixel32=function(a,b,c,d,e){d[4*e+2]=a.getUint8(b+4*c+0),d[4*e+1]=a.getUint8(b+4*c+1),d[4*e+0]=a.getUint8(b+4*c+2),d[4*e+3]=255},q.readMappedPixel8=function(a,b,c,d,e,f,g){var h=a.getUint8(d+e)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel15=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel16=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel24=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel32=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readRLEImage=function(){throw"NYI"},q.readColormappedImage=function(a){var b=a.dataview,c=a.header,e=a.colorMap,f=c.imageSpec.width,g=c.imageSpec.height,h=new Uint8ClampedArray(f*g*4),i=c.imageSpec.pixelDepth,j=d+c.idLength+c.colorMapSpec.length*c.colorMapSpec.entrySizeBytes,k=c.colorMapSpec.firstEntry,l=null,r=(c.imageSpec.origin&m)===o?1:-1,s=(c.imageSpec.origin&n)===p?-1:1;if(!e)throw"Image is described as color-mapped, but has no map";switch(i){case 8:l=q.readMappedPixel8;break;case 16:l=q.readMappedPixel15;break;case 15:l=q.readMappedPixel16;break;case 24:l=q.readMappedPixel24;break;case 32:l=q.readMappedPixel32;break;default:throw"Unsupported pixel depth"}var t,u,v,w;r>0?(t=0,u=g):(t=g-1,u=-1),s>0?(v=0,w=f):(v=f-1,w=-1);for(var x,y=0,z=t;z!=u;z+=r){x=0;for(var A=v;A!=w;A+=s)l(b,e,k,j,z*f+A,h,y*f+x++);y++}return h},q.readTruecolorImage=function(a){var b=a.header,c=a.dataview,e=b.imageSpec.width,f=b.imageSpec.height,g=new Uint8ClampedArray(e*f*4),h=b.imageSpec.pixelDepth,i=d+b.idLength+b.colorMapSpec.length*b.colorMapSpec.entrySizeBytes,j=null,k=(b.imageSpec.origin&m)===o?1:-1,l=(b.imageSpec.origin&n)===p?-1:1;switch(h){case 8:j=q.readPixel8;break;case 16:j=q.readPixel15;break;case 15:j=q.readPixel16;break;case 24:j=q.readPixel24;break;case 32:j=q.readPixel32;break;default:throw"Unsupported pixel depth"}var r,s,t,u;k>0?(r=0,s=f):(r=f-1,s=-1),l>0?(t=0,u=e):(t=e-1,u=-1);for(var v,w=0,x=r;x!=s;x+=k){v=0;for(var y=t;y!=u;y+=l)j(c,i,x*e+y,g,w*e+v++);w++}return g},q.readImage=function(a){if(a.header.compressed)return q.readRLEImage(a);if(0===a.header.mapType)return q.readTruecolorImage(a);if(1===a.header.mapType)return q.readColormappedImage(a);throw"Unsupported map type"};var r={readFile:function(a){return new q(a)},loadFile:function(a,b){var c=new XMLHttpRequest;c.open("GET",a),c.responseType="arraybuffer",c.onload=function(){b(null,new q(this.response))},c.onerror=function(a){b(a,null)},c.send()},TGA:q,VERSION:"0.3.1"};b.exports=r});
//# sourceMappingURL=libtga.min.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56), __webpack_require__(53)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(54);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _engine = __webpack_require__(31);

var _engine2 = _interopRequireDefault(_engine);

var _assetLoader = __webpack_require__(17);

var _assetLoader2 = _interopRequireDefault(_assetLoader);

var _drawable = __webpack_require__(9);

var _drawable2 = _interopRequireDefault(_drawable);

var _inventory = __webpack_require__(10);

var _inventory2 = _interopRequireDefault(_inventory);

var _world = __webpack_require__(11);

var _world2 = _interopRequireDefault(_world);

var _portalLink = __webpack_require__(28);

var _portalLink2 = _interopRequireDefault(_portalLink);

var _resonatorLink = __webpack_require__(18);

var _resonatorLink2 = _interopRequireDefault(_resonatorLink);

var _sphericalPortalLink = __webpack_require__(29);

var _sphericalPortalLink2 = _interopRequireDefault(_sphericalPortalLink);

var _atmosphere = __webpack_require__(26);

var _atmosphere2 = _interopRequireDefault(_atmosphere);

var _texturedSphere = __webpack_require__(30);

var _texturedSphere2 = _interopRequireDefault(_texturedSphere);

var _particlePortal = __webpack_require__(27);

var _particlePortal2 = _interopRequireDefault(_particlePortal);

var _inventory3 = __webpack_require__(19);

var _inventory4 = _interopRequireDefault(_inventory3);

var _portal = __webpack_require__(20);

var _portal2 = _interopRequireDefault(_portal);

var _orbitControls = __webpack_require__(32);

var _orbitControls2 = _interopRequireDefault(_orbitControls);

var _utils = __webpack_require__(8);

var _easing = __webpack_require__(16);

var _easing2 = _interopRequireDefault(_easing);

var _animation = __webpack_require__(15);

var _animation2 = _interopRequireDefault(_animation);

var _glMatrix = __webpack_require__(0);

var _glMatrix2 = _interopRequireDefault(_glMatrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IMV = {
  Constants: _constants2.default,
  Engine: _engine2.default,
  AssetLoader: _assetLoader2.default,
  Utilities: {
    resetGL: _utils.resetGL,
    setParams: _utils.setParams,
    disco: _utils.disco,
    generateArtifacts: _utils.generateArtifacts,
    makeArtifact: _utils.makeArtifact,
    Ease: _easing2.default,
    Animation: _animation2.default,
    GLMatrix: _glMatrix2.default
  },
  Drawables: {
    Inventory: _inventory2.default,
    World: _world2.default,
    ResonatorLink: _resonatorLink2.default,
    PortalLink: _portalLink2.default,
    SphericalPortalLink: _sphericalPortalLink2.default,
    Atmosphere: _atmosphere2.default,
    TexturedSphere: _texturedSphere2.default,
    ParticlePortal: _particlePortal2.default,
    Drawable: _drawable2.default
  },
  Entities: {
    World: {
      Portal: _portal2.default
    },
    Inventory: _inventory4.default
  },
  Controls: {
    Orbit: _orbitControls2.default
  },
  VERSION: '0.21.0'
};

exports.default = IMV;

/***/ })
/******/ ]);