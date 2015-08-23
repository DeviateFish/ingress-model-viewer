(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.IMV = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  if (typeof(exports) === 'undefined') {
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

},{}],2:[function(require,module,exports){
(function (global){
/*! java-deserializer 19-08-2015 */

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JavaDeserializer=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a("./stream-reader"),h=d(g),i=44269,j=5,k=112,l=113,m=114,n=116,o=117,p=119,q=120,r=8257536,s=function(){function a(b){e(this,a),this.buffer=b,this.stream=new h["default"](b),this.repr=null,this.refs=[],this._checkMagic()}return f(a,[{key:"_checkMagic",value:function(){if(this.stream.readUint16()!==i)throw"invalid magic number!";if(this.stream.readUint16()!==j)throw"invalid version!"}},{key:"_readClassDescription",value:function(){var a="BCDFIJSZ",b=this.stream.readUint8(),c={};if(b!==k){if(b===l){var d=this.stream.readUint32()-r;return this.refs[d]}if(b!==m)return void console.log("I don't know how to handle this type yet: "+b);c.name=this.stream.readUtf8String(),c.versionId=[this.stream.readUint32(),this.stream.readUint32()],c.handle=this.refs.length,c.flags=this.stream.readUint8();for(var e=[],f=this.stream.readUint16(),g=0;f>g;g++){var h={};h.type=this.stream.readUint8(),h.name=this.stream.readUtf8String(),-1===a.indexOf(String.fromCharCode(h.type))&&console.log("this is not a primitive type: "+h.type),e.push(h)}return c.fields=e,c.annotation=this.stream.readUint8(),c.annotation!==q&&console.log("I don't know what to do with this: "+c.annotation),c.superClass=this._readClassDescription(),this.refs.push(c),c}}},{key:"_readArray",value:function(){var a,b,c={},d=this._readClassDescription();c.description=d,c.handle=this.refs.length,b=this.stream.readUint32();var e=d.name;if("[F"===e)c.elements=this.stream.readFloat32Array(b);else if("[S"===e)c.elements=this.stream.readUint16Array(b);else for(c.elements=[],a=0;b>a;a++){var f=this._readChunk();c.elements.push(f)}return this.refs.push(c),c}},{key:"_readBlockData",value:function(){var a=this.stream.readUint8();return this.stream.readUint8Array(a)}},{key:"_readChunk",value:function(){var a=this.stream.readUint8(),b=null;switch(a){case o:b=this._readArray();break;case p:b=this._readBlockData();break;case n:b=this.stream.readUtf8String();break;default:console.log("unhandled type")}return b}},{key:"getContents",value:function(){if(this.repr)return this.repr;for(this.repr=[];this.stream.getPosition()<this.stream.getLength();)this.repr.push(this._readChunk());return this.repr}}]),a}();s.VERSION="0.2.0",c["default"]=s,b.exports=c["default"]},{"./stream-reader":2}],2:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(b){d(this,a),this.buffer=b,this.dataview=new DataView(b),this.currentOffset=0}return e(a,[{key:"getLength",value:function(){return this.dataview.byteLength}},{key:"getPosition",value:function(){return this.currentOffset}},{key:"readUint32",value:function(){var a=this.dataview.getUint32(this.currentOffset);return this.currentOffset+=4,a}},{key:"readUint16",value:function(){var a=this.dataview.getUint16(this.currentOffset);return this.currentOffset+=2,a}},{key:"readUint8",value:function(){var a=this.dataview.getUint8(this.currentOffset);return this.currentOffset++,a}},{key:"readInt32",value:function(){var a=this.dataview.getInt32(this.currentOffset);return this.currentOffset+=4,a}},{key:"readInt16",value:function(){var a=this.dataview.getInt16(this.currentOffset);return this.currentOffset+=2,a}},{key:"readInt8",value:function(){var a=this.dataview.getInt8(this.currentOffset);return this.currentOffset++,a}},{key:"readFloat32",value:function(){var a=this.dataview.getFloat32(this.currentOffset);return this.currentOffset+=4,a}},{key:"readUtf8String",value:function(){for(var a=this.readUint16(),b="",c=0;a>c;c++)b+=String.fromCharCode(this.readUint8());return b}},{key:"readFloat32Array",value:function(a){for(var b=new Float32Array(a),c=0;a>c;c++)b[c]=this.readFloat32();return b}},{key:"readUint16Array",value:function(a){for(var b=new Uint16Array(a),c=0;a>c;c++)b[c]=this.readUint16();return b}},{key:"readUint8Array",value:function(a){var b=new Uint8Array(this.buffer,this.currentOffset,a);return this.currentOffset+=a,b}}]),a}();c["default"]=f,b.exports=c["default"]},{}]},{},[1])(1)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
/*! libtga 13-08-2015 */

!function(a,b){if("function"==typeof define&&define.amd)define(["exports","module"],b);else if("undefined"!=typeof exports&&"undefined"!=typeof module)b(exports,module);else{var c={exports:{}};b(c.exports,c),a.libtga=c.exports}}(this,function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d=18,e=0,f=1,g=2,h=3,i=8,j=15,k=48,l=192,m=2,n=1,o=2,p=1,q=function s(a){c(this,s),this.dataview=new DataView(a),this.header=s.readHeader(this.dataview),this.width=this.header.imageSpec.width,this.height=this.header.imageSpec.height,this.compressed=!!(this.header.imageType&i),this.imageId=s.readImageId(this.dataview,this.header),this.colorMap=s.readColorMap(this.dataview,this.header),this.imageData=s.readImage(this)};q.HEADER_SIZE=d,q.IMAGE_TYPE_NONE=e,q.IMAGE_TYPE_COLORMAPPED=f,q.IMAGE_TYPE_TRUECOLOR=g,q.IMAGE_TYPE_GREYSCALE=h,q.IMAGE_RUNLENGTH_ENCODED=i,q.readHeader=function(a){var b={idLength:a.getUint8(0,!0),mapType:a.getUint8(1,!0),imageType:a.getUint8(2,!0),colorMapSpec:q.readColorMapSpec(a,3),imageSpec:q.readImageSpec(a,8)};return b},q.readColorMapSpec=function(a,b){var c=a.getUint8(b+4,!0),d={firstEntry:a.getUint16(b,!0),length:a.getUint16(b+2,!0),entrySizeBits:c,entrySizeBytes:Math.floor((c+7)/8)};return d},q.readImageSpec=function(a,b){var c=a.getUint8(b+9),d={xOrigin:a.getUint16(b,!0),yOrigin:a.getUint16(b+2,!0),width:a.getUint16(b+4,!0),height:a.getUint16(b+6,!0),pixelDepth:a.getUint8(b+8),descriptor:c,attributeBits:c&j,origin:(c&k)>>4,interleave:(c&l)>>6};return d},q.readImageId=function(a,b){return new Uint8Array(a.buffer,d,b.idLength)},q.readColorMap=function(a,b){if(b.colorMapSpec.length<=0)return null;var c=new Uint8ClampedArray(4*b.colorMapSpec.length),e=null,f=d+b.idLength;switch(b.colorMapSpec.entrySizeBits){case 8:e=q.readPixel8;break;case 16:e=q.readPixel15;break;case 15:e=q.readPixel16;break;case 24:e=q.readPixel24;break;case 32:e=q.readPixel32;break;default:throw"Unsupported pixel depth"}for(var g=0;g<b.colorMapSpec.length;g++)e(a,f,g,c,g);return c},q.readPixel8=function(a,b,c,d,e){var f=a.getUint8(b+c);d[4*e+2]=f,d[4*e+1]=f,d[4*e+0]=f,d[4*e+3]=255},q.readPixel15=function(a,b,c,d,e){var f=a.getUint16(b+2*c,!0);d[4*e+2]=(31&f)<<3,d[4*e+1]=(f>>5&31)<<3,d[4*e+0]=(f>>10&31)<<3,d[4*e+3]=255},q.readPixel16=function(a,b,c,d,e){var f=a.getUint16(b+2*c,!0);d[4*e+2]=(31&f)<<3,d[4*e+1]=(f>>5&31)<<3,d[4*e+0]=(f>>10&31)<<3,d[4*e+3]=128==(128&f)?255:0},q.readPixel24=function(a,b,c,d,e){d[4*e+2]=a.getUint8(b+3*c+0),d[4*e+1]=a.getUint8(b+3*c+1),d[4*e+0]=a.getUint8(b+3*c+2),d[4*e+3]=255},q.readPixel32=function(a,b,c,d,e){d[4*e+2]=a.getUint8(b+4*c+0),d[4*e+1]=a.getUint8(b+4*c+1),d[4*e+0]=a.getUint8(b+4*c+2),d[4*e+3]=255},q.readMappedPixel8=function(a,b,c,d,e,f,g){var h=a.getUint8(d+e)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel15=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel16=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel24=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel32=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readRLEImage=function(){throw"NYI"},q.readColormappedImage=function(a){var b=a.dataview,c=a.header,e=a.colorMap,f=c.imageSpec.width,g=c.imageSpec.height,h=new Uint8ClampedArray(f*g*4),i=c.imageSpec.pixelDepth,j=d+c.idLength+c.colorMapSpec.length*c.colorMapSpec.entrySizeBytes,k=c.colorMapSpec.firstEntry,l=null,r=(c.imageSpec.origin&m)===o?1:-1,s=(c.imageSpec.origin&n)===p?-1:1;if(!e)throw"Image is described as color-mapped, but has no map";switch(i){case 8:l=q.readMappedPixel8;break;case 16:l=q.readMappedPixel15;break;case 15:l=q.readMappedPixel16;break;case 24:l=q.readMappedPixel24;break;case 32:l=q.readMappedPixel32;break;default:throw"Unsupported pixel depth"}var t,u,v,w;r>0?(t=0,u=g):(t=g-1,u=-1),s>0?(v=0,w=f):(v=f-1,w=-1);for(var x,y=0,z=t;z!=u;z+=r){x=0;for(var A=v;A!=w;A+=s)l(b,e,k,j,z*f+A,h,y*f+x++);y++}return h},q.readTruecolorImage=function(a){var b=a.header,c=a.dataview,e=b.imageSpec.width,f=b.imageSpec.height,g=new Uint8ClampedArray(e*f*4),h=b.imageSpec.pixelDepth,i=d+b.idLength+b.colorMapSpec.length*b.colorMapSpec.entrySizeBytes,j=null,k=(b.imageSpec.origin&m)===o?1:-1,l=(b.imageSpec.origin&n)===p?-1:1;switch(h){case 8:j=q.readPixel8;break;case 16:j=q.readPixel15;break;case 15:j=q.readPixel16;break;case 24:j=q.readPixel24;break;case 32:j=q.readPixel32;break;default:throw"Unsupported pixel depth"}var r,s,t,u;k>0?(r=0,s=f):(r=f-1,s=-1),l>0?(t=0,u=e):(t=e-1,u=-1);for(var v,w=0,x=r;x!=s;x+=k){v=0;for(var y=t;y!=u;y+=l)j(c,i,x*e+y,g,w*e+v++);w++}return g},q.readImage=function(a){if(a.header.compressed)return q.readRLEImage(a);if(0===a.header.mapType)return q.readTruecolorImage(a);if(1===a.header.mapType)return q.readColormappedImage(a);throw"Unsupported map type"};var r={readFile:function(a){return new q(a)},loadFile:function(a,b){var c=new XMLHttpRequest;c.open("GET",a),c.responseType="arraybuffer",c.onload=function(){b(null,new q(this.response))},c.onerror=function(a){b(a,null)},c.send()},TGA:q,VERSION:"0.3.1"};b.exports=r});

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.loadResource = loadResource;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libtga = require('libtga');

var _libtga2 = _interopRequireDefault(_libtga);

function loadResource(url, type, callback) {
  if (type === 'image' || type === 'image.co') {
    if (/\.tga$/.test(url)) {
      _libtga2['default'].loadFile(url, function (err, tga) {
        if (err) {
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
        image.onload = function () {
          callback(null, this);
        };
        image.onerror = function (e) {
          callback(e, null);
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
        callback(null, this);
      };
      i.onerror = function (e) {
        callback(e, null);
      };
      i.src = url;
    }
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;
    xhr.onload = function () {
      callback(null, this.response);
    };
    xhr.onerror = function (e) {
      callback(e, null);
    };

    xhr.send();
  }
}

var AssetLoader = (function () {
  function AssetLoader() {
    _classCallCheck(this, AssetLoader);

    this._callbacks = {};
    this._assets = {};
  }

  _createClass(AssetLoader, [{
    key: 'loadAsset',
    value: function loadAsset(url, type, callback) {
      var _this = this;

      var name = '_' + encodeURIComponent(url);
      if (this._assets[name]) {
        callback(null, this._assets[name]);
        return;
      }
      this._callbacks[name] = this._callbacks[name] || [];
      this._callbacks[name].push(callback);
      if (!this._assets.hasOwnProperty(name)) {
        this._assets[name] = false;
        loadResource(url, type, function (err, value) {
          if (!err) {
            _this._assets[name] = value;
          }
          var cb;
          while (cb = _this._callbacks[name].shift()) {
            cb(err, value);
          }
        });
      }
    }
  }, {
    key: 'loadAssetGroup',
    value: function loadAssetGroup(urls, types, callback) {
      if (urls.length !== types.length) {
        throw 'Incompatible types: types.length = ' + types.length + '; urls.length = ' + urls.length;
      }
      var len = urls.length,
          results = new Array(len);
      var onEach = function onEach(idx, err, value) {
        if (err) {
          callback(err, null);
          return;
        }
        results[idx] = value;
        var i,
            r = true;
        for (i = 0; i < len; i++) {
          r = r && results[i];
        }
        if (r) {
          callback(null, results);
        }
      };
      for (var i = 0; i < urls.length; i++) {
        this.loadAsset(urls[i], types[i], onEach.bind(undefined, i));
      }
    }
  }, {
    key: 'getAsset',
    value: function getAsset(name) {
      return this._assets[name];
    }
  }]);

  return AssetLoader;
})();

exports['default'] = AssetLoader;
},{"libtga":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

var _assetLoader = require('./asset-loader');

var _assetLoader2 = _interopRequireDefault(_assetLoader);

var _meshFile = require('./mesh/file');

var _meshFile2 = _interopRequireDefault(_meshFile);

var _texture = require('./texture');

var _texture2 = _interopRequireDefault(_texture);

var _program = require('./program');

var _program2 = _interopRequireDefault(_program);

var _programGlowramp = require('./program/glowramp');

var _programGlowramp2 = _interopRequireDefault(_programGlowramp);

var _programOpaque = require('./program/opaque');

var _programOpaque2 = _interopRequireDefault(_programOpaque);

var _programs = {
  'Glowramp': _programGlowramp2['default'],
  'Opaque': _programOpaque2['default']
};

function areLoading(n, e) {
  if (e === 0) {
    n++;
  }
  return n;
}

function areLoaded(n, e) {
  if (e > 0) {
    n++;
  }
  return n;
}

function areError(n, e) {
  if (e < 0) {
    n++;
  }
  return n;
}

function summarize(queue) {
  return {
    total: queue.length,
    loading: queue.reduce(areLoading, 0),
    loaded: queue.reduce(areLoaded, 0),
    error: queue.reduce(areError, 0)
  };
}

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

var AssetManager = (function (_GLBound) {
  _inherits(AssetManager, _GLBound);

  function AssetManager(gl, manifest) {
    _classCallCheck(this, AssetManager);

    _get(Object.getPrototypeOf(AssetManager.prototype), 'constructor', this).call(this, gl);
    this.manifest = manifest;
    this.loader = new _assetLoader2['default']();
    this.textures = {};
    this.meshes = {};
    this.programs = {};
    this.queues = {
      texture: [],
      mesh: [],
      program: []
    };
    this.stats = {
      texture: {},
      mesh: {},
      program: {},
      rawProgram: {}
    };
    this.complete = null;
    this.path = '/assets/';
  }

  _createClass(AssetManager, [{
    key: '_isComplete',
    value: function _isComplete() {
      var status = this.getStatus();
      if (this.complete && status.texture.loading === 0 && status.mesh.loading === 0 && status.program.loading === 0) {
        this.complete();
      }
    }
  }, {
    key: 'addAssets',
    value: function addAssets(manifest) {
      this.manifest = mergeManifests(this.manifest, manifest);
    }
  }, {
    key: 'addTexture',
    value: function addTexture(name, texture) {
      this.textures[name] = texture;
    }
  }, {
    key: 'addMesh',
    value: function addMesh(name, mesh) {
      this.meshes[name] = mesh;
    }
  }, {
    key: 'addProgram',
    value: function addProgram(name, program) {
      this.programs[name] = program;
    }
  }, {
    key: 'handleTexture',
    value: function handleTexture(idx, name, info, err, value) {
      if (err) {
        this.queues.texture[idx] = -1;
        console.error(err);
        throw 'Could not load ' + name;
      }

      this.addTexture(name, new _texture2['default'](this._gl, info, value));
      this.queues.texture[idx] = 1;
      this._isComplete();
    }
  }, {
    key: 'handleMesh',
    value: function handleMesh(idx, name, info, err, value) {
      if (err) {
        this.queues.mesh[idx] = -1;
        console.error(err);
        throw 'Could not load ' + name;
      }

      this.addMesh(name, new _meshFile2['default'](this._gl, value));
      this.queues.mesh[idx] = 1;
      this._isComplete();
    }
  }, {
    key: 'createProgram',
    value: function createProgram(name, info) {
      var Klass = _program2['default'];
      if (info.program in _programs) {
        Klass = _programs[info.program];
      }
      this.addProgram(name, new Klass(this._gl, info.vertex, info.fragment));
    }
  }, {
    key: 'handleProgram',
    value: function handleProgram(idx, name, info, err, vals) {
      if (err) {
        this.queues.program[idx] = -1;
        console.error(err);
        throw 'Could not load ' + name;
      }

      var Klass = _program2['default'];
      if (info.program in _programs) {
        Klass = _programs[info.program];
      }
      this.addProgram(name, new Klass(this._gl, vals[0], vals[1]));
      this.queues.program[idx] = 1;
      this._isComplete();
    }
  }, {
    key: 'getTexture',
    value: function getTexture(name) {
      var texture = this.textures[name];
      if (texture) {
        this.stats.texture[name] = (this.stats.texture[name] || 0) + 1;
      }
      return texture;
    }
  }, {
    key: 'getMesh',
    value: function getMesh(name) {
      var mesh = this.meshes[name];
      if (mesh) {
        this.stats.mesh[name] = (this.stats.mesh[name] || 0) + 1;
      }
      return mesh;
    }
  }, {
    key: 'getProgram',
    value: function getProgram(name) {
      var prog = this.programs[name];
      if (prog) {
        if (this.stats.rawProgram.hasOwnProperty(name)) {
          this.stats.rawProgram[name]++;
        } else {
          this.stats.program[name] = (this.stats.program[name] || 0) + 1;
        }
      }
      return prog;
    }
  }, {
    key: 'loadAll',
    value: function loadAll(callback) {
      var i,
          asset,
          manifest = this.manifest;
      this.complete = callback;
      for (i in manifest.texture) {
        if (manifest.texture.hasOwnProperty(i) && !(i in this.textures)) {
          this.textures[i] = null;
          asset = manifest.texture[i];
          this.loader.loadAsset((!asset['static'] ? this.path : '') + asset.path, 'image', this.handleTexture.bind(this, this.queues.texture.length, i, asset));
          this.queues.texture.push(0);
        }
      }
      for (i in manifest.mesh) {
        if (manifest.mesh.hasOwnProperty(i) && !(i in this.meshes)) {
          this.meshes[i] = null;
          asset = manifest.mesh[i];
          this.loader.loadAsset((!asset['static'] ? this.path : '') + asset.path, 'arraybuffer', this.handleMesh.bind(this, this.queues.mesh.length, i, asset));
          this.queues.mesh.push(0);
        }
      }
      for (i in manifest.program) {
        if (manifest.program.hasOwnProperty(i) && !(i in this.programs)) {
          this.programs[i] = null;
          asset = manifest.program[i];
          this.loader.loadAssetGroup([(!asset['static'] ? this.path : '') + asset.vertex, (!asset['static'] ? this.path : '') + asset.fragment], ['text', 'text'], this.handleProgram.bind(this, this.queues.program.length, i, asset));
          this.queues.program.push(0);
        }
      }
      for (i in manifest.rawProgram) {
        if (manifest.rawProgram.hasOwnProperty(i) && !(i in this.programs)) {
          this.stats.rawProgram[i] = 0;
          this.createProgram(i, manifest.rawProgram[i]);
        }
      }

      return this.getStatus.bind(this);
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return {
        texture: summarize(this.queues.texture),
        mesh: summarize(this.queues.mesh),
        program: summarize(this.queues.program)
      };
    }
  }, {
    key: 'generateManifest',
    value: function generateManifest() {
      var manifest = {},
          keys = ['texture', 'mesh', 'rawProgram', 'program'];
      keys.forEach((function (section) {
        manifest[section] = {};
        for (var i in this.stats[section]) {
          if (this.stats[section].hasOwnProperty(i) && this.stats[section][i] > 0) {
            manifest[section][i] = this.manifest[section][i];
          }
        }
      }).bind(this));
      return manifest;
    }
  }]);

  return AssetManager;
})(_glBound2['default']);

exports['default'] = AssetManager;
module.exports = exports['default'];
},{"./asset-loader":4,"./gl-bound":27,"./mesh/file":33,"./program":39,"./program/glowramp":40,"./program/opaque":41,"./texture":44}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _glMatrix = require('gl-matrix');

var Constants = {
  teamColors: {
    RESISTANCE: _glMatrix.vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    ENLIGHTENED: _glMatrix.vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0),
    NEUTRAL: _glMatrix.vec4.fromValues(0.9764705882352941, 0.9764705882352941, 0.9764705882352941, 1.0),
    LOKI: _glMatrix.vec4.fromValues(1, 0.1568627450980392, 0.1568627450980392, 1.0)
  },
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
  anomalyColors: {
    1: _glMatrix.vec4.fromValues(1.0, 0.5686274509803921, 0.21176470588235294, 1.0),
    2: _glMatrix.vec4.fromValues(1.0, 0.3215686274509804, 0.9058823529411765, 1.0),
    3: _glMatrix.vec4.fromValues(0.6196078431372549, 0.35294117647058826, 1.0, 1.0),
    4: _glMatrix.vec4.fromValues(0.8431372549019608, 0.27058823529411763, 0.27058823529411763, 1.0),
    5: _glMatrix.vec4.fromValues(1.0, 0.9450980392156862, 0.0, 1.0),
    6: _glMatrix.vec4.fromValues(0.6509803921568628, 1.0, 0.9019607843137255, 1.0),
    7: _glMatrix.vec4.fromValues(0.5725490196078431, 0.5803921568627451, 0.592156862745098, 1.0)
  },
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
    }
  },
  xmColors: {
    coreGlow: _glMatrix.vec4.fromValues(0.92, 0.7, 0.89, 1.0),
    coreGlowAlt: _glMatrix.vec4.fromValues(0.6, 0.4, 0.6, 0.8),
    coreGlowAda: _glMatrix.vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    coreGlowJarvis: _glMatrix.vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0)
  },
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
      CapsuleXm: 'CapsuleXmMesh',
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
      SingleResonator: 'SingleResonatorMesh'
    }
  },
  Program: {
    Bicolored: 'bicolor_textured',
    Textured: 'textured',
    Glowramp: 'portal_scanner',
    Xm: 'xm',
    ShieldEffect: 'shield',
    Atmosphere: 'atmosphere',
    Link: 'LinkShader',
    SphericalLink: 'link3d'
  },
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
    ResonatorLink: 'ResonatorLinkTexture'
  }
};

exports['default'] = Constants;
module.exports = exports['default'];
},{"gl-matrix":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Drawable = (function () {
  function Drawable(programName) {
    _classCallCheck(this, Drawable);

    this.programName = programName;
    this.program = null;
    this.uniforms = {};
    this.drawfn = null;
    this.elapsed = 0;
    this.ready = false;
  }

  _createClass(Drawable, [{
    key: 'init',
    value: function init(manager) {
      this.program = manager.getProgram(this.programName);
      if (!this.program) {
        console.warn('missing program ' + this.programName);
        return false;
      }
      this.ready = true;
      return true;
    }
  }, {
    key: 'setDrawFn',
    value: function setDrawFn(fn) {
      this.drawfn = fn;
    }
  }, {
    key: 'draw',
    value: function draw() {
      if (!this.ready) {
        console.warn('drawable is not initialized');
        return false;
      }
      this.program.use(this.drawfn);
    }
  }, {
    key: 'setUniform',
    value: function setUniform(name, value) {
      this.uniforms[name] = value;
    }
  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      this.elapsed += delta;
      if (this.onUpdate) {
        return this.onUpdate(delta, this.elapsed);
      }
      return true;
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      // noop;
    }
  }]);

  return Drawable;
})();

exports['default'] = Drawable;
module.exports = exports['default'];
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _meshSphere = require('../mesh/sphere');

var _meshSphere2 = _interopRequireDefault(_meshSphere);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.Atmosphere;

// this program (atmosphere.glsl.vert and atmosphere.glsl.frag)
// is a modified version of the atmosphere program in
// https://github.com/dataarts/webgl-globe/blob/master/globe/globe.js

var AtmosphereDrawable = (function (_ModelDrawable) {
  _inherits(AtmosphereDrawable, _ModelDrawable);

  function AtmosphereDrawable(radius, vSlices, hSlices, scaleFactor) {
    _classCallCheck(this, AtmosphereDrawable);

    _get(Object.getPrototypeOf(AtmosphereDrawable.prototype), 'constructor', this).call(this, PROGRAM, null);
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
    this.uniforms.u_normalMatrix = _glMatrix.mat3.create();
    this.scaleFactor = scaleFactor || 1.1;
    _glMatrix.mat4.scale(this.local, this.local, [this.scaleFactor, this.scaleFactor, this.scaleFactor]);
  }

  _createClass(AtmosphereDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject) {
      _get(Object.getPrototypeOf(AtmosphereDrawable.prototype), 'updateView', this).call(this, viewProject);
      var invert = _glMatrix.mat4.invert(_glMatrix.mat4.create(), viewProject),
          transpose = _glMatrix.mat4.transpose(_glMatrix.mat4.create(), invert);
      this.uniforms.u_normalMatrix = _glMatrix.mat3.fromMat4(_glMatrix.mat3.create(), transpose);
    }
  }, {
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshSphere2['default'](manager._gl, this.radius, this.vSlices, this.hSlices);
      return _get(Object.getPrototypeOf(AtmosphereDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return AtmosphereDrawable;
})(_model2['default']);

exports['default'] = AtmosphereDrawable;
module.exports = exports['default'];
},{"../constants":6,"../mesh/sphere":36,"./model":14,"gl-matrix":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.Bicolored;

// default quality color: very rare
var defaultColor0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);

// default glow color: xm color
var defaultColor1 = _glMatrix.vec4.clone(_constants2['default'].xmColors.coreGlow);

var BicoloredDrawable = (function (_TexturedDrawable) {
  _inherits(BicoloredDrawable, _TexturedDrawable);

  function BicoloredDrawable(meshName, textureName) {
    _classCallCheck(this, BicoloredDrawable);

    _get(Object.getPrototypeOf(BicoloredDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_color0 = _glMatrix.vec4.clone(defaultColor0);
    this.uniforms.u_color1 = _glMatrix.vec4.clone(defaultColor1);
  }

  return BicoloredDrawable;
})(_textured2['default']);

exports['default'] = BicoloredDrawable;
module.exports = exports['default'];
},{"../constants":6,"./textured":20,"gl-matrix":1}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.Glowramp;

// default base color: neutral portal color
var defaultBaseColor = _glMatrix.vec4.clone(_constants2['default'].teamColors.NEUTRAL);

var GlowrampDrawable = (function (_TexturedDrawable) {
  _inherits(GlowrampDrawable, _TexturedDrawable);

  function GlowrampDrawable(meshName, textureName) {
    _classCallCheck(this, GlowrampDrawable);

    _get(Object.getPrototypeOf(GlowrampDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_baseColor = _glMatrix.vec4.clone(defaultBaseColor);
    this.uniforms.u_rotation = 0;
    this.uniforms.u_rampTarget = 0;
    this.uniforms.u_alpha = 0.6;
  }

  _createClass(GlowrampDrawable, [{
    key: 'updateTime',
    value: function updateTime(tick) {
      var ret = _get(Object.getPrototypeOf(GlowrampDrawable.prototype), 'updateTime', this).call(this, tick);
      var inc = this.elapsed / 5000;
      this.uniforms.u_rotation = inc;
      this.uniforms.u_rampTarget = Math.sin(Math.PI / 2 * (inc - Math.floor(inc)));
      this.uniforms.u_alpha = Math.sin(inc) * 0.05 + 0.75;
      return ret;
    }
  }]);

  return GlowrampDrawable;
})(_textured2['default']);

exports['default'] = GlowrampDrawable;
module.exports = exports['default'];
},{"../constants":6,"./textured":20,"gl-matrix":1}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _bicolored = require('./bicolored');

var _bicolored2 = _interopRequireDefault(_bicolored);

var _xm = require('./xm');

var _xm2 = _interopRequireDefault(_xm);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var Inventory = {};
var meshes = _constants2['default'].Mesh.Inventory;
var textures = _constants2['default'].Texture;

function createShell(name) {
  var itembase = (function (_BicoloredDrawable) {
    _inherits(itembase, _BicoloredDrawable);

    function itembase() {
      _classCallCheck(this, itembase);

      _get(Object.getPrototypeOf(itembase.prototype), 'constructor', this).call(this, meshes[name], textures.FlipCard);
    }

    return itembase;
  })(_bicolored2['default']);

  return itembase;
}

function createCore(name) {
  var xmbase = (function (_XmDrawable) {
    _inherits(xmbase, _XmDrawable);

    function xmbase() {
      _classCallCheck(this, xmbase);

      _get(Object.getPrototypeOf(xmbase.prototype), 'constructor', this).call(this, meshes[name], textures.Xm);
    }

    return xmbase;
  })(_xm2['default']);

  return xmbase;
}

function createMedia(name) {
  var media = (function (_TexturedDrawable) {
    _inherits(media, _TexturedDrawable);

    function media() {
      _classCallCheck(this, media);

      _get(Object.getPrototypeOf(media.prototype), 'constructor', this).call(this, _constants2['default'].Program.Textured, meshes[name], _constants2['default'].Texture.FlipCard);
    }

    return media;
  })(_textured2['default']);

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

exports['default'] = Inventory;
module.exports = exports['default'];
},{"../constants":6,"./bicolored":9,"./textured":20,"./xm":22}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

var LinkDrawable = (function (_TexturedDrawable) {
  _inherits(LinkDrawable, _TexturedDrawable);

  function LinkDrawable(programName, textureName) {
    _classCallCheck(this, LinkDrawable);

    _get(Object.getPrototypeOf(LinkDrawable.prototype), 'constructor', this).call(this, programName, null, textureName);
    this.uniforms.u_cameraFwd = _glMatrix.vec3.fromValues(0, 0, -1);
    this.uniforms.u_elapsedTime = 0;
  }

  // TODO: needs a camera class:
  _createClass(LinkDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject, view, project) {
      _get(Object.getPrototypeOf(LinkDrawable.prototype), 'updateView', this).call(this, viewProject, view, project);
      if (view) {
        var rot = _glMatrix.mat3.fromMat4(_glMatrix.mat3.create(), view);
        var q = _glMatrix.quat.fromMat3(_glMatrix.quat.create(), rot);
        var fwd = _glMatrix.vec3.transformQuat(_glMatrix.vec3.create(), _glMatrix.vec3.fromValues(0, 0, -1), q);
        _glMatrix.vec3.normalize(fwd, fwd);
        this.uniforms.u_cameraFwd = fwd;
      }
    }
  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(Object.getPrototypeOf(LinkDrawable.prototype), 'updateTime', this).call(this, delta);
      this.uniforms.u_elapsedTime = this.elapsed / 1000 % 300.0 * 0.1;
      return ret;
    }
  }]);

  return LinkDrawable;
})(_textured2['default']);

exports['default'] = LinkDrawable;
module.exports = exports['default'];
},{"./textured":20,"gl-matrix":1}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _drawable = require('../drawable');

var _drawable2 = _interopRequireDefault(_drawable);

function _draw(locations, uniforms) {
  for (var i in this.uniforms) {
    if (this.uniforms.hasOwnProperty(i) && i in uniforms) {
      uniforms[i](this.uniforms[i]);
    }
  }
  this.mesh.draw(locations);
}

var MeshDrawable = (function (_Drawable) {
  _inherits(MeshDrawable, _Drawable);

  function MeshDrawable(programName, meshName) {
    _classCallCheck(this, MeshDrawable);

    _get(Object.getPrototypeOf(MeshDrawable.prototype), 'constructor', this).call(this, programName);
    this.meshName = meshName;
    this.mesh = null;
    this.drawfn = _draw.bind(this);
  }

  _createClass(MeshDrawable, [{
    key: 'init',
    value: function init(manager) {
      if (this.meshName) {
        this.mesh = manager.getMesh(this.meshName);
        if (!this.mesh) {
          console.warn('missing mesh ' + this.meshName);
          return false;
        }
      }
      return _get(Object.getPrototypeOf(MeshDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return MeshDrawable;
})(_drawable2['default']);

exports['default'] = MeshDrawable;
module.exports = exports['default'];
},{"../drawable":7}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('./mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _glMatrix = require('gl-matrix');

var ModelDrawable = (function (_MeshDrawable) {
  _inherits(ModelDrawable, _MeshDrawable);

  function ModelDrawable(programName, meshName) {
    _classCallCheck(this, ModelDrawable);

    _get(Object.getPrototypeOf(ModelDrawable.prototype), 'constructor', this).call(this, programName, meshName);
    this.viewProject = _glMatrix.mat4.create();
    this.model = _glMatrix.mat4.create();
    this.local = _glMatrix.mat4.create();
    this.world = _glMatrix.mat4.create();
  }

  _createClass(ModelDrawable, [{
    key: 'updateMatrix',
    value: function updateMatrix() {
      var mvp = _glMatrix.mat4.create();
      _glMatrix.mat4.multiply(this.model, this.world, this.local);
      _glMatrix.mat4.multiply(mvp, this.viewProject, this.model);
      this.uniforms.u_modelViewProject = mvp;
    }
  }, {
    key: 'updateView',
    value: function updateView(viewProject) {
      this.viewProject = viewProject;
      this.updateMatrix();
    }
  }, {
    key: 'setMatrix',
    value: function setMatrix(mat) {
      this.model = mat;
      this.updateMatrix();
    }
  }]);

  return ModelDrawable;
})(_mesh2['default']);

exports['default'] = ModelDrawable;
module.exports = exports['default'];
},{"./mesh":13,"gl-matrix":1}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _meshPortalLink = require('../mesh/portal-link');

var _meshPortalLink2 = _interopRequireDefault(_meshPortalLink);

var PortalLinkDrawable = (function (_LinkDrawable) {
  _inherits(PortalLinkDrawable, _LinkDrawable);

  function PortalLinkDrawable(start, end, color, startPercent, endPercent) {
    _classCallCheck(this, PortalLinkDrawable);

    _get(Object.getPrototypeOf(PortalLinkDrawable.prototype), 'constructor', this).call(this, _constants2['default'].Program.Link, _constants2['default'].Texture.PortalLink);
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
  }

  _createClass(PortalLinkDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshPortalLink2['default'](manager._gl, this.start, this.end, this.color, this.startPercent, this.endPercent);
      return _get(Object.getPrototypeOf(PortalLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return PortalLinkDrawable;
})(_link2['default']);

exports['default'] = PortalLinkDrawable;
module.exports = exports['default'];
},{"../constants":6,"../mesh/portal-link":34,"./link":12}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _meshResonatorLink = require('../mesh/resonator-link');

var _meshResonatorLink2 = _interopRequireDefault(_meshResonatorLink);

var ResonatorLinkDrawable = (function (_LinkDrawable) {
  _inherits(ResonatorLinkDrawable, _LinkDrawable);

  function ResonatorLinkDrawable(portalPosition, slot, distance, color, resonatorPercent) {
    _classCallCheck(this, ResonatorLinkDrawable);

    _get(Object.getPrototypeOf(ResonatorLinkDrawable.prototype), 'constructor', this).call(this, _constants2['default'].Program.Link, _constants2['default'].Texture.ResonatorLink);
    this.portalPosition = portalPosition;
    this.slot = slot;
    this.distance = distance;
    this.color = color;
    this.resonatorPercent = resonatorPercent;
  }

  _createClass(ResonatorLinkDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshResonatorLink2['default'](manager._gl, this.portalPosition, this.slot, this.distance, this.color, this.resonatorPercent);
      return _get(Object.getPrototypeOf(ResonatorLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return ResonatorLinkDrawable;
})(_link2['default']);

exports['default'] = ResonatorLinkDrawable;
module.exports = exports['default'];
},{"../constants":6,"../mesh/resonator-link":35,"./link":12}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _bicolored = require('./bicolored');

var _bicolored2 = _interopRequireDefault(_bicolored);

var Resource = {};
var meshes = _constants2['default'].Mesh.Resource;

function createResource(name) {
  var itembase = (function (_BicoloredDrawable) {
    _inherits(itembase, _BicoloredDrawable);

    function itembase() {
      _classCallCheck(this, itembase);

      _get(Object.getPrototypeOf(itembase.prototype), 'constructor', this).call(this, meshes[name], _constants2['default'].Texture.FlipCard);
    }

    return itembase;
  })(_bicolored2['default']);

  return itembase;
}

for (var i in meshes) {
  Resource[name] = createResource(i);
}

exports['default'] = Resource;
module.exports = exports['default'];
},{"../constants":6,"./bicolored":9}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _meshSphericalPortalLink = require('../mesh/spherical-portal-link');

var _meshSphericalPortalLink2 = _interopRequireDefault(_meshSphericalPortalLink);

var SphericalPortalLinkDrawable = (function (_LinkDrawable) {
  _inherits(SphericalPortalLinkDrawable, _LinkDrawable);

  function SphericalPortalLinkDrawable(sphereRadius, start, end, color, startPercent, endPercent) {
    _classCallCheck(this, SphericalPortalLinkDrawable);

    _get(Object.getPrototypeOf(SphericalPortalLinkDrawable.prototype), 'constructor', this).call(this, _constants2['default'].Program.SphericalLink, _constants2['default'].Texture.PortalLink);
    this.radius = sphereRadius;
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
  }

  _createClass(SphericalPortalLinkDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshSphericalPortalLink2['default'](manager._gl, this.radius, this.start, this.end, this.color, this.startPercent, this.endPercent);
      return _get(Object.getPrototypeOf(SphericalPortalLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }, {
    key: 'updateView',
    value: function updateView(viewProject, view, project) {
      _get(Object.getPrototypeOf(SphericalPortalLinkDrawable.prototype), 'updateView', this).call(this, viewProject, view, project);
      this.uniforms.u_model = this.model;
    }
  }]);

  return SphericalPortalLinkDrawable;
})(_link2['default']);

exports['default'] = SphericalPortalLinkDrawable;
module.exports = exports['default'];
},{"../constants":6,"../mesh/spherical-portal-link":37,"./link":12}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _meshSphere = require('../mesh/sphere');

var _meshSphere2 = _interopRequireDefault(_meshSphere);

var PROGRAM = _constants2['default'].Program.Textured;

var TexturedSphereDrawable = (function (_TexturedDrawable) {
  _inherits(TexturedSphereDrawable, _TexturedDrawable);

  function TexturedSphereDrawable(textureName, radius, vSlices, hSlices) {
    _classCallCheck(this, TexturedSphereDrawable);

    _get(Object.getPrototypeOf(TexturedSphereDrawable.prototype), 'constructor', this).call(this, PROGRAM, null, textureName);
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
  }

  _createClass(TexturedSphereDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshSphere2['default'](manager._gl, this.radius, this.vSlices, this.hSlices);
      return _get(Object.getPrototypeOf(TexturedSphereDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return TexturedSphereDrawable;
})(_textured2['default']);

exports['default'] = TexturedSphereDrawable;
module.exports = exports['default'];
},{"../constants":6,"../mesh/sphere":36,"./textured":20}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var TexturedDrawable = (function (_ModelDrawable) {
  _inherits(TexturedDrawable, _ModelDrawable);

  function TexturedDrawable(programName, meshName, textureName) {
    _classCallCheck(this, TexturedDrawable);

    _get(Object.getPrototypeOf(TexturedDrawable.prototype), 'constructor', this).call(this, programName, meshName);
    this.textureName = textureName;
    this.texture = null;
  }

  _createClass(TexturedDrawable, [{
    key: 'draw',
    value: function draw() {
      this.texture.use(0);
      this.uniforms.u_texture = 0;
      _get(Object.getPrototypeOf(TexturedDrawable.prototype), 'draw', this).call(this);
    }
  }, {
    key: 'init',
    value: function init(manager) {
      if (this.textureName) {
        this.texture = manager.getTexture(this.textureName);
        if (!this.texture) {
          console.warn('missing texture ' + this.textureName);
          return false;
        }
      }
      return _get(Object.getPrototypeOf(TexturedDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return TexturedDrawable;
})(_model2['default']);

exports['default'] = TexturedDrawable;
module.exports = exports['default'];
},{"./model":14}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _glowramp = require('./glowramp');

var _glowramp2 = _interopRequireDefault(_glowramp);

var _bicolored = require('./bicolored');

var _bicolored2 = _interopRequireDefault(_bicolored);

var World = {};
var meshes = _constants2['default'].Mesh.World;
var textures = _constants2['default'].Texture;

function makeGlowramp(mesh, texture) {
  var glowrampbase = (function (_GlowrampDrawable) {
    _inherits(glowrampbase, _GlowrampDrawable);

    function glowrampbase() {
      _classCallCheck(this, glowrampbase);

      _get(Object.getPrototypeOf(glowrampbase.prototype), 'constructor', this).call(this, mesh, texture);
    }

    return glowrampbase;
  })(_glowramp2['default']);

  return glowrampbase;
}

function makeBicolored(mesh, texture) {
  var bicoloredbase = (function (_BicoloredDrawable) {
    _inherits(bicoloredbase, _BicoloredDrawable);

    function bicoloredbase() {
      _classCallCheck(this, bicoloredbase);

      _get(Object.getPrototypeOf(bicoloredbase.prototype), 'constructor', this).call(this, mesh, texture);
    }

    return bicoloredbase;
  })(_bicolored2['default']);

  return bicoloredbase;
}

World.Portal = makeGlowramp(meshes.Portal, textures.Glowramp);
World.Waypoint = makeGlowramp(meshes.Waypoint, textures.Waypoint);
World.ArtifactsRedGlow = makeGlowramp(meshes.ArtifactsRedGlow, textures.ColorGlow);
World.ArtifactsGreenGlow = makeGlowramp(meshes.ArtifactsGreenGlow, textures.ColorGlow);
World.ArtifactsPurpleGlow = makeGlowramp(meshes.ArtifactsPurpleGlow, textures.ColorGlow);
World.ArtifactsTargetGlow = makeGlowramp(meshes.ArtifactsTargetGlow, textures.TargetGlow);

World.Shield = makeBicolored(meshes.Shield, textures.ShieldEffect);
World.Resonator = makeBicolored(meshes.Resonator, textures.FlipCard);

exports['default'] = World;
module.exports = exports['default'];
},{"../constants":6,"./bicolored":9,"./glowramp":10}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.Xm;
var defaultTeamColor = _glMatrix.vec4.clone(_constants2['default'].xmColors.coreGlow);
var defaultAltColor = _glMatrix.vec4.clone(_constants2['default'].xmColors.coreGlowAlt);

var XmDrawable = (function (_TexturedDrawable) {
  _inherits(XmDrawable, _TexturedDrawable);

  function XmDrawable(meshName, textureName, teamColor) {
    _classCallCheck(this, XmDrawable);

    _get(Object.getPrototypeOf(XmDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_elapsedTime = 0;
    this.uniforms.u_teamColor = _glMatrix.vec4.clone(teamColor || defaultTeamColor);
    this.uniforms.u_altColor = _glMatrix.vec4.clone(defaultAltColor);
  }

  _createClass(XmDrawable, [{
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(Object.getPrototypeOf(XmDrawable.prototype), 'updateTime', this).call(this, delta);
      this.uniforms.u_elapsedTime = this.elapsed / 1000 % 300.0 * 0.1;
      return ret;
    }
  }]);

  return XmDrawable;
})(_textured2['default']);

exports['default'] = XmDrawable;
module.exports = exports['default'];
},{"../constants":6,"./textured":20,"gl-matrix":1}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assetManager = require('./asset-manager');

var _assetManager2 = _interopRequireDefault(_assetManager);

var _rendererObject = require('./renderer/object');

var _rendererObject2 = _interopRequireDefault(_rendererObject);

var _utils = require('./utils');

var _drawableWorld = require('./drawable/world');

var _drawableWorld2 = _interopRequireDefault(_drawableWorld);

var _drawableResource = require('./drawable/resource');

var _drawableResource2 = _interopRequireDefault(_drawableResource);

var _drawableInventory = require('./drawable/inventory');

var _drawableInventory2 = _interopRequireDefault(_drawableInventory);

var _entityInventory = require('./entity/inventory');

var _entityInventory2 = _interopRequireDefault(_entityInventory);

var _entityPortal = require('./entity/portal');

var _entityPortal2 = _interopRequireDefault(_entityPortal);

var _glMatrix = require('gl-matrix');

var Engine = (function () {
  function Engine(canvas, assets, enableSnapshots) {
    _classCallCheck(this, Engine);

    this.canvas = canvas;
    var opt = {};
    if (enableSnapshots) {
      opt.preserveDrawingBuffer = true;
    }
    var gl = canvas.getContext('webgl', opt) || canvas.getContext('experimental-webgl', opt);
    if (!gl) {
      throw 'Could not initialize webgl';
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl = gl;
    this.view = _glMatrix.mat4.create();
    _glMatrix.mat4.lookAt(this.view, [0.0, 20.0, 25.0], [0.0, 10.0, 0.0], [0.0, 1.0, 0.0]);

    // this should be in radians, not degrees.
    this.hFoV = Math.PI / 4;

    this.far = 100;
    this.project = _glMatrix.mat4.create();
    this.assetManager = new _assetManager2['default'](this.gl, assets);
    this.objectRenderer = new _rendererObject2['default'](this.gl, this.assetManager);
    this.resize(canvas.width, canvas.height);
    this.start = this.last = null;
    this.paused = false;
    this.cleared = false;
    this.frame = null;
  }

  _createClass(Engine, [{
    key: 'resize',
    value: function resize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.gl.viewport(0, 0, width, height);
      this.updateView();
    }
  }, {
    key: 'updateView',
    value: function updateView() {
      this.project = _glMatrix.mat4.create();
      _glMatrix.mat4.perspective(this.project, this.hFoV, this.canvas.width / this.canvas.height, 0.1, this.far);
      this.objectRenderer.updateView(this.view, this.project);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.paused = true;
      this.cleared = false;
      if (this.frame) {
        window.cancelAnimationFrame(this.frame);
      }
    }
  }, {
    key: 'demoEntities',
    value: function demoEntities() {
      var x = -5,
          y = 0,
          z = 4;
      var i, item;
      for (i in _entityInventory2['default']) {
        item = new _entityInventory2['default'][i](this);
        if (item) {
          item.translate(_glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          console.log('added ' + i);
        }
      }
      var portal = new _entityPortal2['default'](this);
      portal.translate(_glMatrix.vec3.fromValues(x, y, z));
    }
  }, {
    key: 'demo',
    value: function demo() {
      var x = -5,
          y = 0,
          z = 4;
      var i, item;
      for (i in _drawableInventory2['default']) {
        item = new _drawableInventory2['default'][i]();
        if (item) {
          _glMatrix.mat4.translate(item.world, item.world, _glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          this.objectRenderer.addDrawable(item);
          console.log('added ' + i);
        }
      }

      for (i in _drawableResource2['default']) {
        item = new _drawableResource2['default'][i]();
        if (item) {
          _glMatrix.mat4.translate(item.world, item.world, _glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          this.objectRenderer.addDrawable(item);
          console.log('added ' + i);
        }
      }

      for (i in _drawableWorld2['default']) {
        item = new _drawableWorld2['default'][i]();
        if (item) {
          _glMatrix.mat4.translate(item.world, item.world, _glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          this.objectRenderer.addDrawable(item);
          console.log('added ' + i);
        }
      }
    }
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
    }
  }, {
    key: 'render',
    value: function render(tick) {
      if (this.paused) {
        this.cleared = true;
        this.paused = false;
        return;
      }
      var delta = 0;
      if (!this.start) {
        this.start = tick;
        this.last = tick;
      } else {
        delta = tick - this.last;
        this.last = tick;
      }
      this.draw(delta);
      // queue up next frame:
      this.frame = window.requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: 'preload',
    value: function preload(callback) {
      this.assetManager.loadAll(callback);
    }
  }]);

  return Engine;
})();

exports['default'] = Engine;
module.exports = exports['default'];
},{"./asset-manager":5,"./drawable/inventory":11,"./drawable/resource":17,"./drawable/world":21,"./entity/inventory":25,"./entity/portal":26,"./renderer/object":43,"./utils":45,"gl-matrix":1}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _glMatrix = require('gl-matrix');

// TODO: Deprecate

var Entity = (function () {
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
        this.drawables[i].setMatrix(this.transform);
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
})();

exports['default'] = Entity;
module.exports = exports['default'];
},{"gl-matrix":1}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.createItemEntity = createItemEntity;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _entity = require('../entity');

var _entity2 = _interopRequireDefault(_entity);

var _drawableInventory = require('../drawable/inventory');

var _drawableInventory2 = _interopRequireDefault(_drawableInventory);

var _glMatrix = require('gl-matrix');

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
  var entitybase = (function (_Entity) {
    _inherits(entitybase, _Entity);

    function entitybase(engine) {
      _classCallCheck(this, entitybase);

      _get(Object.getPrototypeOf(entitybase.prototype), 'constructor', this).call(this, engine);
      this.addDrawable(name, new _drawableInventory2['default'][name]());
      this.addDrawable(name + 'Xm', new _drawableInventory2['default'][name + 'Xm']());
      this.drawables[name].uniforms.u_color0 = _glMatrix.vec4.clone(color);
    }

    return entitybase;
  })(_entity2['default']);

  return entitybase;
}

for (var i in simple) {
  InventoryItems[i] = createItemEntity(i, _constants2['default'].qualityColors[simple[i]]);
}

var FlipCardAda = (function (_Entity2) {
  _inherits(FlipCardAda, _Entity2);

  function FlipCardAda(engine) {
    _classCallCheck(this, FlipCardAda);

    _get(Object.getPrototypeOf(FlipCardAda.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('FlipCardAda', new _drawableInventory2['default'].FlipCardAda());
    this.addDrawable('FlipCardXm', new _drawableInventory2['default'].FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = _glMatrix.vec4.clone(_constants2['default'].teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color1 = _glMatrix.vec4.clone(_constants2['default'].teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);
  }

  return FlipCardAda;
})(_entity2['default']);

InventoryItems.FlipCardAda = FlipCardAda;

var FlipCardJarvis = (function (_Entity3) {
  _inherits(FlipCardJarvis, _Entity3);

  function FlipCardJarvis(engine) {
    _classCallCheck(this, FlipCardJarvis);

    _get(Object.getPrototypeOf(FlipCardJarvis.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('FlipCardJarvis', new _drawableInventory2['default'].FlipCardJarvis());
    this.addDrawable('FlipCardXm', new _drawableInventory2['default'].FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = _glMatrix.vec4.clone(_constants2['default'].teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color1 = _glMatrix.vec4.clone(_constants2['default'].teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);
  }

  return FlipCardJarvis;
})(_entity2['default']);

InventoryItems.FlipCardJarvis = FlipCardJarvis;

var ExtraShield = (function (_Entity4) {
  _inherits(ExtraShield, _Entity4);

  function ExtraShield(engine) {
    _classCallCheck(this, ExtraShield);

    _get(Object.getPrototypeOf(ExtraShield.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('ExtraShield', new _drawableInventory2['default'].ExtraShield());
    this.addDrawable('ResShieldXm', new _drawableInventory2['default'].ResShieldXm());
    this.drawables.ExtraShield.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);
  }

  return ExtraShield;
})(_entity2['default']);

InventoryItems.ExtraShield = ExtraShield;

var InterestCapsule = (function (_Entity5) {
  _inherits(InterestCapsule, _Entity5);

  function InterestCapsule(engine) {
    _classCallCheck(this, InterestCapsule);

    _get(Object.getPrototypeOf(InterestCapsule.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('InterestCapsule', new _drawableInventory2['default'].InterestCapsule());
    this.addDrawable('CapsuleXm', new _drawableInventory2['default'].CapsuleXm());
    this.drawables.InterestCapsule.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);
  }

  return InterestCapsule;
})(_entity2['default']);

InventoryItems.InterestCapsule = InterestCapsule;

exports['default'] = InventoryItems;
},{"../constants":6,"../drawable/inventory":11,"../entity":24,"gl-matrix":1}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _entity = require('../entity');

var _entity2 = _interopRequireDefault(_entity);

var _drawableWorld = require('../drawable/world');

var _drawableWorld2 = _interopRequireDefault(_drawableWorld);

var _drawableResonatorLink = require('../drawable/resonator-link');

var _drawableResonatorLink2 = _interopRequireDefault(_drawableResonatorLink);

var _glMatrix = require('gl-matrix');

var PortalEntity = (function (_Entity) {
  _inherits(PortalEntity, _Entity);

  function PortalEntity(engine) {
    _classCallCheck(this, PortalEntity);

    _get(Object.getPrototypeOf(PortalEntity.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('Portal', new _drawableWorld2['default'].Portal());
    // why 6? I dunno, ask Niantic
    _glMatrix.mat4.scale(this.drawables.Portal.local, this.drawables.Portal.local, _glMatrix.vec3.fromValues(6, 6, 6));
    this.setColor(_glMatrix.vec4.clone(_constants2['default'].teamColors.LOKI));
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
      if (!(level in _constants2['default'].qualityColors)) {
        throw new Error('level must be one of ' + Object.keys(_constants2['default'].qualityColors).join(' '));
      }
      range = range === undefined ? 40 : range;
      var resonatorName = 'Resonator' + +slot;
      var linkName = 'Link' + +slot;
      var theta = slot / 8 * 2 * Math.PI;
      var resonator = new _drawableWorld2['default'].Resonator();
      var x = range * Math.cos(theta);
      var y = range * Math.sin(theta);
      var link = new _drawableResonatorLink2['default']([0, 0], slot, range, _glMatrix.vec4.clone(this.color), 1.0);
      resonator.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors[level]);
      resonator.local = _glMatrix.mat4.clone(this.drawables.Portal.local);
      //link.local = mat4.clone(this.drawables.Portal.local);
      _glMatrix.mat4.translate(resonator.local, resonator.local, _glMatrix.vec3.fromValues(x / 6, 0, y / 6));
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
        this.addDrawable('Shield', new _drawableWorld2['default'].Shield());
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
        this.addDrawable(n, new _drawableWorld2['default'][n]());
      }
      this.drawables[n].uniforms.u_baseColor = _glMatrix.vec4.clone(color);
    }
  }]);

  return PortalEntity;
})(_entity2['default']);

exports['default'] = PortalEntity;
module.exports = exports['default'];
},{"../constants":6,"../drawable/resonator-link":16,"../drawable/world":21,"../entity":24,"gl-matrix":1}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLBound = function GLBound(gl) {
  _classCallCheck(this, GLBound);

  this._gl = gl;
};

exports["default"] = GLBound;
module.exports = exports["default"];
},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBuffer = require('./gl-buffer');

var _glBuffer2 = _interopRequireDefault(_glBuffer);

var GLAttribute = (function (_GLBuffer) {
  _inherits(GLAttribute, _GLBuffer);

  function GLAttribute(gl, attributes, values, usage) {
    _classCallCheck(this, GLAttribute);

    usage = usage || gl.STATIC_DRAW;
    _get(Object.getPrototypeOf(GLAttribute.prototype), 'constructor', this).call(this, gl, gl.ARRAY_BUFFER, usage);
    this.attributes = attributes;
    this.values = values;
    this.size = this.count = null;
    this._validate = false;
    this.size = 0;
    this.width = 0;
    for (var i = 0, a; i < this.attributes.length; i++) {
      a = this.attributes[i];
      this.size += 4 * a.size; // 4 because float is 4 bytes.
      this.width += a.size;
    }
    return this;
  }

  _createClass(GLAttribute, [{
    key: 'validate',
    value: function validate() {
      if (this._validate) {
        if (this.values.length % this.width !== 0) {
          console.warn('values array length is not an even multiple of the total size of the attributes');
        }
      }
    }
  }, {
    key: 'updateValues',
    value: function updateValues(values) {
      this.values = values;
      this.validate();
      return this.update();
    }
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
        if (!(a.name in locations)) {
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
    }
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
    }
  }]);

  return GLAttribute;
})(_glBuffer2['default']);

exports['default'] = GLAttribute;
module.exports = exports['default'];
},{"./gl-buffer":29}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('../gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

var GLBuffer = (function (_GLBound) {
  _inherits(GLBuffer, _GLBound);

  function GLBuffer(gl, target, usage) {
    _classCallCheck(this, GLBuffer);

    _get(Object.getPrototypeOf(GLBuffer.prototype), 'constructor', this).call(this, gl);
    this.target = target || gl.ARRAY_BUFFER; // probably shouldn't default this.
    this.usage = usage || gl.STATIC_DRAW;
    this.glBuf = null;
    this.values = null;
    return this;
  }

  _createClass(GLBuffer, [{
    key: 'bindBuffer',
    value: function bindBuffer() {
      if (!this.values) {
        console.warn('trying to update a buffer with no values.');
        return false;
      }
      if (!this.glBuf) {
        this.glBuf = this._gl.createBuffer();
      }
      this._gl.bindBuffer(this.target, this.glBuf);
      return this;
    }
  }, {
    key: 'unbindBuffer',
    value: function unbindBuffer() {
      // this._gl.bindBuffer(this.target, 0);  // apparently this makes webgl cranky
      return this;
    }
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

    // remove a chunk of a buffer
  }, {
    key: 'deleteWithin',
    value: function deleteWithin(start, end) {
      if (!this.values) {
        console.warn('Trying to splice a buffer that has no values.');
        return false;
      }
      var nValues = end - start;
      var empty = new this.values.constructor(nValues);
      this.values.set(this.values.subarray(end), start);
      this.values.set(empty, this.values.length - nValues);
      this.update();
      return this;
    }

    // do something to each element in a buffer
  }, {
    key: 'map',
    value: function map(callback, start, end) {
      start = start === undefined ? 0 : start;
      end = end === undefined ? this.values.length : end;
      for (var i = start; i < end; i++) {
        this.values[i] = callback(this.values[i], i);
      }
    }
  }, {
    key: 'updateBuffer',
    value: function updateBuffer(values) {
      this.values = values;
      return this.update();
    }
  }]);

  return GLBuffer;
})(_glBound2['default']);

exports['default'] = GLBuffer;
module.exports = exports['default'];
},{"../gl-bound":27}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBuffer = require('./gl-buffer');

var _glBuffer2 = _interopRequireDefault(_glBuffer);

var GLIndex = (function (_GLBuffer) {
  _inherits(GLIndex, _GLBuffer);

  function GLIndex(gl, values, drawMode, usage) {
    _classCallCheck(this, GLIndex);

    usage = usage || gl.STATIC_DRAW;
    _get(Object.getPrototypeOf(GLIndex.prototype), 'constructor', this).call(this, gl, gl.ELEMENT_ARRAY_BUFFER, usage);
    this.mode = drawMode;
    this.values = values;
    this.count = null;
    return this;
  }

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
})(_glBuffer2['default']);

exports['default'] = GLIndex;
module.exports = exports['default'];
},{"./gl-buffer":29}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

var _assetLoader = require('./asset-loader');

var _drawableInventory = require('./drawable/inventory');

var _drawableInventory2 = _interopRequireDefault(_drawableInventory);

var _drawableWorld = require('./drawable/world');

var _drawableWorld2 = _interopRequireDefault(_drawableWorld);

var _drawablePortalLink = require('./drawable/portal-link');

var _drawablePortalLink2 = _interopRequireDefault(_drawablePortalLink);

var _drawableResonatorLink = require('./drawable/resonator-link');

var _drawableResonatorLink2 = _interopRequireDefault(_drawableResonatorLink);

var _drawableSphericalPortalLink = require('./drawable/spherical-portal-link');

var _drawableSphericalPortalLink2 = _interopRequireDefault(_drawableSphericalPortalLink);

var _drawableAtmosphere = require('./drawable/atmosphere');

var _drawableAtmosphere2 = _interopRequireDefault(_drawableAtmosphere);

var _drawableTexturedSphere = require('./drawable/textured-sphere');

var _drawableTexturedSphere2 = _interopRequireDefault(_drawableTexturedSphere);

var _entityInventory = require('./entity/inventory');

var _entityInventory2 = _interopRequireDefault(_entityInventory);

var _entityPortal = require('./entity/portal');

var _entityPortal2 = _interopRequireDefault(_entityPortal);

var _orbitControls = require('./orbit-controls');

var _orbitControls2 = _interopRequireDefault(_orbitControls);

var _utils = require('./utils');

exports['default'] = {
  Constants: _constants2['default'],
  Engine: _engine2['default'],
  Utilities: {
    loadResource: _assetLoader.loadResource,
    resetGL: _utils.resetGL,
    setParams: _utils.setParams,
    disco: _utils.disco,
    generateArtifacts: _utils.generateArtifacts
  },
  Drawables: {
    Inventory: _drawableInventory2['default'],
    World: _drawableWorld2['default'],
    ResonatorLink: _drawableResonatorLink2['default'],
    PortalLink: _drawablePortalLink2['default'],
    SphericalPortalLink: _drawableSphericalPortalLink2['default'],
    Atmosphere: _drawableAtmosphere2['default'],
    TexturedSphere: _drawableTexturedSphere2['default']
  },
  Entities: {
    World: {
      Portal: _entityPortal2['default']
    },
    Inventory: _entityInventory2['default']
  },
  Controls: {
    Orbit: _orbitControls2['default']
  },
  VERSION: '0.18.0'
};
module.exports = exports['default'];
},{"./asset-loader":4,"./constants":6,"./drawable/atmosphere":8,"./drawable/inventory":11,"./drawable/portal-link":15,"./drawable/resonator-link":16,"./drawable/spherical-portal-link":18,"./drawable/textured-sphere":19,"./drawable/world":21,"./engine":23,"./entity/inventory":25,"./entity/portal":26,"./orbit-controls":38,"./utils":45}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

var MODE_TRIANGLES = 'triangles';
var MODE_LINES = 'lines';

var Mesh = (function (_GLBound) {
  _inherits(Mesh, _GLBound);

  function Mesh(gl, attributes, faces, lines) {
    _classCallCheck(this, Mesh);

    _get(Object.getPrototypeOf(Mesh.prototype), 'constructor', this).call(this, gl);
    this.attributes = attributes;
    this.faces = faces;
    this.lines = lines;
    this.mode = MODE_TRIANGLES;
    this.bounds = null;
    this.center = null;
  }

  _createClass(Mesh, [{
    key: 'draw',
    value: function draw(locations) {
      this.attributes.draw(locations);
      if (this.mode === MODE_TRIANGLES) {
        this.faces.draw();
      } else if (this.mode === MODE_LINES) {
        this.lines.draw();
      }
    }
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
          if (Array.prototype.reduce.call(arr, function (s, a) {
            return s + a;
          }, 0) === 0) {
            return;
          }
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
          if (Array.prototype.reduce.call(arr, function (s, a) {
            return s + a;
          }, 0) === 0) {
            return;
          }
          count++;
          if (sum) {
            sum = sum.map(function (e, i) {
              return e + arr[i];
            });
          } else {
            sum = Array.prototype.slice.call(arr);
          }
        });
        sum.map(function (e) {
          return e / count;
        });
        this.center = sum;
      }
      return this.center;
    }
  }, {
    key: 'boundingBoxCenter',
    value: function boundingBoxCenter(coordAttribute) {
      if (!this.bounds) {
        this.boundingBox(coordAttribute);
      }
      return this.bounds.max.map((function (e, i) {
        return (e - this.bounds.min[i]) / 2;
      }).bind(this));
    }
  }]);

  return Mesh;
})(_glBound2['default']);

Mesh.MODE_LINES = MODE_LINES;
Mesh.MODE_TRIANGLES = MODE_TRIANGLES;

exports['default'] = Mesh;
module.exports = exports['default'];
},{"./gl-bound":27}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _javaDeserializer = require('java-deserializer');

var _javaDeserializer2 = _interopRequireDefault(_javaDeserializer);

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
    if (type != 0x01 && type != 0x10) {
      console.warn('unknown type ' + type);
    }
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
    attributes.push(new _vertexAttribute2['default'](name, size));
  }
  return attributes;
}

var FileMesh = (function (_Mesh) {
  _inherits(FileMesh, _Mesh);

  function FileMesh(gl, arraybuf) {
    _classCallCheck(this, FileMesh);

    var jd = new _javaDeserializer2['default'](arraybuf);
    var blocks = jd.getContents();

    // should be Float32Array
    var values = blocks[0].elements;

    // should be ArrayBuffer
    var attributeData = blocks[3];

    // array of VertexAttributes
    var spec = parseAttributes(attributeData);

    // should be Uint16Array
    var faces = new _glGlIndex2['default'](gl, blocks[1].elements, gl.TRIANGLES);
    var attributes = new _glGlAttribute2['default'](gl, spec, values);

    // should be Uint16Array
    var lines = new _glGlIndex2['default'](gl, blocks[2].elements, gl.LINES);

    _get(Object.getPrototypeOf(FileMesh.prototype), 'constructor', this).call(this, gl, attributes, faces, lines);
  }

  return FileMesh;
})(_mesh2['default']);

exports['default'] = FileMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":28,"../gl/gl-index":30,"../mesh":32,"../vertex-attribute":46,"java-deserializer":2}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _glMatrix = require('gl-matrix');

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

var PortalLinkMesh = (function (_Mesh) {
  _inherits(PortalLinkMesh, _Mesh);

  function PortalLinkMesh(gl, start, end, color, startPercent, endPercent) {
    _classCallCheck(this, PortalLinkMesh);

    var buf = _generateLinkAttributes(start, end, color, startPercent, endPercent);
    var ind = _generateFaces(0);
    var attributes = [];
    attributes.push(new _vertexAttribute2['default']('a_position', 4));
    attributes.push(new _vertexAttribute2['default']('a_texCoord0', 4));
    attributes.push(new _vertexAttribute2['default']('a_color', 4));
    var attribute = new _glGlAttribute2['default'](gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new _glGlIndex2['default'](gl, ind, gl.TRIANGLES);
    _get(Object.getPrototypeOf(PortalLinkMesh.prototype), 'constructor', this).call(this, gl, attribute, faces);
  }

  return PortalLinkMesh;
})(_mesh2['default']);

exports['default'] = PortalLinkMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":28,"../gl/gl-index":30,"../mesh":32,"../vertex-attribute":46,"gl-matrix":1}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _glMatrix = require('gl-matrix');

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

var ResonatorLinkMesh = (function (_Mesh) {
  _inherits(ResonatorLinkMesh, _Mesh);

  function ResonatorLinkMesh(gl, portalPosition, slot, distance, color, resonatorPercent) {
    _classCallCheck(this, ResonatorLinkMesh);

    var theta = slot / 8 * 2 * Math.PI;
    var end = _glMatrix.vec2.create();
    var relative = _glMatrix.vec2.fromValues(distance * Math.cos(theta), distance * Math.sin(theta));
    _glMatrix.vec2.add(end, portalPosition, relative);
    var buf = _generateLinkAttributes(portalPosition, end, color, resonatorPercent);
    var ind = _generateFaces(0);
    var attributes = [];
    attributes.push(new _vertexAttribute2['default']('a_position', 4));
    attributes.push(new _vertexAttribute2['default']('a_texCoord0', 4));
    attributes.push(new _vertexAttribute2['default']('a_color', 4));
    var attribute = new _glGlAttribute2['default'](gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new _glGlIndex2['default'](gl, ind, gl.TRIANGLES);
    _get(Object.getPrototypeOf(ResonatorLinkMesh.prototype), 'constructor', this).call(this, gl, attribute, faces);
  }

  return ResonatorLinkMesh;
})(_mesh2['default']);

exports['default'] = ResonatorLinkMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":28,"../gl/gl-index":30,"../mesh":32,"../vertex-attribute":46,"gl-matrix":1}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _glMatrix = require('gl-matrix');

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
  attributes.push(new _vertexAttribute2['default']('a_position', 3));
  attributes.push(new _vertexAttribute2['default']('a_texCoord0', 2));
  attributes.push(new _vertexAttribute2['default']('a_normal', 3));
  return {
    values: values,
    faces: faces,
    attributes: attributes
  };
}

var SphereMesh = (function (_Mesh) {
  _inherits(SphereMesh, _Mesh);

  function SphereMesh(gl, radius, vSlices, hSlices) {
    _classCallCheck(this, SphereMesh);

    var parsed = createSphere(radius, vSlices, hSlices);
    var attributes = new _glGlAttribute2['default'](gl, parsed.attributes, parsed.values);
    var faces = new _glGlIndex2['default'](gl, parsed.faces, gl.TRIANGLES);
    _get(Object.getPrototypeOf(SphereMesh.prototype), 'constructor', this).call(this, gl, attributes, faces);
  }

  return SphereMesh;
})(_mesh2['default']);

exports['default'] = SphereMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":28,"../gl/gl-index":30,"../mesh":32,"../vertex-attribute":46,"gl-matrix":1}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _glMatrix = require('gl-matrix');

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

var SphericalPortalLinkMesh = (function (_Mesh) {
  _inherits(SphericalPortalLinkMesh, _Mesh);

  function SphericalPortalLinkMesh(gl, sphereRadius, start, end, color, startPercent, endPercent) {
    _classCallCheck(this, SphericalPortalLinkMesh);

    var buf = _generateLinkAttributes(sphereRadius, start, end, color, startPercent, endPercent);
    var len = buf.length,
        segments = Math.floor(len / _chunkSize / 6);
    var ind = _generateFaces(0, segments);
    var attributes = [];
    attributes.push(new _vertexAttribute2['default']('a_position', 4));
    attributes.push(new _vertexAttribute2['default']('a_texCoord0', 2));
    attributes.push(new _vertexAttribute2['default']('a_normal', 3));
    attributes.push(new _vertexAttribute2['default']('a_color', 4));
    var attribute = new _glGlAttribute2['default'](gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new _glGlIndex2['default'](gl, ind, gl.TRIANGLES);
    _get(Object.getPrototypeOf(SphericalPortalLinkMesh.prototype), 'constructor', this).call(this, gl, attribute, faces);
    return this;
  }

  return SphericalPortalLinkMesh;
})(_mesh2['default']);

exports['default'] = SphericalPortalLinkMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":28,"../gl/gl-index":30,"../mesh":32,"../vertex-attribute":46,"gl-matrix":1}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var _glMatrix = require('gl-matrix');

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

var OrbitControls = (function () {
  function OrbitControls(canvas, distance, options) {
    _classCallCheck(this, OrbitControls);

    options = options || {};
    this.canvas = canvas;
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
    this.mouse = { x: 0, y: 0 };
    this.mouseOnDown = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0 };
    this.target = { x: Math.PI * 3 / 2, y: Math.PI / 6.0 };
    this.targetOnDown = { x: 0, y: 0 };
    this.overRenderer = false;
    this.mouseMove = this.onMouseMove.bind(this);
    this.mouseUp = this.onMouseUp.bind(this);
    this.mouseOut = this.onMouseOut.bind(this);
    this.mouseDown = this.onMouseDown.bind(this);
    this.mouseWheel = this.onMouseWheel.bind(this);

    this.touches = [];
    this.touchDelta = 0;
    this.touchMove = this.onTouchMove.bind(this);
    this.touchEnd = this.onTouchEnd.bind(this);
    this.touchLeave = this.onTouchLeave.bind(this);
    this.touchStart = this.onTouchStart.bind(this);
    this.mouseOver = (function () {
      this.overRenderer = true;
    }).bind(this);
    this.mouseOut = (function () {
      this.overRenderer = false;
    }).bind(this);
    this.enabled = false;
  }

  _createClass(OrbitControls, [{
    key: 'disable',
    value: function disable() {
      this.canvas.removeEventListener('mousedown', this.mouseDown, false);
      this.canvas.removeEventListener('mousemove', this.mouseMove, false);
      this.canvas.removeEventListener('mouseup', this.mouseUp, false);
      this.canvas.removeEventListener('mouseout', this.mouseOut, false);
      this.canvas.removeEventListener('touchstart', this.touchStart, false);
      this.canvas.removeEventListener('touchmove', this.touchMove, false);
      this.canvas.removeEventListener('touchend', this.touchEnd, false);
      this.canvas.removeEventListener('touchleave', this.touchLeave, false);
      this.canvas.removeEventListener('mousewheel', this.mouseWheel, false);
      this.canvas.removeEventListener('mouseover', this.mouseOver, false);
      this.canvas.removeEventListener('mouseout', this.mouseOut, false);
      this.enabled = false;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
      if (this.options.allowZoom) {
        this.canvas.addEventListener('mousewheel', this.mouseWheel, false);
      }
      this.canvas.addEventListener('touchstart', this.touchStart, false);
      this.canvas.addEventListener('mouseover', this.mouseOver, false);
      this.canvas.addEventListener('mouseout', this.mouseOut, false);
      this.enabled = true;
    }
  }, {
    key: 'updateTargets',
    value: function updateTargets() {
      var scale = this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance);
      var zoomDamp = scale / this.options.zoomDamp;

      this.target.x = this.targetOnDown.x + (this.mouse.x - this.mouseOnDown.x) * 0.005 * zoomDamp;
      this.target.y = this.targetOnDown.y + (this.mouse.y - this.mouseOnDown.y) * 0.005 * zoomDamp;

      this.target.y = this.target.y > PI_HALF ? PI_HALF : this.target.y;
      this.target.y = this.target.y < -PI_HALF ? -PI_HALF : this.target.y;
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(ev) {
      ev.preventDefault();
      this.canvas.addEventListener('mousemove', this.mouseMove, false);
      this.canvas.addEventListener('mouseup', this.mouseUp, false);
      this.canvas.addEventListener('mouseout', this.mouseOut, false);

      this.mouseOnDown.x = -ev.clientX;
      this.mouseOnDown.y = ev.clientY;
      this.targetOnDown.x = this.target.x;
      this.targetOnDown.y = this.target.y;

      this.canvas.style.cursor = 'move';
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(ev) {
      this.mouse.x = -ev.clientX;
      this.mouse.y = ev.clientY;
      this.updateTargets();
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(ev) {
      this.onMouseOut(ev);
      this.canvas.style.cursor = 'auto';
    }
  }, {
    key: 'onMouseOut',
    value: function onMouseOut() {
      this.canvas.removeEventListener('mousemove', this.mouseMove, false);
      this.canvas.removeEventListener('mouseup', this.mouseUp, false);
      this.canvas.removeEventListener('mouseout', this.mouseOut, false);
    }
  }, {
    key: 'updateView',
    value: function updateView(view) {
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

        _glMatrix.mat4.lookAt(view, cameraPosition, this.options.target, [0, 1, 0]);
      }
    }
  }, {
    key: 'onMouseWheel',
    value: function onMouseWheel(ev) {
      if (this.overRenderer) {
        this.zoom(ev.wheelDeltaY * this.options.wheelScale * (this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance)));
      }
      return true;
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(ev) {
      ev.preventDefault();
      if (this.touches.length === 0) {
        this.canvas.addEventListener('touchmove', this.touchMove, false);
        this.canvas.addEventListener('touchend', this.touchEnd, false);
        this.canvas.addEventListener('touchleave', this.touchLeave, false);
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

      this.canvas.style.cursor = 'move';
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(ev) {
      var changed = ev.changedTouches,
          l = changed.length;
      for (var i = 0; i < l; i++) {
        var idx = getTouchIndex(this.touches, changed[i]);
        if (idx >= 0) {
          this.touches.splice(idx, 1, cloneTouch(changed[i]));
        } else {
          console.log('could not find event ', changed[i]);
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
        this.zoom((newDelta - this.touchDelta) * this.options.touchScale);
        this.touchDelta = newDelta;
      }
    }
  }, {
    key: 'removeTouches',
    value: function removeTouches(ev) {
      var changed = ev.changedTouches,
          l = changed.length;
      for (var i = 0; i < l; i++) {
        var idx = getTouchIndex(this.touches, changed[i]);
        if (idx >= 0) {
          this.touches.splice(idx, 1);
        }
      }
      if (this.touches.length === 0) {
        this.canvas.removeEventListener('touchmove', this.touchMove, false);
        this.canvas.removeEventListener('touchend', this.touchEnd, false);
        this.canvas.removeEventListener('touchleave', this.touchLeave, false);
      } else if (this.touches.length === 1) {
        this.mouseOnDown.x = -this.touches[0].x;
        this.mouseOnDown.y = this.touches[0].y;

        this.targetOnDown.x = this.target.x;
        this.targetOnDown.y = this.target.y;
      }
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(ev) {
      this.removeTouches(ev);
      this.canvas.style.cursor = 'auto';
    }
  }, {
    key: 'onTouchLeave',
    value: function onTouchLeave(ev) {
      this.removeTouches(ev);
    }

    //?
  }, {
    key: 'onTouchCancel',
    value: function onTouchCancel(ev) {
      this.removeTouches(ev);
    }
  }, {
    key: 'zoom',
    value: function zoom(delta) {
      this.distanceTarget -= delta;
      this.distanceTarget = Math.min(this.distanceTarget, this.options.distanceMax);
      this.distanceTarget = Math.max(this.distanceTarget, this.options.distanceMin);
    }
  }]);

  return OrbitControls;
})();

exports['default'] = OrbitControls;
module.exports = exports['default'];
},{"./utils":45,"gl-matrix":1}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

function fixPrecision(shader) {
  if (/precision mediump float/g.test(shader)) {
    return shader;
  } else {
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
    glFunction = function () {
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

  // FIXME: Unreachable code
  throw "Unknown type: " + type;
}

var Program = (function (_GLBound) {
  _inherits(Program, _GLBound);

  function Program(gl, vertex, fragment) {
    _classCallCheck(this, Program);

    _get(Object.getPrototypeOf(Program.prototype), "constructor", this).call(this, gl);
    this.program = null;
    this.vertexSource = fixPrecision(vertex);
    this.fragmentSource = fragment;
    this.attributes = {};
    this.uniforms = {};
  }

  _createClass(Program, [{
    key: "setupLocations",
    value: function setupLocations() {
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
  }, {
    key: "init",
    value: function init() {
      var gl = this._gl,
          vertex,
          fragment;
      vertex = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertex, this.vertexSource);
      gl.compileShader(vertex);
      if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(vertex));
        console.error('could not compile vertex shader: ' + this.vertexSource);
        throw 'Vertex shader compile error!';
      }
      fragment = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragment, this.fragmentSource);
      gl.compileShader(fragment);
      if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(fragment));
        console.error('could not compile fragment shader: ' + this.fragmentSource);
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

      this.setupLocations();

      //gl.useProgram(0);
    }
  }, {
    key: "use",
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
  }]);

  return Program;
})(_glBound2["default"]);

exports["default"] = Program;
module.exports = exports["default"];
},{"./gl-bound":27}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _program = require('../program');

var _program2 = _interopRequireDefault(_program);

var _utils = require('../utils');

var GlowrampProgram = (function (_Program) {
  _inherits(GlowrampProgram, _Program);

  function GlowrampProgram(gl, vertex, fragment) {
    _classCallCheck(this, GlowrampProgram);

    _get(Object.getPrototypeOf(GlowrampProgram.prototype), 'constructor', this).call(this, gl, vertex, fragment);
  }

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
})(_program2['default']);

exports['default'] = GlowrampProgram;
module.exports = exports['default'];
},{"../program":39,"../utils":45}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _program = require('../program');

var _program2 = _interopRequireDefault(_program);

var _utils = require('../utils');

var OpaqueProgram = (function (_Program) {
  _inherits(OpaqueProgram, _Program);

  function OpaqueProgram(gl, vertex, fragment) {
    _classCallCheck(this, OpaqueProgram);

    _get(Object.getPrototypeOf(OpaqueProgram.prototype), 'constructor', this).call(this, gl, vertex, fragment);
  }

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
})(_program2['default']);

exports['default'] = OpaqueProgram;
module.exports = exports['default'];
},{"../program":39,"../utils":45}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

var _glMatrix = require('gl-matrix');

var Renderer = (function (_GLBound) {
  _inherits(Renderer, _GLBound);

  function Renderer(gl, manager) {
    _classCallCheck(this, Renderer);

    _get(Object.getPrototypeOf(Renderer.prototype), 'constructor', this).call(this, gl);
    this.manager = manager;
    this.viewProject = _glMatrix.mat4.create();
    this.view = _glMatrix.mat4.create();
    this.project = _glMatrix.mat4.create();
    this.elapsed = 0;
  }

  _createClass(Renderer, [{
    key: 'updateView',
    value: function updateView(view, project) {
      this.view = view;
      this.project = project;
      _glMatrix.mat4.multiply(this.viewProject, project, view);
    }
  }, {
    key: 'render',
    value: function render() {
      console.warn("base class renders nothing.");
    }
  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      this.elapsed += delta;
    }
  }]);

  return Renderer;
})(_glBound2['default']);

exports['default'] = Renderer;
module.exports = exports['default'];
},{"./gl-bound":27,"gl-matrix":1}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _renderer = require('../renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _drawable = require('../drawable');

var _drawable2 = _interopRequireDefault(_drawable);

var ObjectRenderer = (function (_Renderer) {
  _inherits(ObjectRenderer, _Renderer);

  function ObjectRenderer(gl, manager) {
    _classCallCheck(this, ObjectRenderer);

    _get(Object.getPrototypeOf(ObjectRenderer.prototype), 'constructor', this).call(this, gl, manager);
    this.drawables = [];
  }

  _createClass(ObjectRenderer, [{
    key: 'addDrawable',
    value: function addDrawable(drawable) {
      if (!drawable instanceof _drawable2['default']) {
        throw 'Drawables must always inherit from the base Drawable';
      }
      if (!drawable.init(this.manager)) {
        console.warn('could not initialize drawable: ', drawable);
        return false;
      }
      if (drawable.updateView) {
        drawable.updateView(this.viewProject, this.view, this.project);
      }
      this.drawables.push(drawable);
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
    value: function updateView(view, project) {
      _get(Object.getPrototypeOf(ObjectRenderer.prototype), 'updateView', this).call(this, view, project);
      var i,
          len = this.drawables.length;
      for (i = 0; i < len; i++) {
        if (this.drawables[i].updateView) {
          this.drawables[i].updateView(this.viewProject, view, project);
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
      _get(Object.getPrototypeOf(ObjectRenderer.prototype), 'updateTime', this).call(this, delta);
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
})(_renderer2['default']);

exports['default'] = ObjectRenderer;
module.exports = exports['default'];
},{"../drawable":7,"../renderer":42}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

var Texture = (function (_GLBound) {
  _inherits(Texture, _GLBound);

  function Texture(gl, info, image) {
    _classCallCheck(this, Texture);

    _get(Object.getPrototypeOf(Texture.prototype), 'constructor', this).call(this, gl);
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
    if (/MipMap/.test(info.minFilter)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);

    this.texture = texture;
  }

  _createClass(Texture, [{
    key: 'use',
    value: function use(index) {
      var gl = this._gl;
      index = index || 0;
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.activeTexture(gl.TEXTURE0 + index);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      // TODO: Figure out when this should be called.
      // noop;
    }
  }]);

  return Texture;
})(_glBound2['default']);

exports['default'] = Texture;
module.exports = exports['default'];
},{"./gl-bound":27}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.resetGL = resetGL;
exports.setParams = setParams;
exports.disco = disco;
exports.generateArtifacts = generateArtifacts;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _drawableTextured = require('./drawable/textured');

var _drawableTextured2 = _interopRequireDefault(_drawableTextured);

// base state.

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

function setParams(base, opts, deep) {
  for (var i in base) {
    if (base.hasOwnProperty(i) && opts.hasOwnProperty(i)) {
      if (deep && typeof base[i] == 'object' && typeof opts[i] == 'object') {
        base[i] = setParams(base[i], opts[i], deep);
      } else {
        base[i] = opts[i];
      }
    }
  }
  return base;
}

function disco(delta, elapsed) {
  var inc = elapsed / 1000;
  this.uniforms.u_baseColor[0] = Math.sin(inc);
  this.uniforms.u_baseColor[1] = Math.sin(inc + 2 * Math.PI / 3);
  this.uniforms.u_baseColor[2] = Math.sin(inc + 4 * Math.PI / 3);
  return true;
}

function makeArtifact(meshName, textureName) {
  var artifact = (function (_TexturedDrawable) {
    _inherits(artifact, _TexturedDrawable);

    function artifact() {
      _classCallCheck(this, artifact);

      _get(Object.getPrototypeOf(artifact.prototype), 'constructor', this).call(this, _constants2['default'].Program.Textured, meshName, textureName);
    }

    return artifact;
  })(_drawableTextured2['default']);

  return artifact;
}

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
},{"./constants":6,"./drawable/textured":20}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VertexAttribute = function VertexAttribute(name, size) {
  _classCallCheck(this, VertexAttribute);

  this.name = name;
  this.size = size;
};

exports["default"] = VertexAttribute;
module.exports = exports["default"];
},{}]},{},[31])(31)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0cml4L2Rpc3QvZ2wtbWF0cml4LmpzIiwibm9kZV9tb2R1bGVzL2phdmEtZGVzZXJpYWxpemVyL2Rpc3QvamF2YS1kZXNlcmlhbGl6ZXIubWluLmpzIiwibm9kZV9tb2R1bGVzL2xpYnRnYS9kaXN0L2xpYnRnYS5taW4uanMiLCJzcmMvYXNzZXQtbG9hZGVyLmpzIiwic3JjL2Fzc2V0LW1hbmFnZXIuanMiLCJzcmMvY29uc3RhbnRzLmpzIiwic3JjL2RyYXdhYmxlLmpzIiwic3JjL2RyYXdhYmxlL2F0bW9zcGhlcmUuanMiLCJzcmMvZHJhd2FibGUvYmljb2xvcmVkLmpzIiwic3JjL2RyYXdhYmxlL2dsb3dyYW1wLmpzIiwic3JjL2RyYXdhYmxlL2ludmVudG9yeS5qcyIsInNyYy9kcmF3YWJsZS9saW5rLmpzIiwic3JjL2RyYXdhYmxlL21lc2guanMiLCJzcmMvZHJhd2FibGUvbW9kZWwuanMiLCJzcmMvZHJhd2FibGUvcG9ydGFsLWxpbmsuanMiLCJzcmMvZHJhd2FibGUvcmVzb25hdG9yLWxpbmsuanMiLCJzcmMvZHJhd2FibGUvcmVzb3VyY2UuanMiLCJzcmMvZHJhd2FibGUvc3BoZXJpY2FsLXBvcnRhbC1saW5rLmpzIiwic3JjL2RyYXdhYmxlL3RleHR1cmVkLXNwaGVyZS5qcyIsInNyYy9kcmF3YWJsZS90ZXh0dXJlZC5qcyIsInNyYy9kcmF3YWJsZS93b3JsZC5qcyIsInNyYy9kcmF3YWJsZS94bS5qcyIsInNyYy9lbmdpbmUuanMiLCJzcmMvZW50aXR5LmpzIiwic3JjL2VudGl0eS9pbnZlbnRvcnkuanMiLCJzcmMvZW50aXR5L3BvcnRhbC5qcyIsInNyYy9nbC1ib3VuZC5qcyIsInNyYy9nbC9nbC1hdHRyaWJ1dGUuanMiLCJzcmMvZ2wvZ2wtYnVmZmVyLmpzIiwic3JjL2dsL2dsLWluZGV4LmpzIiwic3JjL2luZ3Jlc3MtbW9kZWwtdmlld2VyLmpzIiwic3JjL21lc2guanMiLCJzcmMvbWVzaC9maWxlLmpzIiwic3JjL21lc2gvcG9ydGFsLWxpbmsuanMiLCJzcmMvbWVzaC9yZXNvbmF0b3ItbGluay5qcyIsInNyYy9tZXNoL3NwaGVyZS5qcyIsInNyYy9tZXNoL3NwaGVyaWNhbC1wb3J0YWwtbGluay5qcyIsInNyYy9vcmJpdC1jb250cm9scy5qcyIsInNyYy9wcm9ncmFtLmpzIiwic3JjL3Byb2dyYW0vZ2xvd3JhbXAuanMiLCJzcmMvcHJvZ3JhbS9vcGFxdWUuanMiLCJzcmMvcmVuZGVyZXIuanMiLCJzcmMvcmVuZGVyZXIvb2JqZWN0LmpzIiwic3JjL3RleHR1cmUuanMiLCJzcmMvdXRpbHMuanMiLCJzcmMvdmVydGV4LWF0dHJpYnV0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4cElBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGZpbGVvdmVydmlldyBnbC1tYXRyaXggLSBIaWdoIHBlcmZvcm1hbmNlIG1hdHJpeCBhbmQgdmVjdG9yIG9wZXJhdGlvbnNcbiAqIEBhdXRob3IgQnJhbmRvbiBKb25lc1xuICogQGF1dGhvciBDb2xpbiBNYWNLZW56aWUgSVZcbiAqIEB2ZXJzaW9uIDIuMi4xXG4gKi9cblxuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cblxuKGZ1bmN0aW9uKF9nbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIHNoaW0gPSB7fTtcbiAgaWYgKHR5cGVvZihleHBvcnRzKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZih0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgc2hpbS5leHBvcnRzID0ge307XG4gICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzaGltLmV4cG9ydHM7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZ2wtbWF0cml4IGxpdmVzIGluIGEgYnJvd3NlciwgZGVmaW5lIGl0cyBuYW1lc3BhY2VzIGluIGdsb2JhbFxuICAgICAgc2hpbS5leHBvcnRzID0gdHlwZW9mKHdpbmRvdykgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogX2dsb2JhbDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gZ2wtbWF0cml4IGxpdmVzIGluIGNvbW1vbmpzLCBkZWZpbmUgaXRzIG5hbWVzcGFjZXMgaW4gZXhwb3J0c1xuICAgIHNoaW0uZXhwb3J0cyA9IGV4cG9ydHM7XG4gIH1cblxuICAoZnVuY3Rpb24oZXhwb3J0cykge1xuICAgIC8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cblxuaWYoIUdMTUFUX0VQU0lMT04pIHtcbiAgICB2YXIgR0xNQVRfRVBTSUxPTiA9IDAuMDAwMDAxO1xufVxuXG5pZighR0xNQVRfQVJSQVlfVFlQRSkge1xuICAgIHZhciBHTE1BVF9BUlJBWV9UWVBFID0gKHR5cGVvZiBGbG9hdDMyQXJyYXkgIT09ICd1bmRlZmluZWQnKSA/IEZsb2F0MzJBcnJheSA6IEFycmF5O1xufVxuXG5pZighR0xNQVRfUkFORE9NKSB7XG4gICAgdmFyIEdMTUFUX1JBTkRPTSA9IE1hdGgucmFuZG9tO1xufVxuXG4vKipcbiAqIEBjbGFzcyBDb21tb24gdXRpbGl0aWVzXG4gKiBAbmFtZSBnbE1hdHJpeFxuICovXG52YXIgZ2xNYXRyaXggPSB7fTtcblxuLyoqXG4gKiBTZXRzIHRoZSB0eXBlIG9mIGFycmF5IHVzZWQgd2hlbiBjcmVhdGluZyBuZXcgdmVjdG9ycyBhbmQgbWF0cmljaWVzXG4gKlxuICogQHBhcmFtIHtUeXBlfSB0eXBlIEFycmF5IHR5cGUsIHN1Y2ggYXMgRmxvYXQzMkFycmF5IG9yIEFycmF5XG4gKi9cbmdsTWF0cml4LnNldE1hdHJpeEFycmF5VHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICBHTE1BVF9BUlJBWV9UWVBFID0gdHlwZTtcbn1cblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMuZ2xNYXRyaXggPSBnbE1hdHJpeDtcbn1cblxudmFyIGRlZ3JlZSA9IE1hdGguUEkgLyAxODA7XG5cbi8qKlxuKiBDb252ZXJ0IERlZ3JlZSBUbyBSYWRpYW5cbipcbiogQHBhcmFtIHtOdW1iZXJ9IEFuZ2xlIGluIERlZ3JlZXNcbiovXG5nbE1hdHJpeC50b1JhZGlhbiA9IGZ1bmN0aW9uKGEpe1xuICAgICByZXR1cm4gYSAqIGRlZ3JlZTtcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDIgRGltZW5zaW9uYWwgVmVjdG9yXG4gKiBAbmFtZSB2ZWMyXG4gKi9cblxudmFyIHZlYzIgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMyXG4gKlxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG52ZWMyLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgyKTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG52ZWMyLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgyKTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG52ZWMyLmZyb21WYWx1ZXMgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMiB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnNldCA9IGZ1bmN0aW9uKG91dCwgeCwgeSkge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5zdWIgPSB2ZWMyLnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLm11bCA9IHZlYzIubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5kaXYgPSB2ZWMyLmRpdmlkZTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubWluID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm1heCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzIgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjMidzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc2NhbGVBbmRBZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpO1xuICAgIG91dFsxXSA9IGFbMV0gKyAoYlsxXSAqIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMi5kaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5kaXN0ID0gdmVjMi5kaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzIuc3F1YXJlZERpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgICByZXR1cm4geCp4ICsgeSp5O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3F1YXJlZERpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuc3FyRGlzdCA9IHZlYzIuc3F1YXJlZERpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cbnZlYzIubGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLmxlbiA9IHZlYzIubGVuZ3RoO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbnZlYzIuc3F1YXJlZExlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICByZXR1cm4geCp4ICsgeSp5O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLnNxckxlbiA9IHZlYzIuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm5lZ2F0ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5ub3JtYWxpemUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIHZhciBsZW4gPSB4KnggKyB5Knk7XG4gICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgLy9UT0RPOiBldmFsdWF0ZSB1c2Ugb2YgZ2xtX2ludnNxcnQgaGVyZT9cbiAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICAgICAgICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cbnZlYzIuZG90ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXTtcbn07XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdHdvIHZlYzInc1xuICogTm90ZSB0aGF0IHRoZSBjcm9zcyBwcm9kdWN0IG11c3QgYnkgZGVmaW5pdGlvbiBwcm9kdWNlIGEgM0QgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMyLmNyb3NzID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgdmFyIHogPSBhWzBdICogYlsxXSAtIGFbMV0gKiBiWzBdO1xuICAgIG91dFswXSA9IG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5sZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnJhbmRvbSA9IGZ1bmN0aW9uIChvdXQsIHNjYWxlKSB7XG4gICAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG4gICAgdmFyIHIgPSBHTE1BVF9SQU5ET00oKSAqIDIuMCAqIE1hdGguUEk7XG4gICAgb3V0WzBdID0gTWF0aC5jb3MocikgKiBzY2FsZTtcbiAgICBvdXRbMV0gPSBNYXRoLnNpbihyKSAqIHNjYWxlO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDJ9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIudHJhbnNmb3JtTWF0MiA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDJkXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQyZH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQyZCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeSArIG1bNF07XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeSArIG1bNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0M1xuICogM3JkIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDN9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIudHJhbnNmb3JtTWF0MyA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgb3V0WzBdID0gbVswXSAqIHggKyBtWzNdICogeSArIG1bNl07XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzRdICogeSArIG1bN107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0NFxuICogM3JkIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMCdcbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnRyYW5zZm9ybU1hdDQgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVsxMl07XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bMTNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMycy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMyLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjMnMgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuZm9yRWFjaCA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdmVjID0gdmVjMi5jcmVhdGUoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICAgICAgdmFyIGksIGw7XG4gICAgICAgIGlmKCFzdHJpZGUpIHtcbiAgICAgICAgICAgIHN0cmlkZSA9IDI7XG4gICAgICAgIH1cblxuICAgICAgICBpZighb2Zmc2V0KSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihjb3VudCkge1xuICAgICAgICAgICAgbCA9IE1hdGgubWluKChjb3VudCAqIHN0cmlkZSkgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgICAgIHZlY1swXSA9IGFbaV07IHZlY1sxXSA9IGFbaSsxXTtcbiAgICAgICAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgICAgICAgYVtpXSA9IHZlY1swXTsgYVtpKzFdID0gdmVjWzFdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMyfSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xudmVjMi5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAndmVjMignICsgYVswXSArICcsICcgKyBhWzFdICsgJyknO1xufTtcblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMudmVjMiA9IHZlYzI7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyAzIERpbWVuc2lvbmFsIFZlY3RvclxuICogQG5hbWUgdmVjM1xuICovXG5cbnZhciB2ZWMzID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjM1xuICpcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xudmVjMy5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMyk7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG52ZWMzLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgzKTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG52ZWMzLmZyb21WYWx1ZXMgPSBmdW5jdGlvbih4LCB5LCB6KSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDMpO1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMzIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc2V0ID0gZnVuY3Rpb24ob3V0LCB4LCB5LCB6KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnN1YnRyYWN0ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMuc3ViID0gdmVjMy5zdWJ0cmFjdDtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubXVsdGlwbHkgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICogYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5tdWwgPSB2ZWMzLm11bHRpcGx5O1xuXG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5kaXZpZGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC8gYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGl2aWRlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMuZGl2ID0gdmVjMy5kaXZpZGU7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm1pbiA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5tYXggPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgYSB2ZWMzIGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzMncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnNjYWxlQW5kQWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyAoYlswXSAqIHNjYWxlKTtcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSk7XG4gICAgb3V0WzJdID0gYVsyXSArIChiWzJdICogc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWMzLmRpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmRpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMuZGlzdCA9IHZlYzMuZGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWMzLnNxdWFyZWREaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgICAgIHogPSBiWzJdIC0gYVsyXTtcbiAgICByZXR1cm4geCp4ICsgeSp5ICsgeip6O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3F1YXJlZERpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMuc3FyRGlzdCA9IHZlYzMuc3F1YXJlZERpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cbnZlYzMubGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeik7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5sZW4gPSB2ZWMzLmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG52ZWMzLnNxdWFyZWRMZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIHJldHVybiB4KnggKyB5KnkgKyB6Kno7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMuc3FyTGVuID0gdmVjMy5zcXVhcmVkTGVuZ3RoO1xuXG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubmVnYXRlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIHZhciBsZW4gPSB4KnggKyB5KnkgKyB6Kno7XG4gICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgLy9UT0RPOiBldmFsdWF0ZSB1c2Ugb2YgZ2xtX2ludnNxcnQgaGVyZT9cbiAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICAgICAgICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICogbGVuO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cbnZlYzMuZG90ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdO1xufTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmNyb3NzID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sXG4gICAgICAgIGJ4ID0gYlswXSwgYnkgPSBiWzFdLCBieiA9IGJbMl07XG5cbiAgICBvdXRbMF0gPSBheSAqIGJ6IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheiAqIGJ4IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheCAqIGJ5IC0gYXkgKiBieDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5sZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdO1xuICAgIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMucmFuZG9tID0gZnVuY3Rpb24gKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcblxuICAgIHZhciByID0gR0xNQVRfUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICAgIHZhciB6ID0gKEdMTUFUX1JBTkRPTSgpICogMi4wKSAtIDEuMDtcbiAgICB2YXIgelNjYWxlID0gTWF0aC5zcXJ0KDEuMC16KnopICogc2NhbGU7XG5cbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHpTY2FsZTtcbiAgICBvdXRbMV0gPSBNYXRoLnNpbihyKSAqIHpTY2FsZTtcbiAgICBvdXRbMl0gPSB6ICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0NC5cbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnRyYW5zZm9ybU1hdDQgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXTtcbiAgICBvdXRbMl0gPSBtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6ICsgbVsxNF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0My5cbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gdGhlIDN4MyBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy50cmFuc2Zvcm1NYXQzID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl07XG4gICAgb3V0WzBdID0geCAqIG1bMF0gKyB5ICogbVszXSArIHogKiBtWzZdO1xuICAgIG91dFsxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyB6ICogbVs3XTtcbiAgICBvdXRbMl0gPSB4ICogbVsyXSArIHkgKiBtWzVdICsgeiAqIG1bOF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7cXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMudHJhbnNmb3JtUXVhdCA9IGZ1bmN0aW9uKG91dCwgYSwgcSkge1xuICAgIC8vIGJlbmNobWFya3M6IGh0dHA6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tdHJhbnNmb3JtLXZlYzMtaW1wbGVtZW50YXRpb25zXG5cbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5LFxuICAgICAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICAgICAgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHgsXG4gICAgICAgIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5O1xuICAgIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXo7XG4gICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLypcbiogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgeC1heGlzXG4qIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4qIEBwYXJhbSB7dmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiogQHJldHVybnMge3ZlYzN9IG91dFxuKi9cbnZlYzMucm90YXRlWCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgYyl7XG4gICB2YXIgcCA9IFtdLCByPVtdO1xuXHQgIC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblx0ICBwWzBdID0gYVswXSAtIGJbMF07XG5cdCAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcblxuXHQgIC8vcGVyZm9ybSByb3RhdGlvblxuXHQgIHJbMF0gPSBwWzBdO1xuXHQgIHJbMV0gPSBwWzFdKk1hdGguY29zKGMpIC0gcFsyXSpNYXRoLnNpbihjKTtcblx0ICByWzJdID0gcFsxXSpNYXRoLnNpbihjKSArIHBbMl0qTWF0aC5jb3MoYyk7XG5cblx0ICAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cdCAgb3V0WzBdID0gclswXSArIGJbMF07XG5cdCAgb3V0WzFdID0gclsxXSArIGJbMV07XG5cdCAgb3V0WzJdID0gclsyXSArIGJbMl07XG5cbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLypcbiogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgeS1heGlzXG4qIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4qIEBwYXJhbSB7dmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiogQHJldHVybnMge3ZlYzN9IG91dFxuKi9cbnZlYzMucm90YXRlWSA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgYyl7XG4gIFx0dmFyIHAgPSBbXSwgcj1bXTtcbiAgXHQvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gIFx0cFswXSA9IGFbMF0gLSBiWzBdO1xuICBcdHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgXHRwWzJdID0gYVsyXSAtIGJbMl07XG4gIFxuICBcdC8vcGVyZm9ybSByb3RhdGlvblxuICBcdHJbMF0gPSBwWzJdKk1hdGguc2luKGMpICsgcFswXSpNYXRoLmNvcyhjKTtcbiAgXHRyWzFdID0gcFsxXTtcbiAgXHRyWzJdID0gcFsyXSpNYXRoLmNvcyhjKSAtIHBbMF0qTWF0aC5zaW4oYyk7XG4gIFxuICBcdC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgXHRvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgXHRvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgXHRvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgXG4gIFx0cmV0dXJuIG91dDtcbn07XG5cbi8qXG4qIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHotYXhpc1xuKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uXG4qIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiovXG52ZWMzLnJvdGF0ZVogPSBmdW5jdGlvbihvdXQsIGEsIGIsIGMpe1xuICBcdHZhciBwID0gW10sIHI9W107XG4gIFx0Ly9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuICBcdHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgXHRwWzFdID0gYVsxXSAtIGJbMV07XG4gIFx0cFsyXSA9IGFbMl0gLSBiWzJdO1xuICBcbiAgXHQvL3BlcmZvcm0gcm90YXRpb25cbiAgXHRyWzBdID0gcFswXSpNYXRoLmNvcyhjKSAtIHBbMV0qTWF0aC5zaW4oYyk7XG4gIFx0clsxXSA9IHBbMF0qTWF0aC5zaW4oYykgKyBwWzFdKk1hdGguY29zKGMpO1xuICBcdHJbMl0gPSBwWzJdO1xuICBcbiAgXHQvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG4gIFx0b3V0WzBdID0gclswXSArIGJbMF07XG4gIFx0b3V0WzFdID0gclsxXSArIGJbMV07XG4gIFx0b3V0WzJdID0gclsyXSArIGJbMl07XG4gIFxuICBcdHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMzcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMzLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjM3MgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMuZm9yRWFjaCA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdmVjID0gdmVjMy5jcmVhdGUoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICAgICAgdmFyIGksIGw7XG4gICAgICAgIGlmKCFzdHJpZGUpIHtcbiAgICAgICAgICAgIHN0cmlkZSA9IDM7XG4gICAgICAgIH1cblxuICAgICAgICBpZighb2Zmc2V0KSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihjb3VudCkge1xuICAgICAgICAgICAgbCA9IE1hdGgubWluKChjb3VudCAqIHN0cmlkZSkgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgICAgIHZlY1swXSA9IGFbaV07IHZlY1sxXSA9IGFbaSsxXTsgdmVjWzJdID0gYVtpKzJdO1xuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgICAgICBhW2ldID0gdmVjWzBdOyBhW2krMV0gPSB2ZWNbMV07IGFbaSsyXSA9IHZlY1syXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjM30gdmVjIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKi9cbnZlYzMuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ3ZlYzMoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJyknO1xufTtcblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMudmVjMyA9IHZlYzM7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyA0IERpbWVuc2lvbmFsIFZlY3RvclxuICogQG5hbWUgdmVjNFxuICovXG5cbnZhciB2ZWM0ID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjNFxuICpcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cbnZlYzQuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWM0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cbnZlYzQuZnJvbVZhbHVlcyA9IGZ1bmN0aW9uKHgsIHksIHosIHcpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gdztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjNCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnNldCA9IGZ1bmN0aW9uKG91dCwgeCwgeSwgeiwgdykge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IHc7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnN1YnRyYWN0ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuc3ViID0gdmVjNC5zdWJ0cmFjdDtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubXVsdGlwbHkgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICogYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICogYlszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5tdWwgPSB2ZWM0Lm11bHRpcGx5O1xuXG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5kaXZpZGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC8gYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdIC8gYlszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuZGl2aWRlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuZGl2ID0gdmVjNC5kaXZpZGU7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm1pbiA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pO1xuICAgIG91dFszXSA9IE1hdGgubWluKGFbM10sIGJbM10pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5tYXggPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgICBvdXRbM10gPSBNYXRoLm1heChhWzNdLCBiWzNdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgYSB2ZWM0IGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzQncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnNjYWxlQW5kQWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyAoYlswXSAqIHNjYWxlKTtcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSk7XG4gICAgb3V0WzJdID0gYVsyXSArIChiWzJdICogc2NhbGUpO1xuICAgIG91dFszXSA9IGFbM10gKyAoYlszXSAqIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjNC5kaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgICAgIHogPSBiWzJdIC0gYVsyXSxcbiAgICAgICAgdyA9IGJbM10gLSBhWzNdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6ICsgdyp3KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LmRpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuZGlzdCA9IHZlYzQuZGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWM0LnNxdWFyZWREaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgICAgIHogPSBiWzJdIC0gYVsyXSxcbiAgICAgICAgdyA9IGJbM10gLSBhWzNdO1xuICAgIHJldHVybiB4KnggKyB5KnkgKyB6KnogKyB3Knc7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5zcXJEaXN0ID0gdmVjNC5zcXVhcmVkRGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xudmVjNC5sZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdLFxuICAgICAgICB3ID0gYVszXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeiArIHcqdyk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5sZW4gPSB2ZWM0Lmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG52ZWM0LnNxdWFyZWRMZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdLFxuICAgICAgICB3ID0gYVszXTtcbiAgICByZXR1cm4geCp4ICsgeSp5ICsgeip6ICsgdyp3O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LnNxckxlbiA9IHZlYzQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm5lZ2F0ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IC1hWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5ub3JtYWxpemUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXSxcbiAgICAgICAgdyA9IGFbM107XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeSArIHoqeiArIHcqdztcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKiBsZW47XG4gICAgICAgIG91dFszXSA9IGFbM10gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjNC5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl0gKyBhWzNdICogYlszXTtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubGVycCA9IGZ1bmN0aW9uIChvdXQsIGEsIGIsIHQpIHtcbiAgICB2YXIgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV0sXG4gICAgICAgIGF6ID0gYVsyXSxcbiAgICAgICAgYXcgPSBhWzNdO1xuICAgIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopO1xuICAgIG91dFszXSA9IGF3ICsgdCAqIChiWzNdIC0gYXcpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQucmFuZG9tID0gZnVuY3Rpb24gKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcblxuICAgIC8vVE9ETzogVGhpcyBpcyBhIHByZXR0eSBhd2Z1bCB3YXkgb2YgZG9pbmcgdGhpcy4gRmluZCBzb21ldGhpbmcgYmV0dGVyLlxuICAgIG91dFswXSA9IEdMTUFUX1JBTkRPTSgpO1xuICAgIG91dFsxXSA9IEdMTUFUX1JBTkRPTSgpO1xuICAgIG91dFsyXSA9IEdMTUFUX1JBTkRPTSgpO1xuICAgIG91dFszXSA9IEdMTUFUX1JBTkRPTSgpO1xuICAgIHZlYzQubm9ybWFsaXplKG91dCwgb3V0KTtcbiAgICB2ZWM0LnNjYWxlKG91dCwgb3V0LCBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgbWF0NC5cbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQudHJhbnNmb3JtTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLCB3ID0gYVszXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSAqIHc7XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10gKiB3O1xuICAgIG91dFsyXSA9IG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSAqIHc7XG4gICAgb3V0WzNdID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdICogdztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBxdWF0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtxdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC50cmFuc2Zvcm1RdWF0ID0gZnVuY3Rpb24ob3V0LCBhLCBxKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sXG4gICAgICAgIHF4ID0gcVswXSwgcXkgPSBxWzFdLCBxeiA9IHFbMl0sIHF3ID0gcVszXSxcblxuICAgICAgICAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xuICAgICAgICBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeSxcbiAgICAgICAgaXkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHosXG4gICAgICAgIGl6ID0gcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4LFxuICAgICAgICBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7XG5cbiAgICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG4gICAgb3V0WzBdID0gaXggKiBxdyArIGl3ICogLXF4ICsgaXkgKiAtcXogLSBpeiAqIC1xeTtcbiAgICBvdXRbMV0gPSBpeSAqIHF3ICsgaXcgKiAtcXkgKyBpeiAqIC1xeCAtIGl4ICogLXF6O1xuICAgIG91dFsyXSA9IGl6ICogcXcgKyBpdyAqIC1xeiArIGl4ICogLXF5IC0gaXkgKiAtcXg7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzRzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzQuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMycyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5mb3JFYWNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWMgPSB2ZWM0LmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICBsID0gTWF0aC5taW4oKGNvdW50ICogc3RyaWRlKSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXTsgdmVjWzFdID0gYVtpKzFdOyB2ZWNbMl0gPSBhW2krMl07IHZlY1szXSA9IGFbaSszXTtcbiAgICAgICAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgICAgICAgYVtpXSA9IHZlY1swXTsgYVtpKzFdID0gdmVjWzFdOyBhW2krMl0gPSB2ZWNbMl07IGFbaSszXSA9IHZlY1szXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gdmVjIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKi9cbnZlYzQuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ3ZlYzQoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIGFbM10gKyAnKSc7XG59O1xuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy52ZWM0ID0gdmVjNDtcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDJ4MiBNYXRyaXhcbiAqIEBuYW1lIG1hdDJcbiAqL1xuXG52YXIgbWF0MiA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0MlxuICpcbiAqIEByZXR1cm5zIHttYXQyfSBhIG5ldyAyeDIgbWF0cml4XG4gKi9cbm1hdDIuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBtYXQyIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyfSBhIG1hdHJpeCB0byBjbG9uZVxuICogQHJldHVybnMge21hdDJ9IGEgbmV3IDJ4MiBtYXRyaXhcbiAqL1xubWF0Mi5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MiB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCBhIG1hdDIgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbm1hdDIuaWRlbnRpdHkgPSBmdW5jdGlvbihvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi50cmFuc3Bvc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICB2YXIgYTEgPSBhWzFdO1xuICAgICAgICBvdXRbMV0gPSBhWzJdO1xuICAgICAgICBvdXRbMl0gPSBhMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzJdO1xuICAgICAgICBvdXRbMl0gPSBhWzFdO1xuICAgICAgICBvdXRbM10gPSBhWzNdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLFxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgZGV0ID0gYTAgKiBhMyAtIGEyICogYTE7XG5cbiAgICBpZiAoIWRldCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuICAgIFxuICAgIG91dFswXSA9ICBhMyAqIGRldDtcbiAgICBvdXRbMV0gPSAtYTEgKiBkZXQ7XG4gICAgb3V0WzJdID0gLWEyICogZGV0O1xuICAgIG91dFszXSA9ICBhMCAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgLy8gQ2FjaGluZyB0aGlzIHZhbHVlIGlzIG5lc3NlY2FyeSBpZiBvdXQgPT0gYVxuICAgIHZhciBhMCA9IGFbMF07XG4gICAgb3V0WzBdID0gIGFbM107XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgb3V0WzNdID0gIGEwO1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gKi9cbm1hdDIuZGV0ZXJtaW5hbnQgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiBhWzBdICogYVszXSAtIGFbMl0gKiBhWzFdO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQyJ3NcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbm1hdDIubXVsdGlwbHkgPSBmdW5jdGlvbiAob3V0LCBhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXTtcbiAgICB2YXIgYjAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdO1xuICAgIG91dFswXSA9IGEwICogYjAgKyBhMiAqIGIxO1xuICAgIG91dFsxXSA9IGExICogYjAgKyBhMyAqIGIxO1xuICAgIG91dFsyXSA9IGEwICogYjIgKyBhMiAqIGIzO1xuICAgIG91dFszXSA9IGExICogYjIgKyBhMyAqIGIzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0Mi5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQyLm11bCA9IG1hdDIubXVsdGlwbHk7XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDIgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLFxuICAgICAgICBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgb3V0WzBdID0gYTAgKiAgYyArIGEyICogcztcbiAgICBvdXRbMV0gPSBhMSAqICBjICsgYTMgKiBzO1xuICAgIG91dFsyXSA9IGEwICogLXMgKyBhMiAqIGM7XG4gICAgb3V0WzNdID0gYTEgKiAtcyArIGEzICogYztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDIgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdGhlIHZlYzIgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDJ9IG91dFxuICoqL1xubWF0Mi5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG4gICAgICAgIHYwID0gdlswXSwgdjEgPSB2WzFdO1xuICAgIG91dFswXSA9IGEwICogdjA7XG4gICAgb3V0WzFdID0gYTEgKiB2MDtcbiAgICBvdXRbMl0gPSBhMiAqIHYxO1xuICAgIG91dFszXSA9IGEzICogdjE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQyLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICdtYXQyKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBhWzNdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0Mi5mcm9iID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpKSlcbn07XG5cbi8qKlxuICogUmV0dXJucyBMLCBEIGFuZCBVIG1hdHJpY2VzIChMb3dlciB0cmlhbmd1bGFyLCBEaWFnb25hbCBhbmQgVXBwZXIgdHJpYW5ndWxhcikgYnkgZmFjdG9yaXppbmcgdGhlIGlucHV0IG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBMIHRoZSBsb3dlciB0cmlhbmd1bGFyIG1hdHJpeCBcbiAqIEBwYXJhbSB7bWF0Mn0gRCB0aGUgZGlhZ29uYWwgbWF0cml4IFxuICogQHBhcmFtIHttYXQyfSBVIHRoZSB1cHBlciB0cmlhbmd1bGFyIG1hdHJpeCBcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgaW5wdXQgbWF0cml4IHRvIGZhY3Rvcml6ZVxuICovXG5cbm1hdDIuTERVID0gZnVuY3Rpb24gKEwsIEQsIFUsIGEpIHsgXG4gICAgTFsyXSA9IGFbMl0vYVswXTsgXG4gICAgVVswXSA9IGFbMF07IFxuICAgIFVbMV0gPSBhWzFdOyBcbiAgICBVWzNdID0gYVszXSAtIExbMl0gKiBVWzFdOyBcbiAgICByZXR1cm4gW0wsIEQsIFVdOyAgICAgICBcbn07IFxuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5tYXQyID0gbWF0Mjtcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDJ4MyBNYXRyaXhcbiAqIEBuYW1lIG1hdDJkXG4gKiBcbiAqIEBkZXNjcmlwdGlvbiBcbiAqIEEgbWF0MmQgY29udGFpbnMgc2l4IGVsZW1lbnRzIGRlZmluZWQgYXM6XG4gKiA8cHJlPlxuICogW2EsIGMsIHR4LFxuICogIGIsIGQsIHR5XVxuICogPC9wcmU+XG4gKiBUaGlzIGlzIGEgc2hvcnQgZm9ybSBmb3IgdGhlIDN4MyBtYXRyaXg6XG4gKiA8cHJlPlxuICogW2EsIGMsIHR4LFxuICogIGIsIGQsIHR5LFxuICogIDAsIDAsIDFdXG4gKiA8L3ByZT5cbiAqIFRoZSBsYXN0IHJvdyBpcyBpZ25vcmVkIHNvIHRoZSBhcnJheSBpcyBzaG9ydGVyIGFuZCBvcGVyYXRpb25zIGFyZSBmYXN0ZXIuXG4gKi9cblxudmFyIG1hdDJkID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQyZFxuICpcbiAqIEByZXR1cm5zIHttYXQyZH0gYSBuZXcgMngzIG1hdHJpeFxuICovXG5tYXQyZC5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNik7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBtYXQyZCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0MmR9IGEgbmV3IDJ4MyBtYXRyaXhcbiAqL1xubWF0MmQuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDYpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQyZCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0MmQgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDJkfSBvdXRcbiAqL1xubWF0MmQuaWRlbnRpdHkgPSBmdW5jdGlvbihvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKi9cbm1hdDJkLmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhYSA9IGFbMF0sIGFiID0gYVsxXSwgYWMgPSBhWzJdLCBhZCA9IGFbM10sXG4gICAgICAgIGF0eCA9IGFbNF0sIGF0eSA9IGFbNV07XG5cbiAgICB2YXIgZGV0ID0gYWEgKiBhZCAtIGFiICogYWM7XG4gICAgaWYoIWRldCl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSBhZCAqIGRldDtcbiAgICBvdXRbMV0gPSAtYWIgKiBkZXQ7XG4gICAgb3V0WzJdID0gLWFjICogZGV0O1xuICAgIG91dFszXSA9IGFhICogZGV0O1xuICAgIG91dFs0XSA9IChhYyAqIGF0eSAtIGFkICogYXR4KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYWIgKiBhdHggLSBhYSAqIGF0eSkgKiBkZXQ7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0MmQuZGV0ZXJtaW5hbnQgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiBhWzBdICogYVszXSAtIGFbMV0gKiBhWzJdO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQyZCdzXG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDJkfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDJkfSBvdXRcbiAqL1xubWF0MmQubXVsdGlwbHkgPSBmdW5jdGlvbiAob3V0LCBhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSwgYTQgPSBhWzRdLCBhNSA9IGFbNV0sXG4gICAgICAgIGIwID0gYlswXSwgYjEgPSBiWzFdLCBiMiA9IGJbMl0sIGIzID0gYlszXSwgYjQgPSBiWzRdLCBiNSA9IGJbNV07XG4gICAgb3V0WzBdID0gYTAgKiBiMCArIGEyICogYjE7XG4gICAgb3V0WzFdID0gYTEgKiBiMCArIGEzICogYjE7XG4gICAgb3V0WzJdID0gYTAgKiBiMiArIGEyICogYjM7XG4gICAgb3V0WzNdID0gYTEgKiBiMiArIGEzICogYjM7XG4gICAgb3V0WzRdID0gYTAgKiBiNCArIGEyICogYjUgKyBhNDtcbiAgICBvdXRbNV0gPSBhMSAqIGI0ICsgYTMgKiBiNSArIGE1O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0MmQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xubWF0MmQubXVsID0gbWF0MmQubXVsdGlwbHk7XG5cblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0MmQgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDJkfSBvdXRcbiAqL1xubWF0MmQucm90YXRlID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSwgYTQgPSBhWzRdLCBhNSA9IGFbNV0sXG4gICAgICAgIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBhMCAqICBjICsgYTIgKiBzO1xuICAgIG91dFsxXSA9IGExICogIGMgKyBhMyAqIHM7XG4gICAgb3V0WzJdID0gYTAgKiAtcyArIGEyICogYztcbiAgICBvdXRbM10gPSBhMSAqIC1zICsgYTMgKiBjO1xuICAgIG91dFs0XSA9IGE0O1xuICAgIG91dFs1XSA9IGE1O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0MmQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzJcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjMn0gdiB0aGUgdmVjMiB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICoqL1xubWF0MmQuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgdjAgPSB2WzBdLCB2MSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTAgKiB2MDtcbiAgICBvdXRbMV0gPSBhMSAqIHYwO1xuICAgIG91dFsyXSA9IGEyICogdjE7XG4gICAgb3V0WzNdID0gYTMgKiB2MTtcbiAgICBvdXRbNF0gPSBhNDtcbiAgICBvdXRbNV0gPSBhNTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBtYXQyZCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHRyYW5zbGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICoqL1xubWF0MmQudHJhbnNsYXRlID0gZnVuY3Rpb24ob3V0LCBhLCB2KSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSwgYTQgPSBhWzRdLCBhNSA9IGFbNV0sXG4gICAgICAgIHYwID0gdlswXSwgdjEgPSB2WzFdO1xuICAgIG91dFswXSA9IGEwO1xuICAgIG91dFsxXSA9IGExO1xuICAgIG91dFsyXSA9IGEyO1xuICAgIG91dFszXSA9IGEzO1xuICAgIG91dFs0XSA9IGEwICogdjAgKyBhMiAqIHYxICsgYTQ7XG4gICAgb3V0WzVdID0gYTEgKiB2MCArIGEzICogdjEgKyBhNTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBhIG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cbm1hdDJkLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICdtYXQyZCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbM10gKyAnLCAnICsgYVs0XSArICcsICcgKyBhWzVdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBGcm9iZW5pdXMgbm9ybVxuICovXG5tYXQyZC5mcm9iID0gZnVuY3Rpb24gKGEpIHsgXG4gICAgcmV0dXJuKE1hdGguc3FydChNYXRoLnBvdyhhWzBdLCAyKSArIE1hdGgucG93KGFbMV0sIDIpICsgTWF0aC5wb3coYVsyXSwgMikgKyBNYXRoLnBvdyhhWzNdLCAyKSArIE1hdGgucG93KGFbNF0sIDIpICsgTWF0aC5wb3coYVs1XSwgMikgKyAxKSlcbn07IFxuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5tYXQyZCA9IG1hdDJkO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgM3gzIE1hdHJpeFxuICogQG5hbWUgbWF0M1xuICovXG5cbnZhciBtYXQzID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQzXG4gKlxuICogQHJldHVybnMge21hdDN9IGEgbmV3IDN4MyBtYXRyaXhcbiAqL1xubWF0My5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoOSk7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAxO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29waWVzIHRoZSB1cHBlci1sZWZ0IDN4MyB2YWx1ZXMgaW50byB0aGUgZ2l2ZW4gbWF0My5cbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIDN4MyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSAgIHRoZSBzb3VyY2UgNHg0IG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmZyb21NYXQ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVs0XTtcbiAgICBvdXRbNF0gPSBhWzVdO1xuICAgIG91dFs1XSA9IGFbNl07XG4gICAgb3V0WzZdID0gYVs4XTtcbiAgICBvdXRbN10gPSBhWzldO1xuICAgIG91dFs4XSA9IGFbMTBdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbWF0MyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0M30gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQzfSBhIG5ldyAzeDMgbWF0cml4XG4gKi9cbm1hdDMuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDkpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQzIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCBhIG1hdDMgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuaWRlbnRpdHkgPSBmdW5jdGlvbihvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDE7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMudHJhbnNwb3NlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgdmFyIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGExMiA9IGFbNV07XG4gICAgICAgIG91dFsxXSA9IGFbM107XG4gICAgICAgIG91dFsyXSA9IGFbNl07XG4gICAgICAgIG91dFszXSA9IGEwMTtcbiAgICAgICAgb3V0WzVdID0gYVs3XTtcbiAgICAgICAgb3V0WzZdID0gYTAyO1xuICAgICAgICBvdXRbN10gPSBhMTI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0WzBdID0gYVswXTtcbiAgICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgICAgb3V0WzNdID0gYVsxXTtcbiAgICAgICAgb3V0WzRdID0gYVs0XTtcbiAgICAgICAgb3V0WzVdID0gYVs3XTtcbiAgICAgICAgb3V0WzZdID0gYVsyXTtcbiAgICAgICAgb3V0WzddID0gYVs1XTtcbiAgICAgICAgb3V0WzhdID0gYVs4XTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuaW52ZXJ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF0sXG5cbiAgICAgICAgYjAxID0gYTIyICogYTExIC0gYTEyICogYTIxLFxuICAgICAgICBiMTEgPSAtYTIyICogYTEwICsgYTEyICogYTIwLFxuICAgICAgICBiMjEgPSBhMjEgKiBhMTAgLSBhMTEgKiBhMjAsXG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBkZXQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEgKyBhMDIgKiBiMjE7XG5cbiAgICBpZiAoIWRldCkgeyBcbiAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSBiMDEgKiBkZXQ7XG4gICAgb3V0WzFdID0gKC1hMjIgKiBhMDEgKyBhMDIgKiBhMjEpICogZGV0O1xuICAgIG91dFsyXSA9IChhMTIgKiBhMDEgLSBhMDIgKiBhMTEpICogZGV0O1xuICAgIG91dFszXSA9IGIxMSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTIyICogYTAwIC0gYTAyICogYTIwKSAqIGRldDtcbiAgICBvdXRbNV0gPSAoLWExMiAqIGEwMCArIGEwMiAqIGExMCkgKiBkZXQ7XG4gICAgb3V0WzZdID0gYjIxICogZGV0O1xuICAgIG91dFs3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTExICogYTAwIC0gYTAxICogYTEwKSAqIGRldDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuYWRqb2ludCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdO1xuXG4gICAgb3V0WzBdID0gKGExMSAqIGEyMiAtIGExMiAqIGEyMSk7XG4gICAgb3V0WzFdID0gKGEwMiAqIGEyMSAtIGEwMSAqIGEyMik7XG4gICAgb3V0WzJdID0gKGEwMSAqIGExMiAtIGEwMiAqIGExMSk7XG4gICAgb3V0WzNdID0gKGExMiAqIGEyMCAtIGExMCAqIGEyMik7XG4gICAgb3V0WzRdID0gKGEwMCAqIGEyMiAtIGEwMiAqIGEyMCk7XG4gICAgb3V0WzVdID0gKGEwMiAqIGExMCAtIGEwMCAqIGExMik7XG4gICAgb3V0WzZdID0gKGExMCAqIGEyMSAtIGExMSAqIGEyMCk7XG4gICAgb3V0WzddID0gKGEwMSAqIGEyMCAtIGEwMCAqIGEyMSk7XG4gICAgb3V0WzhdID0gKGEwMCAqIGExMSAtIGEwMSAqIGExMCk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gKi9cbm1hdDMuZGV0ZXJtaW5hbnQgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdO1xuXG4gICAgcmV0dXJuIGEwMCAqIChhMjIgKiBhMTEgLSBhMTIgKiBhMjEpICsgYTAxICogKC1hMjIgKiBhMTAgKyBhMTIgKiBhMjApICsgYTAyICogKGEyMSAqIGExMCAtIGExMSAqIGEyMCk7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDMnc1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBiMDAgPSBiWzBdLCBiMDEgPSBiWzFdLCBiMDIgPSBiWzJdLFxuICAgICAgICBiMTAgPSBiWzNdLCBiMTEgPSBiWzRdLCBiMTIgPSBiWzVdLFxuICAgICAgICBiMjAgPSBiWzZdLCBiMjEgPSBiWzddLCBiMjIgPSBiWzhdO1xuXG4gICAgb3V0WzBdID0gYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwO1xuICAgIG91dFsxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMTtcbiAgICBvdXRbMl0gPSBiMDAgKiBhMDIgKyBiMDEgKiBhMTIgKyBiMDIgKiBhMjI7XG5cbiAgICBvdXRbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjA7XG4gICAgb3V0WzRdID0gYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxO1xuICAgIG91dFs1XSA9IGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMjtcblxuICAgIG91dFs2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMDtcbiAgICBvdXRbN10gPSBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBiMjIgKiBhMjE7XG4gICAgb3V0WzhdID0gYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0My5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQzLm11bCA9IG1hdDMubXVsdGlwbHk7XG5cbi8qKlxuICogVHJhbnNsYXRlIGEgbWF0MyBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My50cmFuc2xhdGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcbiAgICAgICAgeCA9IHZbMF0sIHkgPSB2WzFdO1xuXG4gICAgb3V0WzBdID0gYTAwO1xuICAgIG91dFsxXSA9IGEwMTtcbiAgICBvdXRbMl0gPSBhMDI7XG5cbiAgICBvdXRbM10gPSBhMTA7XG4gICAgb3V0WzRdID0gYTExO1xuICAgIG91dFs1XSA9IGExMjtcblxuICAgIG91dFs2XSA9IHggKiBhMDAgKyB5ICogYTEwICsgYTIwO1xuICAgIG91dFs3XSA9IHggKiBhMDEgKyB5ICogYTExICsgYTIxO1xuICAgIG91dFs4XSA9IHggKiBhMDIgKyB5ICogYTEyICsgYTIyO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQzIGJ5IHRoZSBnaXZlbiBhbmdsZVxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMucm90YXRlID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF0sXG5cbiAgICAgICAgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgb3V0WzBdID0gYyAqIGEwMCArIHMgKiBhMTA7XG4gICAgb3V0WzFdID0gYyAqIGEwMSArIHMgKiBhMTE7XG4gICAgb3V0WzJdID0gYyAqIGEwMiArIHMgKiBhMTI7XG5cbiAgICBvdXRbM10gPSBjICogYTEwIC0gcyAqIGEwMDtcbiAgICBvdXRbNF0gPSBjICogYTExIC0gcyAqIGEwMTtcbiAgICBvdXRbNV0gPSBjICogYTEyIC0gcyAqIGEwMjtcblxuICAgIG91dFs2XSA9IGEyMDtcbiAgICBvdXRbN10gPSBhMjE7XG4gICAgb3V0WzhdID0gYTIyO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0MyBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7dmVjMn0gdiB0aGUgdmVjMiB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKiovXG5tYXQzLnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCB2KSB7XG4gICAgdmFyIHggPSB2WzBdLCB5ID0gdlsxXTtcblxuICAgIG91dFswXSA9IHggKiBhWzBdO1xuICAgIG91dFsxXSA9IHggKiBhWzFdO1xuICAgIG91dFsyXSA9IHggKiBhWzJdO1xuXG4gICAgb3V0WzNdID0geSAqIGFbM107XG4gICAgb3V0WzRdID0geSAqIGFbNF07XG4gICAgb3V0WzVdID0geSAqIGFbNV07XG5cbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBmcm9tIGEgbWF0MmQgaW50byBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgbWF0cml4IHRvIGNvcHlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqKi9cbm1hdDMuZnJvbU1hdDJkID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IDA7XG5cbiAgICBvdXRbM10gPSBhWzJdO1xuICAgIG91dFs0XSA9IGFbM107XG4gICAgb3V0WzVdID0gMDtcblxuICAgIG91dFs2XSA9IGFbNF07XG4gICAgb3V0WzddID0gYVs1XTtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiogQ2FsY3VsYXRlcyBhIDN4MyBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuKlxuKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4qIEBwYXJhbSB7cXVhdH0gcSBRdWF0ZXJuaW9uIHRvIGNyZWF0ZSBtYXRyaXggZnJvbVxuKlxuKiBAcmV0dXJucyB7bWF0M30gb3V0XG4qL1xubWF0My5mcm9tUXVhdCA9IGZ1bmN0aW9uIChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHl4ID0geSAqIHgyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgenggPSB6ICogeDIsXG4gICAgICAgIHp5ID0geiAqIHkyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFszXSA9IHl4IC0gd3o7XG4gICAgb3V0WzZdID0genggKyB3eTtcblxuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzRdID0gMSAtIHh4IC0geno7XG4gICAgb3V0WzddID0genkgLSB3eDtcblxuICAgIG91dFsyXSA9IHp4IC0gd3k7XG4gICAgb3V0WzVdID0genkgKyB3eDtcbiAgICBvdXRbOF0gPSAxIC0geHggLSB5eTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiogQ2FsY3VsYXRlcyBhIDN4MyBub3JtYWwgbWF0cml4ICh0cmFuc3Bvc2UgaW52ZXJzZSkgZnJvbSB0aGUgNHg0IG1hdHJpeFxuKlxuKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4qIEBwYXJhbSB7bWF0NH0gYSBNYXQ0IHRvIGRlcml2ZSB0aGUgbm9ybWFsIG1hdHJpeCBmcm9tXG4qXG4qIEByZXR1cm5zIHttYXQzfSBvdXRcbiovXG5tYXQzLm5vcm1hbEZyb21NYXQ0ID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzIsXG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgICBpZiAoIWRldCkgeyBcbiAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMV0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcblxuICAgIG91dFszXSA9IChhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDkpICogZGV0O1xuICAgIG91dFs0XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICAgIG91dFs1XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuXG4gICAgb3V0WzZdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzddID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzhdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gbWF0IG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cbm1hdDMuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDMoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIFxuICAgICAgICAgICAgICAgICAgICBhWzNdICsgJywgJyArIGFbNF0gKyAnLCAnICsgYVs1XSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVs2XSArICcsICcgKyBhWzddICsgJywgJyArIGFbOF0gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBGcm9iZW5pdXMgbm9ybVxuICovXG5tYXQzLmZyb2IgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybihNYXRoLnNxcnQoTWF0aC5wb3coYVswXSwgMikgKyBNYXRoLnBvdyhhWzFdLCAyKSArIE1hdGgucG93KGFbMl0sIDIpICsgTWF0aC5wb3coYVszXSwgMikgKyBNYXRoLnBvdyhhWzRdLCAyKSArIE1hdGgucG93KGFbNV0sIDIpICsgTWF0aC5wb3coYVs2XSwgMikgKyBNYXRoLnBvdyhhWzddLCAyKSArIE1hdGgucG93KGFbOF0sIDIpKSlcbn07XG5cblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMubWF0MyA9IG1hdDM7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyA0eDQgTWF0cml4XG4gKiBAbmFtZSBtYXQ0XG4gKi9cblxudmFyIG1hdDQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5tYXQ0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5tYXQ0LmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0NCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICBvdXRbOV0gPSBhWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCBhIG1hdDQgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuaWRlbnRpdHkgPSBmdW5jdGlvbihvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC50cmFuc3Bvc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICB2YXIgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgICAgIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgICAgICBhMjMgPSBhWzExXTtcblxuICAgICAgICBvdXRbMV0gPSBhWzRdO1xuICAgICAgICBvdXRbMl0gPSBhWzhdO1xuICAgICAgICBvdXRbM10gPSBhWzEyXTtcbiAgICAgICAgb3V0WzRdID0gYTAxO1xuICAgICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgICBvdXRbN10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzhdID0gYTAyO1xuICAgICAgICBvdXRbOV0gPSBhMTI7XG4gICAgICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzEyXSA9IGEwMztcbiAgICAgICAgb3V0WzEzXSA9IGExMztcbiAgICAgICAgb3V0WzE0XSA9IGEyMztcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzRdO1xuICAgICAgICBvdXRbMl0gPSBhWzhdO1xuICAgICAgICBvdXRbM10gPSBhWzEyXTtcbiAgICAgICAgb3V0WzRdID0gYVsxXTtcbiAgICAgICAgb3V0WzVdID0gYVs1XTtcbiAgICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgICAgb3V0WzddID0gYVsxM107XG4gICAgICAgIG91dFs4XSA9IGFbMl07XG4gICAgICAgIG91dFs5XSA9IGFbNl07XG4gICAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTJdID0gYVszXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbN107XG4gICAgICAgIG91dFsxNF0gPSBhWzExXTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyLFxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHsgXG4gICAgICAgIHJldHVybiBudWxsOyBcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzNdID0gKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzZdID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzhdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzldID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMV0gPSAoYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTJdID0gKGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICAgIG91dFsxNF0gPSAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTVdID0gKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQ7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuYWRqb2ludCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdO1xuXG4gICAgb3V0WzBdICA9ICAoYTExICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgICBvdXRbMV0gID0gLShhMDEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikpO1xuICAgIG91dFsyXSAgPSAgKGEwMSAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTExICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzNdICA9IC0oYTAxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTEgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMSAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbNF0gID0gLShhMTAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikpO1xuICAgIG91dFs1XSAgPSAgKGEwMCAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSk7XG4gICAgb3V0WzZdICA9IC0oYTAwICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbN10gID0gIChhMDAgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSAtIGExMCAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpICsgYTIwICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFs4XSAgPSAgKGExMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIzIC0gYTEzICogYTIxKSk7XG4gICAgb3V0WzldICA9IC0oYTAwICogKGEyMSAqIGEzMyAtIGEyMyAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpKTtcbiAgICBvdXRbMTBdID0gIChhMDAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSkpO1xuICAgIG91dFsxMV0gPSAtKGEwMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMyAtIGEwMyAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEzIC0gYTAzICogYTExKSk7XG4gICAgb3V0WzEyXSA9IC0oYTEwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpKTtcbiAgICBvdXRbMTNdID0gIChhMDAgKiAoYTIxICogYTMyIC0gYTIyICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkpO1xuICAgIG91dFsxNF0gPSAtKGEwMCAqIChhMTEgKiBhMzIgLSBhMTIgKiBhMzEpIC0gYTEwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gICAgb3V0WzE1XSA9ICAoYTAwICogKGExMSAqIGEyMiAtIGExMiAqIGEyMSkgLSBhMTAgKiAoYTAxICogYTIyIC0gYTAyICogYTIxKSArIGEyMCAqIChhMDEgKiBhMTIgLSBhMDIgKiBhMTEpKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0NC5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgICAgICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCxcbiAgICAgICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsXG4gICAgICAgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgICAgICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCxcbiAgICAgICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsXG4gICAgICAgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICByZXR1cm4gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQ0J3NcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQubXVsdGlwbHkgPSBmdW5jdGlvbiAob3V0LCBhLCBiKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV07XG5cbiAgICAvLyBDYWNoZSBvbmx5IHRoZSBjdXJyZW50IGxpbmUgb2YgdGhlIHNlY29uZCBtYXRyaXhcbiAgICB2YXIgYjAgID0gYlswXSwgYjEgPSBiWzFdLCBiMiA9IGJbMl0sIGIzID0gYlszXTsgIFxuICAgIG91dFswXSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbMV0gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzJdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFszXSA9IGIwKmEwMyArIGIxKmExMyArIGIyKmEyMyArIGIzKmEzMztcblxuICAgIGIwID0gYls0XTsgYjEgPSBiWzVdOyBiMiA9IGJbNl07IGIzID0gYls3XTtcbiAgICBvdXRbNF0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzVdID0gYjAqYTAxICsgYjEqYTExICsgYjIqYTIxICsgYjMqYTMxO1xuICAgIG91dFs2XSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbN10gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbOF07IGIxID0gYls5XTsgYjIgPSBiWzEwXTsgYjMgPSBiWzExXTtcbiAgICBvdXRbOF0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzldID0gYjAqYTAxICsgYjEqYTExICsgYjIqYTIxICsgYjMqYTMxO1xuICAgIG91dFsxMF0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzExXSA9IGIwKmEwMyArIGIxKmExMyArIGIyKmEyMyArIGIzKmEzMztcblxuICAgIGIwID0gYlsxMl07IGIxID0gYlsxM107IGIyID0gYlsxNF07IGIzID0gYlsxNV07XG4gICAgb3V0WzEyXSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbMTNdID0gYjAqYTAxICsgYjEqYTExICsgYjIqYTIxICsgYjMqYTMxO1xuICAgIG91dFsxNF0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzE1XSA9IGIwKmEwMyArIGIxKmExMyArIGIyKmEyMyArIGIzKmEzMztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xubWF0NC5tdWwgPSBtYXQ0Lm11bHRpcGx5O1xuXG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjM30gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQudHJhbnNsYXRlID0gZnVuY3Rpb24gKG91dCwgYSwgdikge1xuICAgIHZhciB4ID0gdlswXSwgeSA9IHZbMV0sIHogPSB2WzJdLFxuICAgICAgICBhMDAsIGEwMSwgYTAyLCBhMDMsXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzO1xuXG4gICAgaWYgKGEgPT09IG91dCkge1xuICAgICAgICBvdXRbMTJdID0gYVswXSAqIHggKyBhWzRdICogeSArIGFbOF0gKiB6ICsgYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzFdICogeCArIGFbNV0gKiB5ICsgYVs5XSAqIHogKyBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMl0gKiB4ICsgYVs2XSAqIHkgKyBhWzEwXSAqIHogKyBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbM10gKiB4ICsgYVs3XSAqIHkgKyBhWzExXSAqIHogKyBhWzE1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhMDAgPSBhWzBdOyBhMDEgPSBhWzFdOyBhMDIgPSBhWzJdOyBhMDMgPSBhWzNdO1xuICAgICAgICBhMTAgPSBhWzRdOyBhMTEgPSBhWzVdOyBhMTIgPSBhWzZdOyBhMTMgPSBhWzddO1xuICAgICAgICBhMjAgPSBhWzhdOyBhMjEgPSBhWzldOyBhMjIgPSBhWzEwXTsgYTIzID0gYVsxMV07XG5cbiAgICAgICAgb3V0WzBdID0gYTAwOyBvdXRbMV0gPSBhMDE7IG91dFsyXSA9IGEwMjsgb3V0WzNdID0gYTAzO1xuICAgICAgICBvdXRbNF0gPSBhMTA7IG91dFs1XSA9IGExMTsgb3V0WzZdID0gYTEyOyBvdXRbN10gPSBhMTM7XG4gICAgICAgIG91dFs4XSA9IGEyMDsgb3V0WzldID0gYTIxOyBvdXRbMTBdID0gYTIyOyBvdXRbMTFdID0gYTIzO1xuXG4gICAgICAgIG91dFsxMl0gPSBhMDAgKiB4ICsgYTEwICogeSArIGEyMCAqIHogKyBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGEwMSAqIHggKyBhMTEgKiB5ICsgYTIxICogeiArIGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYTAyICogeCArIGExMiAqIHkgKyBhMjIgKiB6ICsgYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhMDMgKiB4ICsgYTEzICogeSArIGEyMyAqIHogKyBhWzE1XTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7dmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKiovXG5tYXQ0LnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCB2KSB7XG4gICAgdmFyIHggPSB2WzBdLCB5ID0gdlsxXSwgeiA9IHZbMl07XG5cbiAgICBvdXRbMF0gPSBhWzBdICogeDtcbiAgICBvdXRbMV0gPSBhWzFdICogeDtcbiAgICBvdXRbMl0gPSBhWzJdICogeDtcbiAgICBvdXRbM10gPSBhWzNdICogeDtcbiAgICBvdXRbNF0gPSBhWzRdICogeTtcbiAgICBvdXRbNV0gPSBhWzVdICogeTtcbiAgICBvdXRbNl0gPSBhWzZdICogeTtcbiAgICBvdXRbN10gPSBhWzddICogeTtcbiAgICBvdXRbOF0gPSBhWzhdICogejtcbiAgICBvdXRbOV0gPSBhWzldICogejtcbiAgICBvdXRbMTBdID0gYVsxMF0gKiB6O1xuICAgIG91dFsxMV0gPSBhWzExXSAqIHo7XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiBhbmdsZVxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcGFyYW0ge3ZlYzN9IGF4aXMgdGhlIGF4aXMgdG8gcm90YXRlIGFyb3VuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnJvdGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCwgYXhpcykge1xuICAgIHZhciB4ID0gYXhpc1swXSwgeSA9IGF4aXNbMV0sIHogPSBheGlzWzJdLFxuICAgICAgICBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KSxcbiAgICAgICAgcywgYywgdCxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMyxcbiAgICAgICAgYjAwLCBiMDEsIGIwMixcbiAgICAgICAgYjEwLCBiMTEsIGIxMixcbiAgICAgICAgYjIwLCBiMjEsIGIyMjtcblxuICAgIGlmIChNYXRoLmFicyhsZW4pIDwgR0xNQVRfRVBTSUxPTikgeyByZXR1cm4gbnVsbDsgfVxuICAgIFxuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeCAqPSBsZW47XG4gICAgeSAqPSBsZW47XG4gICAgeiAqPSBsZW47XG5cbiAgICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICB0ID0gMSAtIGM7XG5cbiAgICBhMDAgPSBhWzBdOyBhMDEgPSBhWzFdOyBhMDIgPSBhWzJdOyBhMDMgPSBhWzNdO1xuICAgIGExMCA9IGFbNF07IGExMSA9IGFbNV07IGExMiA9IGFbNl07IGExMyA9IGFbN107XG4gICAgYTIwID0gYVs4XTsgYTIxID0gYVs5XTsgYTIyID0gYVsxMF07IGEyMyA9IGFbMTFdO1xuXG4gICAgLy8gQ29uc3RydWN0IHRoZSBlbGVtZW50cyBvZiB0aGUgcm90YXRpb24gbWF0cml4XG4gICAgYjAwID0geCAqIHggKiB0ICsgYzsgYjAxID0geSAqIHggKiB0ICsgeiAqIHM7IGIwMiA9IHogKiB4ICogdCAtIHkgKiBzO1xuICAgIGIxMCA9IHggKiB5ICogdCAtIHogKiBzOyBiMTEgPSB5ICogeSAqIHQgKyBjOyBiMTIgPSB6ICogeSAqIHQgKyB4ICogcztcbiAgICBiMjAgPSB4ICogeiAqIHQgKyB5ICogczsgYjIxID0geSAqIHogKiB0IC0geCAqIHM7IGIyMiA9IHogKiB6ICogdCArIGM7XG5cbiAgICAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGIwMCArIGExMCAqIGIwMSArIGEyMCAqIGIwMjtcbiAgICBvdXRbMV0gPSBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDI7XG4gICAgb3V0WzJdID0gYTAyICogYjAwICsgYTEyICogYjAxICsgYTIyICogYjAyO1xuICAgIG91dFszXSA9IGEwMyAqIGIwMCArIGExMyAqIGIwMSArIGEyMyAqIGIwMjtcbiAgICBvdXRbNF0gPSBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTI7XG4gICAgb3V0WzVdID0gYTAxICogYjEwICsgYTExICogYjExICsgYTIxICogYjEyO1xuICAgIG91dFs2XSA9IGEwMiAqIGIxMCArIGExMiAqIGIxMSArIGEyMiAqIGIxMjtcbiAgICBvdXRbN10gPSBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTI7XG4gICAgb3V0WzhdID0gYTAwICogYjIwICsgYTEwICogYjIxICsgYTIwICogYjIyO1xuICAgIG91dFs5XSA9IGEwMSAqIGIyMCArIGExMSAqIGIyMSArIGEyMSAqIGIyMjtcbiAgICBvdXRbMTBdID0gYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyO1xuICAgIG91dFsxMV0gPSBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjI7XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnJvdGF0ZVggPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzBdICA9IGFbMF07XG4gICAgICAgIG91dFsxXSAgPSBhWzFdO1xuICAgICAgICBvdXRbMl0gID0gYVsyXTtcbiAgICAgICAgb3V0WzNdICA9IGFbM107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzRdID0gYTEwICogYyArIGEyMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyArIGEyMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyArIGEyMyAqIHM7XG4gICAgb3V0WzhdID0gYTIwICogYyAtIGExMCAqIHM7XG4gICAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gICAgb3V0WzEwXSA9IGEyMiAqIGMgLSBhMTIgKiBzO1xuICAgIG91dFsxMV0gPSBhMjMgKiBjIC0gYTEzICogcztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucm90YXRlWSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM10sXG4gICAgICAgIGEyMCA9IGFbOF0sXG4gICAgICAgIGEyMSA9IGFbOV0sXG4gICAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgICBhMjMgPSBhWzExXTtcblxuICAgIGlmIChhICE9PSBvdXQpIHsgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgICAgICBvdXRbNF0gID0gYVs0XTtcbiAgICAgICAgb3V0WzVdICA9IGFbNV07XG4gICAgICAgIG91dFs2XSAgPSBhWzZdO1xuICAgICAgICBvdXRbN10gID0gYVs3XTtcbiAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gPSBhMDAgKiBjIC0gYTIwICogcztcbiAgICBvdXRbMV0gPSBhMDEgKiBjIC0gYTIxICogcztcbiAgICBvdXRbMl0gPSBhMDIgKiBjIC0gYTIyICogcztcbiAgICBvdXRbM10gPSBhMDMgKiBjIC0gYTIzICogcztcbiAgICBvdXRbOF0gPSBhMDAgKiBzICsgYTIwICogYztcbiAgICBvdXRbOV0gPSBhMDEgKiBzICsgYTIxICogYztcbiAgICBvdXRbMTBdID0gYTAyICogcyArIGEyMiAqIGM7XG4gICAgb3V0WzExXSA9IGEwMyAqIHMgKyBhMjMgKiBjO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5yb3RhdGVaID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcblxuICAgIGlmIChhICE9PSBvdXQpIHsgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICAgICAgb3V0WzhdICA9IGFbOF07XG4gICAgICAgIG91dFs5XSAgPSBhWzldO1xuICAgICAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gPSBhMDAgKiBjICsgYTEwICogcztcbiAgICBvdXRbMV0gPSBhMDEgKiBjICsgYTExICogcztcbiAgICBvdXRbMl0gPSBhMDIgKiBjICsgYTEyICogcztcbiAgICBvdXRbM10gPSBhMDMgKiBjICsgYTEzICogcztcbiAgICBvdXRbNF0gPSBhMTAgKiBjIC0gYTAwICogcztcbiAgICBvdXRbNV0gPSBhMTEgKiBjIC0gYTAxICogcztcbiAgICBvdXRbNl0gPSBhMTIgKiBjIC0gYTAyICogcztcbiAgICBvdXRbN10gPSBhMTMgKiBjIC0gYTAzICogcztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uIGFuZCB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgdmFyIHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHBhcmFtIHt2ZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uID0gZnVuY3Rpb24gKG91dCwgcSwgdikge1xuICAgIC8vIFF1YXRlcm5pb24gbWF0aFxuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeHkgPSB4ICogeTIsXG4gICAgICAgIHh6ID0geCAqIHoyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgeXogPSB5ICogejIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtICh5eSArIHp6KTtcbiAgICBvdXRbMV0gPSB4eSArIHd6O1xuICAgIG91dFsyXSA9IHh6IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4eSAtIHd6O1xuICAgIG91dFs1XSA9IDEgLSAoeHggKyB6eik7XG4gICAgb3V0WzZdID0geXogKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHh6ICsgd3k7XG4gICAgb3V0WzldID0geXogLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtICh4eCArIHl5KTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gdlswXTtcbiAgICBvdXRbMTNdID0gdlsxXTtcbiAgICBvdXRbMTRdID0gdlsyXTtcbiAgICBvdXRbMTVdID0gMTtcbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxubWF0NC5mcm9tUXVhdCA9IGZ1bmN0aW9uIChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHl4ID0geSAqIHgyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgenggPSB6ICogeDIsXG4gICAgICAgIHp5ID0geiAqIHkyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuXG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG5cbiAgICBvdXRbOF0gPSB6eCArIHd5O1xuICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICAgIG91dFsxMV0gPSAwO1xuXG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBmcnVzdHVtIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge051bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5mcnVzdHVtID0gZnVuY3Rpb24gKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgcmwgPSAxIC8gKHJpZ2h0IC0gbGVmdCksXG4gICAgICAgIHRiID0gMSAvICh0b3AgLSBib3R0b20pLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gKG5lYXIgKiAyKSAqIHJsO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gKG5lYXIgKiAyKSAqIHRiO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAocmlnaHQgKyBsZWZ0KSAqIHJsO1xuICAgIG91dFs5XSA9ICh0b3AgKyBib3R0b20pICogdGI7XG4gICAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxMV0gPSAtMTtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gKGZhciAqIG5lYXIgKiAyKSAqIG5mO1xuICAgIG91dFsxNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucGVyc3BlY3RpdmUgPSBmdW5jdGlvbiAob3V0LCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICAgIHZhciBmID0gMS4wIC8gTWF0aC50YW4oZm92eSAvIDIpLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IGY7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoMiAqIGZhciAqIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5vcnRobyA9IGZ1bmN0aW9uIChvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpLFxuICAgICAgICBidCA9IDEgLyAoYm90dG9tIC0gdG9wKSxcbiAgICAgICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFswXSA9IC0yICogbHI7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAtMiAqIGJ0O1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDIgKiBuZjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgICBvdXRbMTRdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgbG9vay1hdCBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gZXllIHBvc2l0aW9uLCBmb2NhbCBwb2ludCwgYW5kIHVwIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge3ZlYzN9IGV5ZSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXG4gKiBAcGFyYW0ge3ZlYzN9IGNlbnRlciBQb2ludCB0aGUgdmlld2VyIGlzIGxvb2tpbmcgYXRcbiAqIEBwYXJhbSB7dmVjM30gdXAgdmVjMyBwb2ludGluZyB1cFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lmxvb2tBdCA9IGZ1bmN0aW9uIChvdXQsIGV5ZSwgY2VudGVyLCB1cCkge1xuICAgIHZhciB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsZW4sXG4gICAgICAgIGV5ZXggPSBleWVbMF0sXG4gICAgICAgIGV5ZXkgPSBleWVbMV0sXG4gICAgICAgIGV5ZXogPSBleWVbMl0sXG4gICAgICAgIHVweCA9IHVwWzBdLFxuICAgICAgICB1cHkgPSB1cFsxXSxcbiAgICAgICAgdXB6ID0gdXBbMl0sXG4gICAgICAgIGNlbnRlcnggPSBjZW50ZXJbMF0sXG4gICAgICAgIGNlbnRlcnkgPSBjZW50ZXJbMV0sXG4gICAgICAgIGNlbnRlcnogPSBjZW50ZXJbMl07XG5cbiAgICBpZiAoTWF0aC5hYnMoZXlleCAtIGNlbnRlcngpIDwgR0xNQVRfRVBTSUxPTiAmJlxuICAgICAgICBNYXRoLmFicyhleWV5IC0gY2VudGVyeSkgPCBHTE1BVF9FUFNJTE9OICYmXG4gICAgICAgIE1hdGguYWJzKGV5ZXogLSBjZW50ZXJ6KSA8IEdMTUFUX0VQU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIG1hdDQuaWRlbnRpdHkob3V0KTtcbiAgICB9XG5cbiAgICB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICAgIHoxID0gZXlleSAtIGNlbnRlcnk7XG4gICAgejIgPSBleWV6IC0gY2VudGVyejtcblxuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQoejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyKTtcbiAgICB6MCAqPSBsZW47XG4gICAgejEgKj0gbGVuO1xuICAgIHoyICo9IGxlbjtcblxuICAgIHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICAgIGxlbiA9IE1hdGguc3FydCh4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHgwID0gMDtcbiAgICAgICAgeDEgPSAwO1xuICAgICAgICB4MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeDAgKj0gbGVuO1xuICAgICAgICB4MSAqPSBsZW47XG4gICAgICAgIHgyICo9IGxlbjtcbiAgICB9XG5cbiAgICB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICAgIHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgeTIgPSB6MCAqIHgxIC0gejEgKiB4MDtcblxuICAgIGxlbiA9IE1hdGguc3FydCh5MCAqIHkwICsgeTEgKiB5MSArIHkyICogeTIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHkwID0gMDtcbiAgICAgICAgeTEgPSAwO1xuICAgICAgICB5MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeTAgKj0gbGVuO1xuICAgICAgICB5MSAqPSBsZW47XG4gICAgICAgIHkyICo9IGxlbjtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSB4MDtcbiAgICBvdXRbMV0gPSB5MDtcbiAgICBvdXRbMl0gPSB6MDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHgxO1xuICAgIG91dFs1XSA9IHkxO1xuICAgIG91dFs2XSA9IHoxO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geDI7XG4gICAgb3V0WzldID0geTI7XG4gICAgb3V0WzEwXSA9IHoyO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XG4gICAgb3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcbiAgICBvdXRbMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQ0LnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICdtYXQ0KCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBhWzNdICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgIGFbNF0gKyAnLCAnICsgYVs1XSArICcsICcgKyBhWzZdICsgJywgJyArIGFbN10gKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgYVs4XSArICcsICcgKyBhWzldICsgJywgJyArIGFbMTBdICsgJywgJyArIGFbMTFdICsgJywgJyArIFxuICAgICAgICAgICAgICAgICAgICBhWzEyXSArICcsICcgKyBhWzEzXSArICcsICcgKyBhWzE0XSArICcsICcgKyBhWzE1XSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cbm1hdDQuZnJvYiA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuKE1hdGguc3FydChNYXRoLnBvdyhhWzBdLCAyKSArIE1hdGgucG93KGFbMV0sIDIpICsgTWF0aC5wb3coYVsyXSwgMikgKyBNYXRoLnBvdyhhWzNdLCAyKSArIE1hdGgucG93KGFbNF0sIDIpICsgTWF0aC5wb3coYVs1XSwgMikgKyBNYXRoLnBvdyhhWzZdLCAyKSArIE1hdGgucG93KGFbNl0sIDIpICsgTWF0aC5wb3coYVs3XSwgMikgKyBNYXRoLnBvdyhhWzhdLCAyKSArIE1hdGgucG93KGFbOV0sIDIpICsgTWF0aC5wb3coYVsxMF0sIDIpICsgTWF0aC5wb3coYVsxMV0sIDIpICsgTWF0aC5wb3coYVsxMl0sIDIpICsgTWF0aC5wb3coYVsxM10sIDIpICsgTWF0aC5wb3coYVsxNF0sIDIpICsgTWF0aC5wb3coYVsxNV0sIDIpICkpXG59O1xuXG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLm1hdDQgPSBtYXQ0O1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgUXVhdGVybmlvblxuICogQG5hbWUgcXVhdFxuICovXG5cbnZhciBxdWF0ID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBxdWF0XG4gKlxuICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAqL1xucXVhdC5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXRzIGEgcXVhdGVybmlvbiB0byByZXByZXNlbnQgdGhlIHNob3J0ZXN0IHJvdGF0aW9uIGZyb20gb25lXG4gKiB2ZWN0b3IgdG8gYW5vdGhlci5cbiAqXG4gKiBCb3RoIHZlY3RvcnMgYXJlIGFzc3VtZWQgdG8gYmUgdW5pdCBsZW5ndGguXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uLlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBpbml0aWFsIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBkZXN0aW5hdGlvbiB2ZWN0b3JcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGlvblRvID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB0bXB2ZWMzID0gdmVjMy5jcmVhdGUoKTtcbiAgICB2YXIgeFVuaXRWZWMzID0gdmVjMy5mcm9tVmFsdWVzKDEsMCwwKTtcbiAgICB2YXIgeVVuaXRWZWMzID0gdmVjMy5mcm9tVmFsdWVzKDAsMSwwKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICAgICAgdmFyIGRvdCA9IHZlYzMuZG90KGEsIGIpO1xuICAgICAgICBpZiAoZG90IDwgLTAuOTk5OTk5KSB7XG4gICAgICAgICAgICB2ZWMzLmNyb3NzKHRtcHZlYzMsIHhVbml0VmVjMywgYSk7XG4gICAgICAgICAgICBpZiAodmVjMy5sZW5ndGgodG1wdmVjMykgPCAwLjAwMDAwMSlcbiAgICAgICAgICAgICAgICB2ZWMzLmNyb3NzKHRtcHZlYzMsIHlVbml0VmVjMywgYSk7XG4gICAgICAgICAgICB2ZWMzLm5vcm1hbGl6ZSh0bXB2ZWMzLCB0bXB2ZWMzKTtcbiAgICAgICAgICAgIHF1YXQuc2V0QXhpc0FuZ2xlKG91dCwgdG1wdmVjMywgTWF0aC5QSSk7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9IGVsc2UgaWYgKGRvdCA+IDAuOTk5OTk5KSB7XG4gICAgICAgICAgICBvdXRbMF0gPSAwO1xuICAgICAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgICAgICBvdXRbM10gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZlYzMuY3Jvc3ModG1wdmVjMywgYSwgYik7XG4gICAgICAgICAgICBvdXRbMF0gPSB0bXB2ZWMzWzBdO1xuICAgICAgICAgICAgb3V0WzFdID0gdG1wdmVjM1sxXTtcbiAgICAgICAgICAgIG91dFsyXSA9IHRtcHZlYzNbMl07XG4gICAgICAgICAgICBvdXRbM10gPSAxICsgZG90O1xuICAgICAgICAgICAgcmV0dXJuIHF1YXQubm9ybWFsaXplKG91dCwgb3V0KTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFNldHMgdGhlIHNwZWNpZmllZCBxdWF0ZXJuaW9uIHdpdGggdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuXG4gKiBheGVzLiBFYWNoIGF4aXMgaXMgYSB2ZWMzIGFuZCBpcyBleHBlY3RlZCB0byBiZSB1bml0IGxlbmd0aCBhbmRcbiAqIHBlcnBlbmRpY3VsYXIgdG8gYWxsIG90aGVyIHNwZWNpZmllZCBheGVzLlxuICpcbiAqIEBwYXJhbSB7dmVjM30gdmlldyAgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHZpZXdpbmcgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHJpZ2h0IHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBsb2NhbCBcInJpZ2h0XCIgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHVwICAgIHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBsb2NhbCBcInVwXCIgZGlyZWN0aW9uXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuc2V0QXhlcyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgbWF0ciA9IG1hdDMuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCB2aWV3LCByaWdodCwgdXApIHtcbiAgICAgICAgbWF0clswXSA9IHJpZ2h0WzBdO1xuICAgICAgICBtYXRyWzNdID0gcmlnaHRbMV07XG4gICAgICAgIG1hdHJbNl0gPSByaWdodFsyXTtcblxuICAgICAgICBtYXRyWzFdID0gdXBbMF07XG4gICAgICAgIG1hdHJbNF0gPSB1cFsxXTtcbiAgICAgICAgbWF0cls3XSA9IHVwWzJdO1xuXG4gICAgICAgIG1hdHJbMl0gPSAtdmlld1swXTtcbiAgICAgICAgbWF0cls1XSA9IC12aWV3WzFdO1xuICAgICAgICBtYXRyWzhdID0gLXZpZXdbMl07XG5cbiAgICAgICAgcmV0dXJuIHF1YXQubm9ybWFsaXplKG91dCwgcXVhdC5mcm9tTWF0MyhvdXQsIG1hdHIpKTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHF1YXQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBxdWF0ZXJuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXRlcm5pb24gdG8gY2xvbmVcbiAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5jbG9uZSA9IHZlYzQuY2xvbmU7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBxdWF0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7cXVhdH0gYSBuZXcgcXVhdGVybmlvblxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuZnJvbVZhbHVlcyA9IHZlYzQuZnJvbVZhbHVlcztcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgcXVhdCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIHNvdXJjZSBxdWF0ZXJuaW9uXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5jb3B5ID0gdmVjNC5jb3B5O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHF1YXQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNldCA9IHZlYzQuc2V0O1xuXG4vKipcbiAqIFNldCBhIHF1YXQgdG8gdGhlIGlkZW50aXR5IHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0cyBhIHF1YXQgZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYW5kIHJvdGF0aW9uIGF4aXMsXG4gKiB0aGVuIHJldHVybnMgaXQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IGF4aXMgdGhlIGF4aXMgYXJvdW5kIHdoaWNoIHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgaW4gcmFkaWFuc1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICoqL1xucXVhdC5zZXRBeGlzQW5nbGUgPSBmdW5jdGlvbihvdXQsIGF4aXMsIHJhZCkge1xuICAgIHJhZCA9IHJhZCAqIDAuNTtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgb3V0WzBdID0gcyAqIGF4aXNbMF07XG4gICAgb3V0WzFdID0gcyAqIGF4aXNbMV07XG4gICAgb3V0WzJdID0gcyAqIGF4aXNbMl07XG4gICAgb3V0WzNdID0gTWF0aC5jb3MocmFkKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuYWRkID0gdmVjNC5hZGQ7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ4ID0gYlswXSwgYnkgPSBiWzFdLCBieiA9IGJbMl0sIGJ3ID0gYlszXTtcblxuICAgIG91dFswXSA9IGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnk7XG4gICAgb3V0WzFdID0gYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheCAqIGJ4IC0gYXkgKiBieSAtIGF6ICogYno7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBxdWF0Lm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQubXVsID0gcXVhdC5tdWx0aXBseTtcblxuLyoqXG4gKiBTY2FsZXMgYSBxdWF0IGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNjYWxlID0gdmVjNC5zY2FsZTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRlWCA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7IFxuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnggPSBNYXRoLnNpbihyYWQpLCBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXcgKiBieDtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXogKiBieDtcbiAgICBvdXRbMl0gPSBheiAqIGJ3IC0gYXkgKiBieDtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXggKiBieDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFkgYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRlWSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7IFxuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnkgPSBNYXRoLnNpbihyYWQpLCBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieTtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXggKiBieTtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXkgKiBieTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFogYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRlWiA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7IFxuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnogPSBNYXRoLnNpbihyYWQpLCBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXkgKiBiejtcbiAgICBvdXRbMV0gPSBheSAqIGJ3IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXcgKiBiejtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBXIGNvbXBvbmVudCBvZiBhIHF1YXQgZnJvbSB0aGUgWCwgWSwgYW5kIFogY29tcG9uZW50cy5cbiAqIEFzc3VtZXMgdGhhdCBxdWF0ZXJuaW9uIGlzIDEgdW5pdCBpbiBsZW5ndGguXG4gKiBBbnkgZXhpc3RpbmcgVyBjb21wb25lbnQgd2lsbCBiZSBpZ25vcmVkLlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIFcgY29tcG9uZW50IG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuY2FsY3VsYXRlVyA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXTtcblxuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IC1NYXRoLnNxcnQoTWF0aC5hYnMoMS4wIC0geCAqIHggLSB5ICogeSAtIHogKiB6KSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuZG90ID0gdmVjNC5kb3Q7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQubGVycCA9IHZlYzQubGVycDtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIHNwaGVyaWNhbCBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5zbGVycCA9IGZ1bmN0aW9uIChvdXQsIGEsIGIsIHQpIHtcbiAgICAvLyBiZW5jaG1hcmtzOlxuICAgIC8vICAgIGh0dHA6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tc2xlcnAtaW1wbGVtZW50YXRpb25zXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieCA9IGJbMF0sIGJ5ID0gYlsxXSwgYnogPSBiWzJdLCBidyA9IGJbM107XG5cbiAgICB2YXIgICAgICAgIG9tZWdhLCBjb3NvbSwgc2lub20sIHNjYWxlMCwgc2NhbGUxO1xuXG4gICAgLy8gY2FsYyBjb3NpbmVcbiAgICBjb3NvbSA9IGF4ICogYnggKyBheSAqIGJ5ICsgYXogKiBieiArIGF3ICogYnc7XG4gICAgLy8gYWRqdXN0IHNpZ25zIChpZiBuZWNlc3NhcnkpXG4gICAgaWYgKCBjb3NvbSA8IDAuMCApIHtcbiAgICAgICAgY29zb20gPSAtY29zb207XG4gICAgICAgIGJ4ID0gLSBieDtcbiAgICAgICAgYnkgPSAtIGJ5O1xuICAgICAgICBieiA9IC0gYno7XG4gICAgICAgIGJ3ID0gLSBidztcbiAgICB9XG4gICAgLy8gY2FsY3VsYXRlIGNvZWZmaWNpZW50c1xuICAgIGlmICggKDEuMCAtIGNvc29tKSA+IDAuMDAwMDAxICkge1xuICAgICAgICAvLyBzdGFuZGFyZCBjYXNlIChzbGVycClcbiAgICAgICAgb21lZ2EgID0gTWF0aC5hY29zKGNvc29tKTtcbiAgICAgICAgc2lub20gID0gTWF0aC5zaW4ob21lZ2EpO1xuICAgICAgICBzY2FsZTAgPSBNYXRoLnNpbigoMS4wIC0gdCkgKiBvbWVnYSkgLyBzaW5vbTtcbiAgICAgICAgc2NhbGUxID0gTWF0aC5zaW4odCAqIG9tZWdhKSAvIHNpbm9tO1xuICAgIH0gZWxzZSB7ICAgICAgICBcbiAgICAgICAgLy8gXCJmcm9tXCIgYW5kIFwidG9cIiBxdWF0ZXJuaW9ucyBhcmUgdmVyeSBjbG9zZSBcbiAgICAgICAgLy8gIC4uLiBzbyB3ZSBjYW4gZG8gYSBsaW5lYXIgaW50ZXJwb2xhdGlvblxuICAgICAgICBzY2FsZTAgPSAxLjAgLSB0O1xuICAgICAgICBzY2FsZTEgPSB0O1xuICAgIH1cbiAgICAvLyBjYWxjdWxhdGUgZmluYWwgdmFsdWVzXG4gICAgb3V0WzBdID0gc2NhbGUwICogYXggKyBzY2FsZTEgKiBieDtcbiAgICBvdXRbMV0gPSBzY2FsZTAgKiBheSArIHNjYWxlMSAqIGJ5O1xuICAgIG91dFsyXSA9IHNjYWxlMCAqIGF6ICsgc2NhbGUxICogYno7XG4gICAgb3V0WzNdID0gc2NhbGUwICogYXcgKyBzY2FsZTEgKiBidztcbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIG9mIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIGludmVyc2Ugb2ZcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLFxuICAgICAgICBkb3QgPSBhMCphMCArIGExKmExICsgYTIqYTIgKyBhMyphMyxcbiAgICAgICAgaW52RG90ID0gZG90ID8gMS4wL2RvdCA6IDA7XG4gICAgXG4gICAgLy8gVE9ETzogV291bGQgYmUgZmFzdGVyIHRvIHJldHVybiBbMCwwLDAsMF0gaW1tZWRpYXRlbHkgaWYgZG90ID09IDBcblxuICAgIG91dFswXSA9IC1hMCppbnZEb3Q7XG4gICAgb3V0WzFdID0gLWExKmludkRvdDtcbiAgICBvdXRbMl0gPSAtYTIqaW52RG90O1xuICAgIG91dFszXSA9IGEzKmludkRvdDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb25qdWdhdGUgb2YgYSBxdWF0XG4gKiBJZiB0aGUgcXVhdGVybmlvbiBpcyBub3JtYWxpemVkLCB0aGlzIGZ1bmN0aW9uIGlzIGZhc3RlciB0aGFuIHF1YXQuaW52ZXJzZSBhbmQgcHJvZHVjZXMgdGhlIHNhbWUgcmVzdWx0LlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIGNvbmp1Z2F0ZSBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmNvbmp1Z2F0ZSA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZW5ndGggPSB2ZWM0Lmxlbmd0aDtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQubGVuID0gcXVhdC5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNxdWFyZWRMZW5ndGggPSB2ZWM0LnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBxdWF0LnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5zcXJMZW4gPSBxdWF0LnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTm9ybWFsaXplIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXRlcm5pb24gdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5ub3JtYWxpemUgPSB2ZWM0Lm5vcm1hbGl6ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgcXVhdGVybmlvbiBmcm9tIHRoZSBnaXZlbiAzeDMgcm90YXRpb24gbWF0cml4LlxuICpcbiAqIE5PVEU6IFRoZSByZXN1bHRhbnQgcXVhdGVybmlvbiBpcyBub3Qgbm9ybWFsaXplZCwgc28geW91IHNob3VsZCBiZSBzdXJlXG4gKiB0byByZW5vcm1hbGl6ZSB0aGUgcXVhdGVybmlvbiB5b3Vyc2VsZiB3aGVyZSBuZWNlc3NhcnkuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge21hdDN9IG0gcm90YXRpb24gbWF0cml4XG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5mcm9tTWF0MyA9IGZ1bmN0aW9uKG91dCwgbSkge1xuICAgIC8vIEFsZ29yaXRobSBpbiBLZW4gU2hvZW1ha2UncyBhcnRpY2xlIGluIDE5ODcgU0lHR1JBUEggY291cnNlIG5vdGVzXG4gICAgLy8gYXJ0aWNsZSBcIlF1YXRlcm5pb24gQ2FsY3VsdXMgYW5kIEZhc3QgQW5pbWF0aW9uXCIuXG4gICAgdmFyIGZUcmFjZSA9IG1bMF0gKyBtWzRdICsgbVs4XTtcbiAgICB2YXIgZlJvb3Q7XG5cbiAgICBpZiAoIGZUcmFjZSA+IDAuMCApIHtcbiAgICAgICAgLy8gfHd8ID4gMS8yLCBtYXkgYXMgd2VsbCBjaG9vc2UgdyA+IDEvMlxuICAgICAgICBmUm9vdCA9IE1hdGguc3FydChmVHJhY2UgKyAxLjApOyAgLy8gMndcbiAgICAgICAgb3V0WzNdID0gMC41ICogZlJvb3Q7XG4gICAgICAgIGZSb290ID0gMC41L2ZSb290OyAgLy8gMS8oNHcpXG4gICAgICAgIG91dFswXSA9IChtWzddLW1bNV0pKmZSb290O1xuICAgICAgICBvdXRbMV0gPSAobVsyXS1tWzZdKSpmUm9vdDtcbiAgICAgICAgb3V0WzJdID0gKG1bM10tbVsxXSkqZlJvb3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gfHd8IDw9IDEvMlxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGlmICggbVs0XSA+IG1bMF0gKVxuICAgICAgICAgIGkgPSAxO1xuICAgICAgICBpZiAoIG1bOF0gPiBtW2kqMytpXSApXG4gICAgICAgICAgaSA9IDI7XG4gICAgICAgIHZhciBqID0gKGkrMSklMztcbiAgICAgICAgdmFyIGsgPSAoaSsyKSUzO1xuICAgICAgICBcbiAgICAgICAgZlJvb3QgPSBNYXRoLnNxcnQobVtpKjMraV0tbVtqKjMral0tbVtrKjMra10gKyAxLjApO1xuICAgICAgICBvdXRbaV0gPSAwLjUgKiBmUm9vdDtcbiAgICAgICAgZlJvb3QgPSAwLjUgLyBmUm9vdDtcbiAgICAgICAgb3V0WzNdID0gKG1bayozK2pdIC0gbVtqKjMra10pICogZlJvb3Q7XG4gICAgICAgIG91dFtqXSA9IChtW2oqMytpXSArIG1baSozK2pdKSAqIGZSb290O1xuICAgICAgICBvdXRba10gPSAobVtrKjMraV0gKyBtW2kqMytrXSkgKiBmUm9vdDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHF1YXRlbmlvblxuICpcbiAqIEBwYXJhbSB7cXVhdH0gdmVjIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKi9cbnF1YXQuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ3F1YXQoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIGFbM10gKyAnKSc7XG59O1xuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5xdWF0ID0gcXVhdDtcbn1cbjtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICB9KShzaGltLmV4cG9ydHMpO1xufSkodGhpcyk7XG4iLCIvKiEgamF2YS1kZXNlcmlhbGl6ZXIgMTktMDgtMjAxNSAqL1xyXG5cclxuIWZ1bmN0aW9uKGEpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWEoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYSk7ZWxzZXt2YXIgYjtiPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxiLkphdmFEZXNlcmlhbGl6ZXI9YSgpfX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gYShiLGMsZCl7ZnVuY3Rpb24gZShnLGgpe2lmKCFjW2ddKXtpZighYltnXSl7dmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighaCYmaSlyZXR1cm4gaShnLCEwKTtpZihmKXJldHVybiBmKGcsITApO3ZhciBqPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrZytcIidcIik7dGhyb3cgai5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGp9dmFyIGs9Y1tnXT17ZXhwb3J0czp7fX07YltnXVswXS5jYWxsKGsuZXhwb3J0cyxmdW5jdGlvbihhKXt2YXIgYz1iW2ddWzFdW2FdO3JldHVybiBlKGM/YzphKX0sayxrLmV4cG9ydHMsYSxiLGMsZCl9cmV0dXJuIGNbZ10uZXhwb3J0c31mb3IodmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxnPTA7ZzxkLmxlbmd0aDtnKyspZShkW2ddKTtyZXR1cm4gZX0oezE6W2Z1bmN0aW9uKGEsYixjKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBkKGEpe3JldHVybiBhJiZhLl9fZXNNb2R1bGU/YTp7XCJkZWZhdWx0XCI6YX19ZnVuY3Rpb24gZShhLGIpe2lmKCEoYSBpbnN0YW5jZW9mIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9T2JqZWN0LmRlZmluZVByb3BlcnR5KGMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGY9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEsYil7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspe3ZhciBkPWJbY107ZC5lbnVtZXJhYmxlPWQuZW51bWVyYWJsZXx8ITEsZC5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gZCYmKGQud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLGQua2V5LGQpfX1yZXR1cm4gZnVuY3Rpb24oYixjLGQpe3JldHVybiBjJiZhKGIucHJvdG90eXBlLGMpLGQmJmEoYixkKSxifX0oKSxnPWEoXCIuL3N0cmVhbS1yZWFkZXJcIiksaD1kKGcpLGk9NDQyNjksaj01LGs9MTEyLGw9MTEzLG09MTE0LG49MTE2LG89MTE3LHA9MTE5LHE9MTIwLHI9ODI1NzUzNixzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShiKXtlKHRoaXMsYSksdGhpcy5idWZmZXI9Yix0aGlzLnN0cmVhbT1uZXcgaFtcImRlZmF1bHRcIl0oYiksdGhpcy5yZXByPW51bGwsdGhpcy5yZWZzPVtdLHRoaXMuX2NoZWNrTWFnaWMoKX1yZXR1cm4gZihhLFt7a2V5OlwiX2NoZWNrTWFnaWNcIix2YWx1ZTpmdW5jdGlvbigpe2lmKHRoaXMuc3RyZWFtLnJlYWRVaW50MTYoKSE9PWkpdGhyb3dcImludmFsaWQgbWFnaWMgbnVtYmVyIVwiO2lmKHRoaXMuc3RyZWFtLnJlYWRVaW50MTYoKSE9PWopdGhyb3dcImludmFsaWQgdmVyc2lvbiFcIn19LHtrZXk6XCJfcmVhZENsYXNzRGVzY3JpcHRpb25cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPVwiQkNERklKU1pcIixiPXRoaXMuc3RyZWFtLnJlYWRVaW50OCgpLGM9e307aWYoYiE9PWspe2lmKGI9PT1sKXt2YXIgZD10aGlzLnN0cmVhbS5yZWFkVWludDMyKCktcjtyZXR1cm4gdGhpcy5yZWZzW2RdfWlmKGIhPT1tKXJldHVybiB2b2lkIGNvbnNvbGUubG9nKFwiSSBkb24ndCBrbm93IGhvdyB0byBoYW5kbGUgdGhpcyB0eXBlIHlldDogXCIrYik7Yy5uYW1lPXRoaXMuc3RyZWFtLnJlYWRVdGY4U3RyaW5nKCksYy52ZXJzaW9uSWQ9W3RoaXMuc3RyZWFtLnJlYWRVaW50MzIoKSx0aGlzLnN0cmVhbS5yZWFkVWludDMyKCldLGMuaGFuZGxlPXRoaXMucmVmcy5sZW5ndGgsYy5mbGFncz10aGlzLnN0cmVhbS5yZWFkVWludDgoKTtmb3IodmFyIGU9W10sZj10aGlzLnN0cmVhbS5yZWFkVWludDE2KCksZz0wO2Y+ZztnKyspe3ZhciBoPXt9O2gudHlwZT10aGlzLnN0cmVhbS5yZWFkVWludDgoKSxoLm5hbWU9dGhpcy5zdHJlYW0ucmVhZFV0ZjhTdHJpbmcoKSwtMT09PWEuaW5kZXhPZihTdHJpbmcuZnJvbUNoYXJDb2RlKGgudHlwZSkpJiZjb25zb2xlLmxvZyhcInRoaXMgaXMgbm90IGEgcHJpbWl0aXZlIHR5cGU6IFwiK2gudHlwZSksZS5wdXNoKGgpfXJldHVybiBjLmZpZWxkcz1lLGMuYW5ub3RhdGlvbj10aGlzLnN0cmVhbS5yZWFkVWludDgoKSxjLmFubm90YXRpb24hPT1xJiZjb25zb2xlLmxvZyhcIkkgZG9uJ3Qga25vdyB3aGF0IHRvIGRvIHdpdGggdGhpczogXCIrYy5hbm5vdGF0aW9uKSxjLnN1cGVyQ2xhc3M9dGhpcy5fcmVhZENsYXNzRGVzY3JpcHRpb24oKSx0aGlzLnJlZnMucHVzaChjKSxjfX19LHtrZXk6XCJfcmVhZEFycmF5XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYSxiLGM9e30sZD10aGlzLl9yZWFkQ2xhc3NEZXNjcmlwdGlvbigpO2MuZGVzY3JpcHRpb249ZCxjLmhhbmRsZT10aGlzLnJlZnMubGVuZ3RoLGI9dGhpcy5zdHJlYW0ucmVhZFVpbnQzMigpO3ZhciBlPWQubmFtZTtpZihcIltGXCI9PT1lKWMuZWxlbWVudHM9dGhpcy5zdHJlYW0ucmVhZEZsb2F0MzJBcnJheShiKTtlbHNlIGlmKFwiW1NcIj09PWUpYy5lbGVtZW50cz10aGlzLnN0cmVhbS5yZWFkVWludDE2QXJyYXkoYik7ZWxzZSBmb3IoYy5lbGVtZW50cz1bXSxhPTA7Yj5hO2ErKyl7dmFyIGY9dGhpcy5fcmVhZENodW5rKCk7Yy5lbGVtZW50cy5wdXNoKGYpfXJldHVybiB0aGlzLnJlZnMucHVzaChjKSxjfX0se2tleTpcIl9yZWFkQmxvY2tEYXRhXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnN0cmVhbS5yZWFkVWludDgoKTtyZXR1cm4gdGhpcy5zdHJlYW0ucmVhZFVpbnQ4QXJyYXkoYSl9fSx7a2V5OlwiX3JlYWRDaHVua1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5zdHJlYW0ucmVhZFVpbnQ4KCksYj1udWxsO3N3aXRjaChhKXtjYXNlIG86Yj10aGlzLl9yZWFkQXJyYXkoKTticmVhaztjYXNlIHA6Yj10aGlzLl9yZWFkQmxvY2tEYXRhKCk7YnJlYWs7Y2FzZSBuOmI9dGhpcy5zdHJlYW0ucmVhZFV0ZjhTdHJpbmcoKTticmVhaztkZWZhdWx0OmNvbnNvbGUubG9nKFwidW5oYW5kbGVkIHR5cGVcIil9cmV0dXJuIGJ9fSx7a2V5OlwiZ2V0Q29udGVudHNcIix2YWx1ZTpmdW5jdGlvbigpe2lmKHRoaXMucmVwcilyZXR1cm4gdGhpcy5yZXByO2Zvcih0aGlzLnJlcHI9W107dGhpcy5zdHJlYW0uZ2V0UG9zaXRpb24oKTx0aGlzLnN0cmVhbS5nZXRMZW5ndGgoKTspdGhpcy5yZXByLnB1c2godGhpcy5fcmVhZENodW5rKCkpO3JldHVybiB0aGlzLnJlcHJ9fV0pLGF9KCk7cy5WRVJTSU9OPVwiMC4yLjBcIixjW1wiZGVmYXVsdFwiXT1zLGIuZXhwb3J0cz1jW1wiZGVmYXVsdFwiXX0se1wiLi9zdHJlYW0tcmVhZGVyXCI6Mn1dLDI6W2Z1bmN0aW9uKGEsYixjKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBkKGEsYil7aWYoIShhIGluc3RhbmNlb2YgYikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoYyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgZT1mdW5jdGlvbigpe2Z1bmN0aW9uIGEoYSxiKXtmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl7dmFyIGQ9YltjXTtkLmVudW1lcmFibGU9ZC5lbnVtZXJhYmxlfHwhMSxkLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBkJiYoZC53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsZC5rZXksZCl9fXJldHVybiBmdW5jdGlvbihiLGMsZCl7cmV0dXJuIGMmJmEoYi5wcm90b3R5cGUsYyksZCYmYShiLGQpLGJ9fSgpLGY9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGIpe2QodGhpcyxhKSx0aGlzLmJ1ZmZlcj1iLHRoaXMuZGF0YXZpZXc9bmV3IERhdGFWaWV3KGIpLHRoaXMuY3VycmVudE9mZnNldD0wfXJldHVybiBlKGEsW3trZXk6XCJnZXRMZW5ndGhcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmRhdGF2aWV3LmJ5dGVMZW5ndGh9fSx7a2V5OlwiZ2V0UG9zaXRpb25cIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmN1cnJlbnRPZmZzZXR9fSx7a2V5OlwicmVhZFVpbnQzMlwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kYXRhdmlldy5nZXRVaW50MzIodGhpcy5jdXJyZW50T2Zmc2V0KTtyZXR1cm4gdGhpcy5jdXJyZW50T2Zmc2V0Kz00LGF9fSx7a2V5OlwicmVhZFVpbnQxNlwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kYXRhdmlldy5nZXRVaW50MTYodGhpcy5jdXJyZW50T2Zmc2V0KTtyZXR1cm4gdGhpcy5jdXJyZW50T2Zmc2V0Kz0yLGF9fSx7a2V5OlwicmVhZFVpbnQ4XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmRhdGF2aWV3LmdldFVpbnQ4KHRoaXMuY3VycmVudE9mZnNldCk7cmV0dXJuIHRoaXMuY3VycmVudE9mZnNldCsrLGF9fSx7a2V5OlwicmVhZEludDMyXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmRhdGF2aWV3LmdldEludDMyKHRoaXMuY3VycmVudE9mZnNldCk7cmV0dXJuIHRoaXMuY3VycmVudE9mZnNldCs9NCxhfX0se2tleTpcInJlYWRJbnQxNlwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kYXRhdmlldy5nZXRJbnQxNih0aGlzLmN1cnJlbnRPZmZzZXQpO3JldHVybiB0aGlzLmN1cnJlbnRPZmZzZXQrPTIsYX19LHtrZXk6XCJyZWFkSW50OFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kYXRhdmlldy5nZXRJbnQ4KHRoaXMuY3VycmVudE9mZnNldCk7cmV0dXJuIHRoaXMuY3VycmVudE9mZnNldCsrLGF9fSx7a2V5OlwicmVhZEZsb2F0MzJcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZGF0YXZpZXcuZ2V0RmxvYXQzMih0aGlzLmN1cnJlbnRPZmZzZXQpO3JldHVybiB0aGlzLmN1cnJlbnRPZmZzZXQrPTQsYX19LHtrZXk6XCJyZWFkVXRmOFN0cmluZ1wiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMucmVhZFVpbnQxNigpLGI9XCJcIixjPTA7YT5jO2MrKyliKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMucmVhZFVpbnQ4KCkpO3JldHVybiBifX0se2tleTpcInJlYWRGbG9hdDMyQXJyYXlcIix2YWx1ZTpmdW5jdGlvbihhKXtmb3IodmFyIGI9bmV3IEZsb2F0MzJBcnJheShhKSxjPTA7YT5jO2MrKyliW2NdPXRoaXMucmVhZEZsb2F0MzIoKTtyZXR1cm4gYn19LHtrZXk6XCJyZWFkVWludDE2QXJyYXlcIix2YWx1ZTpmdW5jdGlvbihhKXtmb3IodmFyIGI9bmV3IFVpbnQxNkFycmF5KGEpLGM9MDthPmM7YysrKWJbY109dGhpcy5yZWFkVWludDE2KCk7cmV0dXJuIGJ9fSx7a2V5OlwicmVhZFVpbnQ4QXJyYXlcIix2YWx1ZTpmdW5jdGlvbihhKXt2YXIgYj1uZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcix0aGlzLmN1cnJlbnRPZmZzZXQsYSk7cmV0dXJuIHRoaXMuY3VycmVudE9mZnNldCs9YSxifX1dKSxhfSgpO2NbXCJkZWZhdWx0XCJdPWYsYi5leHBvcnRzPWNbXCJkZWZhdWx0XCJdfSx7fV19LHt9LFsxXSkoMSl9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9amF2YS1kZXNlcmlhbGl6ZXIubWluLmpzLm1hcCIsIi8qISBsaWJ0Z2EgMTMtMDgtMjAxNSAqL1xyXG5cclxuIWZ1bmN0aW9uKGEsYil7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJleHBvcnRzXCIsXCJtb2R1bGVcIl0sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSliKGV4cG9ydHMsbW9kdWxlKTtlbHNle3ZhciBjPXtleHBvcnRzOnt9fTtiKGMuZXhwb3J0cyxjKSxhLmxpYnRnYT1jLmV4cG9ydHN9fSh0aGlzLGZ1bmN0aW9uKGEsYil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYyhhLGIpe2lmKCEoYSBpbnN0YW5jZW9mIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9dmFyIGQ9MTgsZT0wLGY9MSxnPTIsaD0zLGk9OCxqPTE1LGs9NDgsbD0xOTIsbT0yLG49MSxvPTIscD0xLHE9ZnVuY3Rpb24gcyhhKXtjKHRoaXMscyksdGhpcy5kYXRhdmlldz1uZXcgRGF0YVZpZXcoYSksdGhpcy5oZWFkZXI9cy5yZWFkSGVhZGVyKHRoaXMuZGF0YXZpZXcpLHRoaXMud2lkdGg9dGhpcy5oZWFkZXIuaW1hZ2VTcGVjLndpZHRoLHRoaXMuaGVpZ2h0PXRoaXMuaGVhZGVyLmltYWdlU3BlYy5oZWlnaHQsdGhpcy5jb21wcmVzc2VkPSEhKHRoaXMuaGVhZGVyLmltYWdlVHlwZSZpKSx0aGlzLmltYWdlSWQ9cy5yZWFkSW1hZ2VJZCh0aGlzLmRhdGF2aWV3LHRoaXMuaGVhZGVyKSx0aGlzLmNvbG9yTWFwPXMucmVhZENvbG9yTWFwKHRoaXMuZGF0YXZpZXcsdGhpcy5oZWFkZXIpLHRoaXMuaW1hZ2VEYXRhPXMucmVhZEltYWdlKHRoaXMpfTtxLkhFQURFUl9TSVpFPWQscS5JTUFHRV9UWVBFX05PTkU9ZSxxLklNQUdFX1RZUEVfQ09MT1JNQVBQRUQ9ZixxLklNQUdFX1RZUEVfVFJVRUNPTE9SPWcscS5JTUFHRV9UWVBFX0dSRVlTQ0FMRT1oLHEuSU1BR0VfUlVOTEVOR1RIX0VOQ09ERUQ9aSxxLnJlYWRIZWFkZXI9ZnVuY3Rpb24oYSl7dmFyIGI9e2lkTGVuZ3RoOmEuZ2V0VWludDgoMCwhMCksbWFwVHlwZTphLmdldFVpbnQ4KDEsITApLGltYWdlVHlwZTphLmdldFVpbnQ4KDIsITApLGNvbG9yTWFwU3BlYzpxLnJlYWRDb2xvck1hcFNwZWMoYSwzKSxpbWFnZVNwZWM6cS5yZWFkSW1hZ2VTcGVjKGEsOCl9O3JldHVybiBifSxxLnJlYWRDb2xvck1hcFNwZWM9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLmdldFVpbnQ4KGIrNCwhMCksZD17Zmlyc3RFbnRyeTphLmdldFVpbnQxNihiLCEwKSxsZW5ndGg6YS5nZXRVaW50MTYoYisyLCEwKSxlbnRyeVNpemVCaXRzOmMsZW50cnlTaXplQnl0ZXM6TWF0aC5mbG9vcigoYys3KS84KX07cmV0dXJuIGR9LHEucmVhZEltYWdlU3BlYz1mdW5jdGlvbihhLGIpe3ZhciBjPWEuZ2V0VWludDgoYis5KSxkPXt4T3JpZ2luOmEuZ2V0VWludDE2KGIsITApLHlPcmlnaW46YS5nZXRVaW50MTYoYisyLCEwKSx3aWR0aDphLmdldFVpbnQxNihiKzQsITApLGhlaWdodDphLmdldFVpbnQxNihiKzYsITApLHBpeGVsRGVwdGg6YS5nZXRVaW50OChiKzgpLGRlc2NyaXB0b3I6YyxhdHRyaWJ1dGVCaXRzOmMmaixvcmlnaW46KGMmayk+PjQsaW50ZXJsZWF2ZTooYyZsKT4+Nn07cmV0dXJuIGR9LHEucmVhZEltYWdlSWQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsZCxiLmlkTGVuZ3RoKX0scS5yZWFkQ29sb3JNYXA9ZnVuY3Rpb24oYSxiKXtpZihiLmNvbG9yTWFwU3BlYy5sZW5ndGg8PTApcmV0dXJuIG51bGw7dmFyIGM9bmV3IFVpbnQ4Q2xhbXBlZEFycmF5KDQqYi5jb2xvck1hcFNwZWMubGVuZ3RoKSxlPW51bGwsZj1kK2IuaWRMZW5ndGg7c3dpdGNoKGIuY29sb3JNYXBTcGVjLmVudHJ5U2l6ZUJpdHMpe2Nhc2UgODplPXEucmVhZFBpeGVsODticmVhaztjYXNlIDE2OmU9cS5yZWFkUGl4ZWwxNTticmVhaztjYXNlIDE1OmU9cS5yZWFkUGl4ZWwxNjticmVhaztjYXNlIDI0OmU9cS5yZWFkUGl4ZWwyNDticmVhaztjYXNlIDMyOmU9cS5yZWFkUGl4ZWwzMjticmVhaztkZWZhdWx0OnRocm93XCJVbnN1cHBvcnRlZCBwaXhlbCBkZXB0aFwifWZvcih2YXIgZz0wO2c8Yi5jb2xvck1hcFNwZWMubGVuZ3RoO2crKyllKGEsZixnLGMsZyk7cmV0dXJuIGN9LHEucmVhZFBpeGVsOD1mdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPWEuZ2V0VWludDgoYitjKTtkWzQqZSsyXT1mLGRbNCplKzFdPWYsZFs0KmUrMF09ZixkWzQqZSszXT0yNTV9LHEucmVhZFBpeGVsMTU9ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1hLmdldFVpbnQxNihiKzIqYywhMCk7ZFs0KmUrMl09KDMxJmYpPDwzLGRbNCplKzFdPShmPj41JjMxKTw8MyxkWzQqZSswXT0oZj4+MTAmMzEpPDwzLGRbNCplKzNdPTI1NX0scS5yZWFkUGl4ZWwxNj1mdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPWEuZ2V0VWludDE2KGIrMipjLCEwKTtkWzQqZSsyXT0oMzEmZik8PDMsZFs0KmUrMV09KGY+PjUmMzEpPDwzLGRbNCplKzBdPShmPj4xMCYzMSk8PDMsZFs0KmUrM109MTI4PT0oMTI4JmYpPzI1NTowfSxxLnJlYWRQaXhlbDI0PWZ1bmN0aW9uKGEsYixjLGQsZSl7ZFs0KmUrMl09YS5nZXRVaW50OChiKzMqYyswKSxkWzQqZSsxXT1hLmdldFVpbnQ4KGIrMypjKzEpLGRbNCplKzBdPWEuZ2V0VWludDgoYiszKmMrMiksZFs0KmUrM109MjU1fSxxLnJlYWRQaXhlbDMyPWZ1bmN0aW9uKGEsYixjLGQsZSl7ZFs0KmUrMl09YS5nZXRVaW50OChiKzQqYyswKSxkWzQqZSsxXT1hLmdldFVpbnQ4KGIrNCpjKzEpLGRbNCplKzBdPWEuZ2V0VWludDgoYis0KmMrMiksZFs0KmUrM109MjU1fSxxLnJlYWRNYXBwZWRQaXhlbDg9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7dmFyIGg9YS5nZXRVaW50OChkK2UpK2M7Zls0KmcrMF09Yls0KmgrMF0sZls0KmcrMV09Yls0KmgrMV0sZls0KmcrMl09Yls0KmgrMl0sZls0KmcrM109Yls0KmgrM119LHEucmVhZE1hcHBlZFBpeGVsMTU9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7dmFyIGg9YS5nZXRVaW50MTYoZCsyKmUsITApK2M7Zls0KmcrMF09Yls0KmgrMF0sZls0KmcrMV09Yls0KmgrMV0sZls0KmcrMl09Yls0KmgrMl0sZls0KmcrM109Yls0KmgrM119LHEucmVhZE1hcHBlZFBpeGVsMTY9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7dmFyIGg9YS5nZXRVaW50MTYoZCsyKmUsITApK2M7Zls0KmcrMF09Yls0KmgrMF0sZls0KmcrMV09Yls0KmgrMV0sZls0KmcrMl09Yls0KmgrMl0sZls0KmcrM109Yls0KmgrM119LHEucmVhZE1hcHBlZFBpeGVsMjQ9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7dmFyIGg9YS5nZXRVaW50MTYoZCsyKmUsITApK2M7Zls0KmcrMF09Yls0KmgrMF0sZls0KmcrMV09Yls0KmgrMV0sZls0KmcrMl09Yls0KmgrMl0sZls0KmcrM109Yls0KmgrM119LHEucmVhZE1hcHBlZFBpeGVsMzI9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7dmFyIGg9YS5nZXRVaW50MTYoZCsyKmUsITApK2M7Zls0KmcrMF09Yls0KmgrMF0sZls0KmcrMV09Yls0KmgrMV0sZls0KmcrMl09Yls0KmgrMl0sZls0KmcrM109Yls0KmgrM119LHEucmVhZFJMRUltYWdlPWZ1bmN0aW9uKCl7dGhyb3dcIk5ZSVwifSxxLnJlYWRDb2xvcm1hcHBlZEltYWdlPWZ1bmN0aW9uKGEpe3ZhciBiPWEuZGF0YXZpZXcsYz1hLmhlYWRlcixlPWEuY29sb3JNYXAsZj1jLmltYWdlU3BlYy53aWR0aCxnPWMuaW1hZ2VTcGVjLmhlaWdodCxoPW5ldyBVaW50OENsYW1wZWRBcnJheShmKmcqNCksaT1jLmltYWdlU3BlYy5waXhlbERlcHRoLGo9ZCtjLmlkTGVuZ3RoK2MuY29sb3JNYXBTcGVjLmxlbmd0aCpjLmNvbG9yTWFwU3BlYy5lbnRyeVNpemVCeXRlcyxrPWMuY29sb3JNYXBTcGVjLmZpcnN0RW50cnksbD1udWxsLHI9KGMuaW1hZ2VTcGVjLm9yaWdpbiZtKT09PW8/MTotMSxzPShjLmltYWdlU3BlYy5vcmlnaW4mbik9PT1wPy0xOjE7aWYoIWUpdGhyb3dcIkltYWdlIGlzIGRlc2NyaWJlZCBhcyBjb2xvci1tYXBwZWQsIGJ1dCBoYXMgbm8gbWFwXCI7c3dpdGNoKGkpe2Nhc2UgODpsPXEucmVhZE1hcHBlZFBpeGVsODticmVhaztjYXNlIDE2Omw9cS5yZWFkTWFwcGVkUGl4ZWwxNTticmVhaztjYXNlIDE1Omw9cS5yZWFkTWFwcGVkUGl4ZWwxNjticmVhaztjYXNlIDI0Omw9cS5yZWFkTWFwcGVkUGl4ZWwyNDticmVhaztjYXNlIDMyOmw9cS5yZWFkTWFwcGVkUGl4ZWwzMjticmVhaztkZWZhdWx0OnRocm93XCJVbnN1cHBvcnRlZCBwaXhlbCBkZXB0aFwifXZhciB0LHUsdix3O3I+MD8odD0wLHU9Zyk6KHQ9Zy0xLHU9LTEpLHM+MD8odj0wLHc9Zik6KHY9Zi0xLHc9LTEpO2Zvcih2YXIgeCx5PTAsej10O3ohPXU7eis9cil7eD0wO2Zvcih2YXIgQT12O0EhPXc7QSs9cylsKGIsZSxrLGoseipmK0EsaCx5KmYreCsrKTt5Kyt9cmV0dXJuIGh9LHEucmVhZFRydWVjb2xvckltYWdlPWZ1bmN0aW9uKGEpe3ZhciBiPWEuaGVhZGVyLGM9YS5kYXRhdmlldyxlPWIuaW1hZ2VTcGVjLndpZHRoLGY9Yi5pbWFnZVNwZWMuaGVpZ2h0LGc9bmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGUqZio0KSxoPWIuaW1hZ2VTcGVjLnBpeGVsRGVwdGgsaT1kK2IuaWRMZW5ndGgrYi5jb2xvck1hcFNwZWMubGVuZ3RoKmIuY29sb3JNYXBTcGVjLmVudHJ5U2l6ZUJ5dGVzLGo9bnVsbCxrPShiLmltYWdlU3BlYy5vcmlnaW4mbSk9PT1vPzE6LTEsbD0oYi5pbWFnZVNwZWMub3JpZ2luJm4pPT09cD8tMToxO3N3aXRjaChoKXtjYXNlIDg6aj1xLnJlYWRQaXhlbDg7YnJlYWs7Y2FzZSAxNjpqPXEucmVhZFBpeGVsMTU7YnJlYWs7Y2FzZSAxNTpqPXEucmVhZFBpeGVsMTY7YnJlYWs7Y2FzZSAyNDpqPXEucmVhZFBpeGVsMjQ7YnJlYWs7Y2FzZSAzMjpqPXEucmVhZFBpeGVsMzI7YnJlYWs7ZGVmYXVsdDp0aHJvd1wiVW5zdXBwb3J0ZWQgcGl4ZWwgZGVwdGhcIn12YXIgcixzLHQsdTtrPjA/KHI9MCxzPWYpOihyPWYtMSxzPS0xKSxsPjA/KHQ9MCx1PWUpOih0PWUtMSx1PS0xKTtmb3IodmFyIHYsdz0wLHg9cjt4IT1zO3grPWspe3Y9MDtmb3IodmFyIHk9dDt5IT11O3krPWwpaihjLGkseCplK3ksZyx3KmUrdisrKTt3Kyt9cmV0dXJuIGd9LHEucmVhZEltYWdlPWZ1bmN0aW9uKGEpe2lmKGEuaGVhZGVyLmNvbXByZXNzZWQpcmV0dXJuIHEucmVhZFJMRUltYWdlKGEpO2lmKDA9PT1hLmhlYWRlci5tYXBUeXBlKXJldHVybiBxLnJlYWRUcnVlY29sb3JJbWFnZShhKTtpZigxPT09YS5oZWFkZXIubWFwVHlwZSlyZXR1cm4gcS5yZWFkQ29sb3JtYXBwZWRJbWFnZShhKTt0aHJvd1wiVW5zdXBwb3J0ZWQgbWFwIHR5cGVcIn07dmFyIHI9e3JlYWRGaWxlOmZ1bmN0aW9uKGEpe3JldHVybiBuZXcgcShhKX0sbG9hZEZpbGU6ZnVuY3Rpb24oYSxiKXt2YXIgYz1uZXcgWE1MSHR0cFJlcXVlc3Q7Yy5vcGVuKFwiR0VUXCIsYSksYy5yZXNwb25zZVR5cGU9XCJhcnJheWJ1ZmZlclwiLGMub25sb2FkPWZ1bmN0aW9uKCl7YihudWxsLG5ldyBxKHRoaXMucmVzcG9uc2UpKX0sYy5vbmVycm9yPWZ1bmN0aW9uKGEpe2IoYSxudWxsKX0sYy5zZW5kKCl9LFRHQTpxLFZFUlNJT046XCIwLjMuMVwifTtiLmV4cG9ydHM9cn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1saWJ0Z2EubWluLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmV4cG9ydHMubG9hZFJlc291cmNlID0gbG9hZFJlc291cmNlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgX2xpYnRnYSA9IHJlcXVpcmUoJ2xpYnRnYScpO1xuXG52YXIgX2xpYnRnYTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saWJ0Z2EpO1xuXG5mdW5jdGlvbiBsb2FkUmVzb3VyY2UodXJsLCB0eXBlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZSA9PT0gJ2ltYWdlJyB8fCB0eXBlID09PSAnaW1hZ2UuY28nKSB7XG4gICAgaWYgKC9cXC50Z2EkLy50ZXN0KHVybCkpIHtcbiAgICAgIF9saWJ0Z2EyWydkZWZhdWx0J10ubG9hZEZpbGUodXJsLCBmdW5jdGlvbiAoZXJyLCB0Z2EpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IGNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRnYS53aWR0aCwgdGdhLmhlaWdodCk7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhLnNldCh0Z2EuaW1hZ2VEYXRhKTtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRnYS5oZWlnaHQ7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRnYS53aWR0aDtcbiAgICAgICAgY29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCB0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgY2FsbGJhY2soZSwgbnVsbCk7XG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaSA9IG5ldyBJbWFnZSgpO1xuICAgICAgLy8gY3Jvc3Mtb3JpZ2luIGltYWdlOlxuICAgICAgaWYgKHR5cGUgPT09ICdpbWFnZS5jbycpIHtcbiAgICAgICAgaS5jcm9zc09yaWdpbiA9ICdhbm95bW91cyc7XG4gICAgICB9XG4gICAgICBpLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdGhpcyk7XG4gICAgICB9O1xuICAgICAgaS5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY2FsbGJhY2soZSwgbnVsbCk7XG4gICAgICB9O1xuICAgICAgaS5zcmMgPSB1cmw7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gdHlwZTtcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2sobnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBjYWxsYmFjayhlLCBudWxsKTtcbiAgICB9O1xuXG4gICAgeGhyLnNlbmQoKTtcbiAgfVxufVxuXG52YXIgQXNzZXRMb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBc3NldExvYWRlcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXNzZXRMb2FkZXIpO1xuXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgdGhpcy5fYXNzZXRzID0ge307XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXNzZXRMb2FkZXIsIFt7XG4gICAga2V5OiAnbG9hZEFzc2V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZEFzc2V0KHVybCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBuYW1lID0gJ18nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgICBpZiAodGhpcy5fYXNzZXRzW25hbWVdKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHRoaXMuX2Fzc2V0c1tuYW1lXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NhbGxiYWNrc1tuYW1lXSA9IHRoaXMuX2NhbGxiYWNrc1tuYW1lXSB8fCBbXTtcbiAgICAgIHRoaXMuX2NhbGxiYWNrc1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIGlmICghdGhpcy5fYXNzZXRzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHRoaXMuX2Fzc2V0c1tuYW1lXSA9IGZhbHNlO1xuICAgICAgICBsb2FkUmVzb3VyY2UodXJsLCB0eXBlLCBmdW5jdGlvbiAoZXJyLCB2YWx1ZSkge1xuICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICBfdGhpcy5fYXNzZXRzW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjYjtcbiAgICAgICAgICB3aGlsZSAoY2IgPSBfdGhpcy5fY2FsbGJhY2tzW25hbWVdLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgIGNiKGVyciwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbG9hZEFzc2V0R3JvdXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkQXNzZXRHcm91cCh1cmxzLCB0eXBlcywgY2FsbGJhY2spIHtcbiAgICAgIGlmICh1cmxzLmxlbmd0aCAhPT0gdHlwZXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgdHlwZXM6IHR5cGVzLmxlbmd0aCA9ICcgKyB0eXBlcy5sZW5ndGggKyAnOyB1cmxzLmxlbmd0aCA9ICcgKyB1cmxzLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHZhciBsZW4gPSB1cmxzLmxlbmd0aCxcbiAgICAgICAgICByZXN1bHRzID0gbmV3IEFycmF5KGxlbik7XG4gICAgICB2YXIgb25FYWNoID0gZnVuY3Rpb24gb25FYWNoKGlkeCwgZXJyLCB2YWx1ZSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyLCBudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0c1tpZHhdID0gdmFsdWU7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgciA9IHRydWU7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHIgPSByICYmIHJlc3VsdHNbaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmxvYWRBc3NldCh1cmxzW2ldLCB0eXBlc1tpXSwgb25FYWNoLmJpbmQodW5kZWZpbmVkLCBpKSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0QXNzZXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBc3NldChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXNzZXRzW25hbWVdO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBc3NldExvYWRlcjtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFzc2V0TG9hZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJvdW5kID0gcmVxdWlyZSgnLi9nbC1ib3VuZCcpO1xuXG52YXIgX2dsQm91bmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCb3VuZCk7XG5cbnZhciBfYXNzZXRMb2FkZXIgPSByZXF1aXJlKCcuL2Fzc2V0LWxvYWRlcicpO1xuXG52YXIgX2Fzc2V0TG9hZGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2V0TG9hZGVyKTtcblxudmFyIF9tZXNoRmlsZSA9IHJlcXVpcmUoJy4vbWVzaC9maWxlJyk7XG5cbnZhciBfbWVzaEZpbGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaEZpbGUpO1xuXG52YXIgX3RleHR1cmUgPSByZXF1aXJlKCcuL3RleHR1cmUnKTtcblxudmFyIF90ZXh0dXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmUpO1xuXG52YXIgX3Byb2dyYW0gPSByZXF1aXJlKCcuL3Byb2dyYW0nKTtcblxudmFyIF9wcm9ncmFtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb2dyYW0pO1xuXG52YXIgX3Byb2dyYW1HbG93cmFtcCA9IHJlcXVpcmUoJy4vcHJvZ3JhbS9nbG93cmFtcCcpO1xuXG52YXIgX3Byb2dyYW1HbG93cmFtcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtR2xvd3JhbXApO1xuXG52YXIgX3Byb2dyYW1PcGFxdWUgPSByZXF1aXJlKCcuL3Byb2dyYW0vb3BhcXVlJyk7XG5cbnZhciBfcHJvZ3JhbU9wYXF1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtT3BhcXVlKTtcblxudmFyIF9wcm9ncmFtcyA9IHtcbiAgJ0dsb3dyYW1wJzogX3Byb2dyYW1HbG93cmFtcDJbJ2RlZmF1bHQnXSxcbiAgJ09wYXF1ZSc6IF9wcm9ncmFtT3BhcXVlMlsnZGVmYXVsdCddXG59O1xuXG5mdW5jdGlvbiBhcmVMb2FkaW5nKG4sIGUpIHtcbiAgaWYgKGUgPT09IDApIHtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGFyZUxvYWRlZChuLCBlKSB7XG4gIGlmIChlID4gMCkge1xuICAgIG4rKztcbiAgfVxuICByZXR1cm4gbjtcbn1cblxuZnVuY3Rpb24gYXJlRXJyb3IobiwgZSkge1xuICBpZiAoZSA8IDApIHtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIHN1bW1hcml6ZShxdWV1ZSkge1xuICByZXR1cm4ge1xuICAgIHRvdGFsOiBxdWV1ZS5sZW5ndGgsXG4gICAgbG9hZGluZzogcXVldWUucmVkdWNlKGFyZUxvYWRpbmcsIDApLFxuICAgIGxvYWRlZDogcXVldWUucmVkdWNlKGFyZUxvYWRlZCwgMCksXG4gICAgZXJyb3I6IHF1ZXVlLnJlZHVjZShhcmVFcnJvciwgMClcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2ltcGxlTWVyZ2UobGVmdCwgcmlnaHQpIHtcbiAgbGVmdCA9IGxlZnQgfHwge307XG4gIGZvciAodmFyIGkgaW4gcmlnaHQpIHtcbiAgICBsZWZ0W2ldID0gcmlnaHRbaV07XG4gIH1cbiAgcmV0dXJuIGxlZnQ7XG59XG5cbmZ1bmN0aW9uIG1lcmdlTWFuaWZlc3RzKGJhc2UsIGFkZCkge1xuICB2YXIga2V5cyA9IFsndGV4dHVyZScsICdtZXNoJywgJ3Byb2dyYW0nLCAncmF3UHJvZ3JhbSddO1xuICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgaW4gYWRkKSB7XG4gICAgICBiYXNlW2tleV0gPSBzaW1wbGVNZXJnZShiYXNlW2tleV0sIGFkZFtrZXldKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYmFzZTtcbn1cblxudmFyIEFzc2V0TWFuYWdlciA9IChmdW5jdGlvbiAoX0dMQm91bmQpIHtcbiAgX2luaGVyaXRzKEFzc2V0TWFuYWdlciwgX0dMQm91bmQpO1xuXG4gIGZ1bmN0aW9uIEFzc2V0TWFuYWdlcihnbCwgbWFuaWZlc3QpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXNzZXRNYW5hZ2VyKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFzc2V0TWFuYWdlci5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsKTtcbiAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgX2Fzc2V0TG9hZGVyMlsnZGVmYXVsdCddKCk7XG4gICAgdGhpcy50ZXh0dXJlcyA9IHt9O1xuICAgIHRoaXMubWVzaGVzID0ge307XG4gICAgdGhpcy5wcm9ncmFtcyA9IHt9O1xuICAgIHRoaXMucXVldWVzID0ge1xuICAgICAgdGV4dHVyZTogW10sXG4gICAgICBtZXNoOiBbXSxcbiAgICAgIHByb2dyYW06IFtdXG4gICAgfTtcbiAgICB0aGlzLnN0YXRzID0ge1xuICAgICAgdGV4dHVyZToge30sXG4gICAgICBtZXNoOiB7fSxcbiAgICAgIHByb2dyYW06IHt9LFxuICAgICAgcmF3UHJvZ3JhbToge31cbiAgICB9O1xuICAgIHRoaXMuY29tcGxldGUgPSBudWxsO1xuICAgIHRoaXMucGF0aCA9ICcvYXNzZXRzLyc7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXNzZXRNYW5hZ2VyLCBbe1xuICAgIGtleTogJ19pc0NvbXBsZXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2lzQ29tcGxldGUoKSB7XG4gICAgICB2YXIgc3RhdHVzID0gdGhpcy5nZXRTdGF0dXMoKTtcbiAgICAgIGlmICh0aGlzLmNvbXBsZXRlICYmIHN0YXR1cy50ZXh0dXJlLmxvYWRpbmcgPT09IDAgJiYgc3RhdHVzLm1lc2gubG9hZGluZyA9PT0gMCAmJiBzdGF0dXMucHJvZ3JhbS5sb2FkaW5nID09PSAwKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGRBc3NldHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRBc3NldHMobWFuaWZlc3QpIHtcbiAgICAgIHRoaXMubWFuaWZlc3QgPSBtZXJnZU1hbmlmZXN0cyh0aGlzLm1hbmlmZXN0LCBtYW5pZmVzdCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYWRkVGV4dHVyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFRleHR1cmUobmFtZSwgdGV4dHVyZSkge1xuICAgICAgdGhpcy50ZXh0dXJlc1tuYW1lXSA9IHRleHR1cmU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYWRkTWVzaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZE1lc2gobmFtZSwgbWVzaCkge1xuICAgICAgdGhpcy5tZXNoZXNbbmFtZV0gPSBtZXNoO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FkZFByb2dyYW0nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRQcm9ncmFtKG5hbWUsIHByb2dyYW0pIHtcbiAgICAgIHRoaXMucHJvZ3JhbXNbbmFtZV0gPSBwcm9ncmFtO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hhbmRsZVRleHR1cmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUZXh0dXJlKGlkeCwgbmFtZSwgaW5mbywgZXJyLCB2YWx1ZSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICB0aGlzLnF1ZXVlcy50ZXh0dXJlW2lkeF0gPSAtMTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB0aHJvdyAnQ291bGQgbm90IGxvYWQgJyArIG5hbWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWRkVGV4dHVyZShuYW1lLCBuZXcgX3RleHR1cmUyWydkZWZhdWx0J10odGhpcy5fZ2wsIGluZm8sIHZhbHVlKSk7XG4gICAgICB0aGlzLnF1ZXVlcy50ZXh0dXJlW2lkeF0gPSAxO1xuICAgICAgdGhpcy5faXNDb21wbGV0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hhbmRsZU1lc2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNZXNoKGlkeCwgbmFtZSwgaW5mbywgZXJyLCB2YWx1ZSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICB0aGlzLnF1ZXVlcy5tZXNoW2lkeF0gPSAtMTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB0aHJvdyAnQ291bGQgbm90IGxvYWQgJyArIG5hbWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWRkTWVzaChuYW1lLCBuZXcgX21lc2hGaWxlMlsnZGVmYXVsdCddKHRoaXMuX2dsLCB2YWx1ZSkpO1xuICAgICAgdGhpcy5xdWV1ZXMubWVzaFtpZHhdID0gMTtcbiAgICAgIHRoaXMuX2lzQ29tcGxldGUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVQcm9ncmFtJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShuYW1lLCBpbmZvKSB7XG4gICAgICB2YXIgS2xhc3MgPSBfcHJvZ3JhbTJbJ2RlZmF1bHQnXTtcbiAgICAgIGlmIChpbmZvLnByb2dyYW0gaW4gX3Byb2dyYW1zKSB7XG4gICAgICAgIEtsYXNzID0gX3Byb2dyYW1zW2luZm8ucHJvZ3JhbV07XG4gICAgICB9XG4gICAgICB0aGlzLmFkZFByb2dyYW0obmFtZSwgbmV3IEtsYXNzKHRoaXMuX2dsLCBpbmZvLnZlcnRleCwgaW5mby5mcmFnbWVudCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hhbmRsZVByb2dyYW0nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVQcm9ncmFtKGlkeCwgbmFtZSwgaW5mbywgZXJyLCB2YWxzKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRoaXMucXVldWVzLnByb2dyYW1baWR4XSA9IC0xO1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHRocm93ICdDb3VsZCBub3QgbG9hZCAnICsgbmFtZTtcbiAgICAgIH1cblxuICAgICAgdmFyIEtsYXNzID0gX3Byb2dyYW0yWydkZWZhdWx0J107XG4gICAgICBpZiAoaW5mby5wcm9ncmFtIGluIF9wcm9ncmFtcykge1xuICAgICAgICBLbGFzcyA9IF9wcm9ncmFtc1tpbmZvLnByb2dyYW1dO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRQcm9ncmFtKG5hbWUsIG5ldyBLbGFzcyh0aGlzLl9nbCwgdmFsc1swXSwgdmFsc1sxXSkpO1xuICAgICAgdGhpcy5xdWV1ZXMucHJvZ3JhbVtpZHhdID0gMTtcbiAgICAgIHRoaXMuX2lzQ29tcGxldGUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRUZXh0dXJlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VGV4dHVyZShuYW1lKSB7XG4gICAgICB2YXIgdGV4dHVyZSA9IHRoaXMudGV4dHVyZXNbbmFtZV07XG4gICAgICBpZiAodGV4dHVyZSkge1xuICAgICAgICB0aGlzLnN0YXRzLnRleHR1cmVbbmFtZV0gPSAodGhpcy5zdGF0cy50ZXh0dXJlW25hbWVdIHx8IDApICsgMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldE1lc2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRNZXNoKG5hbWUpIHtcbiAgICAgIHZhciBtZXNoID0gdGhpcy5tZXNoZXNbbmFtZV07XG4gICAgICBpZiAobWVzaCkge1xuICAgICAgICB0aGlzLnN0YXRzLm1lc2hbbmFtZV0gPSAodGhpcy5zdGF0cy5tZXNoW25hbWVdIHx8IDApICsgMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZXNoO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFByb2dyYW0nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQcm9ncmFtKG5hbWUpIHtcbiAgICAgIHZhciBwcm9nID0gdGhpcy5wcm9ncmFtc1tuYW1lXTtcbiAgICAgIGlmIChwcm9nKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRzLnJhd1Byb2dyYW0uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICB0aGlzLnN0YXRzLnJhd1Byb2dyYW1bbmFtZV0rKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0YXRzLnByb2dyYW1bbmFtZV0gPSAodGhpcy5zdGF0cy5wcm9ncmFtW25hbWVdIHx8IDApICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2c7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbG9hZEFsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRBbGwoY2FsbGJhY2spIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGFzc2V0LFxuICAgICAgICAgIG1hbmlmZXN0ID0gdGhpcy5tYW5pZmVzdDtcbiAgICAgIHRoaXMuY29tcGxldGUgPSBjYWxsYmFjaztcbiAgICAgIGZvciAoaSBpbiBtYW5pZmVzdC50ZXh0dXJlKSB7XG4gICAgICAgIGlmIChtYW5pZmVzdC50ZXh0dXJlLmhhc093blByb3BlcnR5KGkpICYmICEoaSBpbiB0aGlzLnRleHR1cmVzKSkge1xuICAgICAgICAgIHRoaXMudGV4dHVyZXNbaV0gPSBudWxsO1xuICAgICAgICAgIGFzc2V0ID0gbWFuaWZlc3QudGV4dHVyZVtpXTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkQXNzZXQoKCFhc3NldFsnc3RhdGljJ10gPyB0aGlzLnBhdGggOiAnJykgKyBhc3NldC5wYXRoLCAnaW1hZ2UnLCB0aGlzLmhhbmRsZVRleHR1cmUuYmluZCh0aGlzLCB0aGlzLnF1ZXVlcy50ZXh0dXJlLmxlbmd0aCwgaSwgYXNzZXQpKTtcbiAgICAgICAgICB0aGlzLnF1ZXVlcy50ZXh0dXJlLnB1c2goMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoaSBpbiBtYW5pZmVzdC5tZXNoKSB7XG4gICAgICAgIGlmIChtYW5pZmVzdC5tZXNoLmhhc093blByb3BlcnR5KGkpICYmICEoaSBpbiB0aGlzLm1lc2hlcykpIHtcbiAgICAgICAgICB0aGlzLm1lc2hlc1tpXSA9IG51bGw7XG4gICAgICAgICAgYXNzZXQgPSBtYW5pZmVzdC5tZXNoW2ldO1xuICAgICAgICAgIHRoaXMubG9hZGVyLmxvYWRBc3NldCgoIWFzc2V0WydzdGF0aWMnXSA/IHRoaXMucGF0aCA6ICcnKSArIGFzc2V0LnBhdGgsICdhcnJheWJ1ZmZlcicsIHRoaXMuaGFuZGxlTWVzaC5iaW5kKHRoaXMsIHRoaXMucXVldWVzLm1lc2gubGVuZ3RoLCBpLCBhc3NldCkpO1xuICAgICAgICAgIHRoaXMucXVldWVzLm1lc2gucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChpIGluIG1hbmlmZXN0LnByb2dyYW0pIHtcbiAgICAgICAgaWYgKG1hbmlmZXN0LnByb2dyYW0uaGFzT3duUHJvcGVydHkoaSkgJiYgIShpIGluIHRoaXMucHJvZ3JhbXMpKSB7XG4gICAgICAgICAgdGhpcy5wcm9ncmFtc1tpXSA9IG51bGw7XG4gICAgICAgICAgYXNzZXQgPSBtYW5pZmVzdC5wcm9ncmFtW2ldO1xuICAgICAgICAgIHRoaXMubG9hZGVyLmxvYWRBc3NldEdyb3VwKFsoIWFzc2V0WydzdGF0aWMnXSA/IHRoaXMucGF0aCA6ICcnKSArIGFzc2V0LnZlcnRleCwgKCFhc3NldFsnc3RhdGljJ10gPyB0aGlzLnBhdGggOiAnJykgKyBhc3NldC5mcmFnbWVudF0sIFsndGV4dCcsICd0ZXh0J10sIHRoaXMuaGFuZGxlUHJvZ3JhbS5iaW5kKHRoaXMsIHRoaXMucXVldWVzLnByb2dyYW0ubGVuZ3RoLCBpLCBhc3NldCkpO1xuICAgICAgICAgIHRoaXMucXVldWVzLnByb2dyYW0ucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChpIGluIG1hbmlmZXN0LnJhd1Byb2dyYW0pIHtcbiAgICAgICAgaWYgKG1hbmlmZXN0LnJhd1Byb2dyYW0uaGFzT3duUHJvcGVydHkoaSkgJiYgIShpIGluIHRoaXMucHJvZ3JhbXMpKSB7XG4gICAgICAgICAgdGhpcy5zdGF0cy5yYXdQcm9ncmFtW2ldID0gMDtcbiAgICAgICAgICB0aGlzLmNyZWF0ZVByb2dyYW0oaSwgbWFuaWZlc3QucmF3UHJvZ3JhbVtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdHVzLmJpbmQodGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0U3RhdHVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U3RhdHVzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dHVyZTogc3VtbWFyaXplKHRoaXMucXVldWVzLnRleHR1cmUpLFxuICAgICAgICBtZXNoOiBzdW1tYXJpemUodGhpcy5xdWV1ZXMubWVzaCksXG4gICAgICAgIHByb2dyYW06IHN1bW1hcml6ZSh0aGlzLnF1ZXVlcy5wcm9ncmFtKVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZW5lcmF0ZU1hbmlmZXN0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2VuZXJhdGVNYW5pZmVzdCgpIHtcbiAgICAgIHZhciBtYW5pZmVzdCA9IHt9LFxuICAgICAgICAgIGtleXMgPSBbJ3RleHR1cmUnLCAnbWVzaCcsICdyYXdQcm9ncmFtJywgJ3Byb2dyYW0nXTtcbiAgICAgIGtleXMuZm9yRWFjaCgoZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgbWFuaWZlc3Rbc2VjdGlvbl0gPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnN0YXRzW3NlY3Rpb25dKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHNbc2VjdGlvbl0uaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5zdGF0c1tzZWN0aW9uXVtpXSA+IDApIHtcbiAgICAgICAgICAgIG1hbmlmZXN0W3NlY3Rpb25dW2ldID0gdGhpcy5tYW5pZmVzdFtzZWN0aW9uXVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgcmV0dXJuIG1hbmlmZXN0O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBc3NldE1hbmFnZXI7XG59KShfZ2xCb3VuZDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFzc2V0TWFuYWdlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxudmFyIENvbnN0YW50cyA9IHtcbiAgdGVhbUNvbG9yczoge1xuICAgIFJFU0lTVEFOQ0U6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMCwgMC43NjA3ODQzMTM3MjU0OTAyLCAxLCAxLjApLFxuICAgIEVOTElHSFRFTkVEOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuMTU2ODYyNzQ1MDk4MDM5MiwgMC45NTY4NjI3NDUwOTgwMzkzLCAwLjE1Njg2Mjc0NTA5ODAzOTIsIDEuMCksXG4gICAgTkVVVFJBTDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjk3NjQ3MDU4ODIzNTI5NDEsIDAuOTc2NDcwNTg4MjM1Mjk0MSwgMC45NzY0NzA1ODgyMzUyOTQxLCAxLjApLFxuICAgIExPS0k6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMSwgMC4xNTY4NjI3NDUwOTgwMzkyLCAwLjE1Njg2Mjc0NTA5ODAzOTIsIDEuMClcbiAgfSxcbiAgcXVhbGl0eUNvbG9yczoge1xuICAgIEVYVFJFTUVMWV9SQVJFOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuOTgwMzkyMTU2ODYyNzQ1MSwgMC4zOTIxNTY4NjI3NDUwOTgwMywgMC4zOTIxNTY4NjI3NDUwOTgwMywgMS4wKSxcbiAgICBWRVJZX1JBUkU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45NTY4NjI3NDUwOTgwMzkzLCAwLjUyMTU2ODYyNzQ1MDk4MDQsIDAuOTI1NDkwMTk2MDc4NDMxNCwgMS4wKSxcbiAgICBNT1JFX1JBUkU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC43NjQ3MDU4ODIzNTI5NDExLCAwLCAxLCAxLjApLFxuICAgIFJBUkU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC42NjY2NjY2NjY2NjY2NjY2LCAwLjUzNzI1NDkwMTk2MDc4NDMsIDAuOTg0MzEzNzI1NDkwMTk2LCAxLjApLFxuICAgIExFU1NfQ09NTU9OOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNDUwOTgwMzkyMTU2ODYyNzUsIDAuNjU4ODIzNTI5NDExNzY0NywgMSwgMS4wKSxcbiAgICBDT01NT046IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC41MDk4MDM5MjE1Njg2Mjc0LCAwLjk1Mjk0MTE3NjQ3MDU4ODIsIDAuNzA1ODgyMzUyOTQxMTc2NSwgMS4wKSxcbiAgICBWRVJZX0NPTU1PTjogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjY5ODAzOTIxNTY4NjI3NDUsIDAuNjk4MDM5MjE1Njg2Mjc0NSwgMC42OTgwMzkyMTU2ODYyNzQ1LCAxLjApLFxuICAgIEwxOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuOTk2MDc4NDMxMzcyNTQ5LCAwLjgwNzg0MzEzNzI1NDkwMiwgMC4zNTI5NDExNzY0NzA1ODgyNiwgMS4wKSxcbiAgICBMMjogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLCAwLjY1MDk4MDM5MjE1Njg2MjgsIDAuMTg4MjM1Mjk0MTE3NjQ3MDYsIDEuMCksXG4gICAgTDM6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMSwgMC40NTA5ODAzOTIxNTY4NjI3NSwgMC4wODIzNTI5NDExNzY0NzA1OSwgMS4wKSxcbiAgICBMNDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjg5NDExNzY0NzA1ODgyMzYsIDAsIDAsIDEuMCksXG4gICAgTDU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45OTIxNTY4NjI3NDUwOTgxLCAwLjE2MDc4NDMxMzcyNTQ5MDIsIDAuNTcyNTQ5MDE5NjA3ODQzMSwgMS4wKSxcbiAgICBMNjogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjkyMTU2ODYyNzQ1MDk4MDMsIDAuMTQ5MDE5NjA3ODQzMTM3MjUsIDAuODAzOTIxNTY4NjI3NDUxLCAxLjApLFxuICAgIEw3OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzU2ODYyNzQ1MDk4MDM5MiwgMC4xNDExNzY0NzA1ODgyMzUzLCAwLjg3ODQzMTM3MjU0OTAxOTYsIDEuMCksXG4gICAgTDg6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC41ODgyMzUyOTQxMTc2NDcxLCAwLjE1Mjk0MTE3NjQ3MDU4ODI1LCAwLjk1Njg2Mjc0NTA5ODAzOTMsIDEuMClcbiAgfSxcbiAgYW5vbWFseUNvbG9yczoge1xuICAgIDE6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMS4wLCAwLjU2ODYyNzQ1MDk4MDM5MjEsIDAuMjExNzY0NzA1ODgyMzUyOTQsIDEuMCksXG4gICAgMjogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLjAsIDAuMzIxNTY4NjI3NDUwOTgwNCwgMC45MDU4ODIzNTI5NDExNzY1LCAxLjApLFxuICAgIDM6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC42MTk2MDc4NDMxMzcyNTQ5LCAwLjM1Mjk0MTE3NjQ3MDU4ODI2LCAxLjAsIDEuMCksXG4gICAgNDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjg0MzEzNzI1NDkwMTk2MDgsIDAuMjcwNTg4MjM1Mjk0MTE3NjMsIDAuMjcwNTg4MjM1Mjk0MTE3NjMsIDEuMCksXG4gICAgNTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLjAsIDAuOTQ1MDk4MDM5MjE1Njg2MiwgMC4wLCAxLjApLFxuICAgIDY6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC42NTA5ODAzOTIxNTY4NjI4LCAxLjAsIDAuOTAxOTYwNzg0MzEzNzI1NSwgMS4wKSxcbiAgICA3OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNTcyNTQ5MDE5NjA3ODQzMSwgMC41ODAzOTIxNTY4NjI3NDUxLCAwLjU5MjE1Njg2Mjc0NTA5OCwgMS4wKVxuICB9LFxuICBhcnRpZmFjdEdsb3dDb2xvcnM6IHtcbiAgICBIZWxpb3M6IHtcbiAgICAgIFJlZDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjkyLCAwLjUxLCAwLjE0LCAxLjApLFxuICAgICAgUHVycGxlOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEuMCwgMC44NywgMC41NSwgMS4wKSxcbiAgICAgIFRhcmdldDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLjAsIDAuNzIsIDAuMCwgMS4wKVxuICAgIH0sXG4gICAgQW1hcjoge1xuICAgICAgVGFyZ2V0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNjIsIDAuMjIsIDAuNjIsIDEuMCksXG4gICAgICBSZWQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC43OSwgMC4xMSwgMC40OSwgMS4wKSxcbiAgICAgIFB1cnBsZTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjU4LCAwLjE3LCAxLjAsIDEuMClcbiAgICB9LFxuICAgIEphcnZpczoge1xuICAgICAgVGFyZ2V0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNjIsIDAuMjIsIDAuNjIsIDEuMCksXG4gICAgICBSZWQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC43OSwgMC4xMSwgMC40OSwgMS4wKSxcbiAgICAgIFB1cnBsZTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjU4LCAwLjE3LCAxLjAsIDEuMClcbiAgICB9LFxuICAgIFNob25pbjoge1xuICAgICAgUmVkOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzgsIDAuODQsIDEuMCwgMS4wKSxcbiAgICAgIFB1cnBsZTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjI1LCAwLjgxLCAxLjAsIDEuMCksXG4gICAgICBUYXJnZXQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC43MCwgMC43MCwgMC43MCwgMS4wKVxuICAgIH0sXG4gICAgTGlnaHRtYW46IHtcbiAgICAgIFJlZDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLjAsIDAuNDQsIDAuNDUsIDEuMCksXG4gICAgICBQdXJwbGU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMS4wLCAwLjI0LCAwLjI1LCAxLjApLFxuICAgICAgVGFyZ2V0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzQsIDAuMCwgMC4wMiwgMS4wKVxuICAgIH1cbiAgfSxcbiAgeG1Db2xvcnM6IHtcbiAgICBjb3JlR2xvdzogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjkyLCAwLjcsIDAuODksIDEuMCksXG4gICAgY29yZUdsb3dBbHQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC42LCAwLjQsIDAuNiwgMC44KSxcbiAgICBjb3JlR2xvd0FkYTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLCAwLjc2MDc4NDMxMzcyNTQ5MDIsIDEsIDEuMCksXG4gICAgY29yZUdsb3dKYXJ2aXM6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC4xNTY4NjI3NDUwOTgwMzkyLCAwLjk1Njg2Mjc0NTA5ODAzOTMsIDAuMTU2ODYyNzQ1MDk4MDM5MiwgMS4wKVxuICB9LFxuICBNZXNoOiB7XG4gICAgSW52ZW50b3J5OiB7XG4gICAgICBYbXA6ICdYbXBNZXNoJyxcbiAgICAgIFhtcFhtOiAnWG1wWE1NZXNoJyxcbiAgICAgIFVsdHJhc3RyaWtlOiAnVWx0cmFzdHJpa2VNZXNoJyxcbiAgICAgIFVsdHJhc3RyaWtlWG06ICdVbHRyYXN0cmlrZVhNTWVzaCcsXG4gICAgICBSZXNTaGllbGQ6ICdSZXNTaGllbGRNZXNoJyxcbiAgICAgIFJlc1NoaWVsZFhtOiAnUmVzU2hpZWxkWE1NZXNoJyxcbiAgICAgIFBvd2VyQ3ViZTogJ1Bvd2VyQ3ViZU1lc2gnLFxuICAgICAgUG93ZXJDdWJlWG06ICdQb3dlckN1YmVYbU1lc2gnLFxuICAgICAgTGlua0FtcDogJ0xpbmtBbXBNZXNoJyxcbiAgICAgIExpbmtBbXBYbTogJ0xpbmtBbXBYbU1lc2gnLFxuICAgICAgSGVhdFNpbms6ICdIZWF0U2lua01lc2gnLFxuICAgICAgSGVhdFNpbmtYbTogJ0hlYXRTaW5rWG1NZXNoJyxcbiAgICAgIE11bHRpSGFjazogJ011bHRpSGFja01lc2gnLFxuICAgICAgTXVsdGlIYWNrWG06ICdNdWx0aUhhY2tYbU1lc2gnLFxuICAgICAgRm9yY2VBbXA6ICdGb3JjZUFtcE1lc2gnLFxuICAgICAgRm9yY2VBbXBYbTogJ0ZvcmNlQW1wWG1NZXNoJyxcbiAgICAgIFR1cnJldDogJ1R1cnJldE1lc2gnLFxuICAgICAgVHVycmV0WG06ICdUdXJyZXRYbU1lc2gnLFxuICAgICAgRmxpcENhcmRBZGE6ICdGbGlwQ2FyZE1lc2hBZGEnLFxuICAgICAgRmxpcENhcmRKYXJ2aXM6ICdGbGlwQ2FyZE1lc2hKYXJ2aXMnLFxuICAgICAgRmxpcENhcmRYbTogJ0ZsaXBDYXJkWG1NZXNoJyxcbiAgICAgIFJlc29uYXRvcjogJ1Jlc29uYXRvck1lc2gnLFxuICAgICAgUmVzb25hdG9yWG06ICdSZXNvbmF0b3JYTU1lc2gnLFxuICAgICAgQ2Fwc3VsZTogJ0NhcHN1bGVNZXNoJyxcbiAgICAgIEludGVyZXN0Q2Fwc3VsZTogJ0ludGVyZXN0Q2Fwc3VsZU1lc2gnLFxuICAgICAgQ2Fwc3VsZVhtOiAnQ2Fwc3VsZVhtTWVzaCcsXG4gICAgICBFeHRyYVNoaWVsZDogJ0V4dHJhU2hpZWxkTWVzaCcsXG4gICAgICBNZWRpYUN1YmU6ICdNZWRpYUN1YmVNZXNoJyxcbiAgICAgIE1lZGlhUGxhbmVNZXNoOiAnTWVkaWFQbGFuZU1lc2gnXG4gICAgfSxcbiAgICBSZXNvdXJjZToge1xuICAgICAgWG1wOiAnWG1wUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBQb3J0YWxLZXlSZXNvdXJjZVVuaXQ6ICdQb3J0YWxLZXlSZXNvdXJjZVVuaXQnLFxuICAgICAgVWx0cmFzdHJpa2U6ICdVbHRyYXN0cmlrZVJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgUG93ZXJDdWJlOiAnUG93ZXJDdWJlUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBMaW5rQW1wOiAnTGlua0FtcFJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgSGVhdFNpbms6ICdIZWF0U2lua1Jlc291cmNlVW5pdE1lc2gnLFxuICAgICAgTXVsdGlIYWNrOiAnTXVsdGlIYWNrUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBGb3JjZUFtcDogJ0ZvcmNlQW1wUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBUdXJyZXQ6ICdUdXJyZXRSZXNvdXJjZVVuaXRNZXNoJyxcbiAgICAgIEZsaXBDYXJkQWRhOiAnRmxpcENhcmRSZXNvdXJjZVVuaXRNZXNoQWRhJyxcbiAgICAgIEZsaXBDYXJkSmFydmlzOiAnRmxpcENhcmRSZXNvdXJjZVVuaXRNZXNoSmFydmlzJyxcbiAgICAgIFJlc29uYXRvcjogJ1Jlc29uYXRvclJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgUG9ydGFsU2hpZWxkOiAnUG9ydGFsU2hpZWxkUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBDYXBzdWxlOiAnQ2Fwc3VsZVJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgSW50ZXJlc3RDYXBzdWxlOiAnSW50ZXJlc3RDYXBzdWxlUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBFeHRyYVNoaWVsZDogJ0V4dHJhU2hpZWxkUmVzb3VyY2VVbml0TWVzaCdcbiAgICB9LFxuICAgIFBsYXllcjoge1xuICAgICAgUGxheWVyOiAnUGxheWVyTWVzaCcsXG4gICAgICBQbGF5ZXJFZGdlOiAnUGxheWVyTWVzaEVkZ2UnLFxuICAgICAgUGxheWVyUmVmbGVjdGlvbjogJ1BsYXllck1lc2hSZWZsZWN0aW9uJyxcbiAgICAgIFBsYXllckdsb3c6ICdQbGF5ZXJNZXNoR2xvdycsXG4gICAgICBCcmVhZENydW1iOiAnQnJlYWRDcnVtYk1lc2gnLFxuICAgICAgQ29tcGFzczogJ0NvbXBhc3NNZXNoJ1xuICAgIH0sXG4gICAgT3JuYW1lbnQ6IHtcbiAgICAgIE1lZXR1cFBvaW50OiAnT3JuYW1lbnRNZWV0dXBQb2ludE1lc2gnLFxuICAgICAgRmluaXNoUG9pbnQ6ICdPcm5hbWVudEZpbmlzaFBvaW50TWVzaCcsXG4gICAgICBDbHVzdGVyOiAnT3JuYW1lbnRDbHVzdGVyTWVzaCcsXG4gICAgICBWb2xhdGlsZTogJ09ybmFtZW50Vm9sYXRpbGVNZXNoJ1xuICAgIH0sXG4gICAgV29ybGQ6IHtcbiAgICAgIFNoaWVsZDogJ1BvcnRhbFNoaWVsZE1lc2gnLFxuICAgICAgUG9ydGFsOiAnVGV4dHVyZWRQb3J0YWxNZXNoJyxcbiAgICAgIFdheXBvaW50OiAnVGV4dHVyZWRTY2FubmVyRlRNZXNoJyxcbiAgICAgIFJlc29uYXRvcjogJ1Jlc29uYXRvclVuaXRMb3dSZXNNZXNoJyxcbiAgICAgIFhtcFJpbmc6ICdYbXBSaW5nTWVzaCcsXG4gICAgICBVbHRyYVN0cmlrZVJpbmc6ICdVbHRyYVN0cmlrZVJpbmdNZXNoJyxcbiAgICAgIFVsdHJhU3RyaWtlQ29sdW1uOiAnVWx0cmFTdHJpa2VDb2x1bW5NZXNoJyxcbiAgICAgIEFydGlmYWN0c1JlZEdsb3c6ICdBcnRpZmFjdHNSZWRHbG93JyxcbiAgICAgIEFydGlmYWN0c0dyZWVuR2xvdzogJ0FydGlmYWN0c0dyZWVuR2xvdycsXG4gICAgICBBcnRpZmFjdHNQdXJwbGVHbG93OiAnQXJ0aWZhY3RzUHVycGxlR2xvdycsXG4gICAgICBBcnRpZmFjdHNUYXJnZXRHbG93OiAnQXJ0aWZhY3RzVGFyZ2V0R2xvdycsXG4gICAgICBTaW5nbGVSZXNvbmF0b3I6ICdTaW5nbGVSZXNvbmF0b3JNZXNoJ1xuICAgIH1cbiAgfSxcbiAgUHJvZ3JhbToge1xuICAgIEJpY29sb3JlZDogJ2JpY29sb3JfdGV4dHVyZWQnLFxuICAgIFRleHR1cmVkOiAndGV4dHVyZWQnLFxuICAgIEdsb3dyYW1wOiAncG9ydGFsX3NjYW5uZXInLFxuICAgIFhtOiAneG0nLFxuICAgIFNoaWVsZEVmZmVjdDogJ3NoaWVsZCcsXG4gICAgQXRtb3NwaGVyZTogJ2F0bW9zcGhlcmUnLFxuICAgIExpbms6ICdMaW5rU2hhZGVyJyxcbiAgICBTcGhlcmljYWxMaW5rOiAnbGluazNkJ1xuICB9LFxuICBUZXh0dXJlOiB7XG4gICAgRmxpcENhcmQ6ICdGbGlwQ2FyZFRleHR1cmUnLFxuICAgIFhtOiAnT2JqZWN0WE1UZXh0dXJlJyxcbiAgICBHbG93cmFtcDogJ0dsb3dyYW1wVGV4dHVyZScsXG4gICAgTWVkaWE6ICdNZWRpYUN1YmVUZXh0dXJlJyxcbiAgICBXYXlwb2ludDogJ0Z0V2F5cG9pbnRUZXh0dXJlJyxcbiAgICBTaGllbGRFZmZlY3Q6ICdQb3J0YWxTaGllbGRUZXh0dXJlJyxcbiAgICBDb2xvckdsb3c6ICdDb2xvckdsb3dUZXh0dXJlJyxcbiAgICBUYXJnZXRHbG93OiAnVGFyZ2V0R2xvd1RleHR1cmUnLFxuICAgIFBvcnRhbExpbms6ICdQb3J0YWxMaW5rVGV4dHVyZScsXG4gICAgUmVzb25hdG9yTGluazogJ1Jlc29uYXRvckxpbmtUZXh0dXJlJ1xuICB9XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBDb25zdGFudHM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIERyYXdhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRHJhd2FibGUocHJvZ3JhbU5hbWUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRHJhd2FibGUpO1xuXG4gICAgdGhpcy5wcm9ncmFtTmFtZSA9IHByb2dyYW1OYW1lO1xuICAgIHRoaXMucHJvZ3JhbSA9IG51bGw7XG4gICAgdGhpcy51bmlmb3JtcyA9IHt9O1xuICAgIHRoaXMuZHJhd2ZuID0gbnVsbDtcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICB0aGlzLnByb2dyYW0gPSBtYW5hZ2VyLmdldFByb2dyYW0odGhpcy5wcm9ncmFtTmFtZSk7XG4gICAgICBpZiAoIXRoaXMucHJvZ3JhbSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ21pc3NpbmcgcHJvZ3JhbSAnICsgdGhpcy5wcm9ncmFtTmFtZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2V0RHJhd0ZuJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0RHJhd0ZuKGZuKSB7XG4gICAgICB0aGlzLmRyYXdmbiA9IGZuO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RyYXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3KCkge1xuICAgICAgaWYgKCF0aGlzLnJlYWR5KSB7XG4gICAgICAgIGNvbnNvbGUud2FybignZHJhd2FibGUgaXMgbm90IGluaXRpYWxpemVkJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvZ3JhbS51c2UodGhpcy5kcmF3Zm4pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NldFVuaWZvcm0nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRVbmlmb3JtKG5hbWUsIHZhbHVlKSB7XG4gICAgICB0aGlzLnVuaWZvcm1zW25hbWVdID0gdmFsdWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVGltZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVRpbWUoZGVsdGEpIHtcbiAgICAgIHRoaXMuZWxhcHNlZCArPSBkZWx0YTtcbiAgICAgIGlmICh0aGlzLm9uVXBkYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uVXBkYXRlKGRlbHRhLCB0aGlzLmVsYXBzZWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGlzcG9zZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAvLyBub29wO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEcmF3YWJsZTtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX21vZGVsID0gcmVxdWlyZSgnLi9tb2RlbCcpO1xuXG52YXIgX21vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vZGVsKTtcblxudmFyIF9tZXNoU3BoZXJlID0gcmVxdWlyZSgnLi4vbWVzaC9zcGhlcmUnKTtcblxudmFyIF9tZXNoU3BoZXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2hTcGhlcmUpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbnZhciBQUk9HUkFNID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLkF0bW9zcGhlcmU7XG5cbi8vIHRoaXMgcHJvZ3JhbSAoYXRtb3NwaGVyZS5nbHNsLnZlcnQgYW5kIGF0bW9zcGhlcmUuZ2xzbC5mcmFnKVxuLy8gaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBhdG1vc3BoZXJlIHByb2dyYW0gaW5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRhYXJ0cy93ZWJnbC1nbG9iZS9ibG9iL21hc3Rlci9nbG9iZS9nbG9iZS5qc1xuXG52YXIgQXRtb3NwaGVyZURyYXdhYmxlID0gKGZ1bmN0aW9uIChfTW9kZWxEcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoQXRtb3NwaGVyZURyYXdhYmxlLCBfTW9kZWxEcmF3YWJsZSk7XG5cbiAgZnVuY3Rpb24gQXRtb3NwaGVyZURyYXdhYmxlKHJhZGl1cywgdlNsaWNlcywgaFNsaWNlcywgc2NhbGVGYWN0b3IpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXRtb3NwaGVyZURyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEF0bW9zcGhlcmVEcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIFBST0dSQU0sIG51bGwpO1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMudlNsaWNlcyA9IHZTbGljZXM7XG4gICAgdGhpcy5oU2xpY2VzID0gaFNsaWNlcztcbiAgICB0aGlzLnVuaWZvcm1zLnVfbm9ybWFsTWF0cml4ID0gX2dsTWF0cml4Lm1hdDMuY3JlYXRlKCk7XG4gICAgdGhpcy5zY2FsZUZhY3RvciA9IHNjYWxlRmFjdG9yIHx8IDEuMTtcbiAgICBfZ2xNYXRyaXgubWF0NC5zY2FsZSh0aGlzLmxvY2FsLCB0aGlzLmxvY2FsLCBbdGhpcy5zY2FsZUZhY3RvciwgdGhpcy5zY2FsZUZhY3RvciwgdGhpcy5zY2FsZUZhY3Rvcl0pO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEF0bW9zcGhlcmVEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICd1cGRhdGVWaWV3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVmlldyh2aWV3UHJvamVjdCkge1xuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXRtb3NwaGVyZURyYXdhYmxlLnByb3RvdHlwZSksICd1cGRhdGVWaWV3JywgdGhpcykuY2FsbCh0aGlzLCB2aWV3UHJvamVjdCk7XG4gICAgICB2YXIgaW52ZXJ0ID0gX2dsTWF0cml4Lm1hdDQuaW52ZXJ0KF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpLCB2aWV3UHJvamVjdCksXG4gICAgICAgICAgdHJhbnNwb3NlID0gX2dsTWF0cml4Lm1hdDQudHJhbnNwb3NlKF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpLCBpbnZlcnQpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X25vcm1hbE1hdHJpeCA9IF9nbE1hdHJpeC5tYXQzLmZyb21NYXQ0KF9nbE1hdHJpeC5tYXQzLmNyZWF0ZSgpLCB0cmFuc3Bvc2UpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIHRoaXMubWVzaCA9IG5ldyBfbWVzaFNwaGVyZTJbJ2RlZmF1bHQnXShtYW5hZ2VyLl9nbCwgdGhpcy5yYWRpdXMsIHRoaXMudlNsaWNlcywgdGhpcy5oU2xpY2VzKTtcbiAgICAgIHJldHVybiBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihBdG1vc3BoZXJlRHJhd2FibGUucHJvdG90eXBlKSwgJ2luaXQnLCB0aGlzKS5jYWxsKHRoaXMsIG1hbmFnZXIpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBdG1vc3BoZXJlRHJhd2FibGU7XG59KShfbW9kZWwyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBBdG1vc3BoZXJlRHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfdGV4dHVyZWQgPSByZXF1aXJlKCcuL3RleHR1cmVkJyk7XG5cbnZhciBfdGV4dHVyZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGV4dHVyZWQpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbnZhciBQUk9HUkFNID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLkJpY29sb3JlZDtcblxuLy8gZGVmYXVsdCBxdWFsaXR5IGNvbG9yOiB2ZXJ5IHJhcmVcbnZhciBkZWZhdWx0Q29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzLlZFUllfUkFSRSk7XG5cbi8vIGRlZmF1bHQgZ2xvdyBjb2xvcjogeG0gY29sb3JcbnZhciBkZWZhdWx0Q29sb3IxID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS54bUNvbG9ycy5jb3JlR2xvdyk7XG5cbnZhciBCaWNvbG9yZWREcmF3YWJsZSA9IChmdW5jdGlvbiAoX1RleHR1cmVkRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKEJpY29sb3JlZERyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgZnVuY3Rpb24gQmljb2xvcmVkRHJhd2FibGUobWVzaE5hbWUsIHRleHR1cmVOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJpY29sb3JlZERyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEJpY29sb3JlZERyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgUFJPR1JBTSwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoZGVmYXVsdENvbG9yMCk7XG4gICAgdGhpcy51bmlmb3Jtcy51X2NvbG9yMSA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGRlZmF1bHRDb2xvcjEpO1xuICB9XG5cbiAgcmV0dXJuIEJpY29sb3JlZERyYXdhYmxlO1xufSkoX3RleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQmljb2xvcmVkRHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfdGV4dHVyZWQgPSByZXF1aXJlKCcuL3RleHR1cmVkJyk7XG5cbnZhciBfdGV4dHVyZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGV4dHVyZWQpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbnZhciBQUk9HUkFNID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLkdsb3dyYW1wO1xuXG4vLyBkZWZhdWx0IGJhc2UgY29sb3I6IG5ldXRyYWwgcG9ydGFsIGNvbG9yXG52YXIgZGVmYXVsdEJhc2VDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10udGVhbUNvbG9ycy5ORVVUUkFMKTtcblxudmFyIEdsb3dyYW1wRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9UZXh0dXJlZERyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhHbG93cmFtcERyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgZnVuY3Rpb24gR2xvd3JhbXBEcmF3YWJsZShtZXNoTmFtZSwgdGV4dHVyZU5hbWUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR2xvd3JhbXBEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihHbG93cmFtcERyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgUFJPR1JBTSwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfYmFzZUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoZGVmYXVsdEJhc2VDb2xvcik7XG4gICAgdGhpcy51bmlmb3Jtcy51X3JvdGF0aW9uID0gMDtcbiAgICB0aGlzLnVuaWZvcm1zLnVfcmFtcFRhcmdldCA9IDA7XG4gICAgdGhpcy51bmlmb3Jtcy51X2FscGhhID0gMC42O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEdsb3dyYW1wRHJhd2FibGUsIFt7XG4gICAga2V5OiAndXBkYXRlVGltZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVRpbWUodGljaykge1xuICAgICAgdmFyIHJldCA9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEdsb3dyYW1wRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVRpbWUnLCB0aGlzKS5jYWxsKHRoaXMsIHRpY2spO1xuICAgICAgdmFyIGluYyA9IHRoaXMuZWxhcHNlZCAvIDUwMDA7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfcm90YXRpb24gPSBpbmM7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfcmFtcFRhcmdldCA9IE1hdGguc2luKE1hdGguUEkgLyAyICogKGluYyAtIE1hdGguZmxvb3IoaW5jKSkpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X2FscGhhID0gTWF0aC5zaW4oaW5jKSAqIDAuMDUgKyAwLjc1O1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gR2xvd3JhbXBEcmF3YWJsZTtcbn0pKF90ZXh0dXJlZDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEdsb3dyYW1wRHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfYmljb2xvcmVkID0gcmVxdWlyZSgnLi9iaWNvbG9yZWQnKTtcblxudmFyIF9iaWNvbG9yZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmljb2xvcmVkKTtcblxudmFyIF94bSA9IHJlcXVpcmUoJy4veG0nKTtcblxudmFyIF94bTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF94bSk7XG5cbnZhciBfdGV4dHVyZWQgPSByZXF1aXJlKCcuL3RleHR1cmVkJyk7XG5cbnZhciBfdGV4dHVyZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGV4dHVyZWQpO1xuXG52YXIgSW52ZW50b3J5ID0ge307XG52YXIgbWVzaGVzID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5NZXNoLkludmVudG9yeTtcbnZhciB0ZXh0dXJlcyA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZTtcblxuZnVuY3Rpb24gY3JlYXRlU2hlbGwobmFtZSkge1xuICB2YXIgaXRlbWJhc2UgPSAoZnVuY3Rpb24gKF9CaWNvbG9yZWREcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhpdGVtYmFzZSwgX0JpY29sb3JlZERyYXdhYmxlKTtcblxuICAgIGZ1bmN0aW9uIGl0ZW1iYXNlKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIGl0ZW1iYXNlKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaXRlbWJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBtZXNoZXNbbmFtZV0sIHRleHR1cmVzLkZsaXBDYXJkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbWJhc2U7XG4gIH0pKF9iaWNvbG9yZWQyWydkZWZhdWx0J10pO1xuXG4gIHJldHVybiBpdGVtYmFzZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29yZShuYW1lKSB7XG4gIHZhciB4bWJhc2UgPSAoZnVuY3Rpb24gKF9YbURyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKHhtYmFzZSwgX1htRHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24geG1iYXNlKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIHhtYmFzZSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKHhtYmFzZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIG1lc2hlc1tuYW1lXSwgdGV4dHVyZXMuWG0pO1xuICAgIH1cblxuICAgIHJldHVybiB4bWJhc2U7XG4gIH0pKF94bTJbJ2RlZmF1bHQnXSk7XG5cbiAgcmV0dXJuIHhtYmFzZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWVkaWEobmFtZSkge1xuICB2YXIgbWVkaWEgPSAoZnVuY3Rpb24gKF9UZXh0dXJlZERyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKG1lZGlhLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgICBmdW5jdGlvbiBtZWRpYSgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBtZWRpYSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKG1lZGlhLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLlRleHR1cmVkLCBtZXNoZXNbbmFtZV0sIF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZS5GbGlwQ2FyZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lZGlhO1xuICB9KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG4gIHJldHVybiBtZWRpYTtcbn1cblxuZm9yICh2YXIgaSBpbiBtZXNoZXMpIHtcbiAgaWYgKC9eTWVkaWEvLnRlc3QoaSkpIHtcbiAgICBpZiAoaSA9PT0gJ01lZGlhUGxhbmUnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgSW52ZW50b3J5W2ldID0gY3JlYXRlTWVkaWEoaSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKC9YbSQvLnRlc3QoaSkpIHtcbiAgICAgIEludmVudG9yeVtpXSA9IGNyZWF0ZUNvcmUoaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEludmVudG9yeVtpXSA9IGNyZWF0ZVNoZWxsKGkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBJbnZlbnRvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfdGV4dHVyZWQgPSByZXF1aXJlKCcuL3RleHR1cmVkJyk7XG5cbnZhciBfdGV4dHVyZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGV4dHVyZWQpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbnZhciBMaW5rRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9UZXh0dXJlZERyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhMaW5rRHJhd2FibGUsIF9UZXh0dXJlZERyYXdhYmxlKTtcblxuICBmdW5jdGlvbiBMaW5rRHJhd2FibGUocHJvZ3JhbU5hbWUsIHRleHR1cmVOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExpbmtEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBwcm9ncmFtTmFtZSwgbnVsbCwgdGV4dHVyZU5hbWUpO1xuICAgIHRoaXMudW5pZm9ybXMudV9jYW1lcmFGd2QgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDAsIC0xKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfZWxhcHNlZFRpbWUgPSAwO1xuICB9XG5cbiAgLy8gVE9ETzogbmVlZHMgYSBjYW1lcmEgY2xhc3M6XG4gIF9jcmVhdGVDbGFzcyhMaW5rRHJhd2FibGUsIFt7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcodmlld1Byb2plY3QsIHZpZXcsIHByb2plY3QpIHtcbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKExpbmtEcmF3YWJsZS5wcm90b3R5cGUpLCAndXBkYXRlVmlldycsIHRoaXMpLmNhbGwodGhpcywgdmlld1Byb2plY3QsIHZpZXcsIHByb2plY3QpO1xuICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgdmFyIHJvdCA9IF9nbE1hdHJpeC5tYXQzLmZyb21NYXQ0KF9nbE1hdHJpeC5tYXQzLmNyZWF0ZSgpLCB2aWV3KTtcbiAgICAgICAgdmFyIHEgPSBfZ2xNYXRyaXgucXVhdC5mcm9tTWF0MyhfZ2xNYXRyaXgucXVhdC5jcmVhdGUoKSwgcm90KTtcbiAgICAgICAgdmFyIGZ3ZCA9IF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybVF1YXQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgLTEpLCBxKTtcbiAgICAgICAgX2dsTWF0cml4LnZlYzMubm9ybWFsaXplKGZ3ZCwgZndkKTtcbiAgICAgICAgdGhpcy51bmlmb3Jtcy51X2NhbWVyYUZ3ZCA9IGZ3ZDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVUaW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVGltZShkZWx0YSkge1xuICAgICAgdmFyIHJldCA9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKExpbmtEcmF3YWJsZS5wcm90b3R5cGUpLCAndXBkYXRlVGltZScsIHRoaXMpLmNhbGwodGhpcywgZGVsdGEpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X2VsYXBzZWRUaW1lID0gdGhpcy5lbGFwc2VkIC8gMTAwMCAlIDMwMC4wICogMC4xO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTGlua0RyYXdhYmxlO1xufSkoX3RleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTGlua0RyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2RyYXdhYmxlID0gcmVxdWlyZSgnLi4vZHJhd2FibGUnKTtcblxudmFyIF9kcmF3YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZSk7XG5cbmZ1bmN0aW9uIF9kcmF3KGxvY2F0aW9ucywgdW5pZm9ybXMpIHtcbiAgZm9yICh2YXIgaSBpbiB0aGlzLnVuaWZvcm1zKSB7XG4gICAgaWYgKHRoaXMudW5pZm9ybXMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSBpbiB1bmlmb3Jtcykge1xuICAgICAgdW5pZm9ybXNbaV0odGhpcy51bmlmb3Jtc1tpXSk7XG4gICAgfVxuICB9XG4gIHRoaXMubWVzaC5kcmF3KGxvY2F0aW9ucyk7XG59XG5cbnZhciBNZXNoRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9EcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoTWVzaERyYXdhYmxlLCBfRHJhd2FibGUpO1xuXG4gIGZ1bmN0aW9uIE1lc2hEcmF3YWJsZShwcm9ncmFtTmFtZSwgbWVzaE5hbWUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWVzaERyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKE1lc2hEcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb2dyYW1OYW1lKTtcbiAgICB0aGlzLm1lc2hOYW1lID0gbWVzaE5hbWU7XG4gICAgdGhpcy5tZXNoID0gbnVsbDtcbiAgICB0aGlzLmRyYXdmbiA9IF9kcmF3LmJpbmQodGhpcyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTWVzaERyYXdhYmxlLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIGlmICh0aGlzLm1lc2hOYW1lKSB7XG4gICAgICAgIHRoaXMubWVzaCA9IG1hbmFnZXIuZ2V0TWVzaCh0aGlzLm1lc2hOYW1lKTtcbiAgICAgICAgaWYgKCF0aGlzLm1lc2gpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ21pc3NpbmcgbWVzaCAnICsgdGhpcy5tZXNoTmFtZSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWVzaERyYXdhYmxlLnByb3RvdHlwZSksICdpbml0JywgdGhpcykuY2FsbCh0aGlzLCBtYW5hZ2VyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTWVzaERyYXdhYmxlO1xufSkoX2RyYXdhYmxlMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTWVzaERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX21lc2ggPSByZXF1aXJlKCcuL21lc2gnKTtcblxudmFyIF9tZXNoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2gpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbnZhciBNb2RlbERyYXdhYmxlID0gKGZ1bmN0aW9uIChfTWVzaERyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhNb2RlbERyYXdhYmxlLCBfTWVzaERyYXdhYmxlKTtcblxuICBmdW5jdGlvbiBNb2RlbERyYXdhYmxlKHByb2dyYW1OYW1lLCBtZXNoTmFtZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNb2RlbERyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vZGVsRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBwcm9ncmFtTmFtZSwgbWVzaE5hbWUpO1xuICAgIHRoaXMudmlld1Byb2plY3QgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLm1vZGVsID0gX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG4gICAgdGhpcy5sb2NhbCA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIHRoaXMud29ybGQgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhNb2RlbERyYXdhYmxlLCBbe1xuICAgIGtleTogJ3VwZGF0ZU1hdHJpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZU1hdHJpeCgpIHtcbiAgICAgIHZhciBtdnAgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICAgIF9nbE1hdHJpeC5tYXQ0Lm11bHRpcGx5KHRoaXMubW9kZWwsIHRoaXMud29ybGQsIHRoaXMubG9jYWwpO1xuICAgICAgX2dsTWF0cml4Lm1hdDQubXVsdGlwbHkobXZwLCB0aGlzLnZpZXdQcm9qZWN0LCB0aGlzLm1vZGVsKTtcbiAgICAgIHRoaXMudW5pZm9ybXMudV9tb2RlbFZpZXdQcm9qZWN0ID0gbXZwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVZpZXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWaWV3KHZpZXdQcm9qZWN0KSB7XG4gICAgICB0aGlzLnZpZXdQcm9qZWN0ID0gdmlld1Byb2plY3Q7XG4gICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NldE1hdHJpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldE1hdHJpeChtYXQpIHtcbiAgICAgIHRoaXMubW9kZWwgPSBtYXQ7XG4gICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNb2RlbERyYXdhYmxlO1xufSkoX21lc2gyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBNb2RlbERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2xpbmsgPSByZXF1aXJlKCcuL2xpbmsnKTtcblxudmFyIF9saW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpbmspO1xuXG52YXIgX21lc2hQb3J0YWxMaW5rID0gcmVxdWlyZSgnLi4vbWVzaC9wb3J0YWwtbGluaycpO1xuXG52YXIgX21lc2hQb3J0YWxMaW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2hQb3J0YWxMaW5rKTtcblxudmFyIFBvcnRhbExpbmtEcmF3YWJsZSA9IChmdW5jdGlvbiAoX0xpbmtEcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoUG9ydGFsTGlua0RyYXdhYmxlLCBfTGlua0RyYXdhYmxlKTtcblxuICBmdW5jdGlvbiBQb3J0YWxMaW5rRHJhd2FibGUoc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb3J0YWxMaW5rRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUG9ydGFsTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLkxpbmssIF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZS5Qb3J0YWxMaW5rKTtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuc3RhcnRQZXJjZW50ID0gc3RhcnRQZXJjZW50O1xuICAgIHRoaXMuZW5kUGVyY2VudCA9IGVuZFBlcmNlbnQ7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUG9ydGFsTGlua0RyYXdhYmxlLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIHRoaXMubWVzaCA9IG5ldyBfbWVzaFBvcnRhbExpbmsyWydkZWZhdWx0J10obWFuYWdlci5fZ2wsIHRoaXMuc3RhcnQsIHRoaXMuZW5kLCB0aGlzLmNvbG9yLCB0aGlzLnN0YXJ0UGVyY2VudCwgdGhpcy5lbmRQZXJjZW50KTtcbiAgICAgIHJldHVybiBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihQb3J0YWxMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2luaXQnLCB0aGlzKS5jYWxsKHRoaXMsIG1hbmFnZXIpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQb3J0YWxMaW5rRHJhd2FibGU7XG59KShfbGluazJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFBvcnRhbExpbmtEcmF3YWJsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9saW5rID0gcmVxdWlyZSgnLi9saW5rJyk7XG5cbnZhciBfbGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saW5rKTtcblxudmFyIF9tZXNoUmVzb25hdG9yTGluayA9IHJlcXVpcmUoJy4uL21lc2gvcmVzb25hdG9yLWxpbmsnKTtcblxudmFyIF9tZXNoUmVzb25hdG9yTGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNoUmVzb25hdG9yTGluayk7XG5cbnZhciBSZXNvbmF0b3JMaW5rRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9MaW5rRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFJlc29uYXRvckxpbmtEcmF3YWJsZSwgX0xpbmtEcmF3YWJsZSk7XG5cbiAgZnVuY3Rpb24gUmVzb25hdG9yTGlua0RyYXdhYmxlKHBvcnRhbFBvc2l0aW9uLCBzbG90LCBkaXN0YW5jZSwgY29sb3IsIHJlc29uYXRvclBlcmNlbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVzb25hdG9yTGlua0RyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFJlc29uYXRvckxpbmtEcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5MaW5rLCBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlRleHR1cmUuUmVzb25hdG9yTGluayk7XG4gICAgdGhpcy5wb3J0YWxQb3NpdGlvbiA9IHBvcnRhbFBvc2l0aW9uO1xuICAgIHRoaXMuc2xvdCA9IHNsb3Q7XG4gICAgdGhpcy5kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLnJlc29uYXRvclBlcmNlbnQgPSByZXNvbmF0b3JQZXJjZW50O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFJlc29uYXRvckxpbmtEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICB0aGlzLm1lc2ggPSBuZXcgX21lc2hSZXNvbmF0b3JMaW5rMlsnZGVmYXVsdCddKG1hbmFnZXIuX2dsLCB0aGlzLnBvcnRhbFBvc2l0aW9uLCB0aGlzLnNsb3QsIHRoaXMuZGlzdGFuY2UsIHRoaXMuY29sb3IsIHRoaXMucmVzb25hdG9yUGVyY2VudCk7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVzb25hdG9yTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICdpbml0JywgdGhpcykuY2FsbCh0aGlzLCBtYW5hZ2VyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUmVzb25hdG9yTGlua0RyYXdhYmxlO1xufSkoX2xpbmsyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBSZXNvbmF0b3JMaW5rRHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfYmljb2xvcmVkID0gcmVxdWlyZSgnLi9iaWNvbG9yZWQnKTtcblxudmFyIF9iaWNvbG9yZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmljb2xvcmVkKTtcblxudmFyIFJlc291cmNlID0ge307XG52YXIgbWVzaGVzID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5NZXNoLlJlc291cmNlO1xuXG5mdW5jdGlvbiBjcmVhdGVSZXNvdXJjZShuYW1lKSB7XG4gIHZhciBpdGVtYmFzZSA9IChmdW5jdGlvbiAoX0JpY29sb3JlZERyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKGl0ZW1iYXNlLCBfQmljb2xvcmVkRHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24gaXRlbWJhc2UoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgaXRlbWJhc2UpO1xuXG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihpdGVtYmFzZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIG1lc2hlc1tuYW1lXSwgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5UZXh0dXJlLkZsaXBDYXJkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbWJhc2U7XG4gIH0pKF9iaWNvbG9yZWQyWydkZWZhdWx0J10pO1xuXG4gIHJldHVybiBpdGVtYmFzZTtcbn1cblxuZm9yICh2YXIgaSBpbiBtZXNoZXMpIHtcbiAgUmVzb3VyY2VbbmFtZV0gPSBjcmVhdGVSZXNvdXJjZShpKTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gUmVzb3VyY2U7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfbGluayA9IHJlcXVpcmUoJy4vbGluaycpO1xuXG52YXIgX2xpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGluayk7XG5cbnZhciBfbWVzaFNwaGVyaWNhbFBvcnRhbExpbmsgPSByZXF1aXJlKCcuLi9tZXNoL3NwaGVyaWNhbC1wb3J0YWwtbGluaycpO1xuXG52YXIgX21lc2hTcGhlcmljYWxQb3J0YWxMaW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2hTcGhlcmljYWxQb3J0YWxMaW5rKTtcblxudmFyIFNwaGVyaWNhbFBvcnRhbExpbmtEcmF3YWJsZSA9IChmdW5jdGlvbiAoX0xpbmtEcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoU3BoZXJpY2FsUG9ydGFsTGlua0RyYXdhYmxlLCBfTGlua0RyYXdhYmxlKTtcblxuICBmdW5jdGlvbiBTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUoc3BoZXJlUmFkaXVzLCBzdGFydCwgZW5kLCBjb2xvciwgc3RhcnRQZXJjZW50LCBlbmRQZXJjZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNwaGVyaWNhbFBvcnRhbExpbmtEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlByb2dyYW0uU3BoZXJpY2FsTGluaywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5UZXh0dXJlLlBvcnRhbExpbmspO1xuICAgIHRoaXMucmFkaXVzID0gc3BoZXJlUmFkaXVzO1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5zdGFydFBlcmNlbnQgPSBzdGFydFBlcmNlbnQ7XG4gICAgdGhpcy5lbmRQZXJjZW50ID0gZW5kUGVyY2VudDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUsIFt7XG4gICAga2V5OiAnaW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQobWFuYWdlcikge1xuICAgICAgdGhpcy5tZXNoID0gbmV3IF9tZXNoU3BoZXJpY2FsUG9ydGFsTGluazJbJ2RlZmF1bHQnXShtYW5hZ2VyLl9nbCwgdGhpcy5yYWRpdXMsIHRoaXMuc3RhcnQsIHRoaXMuZW5kLCB0aGlzLmNvbG9yLCB0aGlzLnN0YXJ0UGVyY2VudCwgdGhpcy5lbmRQZXJjZW50KTtcbiAgICAgIHJldHVybiBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2luaXQnLCB0aGlzKS5jYWxsKHRoaXMsIG1hbmFnZXIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVZpZXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWaWV3KHZpZXdQcm9qZWN0LCB2aWV3LCBwcm9qZWN0KSB7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVZpZXcnLCB0aGlzKS5jYWxsKHRoaXMsIHZpZXdQcm9qZWN0LCB2aWV3LCBwcm9qZWN0KTtcbiAgICAgIHRoaXMudW5pZm9ybXMudV9tb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNwaGVyaWNhbFBvcnRhbExpbmtEcmF3YWJsZTtcbn0pKF9saW5rMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU3BoZXJpY2FsUG9ydGFsTGlua0RyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9tZXNoU3BoZXJlID0gcmVxdWlyZSgnLi4vbWVzaC9zcGhlcmUnKTtcblxudmFyIF9tZXNoU3BoZXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2hTcGhlcmUpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5UZXh0dXJlZDtcblxudmFyIFRleHR1cmVkU3BoZXJlRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9UZXh0dXJlZERyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhUZXh0dXJlZFNwaGVyZURyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgZnVuY3Rpb24gVGV4dHVyZWRTcGhlcmVEcmF3YWJsZSh0ZXh0dXJlTmFtZSwgcmFkaXVzLCB2U2xpY2VzLCBoU2xpY2VzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRleHR1cmVkU3BoZXJlRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV4dHVyZWRTcGhlcmVEcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIFBST0dSQU0sIG51bGwsIHRleHR1cmVOYW1lKTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLnZTbGljZXMgPSB2U2xpY2VzO1xuICAgIHRoaXMuaFNsaWNlcyA9IGhTbGljZXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGV4dHVyZWRTcGhlcmVEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICB0aGlzLm1lc2ggPSBuZXcgX21lc2hTcGhlcmUyWydkZWZhdWx0J10obWFuYWdlci5fZ2wsIHRoaXMucmFkaXVzLCB0aGlzLnZTbGljZXMsIHRoaXMuaFNsaWNlcyk7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV4dHVyZWRTcGhlcmVEcmF3YWJsZS5wcm90b3R5cGUpLCAnaW5pdCcsIHRoaXMpLmNhbGwodGhpcywgbWFuYWdlcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFRleHR1cmVkU3BoZXJlRHJhd2FibGU7XG59KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBUZXh0dXJlZFNwaGVyZURyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX21vZGVsID0gcmVxdWlyZSgnLi9tb2RlbCcpO1xuXG52YXIgX21vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vZGVsKTtcblxudmFyIFRleHR1cmVkRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9Nb2RlbERyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhUZXh0dXJlZERyYXdhYmxlLCBfTW9kZWxEcmF3YWJsZSk7XG5cbiAgZnVuY3Rpb24gVGV4dHVyZWREcmF3YWJsZShwcm9ncmFtTmFtZSwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRleHR1cmVkRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV4dHVyZWREcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb2dyYW1OYW1lLCBtZXNoTmFtZSk7XG4gICAgdGhpcy50ZXh0dXJlTmFtZSA9IHRleHR1cmVOYW1lO1xuICAgIHRoaXMudGV4dHVyZSA9IG51bGw7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGV4dHVyZWREcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgIHRoaXMudGV4dHVyZS51c2UoMCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfdGV4dHVyZSA9IDA7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihUZXh0dXJlZERyYXdhYmxlLnByb3RvdHlwZSksICdkcmF3JywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICBpZiAodGhpcy50ZXh0dXJlTmFtZSkge1xuICAgICAgICB0aGlzLnRleHR1cmUgPSBtYW5hZ2VyLmdldFRleHR1cmUodGhpcy50ZXh0dXJlTmFtZSk7XG4gICAgICAgIGlmICghdGhpcy50ZXh0dXJlKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdtaXNzaW5nIHRleHR1cmUgJyArIHRoaXMudGV4dHVyZU5hbWUpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFRleHR1cmVkRHJhd2FibGUucHJvdG90eXBlKSwgJ2luaXQnLCB0aGlzKS5jYWxsKHRoaXMsIG1hbmFnZXIpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUZXh0dXJlZERyYXdhYmxlO1xufSkoX21vZGVsMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gVGV4dHVyZWREcmF3YWJsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9nbG93cmFtcCA9IHJlcXVpcmUoJy4vZ2xvd3JhbXAnKTtcblxudmFyIF9nbG93cmFtcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbG93cmFtcCk7XG5cbnZhciBfYmljb2xvcmVkID0gcmVxdWlyZSgnLi9iaWNvbG9yZWQnKTtcblxudmFyIF9iaWNvbG9yZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmljb2xvcmVkKTtcblxudmFyIFdvcmxkID0ge307XG52YXIgbWVzaGVzID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5NZXNoLldvcmxkO1xudmFyIHRleHR1cmVzID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5UZXh0dXJlO1xuXG5mdW5jdGlvbiBtYWtlR2xvd3JhbXAobWVzaCwgdGV4dHVyZSkge1xuICB2YXIgZ2xvd3JhbXBiYXNlID0gKGZ1bmN0aW9uIChfR2xvd3JhbXBEcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhnbG93cmFtcGJhc2UsIF9HbG93cmFtcERyYXdhYmxlKTtcblxuICAgIGZ1bmN0aW9uIGdsb3dyYW1wYmFzZSgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBnbG93cmFtcGJhc2UpO1xuXG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG93cmFtcGJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBtZXNoLCB0ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2xvd3JhbXBiYXNlO1xuICB9KShfZ2xvd3JhbXAyWydkZWZhdWx0J10pO1xuXG4gIHJldHVybiBnbG93cmFtcGJhc2U7XG59XG5cbmZ1bmN0aW9uIG1ha2VCaWNvbG9yZWQobWVzaCwgdGV4dHVyZSkge1xuICB2YXIgYmljb2xvcmVkYmFzZSA9IChmdW5jdGlvbiAoX0JpY29sb3JlZERyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKGJpY29sb3JlZGJhc2UsIF9CaWNvbG9yZWREcmF3YWJsZSk7XG5cbiAgICBmdW5jdGlvbiBiaWNvbG9yZWRiYXNlKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIGJpY29sb3JlZGJhc2UpO1xuXG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihiaWNvbG9yZWRiYXNlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgbWVzaCwgdGV4dHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJpY29sb3JlZGJhc2U7XG4gIH0pKF9iaWNvbG9yZWQyWydkZWZhdWx0J10pO1xuXG4gIHJldHVybiBiaWNvbG9yZWRiYXNlO1xufVxuXG5Xb3JsZC5Qb3J0YWwgPSBtYWtlR2xvd3JhbXAobWVzaGVzLlBvcnRhbCwgdGV4dHVyZXMuR2xvd3JhbXApO1xuV29ybGQuV2F5cG9pbnQgPSBtYWtlR2xvd3JhbXAobWVzaGVzLldheXBvaW50LCB0ZXh0dXJlcy5XYXlwb2ludCk7XG5Xb3JsZC5BcnRpZmFjdHNSZWRHbG93ID0gbWFrZUdsb3dyYW1wKG1lc2hlcy5BcnRpZmFjdHNSZWRHbG93LCB0ZXh0dXJlcy5Db2xvckdsb3cpO1xuV29ybGQuQXJ0aWZhY3RzR3JlZW5HbG93ID0gbWFrZUdsb3dyYW1wKG1lc2hlcy5BcnRpZmFjdHNHcmVlbkdsb3csIHRleHR1cmVzLkNvbG9yR2xvdyk7XG5Xb3JsZC5BcnRpZmFjdHNQdXJwbGVHbG93ID0gbWFrZUdsb3dyYW1wKG1lc2hlcy5BcnRpZmFjdHNQdXJwbGVHbG93LCB0ZXh0dXJlcy5Db2xvckdsb3cpO1xuV29ybGQuQXJ0aWZhY3RzVGFyZ2V0R2xvdyA9IG1ha2VHbG93cmFtcChtZXNoZXMuQXJ0aWZhY3RzVGFyZ2V0R2xvdywgdGV4dHVyZXMuVGFyZ2V0R2xvdyk7XG5cbldvcmxkLlNoaWVsZCA9IG1ha2VCaWNvbG9yZWQobWVzaGVzLlNoaWVsZCwgdGV4dHVyZXMuU2hpZWxkRWZmZWN0KTtcbldvcmxkLlJlc29uYXRvciA9IG1ha2VCaWNvbG9yZWQobWVzaGVzLlJlc29uYXRvciwgdGV4dHVyZXMuRmxpcENhcmQpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBXb3JsZDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF90ZXh0dXJlZCA9IHJlcXVpcmUoJy4vdGV4dHVyZWQnKTtcblxudmFyIF90ZXh0dXJlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90ZXh0dXJlZCk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxudmFyIFBST0dSQU0gPSBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlByb2dyYW0uWG07XG52YXIgZGVmYXVsdFRlYW1Db2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10ueG1Db2xvcnMuY29yZUdsb3cpO1xudmFyIGRlZmF1bHRBbHRDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10ueG1Db2xvcnMuY29yZUdsb3dBbHQpO1xuXG52YXIgWG1EcmF3YWJsZSA9IChmdW5jdGlvbiAoX1RleHR1cmVkRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFhtRHJhd2FibGUsIF9UZXh0dXJlZERyYXdhYmxlKTtcblxuICBmdW5jdGlvbiBYbURyYXdhYmxlKG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSwgdGVhbUNvbG9yKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFhtRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoWG1EcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIFBST0dSQU0sIG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSk7XG4gICAgdGhpcy51bmlmb3Jtcy51X2VsYXBzZWRUaW1lID0gMDtcbiAgICB0aGlzLnVuaWZvcm1zLnVfdGVhbUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUodGVhbUNvbG9yIHx8IGRlZmF1bHRUZWFtQ29sb3IpO1xuICAgIHRoaXMudW5pZm9ybXMudV9hbHRDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGRlZmF1bHRBbHRDb2xvcik7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoWG1EcmF3YWJsZSwgW3tcbiAgICBrZXk6ICd1cGRhdGVUaW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVGltZShkZWx0YSkge1xuICAgICAgdmFyIHJldCA9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFhtRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVRpbWUnLCB0aGlzKS5jYWxsKHRoaXMsIGRlbHRhKTtcbiAgICAgIHRoaXMudW5pZm9ybXMudV9lbGFwc2VkVGltZSA9IHRoaXMuZWxhcHNlZCAvIDEwMDAgJSAzMDAuMCAqIDAuMTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFhtRHJhd2FibGU7XG59KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBYbURyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9hc3NldE1hbmFnZXIgPSByZXF1aXJlKCcuL2Fzc2V0LW1hbmFnZXInKTtcblxudmFyIF9hc3NldE1hbmFnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzZXRNYW5hZ2VyKTtcblxudmFyIF9yZW5kZXJlck9iamVjdCA9IHJlcXVpcmUoJy4vcmVuZGVyZXIvb2JqZWN0Jyk7XG5cbnZhciBfcmVuZGVyZXJPYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVuZGVyZXJPYmplY3QpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQgPSByZXF1aXJlKCcuL2RyYXdhYmxlL3dvcmxkJyk7XG5cbnZhciBfZHJhd2FibGVXb3JsZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVdvcmxkKTtcblxudmFyIF9kcmF3YWJsZVJlc291cmNlID0gcmVxdWlyZSgnLi9kcmF3YWJsZS9yZXNvdXJjZScpO1xuXG52YXIgX2RyYXdhYmxlUmVzb3VyY2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVSZXNvdXJjZSk7XG5cbnZhciBfZHJhd2FibGVJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2RyYXdhYmxlL2ludmVudG9yeScpO1xuXG52YXIgX2RyYXdhYmxlSW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlSW52ZW50b3J5KTtcblxudmFyIF9lbnRpdHlJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2VudGl0eS9pbnZlbnRvcnknKTtcblxudmFyIF9lbnRpdHlJbnZlbnRvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5SW52ZW50b3J5KTtcblxudmFyIF9lbnRpdHlQb3J0YWwgPSByZXF1aXJlKCcuL2VudGl0eS9wb3J0YWwnKTtcblxudmFyIF9lbnRpdHlQb3J0YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5UG9ydGFsKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgRW5naW5lID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRW5naW5lKGNhbnZhcywgYXNzZXRzLCBlbmFibGVTbmFwc2hvdHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW5naW5lKTtcblxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHZhciBvcHQgPSB7fTtcbiAgICBpZiAoZW5hYmxlU25hcHNob3RzKSB7XG4gICAgICBvcHQucHJlc2VydmVEcmF3aW5nQnVmZmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJywgb3B0KSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJywgb3B0KTtcbiAgICBpZiAoIWdsKSB7XG4gICAgICB0aHJvdyAnQ291bGQgbm90IGluaXRpYWxpemUgd2ViZ2wnO1xuICAgIH1cbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XG4gICAgdGhpcy5nbCA9IGdsO1xuICAgIHRoaXMudmlldyA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIF9nbE1hdHJpeC5tYXQ0Lmxvb2tBdCh0aGlzLnZpZXcsIFswLjAsIDIwLjAsIDI1LjBdLCBbMC4wLCAxMC4wLCAwLjBdLCBbMC4wLCAxLjAsIDAuMF0pO1xuXG4gICAgLy8gdGhpcyBzaG91bGQgYmUgaW4gcmFkaWFucywgbm90IGRlZ3JlZXMuXG4gICAgdGhpcy5oRm9WID0gTWF0aC5QSSAvIDQ7XG5cbiAgICB0aGlzLmZhciA9IDEwMDtcbiAgICB0aGlzLnByb2plY3QgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLmFzc2V0TWFuYWdlciA9IG5ldyBfYXNzZXRNYW5hZ2VyMlsnZGVmYXVsdCddKHRoaXMuZ2wsIGFzc2V0cyk7XG4gICAgdGhpcy5vYmplY3RSZW5kZXJlciA9IG5ldyBfcmVuZGVyZXJPYmplY3QyWydkZWZhdWx0J10odGhpcy5nbCwgdGhpcy5hc3NldE1hbmFnZXIpO1xuICAgIHRoaXMucmVzaXplKGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5zdGFydCA9IHRoaXMubGFzdCA9IG51bGw7XG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNsZWFyZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZyYW1lID0gbnVsbDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhFbmdpbmUsIFt7XG4gICAga2V5OiAncmVzaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcoKSB7XG4gICAgICB0aGlzLnByb2plY3QgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICAgIF9nbE1hdHJpeC5tYXQ0LnBlcnNwZWN0aXZlKHRoaXMucHJvamVjdCwgdGhpcy5oRm9WLCB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuY2FudmFzLmhlaWdodCwgMC4xLCB0aGlzLmZhcik7XG4gICAgICB0aGlzLm9iamVjdFJlbmRlcmVyLnVwZGF0ZVZpZXcodGhpcy52aWV3LCB0aGlzLnByb2plY3QpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgICAgdGhpcy5jbGVhcmVkID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5mcmFtZSkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGVtb0VudGl0aWVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVtb0VudGl0aWVzKCkge1xuICAgICAgdmFyIHggPSAtNSxcbiAgICAgICAgICB5ID0gMCxcbiAgICAgICAgICB6ID0gNDtcbiAgICAgIHZhciBpLCBpdGVtO1xuICAgICAgZm9yIChpIGluIF9lbnRpdHlJbnZlbnRvcnkyWydkZWZhdWx0J10pIHtcbiAgICAgICAgaXRlbSA9IG5ldyBfZW50aXR5SW52ZW50b3J5MlsnZGVmYXVsdCddW2ldKHRoaXMpO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgIGl0ZW0udHJhbnNsYXRlKF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoeCwgeSwgeikpO1xuICAgICAgICAgIHgrKztcbiAgICAgICAgICBpZiAoeCA+IDUpIHtcbiAgICAgICAgICAgIHggPSAtNTtcbiAgICAgICAgICAgIHotLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FkZGVkICcgKyBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHBvcnRhbCA9IG5ldyBfZW50aXR5UG9ydGFsMlsnZGVmYXVsdCddKHRoaXMpO1xuICAgICAgcG9ydGFsLnRyYW5zbGF0ZShfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHgsIHksIHopKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZW1vJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVtbygpIHtcbiAgICAgIHZhciB4ID0gLTUsXG4gICAgICAgICAgeSA9IDAsXG4gICAgICAgICAgeiA9IDQ7XG4gICAgICB2YXIgaSwgaXRlbTtcbiAgICAgIGZvciAoaSBpbiBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J10pIHtcbiAgICAgICAgaXRlbSA9IG5ldyBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J11baV0oKTtcbiAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICBfZ2xNYXRyaXgubWF0NC50cmFuc2xhdGUoaXRlbS53b3JsZCwgaXRlbS53b3JsZCwgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyh4LCB5LCB6KSk7XG4gICAgICAgICAgeCsrO1xuICAgICAgICAgIGlmICh4ID4gNSkge1xuICAgICAgICAgICAgeCA9IC01O1xuICAgICAgICAgICAgei0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm9iamVjdFJlbmRlcmVyLmFkZERyYXdhYmxlKGl0ZW0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRlZCAnICsgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpIGluIF9kcmF3YWJsZVJlc291cmNlMlsnZGVmYXVsdCddKSB7XG4gICAgICAgIGl0ZW0gPSBuZXcgX2RyYXdhYmxlUmVzb3VyY2UyWydkZWZhdWx0J11baV0oKTtcbiAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICBfZ2xNYXRyaXgubWF0NC50cmFuc2xhdGUoaXRlbS53b3JsZCwgaXRlbS53b3JsZCwgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyh4LCB5LCB6KSk7XG4gICAgICAgICAgeCsrO1xuICAgICAgICAgIGlmICh4ID4gNSkge1xuICAgICAgICAgICAgeCA9IC01O1xuICAgICAgICAgICAgei0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm9iamVjdFJlbmRlcmVyLmFkZERyYXdhYmxlKGl0ZW0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRlZCAnICsgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpIGluIF9kcmF3YWJsZVdvcmxkMlsnZGVmYXVsdCddKSB7XG4gICAgICAgIGl0ZW0gPSBuZXcgX2RyYXdhYmxlV29ybGQyWydkZWZhdWx0J11baV0oKTtcbiAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICBfZ2xNYXRyaXgubWF0NC50cmFuc2xhdGUoaXRlbS53b3JsZCwgaXRlbS53b3JsZCwgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyh4LCB5LCB6KSk7XG4gICAgICAgICAgeCsrO1xuICAgICAgICAgIGlmICh4ID4gNSkge1xuICAgICAgICAgICAgeCA9IC01O1xuICAgICAgICAgICAgei0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm9iamVjdFJlbmRlcmVyLmFkZERyYXdhYmxlKGl0ZW0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRlZCAnICsgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdyhkZWx0YSkge1xuICAgICAgdmFyIGdsID0gdGhpcy5nbDtcbiAgICAgIC8vIGRlZmF1bHQgc2V0dXAgc3R1ZmY6XG4gICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gICAgICAoMCwgX3V0aWxzLnJlc2V0R0wpKGdsKTtcbiAgICAgIC8vZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICAgIC8vZ2wuZGVwdGhNYXNrKGZhbHNlKTtcblxuICAgICAgLy8gcmVuZGVyIHBhc3NlczpcbiAgICAgIHRoaXMub2JqZWN0UmVuZGVyZXIucmVuZGVyKCk7XG5cbiAgICAgIC8vIHJ1biBhbmltYXRpb25zXG4gICAgICB0aGlzLm9iamVjdFJlbmRlcmVyLnVwZGF0ZVRpbWUoZGVsdGEpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcih0aWNrKSB7XG4gICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgdGhpcy5jbGVhcmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGRlbHRhID0gMDtcbiAgICAgIGlmICghdGhpcy5zdGFydCkge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gdGljaztcbiAgICAgICAgdGhpcy5sYXN0ID0gdGljaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbHRhID0gdGljayAtIHRoaXMubGFzdDtcbiAgICAgICAgdGhpcy5sYXN0ID0gdGljaztcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhdyhkZWx0YSk7XG4gICAgICAvLyBxdWV1ZSB1cCBuZXh0IGZyYW1lOlxuICAgICAgdGhpcy5mcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncHJlbG9hZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZWxvYWQoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmxvYWRBbGwoY2FsbGJhY2spO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBFbmdpbmU7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBFbmdpbmU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vLyBUT0RPOiBEZXByZWNhdGVcblxudmFyIEVudGl0eSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEVudGl0eShlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW50aXR5KTtcblxuICAgIHRoaXMuZHJhd2FibGVzID0ge307XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLmVuZ2luZSA9IGVuZ2luZTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhFbnRpdHksIFt7XG4gICAga2V5OiAnYWRkRHJhd2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGREcmF3YWJsZShuYW1lLCBkcmF3YWJsZSkge1xuICAgICAgLy8gYWRkIGRpc3Bvc2UgaWYgdGhpcyBhbHJlYWR5IGV4aXN0cy5cbiAgICAgIHRoaXMucmVtb3ZlRHJhd2FibGUobmFtZSk7XG4gICAgICB0aGlzLmRyYXdhYmxlc1tuYW1lXSA9IGRyYXdhYmxlO1xuICAgICAgdGhpcy5lbmdpbmUub2JqZWN0UmVuZGVyZXIuYWRkRHJhd2FibGUoZHJhd2FibGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZURyYXdhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRHJhd2FibGUobmFtZSwgZGVzdHJveSkge1xuICAgICAgLy8gZGlzcG9zZSBzdHVmZnMuXG4gICAgICBpZiAodGhpcy5kcmF3YWJsZXNbbmFtZV0pIHtcbiAgICAgICAgdGhpcy5lbmdpbmUub2JqZWN0UmVuZGVyZXIucmVtb3ZlRHJhd2FibGUodGhpcy5kcmF3YWJsZXNbbmFtZV0sIGRlc3Ryb3kpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FwcGx5VHJhbnNmb3JtJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXBwbHlUcmFuc2Zvcm0oKSB7XG4gICAgICBmb3IgKHZhciBpIGluIHRoaXMuZHJhd2FibGVzKSB7XG4gICAgICAgIHRoaXMuZHJhd2FibGVzW2ldLnNldE1hdHJpeCh0aGlzLnRyYW5zZm9ybSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndHJhbnNsYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHZlYykge1xuICAgICAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKHRoaXMudHJhbnNmb3JtLCB0aGlzLnRyYW5zZm9ybSwgdmVjKTtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyb3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByb3RhdGUocXVhdCkge1xuICAgICAgdmFyIHJvdGF0ZSA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgICAgX2dsTWF0cml4Lm1hdDQuZnJvbVF1YXQocm90YXRlLCBxdWF0KTtcbiAgICAgIF9nbE1hdHJpeC5tYXQ0Lm11bHRpcGx5KHRoaXMudHJhbnNmb3JtLCB0aGlzLnRyYW5zZm9ybSwgcm90YXRlKTtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZXRBbmltYXRpb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRBbmltYXRpb24oYW5pbWF0ZSkge1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmRyYXdhYmxlcykge1xuICAgICAgICB0aGlzLmRyYXdhYmxlc1tpXS5vblVwZGF0ZSA9IGFuaW1hdGU7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEVudGl0eTtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEVudGl0eTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZXhwb3J0cy5jcmVhdGVJdGVtRW50aXR5ID0gY3JlYXRlSXRlbUVudGl0eTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9lbnRpdHkgPSByZXF1aXJlKCcuLi9lbnRpdHknKTtcblxudmFyIF9lbnRpdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5KTtcblxudmFyIF9kcmF3YWJsZUludmVudG9yeSA9IHJlcXVpcmUoJy4uL2RyYXdhYmxlL2ludmVudG9yeScpO1xuXG52YXIgX2RyYXdhYmxlSW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlSW52ZW50b3J5KTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgSW52ZW50b3J5SXRlbXMgPSB7fTtcblxudmFyIHNpbXBsZSA9IHtcbiAgWG1wOiAnTDgnLFxuICBVbHRyYXN0cmlrZTogJ0w4JyxcbiAgUmVzU2hpZWxkOiAnVkVSWV9SQVJFJyxcbiAgUG93ZXJDdWJlOiAnTDgnLFxuICBMaW5rQW1wOiAnRVhUUkVNRUxZX1JBUkUnLFxuICBIZWF0U2luazogJ1ZFUllfUkFSRScsXG4gIE11bHRpSGFjazogJ1ZFUllfUkFSRScsXG4gIEZvcmNlQW1wOiAnUkFSRScsXG4gIFR1cnJldDogJ1JBUkUnLFxuICBSZXNvbmF0b3I6ICdMOCcsXG4gIENhcHN1bGU6ICdSQVJFJ1xufTtcblxuZnVuY3Rpb24gY3JlYXRlSXRlbUVudGl0eShuYW1lLCBjb2xvcikge1xuICB2YXIgZW50aXR5YmFzZSA9IChmdW5jdGlvbiAoX0VudGl0eSkge1xuICAgIF9pbmhlcml0cyhlbnRpdHliYXNlLCBfRW50aXR5KTtcblxuICAgIGZ1bmN0aW9uIGVudGl0eWJhc2UoZW5naW5lKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgZW50aXR5YmFzZSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKGVudGl0eWJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBlbmdpbmUpO1xuICAgICAgdGhpcy5hZGREcmF3YWJsZShuYW1lLCBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddW25hbWVdKCkpO1xuICAgICAgdGhpcy5hZGREcmF3YWJsZShuYW1lICsgJ1htJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXVtuYW1lICsgJ1htJ10oKSk7XG4gICAgICB0aGlzLmRyYXdhYmxlc1tuYW1lXS51bmlmb3Jtcy51X2NvbG9yMCA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGNvbG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW50aXR5YmFzZTtcbiAgfSkoX2VudGl0eTJbJ2RlZmF1bHQnXSk7XG5cbiAgcmV0dXJuIGVudGl0eWJhc2U7XG59XG5cbmZvciAodmFyIGkgaW4gc2ltcGxlKSB7XG4gIEludmVudG9yeUl0ZW1zW2ldID0gY3JlYXRlSXRlbUVudGl0eShpLCBfY29uc3RhbnRzMlsnZGVmYXVsdCddLnF1YWxpdHlDb2xvcnNbc2ltcGxlW2ldXSk7XG59XG5cbnZhciBGbGlwQ2FyZEFkYSA9IChmdW5jdGlvbiAoX0VudGl0eTIpIHtcbiAgX2luaGVyaXRzKEZsaXBDYXJkQWRhLCBfRW50aXR5Mik7XG5cbiAgZnVuY3Rpb24gRmxpcENhcmRBZGEoZW5naW5lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZsaXBDYXJkQWRhKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEZsaXBDYXJkQWRhLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZW5naW5lKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdGbGlwQ2FyZEFkYScsIG5ldyBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J10uRmxpcENhcmRBZGEoKSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnRmxpcENhcmRYbScsIG5ldyBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J10uRmxpcENhcmRYbSgpKTtcbiAgICB0aGlzLmRyYXdhYmxlcy5GbGlwQ2FyZFhtLnVuaWZvcm1zLnVfdGVhbUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS50ZWFtQ29sb3JzLlJFU0lTVEFOQ0UpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkQWRhLnVuaWZvcm1zLnVfY29sb3IxID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS50ZWFtQ29sb3JzLlJFU0lTVEFOQ0UpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkQWRhLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzLlZFUllfUkFSRSk7XG4gIH1cblxuICByZXR1cm4gRmxpcENhcmRBZGE7XG59KShfZW50aXR5MlsnZGVmYXVsdCddKTtcblxuSW52ZW50b3J5SXRlbXMuRmxpcENhcmRBZGEgPSBGbGlwQ2FyZEFkYTtcblxudmFyIEZsaXBDYXJkSmFydmlzID0gKGZ1bmN0aW9uIChfRW50aXR5Mykge1xuICBfaW5oZXJpdHMoRmxpcENhcmRKYXJ2aXMsIF9FbnRpdHkzKTtcblxuICBmdW5jdGlvbiBGbGlwQ2FyZEphcnZpcyhlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxpcENhcmRKYXJ2aXMpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRmxpcENhcmRKYXJ2aXMucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBlbmdpbmUpO1xuICAgIHRoaXMuYWRkRHJhd2FibGUoJ0ZsaXBDYXJkSmFydmlzJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5GbGlwQ2FyZEphcnZpcygpKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdGbGlwQ2FyZFhtJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5GbGlwQ2FyZFhtKCkpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkWG0udW5pZm9ybXMudV90ZWFtQ29sb3IgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnRlYW1Db2xvcnMuRU5MSUdIVEVORUQpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkSmFydmlzLnVuaWZvcm1zLnVfY29sb3IxID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS50ZWFtQ29sb3JzLkVOTElHSFRFTkVEKTtcbiAgICB0aGlzLmRyYXdhYmxlcy5GbGlwQ2FyZEphcnZpcy51bmlmb3Jtcy51X2NvbG9yMCA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10ucXVhbGl0eUNvbG9ycy5WRVJZX1JBUkUpO1xuICB9XG5cbiAgcmV0dXJuIEZsaXBDYXJkSmFydmlzO1xufSkoX2VudGl0eTJbJ2RlZmF1bHQnXSk7XG5cbkludmVudG9yeUl0ZW1zLkZsaXBDYXJkSmFydmlzID0gRmxpcENhcmRKYXJ2aXM7XG5cbnZhciBFeHRyYVNoaWVsZCA9IChmdW5jdGlvbiAoX0VudGl0eTQpIHtcbiAgX2luaGVyaXRzKEV4dHJhU2hpZWxkLCBfRW50aXR5NCk7XG5cbiAgZnVuY3Rpb24gRXh0cmFTaGllbGQoZW5naW5lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4dHJhU2hpZWxkKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEV4dHJhU2hpZWxkLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZW5naW5lKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdFeHRyYVNoaWVsZCcsIG5ldyBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J10uRXh0cmFTaGllbGQoKSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnUmVzU2hpZWxkWG0nLCBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddLlJlc1NoaWVsZFhtKCkpO1xuICAgIHRoaXMuZHJhd2FibGVzLkV4dHJhU2hpZWxkLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzLlZFUllfUkFSRSk7XG4gIH1cblxuICByZXR1cm4gRXh0cmFTaGllbGQ7XG59KShfZW50aXR5MlsnZGVmYXVsdCddKTtcblxuSW52ZW50b3J5SXRlbXMuRXh0cmFTaGllbGQgPSBFeHRyYVNoaWVsZDtcblxudmFyIEludGVyZXN0Q2Fwc3VsZSA9IChmdW5jdGlvbiAoX0VudGl0eTUpIHtcbiAgX2luaGVyaXRzKEludGVyZXN0Q2Fwc3VsZSwgX0VudGl0eTUpO1xuXG4gIGZ1bmN0aW9uIEludGVyZXN0Q2Fwc3VsZShlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSW50ZXJlc3RDYXBzdWxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEludGVyZXN0Q2Fwc3VsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGVuZ2luZSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnSW50ZXJlc3RDYXBzdWxlJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5JbnRlcmVzdENhcHN1bGUoKSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnQ2Fwc3VsZVhtJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5DYXBzdWxlWG0oKSk7XG4gICAgdGhpcy5kcmF3YWJsZXMuSW50ZXJlc3RDYXBzdWxlLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzLlZFUllfUkFSRSk7XG4gIH1cblxuICByZXR1cm4gSW50ZXJlc3RDYXBzdWxlO1xufSkoX2VudGl0eTJbJ2RlZmF1bHQnXSk7XG5cbkludmVudG9yeUl0ZW1zLkludGVyZXN0Q2Fwc3VsZSA9IEludGVyZXN0Q2Fwc3VsZTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gSW52ZW50b3J5SXRlbXM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2VudGl0eSA9IHJlcXVpcmUoJy4uL2VudGl0eScpO1xuXG52YXIgX2VudGl0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9lbnRpdHkpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQgPSByZXF1aXJlKCcuLi9kcmF3YWJsZS93b3JsZCcpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVXb3JsZCk7XG5cbnZhciBfZHJhd2FibGVSZXNvbmF0b3JMaW5rID0gcmVxdWlyZSgnLi4vZHJhd2FibGUvcmVzb25hdG9yLWxpbmsnKTtcblxudmFyIF9kcmF3YWJsZVJlc29uYXRvckxpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVSZXNvbmF0b3JMaW5rKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUG9ydGFsRW50aXR5ID0gKGZ1bmN0aW9uIChfRW50aXR5KSB7XG4gIF9pbmhlcml0cyhQb3J0YWxFbnRpdHksIF9FbnRpdHkpO1xuXG4gIGZ1bmN0aW9uIFBvcnRhbEVudGl0eShlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUG9ydGFsRW50aXR5KTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFBvcnRhbEVudGl0eS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGVuZ2luZSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnUG9ydGFsJywgbmV3IF9kcmF3YWJsZVdvcmxkMlsnZGVmYXVsdCddLlBvcnRhbCgpKTtcbiAgICAvLyB3aHkgNj8gSSBkdW5ubywgYXNrIE5pYW50aWNcbiAgICBfZ2xNYXRyaXgubWF0NC5zY2FsZSh0aGlzLmRyYXdhYmxlcy5Qb3J0YWwubG9jYWwsIHRoaXMuZHJhd2FibGVzLlBvcnRhbC5sb2NhbCwgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyg2LCA2LCA2KSk7XG4gICAgdGhpcy5zZXRDb2xvcihfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnRlYW1Db2xvcnMuTE9LSSkpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBvcnRhbEVudGl0eSwgW3tcbiAgICBrZXk6ICdzZXRDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldENvbG9yKGNvbG9yKSB7XG4gICAgICB0aGlzLmNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoY29sb3IpO1xuICAgICAgdGhpcy5kcmF3YWJsZXMuUG9ydGFsLnVuaWZvcm1zLnVfYmFzZUNvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgIGlmICh0aGlzLmRyYXdhYmxlcy5TaGllbGQpIHtcbiAgICAgICAgdGhpcy5kcmF3YWJsZXMuU2hpZWxkLnVuaWZvcm1zLnVfY29sb3IgPSB0aGlzLmNvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZHJhd2FibGVzLkFydGlmYWN0c0dyZWVuR2xvdykge1xuICAgICAgICB0aGlzLmRyYXdhYmxlcy5BcnRpZmFjdHNHcmVlbkdsb3cudV9iYXNlQ29sb3IgPSB0aGlzLmNvbG9yO1xuICAgICAgfVxuICAgICAgLypmb3IodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fcmVkcmF3TGluayhpKTtzZFxyXG4gICAgICB9Ki9cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGRSZXNvbmF0b3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRSZXNvbmF0b3IobGV2ZWwsIHNsb3QsIHJhbmdlLCBwZXJjZW50KSB7XG4gICAgICBpZiAocGVyY2VudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBlcmNlbnQgPSAxLjA7XG4gICAgICB9XG4gICAgICBpZiAoK3Nsb3QgPCAwIHx8ICtzbG90ID4gOCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nsb3Qgb3V0IG9mIGJvdW5kcyBmb3IgcmVzb25hdG9yJyk7XG4gICAgICB9XG4gICAgICBpZiAoIShsZXZlbCBpbiBfY29uc3RhbnRzMlsnZGVmYXVsdCddLnF1YWxpdHlDb2xvcnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbGV2ZWwgbXVzdCBiZSBvbmUgb2YgJyArIE9iamVjdC5rZXlzKF9jb25zdGFudHMyWydkZWZhdWx0J10ucXVhbGl0eUNvbG9ycykuam9pbignICcpKTtcbiAgICAgIH1cbiAgICAgIHJhbmdlID0gcmFuZ2UgPT09IHVuZGVmaW5lZCA/IDQwIDogcmFuZ2U7XG4gICAgICB2YXIgcmVzb25hdG9yTmFtZSA9ICdSZXNvbmF0b3InICsgK3Nsb3Q7XG4gICAgICB2YXIgbGlua05hbWUgPSAnTGluaycgKyArc2xvdDtcbiAgICAgIHZhciB0aGV0YSA9IHNsb3QgLyA4ICogMiAqIE1hdGguUEk7XG4gICAgICB2YXIgcmVzb25hdG9yID0gbmV3IF9kcmF3YWJsZVdvcmxkMlsnZGVmYXVsdCddLlJlc29uYXRvcigpO1xuICAgICAgdmFyIHggPSByYW5nZSAqIE1hdGguY29zKHRoZXRhKTtcbiAgICAgIHZhciB5ID0gcmFuZ2UgKiBNYXRoLnNpbih0aGV0YSk7XG4gICAgICB2YXIgbGluayA9IG5ldyBfZHJhd2FibGVSZXNvbmF0b3JMaW5rMlsnZGVmYXVsdCddKFswLCAwXSwgc2xvdCwgcmFuZ2UsIF9nbE1hdHJpeC52ZWM0LmNsb25lKHRoaXMuY29sb3IpLCAxLjApO1xuICAgICAgcmVzb25hdG9yLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzW2xldmVsXSk7XG4gICAgICByZXNvbmF0b3IubG9jYWwgPSBfZ2xNYXRyaXgubWF0NC5jbG9uZSh0aGlzLmRyYXdhYmxlcy5Qb3J0YWwubG9jYWwpO1xuICAgICAgLy9saW5rLmxvY2FsID0gbWF0NC5jbG9uZSh0aGlzLmRyYXdhYmxlcy5Qb3J0YWwubG9jYWwpO1xuICAgICAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKHJlc29uYXRvci5sb2NhbCwgcmVzb25hdG9yLmxvY2FsLCBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHggLyA2LCAwLCB5IC8gNikpO1xuICAgICAgcmVzb25hdG9yLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgbGluay51cGRhdGVNYXRyaXgoKTtcbiAgICAgIC8vIGtlZXAgdGhlIHBvcnRhbCBzb3J0ZWQgbGFzdCAodGhpcyBpcyBhIHRlcnJpYmxlIHdheSBvZiBkb2luZyB0aGlzLilcbiAgICAgIHRoaXMuYWRkRHJhd2FibGUobGlua05hbWUsIGxpbmspO1xuICAgICAgdGhpcy5hZGREcmF3YWJsZShyZXNvbmF0b3JOYW1lLCByZXNvbmF0b3IpO1xuICAgICAgdGhpcy5hZGREcmF3YWJsZSgnUG9ydGFsJywgdGhpcy5kcmF3YWJsZXMuUG9ydGFsKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW1vdmVSZXNvbmF0b3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVSZXNvbmF0b3Ioc2xvdCkge1xuICAgICAgaWYgKCtzbG90IDwgMCB8fCArc2xvdCA+IDgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzbG90IG91dCBvZiBib3VuZHMgZm9yIHJlc29uYXRvcicpO1xuICAgICAgfVxuICAgICAgdmFyIG5hbWUgPSAnUmVzb25hdG9yJyArICtzbG90O1xuICAgICAgdmFyIHJlc29uYXRvciA9IHRoaXMuZHJhd2FibGVzW25hbWVdIHx8IG51bGw7XG4gICAgICBpZiAocmVzb25hdG9yKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRHJhd2FibGUobmFtZSk7XG4gICAgICAgIHRoaXMuX3JlbW92ZVJlc29uYXRvckxpbmsoc2xvdCk7XG4gICAgICAgIHRoaXMuYWRkRHJhd2FibGUoJ1BvcnRhbCcsIHRoaXMuZHJhd2FibGVzLlBvcnRhbCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYWRkU2hpZWxkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkU2hpZWxkKCkge1xuICAgICAgaWYgKCEoJ1NoaWVsZCcgaW4gdGhpcy5kcmF3YWJsZXMpKSB7XG4gICAgICAgIHRoaXMuYWRkRHJhd2FibGUoJ1NoaWVsZCcsIG5ldyBfZHJhd2FibGVXb3JsZDJbJ2RlZmF1bHQnXS5TaGllbGQoKSk7XG4gICAgICAgIC8vIHdoeSAxMj8gSSBkb24ndCBrbm93LlxuICAgICAgICBfZ2xNYXRyaXgubWF0NC5zY2FsZSh0aGlzLmRyYXdhYmxlcy5TaGllbGQubG9jYWwsIHRoaXMuZHJhd2FibGVzLlNoaWVsZC5sb2NhbCwgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygxMiwgMTIsIDEyKSk7XG4gICAgICAgIHRoaXMuZHJhd2FibGVzLlNoaWVsZC51cGRhdGVNYXRyaXgoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd2FibGVzLlNoaWVsZC51bmlmb3Jtcy51X2NvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGRBcnRpZmFjdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEFydGlmYWN0KGFydGlmYWN0LCBuYW1lKSB7XG4gICAgICB2YXIgcm90YXRlID0gZnVuY3Rpb24gcm90YXRlKGRlbHRhIC8qLCBlbGFwc2VkKi8pIHtcbiAgICAgICAgX2dsTWF0cml4Lm1hdDQucm90YXRlWSh0aGlzLm1vZGVsLCB0aGlzLm1vZGVsLCBkZWx0YSAvIDEwMDApO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgICBpZiAoIShuYW1lIGluIHRoaXMuZHJhd2FibGVzKSkge1xuICAgICAgICB0aGlzLmFkZERyYXdhYmxlKG5hbWUsIGFydGlmYWN0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd2FibGVzW25hbWVdLm9uVXBkYXRlID0gcm90YXRlO1xuICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FkZEdsb3dNYXJrZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRHbG93TWFya2VyKG5hbWUsIGNvbG9yKSB7XG4gICAgICB2YXIgbiA9ICdBcnRpZmFjdHMnICsgbmFtZSArICdHbG93JztcbiAgICAgIGlmICghKG4gaW4gdGhpcy5kcmF3YWJsZXMpKSB7XG4gICAgICAgIHRoaXMuYWRkRHJhd2FibGUobiwgbmV3IF9kcmF3YWJsZVdvcmxkMlsnZGVmYXVsdCddW25dKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3YWJsZXNbbl0udW5pZm9ybXMudV9iYXNlQ29sb3IgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShjb2xvcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBvcnRhbEVudGl0eTtcbn0pKF9lbnRpdHkyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQb3J0YWxFbnRpdHk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEdMQm91bmQgPSBmdW5jdGlvbiBHTEJvdW5kKGdsKSB7XG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHTEJvdW5kKTtcblxuICB0aGlzLl9nbCA9IGdsO1xufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBHTEJvdW5kO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfZ2xCdWZmZXIgPSByZXF1aXJlKCcuL2dsLWJ1ZmZlcicpO1xuXG52YXIgX2dsQnVmZmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsQnVmZmVyKTtcblxudmFyIEdMQXR0cmlidXRlID0gKGZ1bmN0aW9uIChfR0xCdWZmZXIpIHtcbiAgX2luaGVyaXRzKEdMQXR0cmlidXRlLCBfR0xCdWZmZXIpO1xuXG4gIGZ1bmN0aW9uIEdMQXR0cmlidXRlKGdsLCBhdHRyaWJ1dGVzLCB2YWx1ZXMsIHVzYWdlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdMQXR0cmlidXRlKTtcblxuICAgIHVzYWdlID0gdXNhZ2UgfHwgZ2wuU1RBVElDX0RSQVc7XG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoR0xBdHRyaWJ1dGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCwgZ2wuQVJSQVlfQlVGRkVSLCB1c2FnZSk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLnNpemUgPSB0aGlzLmNvdW50ID0gbnVsbDtcbiAgICB0aGlzLl92YWxpZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDAsIGE7IGkgPCB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGEgPSB0aGlzLmF0dHJpYnV0ZXNbaV07XG4gICAgICB0aGlzLnNpemUgKz0gNCAqIGEuc2l6ZTsgLy8gNCBiZWNhdXNlIGZsb2F0IGlzIDQgYnl0ZXMuXG4gICAgICB0aGlzLndpZHRoICs9IGEuc2l6ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoR0xBdHRyaWJ1dGUsIFt7XG4gICAga2V5OiAndmFsaWRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgICAgIGlmICh0aGlzLl92YWxpZGF0ZSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoICUgdGhpcy53aWR0aCAhPT0gMCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybigndmFsdWVzIGFycmF5IGxlbmd0aCBpcyBub3QgYW4gZXZlbiBtdWx0aXBsZSBvZiB0aGUgdG90YWwgc2l6ZSBvZiB0aGUgYXR0cmlidXRlcycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVmFsdWVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVmFsdWVzKHZhbHVlcykge1xuICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdyhsb2NhdGlvbnMpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgdmFyIGEsXG4gICAgICAgICAgcyA9IDA7XG4gICAgICBpZiAoIXRoaXMuZ2xCdWYpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYmluZEJ1ZmZlcigpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYSA9IHRoaXMuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgaWYgKCEoYS5uYW1lIGluIGxvY2F0aW9ucykpIHtcbiAgICAgICAgICAvLyBJIGRvbid0IGtub3cgaWYgSSBzaG91bGQgc3VwcHJlc3MgdGhpcywgYnV0IGlmIElcbiAgICAgICAgICAvLyBkb24ndCwgaXQgZ2VuZXJhdGVzIG9uZSB3YXJuaW5nIHBlciBmcmFtZS5cbiAgICAgICAgICAvL2NvbnNvbGUud2FybignUHJvZ3JhbSBpcyBtaXNzaW5nIGF0dHJpYnV0ZSAnICsgYS5uYW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbnNbYS5uYW1lXSk7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb25zW2EubmFtZV0sIGEuc2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCB0aGlzLnNpemUsIHMpO1xuICAgICAgICBzICs9IDQgKiBhLnNpemU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpczsgLy8udW5iaW5kQnVmZmVyKCk7ICAvLyBtYXliZT9cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlYWNoQXR0cmlidXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZWFjaEF0dHJpYnV0ZShhdHRyaWJ1dGVJbmRleCwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBvZmZzZXQgPSAwLFxuICAgICAgICAgIHNpemUsXG4gICAgICAgICAgaTtcbiAgICAgIGlmIChhdHRyaWJ1dGVJbmRleCA+PSAwICYmIGF0dHJpYnV0ZUluZGV4IDwgdGhpcy5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXR0cmlidXRlSW5kZXg7IGkrKykge1xuICAgICAgICAgIG9mZnNldCArPSB0aGlzLmF0dHJpYnV0ZXNbaV0uc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBzaXplID0gdGhpcy5hdHRyaWJ1dGVzW2F0dHJpYnV0ZUluZGV4XS5zaXplO1xuICAgICAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCB0aGlzLnZhbHVlcy5sZW5ndGg7IGkgKz0gdGhpcy53aWR0aCkge1xuICAgICAgICAgIGNhbGxiYWNrKHRoaXMudmFsdWVzLnN1YmFycmF5KGksIGkgKyBzaXplKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gR0xBdHRyaWJ1dGU7XG59KShfZ2xCdWZmZXIyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBHTEF0dHJpYnV0ZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJvdW5kID0gcmVxdWlyZSgnLi4vZ2wtYm91bmQnKTtcblxudmFyIF9nbEJvdW5kMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsQm91bmQpO1xuXG52YXIgR0xCdWZmZXIgPSAoZnVuY3Rpb24gKF9HTEJvdW5kKSB7XG4gIF9pbmhlcml0cyhHTEJ1ZmZlciwgX0dMQm91bmQpO1xuXG4gIGZ1bmN0aW9uIEdMQnVmZmVyKGdsLCB0YXJnZXQsIHVzYWdlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdMQnVmZmVyKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEdMQnVmZmVyLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0IHx8IGdsLkFSUkFZX0JVRkZFUjsgLy8gcHJvYmFibHkgc2hvdWxkbid0IGRlZmF1bHQgdGhpcy5cbiAgICB0aGlzLnVzYWdlID0gdXNhZ2UgfHwgZ2wuU1RBVElDX0RSQVc7XG4gICAgdGhpcy5nbEJ1ZiA9IG51bGw7XG4gICAgdGhpcy52YWx1ZXMgPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEdMQnVmZmVyLCBbe1xuICAgIGtleTogJ2JpbmRCdWZmZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiaW5kQnVmZmVyKCkge1xuICAgICAgaWYgKCF0aGlzLnZhbHVlcykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ3RyeWluZyB0byB1cGRhdGUgYSBidWZmZXIgd2l0aCBubyB2YWx1ZXMuJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5nbEJ1Zikge1xuICAgICAgICB0aGlzLmdsQnVmID0gdGhpcy5fZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9nbC5iaW5kQnVmZmVyKHRoaXMudGFyZ2V0LCB0aGlzLmdsQnVmKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VuYmluZEJ1ZmZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuYmluZEJ1ZmZlcigpIHtcbiAgICAgIC8vIHRoaXMuX2dsLmJpbmRCdWZmZXIodGhpcy50YXJnZXQsIDApOyAgLy8gYXBwYXJlbnRseSB0aGlzIG1ha2VzIHdlYmdsIGNyYW5reVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgdGhpcy5iaW5kQnVmZmVyKCk7XG4gICAgICAvLyBpZiBJIGRvIGl0IHRoaXMgd2F5LCBkb2VzIGl0IGJyZWFrP1xuICAgICAgLy8gaWYgaXQgd29ya3MsIHdpbGwgdXBkYXRpbmcgdGhlIHVuZGVybHlpbmcgYnVmZmVyXG4gICAgICAvLyB1cGRhdGUgdGhlIGJ1ZmZlciB3aXRob3V0IG5lZWRpbmcgdG8gY2FsbCBnbC5idWZmZXJEYXRhIGFnYWluPz9cbiAgICAgIHRoaXMuX2dsLmJ1ZmZlckRhdGEodGhpcy50YXJnZXQsIHRoaXMudmFsdWVzLCB0aGlzLnVzYWdlKTtcbiAgICAgIHJldHVybiB0aGlzOyAvLyAudW5iaW5kQnVmZmVyKCk7IC8vIGFwcGFyZW50bHkgdGhpcyBtYWtlcyB3ZWJnbCBhbmdyeS5cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZXRWYWx1ZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRWYWx1ZXModmFsdWVzLCBvZmZzZXQpIHtcbiAgICAgIGlmICghdGhpcy52YWx1ZXMpIHtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlcy5zZXQodmFsdWVzLCBvZmZzZXQpO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBhIGNodW5rIG9mIGEgYnVmZmVyXG4gIH0sIHtcbiAgICBrZXk6ICdkZWxldGVXaXRoaW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWxldGVXaXRoaW4oc3RhcnQsIGVuZCkge1xuICAgICAgaWYgKCF0aGlzLnZhbHVlcykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RyeWluZyB0byBzcGxpY2UgYSBidWZmZXIgdGhhdCBoYXMgbm8gdmFsdWVzLicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgblZhbHVlcyA9IGVuZCAtIHN0YXJ0O1xuICAgICAgdmFyIGVtcHR5ID0gbmV3IHRoaXMudmFsdWVzLmNvbnN0cnVjdG9yKG5WYWx1ZXMpO1xuICAgICAgdGhpcy52YWx1ZXMuc2V0KHRoaXMudmFsdWVzLnN1YmFycmF5KGVuZCksIHN0YXJ0KTtcbiAgICAgIHRoaXMudmFsdWVzLnNldChlbXB0eSwgdGhpcy52YWx1ZXMubGVuZ3RoIC0gblZhbHVlcyk7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gZG8gc29tZXRoaW5nIHRvIGVhY2ggZWxlbWVudCBpbiBhIGJ1ZmZlclxuICB9LCB7XG4gICAga2V5OiAnbWFwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWFwKGNhbGxiYWNrLCBzdGFydCwgZW5kKSB7XG4gICAgICBzdGFydCA9IHN0YXJ0ID09PSB1bmRlZmluZWQgPyAwIDogc3RhcnQ7XG4gICAgICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMudmFsdWVzLmxlbmd0aCA6IGVuZDtcbiAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIHRoaXMudmFsdWVzW2ldID0gY2FsbGJhY2sodGhpcy52YWx1ZXNbaV0sIGkpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZUJ1ZmZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZUJ1ZmZlcih2YWx1ZXMpIHtcbiAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdMQnVmZmVyO1xufSkoX2dsQm91bmQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBHTEJ1ZmZlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJ1ZmZlciA9IHJlcXVpcmUoJy4vZ2wtYnVmZmVyJyk7XG5cbnZhciBfZ2xCdWZmZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCdWZmZXIpO1xuXG52YXIgR0xJbmRleCA9IChmdW5jdGlvbiAoX0dMQnVmZmVyKSB7XG4gIF9pbmhlcml0cyhHTEluZGV4LCBfR0xCdWZmZXIpO1xuXG4gIGZ1bmN0aW9uIEdMSW5kZXgoZ2wsIHZhbHVlcywgZHJhd01vZGUsIHVzYWdlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdMSW5kZXgpO1xuXG4gICAgdXNhZ2UgPSB1c2FnZSB8fCBnbC5TVEFUSUNfRFJBVztcbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihHTEluZGV4LnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB1c2FnZSk7XG4gICAgdGhpcy5tb2RlID0gZHJhd01vZGU7XG4gICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5jb3VudCA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoR0xJbmRleCwgW3tcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgaWYgKCF0aGlzLmdsQnVmKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJpbmRCdWZmZXIoKTtcbiAgICAgIH1cbiAgICAgIGdsLmRyYXdFbGVtZW50cyh0aGlzLm1vZGUsIHRoaXMudmFsdWVzLmxlbmd0aCwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdMSW5kZXg7XG59KShfZ2xCdWZmZXIyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBHTEluZGV4O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfZW5naW5lID0gcmVxdWlyZSgnLi9lbmdpbmUnKTtcblxudmFyIF9lbmdpbmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW5naW5lKTtcblxudmFyIF9hc3NldExvYWRlciA9IHJlcXVpcmUoJy4vYXNzZXQtbG9hZGVyJyk7XG5cbnZhciBfZHJhd2FibGVJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2RyYXdhYmxlL2ludmVudG9yeScpO1xuXG52YXIgX2RyYXdhYmxlSW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlSW52ZW50b3J5KTtcblxudmFyIF9kcmF3YWJsZVdvcmxkID0gcmVxdWlyZSgnLi9kcmF3YWJsZS93b3JsZCcpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVXb3JsZCk7XG5cbnZhciBfZHJhd2FibGVQb3J0YWxMaW5rID0gcmVxdWlyZSgnLi9kcmF3YWJsZS9wb3J0YWwtbGluaycpO1xuXG52YXIgX2RyYXdhYmxlUG9ydGFsTGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVBvcnRhbExpbmspO1xuXG52YXIgX2RyYXdhYmxlUmVzb25hdG9yTGluayA9IHJlcXVpcmUoJy4vZHJhd2FibGUvcmVzb25hdG9yLWxpbmsnKTtcblxudmFyIF9kcmF3YWJsZVJlc29uYXRvckxpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVSZXNvbmF0b3JMaW5rKTtcblxudmFyIF9kcmF3YWJsZVNwaGVyaWNhbFBvcnRhbExpbmsgPSByZXF1aXJlKCcuL2RyYXdhYmxlL3NwaGVyaWNhbC1wb3J0YWwtbGluaycpO1xuXG52YXIgX2RyYXdhYmxlU3BoZXJpY2FsUG9ydGFsTGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVNwaGVyaWNhbFBvcnRhbExpbmspO1xuXG52YXIgX2RyYXdhYmxlQXRtb3NwaGVyZSA9IHJlcXVpcmUoJy4vZHJhd2FibGUvYXRtb3NwaGVyZScpO1xuXG52YXIgX2RyYXdhYmxlQXRtb3NwaGVyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZUF0bW9zcGhlcmUpO1xuXG52YXIgX2RyYXdhYmxlVGV4dHVyZWRTcGhlcmUgPSByZXF1aXJlKCcuL2RyYXdhYmxlL3RleHR1cmVkLXNwaGVyZScpO1xuXG52YXIgX2RyYXdhYmxlVGV4dHVyZWRTcGhlcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVUZXh0dXJlZFNwaGVyZSk7XG5cbnZhciBfZW50aXR5SW52ZW50b3J5ID0gcmVxdWlyZSgnLi9lbnRpdHkvaW52ZW50b3J5Jyk7XG5cbnZhciBfZW50aXR5SW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudGl0eUludmVudG9yeSk7XG5cbnZhciBfZW50aXR5UG9ydGFsID0gcmVxdWlyZSgnLi9lbnRpdHkvcG9ydGFsJyk7XG5cbnZhciBfZW50aXR5UG9ydGFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudGl0eVBvcnRhbCk7XG5cbnZhciBfb3JiaXRDb250cm9scyA9IHJlcXVpcmUoJy4vb3JiaXQtY29udHJvbHMnKTtcblxudmFyIF9vcmJpdENvbnRyb2xzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29yYml0Q29udHJvbHMpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSB7XG4gIENvbnN0YW50czogX2NvbnN0YW50czJbJ2RlZmF1bHQnXSxcbiAgRW5naW5lOiBfZW5naW5lMlsnZGVmYXVsdCddLFxuICBVdGlsaXRpZXM6IHtcbiAgICBsb2FkUmVzb3VyY2U6IF9hc3NldExvYWRlci5sb2FkUmVzb3VyY2UsXG4gICAgcmVzZXRHTDogX3V0aWxzLnJlc2V0R0wsXG4gICAgc2V0UGFyYW1zOiBfdXRpbHMuc2V0UGFyYW1zLFxuICAgIGRpc2NvOiBfdXRpbHMuZGlzY28sXG4gICAgZ2VuZXJhdGVBcnRpZmFjdHM6IF91dGlscy5nZW5lcmF0ZUFydGlmYWN0c1xuICB9LFxuICBEcmF3YWJsZXM6IHtcbiAgICBJbnZlbnRvcnk6IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXSxcbiAgICBXb3JsZDogX2RyYXdhYmxlV29ybGQyWydkZWZhdWx0J10sXG4gICAgUmVzb25hdG9yTGluazogX2RyYXdhYmxlUmVzb25hdG9yTGluazJbJ2RlZmF1bHQnXSxcbiAgICBQb3J0YWxMaW5rOiBfZHJhd2FibGVQb3J0YWxMaW5rMlsnZGVmYXVsdCddLFxuICAgIFNwaGVyaWNhbFBvcnRhbExpbms6IF9kcmF3YWJsZVNwaGVyaWNhbFBvcnRhbExpbmsyWydkZWZhdWx0J10sXG4gICAgQXRtb3NwaGVyZTogX2RyYXdhYmxlQXRtb3NwaGVyZTJbJ2RlZmF1bHQnXSxcbiAgICBUZXh0dXJlZFNwaGVyZTogX2RyYXdhYmxlVGV4dHVyZWRTcGhlcmUyWydkZWZhdWx0J11cbiAgfSxcbiAgRW50aXRpZXM6IHtcbiAgICBXb3JsZDoge1xuICAgICAgUG9ydGFsOiBfZW50aXR5UG9ydGFsMlsnZGVmYXVsdCddXG4gICAgfSxcbiAgICBJbnZlbnRvcnk6IF9lbnRpdHlJbnZlbnRvcnkyWydkZWZhdWx0J11cbiAgfSxcbiAgQ29udHJvbHM6IHtcbiAgICBPcmJpdDogX29yYml0Q29udHJvbHMyWydkZWZhdWx0J11cbiAgfSxcbiAgVkVSU0lPTjogJzAuMTguMCdcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfZ2xCb3VuZCA9IHJlcXVpcmUoJy4vZ2wtYm91bmQnKTtcblxudmFyIF9nbEJvdW5kMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsQm91bmQpO1xuXG52YXIgTU9ERV9UUklBTkdMRVMgPSAndHJpYW5nbGVzJztcbnZhciBNT0RFX0xJTkVTID0gJ2xpbmVzJztcblxudmFyIE1lc2ggPSAoZnVuY3Rpb24gKF9HTEJvdW5kKSB7XG4gIF9pbmhlcml0cyhNZXNoLCBfR0xCb3VuZCk7XG5cbiAgZnVuY3Rpb24gTWVzaChnbCwgYXR0cmlidXRlcywgZmFjZXMsIGxpbmVzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1lc2gpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWVzaC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsKTtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgIHRoaXMuZmFjZXMgPSBmYWNlcztcbiAgICB0aGlzLmxpbmVzID0gbGluZXM7XG4gICAgdGhpcy5tb2RlID0gTU9ERV9UUklBTkdMRVM7XG4gICAgdGhpcy5ib3VuZHMgPSBudWxsO1xuICAgIHRoaXMuY2VudGVyID0gbnVsbDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhNZXNoLCBbe1xuICAgIGtleTogJ2RyYXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3KGxvY2F0aW9ucykge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVzLmRyYXcobG9jYXRpb25zKTtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09IE1PREVfVFJJQU5HTEVTKSB7XG4gICAgICAgIHRoaXMuZmFjZXMuZHJhdygpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09IE1PREVfTElORVMpIHtcbiAgICAgICAgdGhpcy5saW5lcy5kcmF3KCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYm91bmRpbmdCb3gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZGluZ0JveChjb29yZEF0dHJpYnV0ZSkge1xuICAgICAgaWYgKCF0aGlzLmJvdW5kcykge1xuICAgICAgICBjb29yZEF0dHJpYnV0ZSA9IGNvb3JkQXR0cmlidXRlID09PSB1bmRlZmluZWQgPyAwIDogY29vcmRBdHRyaWJ1dGU7XG4gICAgICAgIHZhciBib3VuZHMgPSB7XG4gICAgICAgICAgbWF4OiBudWxsLFxuICAgICAgICAgIG1pbjogbnVsbFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuZWFjaEF0dHJpYnV0ZShjb29yZEF0dHJpYnV0ZSwgZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgIGlmIChBcnJheS5wcm90b3R5cGUucmVkdWNlLmNhbGwoYXJyLCBmdW5jdGlvbiAocywgYSkge1xuICAgICAgICAgICAgcmV0dXJuIHMgKyBhO1xuICAgICAgICAgIH0sIDApID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChib3VuZHMubWF4KSB7XG4gICAgICAgICAgICBib3VuZHMubWF4ID0gYm91bmRzLm1heC5tYXAoZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGUsIGFycltpXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm91bmRzLm1heCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChib3VuZHMubWluKSB7XG4gICAgICAgICAgICBib3VuZHMubWluID0gYm91bmRzLm1pbi5tYXAoZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKGUsIGFycltpXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm91bmRzLm1pbiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ib3VuZHMgPSBib3VuZHM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5ib3VuZHM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2VudGVyT2ZNYXNzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2VudGVyT2ZNYXNzKGNvb3JkQXR0cmlidXRlKSB7XG4gICAgICBpZiAoIXRoaXMuY2VudGVyKSB7XG4gICAgICAgIGNvb3JkQXR0cmlidXRlID0gY29vcmRBdHRyaWJ1dGUgPT09IHVuZGVmaW5lZCA/IDAgOiBjb29yZEF0dHJpYnV0ZTtcbiAgICAgICAgdmFyIHN1bSA9IG51bGwsXG4gICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5lYWNoQXR0cmlidXRlKGNvb3JkQXR0cmlidXRlLCBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgICAgaWYgKEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChhcnIsIGZ1bmN0aW9uIChzLCBhKSB7XG4gICAgICAgICAgICByZXR1cm4gcyArIGE7XG4gICAgICAgICAgfSwgMCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgICBpZiAoc3VtKSB7XG4gICAgICAgICAgICBzdW0gPSBzdW0ubWFwKGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlICsgYXJyW2ldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1bSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc3VtLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHJldHVybiBlIC8gY291bnQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNlbnRlciA9IHN1bTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNlbnRlcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdib3VuZGluZ0JveENlbnRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kaW5nQm94Q2VudGVyKGNvb3JkQXR0cmlidXRlKSB7XG4gICAgICBpZiAoIXRoaXMuYm91bmRzKSB7XG4gICAgICAgIHRoaXMuYm91bmRpbmdCb3goY29vcmRBdHRyaWJ1dGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYm91bmRzLm1heC5tYXAoKGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgIHJldHVybiAoZSAtIHRoaXMuYm91bmRzLm1pbltpXSkgLyAyO1xuICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE1lc2g7XG59KShfZ2xCb3VuZDJbJ2RlZmF1bHQnXSk7XG5cbk1lc2guTU9ERV9MSU5FUyA9IE1PREVfTElORVM7XG5NZXNoLk1PREVfVFJJQU5HTEVTID0gTU9ERV9UUklBTkdMRVM7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IE1lc2g7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfbWVzaCA9IHJlcXVpcmUoJy4uL21lc2gnKTtcblxudmFyIF9tZXNoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2gpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL3ZlcnRleC1hdHRyaWJ1dGUnKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmVydGV4QXR0cmlidXRlKTtcblxudmFyIF9nbEdsSW5kZXggPSByZXF1aXJlKCcuLi9nbC9nbC1pbmRleCcpO1xuXG52YXIgX2dsR2xJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsSW5kZXgpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi9nbC9nbC1hdHRyaWJ1dGUnKTtcblxudmFyIF9nbEdsQXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xBdHRyaWJ1dGUpO1xuXG52YXIgX2phdmFEZXNlcmlhbGl6ZXIgPSByZXF1aXJlKCdqYXZhLWRlc2VyaWFsaXplcicpO1xuXG52YXIgX2phdmFEZXNlcmlhbGl6ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfamF2YURlc2VyaWFsaXplcik7XG5cbmZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlcyhidWYpIHtcbiAgdmFyIHYgPSBuZXcgRGF0YVZpZXcoYnVmLmJ1ZmZlciwgYnVmLmJ5dGVPZmZzZXQsIGJ1Zi5ieXRlTGVuZ3RoKSxcbiAgICAgIGMgPSAwO1xuICB2YXIgbiA9IHYuZ2V0VWludDMyKGMpLFxuICAgICAgdHlwZSxcbiAgICAgIHNpemUsXG4gICAgICBsZW4sXG4gICAgICBqLFxuICAgICAgbmFtZTtcbiAgYyArPSA0O1xuICB2YXIgYXR0cmlidXRlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIHR5cGUgPSB2LmdldFVpbnQzMihjKTtcbiAgICBpZiAodHlwZSAhPSAweDAxICYmIHR5cGUgIT0gMHgxMCkge1xuICAgICAgY29uc29sZS53YXJuKCd1bmtub3duIHR5cGUgJyArIHR5cGUpO1xuICAgIH1cbiAgICBjICs9IDQ7XG4gICAgc2l6ZSA9IHYuZ2V0VWludDMyKGMpO1xuICAgIGMgKz0gNDtcbiAgICBsZW4gPSB2LmdldFVpbnQxNihjKTtcbiAgICBjICs9IDI7XG4gICAgbmFtZSA9ICcnO1xuICAgIGZvciAoaiA9IDA7IGogPCBsZW47IGorKykge1xuICAgICAgbmFtZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHYuZ2V0VWludDgoYyArIGopKTtcbiAgICB9XG4gICAgYyArPSBsZW47XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKG5hbWUsIHNpemUpKTtcbiAgfVxuICByZXR1cm4gYXR0cmlidXRlcztcbn1cblxudmFyIEZpbGVNZXNoID0gKGZ1bmN0aW9uIChfTWVzaCkge1xuICBfaW5oZXJpdHMoRmlsZU1lc2gsIF9NZXNoKTtcblxuICBmdW5jdGlvbiBGaWxlTWVzaChnbCwgYXJyYXlidWYpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmlsZU1lc2gpO1xuXG4gICAgdmFyIGpkID0gbmV3IF9qYXZhRGVzZXJpYWxpemVyMlsnZGVmYXVsdCddKGFycmF5YnVmKTtcbiAgICB2YXIgYmxvY2tzID0gamQuZ2V0Q29udGVudHMoKTtcblxuICAgIC8vIHNob3VsZCBiZSBGbG9hdDMyQXJyYXlcbiAgICB2YXIgdmFsdWVzID0gYmxvY2tzWzBdLmVsZW1lbnRzO1xuXG4gICAgLy8gc2hvdWxkIGJlIEFycmF5QnVmZmVyXG4gICAgdmFyIGF0dHJpYnV0ZURhdGEgPSBibG9ja3NbM107XG5cbiAgICAvLyBhcnJheSBvZiBWZXJ0ZXhBdHRyaWJ1dGVzXG4gICAgdmFyIHNwZWMgPSBwYXJzZUF0dHJpYnV0ZXMoYXR0cmlidXRlRGF0YSk7XG5cbiAgICAvLyBzaG91bGQgYmUgVWludDE2QXJyYXlcbiAgICB2YXIgZmFjZXMgPSBuZXcgX2dsR2xJbmRleDJbJ2RlZmF1bHQnXShnbCwgYmxvY2tzWzFdLmVsZW1lbnRzLCBnbC5UUklBTkdMRVMpO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gbmV3IF9nbEdsQXR0cmlidXRlMlsnZGVmYXVsdCddKGdsLCBzcGVjLCB2YWx1ZXMpO1xuXG4gICAgLy8gc2hvdWxkIGJlIFVpbnQxNkFycmF5XG4gICAgdmFyIGxpbmVzID0gbmV3IF9nbEdsSW5kZXgyWydkZWZhdWx0J10oZ2wsIGJsb2Nrc1syXS5lbGVtZW50cywgZ2wuTElORVMpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRmlsZU1lc2gucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCwgYXR0cmlidXRlcywgZmFjZXMsIGxpbmVzKTtcbiAgfVxuXG4gIHJldHVybiBGaWxlTWVzaDtcbn0pKF9tZXNoMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gRmlsZU1lc2g7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfbWVzaCA9IHJlcXVpcmUoJy4uL21lc2gnKTtcblxudmFyIF9tZXNoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2gpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL3ZlcnRleC1hdHRyaWJ1dGUnKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmVydGV4QXR0cmlidXRlKTtcblxudmFyIF9nbEdsSW5kZXggPSByZXF1aXJlKCcuLi9nbC9nbC1pbmRleCcpO1xuXG52YXIgX2dsR2xJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsSW5kZXgpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi9nbC9nbC1hdHRyaWJ1dGUnKTtcblxudmFyIF9nbEdsQXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xBdHRyaWJ1dGUpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8vIFRPRE86IFBhcmFtZXRlcml6ZSB0aGlzIGNvbmNlcHQgYSBsaXR0bGUgYmV0dGVyXG4vLyB0aGlzIGhhcyBwb3RlbnRpYWwgdG8gYmUgYSByZWFsbHkgZmxleGlibGUgYW5kIHBvd2VyZnVsIHdheSBvZlxuLy8gbWFraW5nLCBlc3NlbnRpYWxseSwgZXh0cnVkZWQgZ2VvbWV0cnkuXG5cbi8vIDkgc2V0cyBvZiA2IHBvaW50cywgYnJlYWtpbmcgdGhlIGxpbmsgaW50byA4IHBpZWNlcywgZWFjaCBwcm92aWRpbmcgNiBmYWNlcywgc29tZXRoaW5nIGxpa2UgdGhhdD9cbnZhciBfbGVuID0gOSxcbiAgICBfc2l6ZSA9IF9sZW4gKiA2LFxuICAgIF9jaHVua1NpemUgPSAxMjtcbnZhciBjID0gbmV3IEFycmF5KF9sZW4pLFxuICAgIGQgPSBuZXcgQXJyYXkoX2xlbiksXG4gICAgZSA9IG5ldyBBcnJheShfbGVuKTtcblxudmFyIGJhc2VDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC40NiwgMC4xOCwgMC4xOCwgMS4wKTtcbnZhciBiYXNlT2Zmc2V0ID0gX2dsTWF0cml4LnZlYzQuY3JlYXRlKCk7XG5cbmZ1bmN0aW9uIGNsYW1wZWRTaW4oZikge1xuICByZXR1cm4gTWF0aC5zaW4oTWF0aC5QSSAqIE1hdGgubWF4KE1hdGgubWluKDEuMCwgZiksIDApIC8gMik7XG59XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gIHZhciBmID0gaSAvIDguMDtcbiAgY1tpXSA9IGY7XG4gIGVbaV0gPSAzLjAgKyAtMS41ICogTWF0aC5wb3coY2xhbXBlZFNpbigyLjAgKiBNYXRoLmFicyhmIC0gMC41KSksIDQpO1xuICBkW2ldID0gY2xhbXBlZFNpbigxLjAgLSAyLjAgKiBNYXRoLmFicyhmIC0gMC41KSk7XG59XG5cbmZ1bmN0aW9uIGZpbGxDaHVuayhidWYsIGluZGV4LCB4LCB5LCB6LCB1LCB2LCBub3JtYWwsIGY2LCBjb2xvcikge1xuICB2YXIgb2ZmID0gaW5kZXggKiBfY2h1bmtTaXplO1xuICBidWZbb2ZmICsgMF0gPSB4O1xuICBidWZbb2ZmICsgMV0gPSB5O1xuICBidWZbb2ZmICsgMl0gPSB6O1xuICBidWZbb2ZmICsgM10gPSBmNjtcbiAgYnVmW29mZiArIDRdID0gdTtcbiAgYnVmW29mZiArIDVdID0gdjtcbiAgYnVmW29mZiArIDZdID0gbm9ybWFsWzBdO1xuICBidWZbb2ZmICsgN10gPSBub3JtYWxbMl07XG4gIGJ1ZltvZmYgKyA4XSA9IGNvbG9yWzBdO1xuICBidWZbb2ZmICsgOV0gPSBjb2xvclsxXTtcbiAgYnVmW29mZiArIDEwXSA9IGNvbG9yWzJdO1xuICBidWZbb2ZmICsgMTFdID0gY29sb3JbM107XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUxpbmtBdHRyaWJ1dGVzKHN0YXJ0LCBlbmQsIGNvbG9yLCBzdGFydFBlcmNlbnQsIGVuZFBlcmNlbnQpIHtcbiAgc3RhcnRQZXJjZW50ID0gc3RhcnRQZXJjZW50ID09PSB1bmRlZmluZWQgPyAxIDogTWF0aC5tYXgoTWF0aC5taW4oc3RhcnRQZXJjZW50LCAxKSwgMCk7XG4gIGVuZFBlcmNlbnQgPSBlbmRQZXJjZW50ID09PSB1bmRlZmluZWQgPyAxIDogTWF0aC5tYXgoTWF0aC5taW4oZW5kUGVyY2VudCwgMSksIDApO1xuICB2YXIgdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShfc2l6ZSAqIF9jaHVua1NpemUpO1xuICB2YXIgbGVuZ3RoID0gTWF0aC5zcXJ0KChlbmRbMF0gLSBzdGFydFswXSkgKiAoZW5kWzBdIC0gc3RhcnRbMF0pICsgKGVuZFsxXSAtIHN0YXJ0WzFdKSAqIChlbmRbMV0gLSBzdGFydFsxXSkpO1xuICB2YXIgeU1pbiA9IGJhc2VPZmZzZXRbMV0sXG4gICAgICB5TWF4ID0geU1pbiArIE1hdGgubWluKDMwLjAsIDAuMDggKiBsZW5ndGgpLFxuICAgICAgYXZnUGVyY2VudCA9IChzdGFydFBlcmNlbnQgKyBlbmRQZXJjZW50KSAvIDIuMCxcbiAgICAgIGY2ID0gMC4wMSAqIGxlbmd0aCxcbiAgICAgIGY3ID0gMC4xICsgYXZnUGVyY2VudCAqIDAuMztcbiAgdmFyIHZlYyA9IF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoZW5kWzBdLCAwLCBlbmRbMV0pO1xuICBfZ2xNYXRyaXgudmVjMy5zdWJ0cmFjdCh2ZWMsIHZlYywgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyhzdGFydFswXSwgMCwgc3RhcnRbMV0pKTtcbiAgdmFyIHVwID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCAxLCAwKTtcbiAgdmFyIHJpZ2h0ID0gX2dsTWF0cml4LnZlYzMuY3Jvc3MoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHZlYywgdXApO1xuICBfZ2xNYXRyaXgudmVjMy5ub3JtYWxpemUocmlnaHQsIHJpZ2h0KTtcbiAgdmFyIHN0ZXAgPSBfbGVuICogMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICB2YXIgZjggPSBjW2ldLFxuICAgICAgICBmOSA9IHN0YXJ0UGVyY2VudCArIGY4ICogKGVuZFBlcmNlbnQgLSBzdGFydFBlcmNlbnQpLFxuICAgICAgICBmMTAgPSAwLjYgKyAwLjM1ICogZjksXG4gICAgICAgIGYxMiA9IGY4ICogZjYsXG4gICAgICAgIGYxMyA9IHN0YXJ0WzBdICsgZjggKiB2ZWNbMF0sXG4gICAgICAgIGYxNCA9IHN0YXJ0WzFdICsgZjggKiB2ZWNbMl0sXG4gICAgICAgIGYxNSA9IHlNaW4gKyBkW2ldICogKHlNYXggLSB5TWluKSxcbiAgICAgICAgZjE2ID0gZVtpXTtcbiAgICB2YXIgY2wgPSBfZ2xNYXRyaXgudmVjNC5sZXJwKF9nbE1hdHJpeC52ZWM0LmNyZWF0ZSgpLCBiYXNlQ29sb3IsIGNvbG9yLCAwLjI1ICsgZjkgKiAwLjc1KTtcbiAgICBjbFszXSA9IGYxMDtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBpICogMiwgZjEzICsgZjE2ICogcmlnaHRbMF0sIGYxNSwgZjE0ICsgZjE2ICogcmlnaHRbMl0sIDAsIGYxMiwgdXAsIGY3LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgaSAqIDIgKyAxLCBmMTMgLSBmMTYgKiByaWdodFswXSwgZjE1LCBmMTQgLSBmMTYgKiByaWdodFsyXSwgMC41LCBmMTIsIHVwLCBmNywgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIHN0ZXAgKyBpICogMiwgZjEzLCBmMTUgKyBmMTYsIGYxNCwgMCwgZjEyLCByaWdodCwgZjcsIGNsKTtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBzdGVwICsgaSAqIDIgKyAxLCBmMTMsIGYxNSAtIGYxNiwgZjE0LCAwLjUsIGYxMiwgcmlnaHQsIGY3LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgMiAqIHN0ZXAgKyBpICogMiwgZjEzLCBmMTUgLSBmMTYsIGYxNCwgMC41LCBmMTIsIHJpZ2h0LCBmNywgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIDIgKiBzdGVwICsgaSAqIDIgKyAxLCBmMTMsIDAsIGYxNCwgMS4wLCBmMTIsIHJpZ2h0LCBmNywgY2wpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUZhY2VzKHZlcnRleE9mZnNldCkge1xuICB2YXIgaW5kID0gbmV3IFVpbnQxNkFycmF5KDE0NCksXG4gICAgICBpT2ZmID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2xlbiAtIDE7IGorKykge1xuXG4gICAgICBpbmRbaU9mZiArIDBdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgMV0gPSB2ZXJ0ZXhPZmZzZXQgKyAwO1xuICAgICAgaW5kW2lPZmYgKyAyXSA9IHZlcnRleE9mZnNldCArIDI7XG4gICAgICBpbmRbaU9mZiArIDNdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgNF0gPSB2ZXJ0ZXhPZmZzZXQgKyAyO1xuICAgICAgaW5kW2lPZmYgKyA1XSA9IHZlcnRleE9mZnNldCArIDM7XG4gICAgICB2ZXJ0ZXhPZmZzZXQgKz0gMjtcbiAgICAgIGlPZmYgKz0gNjtcbiAgICB9XG4gICAgdmVydGV4T2Zmc2V0ICs9IDI7XG4gIH1cblxuICByZXR1cm4gaW5kO1xufVxuXG52YXIgUG9ydGFsTGlua01lc2ggPSAoZnVuY3Rpb24gKF9NZXNoKSB7XG4gIF9pbmhlcml0cyhQb3J0YWxMaW5rTWVzaCwgX01lc2gpO1xuXG4gIGZ1bmN0aW9uIFBvcnRhbExpbmtNZXNoKGdsLCBzdGFydCwgZW5kLCBjb2xvciwgc3RhcnRQZXJjZW50LCBlbmRQZXJjZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBvcnRhbExpbmtNZXNoKTtcblxuICAgIHZhciBidWYgPSBfZ2VuZXJhdGVMaW5rQXR0cmlidXRlcyhzdGFydCwgZW5kLCBjb2xvciwgc3RhcnRQZXJjZW50LCBlbmRQZXJjZW50KTtcbiAgICB2YXIgaW5kID0gX2dlbmVyYXRlRmFjZXMoMCk7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBbXTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfcG9zaXRpb24nLCA0KSk7XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3RleENvb3JkMCcsIDQpKTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfY29sb3InLCA0KSk7XG4gICAgdmFyIGF0dHJpYnV0ZSA9IG5ldyBfZ2xHbEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXShnbCwgYXR0cmlidXRlcywgYnVmLCBnbC5EWU5BTUlDX0RSQVcpO1xuICAgIHZhciBmYWNlcyA9IG5ldyBfZ2xHbEluZGV4MlsnZGVmYXVsdCddKGdsLCBpbmQsIGdsLlRSSUFOR0xFUyk7XG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUG9ydGFsTGlua01lc2gucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCwgYXR0cmlidXRlLCBmYWNlcyk7XG4gIH1cblxuICByZXR1cm4gUG9ydGFsTGlua01lc2g7XG59KShfbWVzaDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFBvcnRhbExpbmtNZXNoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX21lc2ggPSByZXF1aXJlKCcuLi9tZXNoJyk7XG5cbnZhciBfbWVzaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNoKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi92ZXJ0ZXgtYXR0cmlidXRlJyk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlcnRleEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xHbEluZGV4ID0gcmVxdWlyZSgnLi4vZ2wvZ2wtaW5kZXgnKTtcblxudmFyIF9nbEdsSW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEluZGV4KTtcblxudmFyIF9nbEdsQXR0cmlidXRlID0gcmVxdWlyZSgnLi4vZ2wvZ2wtYXR0cmlidXRlJyk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsQXR0cmlidXRlKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vLyBUT0RPOiBQYXJhbWV0ZXJpemUgdGhpcyBjb25jZXB0IGEgbGl0dGxlIGJldHRlclxuLy8gdGhpcyBoYXMgcG90ZW50aWFsIHRvIGJlIGEgcmVhbGx5IGZsZXhpYmxlIGFuZCBwb3dlcmZ1bCB3YXkgb2Zcbi8vIG1ha2luZywgZXNzZW50aWFsbHksIGV4dHJ1ZGVkIGdlb21ldHJ5LlxuXG4vLyA1IHNldHMgb2YgNCBwb2ludHMsIGJyZWFraW5nIHRoZSBsaW5rIGludG8gNCBwaWVjZXMsIGVhY2ggcHJvdmlkaW5nIDQgZmFjZXNcbi8vIGNodW5rc2l6ZSBpcyBzaXplIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgcGFja2VkIHZlcnRleCBhcnJheSwgaW4gYnl0ZXNcbnZhciBfbGVuID0gNSxcbiAgICBfc2l6ZSA9IF9sZW4gKiA0LFxuICAgIF9jaHVua1NpemUgPSAxMjtcbnZhciBqID0gbmV3IEFycmF5KF9sZW4pLFxuICAgIGsgPSBuZXcgQXJyYXkoX2xlbiksXG4gICAgbCA9IG5ldyBBcnJheShfbGVuKTtcblxuZnVuY3Rpb24gY2xhbXBlZFNpbihmKSB7XG4gIHJldHVybiBNYXRoLnNpbihNYXRoLlBJICogTWF0aC5tYXgoTWF0aC5taW4oMS4wLCBmKSwgMCkgLyAyKTtcbn1cblxuZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgdmFyIGYgPSBpIC8gNC4wO1xuICBqW2ldID0gZjtcbiAgbFtpXSA9IDMuNSAqIE1hdGgubWF4KDEuMCAtIE1hdGgucG93KGNsYW1wZWRTaW4oMi4wICogTWF0aC5hYnMoZiAtIDAuNSkpLCA0LjApLCAwLjIpO1xuICBrW2ldID0gY2xhbXBlZFNpbigxLjAgLSAyLjAgKiBNYXRoLmFicyhmIC0gMC41KSk7XG59XG5cbnZhciBiYXNlQ29sb3IgPSBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzgsIDAuMzEsIDAuMzEsIDEuMCk7XG52YXIgcmVzb25hdG9yTWlkT2Zmc2V0ID0gMDtcbnZhciBwb3J0YWxCYXNlT2Zmc2V0ID0gMDtcbnZhciB1cCA9IF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMCwgMSwgMCk7XG5cbmZ1bmN0aW9uIGZpbGxDaHVuayhidWYsIGluZGV4LCB4LCB5LCB6LCB1LCB2LCBub3JtYWwsIGY2LCBjb2xvcikge1xuICB2YXIgb2ZmID0gaW5kZXggKiBfY2h1bmtTaXplO1xuICBidWZbb2ZmICsgMF0gPSB4O1xuICBidWZbb2ZmICsgMV0gPSB5O1xuICBidWZbb2ZmICsgMl0gPSB6O1xuICBidWZbb2ZmICsgM10gPSBmNjtcbiAgYnVmW29mZiArIDRdID0gdTtcbiAgYnVmW29mZiArIDVdID0gdjtcbiAgYnVmW29mZiArIDZdID0gbm9ybWFsWzBdO1xuICBidWZbb2ZmICsgN10gPSBub3JtYWxbMl07XG4gIGJ1ZltvZmYgKyA4XSA9IGNvbG9yWzBdO1xuICBidWZbb2ZmICsgOV0gPSBjb2xvclsxXTtcbiAgYnVmW29mZiArIDEwXSA9IGNvbG9yWzJdO1xuICBidWZbb2ZmICsgMTFdID0gY29sb3JbM107XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUxpbmtBdHRyaWJ1dGVzKHBvcnRhbCwgcmVzb25hdG9yLCBjb2xvciwgcmVzb25hdG9yUGVyY2VudCkge1xuICByZXNvbmF0b3JQZXJjZW50ID0gcmVzb25hdG9yUGVyY2VudCA9PT0gdW5kZWZpbmVkID8gMSA6IE1hdGgubWF4KE1hdGgubWluKHJlc29uYXRvclBlcmNlbnQsIDEpLCAwKTtcbiAgdmFyIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoX3NpemUgKiBfY2h1bmtTaXplKTtcbiAgdmFyIGRpc3QgPSBNYXRoLnNxcnQoKHJlc29uYXRvclswXSAtIHBvcnRhbFswXSkgKiAocmVzb25hdG9yWzBdIC0gcG9ydGFsWzBdKSArIChyZXNvbmF0b3JbMV0gLSBwb3J0YWxbMV0pICogKHJlc29uYXRvclsxXSAtIHBvcnRhbFsxXSkpO1xuICB2YXIgZjQgPSAyIC8gMzAgKiBkaXN0LFxuICAgICAgZjUgPSAwLjkgKyAwLjEgKiByZXNvbmF0b3JQZXJjZW50LFxuICAgICAgZjYgPSAwLjY1ICsgMC4zNSAqIHJlc29uYXRvclBlcmNlbnQsXG4gICAgICBmOCA9IDAuMSArIDAuMyAqIHJlc29uYXRvclBlcmNlbnQ7XG4gIHZhciBjbCA9IF9nbE1hdHJpeC52ZWM0LmxlcnAoX2dsTWF0cml4LnZlYzQuY3JlYXRlKCksIGJhc2VDb2xvciwgY29sb3IsIDAuMSArIHJlc29uYXRvclBlcmNlbnQgKiAwLjg1KTtcbiAgY2xbM10gPSAwLjc1ICsgMC4yNSAqIHJlc29uYXRvclBlcmNlbnQgKiBjbFszXTtcbiAgdmFyIHZlYyA9IF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMocmVzb25hdG9yWzBdLCAwLCByZXNvbmF0b3JbMV0pO1xuICBfZ2xNYXRyaXgudmVjMy5zdWJ0cmFjdCh2ZWMsIHZlYywgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyhwb3J0YWxbMF0sIDAsIHBvcnRhbFsxXSkpO1xuICB2YXIgcmlnaHQgPSBfZ2xNYXRyaXgudmVjMy5jcm9zcyhfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgdmVjLCB1cCk7XG4gIF9nbE1hdHJpeC52ZWMzLm5vcm1hbGl6ZShyaWdodCwgcmlnaHQpO1xuICB2YXIgc3RlcCA9IF9sZW4gKiAyO1xuICB2YXIgZjEwID0gNS4wICogKHBvcnRhbFswXSArIHBvcnRhbFsxXSAtIE1hdGguZmxvb3IocG9ydGFsWzBdICsgcG9ydGFsWzFdKSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgdmFyIGYxMSA9IGpbaV0sXG4gICAgICAgIGYxMiA9IHBvcnRhbFswXSArIGYxMSAqIHZlY1swXSxcbiAgICAgICAgZjEzID0gcG9ydGFsWzFdICsgZjExICogdmVjWzJdLFxuICAgICAgICBmMTQgPSBwb3J0YWxCYXNlT2Zmc2V0ICsgZjExICogKHJlc29uYXRvck1pZE9mZnNldCAtIHBvcnRhbEJhc2VPZmZzZXQpICsgZjUgKiBrW2ldLFxuICAgICAgICBmMTUgPSBmNiAqIGxbaV0sXG4gICAgICAgIGYxNiA9IGYxMSAqIGY0O1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIGkgKiAyICsgMCwgZjEyICsgZjE1ICogcmlnaHRbMF0sIGYxNCwgZjEzICsgZjE1ICogcmlnaHRbMl0sIDAuMCwgZjE2ICsgZjEwLCB1cCwgZjgsIGNsKTtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBpICogMiArIDEsIGYxMiAtIGYxNSAqIHJpZ2h0WzBdLCBmMTQsIGYxMyAtIGYxNSAqIHJpZ2h0WzJdLCAxLjAsIGYxNiArIGYxMCwgdXAsIGY4LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgc3RlcCArIGkgKiAyICsgMCwgZjEyLCBmMTQgKyBmMTUsIGYxMywgMC4wLCBmMTYgKyBmMTAsIHJpZ2h0LCBmOCwgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIHN0ZXAgKyBpICogMiArIDEsIGYxMiwgZjE0IC0gZjE1LCBmMTMsIDEuMCwgZjE2ICsgZjEwLCByaWdodCwgZjgsIGNsKTtcbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBfZ2VuZXJhdGVGYWNlcyh2ZXJ0ZXhPZmZzZXQpIHtcbiAgdmFyIGluZCA9IG5ldyBVaW50MTZBcnJheSg0OCksXG4gICAgICBpT2ZmID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgMjsgaSsrKSB7XG4gICAgZm9yICh2YXIgaTIgPSAwOyBpMiA8IF9sZW4gLSAxOyBpMisrKSB7XG4gICAgICBpbmRbaU9mZiArIDBdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgMV0gPSB2ZXJ0ZXhPZmZzZXQgKyAwO1xuICAgICAgaW5kW2lPZmYgKyAyXSA9IHZlcnRleE9mZnNldCArIDI7XG4gICAgICBpbmRbaU9mZiArIDNdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgNF0gPSB2ZXJ0ZXhPZmZzZXQgKyAyO1xuICAgICAgaW5kW2lPZmYgKyA1XSA9IHZlcnRleE9mZnNldCArIDM7XG4gICAgICB2ZXJ0ZXhPZmZzZXQgKz0gMjtcbiAgICAgIGlPZmYgKz0gNjtcbiAgICB9XG4gICAgdmVydGV4T2Zmc2V0ICs9IDI7XG4gIH1cblxuICByZXR1cm4gaW5kO1xufVxuXG52YXIgUmVzb25hdG9yTGlua01lc2ggPSAoZnVuY3Rpb24gKF9NZXNoKSB7XG4gIF9pbmhlcml0cyhSZXNvbmF0b3JMaW5rTWVzaCwgX01lc2gpO1xuXG4gIGZ1bmN0aW9uIFJlc29uYXRvckxpbmtNZXNoKGdsLCBwb3J0YWxQb3NpdGlvbiwgc2xvdCwgZGlzdGFuY2UsIGNvbG9yLCByZXNvbmF0b3JQZXJjZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlc29uYXRvckxpbmtNZXNoKTtcblxuICAgIHZhciB0aGV0YSA9IHNsb3QgLyA4ICogMiAqIE1hdGguUEk7XG4gICAgdmFyIGVuZCA9IF9nbE1hdHJpeC52ZWMyLmNyZWF0ZSgpO1xuICAgIHZhciByZWxhdGl2ZSA9IF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoZGlzdGFuY2UgKiBNYXRoLmNvcyh0aGV0YSksIGRpc3RhbmNlICogTWF0aC5zaW4odGhldGEpKTtcbiAgICBfZ2xNYXRyaXgudmVjMi5hZGQoZW5kLCBwb3J0YWxQb3NpdGlvbiwgcmVsYXRpdmUpO1xuICAgIHZhciBidWYgPSBfZ2VuZXJhdGVMaW5rQXR0cmlidXRlcyhwb3J0YWxQb3NpdGlvbiwgZW5kLCBjb2xvciwgcmVzb25hdG9yUGVyY2VudCk7XG4gICAgdmFyIGluZCA9IF9nZW5lcmF0ZUZhY2VzKDApO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gW107XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3Bvc2l0aW9uJywgNCkpO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV90ZXhDb29yZDAnLCA0KSk7XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX2NvbG9yJywgNCkpO1xuICAgIHZhciBhdHRyaWJ1dGUgPSBuZXcgX2dsR2xBdHRyaWJ1dGUyWydkZWZhdWx0J10oZ2wsIGF0dHJpYnV0ZXMsIGJ1ZiwgZ2wuRFlOQU1JQ19EUkFXKTtcbiAgICB2YXIgZmFjZXMgPSBuZXcgX2dsR2xJbmRleDJbJ2RlZmF1bHQnXShnbCwgaW5kLCBnbC5UUklBTkdMRVMpO1xuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFJlc29uYXRvckxpbmtNZXNoLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIGF0dHJpYnV0ZSwgZmFjZXMpO1xuICB9XG5cbiAgcmV0dXJuIFJlc29uYXRvckxpbmtNZXNoO1xufSkoX21lc2gyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBSZXNvbmF0b3JMaW5rTWVzaDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9tZXNoID0gcmVxdWlyZSgnLi4vbWVzaCcpO1xuXG52YXIgX21lc2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaCk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlID0gcmVxdWlyZSgnLi4vdmVydGV4LWF0dHJpYnV0ZScpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJ0ZXhBdHRyaWJ1dGUpO1xuXG52YXIgX2dsR2xJbmRleCA9IHJlcXVpcmUoJy4uL2dsL2dsLWluZGV4Jyk7XG5cbnZhciBfZ2xHbEluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xJbmRleCk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL2dsL2dsLWF0dHJpYnV0ZScpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxuLy8gcGFydCBvZiBkb2luZyBhd2F5IHdpdGggdGhlIFRIUkVFLmpzIGRlcGVuZGVuY3lcbi8vIG1lYW5zIGdpdmluZyB1cCBhIGxvdCBvZiBoZWxwZXIgY29kZSBmb3IgZG9pbmcgdGhpbmdzXG4vLyBsaWtlIHRoaXMuXG4vL1xuLy8gTmVlZGxlc3MgdG8gc2F5LCB0aGlzIGJvcnJvd3MgaGVhdmlseSBmcm9tIFRIUkVFLlNwaGVyZUdlb21ldHJ5XG4vLyBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvbWFzdGVyL3NyYy9leHRyYXMvZ2VvbWV0cmllcy9TcGhlcmVHZW9tZXRyeS5qc1xuZnVuY3Rpb24gY3JlYXRlU3BoZXJlKHJhZGl1cywgcGhpU2xpY2VzLCB0aGV0YVNsaWNlcykge1xuICB2YXIgaSxcbiAgICAgIGosXG4gICAgICB1LFxuICAgICAgdixcbiAgICAgIHZlYyxcbiAgICAgIHYxLFxuICAgICAgdjIsXG4gICAgICB2MyxcbiAgICAgIHY0LFxuICAgICAgdmVydGljZXNSb3csXG4gICAgICBmYWNlcyxcbiAgICAgIHBoaSA9IE1hdGguUEkgKiAyLFxuICAgICAgdGhldGEgPSBNYXRoLlBJLFxuXG4gIC8vIHNpemUgaXMgOCBmb3IgdmVjMyBhX3Bvc2l0aW9uICsgdmVjMiBhX3RleENvb3JkICsgdmVjMyBhX25vcm1hbFxuICB2YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KChwaGlTbGljZXMgKyAxKSAqICh0aGV0YVNsaWNlcyArIDEpICogOCksXG4gICAgICBmYWNlQXJyYXkgPSBbXSxcbiAgICAgIHZlcnRpY2VzID0gW10sXG4gICAgICBhSWR4ID0gMCxcbiAgICAgIGF0dHJpYnV0ZXMgPSBbXTtcbiAgcGhpU2xpY2VzID0gTWF0aC5tYXgoMywgcGhpU2xpY2VzIHx8IDgpO1xuICB0aGV0YVNsaWNlcyA9IE1hdGgubWF4KDIsIHRoZXRhU2xpY2VzIHx8IDYpO1xuXG4gIGZvciAoaSA9IDA7IGkgPD0gcGhpU2xpY2VzOyBpKyspIHtcbiAgICB2ZXJ0aWNlc1JvdyA9IFtdO1xuICAgIGZvciAoaiA9IDA7IGogPD0gdGhldGFTbGljZXM7IGorKykge1xuICAgICAgdSA9IGogLyBwaGlTbGljZXM7XG4gICAgICB2ID0gaSAvIHRoZXRhU2xpY2VzO1xuICAgICAgdmVjID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygtcmFkaXVzICogTWF0aC5jb3ModSAqIHBoaSkgKiBNYXRoLnNpbih2ICogdGhldGEpLCByYWRpdXMgKiBNYXRoLmNvcyh2ICogdGhldGEpLCByYWRpdXMgKiBNYXRoLnNpbih1ICogcGhpKSAqIE1hdGguc2luKHYgKiB0aGV0YSkpO1xuXG4gICAgICB2YWx1ZXNbYUlkeCAqIDggKyAwXSA9IHZlY1swXTtcbiAgICAgIHZhbHVlc1thSWR4ICogOCArIDFdID0gdmVjWzFdO1xuICAgICAgdmFsdWVzW2FJZHggKiA4ICsgMl0gPSB2ZWNbMl07XG4gICAgICB2YWx1ZXNbYUlkeCAqIDggKyAzXSA9IHU7XG4gICAgICB2YWx1ZXNbYUlkeCAqIDggKyA0XSA9IHY7XG4gICAgICAvLyBub3JtYWxpemVkOlxuICAgICAgX2dsTWF0cml4LnZlYzMubm9ybWFsaXplKHZlYywgdmVjKTtcbiAgICAgIHZhbHVlc1thSWR4ICogOCArIDVdID0gdmVjWzBdO1xuICAgICAgdmFsdWVzW2FJZHggKiA4ICsgNl0gPSB2ZWNbMV07XG4gICAgICB2YWx1ZXNbYUlkeCAqIDggKyA3XSA9IHZlY1syXTtcblxuICAgICAgdmVydGljZXNSb3cucHVzaChhSWR4KyspO1xuICAgIH1cbiAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzUm93KTtcbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBwaGlTbGljZXM7IGkrKykge1xuICAgIGZvciAoaiA9IDA7IGogPCB0aGV0YVNsaWNlczsgaisrKSB7XG4gICAgICB2MSA9IHZlcnRpY2VzW2ldW2ogKyAxXTtcbiAgICAgIHYyID0gdmVydGljZXNbaV1bal07XG4gICAgICB2MyA9IHZlcnRpY2VzW2kgKyAxXVtqXTtcbiAgICAgIHY0ID0gdmVydGljZXNbaSArIDFdW2ogKyAxXTtcblxuICAgICAgaWYgKE1hdGguYWJzKHZhbHVlc1t2MSAqIDggKyAxXSkgPT09IHJhZGl1cykge1xuICAgICAgICBmYWNlQXJyYXkucHVzaC5hcHBseShmYWNlQXJyYXksIFt2MSwgdjMsIHY0XSk7XG4gICAgICAgIHZhbHVlc1t2MSAqIDggKyAzXSA9ICh2YWx1ZXNbdjEgKiA4ICsgM10gKyB2YWx1ZXNbdjIgKiA4ICsgM10pIC8gMjtcbiAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnModmFsdWVzW3YzICogOCArIDFdKSA9PT0gcmFkaXVzKSB7XG4gICAgICAgIGZhY2VBcnJheS5wdXNoLmFwcGx5KGZhY2VBcnJheSwgW3YxLCB2MiwgdjNdKTtcbiAgICAgICAgdmFsdWVzW3YzICogOCArIDNdID0gKHZhbHVlc1t2MyAqIDggKyAzXSArIHZhbHVlc1t2NCAqIDggKyAzXSkgLyAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFjZUFycmF5LnB1c2guYXBwbHkoZmFjZUFycmF5LCBbdjEsIHYyLCB2NF0pO1xuICAgICAgICBmYWNlQXJyYXkucHVzaC5hcHBseShmYWNlQXJyYXksIFt2MiwgdjMsIHY0XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZmFjZXMgPSBuZXcgVWludDE2QXJyYXkoZmFjZUFycmF5Lmxlbmd0aCk7XG4gIGZhY2VBcnJheS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgZmFjZXNbaV0gPSB2O1xuICB9KTtcbiAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3Bvc2l0aW9uJywgMykpO1xuICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfdGV4Q29vcmQwJywgMikpO1xuICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2Ffbm9ybWFsJywgMykpO1xuICByZXR1cm4ge1xuICAgIHZhbHVlczogdmFsdWVzLFxuICAgIGZhY2VzOiBmYWNlcyxcbiAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzXG4gIH07XG59XG5cbnZhciBTcGhlcmVNZXNoID0gKGZ1bmN0aW9uIChfTWVzaCkge1xuICBfaW5oZXJpdHMoU3BoZXJlTWVzaCwgX01lc2gpO1xuXG4gIGZ1bmN0aW9uIFNwaGVyZU1lc2goZ2wsIHJhZGl1cywgdlNsaWNlcywgaFNsaWNlcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTcGhlcmVNZXNoKTtcblxuICAgIHZhciBwYXJzZWQgPSBjcmVhdGVTcGhlcmUocmFkaXVzLCB2U2xpY2VzLCBoU2xpY2VzKTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IG5ldyBfZ2xHbEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXShnbCwgcGFyc2VkLmF0dHJpYnV0ZXMsIHBhcnNlZC52YWx1ZXMpO1xuICAgIHZhciBmYWNlcyA9IG5ldyBfZ2xHbEluZGV4MlsnZGVmYXVsdCddKGdsLCBwYXJzZWQuZmFjZXMsIGdsLlRSSUFOR0xFUyk7XG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3BoZXJlTWVzaC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBhdHRyaWJ1dGVzLCBmYWNlcyk7XG4gIH1cblxuICByZXR1cm4gU3BoZXJlTWVzaDtcbn0pKF9tZXNoMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU3BoZXJlTWVzaDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9tZXNoID0gcmVxdWlyZSgnLi4vbWVzaCcpO1xuXG52YXIgX21lc2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaCk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlID0gcmVxdWlyZSgnLi4vdmVydGV4LWF0dHJpYnV0ZScpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJ0ZXhBdHRyaWJ1dGUpO1xuXG52YXIgX2dsR2xJbmRleCA9IHJlcXVpcmUoJy4uL2dsL2dsLWluZGV4Jyk7XG5cbnZhciBfZ2xHbEluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xJbmRleCk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL2dsL2dsLWF0dHJpYnV0ZScpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxudmFyIF9jaHVua1NpemUgPSAxMztcbnZhciBiYXNlQ29sb3IgPSBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNDYsIDAuMTgsIDAuMTgsIDEuMCk7XG52YXIgYmFzZU9mZnNldCA9IF9nbE1hdHJpeC52ZWM0LmNyZWF0ZSgpO1xuXG5mdW5jdGlvbiBjbGFtcGVkU2luKGYpIHtcbiAgcmV0dXJuIE1hdGguc2luKE1hdGguUEkgKiBNYXRoLm1heChNYXRoLm1pbigxLjAsIGYpLCAwKSAvIDIpO1xufVxuXG5mdW5jdGlvbiBnZXRCZWFyaW5nKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHMgPSBzdGFydFswXSxcbiAgICAgIGUgPSBlbmRbMF0sXG4gICAgICBkbCA9IGVuZFsxXSAtIHN0YXJ0WzFdO1xuICB2YXIgeSA9IE1hdGguc2luKGRsKSAqIE1hdGguY29zKGUpLFxuICAgICAgeCA9IE1hdGguY29zKHMpICogTWF0aC5zaW4oZSkgLSBNYXRoLnNpbihzKSAqIE1hdGguY29zKGUpICogTWF0aC5jb3MoZGwpO1xuXG4gIHJldHVybiAoTWF0aC5hdGFuMih5LCB4KSArIE1hdGguUEkgKiAyKSAlIChNYXRoLlBJICogMik7XG59XG5cbmZ1bmN0aW9uIGRlc3QocCwgYmVhcmluZywgYW5nbGUpIHtcbiAgdmFyIGxhdCA9IE1hdGguYXNpbihNYXRoLnNpbihwWzBdKSAqIE1hdGguY29zKGFuZ2xlKSArIE1hdGguY29zKHBbMF0pICogTWF0aC5zaW4oYW5nbGUpICogTWF0aC5jb3MoYmVhcmluZykpLFxuICAgICAgbG9uID0gcFsxXSArIE1hdGguYXRhbjIoTWF0aC5zaW4oYmVhcmluZykgKiBNYXRoLnNpbihhbmdsZSkgKiBNYXRoLmNvcyhwWzBdKSwgTWF0aC5jb3MoYW5nbGUpIC0gTWF0aC5zaW4ocFswXSkgKiBNYXRoLnNpbihsYXQpKTtcblxuICBsb24gPSAobG9uICsgMyAqIE1hdGguUEkpICUgKDIgKiBNYXRoLlBJKSAtIE1hdGguUEk7XG4gIHJldHVybiBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKGxhdCwgbG9uKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRNYXRyaXgocywgZSwgcmFkaXVzKSB7XG4gIHZhciBtYXQgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgX2dsTWF0cml4Lm1hdDQucm90YXRlWShtYXQsIG1hdCwgc1sxXSk7XG4gIF9nbE1hdHJpeC5tYXQ0LnJvdGF0ZVoobWF0LCBtYXQsIHNbMF0gLSBNYXRoLlBJIC8gMik7XG4gIF9nbE1hdHJpeC5tYXQ0LnJvdGF0ZVkobWF0LCBtYXQsIC1nZXRCZWFyaW5nKHMsIGUpKTtcbiAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKG1hdCwgbWF0LCBbMCwgcmFkaXVzLCAwXSk7XG4gIHJldHVybiBtYXQ7XG59XG5cbmZ1bmN0aW9uIGdldFJhZGlhbERpc3RhbmNlKHMsIGUpIHtcbiAgdmFyIGRMYXQgPSBlWzBdIC0gc1swXSxcbiAgICAgIGRMb24gPSBlWzFdIC0gc1sxXTtcblxuICB2YXIgYSA9IE1hdGguc2luKGRMYXQgLyAyKSAqIE1hdGguc2luKGRMYXQgLyAyKSArIE1hdGguY29zKHNbMF0pICogTWF0aC5jb3MoZVswXSkgKiBNYXRoLnNpbihkTG9uIC8gMikgKiBNYXRoLnNpbihkTG9uIC8gMik7XG5cbiAgcmV0dXJuIDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG59XG5cbmZ1bmN0aW9uIHRvUmFkaWFucyhwb2ludCkge1xuICByZXR1cm4gX2dsTWF0cml4LnZlYzIuZnJvbVZhbHVlcyhwb2ludFswXSAqIE1hdGguUEkgLyAxODAsIHBvaW50WzFdICogTWF0aC5QSSAvIDE4MCk7XG59XG5cbmZ1bmN0aW9uIGZpbGxDaHVuayhidWYsIGluZGV4LCBwb3MsIHV2LCBub3JtYWwsIGY2LCBjb2xvcikge1xuICB2YXIgb2ZmID0gaW5kZXggKiBfY2h1bmtTaXplO1xuICBfZ2xNYXRyaXgudmVjMy5ub3JtYWxpemUobm9ybWFsLCBub3JtYWwpO1xuICBidWZbb2ZmICsgMF0gPSBwb3NbMF07XG4gIGJ1ZltvZmYgKyAxXSA9IHBvc1sxXTtcbiAgYnVmW29mZiArIDJdID0gcG9zWzJdO1xuICBidWZbb2ZmICsgM10gPSBmNjtcbiAgYnVmW29mZiArIDRdID0gdXZbMF07XG4gIGJ1ZltvZmYgKyA1XSA9IHV2WzFdO1xuICBidWZbb2ZmICsgNl0gPSBub3JtYWxbMF07XG4gIGJ1ZltvZmYgKyA3XSA9IG5vcm1hbFsxXTtcbiAgYnVmW29mZiArIDhdID0gbm9ybWFsWzJdO1xuICBidWZbb2ZmICsgOV0gPSBjb2xvclswXTtcbiAgYnVmW29mZiArIDEwXSA9IGNvbG9yWzFdO1xuICBidWZbb2ZmICsgMTFdID0gY29sb3JbMl07XG4gIGJ1ZltvZmYgKyAxMl0gPSBjb2xvclszXTtcbn1cblxuLy8gc3RhcnQgYW5kIGVuZCBzaG91bGQgcHJvYmFibHkgYmUgaW4gcmFkaWFucz9cbmZ1bmN0aW9uIF9nZW5lcmF0ZUxpbmtBdHRyaWJ1dGVzKHJhZGl1cywgc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCkge1xuICB2YXIgcyA9IHRvUmFkaWFucyhzdGFydCk7XG4gIHZhciBlID0gdG9SYWRpYW5zKGVuZCk7XG4gIHZhciBhbmdsZSA9IGdldFJhZGlhbERpc3RhbmNlKHMsIGUpO1xuICB2YXIgYmVhcmluZyA9IGdldEJlYXJpbmcocywgZSk7XG4gIHZhciBsZW5ndGggPSBhbmdsZSAqIHJhZGl1cztcbiAgdmFyIHNlZ21lbnRzID0gTWF0aC5tYXgoTWF0aC5mbG9vcihhbmdsZSAvIE1hdGguUEkgKiA1MCkgKyAxLCA4KTsgLy8gNTAgc2VnbWVudHMgZm9yIGEgaGFsZi1jaXJjbGUgc291bmRzIGdvb2QsIEkgZ3Vlc3MuXG4gIHN0YXJ0UGVyY2VudCA9IHN0YXJ0UGVyY2VudCA9PT0gdW5kZWZpbmVkID8gMSA6IE1hdGgubWF4KE1hdGgubWluKHN0YXJ0UGVyY2VudCwgMSksIDApO1xuICBlbmRQZXJjZW50ID0gZW5kUGVyY2VudCA9PT0gdW5kZWZpbmVkID8gMSA6IE1hdGgubWF4KE1hdGgubWluKGVuZFBlcmNlbnQsIDEpLCAwKTtcbiAgdmFyIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoc2VnbWVudHMgKiBfY2h1bmtTaXplICogNik7XG4gIHZhciB5TWluID0gYmFzZU9mZnNldFsxXSxcbiAgICAgIHlNYXggPSB5TWluICsgTWF0aC5taW4ocmFkaXVzICogMC4wMSwgMC4wOCAqIGxlbmd0aCksXG4gICAgICBhdmdQZXJjZW50ID0gKHN0YXJ0UGVyY2VudCArIGVuZFBlcmNlbnQpIC8gMi4wLFxuICAgICAgZjYgPSAwLjAxICogbGVuZ3RoLFxuICAgICAgZjcgPSAwLjEgKyBhdmdQZXJjZW50ICogMC4zLFxuICAgICAgdXAgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDEsIDApLFxuICAgICAgcmlnaHQgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDAsIDEpO1xuICB2YXIgc3RlcCA9IHNlZ21lbnRzICogMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7XG4gICAgdmFyIGY4ID0gaSAvIChzZWdtZW50cyAtIDEpLFxuICAgICAgICBmOSA9IHN0YXJ0UGVyY2VudCArIGY4ICogKGVuZFBlcmNlbnQgLSBzdGFydFBlcmNlbnQpLFxuICAgICAgICBmMTAgPSAwLjYgKyAwLjM1ICogZjksXG5cbiAgICAvLyB2IGFzIGluIFwidXZcIiBhcyBpbiB0ZXhjb29yZHNcbiAgICB2ID0gZjggKiBmNixcblxuICAgIC8vIFwiY3VycmVudFwiIHBvaW50IGluIHByb2dyZXNzaW9uXG4gICAgY3VyciA9IGY4ID09PSAwID8gcyA6IGRlc3QocywgYmVhcmluZywgYW5nbGUgKiBmOCksXG5cbiAgICAvLyBcIm5leHRcIiBwb2ludCBpbiB0aGUgcHJvZ3Jlc3Npb25cbiAgICBuZXh0ID0gZGVzdChzLCBiZWFyaW5nLCBhbmdsZSAqIChmOCArIDEgLyAoc2VnbWVudHMgLSAxKSkpLFxuICAgICAgICB0cmFuc2Zvcm0gPSBidWlsZE1hdHJpeChjdXJyLCBuZXh0LCByYWRpdXMpLFxuXG4gICAgLy8gXCJoZWlnaHRcIiBvZiB0aGUgY2VudGVycG9pbnQgb2YgdGhlIGxpbmsuXG4gICAgaCA9IF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMCwgeU1pbiArICgzLjAgKyAtMS41ICogTWF0aC5wb3coY2xhbXBlZFNpbigyLjAgKiBNYXRoLmFicyhmOCAtIDAuNSkpLCA0KSkgKiAoeU1heCAtIHlNaW4pLCAwKSxcblxuICAgIC8vIFwicmFkaXVzXCIgb2YgdGhlIGxpbmtcbiAgICB3ID0gcmFkaXVzICogMC4wMSAqIGNsYW1wZWRTaW4oMS4wIC0gMi4wICogTWF0aC5hYnMoZjggLSAwLjUpKSxcbiAgICAgICAgd1VwID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCB3LCAwKSxcbiAgICAgICAgd1JpZ2h0ID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCAwLCB3KSxcbiAgICAgICAgY2wgPSBfZ2xNYXRyaXgudmVjNC5sZXJwKF9nbE1hdHJpeC52ZWM0LmNyZWF0ZSgpLCBiYXNlQ29sb3IsIGNvbG9yLCAwLjI1ICsgZjkgKiAwLjc1KTtcbiAgICBjbFszXSA9IGYxMDtcblxuICAgIC8vIHRvcCBob3Jpem9udGFsIHNlZ21lbnRcbiAgICAvLyByaWdodCBwb2ludFxuICAgIGZpbGxDaHVuayh2YWx1ZXMsIGkgKiAyLCBfZ2xNYXRyaXgudmVjMy50cmFuc2Zvcm1NYXQ0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBfZ2xNYXRyaXgudmVjMy5hZGQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIGgsIHdSaWdodCksIHRyYW5zZm9ybSksIF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMCwgdiksIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHVwLCB0cmFuc2Zvcm0pLCBmNywgY2wpO1xuICAgIC8vIGxlZnQgcG9pbnRcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBpICogMiArIDEsIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLnN1YnRyYWN0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBoLCB3UmlnaHQpLCB0cmFuc2Zvcm0pLCBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKDAuNSwgdiksIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHVwLCB0cmFuc2Zvcm0pLCBmNywgY2wpO1xuXG4gICAgLy8gdG9wIHZlcnRpY2FsIHNlZ21lbnRcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBzdGVwICsgaSAqIDIsIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLmFkZChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgaCwgd1VwKSwgdHJhbnNmb3JtKSwgX2dsTWF0cml4LnZlYzIuZnJvbVZhbHVlcygwLCB2KSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgcmlnaHQsIHRyYW5zZm9ybSksIGY3LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgc3RlcCArIGkgKiAyICsgMSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgX2dsTWF0cml4LnZlYzMuc3VidHJhY3QoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIGgsIHdVcCksIHRyYW5zZm9ybSksIF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMC41LCB2KSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgcmlnaHQsIHRyYW5zZm9ybSksIGY3LCBjbCk7XG5cbiAgICAvLyBib3R0b20gdmVydGljYWwgc2VnbWVudFxuICAgIGZpbGxDaHVuayh2YWx1ZXMsIDIgKiBzdGVwICsgaSAqIDIsIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLnN1YnRyYWN0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBoLCB3VXApLCB0cmFuc2Zvcm0pLCBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKDAuNSwgdiksIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHJpZ2h0LCB0cmFuc2Zvcm0pLCBmNywgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIDIgKiBzdGVwICsgaSAqIDIgKyAxLCBfZ2xNYXRyaXgudmVjMy50cmFuc2Zvcm1NYXQ0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDAsIDApLCB0cmFuc2Zvcm0pLCBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKDEuMCwgdiksIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHJpZ2h0LCB0cmFuc2Zvcm0pLCBmNywgY2wpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUZhY2VzKHZlcnRleE9mZnNldCwgc2VnbWVudHMpIHtcbiAgdmFyIGluZCA9IG5ldyBVaW50MTZBcnJheSg2ICogKHNlZ21lbnRzIC0gMSkgKiAzKSxcbiAgICAgIGlPZmYgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWdtZW50cyAtIDE7IGorKykge1xuXG4gICAgICBpbmRbaU9mZiArIDBdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgMV0gPSB2ZXJ0ZXhPZmZzZXQgKyAwO1xuICAgICAgaW5kW2lPZmYgKyAyXSA9IHZlcnRleE9mZnNldCArIDI7XG4gICAgICBpbmRbaU9mZiArIDNdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgNF0gPSB2ZXJ0ZXhPZmZzZXQgKyAyO1xuICAgICAgaW5kW2lPZmYgKyA1XSA9IHZlcnRleE9mZnNldCArIDM7XG4gICAgICB2ZXJ0ZXhPZmZzZXQgKz0gMjtcbiAgICAgIGlPZmYgKz0gNjtcbiAgICB9XG4gICAgdmVydGV4T2Zmc2V0ICs9IDI7XG4gIH1cblxuICByZXR1cm4gaW5kO1xufVxuXG52YXIgU3BoZXJpY2FsUG9ydGFsTGlua01lc2ggPSAoZnVuY3Rpb24gKF9NZXNoKSB7XG4gIF9pbmhlcml0cyhTcGhlcmljYWxQb3J0YWxMaW5rTWVzaCwgX01lc2gpO1xuXG4gIGZ1bmN0aW9uIFNwaGVyaWNhbFBvcnRhbExpbmtNZXNoKGdsLCBzcGhlcmVSYWRpdXMsIHN0YXJ0LCBlbmQsIGNvbG9yLCBzdGFydFBlcmNlbnQsIGVuZFBlcmNlbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3BoZXJpY2FsUG9ydGFsTGlua01lc2gpO1xuXG4gICAgdmFyIGJ1ZiA9IF9nZW5lcmF0ZUxpbmtBdHRyaWJ1dGVzKHNwaGVyZVJhZGl1cywgc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCk7XG4gICAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGgsXG4gICAgICAgIHNlZ21lbnRzID0gTWF0aC5mbG9vcihsZW4gLyBfY2h1bmtTaXplIC8gNik7XG4gICAgdmFyIGluZCA9IF9nZW5lcmF0ZUZhY2VzKDAsIHNlZ21lbnRzKTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IFtdO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9wb3NpdGlvbicsIDQpKTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfdGV4Q29vcmQwJywgMikpO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9ub3JtYWwnLCAzKSk7XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX2NvbG9yJywgNCkpO1xuICAgIHZhciBhdHRyaWJ1dGUgPSBuZXcgX2dsR2xBdHRyaWJ1dGUyWydkZWZhdWx0J10oZ2wsIGF0dHJpYnV0ZXMsIGJ1ZiwgZ2wuRFlOQU1JQ19EUkFXKTtcbiAgICB2YXIgZmFjZXMgPSBuZXcgX2dsR2xJbmRleDJbJ2RlZmF1bHQnXShnbCwgaW5kLCBnbC5UUklBTkdMRVMpO1xuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFNwaGVyaWNhbFBvcnRhbExpbmtNZXNoLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIGF0dHJpYnV0ZSwgZmFjZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIFNwaGVyaWNhbFBvcnRhbExpbmtNZXNoO1xufSkoX21lc2gyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBTcGhlcmljYWxQb3J0YWxMaW5rTWVzaDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbnZhciBQSV9IQUxGID0gTWF0aC5QSSAvIDIuMDtcbnZhciBNSU5fTE9HX0RJU1QgPSA1LjA7XG5cbmZ1bmN0aW9uIGNsb25lVG91Y2godG91Y2gpIHtcbiAgcmV0dXJuIHsgaWRlbnRpZmllcjogdG91Y2guaWRlbnRpZmllciwgeDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WSB9O1xufVxuXG5mdW5jdGlvbiBnZXRUb3VjaEluZGV4KHRvdWNoZXMsIHRvdWNoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0b3VjaGVzW2ldLmlkZW50aWZpZXIgPT0gdG91Y2guaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxudmFyIE9yYml0Q29udHJvbHMgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBPcmJpdENvbnRyb2xzKGNhbnZhcywgZGlzdGFuY2UsIG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgT3JiaXRDb250cm9scyk7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmRpc3RhbmNlID0gZGlzdGFuY2UgfHwgMjtcbiAgICB0aGlzLmRpc3RhbmNlVGFyZ2V0ID0gdGhpcy5kaXN0YW5jZTtcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgem9vbURhbXA6IDAuNSxcbiAgICAgIGRpc3RhbmNlU2NhbGU6IDAuNSxcbiAgICAgIGRpc3RhbmNlTWF4OiAxMDAwLFxuICAgICAgZGlzdGFuY2VNaW46IDEsXG4gICAgICB0b3VjaFNjYWxlOiAwLjEsXG4gICAgICB3aGVlbFNjYWxlOiAwLjAxLFxuICAgICAgZnJpY3Rpb246IDAuMixcbiAgICAgIHRhcmdldDogX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksXG4gICAgICBhbGxvd1pvb206IHRydWVcbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucyA9ICgwLCBfdXRpbHMuc2V0UGFyYW1zKShwYXJhbXMsIG9wdGlvbnMpO1xuICAgIHRoaXMubW91c2UgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLm1vdXNlT25Eb3duID0geyB4OiAwLCB5OiAwIH07XG4gICAgdGhpcy5yb3RhdGlvbiA9IHsgeDogMCwgeTogMCB9O1xuICAgIHRoaXMudGFyZ2V0ID0geyB4OiBNYXRoLlBJICogMyAvIDIsIHk6IE1hdGguUEkgLyA2LjAgfTtcbiAgICB0aGlzLnRhcmdldE9uRG93biA9IHsgeDogMCwgeTogMCB9O1xuICAgIHRoaXMub3ZlclJlbmRlcmVyID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZVVwID0gdGhpcy5vbk1vdXNlVXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlT3V0ID0gdGhpcy5vbk1vdXNlT3V0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZURvd24gPSB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZVdoZWVsID0gdGhpcy5vbk1vdXNlV2hlZWwuYmluZCh0aGlzKTtcblxuICAgIHRoaXMudG91Y2hlcyA9IFtdO1xuICAgIHRoaXMudG91Y2hEZWx0YSA9IDA7XG4gICAgdGhpcy50b3VjaE1vdmUgPSB0aGlzLm9uVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy50b3VjaEVuZCA9IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG91Y2hMZWF2ZSA9IHRoaXMub25Ub3VjaExlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gdGhpcy5vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlT3ZlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLm92ZXJSZW5kZXJlciA9IHRydWU7XG4gICAgfSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlT3V0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMub3ZlclJlbmRlcmVyID0gZmFsc2U7XG4gICAgfSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhPcmJpdENvbnRyb2xzLCBbe1xuICAgIGtleTogJ2Rpc2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24sIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwLCBmYWxzZSk7XG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMubW91c2VPdXQsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobGVhdmUnLCB0aGlzLnRvdWNoTGVhdmUsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB0aGlzLm1vdXNlV2hlZWwsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMubW91c2VPdmVyLCBmYWxzZSk7XG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMubW91c2VPdXQsIGZhbHNlKTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd1pvb20pIHtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHRoaXMubW91c2VXaGVlbCwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5tb3VzZU92ZXIsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5tb3VzZU91dCwgZmFsc2UpO1xuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVUYXJnZXRzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVGFyZ2V0cygpIHtcbiAgICAgIHZhciBzY2FsZSA9IHRoaXMuZGlzdGFuY2UgPCBNSU5fTE9HX0RJU1QgPyB0aGlzLmRpc3RhbmNlIDogTWF0aC5sb2codGhpcy5kaXN0YW5jZSk7XG4gICAgICB2YXIgem9vbURhbXAgPSBzY2FsZSAvIHRoaXMub3B0aW9ucy56b29tRGFtcDtcblxuICAgICAgdGhpcy50YXJnZXQueCA9IHRoaXMudGFyZ2V0T25Eb3duLnggKyAodGhpcy5tb3VzZS54IC0gdGhpcy5tb3VzZU9uRG93bi54KSAqIDAuMDA1ICogem9vbURhbXA7XG4gICAgICB0aGlzLnRhcmdldC55ID0gdGhpcy50YXJnZXRPbkRvd24ueSArICh0aGlzLm1vdXNlLnkgLSB0aGlzLm1vdXNlT25Eb3duLnkpICogMC4wMDUgKiB6b29tRGFtcDtcblxuICAgICAgdGhpcy50YXJnZXQueSA9IHRoaXMudGFyZ2V0LnkgPiBQSV9IQUxGID8gUElfSEFMRiA6IHRoaXMudGFyZ2V0Lnk7XG4gICAgICB0aGlzLnRhcmdldC55ID0gdGhpcy50YXJnZXQueSA8IC1QSV9IQUxGID8gLVBJX0hBTEYgOiB0aGlzLnRhcmdldC55O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uTW91c2VEb3duJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25Nb3VzZURvd24oZXYpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCwgZmFsc2UpO1xuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLm1vdXNlT3V0LCBmYWxzZSk7XG5cbiAgICAgIHRoaXMubW91c2VPbkRvd24ueCA9IC1ldi5jbGllbnRYO1xuICAgICAgdGhpcy5tb3VzZU9uRG93bi55ID0gZXYuY2xpZW50WTtcbiAgICAgIHRoaXMudGFyZ2V0T25Eb3duLnggPSB0aGlzLnRhcmdldC54O1xuICAgICAgdGhpcy50YXJnZXRPbkRvd24ueSA9IHRoaXMudGFyZ2V0Lnk7XG5cbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbk1vdXNlTW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2KSB7XG4gICAgICB0aGlzLm1vdXNlLnggPSAtZXYuY2xpZW50WDtcbiAgICAgIHRoaXMubW91c2UueSA9IGV2LmNsaWVudFk7XG4gICAgICB0aGlzLnVwZGF0ZVRhcmdldHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbk1vdXNlVXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1vdXNlVXAoZXYpIHtcbiAgICAgIHRoaXMub25Nb3VzZU91dChldik7XG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25Nb3VzZU91dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTW91c2VPdXQoKSB7XG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCwgZmFsc2UpO1xuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLm1vdXNlT3V0LCBmYWxzZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcodmlldykge1xuICAgICAgdmFyIGR4ID0gdGhpcy50YXJnZXQueCAtIHRoaXMucm90YXRpb24ueCxcbiAgICAgICAgICBkeSA9IHRoaXMudGFyZ2V0LnkgLSB0aGlzLnJvdGF0aW9uLnksXG4gICAgICAgICAgZHogPSB0aGlzLmRpc3RhbmNlVGFyZ2V0IC0gdGhpcy5kaXN0YW5jZSxcbiAgICAgICAgICBjYW1lcmFQb3NpdGlvbiA9IF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpO1xuICAgICAgaWYgKE1hdGguYWJzKGR4KSA+IDAuMDAwMDEgfHwgTWF0aC5hYnMoZHkpID4gMC4wMDAwMSB8fCBNYXRoLmFicyhkeikgPiAwLjAwMDAxKSB7XG4gICAgICAgIHRoaXMucm90YXRpb24ueCArPSBkeCAqIHRoaXMub3B0aW9ucy5mcmljdGlvbjtcbiAgICAgICAgdGhpcy5yb3RhdGlvbi55ICs9IGR5ICogdGhpcy5vcHRpb25zLmZyaWN0aW9uO1xuICAgICAgICB0aGlzLmRpc3RhbmNlICs9IGR6ICogdGhpcy5vcHRpb25zLmRpc3RhbmNlU2NhbGU7XG5cbiAgICAgICAgY2FtZXJhUG9zaXRpb25bMF0gPSB0aGlzLmRpc3RhbmNlICogTWF0aC5zaW4odGhpcy5yb3RhdGlvbi54KSAqIE1hdGguY29zKHRoaXMucm90YXRpb24ueSkgKyB0aGlzLm9wdGlvbnMudGFyZ2V0WzBdO1xuICAgICAgICBjYW1lcmFQb3NpdGlvblsxXSA9IHRoaXMuZGlzdGFuY2UgKiBNYXRoLnNpbih0aGlzLnJvdGF0aW9uLnkpICsgdGhpcy5vcHRpb25zLnRhcmdldFsxXTtcbiAgICAgICAgY2FtZXJhUG9zaXRpb25bMl0gPSB0aGlzLmRpc3RhbmNlICogTWF0aC5jb3ModGhpcy5yb3RhdGlvbi54KSAqIE1hdGguY29zKHRoaXMucm90YXRpb24ueSkgKyB0aGlzLm9wdGlvbnMudGFyZ2V0WzJdO1xuXG4gICAgICAgIF9nbE1hdHJpeC5tYXQ0Lmxvb2tBdCh2aWV3LCBjYW1lcmFQb3NpdGlvbiwgdGhpcy5vcHRpb25zLnRhcmdldCwgWzAsIDEsIDBdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbk1vdXNlV2hlZWwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1vdXNlV2hlZWwoZXYpIHtcbiAgICAgIGlmICh0aGlzLm92ZXJSZW5kZXJlcikge1xuICAgICAgICB0aGlzLnpvb20oZXYud2hlZWxEZWx0YVkgKiB0aGlzLm9wdGlvbnMud2hlZWxTY2FsZSAqICh0aGlzLmRpc3RhbmNlIDwgTUlOX0xPR19ESVNUID8gdGhpcy5kaXN0YW5jZSA6IE1hdGgubG9nKHRoaXMuZGlzdGFuY2UpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvblRvdWNoU3RhcnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZXYpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRvdWNoTW92ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hsZWF2ZScsIHRoaXMudG91Y2hMZWF2ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMudG91Y2hlcy5wdXNoKGNsb25lVG91Y2goZXYuY2hhbmdlZFRvdWNoZXNbaV0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5tb3VzZU9uRG93bi54ID0gLXRoaXMudG91Y2hlc1swXS54O1xuICAgICAgICB0aGlzLm1vdXNlT25Eb3duLnkgPSB0aGlzLnRvdWNoZXNbMF0ueTtcblxuICAgICAgICB0aGlzLnRhcmdldE9uRG93bi54ID0gdGhpcy50YXJnZXQueDtcbiAgICAgICAgdGhpcy50YXJnZXRPbkRvd24ueSA9IHRoaXMudGFyZ2V0Lnk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudG91Y2hlcy5sZW5ndGggPT09IDIgJiYgdGhpcy5vcHRpb25zLmFsbG93Wm9vbSkge1xuICAgICAgICB2YXIgeCA9IE1hdGguYWJzKHRoaXMudG91Y2hlc1swXS54IC0gdGhpcy50b3VjaGVzWzFdLngpO1xuICAgICAgICB2YXIgeSA9IE1hdGguYWJzKHRoaXMudG91Y2hlc1swXS55IC0gdGhpcy50b3VjaGVzWzFdLnkpO1xuXG4gICAgICAgIHRoaXMudG91Y2hEZWx0YSA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYW52YXMuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uVG91Y2hNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25Ub3VjaE1vdmUoZXYpIHtcbiAgICAgIHZhciBjaGFuZ2VkID0gZXYuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgbCA9IGNoYW5nZWQubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGlkeCA9IGdldFRvdWNoSW5kZXgodGhpcy50b3VjaGVzLCBjaGFuZ2VkW2ldKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgdGhpcy50b3VjaGVzLnNwbGljZShpZHgsIDEsIGNsb25lVG91Y2goY2hhbmdlZFtpXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3VsZCBub3QgZmluZCBldmVudCAnLCBjaGFuZ2VkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLm1vdXNlLnggPSAtdGhpcy50b3VjaGVzWzBdLng7XG4gICAgICAgIHRoaXMubW91c2UueSA9IHRoaXMudG91Y2hlc1swXS55O1xuICAgICAgICB0aGlzLnVwZGF0ZVRhcmdldHMoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMiAmJiB0aGlzLm9wdGlvbnMuYWxsb3dab29tKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy50b3VjaGVzWzBdLnggLSB0aGlzLnRvdWNoZXNbMV0ueDtcbiAgICAgICAgdmFyIHkgPSB0aGlzLnRvdWNoZXNbMF0ueSAtIHRoaXMudG91Y2hlc1sxXS55O1xuXG4gICAgICAgIHZhciBuZXdEZWx0YSA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICAgICAgdGhpcy56b29tKChuZXdEZWx0YSAtIHRoaXMudG91Y2hEZWx0YSkgKiB0aGlzLm9wdGlvbnMudG91Y2hTY2FsZSk7XG4gICAgICAgIHRoaXMudG91Y2hEZWx0YSA9IG5ld0RlbHRhO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZVRvdWNoZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVUb3VjaGVzKGV2KSB7XG4gICAgICB2YXIgY2hhbmdlZCA9IGV2LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgIGwgPSBjaGFuZ2VkLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBpZHggPSBnZXRUb3VjaEluZGV4KHRoaXMudG91Y2hlcywgY2hhbmdlZFtpXSk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgIHRoaXMudG91Y2hlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMudG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50b3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobGVhdmUnLCB0aGlzLnRvdWNoTGVhdmUsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLm1vdXNlT25Eb3duLnggPSAtdGhpcy50b3VjaGVzWzBdLng7XG4gICAgICAgIHRoaXMubW91c2VPbkRvd24ueSA9IHRoaXMudG91Y2hlc1swXS55O1xuXG4gICAgICAgIHRoaXMudGFyZ2V0T25Eb3duLnggPSB0aGlzLnRhcmdldC54O1xuICAgICAgICB0aGlzLnRhcmdldE9uRG93bi55ID0gdGhpcy50YXJnZXQueTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvblRvdWNoRW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25Ub3VjaEVuZChldikge1xuICAgICAgdGhpcy5yZW1vdmVUb3VjaGVzKGV2KTtcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmN1cnNvciA9ICdhdXRvJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvblRvdWNoTGVhdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblRvdWNoTGVhdmUoZXYpIHtcbiAgICAgIHRoaXMucmVtb3ZlVG91Y2hlcyhldik7XG4gICAgfVxuXG4gICAgLy8/XG4gIH0sIHtcbiAgICBrZXk6ICdvblRvdWNoQ2FuY2VsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25Ub3VjaENhbmNlbChldikge1xuICAgICAgdGhpcy5yZW1vdmVUb3VjaGVzKGV2KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd6b29tJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gem9vbShkZWx0YSkge1xuICAgICAgdGhpcy5kaXN0YW5jZVRhcmdldCAtPSBkZWx0YTtcbiAgICAgIHRoaXMuZGlzdGFuY2VUYXJnZXQgPSBNYXRoLm1pbih0aGlzLmRpc3RhbmNlVGFyZ2V0LCB0aGlzLm9wdGlvbnMuZGlzdGFuY2VNYXgpO1xuICAgICAgdGhpcy5kaXN0YW5jZVRhcmdldCA9IE1hdGgubWF4KHRoaXMuZGlzdGFuY2VUYXJnZXQsIHRoaXMub3B0aW9ucy5kaXN0YW5jZU1pbik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE9yYml0Q29udHJvbHM7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBPcmJpdENvbnRyb2xzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJvdW5kID0gcmVxdWlyZSgnLi9nbC1ib3VuZCcpO1xuXG52YXIgX2dsQm91bmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCb3VuZCk7XG5cbmZ1bmN0aW9uIGZpeFByZWNpc2lvbihzaGFkZXIpIHtcbiAgaWYgKC9wcmVjaXNpb24gbWVkaXVtcCBmbG9hdC9nLnRlc3Qoc2hhZGVyKSkge1xuICAgIHJldHVybiBzaGFkZXI7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxpbmVzID0gc2hhZGVyLnNwbGl0KFwiXFxuXCIpO1xuICAgIGxpbmVzLnNwbGljZSgxLCAwLCBcIiNpZmRlZiBHTF9FU1wiLCBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLCBcIiNlbmRpZlwiKTtcbiAgICByZXR1cm4gbGluZXMuam9pbihcIlxcblwiKTtcbiAgfVxufVxuXG4vLyBUYWtlbiBmcm9tIFBoaWxvR0wncyBwcm9ncmFtIGNsYXNzOlxuLy9SZXR1cm5zIGEgTWFnaWMgVW5pZm9ybSBTZXR0ZXJcbmZ1bmN0aW9uIGdldFVuaWZvcm1TZXR0ZXIoZ2wsIHByb2dyYW0sIGluZm8sIGlzQXJyYXkpIHtcbiAgdmFyIG5hbWUgPSBpbmZvLm5hbWUsXG4gICAgICBsb2MgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSksXG4gICAgICB0eXBlID0gaW5mby50eXBlLFxuICAgICAgbWF0cml4ID0gZmFsc2UsXG4gICAgICB2ZWN0b3IgPSB0cnVlLFxuICAgICAgZ2xGdW5jdGlvbixcbiAgICAgIHR5cGVkQXJyYXk7XG5cbiAgaWYgKGluZm8uc2l6ZSA+IDEgJiYgaXNBcnJheSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBnbC5GTE9BVDpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0xZnY7XG4gICAgICAgIHR5cGVkQXJyYXkgPSBGbG9hdDMyQXJyYXk7XG4gICAgICAgIHZlY3RvciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZ2wuSU5UOmNhc2UgZ2wuQk9PTDpjYXNlIGdsLlNBTVBMRVJfMkQ6Y2FzZSBnbC5TQU1QTEVSX0NVQkU6XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtMWl2O1xuICAgICAgICB0eXBlZEFycmF5ID0gVWludDE2QXJyYXk7XG4gICAgICAgIHZlY3RvciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAodmVjdG9yKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIGdsLkZMT0FUOlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTFmO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZ2wuRkxPQVRfVkVDMjpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0yZnY7XG4gICAgICAgIHR5cGVkQXJyYXkgPSBpc0FycmF5ID8gRmxvYXQzMkFycmF5IDogbmV3IEZsb2F0MzJBcnJheSgyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLkZMT0FUX1ZFQzM6XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtM2Z2O1xuICAgICAgICB0eXBlZEFycmF5ID0gaXNBcnJheSA/IEZsb2F0MzJBcnJheSA6IG5ldyBGbG9hdDMyQXJyYXkoMyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5GTE9BVF9WRUM0OlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTRmdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IGlzQXJyYXkgPyBGbG9hdDMyQXJyYXkgOiBuZXcgRmxvYXQzMkFycmF5KDQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZ2wuSU5UOmNhc2UgZ2wuQk9PTDpjYXNlIGdsLlNBTVBMRVJfMkQ6Y2FzZSBnbC5TQU1QTEVSX0NVQkU6XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtMWk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5JTlRfVkVDMjpjYXNlIGdsLkJPT0xfVkVDMjpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0yaXY7XG4gICAgICAgIHR5cGVkQXJyYXkgPSBpc0FycmF5ID8gVWludDE2QXJyYXkgOiBuZXcgVWludDE2QXJyYXkoMik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5JTlRfVkVDMzpjYXNlIGdsLkJPT0xfVkVDMzpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0zaXY7XG4gICAgICAgIHR5cGVkQXJyYXkgPSBpc0FycmF5ID8gVWludDE2QXJyYXkgOiBuZXcgVWludDE2QXJyYXkoMyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5JTlRfVkVDNDpjYXNlIGdsLkJPT0xfVkVDNDpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm00aXY7XG4gICAgICAgIHR5cGVkQXJyYXkgPSBpc0FycmF5ID8gVWludDE2QXJyYXkgOiBuZXcgVWludDE2QXJyYXkoNCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5GTE9BVF9NQVQyOlxuICAgICAgICBtYXRyaXggPSB0cnVlO1xuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybU1hdHJpeDJmdjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLkZMT0FUX01BVDM6XG4gICAgICAgIG1hdHJpeCA9IHRydWU7XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtTWF0cml4M2Z2O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZ2wuRkxPQVRfTUFUNDpcbiAgICAgICAgbWF0cml4ID0gdHJ1ZTtcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm1NYXRyaXg0ZnY7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vVE9ETyhuaWNvKTogU2FmYXJpIDUuMSBkb2Vzbid0IGhhdmUgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuXG4gIC8vcmVtb3ZlIHRoaXMgY2hlY2sgd2hlbiB0aGV5IGltcGxlbWVudCBpdC5cbiAgaWYgKGdsRnVuY3Rpb24uYmluZCkge1xuICAgIGdsRnVuY3Rpb24gPSBnbEZ1bmN0aW9uLmJpbmQoZ2wpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnbEZ1bmN0aW9uO1xuICAgIGdsRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0YXJnZXQuYXBwbHkoZ2wsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vU2V0IGEgdW5pZm9ybSBhcnJheVxuICBpZiAoaXNBcnJheSAmJiB0eXBlZEFycmF5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIGdsRnVuY3Rpb24obG9jLCBuZXcgdHlwZWRBcnJheSh2YWwpKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgfTtcblxuICAgIC8vU2V0IGEgbWF0cml4IHVuaWZvcm1cbiAgfSBlbHNlIGlmIChtYXRyaXgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIGdsRnVuY3Rpb24obG9jLCBmYWxzZSwgdmFsKTtcbiAgICAgIH07XG5cbiAgICAgIC8vU2V0IGEgdmVjdG9yL3R5cGVkIGFycmF5IHVuaWZvcm1cbiAgICB9IGVsc2UgaWYgKHR5cGVkQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICB0eXBlZEFycmF5LnNldCh2YWwudG9GbG9hdDMyQXJyYXkgPyB2YWwudG9GbG9hdDMyQXJyYXkoKSA6IHZhbCk7XG4gICAgICAgICAgZ2xGdW5jdGlvbihsb2MsIHR5cGVkQXJyYXkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vU2V0IGEgcHJpbWl0aXZlLXZhbHVlZCB1bmlmb3JtXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBnbEZ1bmN0aW9uKGxvYywgdmFsKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgLy8gRklYTUU6IFVucmVhY2hhYmxlIGNvZGVcbiAgdGhyb3cgXCJVbmtub3duIHR5cGU6IFwiICsgdHlwZTtcbn1cblxudmFyIFByb2dyYW0gPSAoZnVuY3Rpb24gKF9HTEJvdW5kKSB7XG4gIF9pbmhlcml0cyhQcm9ncmFtLCBfR0xCb3VuZCk7XG5cbiAgZnVuY3Rpb24gUHJvZ3JhbShnbCwgdmVydGV4LCBmcmFnbWVudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcm9ncmFtKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFByb2dyYW0ucHJvdG90eXBlKSwgXCJjb25zdHJ1Y3RvclwiLCB0aGlzKS5jYWxsKHRoaXMsIGdsKTtcbiAgICB0aGlzLnByb2dyYW0gPSBudWxsO1xuICAgIHRoaXMudmVydGV4U291cmNlID0gZml4UHJlY2lzaW9uKHZlcnRleCk7XG4gICAgdGhpcy5mcmFnbWVudFNvdXJjZSA9IGZyYWdtZW50O1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IHt9O1xuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQcm9ncmFtLCBbe1xuICAgIGtleTogXCJzZXR1cExvY2F0aW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXR1cExvY2F0aW9ucygpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsLFxuICAgICAgICAgIHByb2dyYW0gPSB0aGlzLnByb2dyYW07XG4gICAgICAvLyB0aGlzIGlzIHRha2VuIHBhcnRseSBmcm9tIFBoaWxvR0wncyBQcm9ncmFtIGNsYXNzLlxuICAgICAgLy9maWxsIGF0dHJpYnV0ZSBsb2NhdGlvbnNcbiAgICAgIHZhciBsZW4gPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9BVFRSSUJVVEVTKSxcbiAgICAgICAgICBpbmZvLFxuICAgICAgICAgIG5hbWU7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGluZm8gPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlc1tpbmZvLm5hbWVdID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgaW5mby5uYW1lKTtcbiAgICAgIH1cblxuICAgICAgLy9jcmVhdGUgdW5pZm9ybSBzZXR0ZXJzXG4gICAgICBsZW4gPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9VTklGT1JNUyk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaW5mbyA9IGdsLmdldEFjdGl2ZVVuaWZvcm0ocHJvZ3JhbSwgaSk7XG4gICAgICAgIG5hbWUgPSBpbmZvLm5hbWU7XG4gICAgICAgIC8vaWYgYXJyYXkgbmFtZSB0aGVuIGNsZWFuIHRoZSBhcnJheSBicmFja2V0c1xuICAgICAgICBuYW1lID0gbmFtZVtuYW1lLmxlbmd0aCAtIDFdID09ICddJyA/IG5hbWUuc3Vic3RyKDAsIG5hbWUubGVuZ3RoIC0gMykgOiBuYW1lO1xuICAgICAgICB0aGlzLnVuaWZvcm1zW25hbWVdID0gZ2V0VW5pZm9ybVNldHRlcihnbCwgcHJvZ3JhbSwgaW5mbywgaW5mby5uYW1lICE9IG5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgZ2wgPSB0aGlzLl9nbCxcbiAgICAgICAgICB2ZXJ0ZXgsXG4gICAgICAgICAgZnJhZ21lbnQ7XG4gICAgICB2ZXJ0ZXggPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4LCB0aGlzLnZlcnRleFNvdXJjZSk7XG4gICAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRleCk7XG4gICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2ZXJ0ZXgsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oZ2wuZ2V0U2hhZGVySW5mb0xvZyh2ZXJ0ZXgpKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignY291bGQgbm90IGNvbXBpbGUgdmVydGV4IHNoYWRlcjogJyArIHRoaXMudmVydGV4U291cmNlKTtcbiAgICAgICAgdGhyb3cgJ1ZlcnRleCBzaGFkZXIgY29tcGlsZSBlcnJvciEnO1xuICAgICAgfVxuICAgICAgZnJhZ21lbnQgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudCwgdGhpcy5mcmFnbWVudFNvdXJjZSk7XG4gICAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50KTtcbiAgICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50LCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGdsLmdldFNoYWRlckluZm9Mb2coZnJhZ21lbnQpKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignY291bGQgbm90IGNvbXBpbGUgZnJhZ21lbnQgc2hhZGVyOiAnICsgdGhpcy5mcmFnbWVudFNvdXJjZSk7XG4gICAgICAgIHRocm93ICdGcmFnbWVudCBzaGFkZXIgY29tcGlsZSBlcnJvciEnO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB2ZXJ0ZXgpO1xuICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgZnJhZ21lbnQpO1xuXG4gICAgICBnbC5saW5rUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuXG4gICAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgICAgLy8gVE9ETzogdmVyYm9zZSBsaWtlIGFib3ZlXG4gICAgICAgIHRocm93ICdDb3VsZCBub3QgbGluayBwcm9ncmFtJztcbiAgICAgIH1cbiAgICAgIGdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKTtcblxuICAgICAgdGhpcy5zZXR1cExvY2F0aW9ucygpO1xuXG4gICAgICAvL2dsLnVzZVByb2dyYW0oMCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVzZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1c2UoZm4pIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgaWYgKCF0aGlzLnByb2dyYW0pIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG4gICAgICB9XG4gICAgICBmbih0aGlzLmF0dHJpYnV0ZXMsIHRoaXMudW5pZm9ybXMpO1xuICAgICAgLy9nbC51c2VQcm9ncmFtKDApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQcm9ncmFtO1xufSkoX2dsQm91bmQyW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUHJvZ3JhbTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3Byb2dyYW0gPSByZXF1aXJlKCcuLi9wcm9ncmFtJyk7XG5cbnZhciBfcHJvZ3JhbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtKTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbnZhciBHbG93cmFtcFByb2dyYW0gPSAoZnVuY3Rpb24gKF9Qcm9ncmFtKSB7XG4gIF9pbmhlcml0cyhHbG93cmFtcFByb2dyYW0sIF9Qcm9ncmFtKTtcblxuICBmdW5jdGlvbiBHbG93cmFtcFByb2dyYW0oZ2wsIHZlcnRleCwgZnJhZ21lbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR2xvd3JhbXBQcm9ncmFtKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEdsb3dyYW1wUHJvZ3JhbS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCB2ZXJ0ZXgsIGZyYWdtZW50KTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhHbG93cmFtcFByb2dyYW0sIFt7XG4gICAga2V5OiAndXNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXNlKGZuKSB7XG4gICAgICBpZiAoIXRoaXMucHJvZ3JhbSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH1cbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgLy8gaW5pdCBzdHVmZnMuXG4gICAgICBnbC5kaXNhYmxlKGdsLkNVTExfRkFDRSk7XG4gICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgZ2wuZGVwdGhNYXNrKGZhbHNlKTtcbiAgICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgICAgLy9nbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSwgZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgICAgZm4odGhpcy5hdHRyaWJ1dGVzLCB0aGlzLnVuaWZvcm1zKTtcblxuICAgICAgKDAsIF91dGlscy5yZXNldEdMKShnbCk7XG4gICAgICAvL2dsLnVzZVByb2dyYW0oMCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdsb3dyYW1wUHJvZ3JhbTtcbn0pKF9wcm9ncmFtMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gR2xvd3JhbXBQcm9ncmFtO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3Byb2dyYW0gPSByZXF1aXJlKCcuLi9wcm9ncmFtJyk7XG5cbnZhciBfcHJvZ3JhbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtKTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbnZhciBPcGFxdWVQcm9ncmFtID0gKGZ1bmN0aW9uIChfUHJvZ3JhbSkge1xuICBfaW5oZXJpdHMoT3BhcXVlUHJvZ3JhbSwgX1Byb2dyYW0pO1xuXG4gIGZ1bmN0aW9uIE9wYXF1ZVByb2dyYW0oZ2wsIHZlcnRleCwgZnJhZ21lbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgT3BhcXVlUHJvZ3JhbSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihPcGFxdWVQcm9ncmFtLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIHZlcnRleCwgZnJhZ21lbnQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE9wYXF1ZVByb2dyYW0sIFt7XG4gICAga2V5OiAndXNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXNlKGZuKSB7XG4gICAgICBpZiAoIXRoaXMucHJvZ3JhbSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH1cbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgLy8gaW5pdCBzdHVmZnMuXG4gICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcbiAgICAgIGdsLmZyb250RmFjZShnbC5DQ1cpO1xuICAgICAgZ2wuY3VsbEZhY2UoZ2wuQkFDSyk7XG4gICAgICBnbC5kZXB0aE1hc2sodHJ1ZSk7XG5cbiAgICAgIGZuKHRoaXMuYXR0cmlidXRlcywgdGhpcy51bmlmb3Jtcyk7XG5cbiAgICAgICgwLCBfdXRpbHMucmVzZXRHTCkoZ2wpO1xuICAgICAgLy9nbC51c2VQcm9ncmFtKDApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBPcGFxdWVQcm9ncmFtO1xufSkoX3Byb2dyYW0yWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBPcGFxdWVQcm9ncmFtO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2dsQm91bmQgPSByZXF1aXJlKCcuL2dsLWJvdW5kJyk7XG5cbnZhciBfZ2xCb3VuZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEJvdW5kKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUmVuZGVyZXIgPSAoZnVuY3Rpb24gKF9HTEJvdW5kKSB7XG4gIF9pbmhlcml0cyhSZW5kZXJlciwgX0dMQm91bmQpO1xuXG4gIGZ1bmN0aW9uIFJlbmRlcmVyKGdsLCBtYW5hZ2VyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlbmRlcmVyKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFJlbmRlcmVyLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wpO1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy52aWV3UHJvamVjdCA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIHRoaXMudmlldyA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIHRoaXMucHJvamVjdCA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUmVuZGVyZXIsIFt7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcodmlldywgcHJvamVjdCkge1xuICAgICAgdGhpcy52aWV3ID0gdmlldztcbiAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5tdWx0aXBseSh0aGlzLnZpZXdQcm9qZWN0LCBwcm9qZWN0LCB2aWV3KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJiYXNlIGNsYXNzIHJlbmRlcnMgbm90aGluZy5cIik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVGltZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVRpbWUoZGVsdGEpIHtcbiAgICAgIHRoaXMuZWxhcHNlZCArPSBkZWx0YTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUmVuZGVyZXI7XG59KShfZ2xCb3VuZDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJlbmRlcmVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3JlbmRlcmVyID0gcmVxdWlyZSgnLi4vcmVuZGVyZXInKTtcblxudmFyIF9yZW5kZXJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZW5kZXJlcik7XG5cbnZhciBfZHJhd2FibGUgPSByZXF1aXJlKCcuLi9kcmF3YWJsZScpO1xuXG52YXIgX2RyYXdhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlKTtcblxudmFyIE9iamVjdFJlbmRlcmVyID0gKGZ1bmN0aW9uIChfUmVuZGVyZXIpIHtcbiAgX2luaGVyaXRzKE9iamVjdFJlbmRlcmVyLCBfUmVuZGVyZXIpO1xuXG4gIGZ1bmN0aW9uIE9iamVjdFJlbmRlcmVyKGdsLCBtYW5hZ2VyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE9iamVjdFJlbmRlcmVyKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdFJlbmRlcmVyLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIG1hbmFnZXIpO1xuICAgIHRoaXMuZHJhd2FibGVzID0gW107XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoT2JqZWN0UmVuZGVyZXIsIFt7XG4gICAga2V5OiAnYWRkRHJhd2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGREcmF3YWJsZShkcmF3YWJsZSkge1xuICAgICAgaWYgKCFkcmF3YWJsZSBpbnN0YW5jZW9mIF9kcmF3YWJsZTJbJ2RlZmF1bHQnXSkge1xuICAgICAgICB0aHJvdyAnRHJhd2FibGVzIG11c3QgYWx3YXlzIGluaGVyaXQgZnJvbSB0aGUgYmFzZSBEcmF3YWJsZSc7XG4gICAgICB9XG4gICAgICBpZiAoIWRyYXdhYmxlLmluaXQodGhpcy5tYW5hZ2VyKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2NvdWxkIG5vdCBpbml0aWFsaXplIGRyYXdhYmxlOiAnLCBkcmF3YWJsZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChkcmF3YWJsZS51cGRhdGVWaWV3KSB7XG4gICAgICAgIGRyYXdhYmxlLnVwZGF0ZVZpZXcodGhpcy52aWV3UHJvamVjdCwgdGhpcy52aWV3LCB0aGlzLnByb2plY3QpO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3YWJsZXMucHVzaChkcmF3YWJsZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVtb3ZlRHJhd2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVEcmF3YWJsZShkcmF3YWJsZSwgZGVzdHJveSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRyYXdhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5kcmF3YWJsZXNbaV0gPT09IGRyYXdhYmxlKSB7XG4gICAgICAgICAgdGhpcy5kcmF3YWJsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgICAgICBkcmF3YWJsZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRyYXdhYmxlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FkZEVudGl0eScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEVudGl0eShlbnRpdHkpIHtcbiAgICAgIGZvciAodmFyIGkgaW4gZW50aXR5LmRyYXdhYmxlcykge1xuICAgICAgICB0aGlzLmFkZERyYXdhYmxlKGVudGl0eS5kcmF3YWJsZXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVZpZXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWaWV3KHZpZXcsIHByb2plY3QpIHtcbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdFJlbmRlcmVyLnByb3RvdHlwZSksICd1cGRhdGVWaWV3JywgdGhpcykuY2FsbCh0aGlzLCB2aWV3LCBwcm9qZWN0KTtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGxlbiA9IHRoaXMuZHJhd2FibGVzLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAodGhpcy5kcmF3YWJsZXNbaV0udXBkYXRlVmlldykge1xuICAgICAgICAgIHRoaXMuZHJhd2FibGVzW2ldLnVwZGF0ZVZpZXcodGhpcy52aWV3UHJvamVjdCwgdmlldywgcHJvamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICBsZW4gPSB0aGlzLmRyYXdhYmxlcy5sZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdGhpcy5kcmF3YWJsZXNbaV0uZHJhdygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVRpbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVUaW1lKGRlbHRhKSB7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3RSZW5kZXJlci5wcm90b3R5cGUpLCAndXBkYXRlVGltZScsIHRoaXMpLmNhbGwodGhpcywgZGVsdGEpO1xuICAgICAgdmFyIGksXG4gICAgICAgICAgbGVuID0gdGhpcy5kcmF3YWJsZXMubGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vIGlmIHRoZXNlIHJldHVybiBmYWxzZSwgcmVtb3ZlIHRoZW0gZnJvbSB0aGUgcmVuZGVyIGxvb3A6XG4gICAgICAgIGlmICghdGhpcy5kcmF3YWJsZXNbaV0udXBkYXRlVGltZShkZWx0YSkpIHtcbiAgICAgICAgICB0aGlzLmRyYXdhYmxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgaS0tO1xuICAgICAgICAgIGxlbi0tO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE9iamVjdFJlbmRlcmVyO1xufSkoX3JlbmRlcmVyMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gT2JqZWN0UmVuZGVyZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfZ2xCb3VuZCA9IHJlcXVpcmUoJy4vZ2wtYm91bmQnKTtcblxudmFyIF9nbEJvdW5kMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsQm91bmQpO1xuXG52YXIgVGV4dHVyZSA9IChmdW5jdGlvbiAoX0dMQm91bmQpIHtcbiAgX2luaGVyaXRzKFRleHR1cmUsIF9HTEJvdW5kKTtcblxuICBmdW5jdGlvbiBUZXh0dXJlKGdsLCBpbmZvLCBpbWFnZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUZXh0dXJlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFRleHR1cmUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCk7XG4gICAgdGhpcy5pbmZvID0gaW5mbztcbiAgICB2YXIgbWFwID0ge1xuICAgICAgJ01pcE1hcExpbmVhckxpbmVhcic6IGdsLkxJTkVBUl9NSVBNQVBfTElORUFSLFxuICAgICAgJ0xpbmVhcic6IGdsLkxJTkVBUixcbiAgICAgICdNaXBNYXBMaW5lYXJOZWFyZXN0JzogZ2wuTElORUFSX01JUE1BUF9ORUFSRVNULFxuICAgICAgJ01pcE1hcE5lYXJlc3RMaW5lYXInOiBnbC5ORUFSRVNUX01JUE1BUF9MSU5FQVIsXG4gICAgICAnUmVwZWF0JzogZ2wuUkVQRUFULFxuICAgICAgJ0NsYW1wVG9FZGdlJzogZ2wuQ0xBTVBfVE9fRURHRVxuICAgIH07XG4gICAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIG1hcFtpbmZvLm1pbkZpbHRlcl0pO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBtYXBbaW5mby5tYWdGaWx0ZXJdKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBtYXBbaW5mby53cmFwU10pO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIG1hcFtpbmZvLndyYXBUXSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBpbWFnZSk7XG4gICAgaWYgKC9NaXBNYXAvLnRlc3QoaW5mby5taW5GaWx0ZXIpKSB7XG4gICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICB9XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcblxuICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGV4dHVyZSwgW3tcbiAgICBrZXk6ICd1c2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1c2UoaW5kZXgpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcbiAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyBpbmRleCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGlzcG9zZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IHdoZW4gdGhpcyBzaG91bGQgYmUgY2FsbGVkLlxuICAgICAgLy8gbm9vcDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVGV4dHVyZTtcbn0pKF9nbEJvdW5kMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gVGV4dHVyZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZXhwb3J0cy5yZXNldEdMID0gcmVzZXRHTDtcbmV4cG9ydHMuc2V0UGFyYW1zID0gc2V0UGFyYW1zO1xuZXhwb3J0cy5kaXNjbyA9IGRpc2NvO1xuZXhwb3J0cy5nZW5lcmF0ZUFydGlmYWN0cyA9IGdlbmVyYXRlQXJ0aWZhY3RzO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfZHJhd2FibGVUZXh0dXJlZCA9IHJlcXVpcmUoJy4vZHJhd2FibGUvdGV4dHVyZWQnKTtcblxudmFyIF9kcmF3YWJsZVRleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlVGV4dHVyZWQpO1xuXG4vLyBiYXNlIHN0YXRlLlxuXG5mdW5jdGlvbiByZXNldEdMKGdsKSB7XG4gIGdsLmxpbmVXaWR0aCgxLjApO1xuICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcbiAgZ2wuZnJvbnRGYWNlKGdsLkNDVyk7XG4gIGdsLmN1bGxGYWNlKGdsLkJBQ0spO1xuICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAvL2dsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICBnbC5ibGVuZEZ1bmNTZXBhcmF0ZShnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEsIGdsLk9ORSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gIGdsLmRpc2FibGUoZ2wuQkxFTkQpO1xuICBnbC5kZXB0aE1hc2sodHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIHNldFBhcmFtcyhiYXNlLCBvcHRzLCBkZWVwKSB7XG4gIGZvciAodmFyIGkgaW4gYmFzZSkge1xuICAgIGlmIChiYXNlLmhhc093blByb3BlcnR5KGkpICYmIG9wdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIGlmIChkZWVwICYmIHR5cGVvZiBiYXNlW2ldID09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRzW2ldID09ICdvYmplY3QnKSB7XG4gICAgICAgIGJhc2VbaV0gPSBzZXRQYXJhbXMoYmFzZVtpXSwgb3B0c1tpXSwgZGVlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYXNlW2ldID0gb3B0c1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJhc2U7XG59XG5cbmZ1bmN0aW9uIGRpc2NvKGRlbHRhLCBlbGFwc2VkKSB7XG4gIHZhciBpbmMgPSBlbGFwc2VkIC8gMTAwMDtcbiAgdGhpcy51bmlmb3Jtcy51X2Jhc2VDb2xvclswXSA9IE1hdGguc2luKGluYyk7XG4gIHRoaXMudW5pZm9ybXMudV9iYXNlQ29sb3JbMV0gPSBNYXRoLnNpbihpbmMgKyAyICogTWF0aC5QSSAvIDMpO1xuICB0aGlzLnVuaWZvcm1zLnVfYmFzZUNvbG9yWzJdID0gTWF0aC5zaW4oaW5jICsgNCAqIE1hdGguUEkgLyAzKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG1ha2VBcnRpZmFjdChtZXNoTmFtZSwgdGV4dHVyZU5hbWUpIHtcbiAgdmFyIGFydGlmYWN0ID0gKGZ1bmN0aW9uIChfVGV4dHVyZWREcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhhcnRpZmFjdCwgX1RleHR1cmVkRHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24gYXJ0aWZhY3QoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgYXJ0aWZhY3QpO1xuXG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihhcnRpZmFjdC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5UZXh0dXJlZCwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJ0aWZhY3Q7XG4gIH0pKF9kcmF3YWJsZVRleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gYXJ0aWZhY3Q7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQXJ0aWZhY3RzKHNlcmllcywgbnVtLCBoYXNGcm96ZW4pIHtcbiAgdmFyIGksXG4gICAgICBtZXNoTmFtZSxcbiAgICAgIHRleHR1cmVOYW1lID0gJ0FydGlmYWN0JyArIHNlcmllcyArICdUZXh0dXJlJztcblxuICB2YXIgYXJ0aWZhY3RzID0ge307XG5cbiAgZm9yIChpID0gMTsgaSA8PSBudW07IGkrKykge1xuICAgIG1lc2hOYW1lID0gc2VyaWVzICsgaTtcbiAgICBhcnRpZmFjdHNbJycgKyBpXSA9IG1ha2VBcnRpZmFjdChtZXNoTmFtZSwgdGV4dHVyZU5hbWUpO1xuICB9XG4gIGlmIChoYXNGcm96ZW4pIHtcbiAgICBmb3IgKGkgPSAxOyBpIDw9IG51bTsgaSsrKSB7XG4gICAgICBtZXNoTmFtZSA9IHNlcmllcyArICdGcm96ZW4nICsgaTtcbiAgICAgIGFydGlmYWN0c1snRnJvemVuJyArIGldID0gbWFrZUFydGlmYWN0KG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFydGlmYWN0cztcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFZlcnRleEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIFZlcnRleEF0dHJpYnV0ZShuYW1lLCBzaXplKSB7XG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBWZXJ0ZXhBdHRyaWJ1dGUpO1xuXG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuc2l6ZSA9IHNpemU7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFZlcnRleEF0dHJpYnV0ZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07Il19
