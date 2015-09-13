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

/**
 * Loads a resource via xhr or Image
 * @param  {String}   url      href of the resource to fetch
 * @param  {String}   type     One of XHMLHttpRequest's supported responseType
 *                             values (arraybuffer, blob, document, json, text)
 *                             or 'image' or 'image.co' (for a cross-origin image)
 * @param  {Function} callback Callback to execute on success or failure.  Takes
 *                             err, value as parameters.  Value will be null if err
 *                             is not null
 * @return {void}
 */

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

/**
 * An AssetLoader manages loading one or more assets.  It handles debouncing of
 * of multiple requests for the same asset, etc.
 */

var AssetLoader = (function () {

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
   * If the asset is already loaded, the callback is immediately invoked.
   * @see loadResource
   */

  _createClass(AssetLoader, [{
    key: 'loadAsset',
    value: function loadAsset(url, type, callback) {
      var _this = this;

      var name = '_' + encodeURIComponent(url);
      if (this._assets[name]) {
        // TODO: bounce this out of the current execution
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

    /**
     * Load a set of assets in parallel
     * @param  {Array}   urls      Array of urls of resources
     * @param  {Array}   types     Array of types of resources
     * @param  {Function} callback Callback to invoke for each resource
     * @return {void}
     * @see  loadResource
     */
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
 * Utility function to get some info on loading states.
 * @param  {Array} queue  List of status codes, one per request
 * @return {Object}       Short summary of the state of the queue.
 */
function summarize(queue) {
  return {
    total: queue.length,
    loading: queue.reduce(areLoading, 0),
    loaded: queue.reduce(areLoaded, 0),
    error: queue.reduce(areError, 0)
  };
}

/**
 * An AssetManager manages all the various types of assets that need to be bound to
 * to a gl context.  It uses an AssetLoader to handle the loading and caching of the
 * asset sources, and also maintains a parallel cache of the bound resources.
 */

var AssetManager = (function (_GLBound) {
  _inherits(AssetManager, _GLBound);

  /**
   * Constructs an asset loader.
   * @param  {context} gl      A 3d context from a canvas
   * @param  {Object} manifest A mapping of key:value pairs for the following types:
   *                           texture, mesh, program, rawProgram
   */

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

  /**
   * Merges in another manifest to the existing asset manifest
   *
   * Additional manifests should be merged in before loading.
   * @param {Object} manifest @see constructor
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
     */
  }, {
    key: 'addProgram',
    value: function addProgram(name, program) {
      this.programs[name] = program;
    }

    /**
     * Gets a bound texture directly from the cache.
     * @param  {String} name Texture internal name
     * @return {Texture}     The bound texture, or undefined if it does not
     *                       exist or is not yet loaded.
     */
  }, {
    key: 'getTexture',
    value: function getTexture(name) {
      var texture = this.textures[name];
      if (texture) {
        this.stats.texture[name] = (this.stats.texture[name] || 0) + 1;
      }
      return texture;
    }

    /**
     * Gets a bound mesh directly from the cache.
     * @param  {String} name Mesh internal name
     * @return {Mesh}        The bound mesh, or undefined if it does not
     *                       exist or is not yet loaded.
     */
  }, {
    key: 'getMesh',
    value: function getMesh(name) {
      var mesh = this.meshes[name];
      if (mesh) {
        this.stats.mesh[name] = (this.stats.mesh[name] || 0) + 1;
      }
      return mesh;
    }

    /**
     * Gets a bound program directly from the cache.
     * @param  {String} name Program internal name
     * @return {Program}     The bound program, or undefined if it does not
     *                       exist or is not yet loaded.
     */
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

    /**
     * Loads all remote resources found in the manifest, and creates any static programs
     * included in the manifest's rawPrograms section, if it exists.
     * @param  {Function} callback Callback invoked upon completion
     * @return {Function}          Returns a function that can be called to get information
     *                             on loading status. @see getStatus
     */
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
          this.loader.loadAsset((!asset['static'] ? this.path : '') + asset.path, 'image', this._handleTexture.bind(this, this.queues.texture.length, i, asset));
          this.queues.texture.push(0);
        }
      }
      for (i in manifest.mesh) {
        if (manifest.mesh.hasOwnProperty(i) && !(i in this.meshes)) {
          this.meshes[i] = null;
          asset = manifest.mesh[i];
          this.loader.loadAsset((!asset['static'] ? this.path : '') + asset.path, 'arraybuffer', this._handleMesh.bind(this, this.queues.mesh.length, i, asset));
          this.queues.mesh.push(0);
        }
      }
      for (i in manifest.program) {
        if (manifest.program.hasOwnProperty(i) && !(i in this.programs)) {
          this.programs[i] = null;
          asset = manifest.program[i];
          this.loader.loadAssetGroup([(!asset['static'] ? this.path : '') + asset.vertex, (!asset['static'] ? this.path : '') + asset.fragment], ['text', 'text'], this._handleProgram.bind(this, this.queues.program.length, i, asset));
          this.queues.program.push(0);
        }
      }
      for (i in manifest.rawProgram) {
        if (manifest.rawProgram.hasOwnProperty(i) && !(i in this.programs)) {
          this.stats.rawProgram[i] = 0;
          this._createProgram(i, manifest.rawProgram[i]);
        }
      }

      return this.getStatus.bind(this);
    }

    /**
     * Returns a small summary of all the loader queues for all assets.
     * @return {Object} A summary of each queue. @see summarize
     */
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return {
        texture: summarize(this.queues.texture),
        mesh: summarize(this.queues.mesh),
        program: summarize(this.queues.program)
      };
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
  }, {
    key: '_isComplete',
    value: function _isComplete() {
      var status = this.getStatus();
      if (this.complete && status.texture.loading === 0 && status.mesh.loading === 0 && status.program.loading === 0) {
        this.complete();
      }
    }
  }, {
    key: '_handleTexture',
    value: function _handleTexture(idx, name, info, err, value) {
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
    key: '_handleMesh',
    value: function _handleMesh(idx, name, info, err, value) {
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
    key: '_createProgram',
    value: function _createProgram(name, info) {
      var Klass = _program2['default'];
      if (info.program in _programs) {
        Klass = _programs[info.program];
      }
      this.addProgram(name, new Klass(this._gl, info.vertex, info.fragment));
    }
  }, {
    key: '_handleProgram',
    value: function _handleProgram(idx, name, info, err, vals) {
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
  }]);

  return AssetManager;
})(_glBound2['default']);

exports['default'] = AssetManager;
module.exports = exports['default'];
},{"./asset-loader":4,"./gl-bound":29,"./mesh/file":35,"./program":41,"./program/glowramp":42,"./program/opaque":43,"./texture":46}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _glMatrix = require('gl-matrix');

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
    SphericalLink: 'link3d'
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
    OrnamentVolatile: 'OrnamentVolatileTexture'

  }
};

exports['default'] = Constants;
module.exports = exports['default'];
},{"gl-matrix":1}],7:[function(require,module,exports){
/**
 * Base class for all "drawable" things.
 *
 * Requires, at the very least, a program to run.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Drawable = (function () {
  /**
   * Constructor for the base drawable
   * @param  {String} programName Internal name of the program to be run
   */

  function Drawable(programName) {
    _classCallCheck(this, Drawable);

    this.programName = programName;
    this.program = null;
    this.uniforms = {};
    this.drawfn = null;
    this.elapsed = 0;
    this.ready = false;
  }

  /**
   * Initializer for the drawable
   *
   * Hooks up the drawable to all its gl-bound resources
   *
   * @param  {AssetManager} manager AssetManager containing the managed resources for this
   *                                drawable.
   * @return {boolean}              Returns true if the assets are successfully found and initialized,
   *                                false (and generates a warning) otherwise.
   */

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

    /**
     * Sets the specific draw function for this drawable
     *
     * @chainable
     * @param {Function} fn The draw function to use when drawable this object
     * @return {this}
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
      if (!this.ready) {
        console.warn('drawable is not initialized');
        return false;
      }
      this.program.use(this.drawfn);
    }

    /**
     * Sets a uniform on the drawable
     *
     * @chainable
     * @param {String} name  Name of the drawable to set
     * @param {mixed} value  Value to set on the drawable.
     * @returns {this}
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
      if (this.onUpdate) {
        return this.onUpdate(delta, this.elapsed);
      }
      return true;
    }

    /**
     * NYI
     * @return {void}
     */
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

/**
 * This is a modified version of the atmosphere program from:
 * https://github.com/dataarts/webgl-globe/blob/master/globe/globe.js
 */

var AtmosphereDrawable = (function (_ModelDrawable) {
  _inherits(AtmosphereDrawable, _ModelDrawable);

  /**
   * Initializer
   * @param  {Number} radius      Radius of the world.
   *                              This should match the radius of the world mesh the
   *                              atmosphere is being rendered over.
   * @param  {Number} vSlices     Number of vertical slices for the sphere mesh
   * @param  {Number} hSlices     Number of horizontal slices for the sphere mesh
   * @param  {Number} scaleFactor The percent to scale the mesh
   * @return {void}
   */

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

  /**
   * Updates the view matrices of the model
   *
   * @chainable
   * @see    src/drawable/model.js#updateView
   * @param  {mat4} viewProject   combined projection matrix multiplied by view matrix.
   * @return {this}
   */

  _createClass(AtmosphereDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject) {
      _get(Object.getPrototypeOf(AtmosphereDrawable.prototype), 'updateView', this).call(this, viewProject);
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
     * @return {boolean}
     */
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
},{"../constants":6,"../mesh/sphere":38,"./model":14,"gl-matrix":1}],9:[function(require,module,exports){
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

/**
 * Default quality color.
 * @type {vec4}
 */
var defaultColor0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);

/**
 * Default glow color
 * @type {vec4}
 */
var defaultColor1 = _glMatrix.vec4.clone(_constants2['default'].xmColors.coreGlow);

/**
 * This is used for items and other renderables that have two visible colors
 *
 * The specifics of it are basically: if the texture has an opacity less than 0.5,
 * the texture color is blended with u_color0
 * Otherwise, it's the texture color blended with u_color1
 *
 * Or something like that.
 */

var BicoloredDrawable = (function (_TexturedDrawable) {
  _inherits(BicoloredDrawable, _TexturedDrawable);

  /**
   * Initialized a bi-colored drawable
   * @param  {String} meshName    Internal name of the mesh for this drawable
   * @param  {String} textureName Internal name of the texture for this drawble
   */

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
},{"../constants":6,"./textured":22,"gl-matrix":1}],10:[function(require,module,exports){
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

/**
 * Default base color for the glowramp drawable
 * @type {vec4}
 */
var defaultBaseColor = _glMatrix.vec4.clone(_constants2['default'].teamColors.NEUTRAL);

/**
 * A "glowramp" refers to the usage of the red, green, and blue channels to create
 * a "glowing" texture.
 */

var GlowrampDrawable = (function (_TexturedDrawable) {
  _inherits(GlowrampDrawable, _TexturedDrawable);

  /**
   * Creates a glowramp drawable
   * @param  {String} meshName    Internal name of the mesh
   * @param  {String} textureName Internal name of the texture
   */

  function GlowrampDrawable(meshName, textureName) {
    _classCallCheck(this, GlowrampDrawable);

    _get(Object.getPrototypeOf(GlowrampDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_baseColor = _glMatrix.vec4.clone(defaultBaseColor);
    this.uniforms.u_rotation = 0;
    this.uniforms.u_rampTarget = 0;
    this.uniforms.u_alpha = 0.6;
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
},{"../constants":6,"./textured":22,"gl-matrix":1}],11:[function(require,module,exports){
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

/**
 * This file constructs the drawable primitives for many of the inventory items.
 */

var Inventory = {};
var meshes = _constants2['default'].Mesh.Inventory;
var textures = _constants2['default'].Texture;

/**
 * Creates the outer "shell" for an xm item.
 * @param  {String} name Internal name of the mesh
 * @return {itembase}    A BicoloredDrawable with the specified mesh name
 *                       and the flipcard texture
 */
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

/**
 * Creates the xm "core" of an item
 * @param  {String} name Internal name of the xm mesh
 * @return {xmbase}      An XmDrawable with the specified mesh name
 *                       and the Xm texture.
 */
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

/**
 * Creates a media item
 * @param  {String} name Media mesh internal name
 * @return {media}       A TexturedDrawable with the Textured program,
 *                       the specified mesh, and the flipcard texture.
 */
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
},{"../constants":6,"./bicolored":9,"./textured":22,"./xm":24}],12:[function(require,module,exports){
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

/**
 * The LinkDrawable represents the base class for link-type drawables.
 */

var LinkDrawable = (function (_TexturedDrawable) {
  _inherits(LinkDrawable, _TexturedDrawable);

  /**
   * Constructs a link drawable witth the given program and texture.
   * @param  {String} programName Internal name of the program to use
   * @param  {String} textureName Internal name of the texture to use
   */

  function LinkDrawable(programName, textureName) {
    _classCallCheck(this, LinkDrawable);

    _get(Object.getPrototypeOf(LinkDrawable.prototype), 'constructor', this).call(this, programName, null, textureName);
    this.uniforms.u_cameraFwd = _glMatrix.vec3.fromValues(0, 0, -1);
    this.uniforms.u_elapsedTime = 0;
  }

  /**
   * Updates the camera transforms for the link drawables
   * @param  {mat4} viewProject Combined view and project matrix
   * @param  {mat4} view        View Matrix
   * @param  {mat4} project     Projection matrix
   * @return {void}
   */

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

    /**
     * Updates default periodic uniforms for links
     * @param  {Number} delta Time delta since last draw
     * @return {Boolean}      @see src/drawable.js#updateTime
     */
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
},{"./textured":22,"gl-matrix":1}],13:[function(require,module,exports){
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

/**
 * A mesh drawable is a drawble that supports a mesh
 * (consisting of vertex attributes and faces/lines)
 * @extends {Drawable}
 */

var MeshDrawable = (function (_Drawable) {
  _inherits(MeshDrawable, _Drawable);

  /**
   * Given a mesh internal name and a program internal name, construct
   * a MeshDrawable
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal Name
   */

  function MeshDrawable(programName, meshName) {
    _classCallCheck(this, MeshDrawable);

    _get(Object.getPrototypeOf(MeshDrawable.prototype), 'constructor', this).call(this, programName);
    this.meshName = meshName;
    this.mesh = null;
    this.drawfn = this._draw.bind(this);
  }

  /**
   * Initializes the drawable with bound resources from the given
   * manager
   * @param  {AssetManager} manager AssetManager containing bound resources
   *                                corresponding to the internal names given
   */

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
  }, {
    key: '_draw',
    value: function _draw(locations, uniforms) {
      for (var i in this.uniforms) {
        if (this.uniforms.hasOwnProperty(i) && i in uniforms) {
          uniforms[i](this.uniforms[i]);
        }
      }
      this.mesh.draw(locations);
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

/**
 * A ModelDrawable is a MeshDrawable that supports local
 * and world transforms, ultimately providing a `u_modelViewProject`
 * uniform to the shader.
 */

var ModelDrawable = (function (_MeshDrawable) {
  _inherits(ModelDrawable, _MeshDrawable);

  /**
   * Given a program and mesh, construct a ModelDrawble
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal name
   */

  function ModelDrawable(programName, meshName) {
    _classCallCheck(this, ModelDrawable);

    _get(Object.getPrototypeOf(ModelDrawable.prototype), 'constructor', this).call(this, programName, meshName);
    this.viewProject = _glMatrix.mat4.create();
    this.model = _glMatrix.mat4.create();
    this.local = _glMatrix.mat4.create();
    this.world = _glMatrix.mat4.create();
  }

  /**
   * Update the internal u_modelViewProject uniform
   * by applying world and local transforms to the model
   * matrix
   */

  _createClass(ModelDrawable, [{
    key: 'updateMatrix',
    value: function updateMatrix() {
      var mvp = _glMatrix.mat4.create();
      _glMatrix.mat4.multiply(this.model, this.world, this.local);
      _glMatrix.mat4.multiply(mvp, this.viewProject, this.model);
      this.uniforms.u_modelViewProject = mvp;
    }

    /**
     * Update the internal viewProject matrix (projection * view matrices)
     * @param  {mat4} viewProject Projection matrix multiplied by view matrix
     */
  }, {
    key: 'updateView',
    value: function updateView(viewProject) {
      this.viewProject = viewProject;
      this.updateMatrix();
    }

    /**
     * Sets the model transform to a given matrix
     * @param {mat4} mat Matrix to use
     */
  }, {
    key: 'setMatrix',
    value: function setMatrix(mat) {
      this.model = mat;
      this.updateMatrix();
    }

    /**
     * Translate a model along some vector
     * @param  {vec3} vec   The vector
     */
  }, {
    key: 'translate',
    value: function translate(vec) {
      _glMatrix.mat4.translate(this.local, this.local, vec);
      this.updateMatrix();
    }

    /**
     * Scale a model by some vector
     * @param  {vec3} vec   The vector
     */
  }, {
    key: 'scale',
    value: function scale(vec) {
      _glMatrix.mat4.scale(this.local, this.local, vec);
      this.updateMatrix();
    }

    /**
     * Rotate a model with a quaternion
     * @param  {quat} quat   The quaternion
     */
  }, {
    key: 'rotateQuat',
    value: function rotateQuat(quat) {
      var quatMatrix = _glMatrix.mat4.create();
      _glMatrix.mat4.fromQuat(quatMatrix, quat);
      _glMatrix.mat4.multiply(this.local, this.local, quatMatrix);
      this.updateMatrix();
    }

    /**
     * Translate the model along the X axis
     * @param  {float} dist  Distance to translate
     */
  }, {
    key: 'translateX',
    value: function translateX(dist) {
      this.translate(_glMatrix.vec3.fromValues(dist, 0, 0));
    }

    /**
     * Translate the model along the Y axis
     * @param  {float} dist  Distance to translate
     */
  }, {
    key: 'translateY',
    value: function translateY(dist) {
      this.translate(_glMatrix.vec3.fromValues(0, dist, 0));
    }

    /**
     * Translate the model along the Z axis
     * @param  {float} dist  Distance to translate
     */
  }, {
    key: 'translateZ',
    value: function translateZ(dist) {
      this.translate(_glMatrix.vec3.fromValues(0, 0, dist));
    }

    /**
     * Scale all dimensions by the same value
     * @param  {Number} f The amount to scale
     */
  }, {
    key: 'scalarScale',
    value: function scalarScale(f) {
      this.scale(_glMatrix.vec3.fromValues(f, f, f));
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.RegionTextured;

/**
 * An OrnamentDrawable is a TextuedDrawable that draws an ornament on
 * a unit plane.
 */

var OrnamentDrawable = (function (_TexturedDrawable) {
  _inherits(OrnamentDrawable, _TexturedDrawable);

  /**
   * Constructs an ornament
   * @param  {String} meshName    Internal name of the ornament mesh
   * @param  {String} textureName Internal name of the texture
   */

  function OrnamentDrawable(meshName, textureName) {
    _classCallCheck(this, OrnamentDrawable);

    _get(Object.getPrototypeOf(OrnamentDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_texCoordBase = _glMatrix.vec2.fromValues(0, 0);
    this.uniforms.u_texCoordExtent = _glMatrix.vec2.fromValues(1, 1);
    this.uniforms.u_color = _glMatrix.vec4.clone(_constants2['default'].teamColors.LOKI);
  }

  return OrnamentDrawable;
})(_textured2['default']);

exports['default'] = OrnamentDrawable;
module.exports = exports['default'];
},{"../constants":6,"./textured":22,"gl-matrix":1}],16:[function(require,module,exports){
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

/**
 * A LinkDrawable that represents a link from one portal to another
 * @extends {LinkDrawable}
 */

var PortalLinkDrawable = (function (_LinkDrawable) {
  _inherits(PortalLinkDrawable, _LinkDrawable);

  /**
   * Construct a portal link
   * @param  {vec2} start          X, Z of origin portal
   * @param  {vec2} end            X, Z of destination portal
   * @param  {vec4} color          Color of link
   * @param  {Number} startPercent Percent health of the origin portal
   * @param  {Number} endPercent   Percent health of the destination portal
   */

  function PortalLinkDrawable(start, end, color, startPercent, endPercent) {
    _classCallCheck(this, PortalLinkDrawable);

    _get(Object.getPrototypeOf(PortalLinkDrawable.prototype), 'constructor', this).call(this, _constants2['default'].Program.Link, _constants2['default'].Texture.PortalLink);
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
  }

  /**
   * Construct the PortalLinkMesh for this link
   * @param  {AssetManager} manager AssetManager to look up the program and texture
   * @return {Boolean}              Success/failure
   */

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
},{"../constants":6,"../mesh/portal-link":36,"./link":12}],17:[function(require,module,exports){
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

/**
 * A ResonatorLinkDrawable is a LinkDrawable that represents a link
 * between a portal and a resonator
 */

var ResonatorLinkDrawable = (function (_LinkDrawable) {
  _inherits(ResonatorLinkDrawable, _LinkDrawable);

  /**
   * Construct a portal link resonator
   * @param  {vec2} portalPosition     X,Z of the portal (usually 0,0)
   * @param  {Number} slot             Slot (0-7)
   * @param  {Number} distance         Usually 0-40
   * @param  {vec4} color              Color of the resonator link (TODO: make this disco)
   * @param  {Number} resonatorPercent Percent health of the resonator
   */

  function ResonatorLinkDrawable(portalPosition, slot, distance, color, resonatorPercent) {
    _classCallCheck(this, ResonatorLinkDrawable);

    _get(Object.getPrototypeOf(ResonatorLinkDrawable.prototype), 'constructor', this).call(this, _constants2['default'].Program.Link, _constants2['default'].Texture.ResonatorLink);
    this.portalPosition = portalPosition;
    this.slot = slot;
    this.distance = distance;
    this.color = color;
    this.resonatorPercent = resonatorPercent;
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
      this.mesh = new _meshResonatorLink2['default'](manager._gl, this.portalPosition, this.slot, this.distance, this.color, this.resonatorPercent);
      return _get(Object.getPrototypeOf(ResonatorLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return ResonatorLinkDrawable;
})(_link2['default']);

exports['default'] = ResonatorLinkDrawable;
module.exports = exports['default'];
},{"../constants":6,"../mesh/resonator-link":37,"./link":12}],18:[function(require,module,exports){
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

/**
 * Creates a resource drawable
 * @param  {String} name InternalName
 * @return {itembase}    A BicoloredDrawable representing this resource item
 */
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
},{"../constants":6,"./bicolored":9}],19:[function(require,module,exports){
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

var PROGRAM = _constants2['default'].Program.ShieldEffect;

// these defaults are whack.  Need to find the real
// functions used to update these, too
// As of 1.62.0, that was in ...ingress.common.scanner.b.a.d
// The baksmali is a little jacked up, though.
var defaultColor = _glMatrix.vec4.clone(_constants2['default'].teamColors.NEUTRAL);
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
 */

var ShieldEffectDrawable = (function (_TexturedDrawable) {
  _inherits(ShieldEffectDrawable, _TexturedDrawable);

  /**
   * Constructs a shield effect
   * @param  {String} meshName    Mesh internal name
   * @param  {String} textureName Texture internal name
   */

  function ShieldEffectDrawable(meshName, textureName) {
    _classCallCheck(this, ShieldEffectDrawable);

    _get(Object.getPrototypeOf(ShieldEffectDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_color = _glMatrix.vec4.clone(defaultColor);
    this.uniforms.u_rampTargetInvWidth = _glMatrix.vec2.clone(defaultRampTargetInv);
    this.uniforms.u_contributionsAndAlpha = _glMatrix.vec3.clone(defaultContributions);
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
      var ret = _get(Object.getPrototypeOf(ShieldEffectDrawable.prototype), 'updateTime', this).call(this, delta);
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
})(_textured2['default']);

exports['default'] = ShieldEffectDrawable;
module.exports = exports['default'];
},{"../constants":6,"./textured":22,"gl-matrix":1}],20:[function(require,module,exports){
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

/**
 * Represents a portal link that follows the surface of a sphere.
 *
 * Hooray for custom shaders, etc!
 */

var SphericalPortalLinkDrawable = (function (_LinkDrawable) {
  _inherits(SphericalPortalLinkDrawable, _LinkDrawable);

  /**
   * Construct a spherical portal link
   * @param  {Number} sphereRadius Radius of the sphere
   * @param  {vec2} start          Lat,lng of the origin portal
   * @param  {vec2} end            Lat,lng of the destination portal
   * @param  {vec4} color          Color of the link
   * @param  {Number} startPercent Percent health of the origin portal
   * @param  {Number} endPercent   Percent health of the destination portal
   */

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

  /**
   * Constructs a mesh for the link, then initializes the remaining assets.
   * @param  {AssetManager} manager AssetManager containing the program/texture
   * @return {Boolean}              Success/failure
   */

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
},{"../constants":6,"../mesh/spherical-portal-link":39,"./link":12}],21:[function(require,module,exports){
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

/**
 * A sphere with a texture mapped to it
 */

var TexturedSphereDrawable = (function (_TexturedDrawable) {
  _inherits(TexturedSphereDrawable, _TexturedDrawable);

  /**
   * Construct a textured sphere
   * @param  {String} textureName Internal name of the texture to use
   * @param  {Number} radius      Radius of the sphere
   * @param  {Number} vSlices     Number of vertical slices
   * @param  {Number} hSlices     Number of horizontal slices
   */

  function TexturedSphereDrawable(textureName, radius, vSlices, hSlices) {
    _classCallCheck(this, TexturedSphereDrawable);

    _get(Object.getPrototypeOf(TexturedSphereDrawable.prototype), 'constructor', this).call(this, PROGRAM, null, textureName);
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
  }

  /**
   * Create a sphere mesh and initialize the other resources
   * @param  {AssetManager} manager AssetManager containing the texture/program
   * @return {Boolean}              Success/failure
   */

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
},{"../constants":6,"../mesh/sphere":38,"./textured":22}],22:[function(require,module,exports){
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

/**
 * A TexturedDrawable is a ModelDrawable with a specific texture
 */

var TexturedDrawable = (function (_ModelDrawable) {
  _inherits(TexturedDrawable, _ModelDrawable);

  /**
   * Construct a textured drawable, given a program, mesh, and texture
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal name
   * @param  {String} textureName Texture internal name
   */

  function TexturedDrawable(programName, meshName, textureName) {
    _classCallCheck(this, TexturedDrawable);

    _get(Object.getPrototypeOf(TexturedDrawable.prototype), 'constructor', this).call(this, programName, meshName);
    this.textureName = textureName;
    this.texture = null;
  }

  /**
   * Draw the textured object
   */

  _createClass(TexturedDrawable, [{
    key: 'draw',
    value: function draw() {
      this.texture.use(0);
      this.uniforms.u_texture = 0;
      _get(Object.getPrototypeOf(TexturedDrawable.prototype), 'draw', this).call(this);
    }

    /**
     * Initialize the texture, then initialize other resources
     * @param  {AssetManager} manager AssetManager containing the texture and other resources
     * @return {Boolean}              Success/failure
     */
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
},{"./model":14}],23:[function(require,module,exports){
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

var _shieldEffect = require('./shield-effect');

var _shieldEffect2 = _interopRequireDefault(_shieldEffect);

var _ornament = require('./ornament');

var _ornament2 = _interopRequireDefault(_ornament);

/**
 * Various world drawables
 *
 * Includes Portal, ShieldEffect, waypoints, resonators, and artifact glows
 * @type {Object}
 */
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

function makeShieldEffect(mesh, texture) {
  var shieldeffectbase = (function (_ShieldEffectDrawable) {
    _inherits(shieldeffectbase, _ShieldEffectDrawable);

    function shieldeffectbase() {
      _classCallCheck(this, shieldeffectbase);

      _get(Object.getPrototypeOf(shieldeffectbase.prototype), 'constructor', this).call(this, mesh, texture);
    }

    return shieldeffectbase;
  })(_shieldEffect2['default']);

  return shieldeffectbase;
}

function makeOrnament(mesh, texture) {
  var ornamentbase = (function (_OrnamentDrawable) {
    _inherits(ornamentbase, _OrnamentDrawable);

    function ornamentbase() {
      _classCallCheck(this, ornamentbase);

      _get(Object.getPrototypeOf(ornamentbase.prototype), 'constructor', this).call(this, mesh, texture);
    }

    return ornamentbase;
  })(_ornament2['default']);

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

exports['default'] = World;
module.exports = exports['default'];
},{"../constants":6,"./bicolored":9,"./glowramp":10,"./ornament":15,"./shield-effect":19}],24:[function(require,module,exports){
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

/**
 * An XmDrawable is a drawable representing the animate "xm core" of inventory items
 */

var XmDrawable = (function (_TexturedDrawable) {
  _inherits(XmDrawable, _TexturedDrawable);

  /**
   * Construct an xm core
   * @param  {String} meshName    Mesh internal name
   * @param  {String} textureName Texture internal name
   * @param  {vec4} teamColor     Color of the xm glow.
   * @return {[type]}             [description]
   */

  function XmDrawable(meshName, textureName, teamColor) {
    _classCallCheck(this, XmDrawable);

    _get(Object.getPrototypeOf(XmDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_elapsedTime = 0;
    this.uniforms.u_teamColor = _glMatrix.vec4.clone(teamColor || defaultTeamColor);
    this.uniforms.u_altColor = _glMatrix.vec4.clone(defaultAltColor);
  }

  /**
   * Animates the xm core
   * @param  {Number} delta Time since last frame
   * @return {Boolean}      Returns true to continue the animation.
   */

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
},{"../constants":6,"./textured":22,"gl-matrix":1}],25:[function(require,module,exports){
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

/**
 * The Engine provides nearly all the mechanics for actually drawing things to a canvas.
 *
 * Also includes a few simple functions for demoing various entities/drawables.  This
 * will probably go away in a future release.
 */

var Engine = (function () {

  /**
   * Constructs an engine, given a canvas to render on and a list of assets to seed
   * its AssetManager with.
   * @param  {HTMLCanvas} canvas       A Canvas element
   * @param  {Object} assets           A manifest to pass to the internal AssetManager
   *                                   @see  AssetManager
   * @param  {Boolean} enableSnapshots If set to true, the canvas will preserve its drawing
   *                                   buffer, to allow for accurate .toDataURL calls.
   *                                   This will have a performance impact.
   */

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

  /**
   * Resize the canvas and viewport to new dimensions
   * @param  {Number} width  Width, in pixels
   * @param  {Number} height Heigh, in pixels
   * @return {void}
   */

  _createClass(Engine, [{
    key: 'resize',
    value: function resize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.gl.viewport(0, 0, width, height);
      this.updateView();
    }

    /**
     * Updates the current drawing viewport to the canvas' current dimensions
     * @return {void}
     */
  }, {
    key: 'updateView',
    value: function updateView() {
      this.project = _glMatrix.mat4.create();
      _glMatrix.mat4.perspective(this.project, this.hFoV, this.canvas.width / this.canvas.height, 0.1, this.far);
      this.objectRenderer.updateView(this.view, this.project);
    }

    /**
     * Stops the render loop, if it's running.
     * @return {void}
     */
  }, {
    key: 'stop',
    value: function stop() {
      this.paused = true;
      this.cleared = false;
      if (this.frame) {
        window.cancelAnimationFrame(this.frame);
      }
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
    }

    /**
     * Start the render loop.
     * @param  {Number} tick Time since last tick (optional)
     * @return {void}
     */
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

    /**
     * Preloads all assets
     * @param  {Function} callback Callback to invoke on completion
     * @return {void}
     */
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
},{"./asset-manager":5,"./drawable/inventory":11,"./drawable/resource":18,"./drawable/world":23,"./entity/inventory":27,"./entity/portal":28,"./renderer/object":45,"./utils":47,"gl-matrix":1}],26:[function(require,module,exports){
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
},{"gl-matrix":1}],27:[function(require,module,exports){
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
},{"../constants":6,"../drawable/inventory":11,"../entity":26,"gl-matrix":1}],28:[function(require,module,exports){
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

// TODO: Deprecate in favor of a proper scene graph

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
},{"../constants":6,"../drawable/resonator-link":17,"../drawable/world":23,"../entity":26,"gl-matrix":1}],29:[function(require,module,exports){
/**
 * Base class for all things bound to a gl context.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLBound =

/**
 * Binds to a gl context
 * @param  {context} gl  A webgl context
 */
function GLBound(gl) {
  _classCallCheck(this, GLBound);

  this._gl = gl;
};

exports["default"] = GLBound;
module.exports = exports["default"];
},{}],30:[function(require,module,exports){
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

/**
 * A GLAttribute is a GLBuffer that represents vertex attributes
 *
 * @extends {GLBuffer}
 */

var GLAttribute = (function (_GLBuffer) {
  _inherits(GLAttribute, _GLBuffer);

  /**
   * Construct a vertex attribute buffer
   *
   * @chainable
   * @param  {context} gl             WebGLContext
   * @param  {Array} attributes       An array of VertexAttributes
   * @param  {ArrayBuffer} values     Values to fill the buffer with
   * @param  {enum} usage             Usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
   * @return {this}
   */

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

  /**
   * Confirms that the underlying buffer's length is an even multiple
   * of total size of the attributes for the buffer
   *
   * Issues a warning if not.
   */

  _createClass(GLAttribute, [{
    key: 'validate',
    value: function validate() {
      if (this._validate) {
        if (this.values.length % this.width !== 0) {
          console.warn('values array length is not an even multiple of the total size of the attributes');
        }
      }
    }

    /**
     * Update the values in the buffer and pushes the buffer to the gpu
     *
     * @chainable
     * @param  {ArrayBuffer} values New values to write to the buffer
     * @return {this}
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
     * @return {this}
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

    /**
     * Perform some operation on each set of values for some attribute
     *
     * @chainable
     * @param  {Number}   attributeIndex Index of the attribute to select
     * @param  {Function} callback       Callback
     * @return {this}
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
})(_glBuffer2['default']);

exports['default'] = GLAttribute;
module.exports = exports['default'];
},{"./gl-buffer":31}],31:[function(require,module,exports){
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

/**
 * A GLBuffer is a buffer of some sort that will be passed to the gpu
 *
 * @extends {GLBound}
 */

var GLBuffer = (function (_GLBound) {
  _inherits(GLBuffer, _GLBound);

  /**
   * Construct a gl-bound buffer
   *
   * @chainable
   * @param  {context} gl    WebGL context
   * @param  {enum} target   gl target  @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
   * @param  {enum} usage    gl usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
   * @return {this}          the GLBuffer
   */

  function GLBuffer(gl, target, usage) {
    _classCallCheck(this, GLBuffer);

    _get(Object.getPrototypeOf(GLBuffer.prototype), 'constructor', this).call(this, gl);
    this.target = target || gl.ARRAY_BUFFER; // probably shouldn't default this.
    this.usage = usage || gl.STATIC_DRAW;
    this.glBuf = null;
    this.values = null;
    return this;
  }

  /**
   * Binds the buffer to the gpu
   *
   * @chainable
   * @return {this}
   */

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

    /**
     * Unbinds the buffer (NPI)
     *
     * @chainable
     * @return {this}
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
     * @return {this}
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
     * @return {this}
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
     * @return {this}
     */
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

    /**
     * Do something with each elemnt of the buffer
     *
     * @chainable
     * @param  {Function} callback The callback (values returned will overwrite
     *                             the contents of the buffer at that offset)
     * @param  {Number}   start    Offset to start
     * @param  {Number}   end      Offset to end
     * @return {this}
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
     * @return {this}
     */
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
},{"../gl-bound":29}],32:[function(require,module,exports){
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

/**
 * A GLIndex is a GLBuffer representing an index buffer of some kind
 *
 * @extends {GLBuffer}
 */

var GLIndex = (function (_GLBuffer) {
  _inherits(GLIndex, _GLBuffer);

  /**
   * Construct an index buffer
   *
   * @chainable
   * @param  {context} gl           WebGL context
   * @param  {ArrayBuffer} values   Values to initialize the buffer with
   * @param  {enum} drawMode        Draw mode @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.11
   * @param  {enum} usage           Usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
   * @return {this}
   */

  function GLIndex(gl, values, drawMode, usage) {
    _classCallCheck(this, GLIndex);

    usage = usage || gl.STATIC_DRAW;
    _get(Object.getPrototypeOf(GLIndex.prototype), 'constructor', this).call(this, gl, gl.ELEMENT_ARRAY_BUFFER, usage);
    this.mode = drawMode;
    this.values = values;
    this.count = null;
    return this;
  }

  /**
   * Perform a draw call using this index buffer.
   *
   * @chainable
   * @return {this}
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
})(_glBuffer2['default']);

exports['default'] = GLIndex;
module.exports = exports['default'];
},{"./gl-buffer":31}],33:[function(require,module,exports){
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
},{"./asset-loader":4,"./constants":6,"./drawable/atmosphere":8,"./drawable/inventory":11,"./drawable/portal-link":16,"./drawable/resonator-link":17,"./drawable/spherical-portal-link":20,"./drawable/textured-sphere":21,"./drawable/world":23,"./engine":25,"./entity/inventory":27,"./entity/portal":28,"./orbit-controls":40,"./utils":47}],34:[function(require,module,exports){
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

/**
 * Base class for all meshes
 *
 * @extends {GLBound}
 */

var Mesh = (function (_GLBound) {
  _inherits(Mesh, _GLBound);

  /**
   * Initializes a mesh
   * @param  {context} gl              A webgl context
   * @param  {Float32Array} attributes A typed array of vertex attributes
   * @param  {Uint16Array} faces       A typed array of face indices
   * @param  {Uint16Array} lines       A typed array of line indices
   */

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

  /**
   * Given a set of locations from the currently-active shader, draw this mesh
   * @param  {Object} locations A hash of locations by name
   */

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

    // TODO: fixme
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
},{"./gl-bound":29}],35:[function(require,module,exports){
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

/**
 * A FileMesh is a Mesh that is loaded from a serialzied Java object,
 * as found in the apk.
 *
 * @extends {Mesh}
 */

var FileMesh = (function (_Mesh) {
  _inherits(FileMesh, _Mesh);

  /**
   * Construct the Mesh from the given file
   * @param  {context} gl           WebGL context
   * @param  {ArrayBuffer} arraybuf ArrayBuffer representing the entire .obj file
   */

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
},{"../gl/gl-attribute":30,"../gl/gl-index":32,"../mesh":34,"../vertex-attribute":48,"java-deserializer":2}],36:[function(require,module,exports){
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

/**
 * A PortalLinkMesh represents the mesh for a single portal link.
 *
 * @extends {Mesh}
 */

var PortalLinkMesh = (function (_Mesh) {
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
},{"../gl/gl-attribute":30,"../gl/gl-index":32,"../mesh":34,"../vertex-attribute":48,"gl-matrix":1}],37:[function(require,module,exports){
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

/**
 * A ResonatorLinkMesh is a Mesh that represents a single link between a portal and a resonator
 *
 * TODO: Make disco
 *
 * @extends {Mesh}
 */

var ResonatorLinkMesh = (function (_Mesh) {
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
},{"../gl/gl-attribute":30,"../gl/gl-index":32,"../mesh":34,"../vertex-attribute":48,"gl-matrix":1}],38:[function(require,module,exports){
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

/**
 * A SphereMesh is a Mesh that is a sphere, made of a number of quads determined
 * by the number of horizontal and vertical slices involved in its construction
 *
 * @extends {Mesh}
 */

var SphereMesh = (function (_Mesh) {
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
    var attributes = new _glGlAttribute2['default'](gl, parsed.attributes, parsed.values);
    var faces = new _glGlIndex2['default'](gl, parsed.faces, gl.TRIANGLES);
    _get(Object.getPrototypeOf(SphereMesh.prototype), 'constructor', this).call(this, gl, attributes, faces);
  }

  return SphereMesh;
})(_mesh2['default']);

exports['default'] = SphereMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":30,"../gl/gl-index":32,"../mesh":34,"../vertex-attribute":48,"gl-matrix":1}],39:[function(require,module,exports){
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

/**
 * A SphereicalPortalLinkMesh is a Mesh that represents a portal link betwen two portals
 * on the surface of a sphere
 *
 * @extends {Mesh}
 */

var SphericalPortalLinkMesh = (function (_Mesh) {
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
},{"../gl/gl-attribute":30,"../gl/gl-index":32,"../mesh":34,"../vertex-attribute":48,"gl-matrix":1}],40:[function(require,module,exports){
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

/**
 * Camera controls for controlling a camera that orbits a fixed point,
 * with variable position and depth.
 *
 * This is a port of the THREE.js OrbitControls found with the webgl globe.
 */

var OrbitControls = (function () {

  /**
   * Constructs an orbiting camera control.
   * @param  {HTMLElement} element  Target element to bind listeners to
   * @param  {Number} distance Starting distance from origin
   * @param  {Object} options  Hash of options for configuration
   */

  function OrbitControls(element, distance, options) {
    _classCallCheck(this, OrbitControls);

    options = options || {};
    this.element = element;
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
    this.mouseOver = (function () {
      this.overRenderer = true;
    }).bind(this);
    this.mouseOut = (function () {
      this.overRenderer = false;
    }).bind(this);
    this.enabled = false;
  }

  /**
   * Unbinds all listeners and disables the controls
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
     */
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

    //?
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
})();

exports['default'] = OrbitControls;
module.exports = exports['default'];
},{"./utils":47,"gl-matrix":1}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.fixPrecision = fixPrecision;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

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

/**
 * Represents a shader program consisting of a vertex shader and a fragment
 * shader.
 * @extends {GLBound}
 */

var Program = (function (_GLBound) {
  _inherits(Program, _GLBound);

  /**
   * Constructs a program from the given vertex and fragment shader strings.
   *
   * Manages the shader's attributes and uniforms.
   * @param  {context} gl      Webgl context
   * @param  {String} vertex   Vertex shader
   * @param  {String} fragment Fragment shader
   */

  function Program(gl, vertex, fragment) {
    _classCallCheck(this, Program);

    _get(Object.getPrototypeOf(Program.prototype), "constructor", this).call(this, gl);
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

  _createClass(Program, [{
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

      this._setupLocations();
    }

    /**
     * Use the program with the given draw function
     * @param  {Function} fn Function to handle the actual drawing.
     *                       The programs attributes and uniforms will
     *                       be passed to the draw function for use.
     */
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
  }, {
    key: "_setupLocations",
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
  }]);

  return Program;
})(_glBound2["default"]);

exports["default"] = Program;
},{"./gl-bound":29}],42:[function(require,module,exports){
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

/**
 * A GlowrampProgram is a program meant for drawing
 * transparent glowramp drawables
 *
 * @extends {Program}
 */

var GlowrampProgram = (function (_Program) {
  _inherits(GlowrampProgram, _Program);

  /**
   * Constructs a Glowramp program given vertex and fragment shader sources
   * @param  {context} gl      WebGL context
   * @param  {String} vertex   Vertex shader source
   * @param  {String} fragment Fragment shader source
   */

  function GlowrampProgram(gl, vertex, fragment) {
    _classCallCheck(this, GlowrampProgram);

    _get(Object.getPrototypeOf(GlowrampProgram.prototype), 'constructor', this).call(this, gl, vertex, fragment);
  }

  /**
   * Use this program to draw
   *
   * Sets up the proper blending modes, etc
   * @param  {Function} fn The draw function
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
})(_program2['default']);

exports['default'] = GlowrampProgram;
module.exports = exports['default'];
},{"../program":41,"../utils":47}],43:[function(require,module,exports){
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

/**
 * And OpaqueProgram is a Program used to draw opaque drawables
 *
 * @extends {Program}
 */

var OpaqueProgram = (function (_Program) {
  _inherits(OpaqueProgram, _Program);

  /**
   * Construct an opaque program given vertex and fragment shader
   * sources.
   * @param  {context} gl      WebGL context
   * @param  {String} vertex   Vertex shader source
   * @param  {String} fragment Fragment shader source
   */

  function OpaqueProgram(gl, vertex, fragment) {
    _classCallCheck(this, OpaqueProgram);

    _get(Object.getPrototypeOf(OpaqueProgram.prototype), 'constructor', this).call(this, gl, vertex, fragment);
  }

  /**
   * Use this program to draw.
   *
   * Sets up the proper culling for drawing opaque objects
   * @param  {Function} fn The draw function
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
})(_program2['default']);

exports['default'] = OpaqueProgram;
module.exports = exports['default'];
},{"../program":41,"../utils":47}],44:[function(require,module,exports){
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

/**
 * ... In retrospect, I'm not sure exactly the purpose this class serves
 * It seems that ObjectRenderer inherits from this class, but it's also
 * the only renderer that's currently used.
 * TODO: Revisit this
 * @extends {GLBound}
 */

var Renderer = (function (_GLBound) {
  _inherits(Renderer, _GLBound);

  /**
   * Construct a renderer given a context and a manager
   * @param  {context} gl           A WebGL context
   * @param  {AssetManager} manager An AssetManager to manage GL-bound
   *                                resources
   */

  function Renderer(gl, manager) {
    _classCallCheck(this, Renderer);

    _get(Object.getPrototypeOf(Renderer.prototype), 'constructor', this).call(this, gl);
    this.manager = manager;
    this.viewProject = _glMatrix.mat4.create();
    this.view = _glMatrix.mat4.create();
    this.project = _glMatrix.mat4.create();
    this.elapsed = 0;
  }

  /**
   * Update the internal view and projection matrices
   * @param  {mat4} view    View matrix
   * @param  {mat4} project Projection matrix
   */

  _createClass(Renderer, [{
    key: 'updateView',
    value: function updateView(view, project) {
      this.view = view;
      this.project = project;
      _glMatrix.mat4.multiply(this.viewProject, project, view);
    }

    /**
     * Actually controls the render loop?
     */
  }, {
    key: 'render',
    value: function render() {
      console.warn("base class renders nothing.");
    }

    /**
     * Updates the internal counter of elapsed time.
     * @param  {Number} delta Time elapsed since last render call
     */
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
},{"./gl-bound":29,"gl-matrix":1}],45:[function(require,module,exports){
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

// TODO rework this.

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
},{"../drawable":7,"../renderer":44}],46:[function(require,module,exports){
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

/**
 * A gl-bound texture
 * Supports most (all?) of the texture binding options.
 * Also generates mipmaps if the texture requires it.
 */

var Texture = (function (_GLBound) {
  _inherits(Texture, _GLBound);

  /**
   * Constructs a gl-bound texture, sets all the proper parameters, and binds
   * it to the context
   * @param  {context} gl   A WebGL context
   * @param  {Object} info  Texture parameters
   * @param  {Images} image An image to use as the texture
   */

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

  /**
   * Bind the texture to a particular texture index
   * @param  {Number} index Texture index to bind to
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
     */
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
},{"./gl-bound":29}],47:[function(require,module,exports){
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

/**
 * Reset the GL state to some base state
 * @param  {context} gl A WebGL context
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
 */

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

/**
 * Generate a set of artifacts
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
},{"./constants":6,"./drawable/textured":22}],48:[function(require,module,exports){
/**
 * A vertex attribute
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VertexAttribute =
/**
 * A vertex attribute
 * @param  {String} name Name of the attribute
 * @param  {Number} size Size of the attribute (in bytes)
 */
function VertexAttribute(name, size) {
  _classCallCheck(this, VertexAttribute);

  this.name = name;
  this.size = size;
};

exports["default"] = VertexAttribute;
module.exports = exports["default"];
},{}]},{},[33])(33)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0cml4L2Rpc3QvZ2wtbWF0cml4LmpzIiwibm9kZV9tb2R1bGVzL2phdmEtZGVzZXJpYWxpemVyL2Rpc3QvamF2YS1kZXNlcmlhbGl6ZXIubWluLmpzIiwibm9kZV9tb2R1bGVzL2xpYnRnYS9kaXN0L2xpYnRnYS5taW4uanMiLCJzcmMvYXNzZXQtbG9hZGVyLmpzIiwic3JjL2Fzc2V0LW1hbmFnZXIuanMiLCJzcmMvY29uc3RhbnRzLmpzIiwic3JjL2RyYXdhYmxlLmpzIiwic3JjL2RyYXdhYmxlL2F0bW9zcGhlcmUuanMiLCJzcmMvZHJhd2FibGUvYmljb2xvcmVkLmpzIiwic3JjL2RyYXdhYmxlL2dsb3dyYW1wLmpzIiwic3JjL2RyYXdhYmxlL2ludmVudG9yeS5qcyIsInNyYy9kcmF3YWJsZS9saW5rLmpzIiwic3JjL2RyYXdhYmxlL21lc2guanMiLCJzcmMvZHJhd2FibGUvbW9kZWwuanMiLCJzcmMvZHJhd2FibGUvb3JuYW1lbnQuanMiLCJzcmMvZHJhd2FibGUvcG9ydGFsLWxpbmsuanMiLCJzcmMvZHJhd2FibGUvcmVzb25hdG9yLWxpbmsuanMiLCJzcmMvZHJhd2FibGUvcmVzb3VyY2UuanMiLCJzcmMvZHJhd2FibGUvc2hpZWxkLWVmZmVjdC5qcyIsInNyYy9kcmF3YWJsZS9zcGhlcmljYWwtcG9ydGFsLWxpbmsuanMiLCJzcmMvZHJhd2FibGUvdGV4dHVyZWQtc3BoZXJlLmpzIiwic3JjL2RyYXdhYmxlL3RleHR1cmVkLmpzIiwic3JjL2RyYXdhYmxlL3dvcmxkLmpzIiwic3JjL2RyYXdhYmxlL3htLmpzIiwic3JjL2VuZ2luZS5qcyIsInNyYy9lbnRpdHkuanMiLCJzcmMvZW50aXR5L2ludmVudG9yeS5qcyIsInNyYy9lbnRpdHkvcG9ydGFsLmpzIiwic3JjL2dsLWJvdW5kLmpzIiwic3JjL2dsL2dsLWF0dHJpYnV0ZS5qcyIsInNyYy9nbC9nbC1idWZmZXIuanMiLCJzcmMvZ2wvZ2wtaW5kZXguanMiLCJzcmMvaW5ncmVzcy1tb2RlbC12aWV3ZXIuanMiLCJzcmMvbWVzaC5qcyIsInNyYy9tZXNoL2ZpbGUuanMiLCJzcmMvbWVzaC9wb3J0YWwtbGluay5qcyIsInNyYy9tZXNoL3Jlc29uYXRvci1saW5rLmpzIiwic3JjL21lc2gvc3BoZXJlLmpzIiwic3JjL21lc2gvc3BoZXJpY2FsLXBvcnRhbC1saW5rLmpzIiwic3JjL29yYml0LWNvbnRyb2xzLmpzIiwic3JjL3Byb2dyYW0uanMiLCJzcmMvcHJvZ3JhbS9nbG93cmFtcC5qcyIsInNyYy9wcm9ncmFtL29wYXF1ZS5qcyIsInNyYy9yZW5kZXJlci5qcyIsInNyYy9yZW5kZXJlci9vYmplY3QuanMiLCJzcmMvdGV4dHVyZS5qcyIsInNyYy91dGlscy5qcyIsInNyYy92ZXJ0ZXgtYXR0cmlidXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hwSUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgZ2wtbWF0cml4IC0gSGlnaCBwZXJmb3JtYW5jZSBtYXRyaXggYW5kIHZlY3RvciBvcGVyYXRpb25zXG4gKiBAYXV0aG9yIEJyYW5kb24gSm9uZXNcbiAqIEBhdXRob3IgQ29saW4gTWFjS2VuemllIElWXG4gKiBAdmVyc2lvbiAyLjIuMVxuICovXG5cbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG5cbihmdW5jdGlvbihfZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBzaGltID0ge307XG4gIGlmICh0eXBlb2YoZXhwb3J0cykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIHNoaW0uZXhwb3J0cyA9IHt9O1xuICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2hpbS5leHBvcnRzO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGdsLW1hdHJpeCBsaXZlcyBpbiBhIGJyb3dzZXIsIGRlZmluZSBpdHMgbmFtZXNwYWNlcyBpbiBnbG9iYWxcbiAgICAgIHNoaW0uZXhwb3J0cyA9IHR5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IF9nbG9iYWw7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIGdsLW1hdHJpeCBsaXZlcyBpbiBjb21tb25qcywgZGVmaW5lIGl0cyBuYW1lc3BhY2VzIGluIGV4cG9ydHNcbiAgICBzaGltLmV4cG9ydHMgPSBleHBvcnRzO1xuICB9XG5cbiAgKGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiAgICAvKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG5cbmlmKCFHTE1BVF9FUFNJTE9OKSB7XG4gICAgdmFyIEdMTUFUX0VQU0lMT04gPSAwLjAwMDAwMTtcbn1cblxuaWYoIUdMTUFUX0FSUkFZX1RZUEUpIHtcbiAgICB2YXIgR0xNQVRfQVJSQVlfVFlQRSA9ICh0eXBlb2YgRmxvYXQzMkFycmF5ICE9PSAndW5kZWZpbmVkJykgPyBGbG9hdDMyQXJyYXkgOiBBcnJheTtcbn1cblxuaWYoIUdMTUFUX1JBTkRPTSkge1xuICAgIHZhciBHTE1BVF9SQU5ET00gPSBNYXRoLnJhbmRvbTtcbn1cblxuLyoqXG4gKiBAY2xhc3MgQ29tbW9uIHV0aWxpdGllc1xuICogQG5hbWUgZ2xNYXRyaXhcbiAqL1xudmFyIGdsTWF0cml4ID0ge307XG5cbi8qKlxuICogU2V0cyB0aGUgdHlwZSBvZiBhcnJheSB1c2VkIHdoZW4gY3JlYXRpbmcgbmV3IHZlY3RvcnMgYW5kIG1hdHJpY2llc1xuICpcbiAqIEBwYXJhbSB7VHlwZX0gdHlwZSBBcnJheSB0eXBlLCBzdWNoIGFzIEZsb2F0MzJBcnJheSBvciBBcnJheVxuICovXG5nbE1hdHJpeC5zZXRNYXRyaXhBcnJheVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgR0xNQVRfQVJSQVlfVFlQRSA9IHR5cGU7XG59XG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLmdsTWF0cml4ID0gZ2xNYXRyaXg7XG59XG5cbnZhciBkZWdyZWUgPSBNYXRoLlBJIC8gMTgwO1xuXG4vKipcbiogQ29udmVydCBEZWdyZWUgVG8gUmFkaWFuXG4qXG4qIEBwYXJhbSB7TnVtYmVyfSBBbmdsZSBpbiBEZWdyZWVzXG4qL1xuZ2xNYXRyaXgudG9SYWRpYW4gPSBmdW5jdGlvbihhKXtcbiAgICAgcmV0dXJuIGEgKiBkZWdyZWU7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyAyIERpbWVuc2lvbmFsIFZlY3RvclxuICogQG5hbWUgdmVjMlxuICovXG5cbnZhciB2ZWMyID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjMlxuICpcbiAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcbiAqL1xudmVjMi5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMik7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMiBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcbiAqL1xudmVjMi5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMiBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcbiAqL1xudmVjMi5mcm9tVmFsdWVzID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgyKTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzIgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzIgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zZXQgPSBmdW5jdGlvbihvdXQsIHgsIHkpIHtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnN1YnRyYWN0ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuc3ViID0gdmVjMi5zdWJ0cmFjdDtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubXVsdGlwbHkgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5tdWwgPSB2ZWMyLm11bHRpcGx5O1xuXG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5kaXZpZGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuZGl2aWRlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuZGl2ID0gdmVjMi5kaXZpZGU7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm1pbiA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5tYXggPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgYSB2ZWMyIGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzIncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnNjYWxlQW5kQWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyAoYlswXSAqIHNjYWxlKTtcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzIuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuZGlzdCA9IHZlYzIuZGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWMyLnNxdWFyZWREaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV07XG4gICAgcmV0dXJuIHgqeCArIHkqeTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLnNxckRpc3QgPSB2ZWMyLnNxdWFyZWREaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG52ZWMyLmxlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5sZW4gPSB2ZWMyLmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG52ZWMyLnNxdWFyZWRMZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgcmV0dXJuIHgqeCArIHkqeTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5zcXJMZW4gPSB2ZWMyLnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5uZWdhdGUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubm9ybWFsaXplID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICB2YXIgbGVuID0geCp4ICsgeSp5O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG52ZWMyLmRvdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV07XG59O1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcbiAqIE5vdGUgdGhhdCB0aGUgY3Jvc3MgcHJvZHVjdCBtdXN0IGJ5IGRlZmluaXRpb24gcHJvZHVjZSBhIDNEIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMi5jcm9zcyA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIHZhciB6ID0gYVswXSAqIGJbMV0gLSBhWzFdICogYlswXTtcbiAgICBvdXRbMF0gPSBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IHo7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubGVycCA9IGZ1bmN0aW9uIChvdXQsIGEsIGIsIHQpIHtcbiAgICB2YXIgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV07XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5yYW5kb20gPSBmdW5jdGlvbiAob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuICAgIHZhciByID0gR0xNQVRfUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICAgIG91dFswXSA9IE1hdGguY29zKHIpICogc2NhbGU7XG4gICAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiBzY2FsZTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQyfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnRyYW5zZm9ybU1hdDIgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHk7XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0MmR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIudHJhbnNmb3JtTWF0MmQgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHkgKyBtWzRdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHkgKyBtWzVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDNcbiAqIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQzfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnRyYW5zZm9ybU1hdDMgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVszXSAqIHkgKyBtWzZdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs0XSAqIHkgKyBtWzddO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDRcbiAqIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzAnXG4gKiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQ0ID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCBcbiAgICAgICAgeSA9IGFbMV07XG4gICAgb3V0WzBdID0gbVswXSAqIHggKyBtWzRdICogeSArIG1bMTJdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzEzXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjMnMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjMi4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzJzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLmZvckVhY2ggPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZlYyA9IHZlYzIuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICAgIHZhciBpLCBsO1xuICAgICAgICBpZighc3RyaWRlKSB7XG4gICAgICAgICAgICBzdHJpZGUgPSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoY291bnQpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLm1pbigoY291bnQgKiBzdHJpZGUpICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsID0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgICAgICB2ZWNbMF0gPSBhW2ldOyB2ZWNbMV0gPSBhW2krMV07XG4gICAgICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgICAgIGFbaV0gPSB2ZWNbMF07IGFbaSsxXSA9IHZlY1sxXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gdmVjIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKi9cbnZlYzIuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ3ZlYzIoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcpJztcbn07XG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLnZlYzIgPSB2ZWMyO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMyBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBuYW1lIHZlYzNcbiAqL1xuXG52YXIgdmVjMyA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzNcbiAqXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbnZlYzMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDMpO1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xudmVjMy5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMyk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xudmVjMy5mcm9tVmFsdWVzID0gZnVuY3Rpb24oeCwgeSwgeikge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgzKTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnNldCA9IGZ1bmN0aW9uKG91dCwgeCwgeSwgeikge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLnN1YiA9IHZlYzMuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAqIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMubXVsID0gdmVjMy5tdWx0aXBseTtcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuZGl2aWRlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmRpdiA9IHZlYzMuZGl2aWRlO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5taW4gPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubWF4ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5tYXgoYVsyXSwgYlsyXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjMyBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zY2FsZUFuZEFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSk7XG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpO1xuICAgIG91dFsyXSA9IGFbMl0gKyAoYlsyXSAqIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMy5kaXN0YW5jZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgICAgIHogPSBiWzJdIC0gYVsyXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeik7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmRpc3QgPSB2ZWMzLmRpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMy5zcXVhcmVkRGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl07XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqejtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLnNxckRpc3QgPSB2ZWMzLnNxdWFyZWREaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG52ZWMzLmxlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzMubGVuID0gdmVjMy5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xudmVjMy5zcXVhcmVkTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXTtcbiAgICByZXR1cm4geCp4ICsgeSp5ICsgeip6O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLnNxckxlbiA9IHZlYzMuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm5lZ2F0ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5ub3JtYWxpemUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXTtcbiAgICB2YXIgbGVuID0geCp4ICsgeSp5ICsgeip6O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG52ZWMzLmRvdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXTtcbn07XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5jcm9zcyA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLFxuICAgICAgICBieCA9IGJbMF0sIGJ5ID0gYlsxXSwgYnogPSBiWzJdO1xuXG4gICAgb3V0WzBdID0gYXkgKiBieiAtIGF6ICogYnk7XG4gICAgb3V0WzFdID0gYXogKiBieCAtIGF4ICogYno7XG4gICAgb3V0WzJdID0gYXggKiBieSAtIGF5ICogYng7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubGVycCA9IGZ1bmN0aW9uIChvdXQsIGEsIGIsIHQpIHtcbiAgICB2YXIgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV0sXG4gICAgICAgIGF6ID0gYVsyXTtcbiAgICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnJhbmRvbSA9IGZ1bmN0aW9uIChvdXQsIHNjYWxlKSB7XG4gICAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG5cbiAgICB2YXIgciA9IEdMTUFUX1JBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgICB2YXIgeiA9IChHTE1BVF9SQU5ET00oKSAqIDIuMCkgLSAxLjA7XG4gICAgdmFyIHpTY2FsZSA9IE1hdGguc3FydCgxLjAteip6KSAqIHNjYWxlO1xuXG4gICAgb3V0WzBdID0gTWF0aC5jb3MocikgKiB6U2NhbGU7XG4gICAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiB6U2NhbGU7XG4gICAgb3V0WzJdID0geiAqIHNjYWxlO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDQuXG4gKiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy50cmFuc2Zvcm1NYXQ0ID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl07XG4gICAgb3V0WzBdID0gbVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6ICsgbVsxMl07XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM107XG4gICAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIHRoZSAzeDMgbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMudHJhbnNmb3JtTWF0MyA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuICAgIG91dFswXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyB6ICogbVs2XTtcbiAgICBvdXRbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgeiAqIG1bN107XG4gICAgb3V0WzJdID0geCAqIG1bMl0gKyB5ICogbVs1XSArIHogKiBtWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnRyYW5zZm9ybVF1YXQgPSBmdW5jdGlvbihvdXQsIGEsIHEpIHtcbiAgICAvLyBiZW5jaG1hcmtzOiBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXRyYW5zZm9ybS12ZWMzLWltcGxlbWVudGF0aW9uc1xuXG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sXG4gICAgICAgIHF4ID0gcVswXSwgcXkgPSBxWzFdLCBxeiA9IHFbMl0sIHF3ID0gcVszXSxcblxuICAgICAgICAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xuICAgICAgICBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeSxcbiAgICAgICAgaXkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHosXG4gICAgICAgIGl6ID0gcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4LFxuICAgICAgICBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7XG5cbiAgICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG4gICAgb3V0WzBdID0gaXggKiBxdyArIGl3ICogLXF4ICsgaXkgKiAtcXogLSBpeiAqIC1xeTtcbiAgICBvdXRbMV0gPSBpeSAqIHF3ICsgaXcgKiAtcXkgKyBpeiAqIC1xeCAtIGl4ICogLXF6O1xuICAgIG91dFsyXSA9IGl6ICogcXcgKyBpdyAqIC1xeiArIGl4ICogLXF5IC0gaXkgKiAtcXg7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qXG4qIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHgtYXhpc1xuKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uXG4qIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiovXG52ZWMzLnJvdGF0ZVggPSBmdW5jdGlvbihvdXQsIGEsIGIsIGMpe1xuICAgdmFyIHAgPSBbXSwgcj1bXTtcblx0ICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG5cdCAgcFswXSA9IGFbMF0gLSBiWzBdO1xuXHQgIHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgXHRwWzJdID0gYVsyXSAtIGJbMl07XG5cblx0ICAvL3BlcmZvcm0gcm90YXRpb25cblx0ICByWzBdID0gcFswXTtcblx0ICByWzFdID0gcFsxXSpNYXRoLmNvcyhjKSAtIHBbMl0qTWF0aC5zaW4oYyk7XG5cdCAgclsyXSA9IHBbMV0qTWF0aC5zaW4oYykgKyBwWzJdKk1hdGguY29zKGMpO1xuXG5cdCAgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXHQgIG91dFswXSA9IHJbMF0gKyBiWzBdO1xuXHQgIG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuXHQgIG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuXG4gIFx0cmV0dXJuIG91dDtcbn07XG5cbi8qXG4qIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHktYXhpc1xuKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uXG4qIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiovXG52ZWMzLnJvdGF0ZVkgPSBmdW5jdGlvbihvdXQsIGEsIGIsIGMpe1xuICBcdHZhciBwID0gW10sIHI9W107XG4gIFx0Ly9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuICBcdHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgXHRwWzFdID0gYVsxXSAtIGJbMV07XG4gIFx0cFsyXSA9IGFbMl0gLSBiWzJdO1xuICBcbiAgXHQvL3BlcmZvcm0gcm90YXRpb25cbiAgXHRyWzBdID0gcFsyXSpNYXRoLnNpbihjKSArIHBbMF0qTWF0aC5jb3MoYyk7XG4gIFx0clsxXSA9IHBbMV07XG4gIFx0clsyXSA9IHBbMl0qTWF0aC5jb3MoYykgLSBwWzBdKk1hdGguc2luKGMpO1xuICBcbiAgXHQvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG4gIFx0b3V0WzBdID0gclswXSArIGJbMF07XG4gIFx0b3V0WzFdID0gclsxXSArIGJbMV07XG4gIFx0b3V0WzJdID0gclsyXSArIGJbMl07XG4gIFxuICBcdHJldHVybiBvdXQ7XG59O1xuXG4vKlxuKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB6LWF4aXNcbiogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4qIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4qIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBhbmdsZSBvZiByb3RhdGlvblxuKiBAcmV0dXJucyB7dmVjM30gb3V0XG4qL1xudmVjMy5yb3RhdGVaID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgXHR2YXIgcCA9IFtdLCByPVtdO1xuICBcdC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgXHRwWzBdID0gYVswXSAtIGJbMF07XG4gIFx0cFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcbiAgXG4gIFx0Ly9wZXJmb3JtIHJvdGF0aW9uXG4gIFx0clswXSA9IHBbMF0qTWF0aC5jb3MoYykgLSBwWzFdKk1hdGguc2luKGMpO1xuICBcdHJbMV0gPSBwWzBdKk1hdGguc2luKGMpICsgcFsxXSpNYXRoLmNvcyhjKTtcbiAgXHRyWzJdID0gcFsyXTtcbiAgXG4gIFx0Ly90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICBcdG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBcdG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBcdG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICBcbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjM3MuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjMy4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzNzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmZvckVhY2ggPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZlYyA9IHZlYzMuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICAgIHZhciBpLCBsO1xuICAgICAgICBpZighc3RyaWRlKSB7XG4gICAgICAgICAgICBzdHJpZGUgPSAzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoY291bnQpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLm1pbigoY291bnQgKiBzdHJpZGUpICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsID0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgICAgICB2ZWNbMF0gPSBhW2ldOyB2ZWNbMV0gPSBhW2krMV07IHZlY1syXSA9IGFbaSsyXTtcbiAgICAgICAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgICAgICAgYVtpXSA9IHZlY1swXTsgYVtpKzFdID0gdmVjWzFdOyBhW2krMl0gPSB2ZWNbMl07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMzLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWMzKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcpJztcbn07XG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLnZlYzMgPSB2ZWMzO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgNCBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBuYW1lIHZlYzRcbiAqL1xuXG52YXIgdmVjNCA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzRcbiAqXG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cbnZlYzQuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWM0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG52ZWM0LmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG52ZWM0LmZyb21WYWx1ZXMgPSBmdW5jdGlvbih4LCB5LCB6LCB3KSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IHc7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5zZXQgPSBmdW5jdGlvbihvdXQsIHgsIHksIHosIHcpIHtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICBvdXRbM10gPSB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LnN1YiA9IHZlYzQuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAqIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAqIGJbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0Lm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQubXVsID0gdmVjNC5tdWx0aXBseTtcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuZGl2aWRlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAvIGJbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmRpdiA9IHZlYzQuZGl2aWRlO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5taW4gPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgICBvdXRbM10gPSBNYXRoLm1pbihhWzNdLCBiWzNdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubWF4ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5tYXgoYVsyXSwgYlsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5tYXgoYVszXSwgYlszXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjNCBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5zY2FsZUFuZEFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSk7XG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpO1xuICAgIG91dFsyXSA9IGFbMl0gKyAoYlsyXSAqIHNjYWxlKTtcbiAgICBvdXRbM10gPSBhWzNdICsgKGJbM10gKiBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzQuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgICAgIHcgPSBiWzNdIC0gYVszXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeiArIHcqdyk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmRpc3QgPSB2ZWM0LmRpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjNC5zcXVhcmVkRGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgICAgIHcgPSBiWzNdIC0gYVszXTtcbiAgICByZXR1cm4geCp4ICsgeSp5ICsgeip6ICsgdyp3O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3F1YXJlZERpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuc3FyRGlzdCA9IHZlYzQuc3F1YXJlZERpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cbnZlYzQubGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXSxcbiAgICAgICAgdyA9IGFbM107XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnogKyB3KncpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQubGVuID0gdmVjNC5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xudmVjNC5zcXVhcmVkTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXSxcbiAgICAgICAgdyA9IGFbM107XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqeiArIHcqdztcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5zcXJMZW4gPSB2ZWM0LnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5uZWdhdGUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICBvdXRbM10gPSAtYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubm9ybWFsaXplID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIHZhciBsZW4gPSB4KnggKyB5KnkgKyB6KnogKyB3Knc7XG4gICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICAgICAgICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICogbGVuO1xuICAgICAgICBvdXRbM10gPSBhWzNdICogbGVuO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cbnZlYzQuZG90ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdICsgYVszXSAqIGJbM107XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl0sXG4gICAgICAgIGF3ID0gYVszXTtcbiAgICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KTtcbiAgICBvdXRbM10gPSBhdyArIHQgKiAoYlszXSAtIGF3KTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnJhbmRvbSA9IGZ1bmN0aW9uIChvdXQsIHNjYWxlKSB7XG4gICAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG5cbiAgICAvL1RPRE86IFRoaXMgaXMgYSBwcmV0dHkgYXdmdWwgd2F5IG9mIGRvaW5nIHRoaXMuIEZpbmQgc29tZXRoaW5nIGJldHRlci5cbiAgICBvdXRbMF0gPSBHTE1BVF9SQU5ET00oKTtcbiAgICBvdXRbMV0gPSBHTE1BVF9SQU5ET00oKTtcbiAgICBvdXRbMl0gPSBHTE1BVF9SQU5ET00oKTtcbiAgICBvdXRbM10gPSBHTE1BVF9SQU5ET00oKTtcbiAgICB2ZWM0Lm5vcm1hbGl6ZShvdXQsIG91dCk7XG4gICAgdmVjNC5zY2FsZShvdXQsIG91dCwgc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIG1hdDQuXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnRyYW5zZm9ybU1hdDQgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSwgdyA9IGFbM107XG4gICAgb3V0WzBdID0gbVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6ICsgbVsxMl0gKiB3O1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdICogdztcbiAgICBvdXRbMl0gPSBtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6ICsgbVsxNF0gKiB3O1xuICAgIG91dFszXSA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XSAqIHc7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7cXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQudHJhbnNmb3JtUXVhdCA9IGZ1bmN0aW9uKG91dCwgYSwgcSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLFxuICAgICAgICBxeCA9IHFbMF0sIHF5ID0gcVsxXSwgcXogPSBxWzJdLCBxdyA9IHFbM10sXG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcbiAgICAgICAgaXggPSBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHksXG4gICAgICAgIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6LFxuICAgICAgICBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeCxcbiAgICAgICAgaXcgPSAtcXggKiB4IC0gcXkgKiB5IC0gcXogKiB6O1xuXG4gICAgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuICAgIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXk7XG4gICAgb3V0WzFdID0gaXkgKiBxdyArIGl3ICogLXF5ICsgaXogKiAtcXggLSBpeCAqIC1xejtcbiAgICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWM0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWM0LiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjMnMgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuZm9yRWFjaCA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdmVjID0gdmVjNC5jcmVhdGUoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICAgICAgdmFyIGksIGw7XG4gICAgICAgIGlmKCFzdHJpZGUpIHtcbiAgICAgICAgICAgIHN0cmlkZSA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZighb2Zmc2V0KSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihjb3VudCkge1xuICAgICAgICAgICAgbCA9IE1hdGgubWluKChjb3VudCAqIHN0cmlkZSkgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgICAgIHZlY1swXSA9IGFbaV07IHZlY1sxXSA9IGFbaSsxXTsgdmVjWzJdID0gYVtpKzJdOyB2ZWNbM10gPSBhW2krM107XG4gICAgICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgICAgIGFbaV0gPSB2ZWNbMF07IGFbaSsxXSA9IHZlY1sxXTsgYVtpKzJdID0gdmVjWzJdOyBhW2krM10gPSB2ZWNbM107XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWM0LnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWM0KCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBhWzNdICsgJyknO1xufTtcblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMudmVjNCA9IHZlYzQ7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyAyeDIgTWF0cml4XG4gKiBAbmFtZSBtYXQyXG4gKi9cblxudmFyIG1hdDIgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDJcbiAqXG4gKiBAcmV0dXJucyB7bWF0Mn0gYSBuZXcgMngyIG1hdHJpeFxuICovXG5tYXQyLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbWF0MiBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQyfSBhIG5ldyAyeDIgbWF0cml4XG4gKi9cbm1hdDIuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDIgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgYSBtYXQyIHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLmlkZW50aXR5ID0gZnVuY3Rpb24ob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbm1hdDIudHJhbnNwb3NlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgdmFyIGExID0gYVsxXTtcbiAgICAgICAgb3V0WzFdID0gYVsyXTtcbiAgICAgICAgb3V0WzJdID0gYTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0WzBdID0gYVswXTtcbiAgICAgICAgb3V0WzFdID0gYVsyXTtcbiAgICAgICAgb3V0WzJdID0gYVsxXTtcbiAgICAgICAgb3V0WzNdID0gYVszXTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbm1hdDIuaW52ZXJ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSxcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGEwICogYTMgLSBhMiAqIGExO1xuXG4gICAgaWYgKCFkZXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcbiAgICBcbiAgICBvdXRbMF0gPSAgYTMgKiBkZXQ7XG4gICAgb3V0WzFdID0gLWExICogZGV0O1xuICAgIG91dFsyXSA9IC1hMiAqIGRldDtcbiAgICBvdXRbM10gPSAgYTAgKiBkZXQ7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbm1hdDIuYWRqb2ludCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIENhY2hpbmcgdGhpcyB2YWx1ZSBpcyBuZXNzZWNhcnkgaWYgb3V0ID09IGFcbiAgICB2YXIgYTAgPSBhWzBdO1xuICAgIG91dFswXSA9ICBhWzNdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9ICBhMDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQyLmRldGVybWluYW50ID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gYVswXSAqIGFbM10gLSBhWzJdICogYVsxXTtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0MidzXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLm11bHRpcGx5ID0gZnVuY3Rpb24gKG91dCwgYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM107XG4gICAgdmFyIGIwID0gYlswXSwgYjEgPSBiWzFdLCBiMiA9IGJbMl0sIGIzID0gYlszXTtcbiAgICBvdXRbMF0gPSBhMCAqIGIwICsgYTIgKiBiMTtcbiAgICBvdXRbMV0gPSBhMSAqIGIwICsgYTMgKiBiMTtcbiAgICBvdXRbMl0gPSBhMCAqIGIyICsgYTIgKiBiMztcbiAgICBvdXRbM10gPSBhMSAqIGIyICsgYTMgKiBiMztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDIubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xubWF0Mi5tdWwgPSBtYXQyLm11bHRpcGx5O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQyIGJ5IHRoZSBnaXZlbiBhbmdsZVxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbm1hdDIucm90YXRlID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSxcbiAgICAgICAgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGEwICogIGMgKyBhMiAqIHM7XG4gICAgb3V0WzFdID0gYTEgKiAgYyArIGEzICogcztcbiAgICBvdXRbMl0gPSBhMCAqIC1zICsgYTIgKiBjO1xuICAgIG91dFszXSA9IGExICogLXMgKyBhMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQyIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqKi9cbm1hdDIuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLFxuICAgICAgICB2MCA9IHZbMF0sIHYxID0gdlsxXTtcbiAgICBvdXRbMF0gPSBhMCAqIHYwO1xuICAgIG91dFsxXSA9IGExICogdjA7XG4gICAgb3V0WzJdID0gYTIgKiB2MTtcbiAgICBvdXRbM10gPSBhMyAqIHYxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBtYXQgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xubWF0Mi5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAnbWF0MignICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cbm1hdDIuZnJvYiA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuKE1hdGguc3FydChNYXRoLnBvdyhhWzBdLCAyKSArIE1hdGgucG93KGFbMV0sIDIpICsgTWF0aC5wb3coYVsyXSwgMikgKyBNYXRoLnBvdyhhWzNdLCAyKSkpXG59O1xuXG4vKipcbiAqIFJldHVybnMgTCwgRCBhbmQgVSBtYXRyaWNlcyAoTG93ZXIgdHJpYW5ndWxhciwgRGlhZ29uYWwgYW5kIFVwcGVyIHRyaWFuZ3VsYXIpIGJ5IGZhY3Rvcml6aW5nIHRoZSBpbnB1dCBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gTCB0aGUgbG93ZXIgdHJpYW5ndWxhciBtYXRyaXggXG4gKiBAcGFyYW0ge21hdDJ9IEQgdGhlIGRpYWdvbmFsIG1hdHJpeCBcbiAqIEBwYXJhbSB7bWF0Mn0gVSB0aGUgdXBwZXIgdHJpYW5ndWxhciBtYXRyaXggXG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIGlucHV0IG1hdHJpeCB0byBmYWN0b3JpemVcbiAqL1xuXG5tYXQyLkxEVSA9IGZ1bmN0aW9uIChMLCBELCBVLCBhKSB7IFxuICAgIExbMl0gPSBhWzJdL2FbMF07IFxuICAgIFVbMF0gPSBhWzBdOyBcbiAgICBVWzFdID0gYVsxXTsgXG4gICAgVVszXSA9IGFbM10gLSBMWzJdICogVVsxXTsgXG4gICAgcmV0dXJuIFtMLCBELCBVXTsgICAgICAgXG59OyBcblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMubWF0MiA9IG1hdDI7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyAyeDMgTWF0cml4XG4gKiBAbmFtZSBtYXQyZFxuICogXG4gKiBAZGVzY3JpcHRpb24gXG4gKiBBIG1hdDJkIGNvbnRhaW5zIHNpeCBlbGVtZW50cyBkZWZpbmVkIGFzOlxuICogPHByZT5cbiAqIFthLCBjLCB0eCxcbiAqICBiLCBkLCB0eV1cbiAqIDwvcHJlPlxuICogVGhpcyBpcyBhIHNob3J0IGZvcm0gZm9yIHRoZSAzeDMgbWF0cml4OlxuICogPHByZT5cbiAqIFthLCBjLCB0eCxcbiAqICBiLCBkLCB0eSxcbiAqICAwLCAwLCAxXVxuICogPC9wcmU+XG4gKiBUaGUgbGFzdCByb3cgaXMgaWdub3JlZCBzbyB0aGUgYXJyYXkgaXMgc2hvcnRlciBhbmQgb3BlcmF0aW9ucyBhcmUgZmFzdGVyLlxuICovXG5cbnZhciBtYXQyZCA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0MmRcbiAqXG4gKiBAcmV0dXJucyB7bWF0MmR9IGEgbmV3IDJ4MyBtYXRyaXhcbiAqL1xubWF0MmQuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDYpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbWF0MmQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBhIG1hdHJpeCB0byBjbG9uZVxuICogQHJldHVybnMge21hdDJkfSBhIG5ldyAyeDMgbWF0cml4XG4gKi9cbm1hdDJkLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg2KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MmQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJkfSBvdXRcbiAqL1xubWF0MmQuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldCBhIG1hdDJkIHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKi9cbm1hdDJkLmlkZW50aXR5ID0gZnVuY3Rpb24ob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDJkXG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYWEgPSBhWzBdLCBhYiA9IGFbMV0sIGFjID0gYVsyXSwgYWQgPSBhWzNdLFxuICAgICAgICBhdHggPSBhWzRdLCBhdHkgPSBhWzVdO1xuXG4gICAgdmFyIGRldCA9IGFhICogYWQgLSBhYiAqIGFjO1xuICAgIGlmKCFkZXQpe1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gYWQgKiBkZXQ7XG4gICAgb3V0WzFdID0gLWFiICogZGV0O1xuICAgIG91dFsyXSA9IC1hYyAqIGRldDtcbiAgICBvdXRbM10gPSBhYSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYWMgKiBhdHkgLSBhZCAqIGF0eCkgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGFiICogYXR4IC0gYWEgKiBhdHkpICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gKi9cbm1hdDJkLmRldGVybWluYW50ID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gYVswXSAqIGFbM10gLSBhWzFdICogYVsyXTtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0MmQnc1xuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQyZH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKi9cbm1hdDJkLm11bHRpcGx5ID0gZnVuY3Rpb24gKG91dCwgYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sIGE0ID0gYVs0XSwgYTUgPSBhWzVdLFxuICAgICAgICBiMCA9IGJbMF0sIGIxID0gYlsxXSwgYjIgPSBiWzJdLCBiMyA9IGJbM10sIGI0ID0gYls0XSwgYjUgPSBiWzVdO1xuICAgIG91dFswXSA9IGEwICogYjAgKyBhMiAqIGIxO1xuICAgIG91dFsxXSA9IGExICogYjAgKyBhMyAqIGIxO1xuICAgIG91dFsyXSA9IGEwICogYjIgKyBhMiAqIGIzO1xuICAgIG91dFszXSA9IGExICogYjIgKyBhMyAqIGIzO1xuICAgIG91dFs0XSA9IGEwICogYjQgKyBhMiAqIGI1ICsgYTQ7XG4gICAgb3V0WzVdID0gYTEgKiBiNCArIGEzICogYjUgKyBhNTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDJkLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDJkLm11bCA9IG1hdDJkLm11bHRpcGx5O1xuXG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDJkIGJ5IHRoZSBnaXZlbiBhbmdsZVxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKi9cbm1hdDJkLnJvdGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sIGE0ID0gYVs0XSwgYTUgPSBhWzVdLFxuICAgICAgICBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgb3V0WzBdID0gYTAgKiAgYyArIGEyICogcztcbiAgICBvdXRbMV0gPSBhMSAqICBjICsgYTMgKiBzO1xuICAgIG91dFsyXSA9IGEwICogLXMgKyBhMiAqIGM7XG4gICAgb3V0WzNdID0gYTEgKiAtcyArIGEzICogYztcbiAgICBvdXRbNF0gPSBhNDtcbiAgICBvdXRbNV0gPSBhNTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDJkIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdGhlIHZlYzIgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDJkfSBvdXRcbiAqKi9cbm1hdDJkLnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCB2KSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSwgYTQgPSBhWzRdLCBhNSA9IGFbNV0sXG4gICAgICAgIHYwID0gdlswXSwgdjEgPSB2WzFdO1xuICAgIG91dFswXSA9IGEwICogdjA7XG4gICAgb3V0WzFdID0gYTEgKiB2MDtcbiAgICBvdXRbMl0gPSBhMiAqIHYxO1xuICAgIG91dFszXSA9IGEzICogdjE7XG4gICAgb3V0WzRdID0gYTQ7XG4gICAgb3V0WzVdID0gYTU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbWF0MmQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzJcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjMn0gdiB0aGUgdmVjMiB0byB0cmFuc2xhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDJkfSBvdXRcbiAqKi9cbm1hdDJkLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sIGE0ID0gYVs0XSwgYTUgPSBhWzVdLFxuICAgICAgICB2MCA9IHZbMF0sIHYxID0gdlsxXTtcbiAgICBvdXRbMF0gPSBhMDtcbiAgICBvdXRbMV0gPSBhMTtcbiAgICBvdXRbMl0gPSBhMjtcbiAgICBvdXRbM10gPSBhMztcbiAgICBvdXRbNF0gPSBhMCAqIHYwICsgYTIgKiB2MSArIGE0O1xuICAgIG91dFs1XSA9IGExICogdjAgKyBhMyAqIHYxICsgYTU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDJkXG4gKlxuICogQHBhcmFtIHttYXQyZH0gYSBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQyZC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAnbWF0MmQoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIFxuICAgICAgICAgICAgICAgICAgICBhWzNdICsgJywgJyArIGFbNF0gKyAnLCAnICsgYVs1XSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDJkXG4gKlxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0MmQuZnJvYiA9IGZ1bmN0aW9uIChhKSB7IFxuICAgIHJldHVybihNYXRoLnNxcnQoTWF0aC5wb3coYVswXSwgMikgKyBNYXRoLnBvdyhhWzFdLCAyKSArIE1hdGgucG93KGFbMl0sIDIpICsgTWF0aC5wb3coYVszXSwgMikgKyBNYXRoLnBvdyhhWzRdLCAyKSArIE1hdGgucG93KGFbNV0sIDIpICsgMSkpXG59OyBcblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMubWF0MmQgPSBtYXQyZDtcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDN4MyBNYXRyaXhcbiAqIEBuYW1lIG1hdDNcbiAqL1xuXG52YXIgbWF0MyA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0M1xuICpcbiAqIEByZXR1cm5zIHttYXQzfSBhIG5ldyAzeDMgbWF0cml4XG4gKi9cbm1hdDMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDkpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcGllcyB0aGUgdXBwZXItbGVmdCAzeDMgdmFsdWVzIGludG8gdGhlIGdpdmVuIG1hdDMuXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyAzeDMgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgICB0aGUgc291cmNlIDR4NCBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5mcm9tTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbNF07XG4gICAgb3V0WzRdID0gYVs1XTtcbiAgICBvdXRbNV0gPSBhWzZdO1xuICAgIG91dFs2XSA9IGFbOF07XG4gICAgb3V0WzddID0gYVs5XTtcbiAgICBvdXRbOF0gPSBhWzEwXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0M30gYSBuZXcgM3gzIG1hdHJpeFxuICovXG5tYXQzLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg5KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgYSBtYXQzIHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmlkZW50aXR5ID0gZnVuY3Rpb24ob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAxO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgIHZhciBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMTIgPSBhWzVdO1xuICAgICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgICBvdXRbMl0gPSBhWzZdO1xuICAgICAgICBvdXRbM10gPSBhMDE7XG4gICAgICAgIG91dFs1XSA9IGFbN107XG4gICAgICAgIG91dFs2XSA9IGEwMjtcbiAgICAgICAgb3V0WzddID0gYTEyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbM107XG4gICAgICAgIG91dFsyXSA9IGFbNl07XG4gICAgICAgIG91dFszXSA9IGFbMV07XG4gICAgICAgIG91dFs0XSA9IGFbNF07XG4gICAgICAgIG91dFs1XSA9IGFbN107XG4gICAgICAgIG91dFs2XSA9IGFbMl07XG4gICAgICAgIG91dFs3XSA9IGFbNV07XG4gICAgICAgIG91dFs4XSA9IGFbOF07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuXG4gICAgICAgIGIwMSA9IGEyMiAqIGExMSAtIGExMiAqIGEyMSxcbiAgICAgICAgYjExID0gLWEyMiAqIGExMCArIGExMiAqIGEyMCxcbiAgICAgICAgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwLFxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgZGV0ID0gYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxO1xuXG4gICAgaWYgKCFkZXQpIHsgXG4gICAgICAgIHJldHVybiBudWxsOyBcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gYjAxICogZGV0O1xuICAgIG91dFsxXSA9ICgtYTIyICogYTAxICsgYTAyICogYTIxKSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTEyICogYTAxIC0gYTAyICogYTExKSAqIGRldDtcbiAgICBvdXRbM10gPSBiMTEgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGEyMiAqIGEwMCAtIGEwMiAqIGEyMCkgKiBkZXQ7XG4gICAgb3V0WzVdID0gKC1hMTIgKiBhMDAgKyBhMDIgKiBhMTApICogZGV0O1xuICAgIG91dFs2XSA9IGIyMSAqIGRldDtcbiAgICBvdXRbN10gPSAoLWEyMSAqIGEwMCArIGEwMSAqIGEyMCkgKiBkZXQ7XG4gICAgb3V0WzhdID0gKGExMSAqIGEwMCAtIGEwMSAqIGExMCkgKiBkZXQ7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLmFkam9pbnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XTtcblxuICAgIG91dFswXSA9IChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpO1xuICAgIG91dFsxXSA9IChhMDIgKiBhMjEgLSBhMDEgKiBhMjIpO1xuICAgIG91dFsyXSA9IChhMDEgKiBhMTIgLSBhMDIgKiBhMTEpO1xuICAgIG91dFszXSA9IChhMTIgKiBhMjAgLSBhMTAgKiBhMjIpO1xuICAgIG91dFs0XSA9IChhMDAgKiBhMjIgLSBhMDIgKiBhMjApO1xuICAgIG91dFs1XSA9IChhMDIgKiBhMTAgLSBhMDAgKiBhMTIpO1xuICAgIG91dFs2XSA9IChhMTAgKiBhMjEgLSBhMTEgKiBhMjApO1xuICAgIG91dFs3XSA9IChhMDEgKiBhMjAgLSBhMDAgKiBhMjEpO1xuICAgIG91dFs4XSA9IChhMDAgKiBhMTEgLSBhMDEgKiBhMTApO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQzLmRldGVybWluYW50ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XTtcblxuICAgIHJldHVybiBhMDAgKiAoYTIyICogYTExIC0gYTEyICogYTIxKSArIGEwMSAqICgtYTIyICogYTEwICsgYTEyICogYTIwKSArIGEwMiAqIChhMjEgKiBhMTAgLSBhMTEgKiBhMjApO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQzJ3NcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMubXVsdGlwbHkgPSBmdW5jdGlvbiAob3V0LCBhLCBiKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF0sXG5cbiAgICAgICAgYjAwID0gYlswXSwgYjAxID0gYlsxXSwgYjAyID0gYlsyXSxcbiAgICAgICAgYjEwID0gYlszXSwgYjExID0gYls0XSwgYjEyID0gYls1XSxcbiAgICAgICAgYjIwID0gYls2XSwgYjIxID0gYls3XSwgYjIyID0gYls4XTtcblxuICAgIG91dFswXSA9IGIwMCAqIGEwMCArIGIwMSAqIGExMCArIGIwMiAqIGEyMDtcbiAgICBvdXRbMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjE7XG4gICAgb3V0WzJdID0gYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyO1xuXG4gICAgb3V0WzNdID0gYjEwICogYTAwICsgYjExICogYTEwICsgYjEyICogYTIwO1xuICAgIG91dFs0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMTtcbiAgICBvdXRbNV0gPSBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjI7XG5cbiAgICBvdXRbNl0gPSBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjA7XG4gICAgb3V0WzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxO1xuICAgIG91dFs4XSA9IGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDMubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xubWF0My5tdWwgPSBtYXQzLm11bHRpcGx5O1xuXG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDMgYnkgdGhlIGdpdmVuIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjMn0gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMudHJhbnNsYXRlID0gZnVuY3Rpb24ob3V0LCBhLCB2KSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF0sXG4gICAgICAgIHggPSB2WzBdLCB5ID0gdlsxXTtcblxuICAgIG91dFswXSA9IGEwMDtcbiAgICBvdXRbMV0gPSBhMDE7XG4gICAgb3V0WzJdID0gYTAyO1xuXG4gICAgb3V0WzNdID0gYTEwO1xuICAgIG91dFs0XSA9IGExMTtcbiAgICBvdXRbNV0gPSBhMTI7XG5cbiAgICBvdXRbNl0gPSB4ICogYTAwICsgeSAqIGExMCArIGEyMDtcbiAgICBvdXRbN10gPSB4ICogYTAxICsgeSAqIGExMSArIGEyMTtcbiAgICBvdXRbOF0gPSB4ICogYTAyICsgeSAqIGExMiArIGEyMjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0MyBieSB0aGUgZ2l2ZW4gYW5nbGVcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLnJvdGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuXG4gICAgICAgIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGMgKiBhMDAgKyBzICogYTEwO1xuICAgIG91dFsxXSA9IGMgKiBhMDEgKyBzICogYTExO1xuICAgIG91dFsyXSA9IGMgKiBhMDIgKyBzICogYTEyO1xuXG4gICAgb3V0WzNdID0gYyAqIGExMCAtIHMgKiBhMDA7XG4gICAgb3V0WzRdID0gYyAqIGExMSAtIHMgKiBhMDE7XG4gICAgb3V0WzVdID0gYyAqIGExMiAtIHMgKiBhMDI7XG5cbiAgICBvdXRbNl0gPSBhMjA7XG4gICAgb3V0WzddID0gYTIxO1xuICAgIG91dFs4XSA9IGEyMjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDMgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzJcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdGhlIHZlYzIgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICoqL1xubWF0My5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciB4ID0gdlswXSwgeSA9IHZbMV07XG5cbiAgICBvdXRbMF0gPSB4ICogYVswXTtcbiAgICBvdXRbMV0gPSB4ICogYVsxXTtcbiAgICBvdXRbMl0gPSB4ICogYVsyXTtcblxuICAgIG91dFszXSA9IHkgKiBhWzNdO1xuICAgIG91dFs0XSA9IHkgKiBhWzRdO1xuICAgIG91dFs1XSA9IHkgKiBhWzVdO1xuXG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgZnJvbSBhIG1hdDJkIGludG8gYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byBjb3B5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKiovXG5tYXQzLmZyb21NYXQyZCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSAwO1xuXG4gICAgb3V0WzNdID0gYVsyXTtcbiAgICBvdXRbNF0gPSBhWzNdO1xuICAgIG91dFs1XSA9IDA7XG5cbiAgICBvdXRbNl0gPSBhWzRdO1xuICAgIG91dFs3XSA9IGFbNV07XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4qIENhbGN1bGF0ZXMgYSAzeDMgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb25cbipcbiogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuKiBAcGFyYW0ge3F1YXR9IHEgUXVhdGVybmlvbiB0byBjcmVhdGUgbWF0cml4IGZyb21cbipcbiogQHJldHVybnMge21hdDN9IG91dFxuKi9cbm1hdDMuZnJvbVF1YXQgPSBmdW5jdGlvbiAob3V0LCBxKSB7XG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB5eCA9IHkgKiB4MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHp4ID0geiAqIHgyLFxuICAgICAgICB6eSA9IHogKiB5MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbM10gPSB5eCAtIHd6O1xuICAgIG91dFs2XSA9IHp4ICsgd3k7XG5cbiAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgIG91dFs0XSA9IDEgLSB4eCAtIHp6O1xuICAgIG91dFs3XSA9IHp5IC0gd3g7XG5cbiAgICBvdXRbMl0gPSB6eCAtIHd5O1xuICAgIG91dFs1XSA9IHp5ICsgd3g7XG4gICAgb3V0WzhdID0gMSAtIHh4IC0geXk7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4qIENhbGN1bGF0ZXMgYSAzeDMgbm9ybWFsIG1hdHJpeCAodHJhbnNwb3NlIGludmVyc2UpIGZyb20gdGhlIDR4NCBtYXRyaXhcbipcbiogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuKiBAcGFyYW0ge21hdDR9IGEgTWF0NCB0byBkZXJpdmUgdGhlIG5vcm1hbCBtYXRyaXggZnJvbVxuKlxuKiBAcmV0dXJucyB7bWF0M30gb3V0XG4qL1xubWF0My5ub3JtYWxGcm9tTWF0NCA9IGZ1bmN0aW9uIChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyLFxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHsgXG4gICAgICAgIHJldHVybiBudWxsOyBcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG5cbiAgICBvdXRbM10gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcblxuICAgIG91dFs2XSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgIG91dFs3XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgIG91dFs4XSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQzLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICdtYXQzKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVszXSArICcsICcgKyBhWzRdICsgJywgJyArIGFbNV0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbNl0gKyAnLCAnICsgYVs3XSArICcsICcgKyBhWzhdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0My5mcm9iID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIE1hdGgucG93KGFbNl0sIDIpICsgTWF0aC5wb3coYVs3XSwgMikgKyBNYXRoLnBvdyhhWzhdLCAyKSkpXG59O1xuXG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLm1hdDMgPSBtYXQzO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgNHg0IE1hdHJpeFxuICogQG5hbWUgbWF0NFxuICovXG5cbnZhciBtYXQ0ID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQ0XG4gKlxuICogQHJldHVybnMge21hdDR9IGEgbmV3IDR4NCBtYXRyaXhcbiAqL1xubWF0NC5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMTYpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBtYXQ0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQ0fSBhIG1hdHJpeCB0byBjbG9uZVxuICogQHJldHVybnMge21hdDR9IGEgbmV3IDR4NCBtYXRyaXhcbiAqL1xubWF0NC5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMTYpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgYSBtYXQ0IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmlkZW50aXR5ID0gZnVuY3Rpb24ob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQudHJhbnNwb3NlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgdmFyIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgICAgICBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICAgICAgb3V0WzFdID0gYVs0XTtcbiAgICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICAgIG91dFs0XSA9IGEwMTtcbiAgICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgICAgb3V0WzddID0gYVsxM107XG4gICAgICAgIG91dFs4XSA9IGEwMjtcbiAgICAgICAgb3V0WzldID0gYTEyO1xuICAgICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICAgIG91dFsxMl0gPSBhMDM7XG4gICAgICAgIG91dFsxM10gPSBhMTM7XG4gICAgICAgIG91dFsxNF0gPSBhMjM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0WzBdID0gYVswXTtcbiAgICAgICAgb3V0WzFdID0gYVs0XTtcbiAgICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICAgIG91dFs0XSA9IGFbMV07XG4gICAgICAgIG91dFs1XSA9IGFbNV07XG4gICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICBvdXRbOF0gPSBhWzJdO1xuICAgICAgICBvdXRbOV0gPSBhWzZdO1xuICAgICAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzEyXSA9IGFbM107XG4gICAgICAgIG91dFsxM10gPSBhWzddO1xuICAgICAgICBvdXRbMTRdID0gYVsxMV07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuaW52ZXJ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgICAgICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCxcbiAgICAgICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsXG4gICAgICAgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgICAgICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCxcbiAgICAgICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsXG4gICAgICAgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMixcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgIG91dFsxXSA9IChhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDkpICogZGV0O1xuICAgIG91dFsyXSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgIG91dFszXSA9IChhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDMpICogZGV0O1xuICAgIG91dFs0XSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgIG91dFs1XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICAgIG91dFs2XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgIG91dFs3XSA9IChhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEpICogZGV0O1xuICAgIG91dFs4XSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICAgIG91dFs5XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuICAgIG91dFsxMF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTFdID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzEyXSA9IChhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDYpICogZGV0O1xuICAgIG91dFsxM10gPSAoYTAwICogYjA5IC0gYTAxICogYjA3ICsgYTAyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTRdID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzE1XSA9IChhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDApICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmFkam9pbnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIG91dFswXSAgPSAgKGExMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gICAgb3V0WzFdICA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICBvdXRbMl0gID0gIChhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFszXSAgPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzRdICA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgICBvdXRbNV0gID0gIChhMDAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikpO1xuICAgIG91dFs2XSAgPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzddICA9ICAoYTAwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbOF0gID0gIChhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkpO1xuICAgIG91dFs5XSAgPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XG4gICAgb3V0WzEwXSA9ICAoYTAwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICBvdXRbMTFdID0gLShhMDAgKiAoYTExICogYTIzIC0gYTEzICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSkpO1xuICAgIG91dFsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gICAgb3V0WzEzXSA9ICAoYTAwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpKTtcbiAgICBvdXRbMTRdID0gLShhMDAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgIG91dFsxNV0gPSAgKGEwMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gKi9cbm1hdDQuZGV0ZXJtaW5hbnQgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgcmV0dXJuIGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0NCdzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lm11bHRpcGx5ID0gZnVuY3Rpb24gKG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdO1xuXG4gICAgLy8gQ2FjaGUgb25seSB0aGUgY3VycmVudCBsaW5lIG9mIHRoZSBzZWNvbmQgbWF0cml4XG4gICAgdmFyIGIwICA9IGJbMF0sIGIxID0gYlsxXSwgYjIgPSBiWzJdLCBiMyA9IGJbM107ICBcbiAgICBvdXRbMF0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzFdID0gYjAqYTAxICsgYjEqYTExICsgYjIqYTIxICsgYjMqYTMxO1xuICAgIG91dFsyXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbM10gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbNF07IGIxID0gYls1XTsgYjIgPSBiWzZdOyBiMyA9IGJbN107XG4gICAgb3V0WzRdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs1XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbNl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzddID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzhdOyBiMSA9IGJbOV07IGIyID0gYlsxMF07IGIzID0gYlsxMV07XG4gICAgb3V0WzhdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs5XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTBdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxMV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbMTJdOyBiMSA9IGJbMTNdOyBiMiA9IGJbMTRdOyBiMyA9IGJbMTVdO1xuICAgIG91dFsxMl0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzEzXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTRdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxNV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQ0Lm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDQubXVsID0gbWF0NC5tdWx0aXBseTtcblxuLyoqXG4gKiBUcmFuc2xhdGUgYSBtYXQ0IGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzN9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXSxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMztcblxuICAgIGlmIChhID09PSBvdXQpIHtcbiAgICAgICAgb3V0WzEyXSA9IGFbMF0gKiB4ICsgYVs0XSAqIHkgKyBhWzhdICogeiArIGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzJdICogeCArIGFbNl0gKiB5ICsgYVsxMF0gKiB6ICsgYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzNdICogeCArIGFbN10gKiB5ICsgYVsxMV0gKiB6ICsgYVsxNV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICAgICAgYTEwID0gYVs0XTsgYTExID0gYVs1XTsgYTEyID0gYVs2XTsgYTEzID0gYVs3XTtcbiAgICAgICAgYTIwID0gYVs4XTsgYTIxID0gYVs5XTsgYTIyID0gYVsxMF07IGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFswXSA9IGEwMDsgb3V0WzFdID0gYTAxOyBvdXRbMl0gPSBhMDI7IG91dFszXSA9IGEwMztcbiAgICAgICAgb3V0WzRdID0gYTEwOyBvdXRbNV0gPSBhMTE7IG91dFs2XSA9IGExMjsgb3V0WzddID0gYTEzO1xuICAgICAgICBvdXRbOF0gPSBhMjA7IG91dFs5XSA9IGEyMTsgb3V0WzEwXSA9IGEyMjsgb3V0WzExXSA9IGEyMztcblxuICAgICAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhMDEgKiB4ICsgYTExICogeSArIGEyMSAqIHogKyBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQ0IGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge3ZlYzN9IHYgdGhlIHZlYzMgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICoqL1xubWF0NC5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciB4ID0gdlswXSwgeSA9IHZbMV0sIHogPSB2WzJdO1xuXG4gICAgb3V0WzBdID0gYVswXSAqIHg7XG4gICAgb3V0WzFdID0gYVsxXSAqIHg7XG4gICAgb3V0WzJdID0gYVsyXSAqIHg7XG4gICAgb3V0WzNdID0gYVszXSAqIHg7XG4gICAgb3V0WzRdID0gYVs0XSAqIHk7XG4gICAgb3V0WzVdID0gYVs1XSAqIHk7XG4gICAgb3V0WzZdID0gYVs2XSAqIHk7XG4gICAgb3V0WzddID0gYVs3XSAqIHk7XG4gICAgb3V0WzhdID0gYVs4XSAqIHo7XG4gICAgb3V0WzldID0gYVs5XSAqIHo7XG4gICAgb3V0WzEwXSA9IGFbMTBdICogejtcbiAgICBvdXRbMTFdID0gYVsxMV0gKiB6O1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0NCBieSB0aGUgZ2l2ZW4gYW5nbGVcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHBhcmFtIHt2ZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQsIGF4aXMpIHtcbiAgICB2YXIgeCA9IGF4aXNbMF0sIHkgPSBheGlzWzFdLCB6ID0gYXhpc1syXSxcbiAgICAgICAgbGVuID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeiksXG4gICAgICAgIHMsIGMsIHQsXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcbiAgICAgICAgYTEwLCBhMTEsIGExMiwgYTEzLFxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXG4gICAgICAgIGIwMCwgYjAxLCBiMDIsXG4gICAgICAgIGIxMCwgYjExLCBiMTIsXG4gICAgICAgIGIyMCwgYjIxLCBiMjI7XG5cbiAgICBpZiAoTWF0aC5hYnMobGVuKSA8IEdMTUFUX0VQU0lMT04pIHsgcmV0dXJuIG51bGw7IH1cbiAgICBcbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHggKj0gbGVuO1xuICAgIHkgKj0gbGVuO1xuICAgIHogKj0gbGVuO1xuXG4gICAgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdCA9IDEgLSBjO1xuXG4gICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICBhMTAgPSBhWzRdOyBhMTEgPSBhWzVdOyBhMTIgPSBhWzZdOyBhMTMgPSBhWzddO1xuICAgIGEyMCA9IGFbOF07IGEyMSA9IGFbOV07IGEyMiA9IGFbMTBdOyBhMjMgPSBhWzExXTtcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuICAgIGIwMCA9IHggKiB4ICogdCArIGM7IGIwMSA9IHkgKiB4ICogdCArIHogKiBzOyBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICBiMTAgPSB4ICogeSAqIHQgLSB6ICogczsgYjExID0geSAqIHkgKiB0ICsgYzsgYjEyID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gICAgYjIwID0geCAqIHogKiB0ICsgeSAqIHM7IGIyMSA9IHkgKiB6ICogdCAtIHggKiBzOyBiMjIgPSB6ICogeiAqIHQgKyBjO1xuXG4gICAgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gICAgb3V0WzFdID0gYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyO1xuICAgIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgICBvdXRbM10gPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gICAgb3V0WzRdID0gYTAwICogYjEwICsgYTEwICogYjExICsgYTIwICogYjEyO1xuICAgIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgICBvdXRbNl0gPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gICAgb3V0WzddID0gYTAzICogYjEwICsgYTEzICogYjExICsgYTIzICogYjEyO1xuICAgIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgICBvdXRbOV0gPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gICAgb3V0WzEwXSA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcbiAgICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5yb3RhdGVYID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFswXSAgPSBhWzBdO1xuICAgICAgICBvdXRbMV0gID0gYVsxXTtcbiAgICAgICAgb3V0WzJdICA9IGFbMl07XG4gICAgICAgIG91dFszXSAgPSBhWzNdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICAgIG91dFs1XSA9IGExMSAqIGMgKyBhMjEgKiBzO1xuICAgIG91dFs2XSA9IGExMiAqIGMgKyBhMjIgKiBzO1xuICAgIG91dFs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEyMCAqIGMgLSBhMTAgKiBzO1xuICAgIG91dFs5XSA9IGEyMSAqIGMgLSBhMTEgKiBzO1xuICAgIG91dFsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcbiAgICBvdXRbMTFdID0gYTIzICogYyAtIGExMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnJvdGF0ZVkgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdLFxuICAgICAgICBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzRdICA9IGFbNF07XG4gICAgICAgIG91dFs1XSAgPSBhWzVdO1xuICAgICAgICBvdXRbNl0gID0gYVs2XTtcbiAgICAgICAgb3V0WzddICA9IGFbN107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyAtIGEyMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyAtIGEyMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyAtIGEyMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyAtIGEyMyAqIHM7XG4gICAgb3V0WzhdID0gYTAwICogcyArIGEyMCAqIGM7XG4gICAgb3V0WzldID0gYTAxICogcyArIGEyMSAqIGM7XG4gICAgb3V0WzEwXSA9IGEwMiAqIHMgKyBhMjIgKiBjO1xuICAgIG91dFsxMV0gPSBhMDMgKiBzICsgYTIzICogYztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucm90YXRlWiA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFs4XSAgPSBhWzhdO1xuICAgICAgICBvdXRbOV0gID0gYVs5XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gICAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiBhbmQgdmVjdG9yIHRyYW5zbGF0aW9uXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xuICogICAgIHZhciBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcbiAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XG4gKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7dmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5mcm9tUm90YXRpb25UcmFuc2xhdGlvbiA9IGZ1bmN0aW9uIChvdXQsIHEsIHYpIHtcbiAgICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHh5ID0geCAqIHkyLFxuICAgICAgICB4eiA9IHggKiB6MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHl6ID0geSAqIHoyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSAoeXkgKyB6eik7XG4gICAgb3V0WzFdID0geHkgKyB3ejtcbiAgICBvdXRbMl0gPSB4eiAtIHd5O1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0geHkgLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0gKHh4ICsgenopO1xuICAgIG91dFs2XSA9IHl6ICsgd3g7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSB4eiArIHd5O1xuICAgIG91dFs5XSA9IHl6IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSAoeHggKyB5eSk7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IHZbMF07XG4gICAgb3V0WzEzXSA9IHZbMV07XG4gICAgb3V0WzE0XSA9IHZbMl07XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbm1hdDQuZnJvbVF1YXQgPSBmdW5jdGlvbiAob3V0LCBxKSB7XG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB5eCA9IHkgKiB4MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHp4ID0geiAqIHgyLFxuICAgICAgICB6eSA9IHogKiB5MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgIG91dFsyXSA9IHp4IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcblxuICAgIG91dFs0XSA9IHl4IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtIHh4IC0geno7XG4gICAgb3V0WzZdID0genkgKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuXG4gICAgb3V0WzhdID0genggKyB3eTtcbiAgICBvdXRbOV0gPSB6eSAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0geHggLSB5eTtcbiAgICBvdXRbMTFdID0gMDtcblxuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgZnJ1c3R1bSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtOdW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJ1c3R1bSA9IGZ1bmN0aW9uIChvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIHJsID0gMSAvIChyaWdodCAtIGxlZnQpLFxuICAgICAgICB0YiA9IDEgLyAodG9wIC0gYm90dG9tKSxcbiAgICAgICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFswXSA9IChuZWFyICogMikgKiBybDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IChuZWFyICogMikgKiB0YjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gKHJpZ2h0ICsgbGVmdCkgKiBybDtcbiAgICBvdXRbOV0gPSAodG9wICsgYm90dG9tKSAqIHRiO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IChmYXIgKiBuZWFyICogMikgKiBuZjtcbiAgICBvdXRbMTVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gZm92eSBWZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBhc3BlY3QgQXNwZWN0IHJhdGlvLiB0eXBpY2FsbHkgdmlld3BvcnQgd2lkdGgvaGVpZ2h0XG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnBlcnNwZWN0aXZlID0gZnVuY3Rpb24gKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgZiA9IDEuMCAvIE1hdGgudGFuKGZvdnkgLyAyKSxcbiAgICAgICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFswXSA9IGYgLyBhc3BlY3Q7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSBmO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxMV0gPSAtMTtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gKDIgKiBmYXIgKiBuZWFyKSAqIG5mO1xuICAgIG91dFsxNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQub3J0aG8gPSBmdW5jdGlvbiAob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KSxcbiAgICAgICAgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAtMiAqIGxyO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gLTIgKiBidDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAyICogbmY7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XG4gICAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gICAgb3V0WzE0XSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGxvb2stYXQgbWF0cml4IHdpdGggdGhlIGdpdmVuIGV5ZSBwb3NpdGlvbiwgZm9jYWwgcG9pbnQsIGFuZCB1cCBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHt2ZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxuICogQHBhcmFtIHt2ZWMzfSBjZW50ZXIgUG9pbnQgdGhlIHZpZXdlciBpcyBsb29raW5nIGF0XG4gKiBAcGFyYW0ge3ZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5sb29rQXQgPSBmdW5jdGlvbiAob3V0LCBleWUsIGNlbnRlciwgdXApIHtcbiAgICB2YXIgeDAsIHgxLCB4MiwgeTAsIHkxLCB5MiwgejAsIHoxLCB6MiwgbGVuLFxuICAgICAgICBleWV4ID0gZXllWzBdLFxuICAgICAgICBleWV5ID0gZXllWzFdLFxuICAgICAgICBleWV6ID0gZXllWzJdLFxuICAgICAgICB1cHggPSB1cFswXSxcbiAgICAgICAgdXB5ID0gdXBbMV0sXG4gICAgICAgIHVweiA9IHVwWzJdLFxuICAgICAgICBjZW50ZXJ4ID0gY2VudGVyWzBdLFxuICAgICAgICBjZW50ZXJ5ID0gY2VudGVyWzFdLFxuICAgICAgICBjZW50ZXJ6ID0gY2VudGVyWzJdO1xuXG4gICAgaWYgKE1hdGguYWJzKGV5ZXggLSBjZW50ZXJ4KSA8IEdMTUFUX0VQU0lMT04gJiZcbiAgICAgICAgTWF0aC5hYnMoZXlleSAtIGNlbnRlcnkpIDwgR0xNQVRfRVBTSUxPTiAmJlxuICAgICAgICBNYXRoLmFicyhleWV6IC0gY2VudGVyeikgPCBHTE1BVF9FUFNJTE9OKSB7XG4gICAgICAgIHJldHVybiBtYXQ0LmlkZW50aXR5KG91dCk7XG4gICAgfVxuXG4gICAgejAgPSBleWV4IC0gY2VudGVyeDtcbiAgICB6MSA9IGV5ZXkgLSBjZW50ZXJ5O1xuICAgIHoyID0gZXlleiAtIGNlbnRlcno7XG5cbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KHowICogejAgKyB6MSAqIHoxICsgejIgKiB6Mik7XG4gICAgejAgKj0gbGVuO1xuICAgIHoxICo9IGxlbjtcbiAgICB6MiAqPSBsZW47XG5cbiAgICB4MCA9IHVweSAqIHoyIC0gdXB6ICogejE7XG4gICAgeDEgPSB1cHogKiB6MCAtIHVweCAqIHoyO1xuICAgIHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcbiAgICBsZW4gPSBNYXRoLnNxcnQoeDAgKiB4MCArIHgxICogeDEgKyB4MiAqIHgyKTtcbiAgICBpZiAoIWxlbikge1xuICAgICAgICB4MCA9IDA7XG4gICAgICAgIHgxID0gMDtcbiAgICAgICAgeDIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbiA9IDEgLyBsZW47XG4gICAgICAgIHgwICo9IGxlbjtcbiAgICAgICAgeDEgKj0gbGVuO1xuICAgICAgICB4MiAqPSBsZW47XG4gICAgfVxuXG4gICAgeTAgPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgICB5MSA9IHoyICogeDAgLSB6MCAqIHgyO1xuICAgIHkyID0gejAgKiB4MSAtIHoxICogeDA7XG5cbiAgICBsZW4gPSBNYXRoLnNxcnQoeTAgKiB5MCArIHkxICogeTEgKyB5MiAqIHkyKTtcbiAgICBpZiAoIWxlbikge1xuICAgICAgICB5MCA9IDA7XG4gICAgICAgIHkxID0gMDtcbiAgICAgICAgeTIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbiA9IDEgLyBsZW47XG4gICAgICAgIHkwICo9IGxlbjtcbiAgICAgICAgeTEgKj0gbGVuO1xuICAgICAgICB5MiAqPSBsZW47XG4gICAgfVxuXG4gICAgb3V0WzBdID0geDA7XG4gICAgb3V0WzFdID0geTA7XG4gICAgb3V0WzJdID0gejA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4MTtcbiAgICBvdXRbNV0gPSB5MTtcbiAgICBvdXRbNl0gPSB6MTtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHgyO1xuICAgIG91dFs5XSA9IHkyO1xuICAgIG91dFsxMF0gPSB6MjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gLSh4MCAqIGV5ZXggKyB4MSAqIGV5ZXkgKyB4MiAqIGV5ZXopO1xuICAgIG91dFsxM10gPSAtKHkwICogZXlleCArIHkxICogZXlleSArIHkyICogZXlleik7XG4gICAgb3V0WzE0XSA9IC0oejAgKiBleWV4ICsgejEgKiBleWV5ICsgejIgKiBleWV6KTtcbiAgICBvdXRbMTVdID0gMTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBtYXQgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xubWF0NC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAnbWF0NCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICBhWzRdICsgJywgJyArIGFbNV0gKyAnLCAnICsgYVs2XSArICcsICcgKyBhWzddICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgIGFbOF0gKyAnLCAnICsgYVs5XSArICcsICcgKyBhWzEwXSArICcsICcgKyBhWzExXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVsxMl0gKyAnLCAnICsgYVsxM10gKyAnLCAnICsgYVsxNF0gKyAnLCAnICsgYVsxNV0gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBGcm9iZW5pdXMgbm9ybVxuICovXG5tYXQ0LmZyb2IgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybihNYXRoLnNxcnQoTWF0aC5wb3coYVswXSwgMikgKyBNYXRoLnBvdyhhWzFdLCAyKSArIE1hdGgucG93KGFbMl0sIDIpICsgTWF0aC5wb3coYVszXSwgMikgKyBNYXRoLnBvdyhhWzRdLCAyKSArIE1hdGgucG93KGFbNV0sIDIpICsgTWF0aC5wb3coYVs2XSwgMikgKyBNYXRoLnBvdyhhWzZdLCAyKSArIE1hdGgucG93KGFbN10sIDIpICsgTWF0aC5wb3coYVs4XSwgMikgKyBNYXRoLnBvdyhhWzldLCAyKSArIE1hdGgucG93KGFbMTBdLCAyKSArIE1hdGgucG93KGFbMTFdLCAyKSArIE1hdGgucG93KGFbMTJdLCAyKSArIE1hdGgucG93KGFbMTNdLCAyKSArIE1hdGgucG93KGFbMTRdLCAyKSArIE1hdGgucG93KGFbMTVdLCAyKSApKVxufTtcblxuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5tYXQ0ID0gbWF0NDtcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIFF1YXRlcm5pb25cbiAqIEBuYW1lIHF1YXRcbiAqL1xuXG52YXIgcXVhdCA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgcXVhdFxuICpcbiAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gKi9cbnF1YXQuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0cyBhIHF1YXRlcm5pb24gdG8gcmVwcmVzZW50IHRoZSBzaG9ydGVzdCByb3RhdGlvbiBmcm9tIG9uZVxuICogdmVjdG9yIHRvIGFub3RoZXIuXG4gKlxuICogQm90aCB2ZWN0b3JzIGFyZSBhc3N1bWVkIHRvIGJlIHVuaXQgbGVuZ3RoLlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvbi5cbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgaW5pdGlhbCB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgZGVzdGluYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQucm90YXRpb25UbyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdG1wdmVjMyA9IHZlYzMuY3JlYXRlKCk7XG4gICAgdmFyIHhVbml0VmVjMyA9IHZlYzMuZnJvbVZhbHVlcygxLDAsMCk7XG4gICAgdmFyIHlVbml0VmVjMyA9IHZlYzMuZnJvbVZhbHVlcygwLDEsMCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgICAgIHZhciBkb3QgPSB2ZWMzLmRvdChhLCBiKTtcbiAgICAgICAgaWYgKGRvdCA8IC0wLjk5OTk5OSkge1xuICAgICAgICAgICAgdmVjMy5jcm9zcyh0bXB2ZWMzLCB4VW5pdFZlYzMsIGEpO1xuICAgICAgICAgICAgaWYgKHZlYzMubGVuZ3RoKHRtcHZlYzMpIDwgMC4wMDAwMDEpXG4gICAgICAgICAgICAgICAgdmVjMy5jcm9zcyh0bXB2ZWMzLCB5VW5pdFZlYzMsIGEpO1xuICAgICAgICAgICAgdmVjMy5ub3JtYWxpemUodG1wdmVjMywgdG1wdmVjMyk7XG4gICAgICAgICAgICBxdWF0LnNldEF4aXNBbmdsZShvdXQsIHRtcHZlYzMsIE1hdGguUEkpO1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSBlbHNlIGlmIChkb3QgPiAwLjk5OTk5OSkge1xuICAgICAgICAgICAgb3V0WzBdID0gMDtcbiAgICAgICAgICAgIG91dFsxXSA9IDA7XG4gICAgICAgICAgICBvdXRbMl0gPSAwO1xuICAgICAgICAgICAgb3V0WzNdID0gMTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2ZWMzLmNyb3NzKHRtcHZlYzMsIGEsIGIpO1xuICAgICAgICAgICAgb3V0WzBdID0gdG1wdmVjM1swXTtcbiAgICAgICAgICAgIG91dFsxXSA9IHRtcHZlYzNbMV07XG4gICAgICAgICAgICBvdXRbMl0gPSB0bXB2ZWMzWzJdO1xuICAgICAgICAgICAgb3V0WzNdID0gMSArIGRvdDtcbiAgICAgICAgICAgIHJldHVybiBxdWF0Lm5vcm1hbGl6ZShvdXQsIG91dCk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBzcGVjaWZpZWQgcXVhdGVybmlvbiB3aXRoIHZhbHVlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlblxuICogYXhlcy4gRWFjaCBheGlzIGlzIGEgdmVjMyBhbmQgaXMgZXhwZWN0ZWQgdG8gYmUgdW5pdCBsZW5ndGggYW5kXG4gKiBwZXJwZW5kaWN1bGFyIHRvIGFsbCBvdGhlciBzcGVjaWZpZWQgYXhlcy5cbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IHZpZXcgIHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSB2aWV3aW5nIGRpcmVjdGlvblxuICogQHBhcmFtIHt2ZWMzfSByaWdodCB0aGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbG9jYWwgXCJyaWdodFwiIGRpcmVjdGlvblxuICogQHBhcmFtIHt2ZWMzfSB1cCAgICB0aGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbG9jYWwgXCJ1cFwiIGRpcmVjdGlvblxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnNldEF4ZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hdHIgPSBtYXQzLmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG91dCwgdmlldywgcmlnaHQsIHVwKSB7XG4gICAgICAgIG1hdHJbMF0gPSByaWdodFswXTtcbiAgICAgICAgbWF0clszXSA9IHJpZ2h0WzFdO1xuICAgICAgICBtYXRyWzZdID0gcmlnaHRbMl07XG5cbiAgICAgICAgbWF0clsxXSA9IHVwWzBdO1xuICAgICAgICBtYXRyWzRdID0gdXBbMV07XG4gICAgICAgIG1hdHJbN10gPSB1cFsyXTtcblxuICAgICAgICBtYXRyWzJdID0gLXZpZXdbMF07XG4gICAgICAgIG1hdHJbNV0gPSAtdmlld1sxXTtcbiAgICAgICAgbWF0cls4XSA9IC12aWV3WzJdO1xuXG4gICAgICAgIHJldHVybiBxdWF0Lm5vcm1hbGl6ZShvdXQsIHF1YXQuZnJvbU1hdDMob3V0LCBtYXRyKSk7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBxdWF0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0ZXJuaW9uIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7cXVhdH0gYSBuZXcgcXVhdGVybmlvblxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuY2xvbmUgPSB2ZWM0LmNsb25lO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcXVhdCBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmZyb21WYWx1ZXMgPSB2ZWM0LmZyb21WYWx1ZXM7XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHF1YXQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBzb3VyY2UgcXVhdGVybmlvblxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuY29weSA9IHZlYzQuY29weTtcblxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBxdWF0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5zZXQgPSB2ZWM0LnNldDtcblxuLyoqXG4gKiBTZXQgYSBxdWF0IHRvIHRoZSBpZGVudGl0eSBxdWF0ZXJuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuaWRlbnRpdHkgPSBmdW5jdGlvbihvdXQpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldHMgYSBxdWF0IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFuZCByb3RhdGlvbiBheGlzLFxuICogdGhlbiByZXR1cm5zIGl0LlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHt2ZWMzfSBheGlzIHRoZSBheGlzIGFyb3VuZCB3aGljaCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqKi9cbnF1YXQuc2V0QXhpc0FuZ2xlID0gZnVuY3Rpb24ob3V0LCBheGlzLCByYWQpIHtcbiAgICByYWQgPSByYWQgKiAwLjU7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIG91dFswXSA9IHMgKiBheGlzWzBdO1xuICAgIG91dFsxXSA9IHMgKiBheGlzWzFdO1xuICAgIG91dFsyXSA9IHMgKiBheGlzWzJdO1xuICAgIG91dFszXSA9IE1hdGguY29zKHJhZCk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmFkZCA9IHZlYzQuYWRkO1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQubXVsdGlwbHkgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieCA9IGJbMF0sIGJ5ID0gYlsxXSwgYnogPSBiWzJdLCBidyA9IGJbM107XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYno7XG4gICAgb3V0WzJdID0gYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieDtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXggKiBieCAtIGF5ICogYnkgLSBheiAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lm11bCA9IHF1YXQubXVsdGlwbHk7XG5cbi8qKlxuICogU2NhbGVzIGEgcXVhdCBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5zY2FsZSA9IHZlYzQuc2NhbGU7XG5cbi8qKlxuICogUm90YXRlcyBhIHF1YXRlcm5pb24gYnkgdGhlIGdpdmVuIGFuZ2xlIGFib3V0IHRoZSBYIGF4aXNcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCBxdWF0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byByb3RhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSByYWQgYW5nbGUgKGluIHJhZGlhbnMpIHRvIHJvdGF0ZVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnJvdGF0ZVggPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICByYWQgKj0gMC41OyBcblxuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ4ID0gTWF0aC5zaW4ocmFkKSwgYncgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgb3V0WzBdID0gYXggKiBidyArIGF3ICogYng7XG4gICAgb3V0WzFdID0gYXkgKiBidyArIGF6ICogYng7XG4gICAgb3V0WzJdID0gYXogKiBidyAtIGF5ICogYng7XG4gICAgb3V0WzNdID0gYXcgKiBidyAtIGF4ICogYng7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIHF1YXRlcm5pb24gYnkgdGhlIGdpdmVuIGFuZ2xlIGFib3V0IHRoZSBZIGF4aXNcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCBxdWF0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byByb3RhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSByYWQgYW5nbGUgKGluIHJhZGlhbnMpIHRvIHJvdGF0ZVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnJvdGF0ZVkgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICByYWQgKj0gMC41OyBcblxuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ5ID0gTWF0aC5zaW4ocmFkKSwgYncgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgb3V0WzBdID0gYXggKiBidyAtIGF6ICogYnk7XG4gICAgb3V0WzFdID0gYXkgKiBidyArIGF3ICogYnk7XG4gICAgb3V0WzJdID0gYXogKiBidyArIGF4ICogYnk7XG4gICAgb3V0WzNdID0gYXcgKiBidyAtIGF5ICogYnk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIHF1YXRlcm5pb24gYnkgdGhlIGdpdmVuIGFuZ2xlIGFib3V0IHRoZSBaIGF4aXNcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCBxdWF0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byByb3RhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSByYWQgYW5nbGUgKGluIHJhZGlhbnMpIHRvIHJvdGF0ZVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnJvdGF0ZVogPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICByYWQgKj0gMC41OyBcblxuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ6ID0gTWF0aC5zaW4ocmFkKSwgYncgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgb3V0WzBdID0gYXggKiBidyArIGF5ICogYno7XG4gICAgb3V0WzFdID0gYXkgKiBidyAtIGF4ICogYno7XG4gICAgb3V0WzJdID0gYXogKiBidyArIGF3ICogYno7XG4gICAgb3V0WzNdID0gYXcgKiBidyAtIGF6ICogYno7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgVyBjb21wb25lbnQgb2YgYSBxdWF0IGZyb20gdGhlIFgsIFksIGFuZCBaIGNvbXBvbmVudHMuXG4gKiBBc3N1bWVzIHRoYXQgcXVhdGVybmlvbiBpcyAxIHVuaXQgaW4gbGVuZ3RoLlxuICogQW55IGV4aXN0aW5nIFcgY29tcG9uZW50IHdpbGwgYmUgaWdub3JlZC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIGNhbGN1bGF0ZSBXIGNvbXBvbmVudCBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmNhbGN1bGF0ZVcgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl07XG5cbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICBvdXRbM10gPSAtTWF0aC5zcXJ0KE1hdGguYWJzKDEuMCAtIHggKiB4IC0geSAqIHkgLSB6ICogeikpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmRvdCA9IHZlYzQuZG90O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmxlcnAgPSB2ZWM0LmxlcnA7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBzcGhlcmljYWwgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gcXVhdFxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuc2xlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgLy8gYmVuY2htYXJrczpcbiAgICAvLyAgICBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXNsZXJwLWltcGxlbWVudGF0aW9uc1xuXG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXSwgYncgPSBiWzNdO1xuXG4gICAgdmFyICAgICAgICBvbWVnYSwgY29zb20sIHNpbm9tLCBzY2FsZTAsIHNjYWxlMTtcblxuICAgIC8vIGNhbGMgY29zaW5lXG4gICAgY29zb20gPSBheCAqIGJ4ICsgYXkgKiBieSArIGF6ICogYnogKyBhdyAqIGJ3O1xuICAgIC8vIGFkanVzdCBzaWducyAoaWYgbmVjZXNzYXJ5KVxuICAgIGlmICggY29zb20gPCAwLjAgKSB7XG4gICAgICAgIGNvc29tID0gLWNvc29tO1xuICAgICAgICBieCA9IC0gYng7XG4gICAgICAgIGJ5ID0gLSBieTtcbiAgICAgICAgYnogPSAtIGJ6O1xuICAgICAgICBidyA9IC0gYnc7XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBjb2VmZmljaWVudHNcbiAgICBpZiAoICgxLjAgLSBjb3NvbSkgPiAwLjAwMDAwMSApIHtcbiAgICAgICAgLy8gc3RhbmRhcmQgY2FzZSAoc2xlcnApXG4gICAgICAgIG9tZWdhICA9IE1hdGguYWNvcyhjb3NvbSk7XG4gICAgICAgIHNpbm9tICA9IE1hdGguc2luKG9tZWdhKTtcbiAgICAgICAgc2NhbGUwID0gTWF0aC5zaW4oKDEuMCAtIHQpICogb21lZ2EpIC8gc2lub207XG4gICAgICAgIHNjYWxlMSA9IE1hdGguc2luKHQgKiBvbWVnYSkgLyBzaW5vbTtcbiAgICB9IGVsc2UgeyAgICAgICAgXG4gICAgICAgIC8vIFwiZnJvbVwiIGFuZCBcInRvXCIgcXVhdGVybmlvbnMgYXJlIHZlcnkgY2xvc2UgXG4gICAgICAgIC8vICAuLi4gc28gd2UgY2FuIGRvIGEgbGluZWFyIGludGVycG9sYXRpb25cbiAgICAgICAgc2NhbGUwID0gMS4wIC0gdDtcbiAgICAgICAgc2NhbGUxID0gdDtcbiAgICB9XG4gICAgLy8gY2FsY3VsYXRlIGZpbmFsIHZhbHVlc1xuICAgIG91dFswXSA9IHNjYWxlMCAqIGF4ICsgc2NhbGUxICogYng7XG4gICAgb3V0WzFdID0gc2NhbGUwICogYXkgKyBzY2FsZTEgKiBieTtcbiAgICBvdXRbMl0gPSBzY2FsZTAgKiBheiArIHNjYWxlMSAqIGJ6O1xuICAgIG91dFszXSA9IHNjYWxlMCAqIGF3ICsgc2NhbGUxICogYnc7XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBvZiBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIGNhbGN1bGF0ZSBpbnZlcnNlIG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuaW52ZXJ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSxcbiAgICAgICAgZG90ID0gYTAqYTAgKyBhMSphMSArIGEyKmEyICsgYTMqYTMsXG4gICAgICAgIGludkRvdCA9IGRvdCA/IDEuMC9kb3QgOiAwO1xuICAgIFxuICAgIC8vIFRPRE86IFdvdWxkIGJlIGZhc3RlciB0byByZXR1cm4gWzAsMCwwLDBdIGltbWVkaWF0ZWx5IGlmIGRvdCA9PSAwXG5cbiAgICBvdXRbMF0gPSAtYTAqaW52RG90O1xuICAgIG91dFsxXSA9IC1hMSppbnZEb3Q7XG4gICAgb3V0WzJdID0gLWEyKmludkRvdDtcbiAgICBvdXRbM10gPSBhMyppbnZEb3Q7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgY29uanVnYXRlIG9mIGEgcXVhdFxuICogSWYgdGhlIHF1YXRlcm5pb24gaXMgbm9ybWFsaXplZCwgdGhpcyBmdW5jdGlvbiBpcyBmYXN0ZXIgdGhhbiBxdWF0LmludmVyc2UgYW5kIHByb2R1Y2VzIHRoZSBzYW1lIHJlc3VsdC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0IHRvIGNhbGN1bGF0ZSBjb25qdWdhdGUgb2ZcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5jb25qdWdhdGUgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQubGVuZ3RoID0gdmVjNC5sZW5ndGg7XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBxdWF0Lmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmxlbiA9IHF1YXQubGVuZ3RoO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5zcXVhcmVkTGVuZ3RoID0gdmVjNC5zcXVhcmVkTGVuZ3RoO1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc3FyTGVuID0gcXVhdC5zcXVhcmVkTGVuZ3RoO1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSBxdWF0ZXJuaW9uIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQubm9ybWFsaXplID0gdmVjNC5ub3JtYWxpemU7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHF1YXRlcm5pb24gZnJvbSB0aGUgZ2l2ZW4gM3gzIHJvdGF0aW9uIG1hdHJpeC5cbiAqXG4gKiBOT1RFOiBUaGUgcmVzdWx0YW50IHF1YXRlcm5pb24gaXMgbm90IG5vcm1hbGl6ZWQsIHNvIHlvdSBzaG91bGQgYmUgc3VyZVxuICogdG8gcmVub3JtYWxpemUgdGhlIHF1YXRlcm5pb24geW91cnNlbGYgd2hlcmUgbmVjZXNzYXJ5LlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHttYXQzfSBtIHJvdGF0aW9uIG1hdHJpeFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuZnJvbU1hdDMgPSBmdW5jdGlvbihvdXQsIG0pIHtcbiAgICAvLyBBbGdvcml0aG0gaW4gS2VuIFNob2VtYWtlJ3MgYXJ0aWNsZSBpbiAxOTg3IFNJR0dSQVBIIGNvdXJzZSBub3Rlc1xuICAgIC8vIGFydGljbGUgXCJRdWF0ZXJuaW9uIENhbGN1bHVzIGFuZCBGYXN0IEFuaW1hdGlvblwiLlxuICAgIHZhciBmVHJhY2UgPSBtWzBdICsgbVs0XSArIG1bOF07XG4gICAgdmFyIGZSb290O1xuXG4gICAgaWYgKCBmVHJhY2UgPiAwLjAgKSB7XG4gICAgICAgIC8vIHx3fCA+IDEvMiwgbWF5IGFzIHdlbGwgY2hvb3NlIHcgPiAxLzJcbiAgICAgICAgZlJvb3QgPSBNYXRoLnNxcnQoZlRyYWNlICsgMS4wKTsgIC8vIDJ3XG4gICAgICAgIG91dFszXSA9IDAuNSAqIGZSb290O1xuICAgICAgICBmUm9vdCA9IDAuNS9mUm9vdDsgIC8vIDEvKDR3KVxuICAgICAgICBvdXRbMF0gPSAobVs3XS1tWzVdKSpmUm9vdDtcbiAgICAgICAgb3V0WzFdID0gKG1bMl0tbVs2XSkqZlJvb3Q7XG4gICAgICAgIG91dFsyXSA9IChtWzNdLW1bMV0pKmZSb290O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHx3fCA8PSAxLzJcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBpZiAoIG1bNF0gPiBtWzBdIClcbiAgICAgICAgICBpID0gMTtcbiAgICAgICAgaWYgKCBtWzhdID4gbVtpKjMraV0gKVxuICAgICAgICAgIGkgPSAyO1xuICAgICAgICB2YXIgaiA9IChpKzEpJTM7XG4gICAgICAgIHZhciBrID0gKGkrMiklMztcbiAgICAgICAgXG4gICAgICAgIGZSb290ID0gTWF0aC5zcXJ0KG1baSozK2ldLW1baiozK2pdLW1bayozK2tdICsgMS4wKTtcbiAgICAgICAgb3V0W2ldID0gMC41ICogZlJvb3Q7XG4gICAgICAgIGZSb290ID0gMC41IC8gZlJvb3Q7XG4gICAgICAgIG91dFszXSA9IChtW2sqMytqXSAtIG1baiozK2tdKSAqIGZSb290O1xuICAgICAgICBvdXRbal0gPSAobVtqKjMraV0gKyBtW2kqMytqXSkgKiBmUm9vdDtcbiAgICAgICAgb3V0W2tdID0gKG1bayozK2ldICsgbVtpKjMra10pICogZlJvb3Q7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBxdWF0ZW5pb25cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG5xdWF0LnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICdxdWF0KCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBhWzNdICsgJyknO1xufTtcblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMucXVhdCA9IHF1YXQ7XG59XG47XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiAgfSkoc2hpbS5leHBvcnRzKTtcbn0pKHRoaXMpO1xuIiwiLyohIGphdmEtZGVzZXJpYWxpemVyIDE5LTA4LTIwMTUgKi9cclxuXHJcbiFmdW5jdGlvbihhKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1hKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGEpO2Vsc2V7dmFyIGI7Yj1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsYi5KYXZhRGVzZXJpYWxpemVyPWEoKX19KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIGEoYixjLGQpe2Z1bmN0aW9uIGUoZyxoKXtpZighY1tnXSl7aWYoIWJbZ10pe3ZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWgmJmkpcmV0dXJuIGkoZywhMCk7aWYoZilyZXR1cm4gZihnLCEwKTt2YXIgaj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2crXCInXCIpO3Rocm93IGouY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixqfXZhciBrPWNbZ109e2V4cG9ydHM6e319O2JbZ11bMF0uY2FsbChrLmV4cG9ydHMsZnVuY3Rpb24oYSl7dmFyIGM9YltnXVsxXVthXTtyZXR1cm4gZShjP2M6YSl9LGssay5leHBvcnRzLGEsYixjLGQpfXJldHVybiBjW2ddLmV4cG9ydHN9Zm9yKHZhciBmPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsZz0wO2c8ZC5sZW5ndGg7ZysrKWUoZFtnXSk7cmV0dXJuIGV9KHsxOltmdW5jdGlvbihhLGIsYyl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZChhKXtyZXR1cm4gYSYmYS5fX2VzTW9kdWxlP2E6e1wiZGVmYXVsdFwiOmF9fWZ1bmN0aW9uIGUoYSxiKXtpZighKGEgaW5zdGFuY2VvZiBiKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShjLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBmPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhLGIpe2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXt2YXIgZD1iW2NdO2QuZW51bWVyYWJsZT1kLmVudW1lcmFibGV8fCExLGQuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIGQmJihkLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxkLmtleSxkKX19cmV0dXJuIGZ1bmN0aW9uKGIsYyxkKXtyZXR1cm4gYyYmYShiLnByb3RvdHlwZSxjKSxkJiZhKGIsZCksYn19KCksZz1hKFwiLi9zdHJlYW0tcmVhZGVyXCIpLGg9ZChnKSxpPTQ0MjY5LGo9NSxrPTExMixsPTExMyxtPTExNCxuPTExNixvPTExNyxwPTExOSxxPTEyMCxyPTgyNTc1MzYscz1mdW5jdGlvbigpe2Z1bmN0aW9uIGEoYil7ZSh0aGlzLGEpLHRoaXMuYnVmZmVyPWIsdGhpcy5zdHJlYW09bmV3IGhbXCJkZWZhdWx0XCJdKGIpLHRoaXMucmVwcj1udWxsLHRoaXMucmVmcz1bXSx0aGlzLl9jaGVja01hZ2ljKCl9cmV0dXJuIGYoYSxbe2tleTpcIl9jaGVja01hZ2ljXCIsdmFsdWU6ZnVuY3Rpb24oKXtpZih0aGlzLnN0cmVhbS5yZWFkVWludDE2KCkhPT1pKXRocm93XCJpbnZhbGlkIG1hZ2ljIG51bWJlciFcIjtpZih0aGlzLnN0cmVhbS5yZWFkVWludDE2KCkhPT1qKXRocm93XCJpbnZhbGlkIHZlcnNpb24hXCJ9fSx7a2V5OlwiX3JlYWRDbGFzc0Rlc2NyaXB0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT1cIkJDREZJSlNaXCIsYj10aGlzLnN0cmVhbS5yZWFkVWludDgoKSxjPXt9O2lmKGIhPT1rKXtpZihiPT09bCl7dmFyIGQ9dGhpcy5zdHJlYW0ucmVhZFVpbnQzMigpLXI7cmV0dXJuIHRoaXMucmVmc1tkXX1pZihiIT09bSlyZXR1cm4gdm9pZCBjb25zb2xlLmxvZyhcIkkgZG9uJ3Qga25vdyBob3cgdG8gaGFuZGxlIHRoaXMgdHlwZSB5ZXQ6IFwiK2IpO2MubmFtZT10aGlzLnN0cmVhbS5yZWFkVXRmOFN0cmluZygpLGMudmVyc2lvbklkPVt0aGlzLnN0cmVhbS5yZWFkVWludDMyKCksdGhpcy5zdHJlYW0ucmVhZFVpbnQzMigpXSxjLmhhbmRsZT10aGlzLnJlZnMubGVuZ3RoLGMuZmxhZ3M9dGhpcy5zdHJlYW0ucmVhZFVpbnQ4KCk7Zm9yKHZhciBlPVtdLGY9dGhpcy5zdHJlYW0ucmVhZFVpbnQxNigpLGc9MDtmPmc7ZysrKXt2YXIgaD17fTtoLnR5cGU9dGhpcy5zdHJlYW0ucmVhZFVpbnQ4KCksaC5uYW1lPXRoaXMuc3RyZWFtLnJlYWRVdGY4U3RyaW5nKCksLTE9PT1hLmluZGV4T2YoU3RyaW5nLmZyb21DaGFyQ29kZShoLnR5cGUpKSYmY29uc29sZS5sb2coXCJ0aGlzIGlzIG5vdCBhIHByaW1pdGl2ZSB0eXBlOiBcIitoLnR5cGUpLGUucHVzaChoKX1yZXR1cm4gYy5maWVsZHM9ZSxjLmFubm90YXRpb249dGhpcy5zdHJlYW0ucmVhZFVpbnQ4KCksYy5hbm5vdGF0aW9uIT09cSYmY29uc29sZS5sb2coXCJJIGRvbid0IGtub3cgd2hhdCB0byBkbyB3aXRoIHRoaXM6IFwiK2MuYW5ub3RhdGlvbiksYy5zdXBlckNsYXNzPXRoaXMuX3JlYWRDbGFzc0Rlc2NyaXB0aW9uKCksdGhpcy5yZWZzLnB1c2goYyksY319fSx7a2V5OlwiX3JlYWRBcnJheVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGEsYixjPXt9LGQ9dGhpcy5fcmVhZENsYXNzRGVzY3JpcHRpb24oKTtjLmRlc2NyaXB0aW9uPWQsYy5oYW5kbGU9dGhpcy5yZWZzLmxlbmd0aCxiPXRoaXMuc3RyZWFtLnJlYWRVaW50MzIoKTt2YXIgZT1kLm5hbWU7aWYoXCJbRlwiPT09ZSljLmVsZW1lbnRzPXRoaXMuc3RyZWFtLnJlYWRGbG9hdDMyQXJyYXkoYik7ZWxzZSBpZihcIltTXCI9PT1lKWMuZWxlbWVudHM9dGhpcy5zdHJlYW0ucmVhZFVpbnQxNkFycmF5KGIpO2Vsc2UgZm9yKGMuZWxlbWVudHM9W10sYT0wO2I+YTthKyspe3ZhciBmPXRoaXMuX3JlYWRDaHVuaygpO2MuZWxlbWVudHMucHVzaChmKX1yZXR1cm4gdGhpcy5yZWZzLnB1c2goYyksY319LHtrZXk6XCJfcmVhZEJsb2NrRGF0YVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5zdHJlYW0ucmVhZFVpbnQ4KCk7cmV0dXJuIHRoaXMuc3RyZWFtLnJlYWRVaW50OEFycmF5KGEpfX0se2tleTpcIl9yZWFkQ2h1bmtcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuc3RyZWFtLnJlYWRVaW50OCgpLGI9bnVsbDtzd2l0Y2goYSl7Y2FzZSBvOmI9dGhpcy5fcmVhZEFycmF5KCk7YnJlYWs7Y2FzZSBwOmI9dGhpcy5fcmVhZEJsb2NrRGF0YSgpO2JyZWFrO2Nhc2UgbjpiPXRoaXMuc3RyZWFtLnJlYWRVdGY4U3RyaW5nKCk7YnJlYWs7ZGVmYXVsdDpjb25zb2xlLmxvZyhcInVuaGFuZGxlZCB0eXBlXCIpfXJldHVybiBifX0se2tleTpcImdldENvbnRlbnRzXCIsdmFsdWU6ZnVuY3Rpb24oKXtpZih0aGlzLnJlcHIpcmV0dXJuIHRoaXMucmVwcjtmb3IodGhpcy5yZXByPVtdO3RoaXMuc3RyZWFtLmdldFBvc2l0aW9uKCk8dGhpcy5zdHJlYW0uZ2V0TGVuZ3RoKCk7KXRoaXMucmVwci5wdXNoKHRoaXMuX3JlYWRDaHVuaygpKTtyZXR1cm4gdGhpcy5yZXByfX1dKSxhfSgpO3MuVkVSU0lPTj1cIjAuMi4wXCIsY1tcImRlZmF1bHRcIl09cyxiLmV4cG9ydHM9Y1tcImRlZmF1bHRcIl19LHtcIi4vc3RyZWFtLXJlYWRlclwiOjJ9XSwyOltmdW5jdGlvbihhLGIsYyl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZChhLGIpe2lmKCEoYSBpbnN0YW5jZW9mIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9T2JqZWN0LmRlZmluZVByb3BlcnR5KGMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEsYil7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspe3ZhciBkPWJbY107ZC5lbnVtZXJhYmxlPWQuZW51bWVyYWJsZXx8ITEsZC5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gZCYmKGQud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLGQua2V5LGQpfX1yZXR1cm4gZnVuY3Rpb24oYixjLGQpe3JldHVybiBjJiZhKGIucHJvdG90eXBlLGMpLGQmJmEoYixkKSxifX0oKSxmPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShiKXtkKHRoaXMsYSksdGhpcy5idWZmZXI9Yix0aGlzLmRhdGF2aWV3PW5ldyBEYXRhVmlldyhiKSx0aGlzLmN1cnJlbnRPZmZzZXQ9MH1yZXR1cm4gZShhLFt7a2V5OlwiZ2V0TGVuZ3RoXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kYXRhdmlldy5ieXRlTGVuZ3RofX0se2tleTpcImdldFBvc2l0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jdXJyZW50T2Zmc2V0fX0se2tleTpcInJlYWRVaW50MzJcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZGF0YXZpZXcuZ2V0VWludDMyKHRoaXMuY3VycmVudE9mZnNldCk7cmV0dXJuIHRoaXMuY3VycmVudE9mZnNldCs9NCxhfX0se2tleTpcInJlYWRVaW50MTZcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZGF0YXZpZXcuZ2V0VWludDE2KHRoaXMuY3VycmVudE9mZnNldCk7cmV0dXJuIHRoaXMuY3VycmVudE9mZnNldCs9MixhfX0se2tleTpcInJlYWRVaW50OFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kYXRhdmlldy5nZXRVaW50OCh0aGlzLmN1cnJlbnRPZmZzZXQpO3JldHVybiB0aGlzLmN1cnJlbnRPZmZzZXQrKyxhfX0se2tleTpcInJlYWRJbnQzMlwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kYXRhdmlldy5nZXRJbnQzMih0aGlzLmN1cnJlbnRPZmZzZXQpO3JldHVybiB0aGlzLmN1cnJlbnRPZmZzZXQrPTQsYX19LHtrZXk6XCJyZWFkSW50MTZcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZGF0YXZpZXcuZ2V0SW50MTYodGhpcy5jdXJyZW50T2Zmc2V0KTtyZXR1cm4gdGhpcy5jdXJyZW50T2Zmc2V0Kz0yLGF9fSx7a2V5OlwicmVhZEludDhcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZGF0YXZpZXcuZ2V0SW50OCh0aGlzLmN1cnJlbnRPZmZzZXQpO3JldHVybiB0aGlzLmN1cnJlbnRPZmZzZXQrKyxhfX0se2tleTpcInJlYWRGbG9hdDMyXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmRhdGF2aWV3LmdldEZsb2F0MzIodGhpcy5jdXJyZW50T2Zmc2V0KTtyZXR1cm4gdGhpcy5jdXJyZW50T2Zmc2V0Kz00LGF9fSx7a2V5OlwicmVhZFV0ZjhTdHJpbmdcIix2YWx1ZTpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLnJlYWRVaW50MTYoKSxiPVwiXCIsYz0wO2E+YztjKyspYis9U3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLnJlYWRVaW50OCgpKTtyZXR1cm4gYn19LHtrZXk6XCJyZWFkRmxvYXQzMkFycmF5XCIsdmFsdWU6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPW5ldyBGbG9hdDMyQXJyYXkoYSksYz0wO2E+YztjKyspYltjXT10aGlzLnJlYWRGbG9hdDMyKCk7cmV0dXJuIGJ9fSx7a2V5OlwicmVhZFVpbnQxNkFycmF5XCIsdmFsdWU6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPW5ldyBVaW50MTZBcnJheShhKSxjPTA7YT5jO2MrKyliW2NdPXRoaXMucmVhZFVpbnQxNigpO3JldHVybiBifX0se2tleTpcInJlYWRVaW50OEFycmF5XCIsdmFsdWU6ZnVuY3Rpb24oYSl7dmFyIGI9bmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIsdGhpcy5jdXJyZW50T2Zmc2V0LGEpO3JldHVybiB0aGlzLmN1cnJlbnRPZmZzZXQrPWEsYn19XSksYX0oKTtjW1wiZGVmYXVsdFwiXT1mLGIuZXhwb3J0cz1jW1wiZGVmYXVsdFwiXX0se31dfSx7fSxbMV0pKDEpfSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWphdmEtZGVzZXJpYWxpemVyLm1pbi5qcy5tYXAiLCIvKiEgbGlidGdhIDEzLTA4LTIwMTUgKi9cclxuXHJcbiFmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW1wiZXhwb3J0c1wiLFwibW9kdWxlXCJdLGIpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpYihleHBvcnRzLG1vZHVsZSk7ZWxzZXt2YXIgYz17ZXhwb3J0czp7fX07YihjLmV4cG9ydHMsYyksYS5saWJ0Z2E9Yy5leHBvcnRzfX0odGhpcyxmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGMoYSxiKXtpZighKGEgaW5zdGFuY2VvZiBiKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfXZhciBkPTE4LGU9MCxmPTEsZz0yLGg9MyxpPTgsaj0xNSxrPTQ4LGw9MTkyLG09MixuPTEsbz0yLHA9MSxxPWZ1bmN0aW9uIHMoYSl7Yyh0aGlzLHMpLHRoaXMuZGF0YXZpZXc9bmV3IERhdGFWaWV3KGEpLHRoaXMuaGVhZGVyPXMucmVhZEhlYWRlcih0aGlzLmRhdGF2aWV3KSx0aGlzLndpZHRoPXRoaXMuaGVhZGVyLmltYWdlU3BlYy53aWR0aCx0aGlzLmhlaWdodD10aGlzLmhlYWRlci5pbWFnZVNwZWMuaGVpZ2h0LHRoaXMuY29tcHJlc3NlZD0hISh0aGlzLmhlYWRlci5pbWFnZVR5cGUmaSksdGhpcy5pbWFnZUlkPXMucmVhZEltYWdlSWQodGhpcy5kYXRhdmlldyx0aGlzLmhlYWRlciksdGhpcy5jb2xvck1hcD1zLnJlYWRDb2xvck1hcCh0aGlzLmRhdGF2aWV3LHRoaXMuaGVhZGVyKSx0aGlzLmltYWdlRGF0YT1zLnJlYWRJbWFnZSh0aGlzKX07cS5IRUFERVJfU0laRT1kLHEuSU1BR0VfVFlQRV9OT05FPWUscS5JTUFHRV9UWVBFX0NPTE9STUFQUEVEPWYscS5JTUFHRV9UWVBFX1RSVUVDT0xPUj1nLHEuSU1BR0VfVFlQRV9HUkVZU0NBTEU9aCxxLklNQUdFX1JVTkxFTkdUSF9FTkNPREVEPWkscS5yZWFkSGVhZGVyPWZ1bmN0aW9uKGEpe3ZhciBiPXtpZExlbmd0aDphLmdldFVpbnQ4KDAsITApLG1hcFR5cGU6YS5nZXRVaW50OCgxLCEwKSxpbWFnZVR5cGU6YS5nZXRVaW50OCgyLCEwKSxjb2xvck1hcFNwZWM6cS5yZWFkQ29sb3JNYXBTcGVjKGEsMyksaW1hZ2VTcGVjOnEucmVhZEltYWdlU3BlYyhhLDgpfTtyZXR1cm4gYn0scS5yZWFkQ29sb3JNYXBTcGVjPWZ1bmN0aW9uKGEsYil7dmFyIGM9YS5nZXRVaW50OChiKzQsITApLGQ9e2ZpcnN0RW50cnk6YS5nZXRVaW50MTYoYiwhMCksbGVuZ3RoOmEuZ2V0VWludDE2KGIrMiwhMCksZW50cnlTaXplQml0czpjLGVudHJ5U2l6ZUJ5dGVzOk1hdGguZmxvb3IoKGMrNykvOCl9O3JldHVybiBkfSxxLnJlYWRJbWFnZVNwZWM9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLmdldFVpbnQ4KGIrOSksZD17eE9yaWdpbjphLmdldFVpbnQxNihiLCEwKSx5T3JpZ2luOmEuZ2V0VWludDE2KGIrMiwhMCksd2lkdGg6YS5nZXRVaW50MTYoYis0LCEwKSxoZWlnaHQ6YS5nZXRVaW50MTYoYis2LCEwKSxwaXhlbERlcHRoOmEuZ2V0VWludDgoYis4KSxkZXNjcmlwdG9yOmMsYXR0cmlidXRlQml0czpjJmosb3JpZ2luOihjJmspPj40LGludGVybGVhdmU6KGMmbCk+PjZ9O3JldHVybiBkfSxxLnJlYWRJbWFnZUlkPWZ1bmN0aW9uKGEsYil7cmV0dXJuIG5ldyBVaW50OEFycmF5KGEuYnVmZmVyLGQsYi5pZExlbmd0aCl9LHEucmVhZENvbG9yTWFwPWZ1bmN0aW9uKGEsYil7aWYoYi5jb2xvck1hcFNwZWMubGVuZ3RoPD0wKXJldHVybiBudWxsO3ZhciBjPW5ldyBVaW50OENsYW1wZWRBcnJheSg0KmIuY29sb3JNYXBTcGVjLmxlbmd0aCksZT1udWxsLGY9ZCtiLmlkTGVuZ3RoO3N3aXRjaChiLmNvbG9yTWFwU3BlYy5lbnRyeVNpemVCaXRzKXtjYXNlIDg6ZT1xLnJlYWRQaXhlbDg7YnJlYWs7Y2FzZSAxNjplPXEucmVhZFBpeGVsMTU7YnJlYWs7Y2FzZSAxNTplPXEucmVhZFBpeGVsMTY7YnJlYWs7Y2FzZSAyNDplPXEucmVhZFBpeGVsMjQ7YnJlYWs7Y2FzZSAzMjplPXEucmVhZFBpeGVsMzI7YnJlYWs7ZGVmYXVsdDp0aHJvd1wiVW5zdXBwb3J0ZWQgcGl4ZWwgZGVwdGhcIn1mb3IodmFyIGc9MDtnPGIuY29sb3JNYXBTcGVjLmxlbmd0aDtnKyspZShhLGYsZyxjLGcpO3JldHVybiBjfSxxLnJlYWRQaXhlbDg9ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1hLmdldFVpbnQ4KGIrYyk7ZFs0KmUrMl09ZixkWzQqZSsxXT1mLGRbNCplKzBdPWYsZFs0KmUrM109MjU1fSxxLnJlYWRQaXhlbDE1PWZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9YS5nZXRVaW50MTYoYisyKmMsITApO2RbNCplKzJdPSgzMSZmKTw8MyxkWzQqZSsxXT0oZj4+NSYzMSk8PDMsZFs0KmUrMF09KGY+PjEwJjMxKTw8MyxkWzQqZSszXT0yNTV9LHEucmVhZFBpeGVsMTY9ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1hLmdldFVpbnQxNihiKzIqYywhMCk7ZFs0KmUrMl09KDMxJmYpPDwzLGRbNCplKzFdPShmPj41JjMxKTw8MyxkWzQqZSswXT0oZj4+MTAmMzEpPDwzLGRbNCplKzNdPTEyOD09KDEyOCZmKT8yNTU6MH0scS5yZWFkUGl4ZWwyND1mdW5jdGlvbihhLGIsYyxkLGUpe2RbNCplKzJdPWEuZ2V0VWludDgoYiszKmMrMCksZFs0KmUrMV09YS5nZXRVaW50OChiKzMqYysxKSxkWzQqZSswXT1hLmdldFVpbnQ4KGIrMypjKzIpLGRbNCplKzNdPTI1NX0scS5yZWFkUGl4ZWwzMj1mdW5jdGlvbihhLGIsYyxkLGUpe2RbNCplKzJdPWEuZ2V0VWludDgoYis0KmMrMCksZFs0KmUrMV09YS5nZXRVaW50OChiKzQqYysxKSxkWzQqZSswXT1hLmdldFVpbnQ4KGIrNCpjKzIpLGRbNCplKzNdPTI1NX0scS5yZWFkTWFwcGVkUGl4ZWw4PWZ1bmN0aW9uKGEsYixjLGQsZSxmLGcpe3ZhciBoPWEuZ2V0VWludDgoZCtlKStjO2ZbNCpnKzBdPWJbNCpoKzBdLGZbNCpnKzFdPWJbNCpoKzFdLGZbNCpnKzJdPWJbNCpoKzJdLGZbNCpnKzNdPWJbNCpoKzNdfSxxLnJlYWRNYXBwZWRQaXhlbDE1PWZ1bmN0aW9uKGEsYixjLGQsZSxmLGcpe3ZhciBoPWEuZ2V0VWludDE2KGQrMiplLCEwKStjO2ZbNCpnKzBdPWJbNCpoKzBdLGZbNCpnKzFdPWJbNCpoKzFdLGZbNCpnKzJdPWJbNCpoKzJdLGZbNCpnKzNdPWJbNCpoKzNdfSxxLnJlYWRNYXBwZWRQaXhlbDE2PWZ1bmN0aW9uKGEsYixjLGQsZSxmLGcpe3ZhciBoPWEuZ2V0VWludDE2KGQrMiplLCEwKStjO2ZbNCpnKzBdPWJbNCpoKzBdLGZbNCpnKzFdPWJbNCpoKzFdLGZbNCpnKzJdPWJbNCpoKzJdLGZbNCpnKzNdPWJbNCpoKzNdfSxxLnJlYWRNYXBwZWRQaXhlbDI0PWZ1bmN0aW9uKGEsYixjLGQsZSxmLGcpe3ZhciBoPWEuZ2V0VWludDE2KGQrMiplLCEwKStjO2ZbNCpnKzBdPWJbNCpoKzBdLGZbNCpnKzFdPWJbNCpoKzFdLGZbNCpnKzJdPWJbNCpoKzJdLGZbNCpnKzNdPWJbNCpoKzNdfSxxLnJlYWRNYXBwZWRQaXhlbDMyPWZ1bmN0aW9uKGEsYixjLGQsZSxmLGcpe3ZhciBoPWEuZ2V0VWludDE2KGQrMiplLCEwKStjO2ZbNCpnKzBdPWJbNCpoKzBdLGZbNCpnKzFdPWJbNCpoKzFdLGZbNCpnKzJdPWJbNCpoKzJdLGZbNCpnKzNdPWJbNCpoKzNdfSxxLnJlYWRSTEVJbWFnZT1mdW5jdGlvbigpe3Rocm93XCJOWUlcIn0scS5yZWFkQ29sb3JtYXBwZWRJbWFnZT1mdW5jdGlvbihhKXt2YXIgYj1hLmRhdGF2aWV3LGM9YS5oZWFkZXIsZT1hLmNvbG9yTWFwLGY9Yy5pbWFnZVNwZWMud2lkdGgsZz1jLmltYWdlU3BlYy5oZWlnaHQsaD1uZXcgVWludDhDbGFtcGVkQXJyYXkoZipnKjQpLGk9Yy5pbWFnZVNwZWMucGl4ZWxEZXB0aCxqPWQrYy5pZExlbmd0aCtjLmNvbG9yTWFwU3BlYy5sZW5ndGgqYy5jb2xvck1hcFNwZWMuZW50cnlTaXplQnl0ZXMsaz1jLmNvbG9yTWFwU3BlYy5maXJzdEVudHJ5LGw9bnVsbCxyPShjLmltYWdlU3BlYy5vcmlnaW4mbSk9PT1vPzE6LTEscz0oYy5pbWFnZVNwZWMub3JpZ2luJm4pPT09cD8tMToxO2lmKCFlKXRocm93XCJJbWFnZSBpcyBkZXNjcmliZWQgYXMgY29sb3ItbWFwcGVkLCBidXQgaGFzIG5vIG1hcFwiO3N3aXRjaChpKXtjYXNlIDg6bD1xLnJlYWRNYXBwZWRQaXhlbDg7YnJlYWs7Y2FzZSAxNjpsPXEucmVhZE1hcHBlZFBpeGVsMTU7YnJlYWs7Y2FzZSAxNTpsPXEucmVhZE1hcHBlZFBpeGVsMTY7YnJlYWs7Y2FzZSAyNDpsPXEucmVhZE1hcHBlZFBpeGVsMjQ7YnJlYWs7Y2FzZSAzMjpsPXEucmVhZE1hcHBlZFBpeGVsMzI7YnJlYWs7ZGVmYXVsdDp0aHJvd1wiVW5zdXBwb3J0ZWQgcGl4ZWwgZGVwdGhcIn12YXIgdCx1LHYsdztyPjA/KHQ9MCx1PWcpOih0PWctMSx1PS0xKSxzPjA/KHY9MCx3PWYpOih2PWYtMSx3PS0xKTtmb3IodmFyIHgseT0wLHo9dDt6IT11O3orPXIpe3g9MDtmb3IodmFyIEE9djtBIT13O0ErPXMpbChiLGUsayxqLHoqZitBLGgseSpmK3grKyk7eSsrfXJldHVybiBofSxxLnJlYWRUcnVlY29sb3JJbWFnZT1mdW5jdGlvbihhKXt2YXIgYj1hLmhlYWRlcixjPWEuZGF0YXZpZXcsZT1iLmltYWdlU3BlYy53aWR0aCxmPWIuaW1hZ2VTcGVjLmhlaWdodCxnPW5ldyBVaW50OENsYW1wZWRBcnJheShlKmYqNCksaD1iLmltYWdlU3BlYy5waXhlbERlcHRoLGk9ZCtiLmlkTGVuZ3RoK2IuY29sb3JNYXBTcGVjLmxlbmd0aCpiLmNvbG9yTWFwU3BlYy5lbnRyeVNpemVCeXRlcyxqPW51bGwsaz0oYi5pbWFnZVNwZWMub3JpZ2luJm0pPT09bz8xOi0xLGw9KGIuaW1hZ2VTcGVjLm9yaWdpbiZuKT09PXA/LTE6MTtzd2l0Y2goaCl7Y2FzZSA4Omo9cS5yZWFkUGl4ZWw4O2JyZWFrO2Nhc2UgMTY6aj1xLnJlYWRQaXhlbDE1O2JyZWFrO2Nhc2UgMTU6aj1xLnJlYWRQaXhlbDE2O2JyZWFrO2Nhc2UgMjQ6aj1xLnJlYWRQaXhlbDI0O2JyZWFrO2Nhc2UgMzI6aj1xLnJlYWRQaXhlbDMyO2JyZWFrO2RlZmF1bHQ6dGhyb3dcIlVuc3VwcG9ydGVkIHBpeGVsIGRlcHRoXCJ9dmFyIHIscyx0LHU7az4wPyhyPTAscz1mKToocj1mLTEscz0tMSksbD4wPyh0PTAsdT1lKToodD1lLTEsdT0tMSk7Zm9yKHZhciB2LHc9MCx4PXI7eCE9czt4Kz1rKXt2PTA7Zm9yKHZhciB5PXQ7eSE9dTt5Kz1sKWooYyxpLHgqZSt5LGcsdyplK3YrKyk7dysrfXJldHVybiBnfSxxLnJlYWRJbWFnZT1mdW5jdGlvbihhKXtpZihhLmhlYWRlci5jb21wcmVzc2VkKXJldHVybiBxLnJlYWRSTEVJbWFnZShhKTtpZigwPT09YS5oZWFkZXIubWFwVHlwZSlyZXR1cm4gcS5yZWFkVHJ1ZWNvbG9ySW1hZ2UoYSk7aWYoMT09PWEuaGVhZGVyLm1hcFR5cGUpcmV0dXJuIHEucmVhZENvbG9ybWFwcGVkSW1hZ2UoYSk7dGhyb3dcIlVuc3VwcG9ydGVkIG1hcCB0eXBlXCJ9O3ZhciByPXtyZWFkRmlsZTpmdW5jdGlvbihhKXtyZXR1cm4gbmV3IHEoYSl9LGxvYWRGaWxlOmZ1bmN0aW9uKGEsYil7dmFyIGM9bmV3IFhNTEh0dHBSZXF1ZXN0O2Mub3BlbihcIkdFVFwiLGEpLGMucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIixjLm9ubG9hZD1mdW5jdGlvbigpe2IobnVsbCxuZXcgcSh0aGlzLnJlc3BvbnNlKSl9LGMub25lcnJvcj1mdW5jdGlvbihhKXtiKGEsbnVsbCl9LGMuc2VuZCgpfSxUR0E6cSxWRVJTSU9OOlwiMC4zLjFcIn07Yi5leHBvcnRzPXJ9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlidGdhLm1pbi5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5leHBvcnRzLmxvYWRSZXNvdXJjZSA9IGxvYWRSZXNvdXJjZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9saWJ0Z2EgPSByZXF1aXJlKCdsaWJ0Z2EnKTtcblxudmFyIF9saWJ0Z2EyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGlidGdhKTtcblxuLyoqXHJcbiAqIExvYWRzIGEgcmVzb3VyY2UgdmlhIHhociBvciBJbWFnZVxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgdXJsICAgICAgaHJlZiBvZiB0aGUgcmVzb3VyY2UgdG8gZmV0Y2hcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIHR5cGUgICAgIE9uZSBvZiBYSE1MSHR0cFJlcXVlc3QncyBzdXBwb3J0ZWQgcmVzcG9uc2VUeXBlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgKGFycmF5YnVmZmVyLCBibG9iLCBkb2N1bWVudCwganNvbiwgdGV4dClcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yICdpbWFnZScgb3IgJ2ltYWdlLmNvJyAoZm9yIGEgY3Jvc3Mtb3JpZ2luIGltYWdlKVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gZXhlY3V0ZSBvbiBzdWNjZXNzIG9yIGZhaWx1cmUuICBUYWtlc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyLCB2YWx1ZSBhcyBwYXJhbWV0ZXJzLiAgVmFsdWUgd2lsbCBiZSBudWxsIGlmIGVyclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgbm90IG51bGxcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXG5cbmZ1bmN0aW9uIGxvYWRSZXNvdXJjZSh1cmwsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlID09PSAnaW1hZ2UnIHx8IHR5cGUgPT09ICdpbWFnZS5jbycpIHtcbiAgICBpZiAoL1xcLnRnYSQvLnRlc3QodXJsKSkge1xuICAgICAgX2xpYnRnYTJbJ2RlZmF1bHQnXS5sb2FkRmlsZSh1cmwsIGZ1bmN0aW9uIChlcnIsIHRnYSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyLCBudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gY29udGV4dC5jcmVhdGVJbWFnZURhdGEodGdhLndpZHRoLCB0Z2EuaGVpZ2h0KTtcbiAgICAgICAgaW1hZ2VEYXRhLmRhdGEuc2V0KHRnYS5pbWFnZURhdGEpO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGdhLmhlaWdodDtcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGdhLndpZHRoO1xuICAgICAgICBjb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBjYWxsYmFjayhlLCBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpID0gbmV3IEltYWdlKCk7XG4gICAgICAvLyBjcm9zcy1vcmlnaW4gaW1hZ2U6XG4gICAgICBpZiAodHlwZSA9PT0gJ2ltYWdlLmNvJykge1xuICAgICAgICBpLmNyb3NzT3JpZ2luID0gJ2Fub3ltb3VzJztcbiAgICAgIH1cbiAgICAgIGkub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhudWxsLCB0aGlzKTtcbiAgICAgIH07XG4gICAgICBpLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjYWxsYmFjayhlLCBudWxsKTtcbiAgICAgIH07XG4gICAgICBpLnNyYyA9IHVybDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0eXBlO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxsYmFjayhudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICB9O1xuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNhbGxiYWNrKGUsIG51bGwpO1xuICAgIH07XG5cbiAgICB4aHIuc2VuZCgpO1xuICB9XG59XG5cbi8qKlxyXG4gKiBBbiBBc3NldExvYWRlciBtYW5hZ2VzIGxvYWRpbmcgb25lIG9yIG1vcmUgYXNzZXRzLiAgSXQgaGFuZGxlcyBkZWJvdW5jaW5nIG9mXHJcbiAqIG9mIG11bHRpcGxlIHJlcXVlc3RzIGZvciB0aGUgc2FtZSBhc3NldCwgZXRjLlxyXG4gKi9cblxudmFyIEFzc2V0TG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcclxuICAgKiBOb29wLlxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEFzc2V0TG9hZGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBc3NldExvYWRlcik7XG5cbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICB0aGlzLl9hc3NldHMgPSB7fTtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIExvYWRzIGEgc2luZ2xlIGFzc2V0LlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGFzc2V0IGlzIGFscmVhZHkgbG9hZGVkLCB0aGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgaW52b2tlZC5cclxuICAgKiBAc2VlIGxvYWRSZXNvdXJjZVxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhBc3NldExvYWRlciwgW3tcbiAgICBrZXk6ICdsb2FkQXNzZXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkQXNzZXQodXJsLCB0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIG5hbWUgPSAnXycgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICAgIGlmICh0aGlzLl9hc3NldHNbbmFtZV0pIHtcbiAgICAgICAgLy8gVE9ETzogYm91bmNlIHRoaXMgb3V0IG9mIHRoZSBjdXJyZW50IGV4ZWN1dGlvblxuICAgICAgICBjYWxsYmFjayhudWxsLCB0aGlzLl9hc3NldHNbbmFtZV0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9jYWxsYmFja3NbbmFtZV0gPSB0aGlzLl9jYWxsYmFja3NbbmFtZV0gfHwgW107XG4gICAgICB0aGlzLl9jYWxsYmFja3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICBpZiAoIXRoaXMuX2Fzc2V0cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB0aGlzLl9hc3NldHNbbmFtZV0gPSBmYWxzZTtcbiAgICAgICAgbG9hZFJlc291cmNlKHVybCwgdHlwZSwgZnVuY3Rpb24gKGVyciwgdmFsdWUpIHtcbiAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgX3RoaXMuX2Fzc2V0c1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2I7XG4gICAgICAgICAgd2hpbGUgKGNiID0gX3RoaXMuX2NhbGxiYWNrc1tuYW1lXS5zaGlmdCgpKSB7XG4gICAgICAgICAgICBjYihlcnIsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogTG9hZCBhIHNldCBvZiBhc3NldHMgaW4gcGFyYWxsZWxcclxuICAgICAqIEBwYXJhbSAge0FycmF5fSAgIHVybHMgICAgICBBcnJheSBvZiB1cmxzIG9mIHJlc291cmNlc1xyXG4gICAgICogQHBhcmFtICB7QXJyYXl9ICAgdHlwZXMgICAgIEFycmF5IG9mIHR5cGVzIG9mIHJlc291cmNlc1xyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCByZXNvdXJjZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqIEBzZWUgIGxvYWRSZXNvdXJjZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdsb2FkQXNzZXRHcm91cCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRBc3NldEdyb3VwKHVybHMsIHR5cGVzLCBjYWxsYmFjaykge1xuICAgICAgaWYgKHVybHMubGVuZ3RoICE9PSB0eXBlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB0eXBlczogdHlwZXMubGVuZ3RoID0gJyArIHR5cGVzLmxlbmd0aCArICc7IHVybHMubGVuZ3RoID0gJyArIHVybHMubGVuZ3RoO1xuICAgICAgfVxuICAgICAgdmFyIGxlbiA9IHVybHMubGVuZ3RoLFxuICAgICAgICAgIHJlc3VsdHMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgIHZhciBvbkVhY2ggPSBmdW5jdGlvbiBvbkVhY2goaWR4LCBlcnIsIHZhbHVlKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRzW2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICByID0gdHJ1ZTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgciA9IHIgJiYgcmVzdWx0c1tpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocikge1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMubG9hZEFzc2V0KHVybHNbaV0sIHR5cGVzW2ldLCBvbkVhY2guYmluZCh1bmRlZmluZWQsIGkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIERpcmVjdGx5IHJldHJpZXZlIGFuIGFzc2V0IGZyb20gdGhlIGNhY2hlXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgVGhlIGNhY2hlIGtleVxyXG4gICAgICogQHJldHVybiB7bWl4ZWR9ICAgICAgIFRoZSBjYWNoZWQgYXNzZXQsIGlmIGl0IGV4aXN0cy5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZ2V0QXNzZXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBc3NldChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXNzZXRzW25hbWVdO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBc3NldExvYWRlcjtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFzc2V0TG9hZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJvdW5kID0gcmVxdWlyZSgnLi9nbC1ib3VuZCcpO1xuXG52YXIgX2dsQm91bmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCb3VuZCk7XG5cbnZhciBfYXNzZXRMb2FkZXIgPSByZXF1aXJlKCcuL2Fzc2V0LWxvYWRlcicpO1xuXG52YXIgX2Fzc2V0TG9hZGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2V0TG9hZGVyKTtcblxudmFyIF9tZXNoRmlsZSA9IHJlcXVpcmUoJy4vbWVzaC9maWxlJyk7XG5cbnZhciBfbWVzaEZpbGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaEZpbGUpO1xuXG52YXIgX3RleHR1cmUgPSByZXF1aXJlKCcuL3RleHR1cmUnKTtcblxudmFyIF90ZXh0dXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmUpO1xuXG52YXIgX3Byb2dyYW0gPSByZXF1aXJlKCcuL3Byb2dyYW0nKTtcblxudmFyIF9wcm9ncmFtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb2dyYW0pO1xuXG52YXIgX3Byb2dyYW1HbG93cmFtcCA9IHJlcXVpcmUoJy4vcHJvZ3JhbS9nbG93cmFtcCcpO1xuXG52YXIgX3Byb2dyYW1HbG93cmFtcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtR2xvd3JhbXApO1xuXG52YXIgX3Byb2dyYW1PcGFxdWUgPSByZXF1aXJlKCcuL3Byb2dyYW0vb3BhcXVlJyk7XG5cbnZhciBfcHJvZ3JhbU9wYXF1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtT3BhcXVlKTtcblxudmFyIF9wcm9ncmFtcyA9IHtcbiAgJ0dsb3dyYW1wJzogX3Byb2dyYW1HbG93cmFtcDJbJ2RlZmF1bHQnXSxcbiAgJ09wYXF1ZSc6IF9wcm9ncmFtT3BhcXVlMlsnZGVmYXVsdCddXG59O1xuXG5mdW5jdGlvbiBhcmVMb2FkaW5nKG4sIGUpIHtcbiAgaWYgKGUgPT09IDApIHtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGFyZUxvYWRlZChuLCBlKSB7XG4gIGlmIChlID4gMCkge1xuICAgIG4rKztcbiAgfVxuICByZXR1cm4gbjtcbn1cblxuZnVuY3Rpb24gYXJlRXJyb3IobiwgZSkge1xuICBpZiAoZSA8IDApIHtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIHNpbXBsZU1lcmdlKGxlZnQsIHJpZ2h0KSB7XG4gIGxlZnQgPSBsZWZ0IHx8IHt9O1xuICBmb3IgKHZhciBpIGluIHJpZ2h0KSB7XG4gICAgbGVmdFtpXSA9IHJpZ2h0W2ldO1xuICB9XG4gIHJldHVybiBsZWZ0O1xufVxuXG5mdW5jdGlvbiBtZXJnZU1hbmlmZXN0cyhiYXNlLCBhZGQpIHtcbiAgdmFyIGtleXMgPSBbJ3RleHR1cmUnLCAnbWVzaCcsICdwcm9ncmFtJywgJ3Jhd1Byb2dyYW0nXTtcbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5IGluIGFkZCkge1xuICAgICAgYmFzZVtrZXldID0gc2ltcGxlTWVyZ2UoYmFzZVtrZXldLCBhZGRba2V5XSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGJhc2U7XG59XG5cbi8qKlxyXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGdldCBzb21lIGluZm8gb24gbG9hZGluZyBzdGF0ZXMuXHJcbiAqIEBwYXJhbSAge0FycmF5fSBxdWV1ZSAgTGlzdCBvZiBzdGF0dXMgY29kZXMsIG9uZSBwZXIgcmVxdWVzdFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIFNob3J0IHN1bW1hcnkgb2YgdGhlIHN0YXRlIG9mIHRoZSBxdWV1ZS5cclxuICovXG5mdW5jdGlvbiBzdW1tYXJpemUocXVldWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3RhbDogcXVldWUubGVuZ3RoLFxuICAgIGxvYWRpbmc6IHF1ZXVlLnJlZHVjZShhcmVMb2FkaW5nLCAwKSxcbiAgICBsb2FkZWQ6IHF1ZXVlLnJlZHVjZShhcmVMb2FkZWQsIDApLFxuICAgIGVycm9yOiBxdWV1ZS5yZWR1Y2UoYXJlRXJyb3IsIDApXG4gIH07XG59XG5cbi8qKlxyXG4gKiBBbiBBc3NldE1hbmFnZXIgbWFuYWdlcyBhbGwgdGhlIHZhcmlvdXMgdHlwZXMgb2YgYXNzZXRzIHRoYXQgbmVlZCB0byBiZSBib3VuZCB0b1xyXG4gKiB0byBhIGdsIGNvbnRleHQuICBJdCB1c2VzIGFuIEFzc2V0TG9hZGVyIHRvIGhhbmRsZSB0aGUgbG9hZGluZyBhbmQgY2FjaGluZyBvZiB0aGVcclxuICogYXNzZXQgc291cmNlcywgYW5kIGFsc28gbWFpbnRhaW5zIGEgcGFyYWxsZWwgY2FjaGUgb2YgdGhlIGJvdW5kIHJlc291cmNlcy5cclxuICovXG5cbnZhciBBc3NldE1hbmFnZXIgPSAoZnVuY3Rpb24gKF9HTEJvdW5kKSB7XG4gIF9pbmhlcml0cyhBc3NldE1hbmFnZXIsIF9HTEJvdW5kKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGFuIGFzc2V0IGxvYWRlci5cclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgICAgIEEgM2QgY29udGV4dCBmcm9tIGEgY2FudmFzXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBtYW5pZmVzdCBBIG1hcHBpbmcgb2Yga2V5OnZhbHVlIHBhaXJzIGZvciB0aGUgZm9sbG93aW5nIHR5cGVzOlxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZSwgbWVzaCwgcHJvZ3JhbSwgcmF3UHJvZ3JhbVxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEFzc2V0TWFuYWdlcihnbCwgbWFuaWZlc3QpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXNzZXRNYW5hZ2VyKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFzc2V0TWFuYWdlci5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsKTtcbiAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgX2Fzc2V0TG9hZGVyMlsnZGVmYXVsdCddKCk7XG4gICAgdGhpcy50ZXh0dXJlcyA9IHt9O1xuICAgIHRoaXMubWVzaGVzID0ge307XG4gICAgdGhpcy5wcm9ncmFtcyA9IHt9O1xuICAgIHRoaXMucXVldWVzID0ge1xuICAgICAgdGV4dHVyZTogW10sXG4gICAgICBtZXNoOiBbXSxcbiAgICAgIHByb2dyYW06IFtdXG4gICAgfTtcbiAgICB0aGlzLnN0YXRzID0ge1xuICAgICAgdGV4dHVyZToge30sXG4gICAgICBtZXNoOiB7fSxcbiAgICAgIHByb2dyYW06IHt9LFxuICAgICAgcmF3UHJvZ3JhbToge31cbiAgICB9O1xuICAgIHRoaXMuY29tcGxldGUgPSBudWxsO1xuICAgIHRoaXMucGF0aCA9ICcvYXNzZXRzLyc7XG4gIH1cblxuICAvKipcclxuICAgKiBNZXJnZXMgaW4gYW5vdGhlciBtYW5pZmVzdCB0byB0aGUgZXhpc3RpbmcgYXNzZXQgbWFuaWZlc3RcclxuICAgKlxyXG4gICAqIEFkZGl0aW9uYWwgbWFuaWZlc3RzIHNob3VsZCBiZSBtZXJnZWQgaW4gYmVmb3JlIGxvYWRpbmcuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG1hbmlmZXN0IEBzZWUgY29uc3RydWN0b3JcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoQXNzZXRNYW5hZ2VyLCBbe1xuICAgIGtleTogJ2FkZEFzc2V0cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEFzc2V0cyhtYW5pZmVzdCkge1xuICAgICAgdGhpcy5tYW5pZmVzdCA9IG1lcmdlTWFuaWZlc3RzKHRoaXMubWFuaWZlc3QsIG1hbmlmZXN0KTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBib3VuZCB0ZXh0dXJlIHRvIHRoZSB0ZXh0dXJlIGNhY2hlLCB1bmRlciBhIGdpdmVuIGludGVybmFsIG5hbWVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAgICBUZXh0dXJlIGludGVybmFsIG5hbWVcclxuICAgICAqIEBwYXJhbSB7VGV4dHVyZX0gdGV4dHVyZSBBIGJvdW5kIFRleHR1cmVcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnYWRkVGV4dHVyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFRleHR1cmUobmFtZSwgdGV4dHVyZSkge1xuICAgICAgdGhpcy50ZXh0dXJlc1tuYW1lXSA9IHRleHR1cmU7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgYm91bmQgbWVzaCB0byB0aGUgbWVzaCBjYWNoZSwgdW5kZXIgYSBnaXZlbiBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBNZXNoIGludGVybmFsIG5hbWVcclxuICAgICAqIEBwYXJhbSB7TWVzaH0gbWVzaCAgIEEgYm91bmQgbWVzaFxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRNZXNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkTWVzaChuYW1lLCBtZXNoKSB7XG4gICAgICB0aGlzLm1lc2hlc1tuYW1lXSA9IG1lc2g7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgYm91bmQgcHJvZ3JhbSB0byB0aGUgcHJvZ3JhbSBjYWNoZSwgdW5kZXIgYSBnaXZlbiBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgICAgUHJvZ3JhbSBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge1Byb2dyYW19IHByb2dyYW0gQSBib3VuZCBQcm9ncmFtXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2FkZFByb2dyYW0nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRQcm9ncmFtKG5hbWUsIHByb2dyYW0pIHtcbiAgICAgIHRoaXMucHJvZ3JhbXNbbmFtZV0gPSBwcm9ncmFtO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIGJvdW5kIHRleHR1cmUgZGlyZWN0bHkgZnJvbSB0aGUgY2FjaGUuXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgVGV4dHVyZSBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHtUZXh0dXJlfSAgICAgVGhlIGJvdW5kIHRleHR1cmUsIG9yIHVuZGVmaW5lZCBpZiBpdCBkb2VzIG5vdFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIGV4aXN0IG9yIGlzIG5vdCB5ZXQgbG9hZGVkLlxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRUZXh0dXJlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VGV4dHVyZShuYW1lKSB7XG4gICAgICB2YXIgdGV4dHVyZSA9IHRoaXMudGV4dHVyZXNbbmFtZV07XG4gICAgICBpZiAodGV4dHVyZSkge1xuICAgICAgICB0aGlzLnN0YXRzLnRleHR1cmVbbmFtZV0gPSAodGhpcy5zdGF0cy50ZXh0dXJlW25hbWVdIHx8IDApICsgMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIGJvdW5kIG1lc2ggZGlyZWN0bHkgZnJvbSB0aGUgY2FjaGUuXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgTWVzaCBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHtNZXNofSAgICAgICAgVGhlIGJvdW5kIG1lc2gsIG9yIHVuZGVmaW5lZCBpZiBpdCBkb2VzIG5vdFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIGV4aXN0IG9yIGlzIG5vdCB5ZXQgbG9hZGVkLlxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRNZXNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TWVzaChuYW1lKSB7XG4gICAgICB2YXIgbWVzaCA9IHRoaXMubWVzaGVzW25hbWVdO1xuICAgICAgaWYgKG1lc2gpIHtcbiAgICAgICAgdGhpcy5zdGF0cy5tZXNoW25hbWVdID0gKHRoaXMuc3RhdHMubWVzaFtuYW1lXSB8fCAwKSArIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdldHMgYSBib3VuZCBwcm9ncmFtIGRpcmVjdGx5IGZyb20gdGhlIGNhY2hlLlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIFByb2dyYW0gaW50ZXJuYWwgbmFtZVxyXG4gICAgICogQHJldHVybiB7UHJvZ3JhbX0gICAgIFRoZSBib3VuZCBwcm9ncmFtLCBvciB1bmRlZmluZWQgaWYgaXQgZG9lcyBub3RcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICBleGlzdCBvciBpcyBub3QgeWV0IGxvYWRlZC5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZ2V0UHJvZ3JhbScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFByb2dyYW0obmFtZSkge1xuICAgICAgdmFyIHByb2cgPSB0aGlzLnByb2dyYW1zW25hbWVdO1xuICAgICAgaWYgKHByb2cpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHMucmF3UHJvZ3JhbS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHRoaXMuc3RhdHMucmF3UHJvZ3JhbVtuYW1lXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RhdHMucHJvZ3JhbVtuYW1lXSA9ICh0aGlzLnN0YXRzLnByb2dyYW1bbmFtZV0gfHwgMCkgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIExvYWRzIGFsbCByZW1vdGUgcmVzb3VyY2VzIGZvdW5kIGluIHRoZSBtYW5pZmVzdCwgYW5kIGNyZWF0ZXMgYW55IHN0YXRpYyBwcm9ncmFtc1xyXG4gICAgICogaW5jbHVkZWQgaW4gdGhlIG1hbmlmZXN0J3MgcmF3UHJvZ3JhbXMgc2VjdGlvbiwgaWYgaXQgZXhpc3RzLlxyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIGludm9rZWQgdXBvbiBjb21wbGV0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgICAgICAgUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBnZXQgaW5mb3JtYXRpb25cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbiBsb2FkaW5nIHN0YXR1cy4gQHNlZSBnZXRTdGF0dXNcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnbG9hZEFsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRBbGwoY2FsbGJhY2spIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGFzc2V0LFxuICAgICAgICAgIG1hbmlmZXN0ID0gdGhpcy5tYW5pZmVzdDtcbiAgICAgIHRoaXMuY29tcGxldGUgPSBjYWxsYmFjaztcbiAgICAgIGZvciAoaSBpbiBtYW5pZmVzdC50ZXh0dXJlKSB7XG4gICAgICAgIGlmIChtYW5pZmVzdC50ZXh0dXJlLmhhc093blByb3BlcnR5KGkpICYmICEoaSBpbiB0aGlzLnRleHR1cmVzKSkge1xuICAgICAgICAgIHRoaXMudGV4dHVyZXNbaV0gPSBudWxsO1xuICAgICAgICAgIGFzc2V0ID0gbWFuaWZlc3QudGV4dHVyZVtpXTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkQXNzZXQoKCFhc3NldFsnc3RhdGljJ10gPyB0aGlzLnBhdGggOiAnJykgKyBhc3NldC5wYXRoLCAnaW1hZ2UnLCB0aGlzLl9oYW5kbGVUZXh0dXJlLmJpbmQodGhpcywgdGhpcy5xdWV1ZXMudGV4dHVyZS5sZW5ndGgsIGksIGFzc2V0KSk7XG4gICAgICAgICAgdGhpcy5xdWV1ZXMudGV4dHVyZS5wdXNoKDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGkgaW4gbWFuaWZlc3QubWVzaCkge1xuICAgICAgICBpZiAobWFuaWZlc3QubWVzaC5oYXNPd25Qcm9wZXJ0eShpKSAmJiAhKGkgaW4gdGhpcy5tZXNoZXMpKSB7XG4gICAgICAgICAgdGhpcy5tZXNoZXNbaV0gPSBudWxsO1xuICAgICAgICAgIGFzc2V0ID0gbWFuaWZlc3QubWVzaFtpXTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkQXNzZXQoKCFhc3NldFsnc3RhdGljJ10gPyB0aGlzLnBhdGggOiAnJykgKyBhc3NldC5wYXRoLCAnYXJyYXlidWZmZXInLCB0aGlzLl9oYW5kbGVNZXNoLmJpbmQodGhpcywgdGhpcy5xdWV1ZXMubWVzaC5sZW5ndGgsIGksIGFzc2V0KSk7XG4gICAgICAgICAgdGhpcy5xdWV1ZXMubWVzaC5wdXNoKDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGkgaW4gbWFuaWZlc3QucHJvZ3JhbSkge1xuICAgICAgICBpZiAobWFuaWZlc3QucHJvZ3JhbS5oYXNPd25Qcm9wZXJ0eShpKSAmJiAhKGkgaW4gdGhpcy5wcm9ncmFtcykpIHtcbiAgICAgICAgICB0aGlzLnByb2dyYW1zW2ldID0gbnVsbDtcbiAgICAgICAgICBhc3NldCA9IG1hbmlmZXN0LnByb2dyYW1baV07XG4gICAgICAgICAgdGhpcy5sb2FkZXIubG9hZEFzc2V0R3JvdXAoWyghYXNzZXRbJ3N0YXRpYyddID8gdGhpcy5wYXRoIDogJycpICsgYXNzZXQudmVydGV4LCAoIWFzc2V0WydzdGF0aWMnXSA/IHRoaXMucGF0aCA6ICcnKSArIGFzc2V0LmZyYWdtZW50XSwgWyd0ZXh0JywgJ3RleHQnXSwgdGhpcy5faGFuZGxlUHJvZ3JhbS5iaW5kKHRoaXMsIHRoaXMucXVldWVzLnByb2dyYW0ubGVuZ3RoLCBpLCBhc3NldCkpO1xuICAgICAgICAgIHRoaXMucXVldWVzLnByb2dyYW0ucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChpIGluIG1hbmlmZXN0LnJhd1Byb2dyYW0pIHtcbiAgICAgICAgaWYgKG1hbmlmZXN0LnJhd1Byb2dyYW0uaGFzT3duUHJvcGVydHkoaSkgJiYgIShpIGluIHRoaXMucHJvZ3JhbXMpKSB7XG4gICAgICAgICAgdGhpcy5zdGF0cy5yYXdQcm9ncmFtW2ldID0gMDtcbiAgICAgICAgICB0aGlzLl9jcmVhdGVQcm9ncmFtKGksIG1hbmlmZXN0LnJhd1Byb2dyYW1baV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFN0YXR1cy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHNtYWxsIHN1bW1hcnkgb2YgYWxsIHRoZSBsb2FkZXIgcXVldWVzIGZvciBhbGwgYXNzZXRzLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIHN1bW1hcnkgb2YgZWFjaCBxdWV1ZS4gQHNlZSBzdW1tYXJpemVcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZ2V0U3RhdHVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U3RhdHVzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dHVyZTogc3VtbWFyaXplKHRoaXMucXVldWVzLnRleHR1cmUpLFxuICAgICAgICBtZXNoOiBzdW1tYXJpemUodGhpcy5xdWV1ZXMubWVzaCksXG4gICAgICAgIHByb2dyYW06IHN1bW1hcml6ZSh0aGlzLnF1ZXVlcy5wcm9ncmFtKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBhIGNvbXBhY3QgbWFuaWZlc3QgY29udGFpbmluZyBvbmx5IHRoZSByZXNvdXJjZXMgdGhhdCBoYXZlIGJlZW5cclxuICAgICAqIGFjdHVhbGx5IGJlIGZldGNoZWQgZnJvbSB0aGUgY2FjaGUsIGFmdGVyIGxvYWRpbmcuICBVc2VmdWwgdG8gcmVkdWNlIGxvYWRpbmdcclxuICAgICAqIHRpbWUgZm9yIHNjZW5lcyB0aGF0IG9ubHkgdXNlIGEgZmV3IHJlc291cmNlcy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQSBtYW5pZmVzdCBjb250YWluaW5nIG9ubHkgdGhlIHJlc291cmNlcyB0aGF0IHdlcmUgYWN0dWFsbHkgdXNlZFxyXG4gICAgICogICAgICAgICAgICAgICAgICBhZnRlciBsb2FkaW5nLlxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdnZW5lcmF0ZU1hbmlmZXN0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2VuZXJhdGVNYW5pZmVzdCgpIHtcbiAgICAgIHZhciBtYW5pZmVzdCA9IHt9LFxuICAgICAgICAgIGtleXMgPSBbJ3RleHR1cmUnLCAnbWVzaCcsICdyYXdQcm9ncmFtJywgJ3Byb2dyYW0nXTtcbiAgICAgIGtleXMuZm9yRWFjaCgoZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgbWFuaWZlc3Rbc2VjdGlvbl0gPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnN0YXRzW3NlY3Rpb25dKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHNbc2VjdGlvbl0uaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5zdGF0c1tzZWN0aW9uXVtpXSA+IDApIHtcbiAgICAgICAgICAgIG1hbmlmZXN0W3NlY3Rpb25dW2ldID0gdGhpcy5tYW5pZmVzdFtzZWN0aW9uXVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgcmV0dXJuIG1hbmlmZXN0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19pc0NvbXBsZXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2lzQ29tcGxldGUoKSB7XG4gICAgICB2YXIgc3RhdHVzID0gdGhpcy5nZXRTdGF0dXMoKTtcbiAgICAgIGlmICh0aGlzLmNvbXBsZXRlICYmIHN0YXR1cy50ZXh0dXJlLmxvYWRpbmcgPT09IDAgJiYgc3RhdHVzLm1lc2gubG9hZGluZyA9PT0gMCAmJiBzdGF0dXMucHJvZ3JhbS5sb2FkaW5nID09PSAwKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfaGFuZGxlVGV4dHVyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVUZXh0dXJlKGlkeCwgbmFtZSwgaW5mbywgZXJyLCB2YWx1ZSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICB0aGlzLnF1ZXVlcy50ZXh0dXJlW2lkeF0gPSAtMTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB0aHJvdyAnQ291bGQgbm90IGxvYWQgJyArIG5hbWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWRkVGV4dHVyZShuYW1lLCBuZXcgX3RleHR1cmUyWydkZWZhdWx0J10odGhpcy5fZ2wsIGluZm8sIHZhbHVlKSk7XG4gICAgICB0aGlzLnF1ZXVlcy50ZXh0dXJlW2lkeF0gPSAxO1xuICAgICAgdGhpcy5faXNDb21wbGV0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19oYW5kbGVNZXNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2hhbmRsZU1lc2goaWR4LCBuYW1lLCBpbmZvLCBlcnIsIHZhbHVlKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRoaXMucXVldWVzLm1lc2hbaWR4XSA9IC0xO1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHRocm93ICdDb3VsZCBub3QgbG9hZCAnICsgbmFtZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGRNZXNoKG5hbWUsIG5ldyBfbWVzaEZpbGUyWydkZWZhdWx0J10odGhpcy5fZ2wsIHZhbHVlKSk7XG4gICAgICB0aGlzLnF1ZXVlcy5tZXNoW2lkeF0gPSAxO1xuICAgICAgdGhpcy5faXNDb21wbGV0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jcmVhdGVQcm9ncmFtJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZVByb2dyYW0obmFtZSwgaW5mbykge1xuICAgICAgdmFyIEtsYXNzID0gX3Byb2dyYW0yWydkZWZhdWx0J107XG4gICAgICBpZiAoaW5mby5wcm9ncmFtIGluIF9wcm9ncmFtcykge1xuICAgICAgICBLbGFzcyA9IF9wcm9ncmFtc1tpbmZvLnByb2dyYW1dO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRQcm9ncmFtKG5hbWUsIG5ldyBLbGFzcyh0aGlzLl9nbCwgaW5mby52ZXJ0ZXgsIGluZm8uZnJhZ21lbnQpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfaGFuZGxlUHJvZ3JhbScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVQcm9ncmFtKGlkeCwgbmFtZSwgaW5mbywgZXJyLCB2YWxzKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRoaXMucXVldWVzLnByb2dyYW1baWR4XSA9IC0xO1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHRocm93ICdDb3VsZCBub3QgbG9hZCAnICsgbmFtZTtcbiAgICAgIH1cblxuICAgICAgdmFyIEtsYXNzID0gX3Byb2dyYW0yWydkZWZhdWx0J107XG4gICAgICBpZiAoaW5mby5wcm9ncmFtIGluIF9wcm9ncmFtcykge1xuICAgICAgICBLbGFzcyA9IF9wcm9ncmFtc1tpbmZvLnByb2dyYW1dO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRQcm9ncmFtKG5hbWUsIG5ldyBLbGFzcyh0aGlzLl9nbCwgdmFsc1swXSwgdmFsc1sxXSkpO1xuICAgICAgdGhpcy5xdWV1ZXMucHJvZ3JhbVtpZHhdID0gMTtcbiAgICAgIHRoaXMuX2lzQ29tcGxldGUoKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQXNzZXRNYW5hZ2VyO1xufSkoX2dsQm91bmQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBBc3NldE1hbmFnZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8qKlxyXG4gKiBBIGJ1bmNoIG9mIHVzZWZ1bCBjb25zdGFudHMuXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xudmFyIENvbnN0YW50cyA9IHtcbiAgLyoqXHJcbiAgICogU2hvcnQgbGlzdCBvZiB0ZWFtIGNvbG9ycyBieSBpbnRlcm5hbCBuYW1lLlxyXG4gICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICovXG4gIHRlYW1Db2xvcnM6IHtcbiAgICBSRVNJU1RBTkNFOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAsIDAuNzYwNzg0MzEzNzI1NDkwMiwgMSwgMS4wKSxcbiAgICBFTkxJR0hURU5FRDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjE1Njg2Mjc0NTA5ODAzOTIsIDAuOTU2ODYyNzQ1MDk4MDM5MywgMC4xNTY4NjI3NDUwOTgwMzkyLCAxLjApLFxuICAgIE5FVVRSQUw6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45NzY0NzA1ODgyMzUyOTQxLCAwLjk3NjQ3MDU4ODIzNTI5NDEsIDAuOTc2NDcwNTg4MjM1Mjk0MSwgMS4wKSxcbiAgICBMT0tJOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEsIDAuMTU2ODYyNzQ1MDk4MDM5MiwgMC4xNTY4NjI3NDUwOTgwMzkyLCAxLjApXG4gIH0sXG4gIC8qKlxyXG4gICAqIFF1YWxpdHkgYW5kIGxldmVsIGNvbG9ycywgYnkgaW50ZXJuYWwgbmFtZS5cclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqL1xuICBxdWFsaXR5Q29sb3JzOiB7XG4gICAgRVhUUkVNRUxZX1JBUkU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45ODAzOTIxNTY4NjI3NDUxLCAwLjM5MjE1Njg2Mjc0NTA5ODAzLCAwLjM5MjE1Njg2Mjc0NTA5ODAzLCAxLjApLFxuICAgIFZFUllfUkFSRTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjk1Njg2Mjc0NTA5ODAzOTMsIDAuNTIxNTY4NjI3NDUwOTgwNCwgMC45MjU0OTAxOTYwNzg0MzE0LCAxLjApLFxuICAgIE1PUkVfUkFSRTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjc2NDcwNTg4MjM1Mjk0MTEsIDAsIDEsIDEuMCksXG4gICAgUkFSRTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjY2NjY2NjY2NjY2NjY2NjYsIDAuNTM3MjU0OTAxOTYwNzg0MywgMC45ODQzMTM3MjU0OTAxOTYsIDEuMCksXG4gICAgTEVTU19DT01NT046IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC40NTA5ODAzOTIxNTY4NjI3NSwgMC42NTg4MjM1Mjk0MTE3NjQ3LCAxLCAxLjApLFxuICAgIENPTU1PTjogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjUwOTgwMzkyMTU2ODYyNzQsIDAuOTUyOTQxMTc2NDcwNTg4MiwgMC43MDU4ODIzNTI5NDExNzY1LCAxLjApLFxuICAgIFZFUllfQ09NTU9OOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNjk4MDM5MjE1Njg2Mjc0NSwgMC42OTgwMzkyMTU2ODYyNzQ1LCAwLjY5ODAzOTIxNTY4NjI3NDUsIDEuMCksXG4gICAgTDE6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45OTYwNzg0MzEzNzI1NDksIDAuODA3ODQzMTM3MjU0OTAyLCAwLjM1Mjk0MTE3NjQ3MDU4ODI2LCAxLjApLFxuICAgIEwyOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEsIDAuNjUwOTgwMzkyMTU2ODYyOCwgMC4xODgyMzUyOTQxMTc2NDcwNiwgMS4wKSxcbiAgICBMMzogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLCAwLjQ1MDk4MDM5MjE1Njg2Mjc1LCAwLjA4MjM1Mjk0MTE3NjQ3MDU5LCAxLjApLFxuICAgIEw0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuODk0MTE3NjQ3MDU4ODIzNiwgMCwgMCwgMS4wKSxcbiAgICBMNTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjk5MjE1Njg2Mjc0NTA5ODEsIDAuMTYwNzg0MzEzNzI1NDkwMiwgMC41NzI1NDkwMTk2MDc4NDMxLCAxLjApLFxuICAgIEw2OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuOTIxNTY4NjI3NDUwOTgwMywgMC4xNDkwMTk2MDc4NDMxMzcyNSwgMC44MDM5MjE1Njg2Mjc0NTEsIDEuMCksXG4gICAgTDc6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC43NTY4NjI3NDUwOTgwMzkyLCAwLjE0MTE3NjQ3MDU4ODIzNTMsIDAuODc4NDMxMzcyNTQ5MDE5NiwgMS4wKSxcbiAgICBMODogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjU4ODIzNTI5NDExNzY0NzEsIDAuMTUyOTQxMTc2NDcwNTg4MjUsIDAuOTU2ODYyNzQ1MDk4MDM5MywgMS4wKVxuICB9LFxuICAvKipcclxuICAgKiBDb2xvciBjb25zdGFudHMgZm9yIGFub21hbHkgbWFya2Vycy5cclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqL1xuICBhbm9tYWx5Q29sb3JzOiB7XG4gICAgMTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLjAsIDAuNTY4NjI3NDUwOTgwMzkyMSwgMC4yMTE3NjQ3MDU4ODIzNTI5NCwgMS4wKSxcbiAgICAyOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEuMCwgMC4zMjE1Njg2Mjc0NTA5ODA0LCAwLjkwNTg4MjM1Mjk0MTE3NjUsIDEuMCksXG4gICAgMzogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjYxOTYwNzg0MzEzNzI1NDksIDAuMzUyOTQxMTc2NDcwNTg4MjYsIDEuMCwgMS4wKSxcbiAgICA0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuODQzMTM3MjU0OTAxOTYwOCwgMC4yNzA1ODgyMzUyOTQxMTc2MywgMC4yNzA1ODgyMzUyOTQxMTc2MywgMS4wKSxcbiAgICA1OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEuMCwgMC45NDUwOTgwMzkyMTU2ODYyLCAwLjAsIDEuMCksXG4gICAgNjogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjY1MDk4MDM5MjE1Njg2MjgsIDEuMCwgMC45MDE5NjA3ODQzMTM3MjU1LCAxLjApLFxuICAgIDc6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC41NzI1NDkwMTk2MDc4NDMxLCAwLjU4MDM5MjE1Njg2Mjc0NTEsIDAuNTkyMTU2ODYyNzQ1MDk4LCAxLjApXG4gIH0sXG4gIC8qKlxyXG4gICAqIEdsb3cgY29sb3JzIGZvciB0aGUgdmFyaW91cyBhcnRpZmFjdDxjb2xvcj5HbG93IGRlY29yYXRpb25zIGZvciBzaGFyZCBwb3J0YWxzIGFuZFxyXG4gICAqIHRhcmdldCBwb3J0YWxzLCBieSBzZXJpZXMuXHJcbiAgICogQHR5cGUge09iamVjdH1cclxuICAgKi9cbiAgYXJ0aWZhY3RHbG93Q29sb3JzOiB7XG4gICAgSGVsaW9zOiB7XG4gICAgICBSZWQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45MiwgMC41MSwgMC4xNCwgMS4wKSxcbiAgICAgIFB1cnBsZTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLjAsIDAuODcsIDAuNTUsIDEuMCksXG4gICAgICBUYXJnZXQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMS4wLCAwLjcyLCAwLjAsIDEuMClcbiAgICB9LFxuICAgIEFtYXI6IHtcbiAgICAgIFRhcmdldDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjYyLCAwLjIyLCAwLjYyLCAxLjApLFxuICAgICAgUmVkOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzksIDAuMTEsIDAuNDksIDEuMCksXG4gICAgICBQdXJwbGU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC41OCwgMC4xNywgMS4wLCAxLjApXG4gICAgfSxcbiAgICBKYXJ2aXM6IHtcbiAgICAgIFRhcmdldDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjYyLCAwLjIyLCAwLjYyLCAxLjApLFxuICAgICAgUmVkOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzksIDAuMTEsIDAuNDksIDEuMCksXG4gICAgICBQdXJwbGU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC41OCwgMC4xNywgMS4wLCAxLjApXG4gICAgfSxcbiAgICBTaG9uaW46IHtcbiAgICAgIFJlZDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjc4LCAwLjg0LCAxLjAsIDEuMCksXG4gICAgICBQdXJwbGU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC4yNSwgMC44MSwgMS4wLCAxLjApLFxuICAgICAgVGFyZ2V0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzAsIDAuNzAsIDAuNzAsIDEuMClcbiAgICB9LFxuICAgIExpZ2h0bWFuOiB7XG4gICAgICBSZWQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMS4wLCAwLjQ0LCAwLjQ1LCAxLjApLFxuICAgICAgUHVycGxlOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEuMCwgMC4yNCwgMC4yNSwgMS4wKSxcbiAgICAgIFRhcmdldDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjc0LCAwLjAsIDAuMDIsIDEuMClcbiAgICB9XG4gIH0sXG4gIC8qKlxyXG4gICAqIENvbnN0YW50cyBmb3IgeG0gZ2xvdyBjb2xvcnMgKGZvciBpdGVtIHhtIGNvcmVzKVxyXG4gICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICovXG4gIHhtQ29sb3JzOiB7XG4gICAgY29yZUdsb3c6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45MiwgMC43LCAwLjg5LCAxLjApLFxuICAgIGNvcmVHbG93QWx0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNiwgMC40LCAwLjYsIDAuOCksXG4gICAgY29yZUdsb3dBZGE6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMCwgMC43NjA3ODQzMTM3MjU0OTAyLCAxLCAxLjApLFxuICAgIGNvcmVHbG93SmFydmlzOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuMTU2ODYyNzQ1MDk4MDM5MiwgMC45NTY4NjI3NDUwOTgwMzkzLCAwLjE1Njg2Mjc0NTA5ODAzOTIsIDEuMClcbiAgfSxcbiAgLyoqXHJcbiAgICogTWVzaCBpbnRlcm5hbCBuYW1lIGNvbnN0YW50cy5cclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqL1xuICBNZXNoOiB7XG4gICAgSW52ZW50b3J5OiB7XG4gICAgICBYbXA6ICdYbXBNZXNoJyxcbiAgICAgIFhtcFhtOiAnWG1wWE1NZXNoJyxcbiAgICAgIFVsdHJhc3RyaWtlOiAnVWx0cmFzdHJpa2VNZXNoJyxcbiAgICAgIFVsdHJhc3RyaWtlWG06ICdVbHRyYXN0cmlrZVhNTWVzaCcsXG4gICAgICBSZXNTaGllbGQ6ICdSZXNTaGllbGRNZXNoJyxcbiAgICAgIFJlc1NoaWVsZFhtOiAnUmVzU2hpZWxkWE1NZXNoJyxcbiAgICAgIFBvd2VyQ3ViZTogJ1Bvd2VyQ3ViZU1lc2gnLFxuICAgICAgUG93ZXJDdWJlWG06ICdQb3dlckN1YmVYbU1lc2gnLFxuICAgICAgTGlua0FtcDogJ0xpbmtBbXBNZXNoJyxcbiAgICAgIExpbmtBbXBYbTogJ0xpbmtBbXBYbU1lc2gnLFxuICAgICAgSGVhdFNpbms6ICdIZWF0U2lua01lc2gnLFxuICAgICAgSGVhdFNpbmtYbTogJ0hlYXRTaW5rWG1NZXNoJyxcbiAgICAgIE11bHRpSGFjazogJ011bHRpSGFja01lc2gnLFxuICAgICAgTXVsdGlIYWNrWG06ICdNdWx0aUhhY2tYbU1lc2gnLFxuICAgICAgRm9yY2VBbXA6ICdGb3JjZUFtcE1lc2gnLFxuICAgICAgRm9yY2VBbXBYbTogJ0ZvcmNlQW1wWG1NZXNoJyxcbiAgICAgIFR1cnJldDogJ1R1cnJldE1lc2gnLFxuICAgICAgVHVycmV0WG06ICdUdXJyZXRYbU1lc2gnLFxuICAgICAgRmxpcENhcmRBZGE6ICdGbGlwQ2FyZE1lc2hBZGEnLFxuICAgICAgRmxpcENhcmRKYXJ2aXM6ICdGbGlwQ2FyZE1lc2hKYXJ2aXMnLFxuICAgICAgRmxpcENhcmRYbTogJ0ZsaXBDYXJkWG1NZXNoJyxcbiAgICAgIFJlc29uYXRvcjogJ1Jlc29uYXRvck1lc2gnLFxuICAgICAgUmVzb25hdG9yWG06ICdSZXNvbmF0b3JYTU1lc2gnLFxuICAgICAgQ2Fwc3VsZTogJ0NhcHN1bGVNZXNoJyxcbiAgICAgIEludGVyZXN0Q2Fwc3VsZTogJ0ludGVyZXN0Q2Fwc3VsZU1lc2gnLFxuICAgICAgQ2Fwc3VsZVhtOiAnQ2Fwc3VsZVhtTWVzaCcsXG4gICAgICBFeHRyYVNoaWVsZDogJ0V4dHJhU2hpZWxkTWVzaCcsXG4gICAgICBNZWRpYUN1YmU6ICdNZWRpYUN1YmVNZXNoJyxcbiAgICAgIE1lZGlhUGxhbmVNZXNoOiAnTWVkaWFQbGFuZU1lc2gnXG4gICAgfSxcbiAgICBSZXNvdXJjZToge1xuICAgICAgWG1wOiAnWG1wUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBQb3J0YWxLZXlSZXNvdXJjZVVuaXQ6ICdQb3J0YWxLZXlSZXNvdXJjZVVuaXQnLFxuICAgICAgVWx0cmFzdHJpa2U6ICdVbHRyYXN0cmlrZVJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgUG93ZXJDdWJlOiAnUG93ZXJDdWJlUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBMaW5rQW1wOiAnTGlua0FtcFJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgSGVhdFNpbms6ICdIZWF0U2lua1Jlc291cmNlVW5pdE1lc2gnLFxuICAgICAgTXVsdGlIYWNrOiAnTXVsdGlIYWNrUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBGb3JjZUFtcDogJ0ZvcmNlQW1wUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBUdXJyZXQ6ICdUdXJyZXRSZXNvdXJjZVVuaXRNZXNoJyxcbiAgICAgIEZsaXBDYXJkQWRhOiAnRmxpcENhcmRSZXNvdXJjZVVuaXRNZXNoQWRhJyxcbiAgICAgIEZsaXBDYXJkSmFydmlzOiAnRmxpcENhcmRSZXNvdXJjZVVuaXRNZXNoSmFydmlzJyxcbiAgICAgIFJlc29uYXRvcjogJ1Jlc29uYXRvclJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgUG9ydGFsU2hpZWxkOiAnUG9ydGFsU2hpZWxkUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBDYXBzdWxlOiAnQ2Fwc3VsZVJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgSW50ZXJlc3RDYXBzdWxlOiAnSW50ZXJlc3RDYXBzdWxlUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBFeHRyYVNoaWVsZDogJ0V4dHJhU2hpZWxkUmVzb3VyY2VVbml0TWVzaCdcbiAgICB9LFxuICAgIFBsYXllcjoge1xuICAgICAgUGxheWVyOiAnUGxheWVyTWVzaCcsXG4gICAgICBQbGF5ZXJFZGdlOiAnUGxheWVyTWVzaEVkZ2UnLFxuICAgICAgUGxheWVyUmVmbGVjdGlvbjogJ1BsYXllck1lc2hSZWZsZWN0aW9uJyxcbiAgICAgIFBsYXllckdsb3c6ICdQbGF5ZXJNZXNoR2xvdycsXG4gICAgICBCcmVhZENydW1iOiAnQnJlYWRDcnVtYk1lc2gnLFxuICAgICAgQ29tcGFzczogJ0NvbXBhc3NNZXNoJ1xuICAgIH0sXG4gICAgT3JuYW1lbnQ6IHtcbiAgICAgIE1lZXR1cFBvaW50OiAnT3JuYW1lbnRNZWV0dXBQb2ludE1lc2gnLFxuICAgICAgRmluaXNoUG9pbnQ6ICdPcm5hbWVudEZpbmlzaFBvaW50TWVzaCcsXG4gICAgICBDbHVzdGVyOiAnT3JuYW1lbnRDbHVzdGVyTWVzaCcsXG4gICAgICBWb2xhdGlsZTogJ09ybmFtZW50Vm9sYXRpbGVNZXNoJ1xuICAgIH0sXG4gICAgV29ybGQ6IHtcbiAgICAgIFNoaWVsZDogJ1BvcnRhbFNoaWVsZE1lc2gnLFxuICAgICAgUG9ydGFsOiAnVGV4dHVyZWRQb3J0YWxNZXNoJyxcbiAgICAgIFdheXBvaW50OiAnVGV4dHVyZWRTY2FubmVyRlRNZXNoJyxcbiAgICAgIFJlc29uYXRvcjogJ1Jlc29uYXRvclVuaXRMb3dSZXNNZXNoJyxcbiAgICAgIFhtcFJpbmc6ICdYbXBSaW5nTWVzaCcsXG4gICAgICBVbHRyYVN0cmlrZVJpbmc6ICdVbHRyYVN0cmlrZVJpbmdNZXNoJyxcbiAgICAgIFVsdHJhU3RyaWtlQ29sdW1uOiAnVWx0cmFTdHJpa2VDb2x1bW5NZXNoJyxcbiAgICAgIEFydGlmYWN0c1JlZEdsb3c6ICdBcnRpZmFjdHNSZWRHbG93JyxcbiAgICAgIEFydGlmYWN0c0dyZWVuR2xvdzogJ0FydGlmYWN0c0dyZWVuR2xvdycsXG4gICAgICBBcnRpZmFjdHNQdXJwbGVHbG93OiAnQXJ0aWZhY3RzUHVycGxlR2xvdycsXG4gICAgICBBcnRpZmFjdHNUYXJnZXRHbG93OiAnQXJ0aWZhY3RzVGFyZ2V0R2xvdycsXG4gICAgICBTaW5nbGVSZXNvbmF0b3I6ICdTaW5nbGVSZXNvbmF0b3JNZXNoJyxcbiAgICAgIE9ybmFtZW50TWVldHVwUG9pbnQ6ICdPcm5hbWVudE1lZXR1cFBvaW50TWVzaCcsXG4gICAgICBPcm5hbWVudEZpbmlzaFBvaW50OiAnT3JuYW1lbnRGaW5pc2hQb2ludE1lc2gnLFxuICAgICAgT3JuYW1lbnRDbHVzdGVyOiAnT3JuYW1lbnRDbHVzdGVyTWVzaCcsXG4gICAgICBPcm5hbWVudFZvbGF0aWxlOiAnT3JuYW1lbnRWb2xhdGlsZU1lc2gnXG4gICAgfVxuICB9LFxuICAvKipcclxuICAgKiBQcm9ncmFtIGludGVybmFsIG5hbWUgY29uc3RhbnRzLlxyXG4gICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICovXG4gIFByb2dyYW06IHtcbiAgICBCaWNvbG9yZWQ6ICdiaWNvbG9yX3RleHR1cmVkJyxcbiAgICBUZXh0dXJlZDogJ3RleHR1cmVkJyxcbiAgICBSZWdpb25UZXh0dXJlZDogJ3JlZ2lvbl90ZXh0dXJlZCcsXG4gICAgR2xvd3JhbXA6ICdwb3J0YWxfc2Nhbm5lcicsXG4gICAgWG06ICd4bScsXG4gICAgU2hpZWxkRWZmZWN0OiAnc2hpZWxkJyxcbiAgICBBdG1vc3BoZXJlOiAnYXRtb3NwaGVyZScsXG4gICAgTGluazogJ0xpbmtTaGFkZXInLFxuICAgIFNwaGVyaWNhbExpbms6ICdsaW5rM2QnXG4gIH0sXG4gIC8qKlxyXG4gICAqIFRleHR1cmUgaW50ZXJuYWwgbmFtZSBjb25zdGFudHMuXHJcbiAgICogQHR5cGUge09iamVjdH1cclxuICAgKi9cbiAgVGV4dHVyZToge1xuICAgIEZsaXBDYXJkOiAnRmxpcENhcmRUZXh0dXJlJyxcbiAgICBYbTogJ09iamVjdFhNVGV4dHVyZScsXG4gICAgR2xvd3JhbXA6ICdHbG93cmFtcFRleHR1cmUnLFxuICAgIE1lZGlhOiAnTWVkaWFDdWJlVGV4dHVyZScsXG4gICAgV2F5cG9pbnQ6ICdGdFdheXBvaW50VGV4dHVyZScsXG4gICAgU2hpZWxkRWZmZWN0OiAnUG9ydGFsU2hpZWxkVGV4dHVyZScsXG4gICAgQ29sb3JHbG93OiAnQ29sb3JHbG93VGV4dHVyZScsXG4gICAgVGFyZ2V0R2xvdzogJ1RhcmdldEdsb3dUZXh0dXJlJyxcbiAgICBQb3J0YWxMaW5rOiAnUG9ydGFsTGlua1RleHR1cmUnLFxuICAgIFJlc29uYXRvckxpbms6ICdSZXNvbmF0b3JMaW5rVGV4dHVyZScsXG4gICAgT3JuYW1lbnRNZWV0dXBQb2ludDogJ09ybmFtZW50TWVldHVwUG9pbnRUZXh0dXJlJyxcbiAgICBPcm5hbWVudEZpbmlzaFBvaW50OiAnT3JuYW1lbnRGaW5pc2hQb2ludFRleHR1cmUnLFxuICAgIE9ybmFtZW50Q2x1c3RlcjogJ09ybmFtZW50Q2x1c3RlclRleHR1cmUnLFxuICAgIE9ybmFtZW50Vm9sYXRpbGU6ICdPcm5hbWVudFZvbGF0aWxlVGV4dHVyZSdcblxuICB9XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBDb25zdGFudHM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvKipcclxuICogQmFzZSBjbGFzcyBmb3IgYWxsIFwiZHJhd2FibGVcIiB0aGluZ3MuXHJcbiAqXHJcbiAqIFJlcXVpcmVzLCBhdCB0aGUgdmVyeSBsZWFzdCwgYSBwcm9ncmFtIHRvIHJ1bi5cclxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIERyYXdhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBiYXNlIGRyYXdhYmxlXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwcm9ncmFtTmFtZSBJbnRlcm5hbCBuYW1lIG9mIHRoZSBwcm9ncmFtIHRvIGJlIHJ1blxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIERyYXdhYmxlKHByb2dyYW1OYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERyYXdhYmxlKTtcblxuICAgIHRoaXMucHJvZ3JhbU5hbWUgPSBwcm9ncmFtTmFtZTtcbiAgICB0aGlzLnByb2dyYW0gPSBudWxsO1xuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcbiAgICB0aGlzLmRyYXdmbiA9IG51bGw7XG4gICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gIH1cblxuICAvKipcclxuICAgKiBJbml0aWFsaXplciBmb3IgdGhlIGRyYXdhYmxlXHJcbiAgICpcclxuICAgKiBIb29rcyB1cCB0aGUgZHJhd2FibGUgdG8gYWxsIGl0cyBnbC1ib3VuZCByZXNvdXJjZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge0Fzc2V0TWFuYWdlcn0gbWFuYWdlciBBc3NldE1hbmFnZXIgY29udGFpbmluZyB0aGUgbWFuYWdlZCByZXNvdXJjZXMgZm9yIHRoaXNcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhd2FibGUuXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgYXNzZXRzIGFyZSBzdWNjZXNzZnVsbHkgZm91bmQgYW5kIGluaXRpYWxpemVkLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSAoYW5kIGdlbmVyYXRlcyBhIHdhcm5pbmcpIG90aGVyd2lzZS5cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoRHJhd2FibGUsIFt7XG4gICAga2V5OiAnaW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQobWFuYWdlcikge1xuICAgICAgdGhpcy5wcm9ncmFtID0gbWFuYWdlci5nZXRQcm9ncmFtKHRoaXMucHJvZ3JhbU5hbWUpO1xuICAgICAgaWYgKCF0aGlzLnByb2dyYW0pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdtaXNzaW5nIHByb2dyYW0gJyArIHRoaXMucHJvZ3JhbU5hbWUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc3BlY2lmaWMgZHJhdyBmdW5jdGlvbiBmb3IgdGhpcyBkcmF3YWJsZVxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBkcmF3IGZ1bmN0aW9uIHRvIHVzZSB3aGVuIGRyYXdhYmxlIHRoaXMgb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIHt0aGlzfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdzZXREcmF3Rm4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXREcmF3Rm4oZm4pIHtcbiAgICAgIHRoaXMuZHJhd2ZuID0gZm47XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIGEgZHJhdyBjYWxsIGZvciB0aGlzIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIElzc3VlcyBhIHdhcm5pbmcgaWYgdGhlIGRyYXdhYmxlIGhhcyBub3QgeWV0IGJlZW4gaW5pdGlhbGl6ZWQgd2l0aCBgaW5pdGBcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2RyYXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3KCkge1xuICAgICAgaWYgKCF0aGlzLnJlYWR5KSB7XG4gICAgICAgIGNvbnNvbGUud2FybignZHJhd2FibGUgaXMgbm90IGluaXRpYWxpemVkJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvZ3JhbS51c2UodGhpcy5kcmF3Zm4pO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhIHVuaWZvcm0gb24gdGhlIGRyYXdhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgIE5hbWUgb2YgdGhlIGRyYXdhYmxlIHRvIHNldFxyXG4gICAgICogQHBhcmFtIHttaXhlZH0gdmFsdWUgIFZhbHVlIHRvIHNldCBvbiB0aGUgZHJhd2FibGUuXHJcbiAgICAgKiBAcmV0dXJucyB7dGhpc31cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnc2V0VW5pZm9ybScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFVuaWZvcm0obmFtZSwgdmFsdWUpIHtcbiAgICAgIHRoaXMudW5pZm9ybXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZWxhcHNlZCB0aW1lIGZvciB0aGlzIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBBbHNvIGV4ZWN1dGVzIGFueSBwZXJpb2RpYyB1cGRhdGVzIHRoYXQgaGF2ZSBiZWVuIGFwcGxpZWQgdG8gdGhlIGRyYXdhYmxlXHJcbiAgICAgKiAoaS5lLiBhbmltYXRpb25zKS4gIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIGZhbHNleSB2YWx1ZSwgaXQgc2lnbmFscyB0aGF0IHRoZVxyXG4gICAgICogYW5pbWF0aW9uIGhhcyBlbmRlZCwgYW5kIHRoYXQgdGhlIG9iamVjdCBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHRoZSBkcmF3IGxvb3AuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBkZWx0YSBBbW91bnQgb2YgdGltZSB0aGF0IGhhcyBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IGRyYXcgY2FsbFxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICBSZXR1cm4gZmFsc2UgaWYgdGhlIG9iamVjdCBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHRoZVxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9vcC5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVGltZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVRpbWUoZGVsdGEpIHtcbiAgICAgIHRoaXMuZWxhcHNlZCArPSBkZWx0YTtcbiAgICAgIGlmICh0aGlzLm9uVXBkYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uVXBkYXRlKGRlbHRhLCB0aGlzLmVsYXBzZWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBOWUlcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2Rpc3Bvc2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgLy8gbm9vcDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRHJhd2FibGU7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBEcmF3YWJsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9tb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwnKTtcblxudmFyIF9tb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tb2RlbCk7XG5cbnZhciBfbWVzaFNwaGVyZSA9IHJlcXVpcmUoJy4uL21lc2gvc3BoZXJlJyk7XG5cbnZhciBfbWVzaFNwaGVyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNoU3BoZXJlKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5BdG1vc3BoZXJlO1xuXG4vKipcclxuICogVGhpcyBpcyBhIG1vZGlmaWVkIHZlcnNpb24gb2YgdGhlIGF0bW9zcGhlcmUgcHJvZ3JhbSBmcm9tOlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGF0YWFydHMvd2ViZ2wtZ2xvYmUvYmxvYi9tYXN0ZXIvZ2xvYmUvZ2xvYmUuanNcclxuICovXG5cbnZhciBBdG1vc3BoZXJlRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9Nb2RlbERyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhBdG1vc3BoZXJlRHJhd2FibGUsIF9Nb2RlbERyYXdhYmxlKTtcblxuICAvKipcclxuICAgKiBJbml0aWFsaXplclxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gcmFkaXVzICAgICAgUmFkaXVzIG9mIHRoZSB3b3JsZC5cclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgc2hvdWxkIG1hdGNoIHRoZSByYWRpdXMgb2YgdGhlIHdvcmxkIG1lc2ggdGhlXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG1vc3BoZXJlIGlzIGJlaW5nIHJlbmRlcmVkIG92ZXIuXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSB2U2xpY2VzICAgICBOdW1iZXIgb2YgdmVydGljYWwgc2xpY2VzIGZvciB0aGUgc3BoZXJlIG1lc2hcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGhTbGljZXMgICAgIE51bWJlciBvZiBob3Jpem9udGFsIHNsaWNlcyBmb3IgdGhlIHNwaGVyZSBtZXNoXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBzY2FsZUZhY3RvciBUaGUgcGVyY2VudCB0byBzY2FsZSB0aGUgbWVzaFxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXG5cbiAgZnVuY3Rpb24gQXRtb3NwaGVyZURyYXdhYmxlKHJhZGl1cywgdlNsaWNlcywgaFNsaWNlcywgc2NhbGVGYWN0b3IpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXRtb3NwaGVyZURyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEF0bW9zcGhlcmVEcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIFBST0dSQU0sIG51bGwpO1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMudlNsaWNlcyA9IHZTbGljZXM7XG4gICAgdGhpcy5oU2xpY2VzID0gaFNsaWNlcztcbiAgICB0aGlzLnVuaWZvcm1zLnVfbm9ybWFsTWF0cml4ID0gX2dsTWF0cml4Lm1hdDMuY3JlYXRlKCk7XG4gICAgdGhpcy5zY2FsZUZhY3RvciA9IHNjYWxlRmFjdG9yIHx8IDEuMTtcbiAgICBfZ2xNYXRyaXgubWF0NC5zY2FsZSh0aGlzLmxvY2FsLCB0aGlzLmxvY2FsLCBbdGhpcy5zY2FsZUZhY3RvciwgdGhpcy5zY2FsZUZhY3RvciwgdGhpcy5zY2FsZUZhY3Rvcl0pO1xuICB9XG5cbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgdmlldyBtYXRyaWNlcyBvZiB0aGUgbW9kZWxcclxuICAgKlxyXG4gICAqIEBjaGFpbmFibGVcclxuICAgKiBAc2VlICAgIHNyYy9kcmF3YWJsZS9tb2RlbC5qcyN1cGRhdGVWaWV3XHJcbiAgICogQHBhcmFtICB7bWF0NH0gdmlld1Byb2plY3QgICBjb21iaW5lZCBwcm9qZWN0aW9uIG1hdHJpeCBtdWx0aXBsaWVkIGJ5IHZpZXcgbWF0cml4LlxyXG4gICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKEF0bW9zcGhlcmVEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICd1cGRhdGVWaWV3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVmlldyh2aWV3UHJvamVjdCkge1xuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXRtb3NwaGVyZURyYXdhYmxlLnByb3RvdHlwZSksICd1cGRhdGVWaWV3JywgdGhpcykuY2FsbCh0aGlzLCB2aWV3UHJvamVjdCk7XG4gICAgICB2YXIgaW52ZXJ0ID0gX2dsTWF0cml4Lm1hdDQuaW52ZXJ0KF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpLCB2aWV3UHJvamVjdCksXG4gICAgICAgICAgdHJhbnNwb3NlID0gX2dsTWF0cml4Lm1hdDQudHJhbnNwb3NlKF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpLCBpbnZlcnQpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X25vcm1hbE1hdHJpeCA9IF9nbE1hdHJpeC5tYXQzLmZyb21NYXQ0KF9nbE1hdHJpeC5tYXQzLmNyZWF0ZSgpLCB0cmFuc3Bvc2UpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgZHJhd2FibGVcclxuICAgICAqXHJcbiAgICAgKiBAc2VlICAgIHNyYy9kcmF3YWJsZS5qc1xyXG4gICAgICogQHBhcmFtICB7QXNzZXRNYW5hZ2VyfSBtYW5hZ2VyIFRoZSBBc3NldE1hbmFnZXIgY29udGFpbmluZyB0aGUgcmVxdWlyZWQgYXNzZXRzLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnaW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQobWFuYWdlcikge1xuICAgICAgdGhpcy5tZXNoID0gbmV3IF9tZXNoU3BoZXJlMlsnZGVmYXVsdCddKG1hbmFnZXIuX2dsLCB0aGlzLnJhZGl1cywgdGhpcy52U2xpY2VzLCB0aGlzLmhTbGljZXMpO1xuICAgICAgcmV0dXJuIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEF0bW9zcGhlcmVEcmF3YWJsZS5wcm90b3R5cGUpLCAnaW5pdCcsIHRoaXMpLmNhbGwodGhpcywgbWFuYWdlcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEF0bW9zcGhlcmVEcmF3YWJsZTtcbn0pKF9tb2RlbDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEF0bW9zcGhlcmVEcmF3YWJsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF90ZXh0dXJlZCA9IHJlcXVpcmUoJy4vdGV4dHVyZWQnKTtcblxudmFyIF90ZXh0dXJlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90ZXh0dXJlZCk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxudmFyIFBST0dSQU0gPSBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlByb2dyYW0uQmljb2xvcmVkO1xuXG4vKipcclxuICogRGVmYXVsdCBxdWFsaXR5IGNvbG9yLlxyXG4gKiBAdHlwZSB7dmVjNH1cclxuICovXG52YXIgZGVmYXVsdENvbG9yMCA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10ucXVhbGl0eUNvbG9ycy5WRVJZX1JBUkUpO1xuXG4vKipcclxuICogRGVmYXVsdCBnbG93IGNvbG9yXHJcbiAqIEB0eXBlIHt2ZWM0fVxyXG4gKi9cbnZhciBkZWZhdWx0Q29sb3IxID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS54bUNvbG9ycy5jb3JlR2xvdyk7XG5cbi8qKlxyXG4gKiBUaGlzIGlzIHVzZWQgZm9yIGl0ZW1zIGFuZCBvdGhlciByZW5kZXJhYmxlcyB0aGF0IGhhdmUgdHdvIHZpc2libGUgY29sb3JzXHJcbiAqXHJcbiAqIFRoZSBzcGVjaWZpY3Mgb2YgaXQgYXJlIGJhc2ljYWxseTogaWYgdGhlIHRleHR1cmUgaGFzIGFuIG9wYWNpdHkgbGVzcyB0aGFuIDAuNSxcclxuICogdGhlIHRleHR1cmUgY29sb3IgaXMgYmxlbmRlZCB3aXRoIHVfY29sb3IwXHJcbiAqIE90aGVyd2lzZSwgaXQncyB0aGUgdGV4dHVyZSBjb2xvciBibGVuZGVkIHdpdGggdV9jb2xvcjFcclxuICpcclxuICogT3Igc29tZXRoaW5nIGxpa2UgdGhhdC5cclxuICovXG5cbnZhciBCaWNvbG9yZWREcmF3YWJsZSA9IChmdW5jdGlvbiAoX1RleHR1cmVkRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKEJpY29sb3JlZERyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZWQgYSBiaS1jb2xvcmVkIGRyYXdhYmxlXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBtZXNoTmFtZSAgICBJbnRlcm5hbCBuYW1lIG9mIHRoZSBtZXNoIGZvciB0aGlzIGRyYXdhYmxlXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0ZXh0dXJlTmFtZSBJbnRlcm5hbCBuYW1lIG9mIHRoZSB0ZXh0dXJlIGZvciB0aGlzIGRyYXdibGVcclxuICAgKi9cblxuICBmdW5jdGlvbiBCaWNvbG9yZWREcmF3YWJsZShtZXNoTmFtZSwgdGV4dHVyZU5hbWUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmljb2xvcmVkRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQmljb2xvcmVkRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBQUk9HUkFNLCBtZXNoTmFtZSwgdGV4dHVyZU5hbWUpO1xuICAgIHRoaXMudW5pZm9ybXMudV9jb2xvcjAgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShkZWZhdWx0Q29sb3IwKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfY29sb3IxID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoZGVmYXVsdENvbG9yMSk7XG4gIH1cblxuICByZXR1cm4gQmljb2xvcmVkRHJhd2FibGU7XG59KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBCaWNvbG9yZWREcmF3YWJsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF90ZXh0dXJlZCA9IHJlcXVpcmUoJy4vdGV4dHVyZWQnKTtcblxudmFyIF90ZXh0dXJlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90ZXh0dXJlZCk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxudmFyIFBST0dSQU0gPSBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlByb2dyYW0uR2xvd3JhbXA7XG5cbi8qKlxyXG4gKiBEZWZhdWx0IGJhc2UgY29sb3IgZm9yIHRoZSBnbG93cmFtcCBkcmF3YWJsZVxyXG4gKiBAdHlwZSB7dmVjNH1cclxuICovXG52YXIgZGVmYXVsdEJhc2VDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10udGVhbUNvbG9ycy5ORVVUUkFMKTtcblxuLyoqXHJcbiAqIEEgXCJnbG93cmFtcFwiIHJlZmVycyB0byB0aGUgdXNhZ2Ugb2YgdGhlIHJlZCwgZ3JlZW4sIGFuZCBibHVlIGNoYW5uZWxzIHRvIGNyZWF0ZVxyXG4gKiBhIFwiZ2xvd2luZ1wiIHRleHR1cmUuXHJcbiAqL1xuXG52YXIgR2xvd3JhbXBEcmF3YWJsZSA9IChmdW5jdGlvbiAoX1RleHR1cmVkRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKEdsb3dyYW1wRHJhd2FibGUsIF9UZXh0dXJlZERyYXdhYmxlKTtcblxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgZ2xvd3JhbXAgZHJhd2FibGVcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc2hOYW1lICAgIEludGVybmFsIG5hbWUgb2YgdGhlIG1lc2hcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHRleHR1cmVOYW1lIEludGVybmFsIG5hbWUgb2YgdGhlIHRleHR1cmVcclxuICAgKi9cblxuICBmdW5jdGlvbiBHbG93cmFtcERyYXdhYmxlKG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHbG93cmFtcERyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEdsb3dyYW1wRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBQUk9HUkFNLCBtZXNoTmFtZSwgdGV4dHVyZU5hbWUpO1xuICAgIHRoaXMudW5pZm9ybXMudV9iYXNlQ29sb3IgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShkZWZhdWx0QmFzZUNvbG9yKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfcm90YXRpb24gPSAwO1xuICAgIHRoaXMudW5pZm9ybXMudV9yYW1wVGFyZ2V0ID0gMDtcbiAgICB0aGlzLnVuaWZvcm1zLnVfYWxwaGEgPSAwLjY7XG4gIH1cblxuICAvKipcclxuICAgKiBVcGRhdGVzIGRlZmF1bHQgZ2xvd3JhbXAgdmFyaWFibGVzIChyb3RhdGlvbiwgcmFtcCB0YXJnZXQsIGVsYXBzZWQgdGltZVxyXG4gICAqIGFuZCBhbHBoYSlcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRpY2sgVGltZSBkZWx0YSBzaW5jZSBsYXN0IHRpY2tcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgQHNlZSBzcmMvZHJhd2FibGUuanMjdXBkYXRlVGltZVxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhHbG93cmFtcERyYXdhYmxlLCBbe1xuICAgIGtleTogJ3VwZGF0ZVRpbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVUaW1lKHRpY2spIHtcbiAgICAgIHZhciByZXQgPSBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihHbG93cmFtcERyYXdhYmxlLnByb3RvdHlwZSksICd1cGRhdGVUaW1lJywgdGhpcykuY2FsbCh0aGlzLCB0aWNrKTtcbiAgICAgIHZhciBpbmMgPSB0aGlzLmVsYXBzZWQgLyA1MDAwO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X3JvdGF0aW9uID0gaW5jO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X3JhbXBUYXJnZXQgPSBNYXRoLnNpbihNYXRoLlBJIC8gMiAqIChpbmMgLSBNYXRoLmZsb29yKGluYykpKTtcbiAgICAgIHRoaXMudW5pZm9ybXMudV9hbHBoYSA9IE1hdGguc2luKGluYykgKiAwLjA1ICsgMC43NTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdsb3dyYW1wRHJhd2FibGU7XG59KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBHbG93cmFtcERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2JpY29sb3JlZCA9IHJlcXVpcmUoJy4vYmljb2xvcmVkJyk7XG5cbnZhciBfYmljb2xvcmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2JpY29sb3JlZCk7XG5cbnZhciBfeG0gPSByZXF1aXJlKCcuL3htJyk7XG5cbnZhciBfeG0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfeG0pO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxuLyoqXHJcbiAqIFRoaXMgZmlsZSBjb25zdHJ1Y3RzIHRoZSBkcmF3YWJsZSBwcmltaXRpdmVzIGZvciBtYW55IG9mIHRoZSBpbnZlbnRvcnkgaXRlbXMuXHJcbiAqL1xuXG52YXIgSW52ZW50b3J5ID0ge307XG52YXIgbWVzaGVzID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5NZXNoLkludmVudG9yeTtcbnZhciB0ZXh0dXJlcyA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZTtcblxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIG91dGVyIFwic2hlbGxcIiBmb3IgYW4geG0gaXRlbS5cclxuICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIEludGVybmFsIG5hbWUgb2YgdGhlIG1lc2hcclxuICogQHJldHVybiB7aXRlbWJhc2V9ICAgIEEgQmljb2xvcmVkRHJhd2FibGUgd2l0aCB0aGUgc3BlY2lmaWVkIG1lc2ggbmFtZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBmbGlwY2FyZCB0ZXh0dXJlXHJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlU2hlbGwobmFtZSkge1xuICB2YXIgaXRlbWJhc2UgPSAoZnVuY3Rpb24gKF9CaWNvbG9yZWREcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhpdGVtYmFzZSwgX0JpY29sb3JlZERyYXdhYmxlKTtcblxuICAgIGZ1bmN0aW9uIGl0ZW1iYXNlKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIGl0ZW1iYXNlKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaXRlbWJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBtZXNoZXNbbmFtZV0sIHRleHR1cmVzLkZsaXBDYXJkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbWJhc2U7XG4gIH0pKF9iaWNvbG9yZWQyWydkZWZhdWx0J10pO1xuXG4gIHJldHVybiBpdGVtYmFzZTtcbn1cblxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIHhtIFwiY29yZVwiIG9mIGFuIGl0ZW1cclxuICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIEludGVybmFsIG5hbWUgb2YgdGhlIHhtIG1lc2hcclxuICogQHJldHVybiB7eG1iYXNlfSAgICAgIEFuIFhtRHJhd2FibGUgd2l0aCB0aGUgc3BlY2lmaWVkIG1lc2ggbmFtZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBYbSB0ZXh0dXJlLlxyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNvcmUobmFtZSkge1xuICB2YXIgeG1iYXNlID0gKGZ1bmN0aW9uIChfWG1EcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyh4bWJhc2UsIF9YbURyYXdhYmxlKTtcblxuICAgIGZ1bmN0aW9uIHhtYmFzZSgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCB4bWJhc2UpO1xuXG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZih4bWJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBtZXNoZXNbbmFtZV0sIHRleHR1cmVzLlhtKTtcbiAgICB9XG5cbiAgICByZXR1cm4geG1iYXNlO1xuICB9KShfeG0yWydkZWZhdWx0J10pO1xuXG4gIHJldHVybiB4bWJhc2U7XG59XG5cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWVkaWEgaXRlbVxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgTWVkaWEgbWVzaCBpbnRlcm5hbCBuYW1lXHJcbiAqIEByZXR1cm4ge21lZGlhfSAgICAgICBBIFRleHR1cmVkRHJhd2FibGUgd2l0aCB0aGUgVGV4dHVyZWQgcHJvZ3JhbSxcclxuICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBzcGVjaWZpZWQgbWVzaCwgYW5kIHRoZSBmbGlwY2FyZCB0ZXh0dXJlLlxyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1lZGlhKG5hbWUpIHtcbiAgdmFyIG1lZGlhID0gKGZ1bmN0aW9uIChfVGV4dHVyZWREcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhtZWRpYSwgX1RleHR1cmVkRHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24gbWVkaWEoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgbWVkaWEpO1xuXG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihtZWRpYS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5UZXh0dXJlZCwgbWVzaGVzW25hbWVdLCBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlRleHR1cmUuRmxpcENhcmQpO1xuICAgIH1cblxuICAgIHJldHVybiBtZWRpYTtcbiAgfSkoX3RleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gbWVkaWE7XG59XG5cbmZvciAodmFyIGkgaW4gbWVzaGVzKSB7XG4gIGlmICgvXk1lZGlhLy50ZXN0KGkpKSB7XG4gICAgaWYgKGkgPT09ICdNZWRpYVBsYW5lJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIEludmVudG9yeVtpXSA9IGNyZWF0ZU1lZGlhKGkpO1xuICB9IGVsc2Uge1xuICAgIGlmICgvWG0kLy50ZXN0KGkpKSB7XG4gICAgICBJbnZlbnRvcnlbaV0gPSBjcmVhdGVDb3JlKGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBJbnZlbnRvcnlbaV0gPSBjcmVhdGVTaGVsbChpKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gSW52ZW50b3J5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vKipcclxuICogVGhlIExpbmtEcmF3YWJsZSByZXByZXNlbnRzIHRoZSBiYXNlIGNsYXNzIGZvciBsaW5rLXR5cGUgZHJhd2FibGVzLlxyXG4gKi9cblxudmFyIExpbmtEcmF3YWJsZSA9IChmdW5jdGlvbiAoX1RleHR1cmVkRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKExpbmtEcmF3YWJsZSwgX1RleHR1cmVkRHJhd2FibGUpO1xuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBsaW5rIGRyYXdhYmxlIHdpdHRoIHRoZSBnaXZlbiBwcm9ncmFtIGFuZCB0ZXh0dXJlLlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gcHJvZ3JhbU5hbWUgSW50ZXJuYWwgbmFtZSBvZiB0aGUgcHJvZ3JhbSB0byB1c2VcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHRleHR1cmVOYW1lIEludGVybmFsIG5hbWUgb2YgdGhlIHRleHR1cmUgdG8gdXNlXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gTGlua0RyYXdhYmxlKHByb2dyYW1OYW1lLCB0ZXh0dXJlTmFtZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMaW5rRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgcHJvZ3JhbU5hbWUsIG51bGwsIHRleHR1cmVOYW1lKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfY2FtZXJhRndkID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCAwLCAtMSk7XG4gICAgdGhpcy51bmlmb3Jtcy51X2VsYXBzZWRUaW1lID0gMDtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGNhbWVyYSB0cmFuc2Zvcm1zIGZvciB0aGUgbGluayBkcmF3YWJsZXNcclxuICAgKiBAcGFyYW0gIHttYXQ0fSB2aWV3UHJvamVjdCBDb21iaW5lZCB2aWV3IGFuZCBwcm9qZWN0IG1hdHJpeFxyXG4gICAqIEBwYXJhbSAge21hdDR9IHZpZXcgICAgICAgIFZpZXcgTWF0cml4XHJcbiAgICogQHBhcmFtICB7bWF0NH0gcHJvamVjdCAgICAgUHJvamVjdGlvbiBtYXRyaXhcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhMaW5rRHJhd2FibGUsIFt7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcodmlld1Byb2plY3QsIHZpZXcsIHByb2plY3QpIHtcbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKExpbmtEcmF3YWJsZS5wcm90b3R5cGUpLCAndXBkYXRlVmlldycsIHRoaXMpLmNhbGwodGhpcywgdmlld1Byb2plY3QsIHZpZXcsIHByb2plY3QpO1xuICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgdmFyIHJvdCA9IF9nbE1hdHJpeC5tYXQzLmZyb21NYXQ0KF9nbE1hdHJpeC5tYXQzLmNyZWF0ZSgpLCB2aWV3KTtcbiAgICAgICAgdmFyIHEgPSBfZ2xNYXRyaXgucXVhdC5mcm9tTWF0MyhfZ2xNYXRyaXgucXVhdC5jcmVhdGUoKSwgcm90KTtcbiAgICAgICAgdmFyIGZ3ZCA9IF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybVF1YXQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgLTEpLCBxKTtcbiAgICAgICAgX2dsTWF0cml4LnZlYzMubm9ybWFsaXplKGZ3ZCwgZndkKTtcbiAgICAgICAgdGhpcy51bmlmb3Jtcy51X2NhbWVyYUZ3ZCA9IGZ3ZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgZGVmYXVsdCBwZXJpb2RpYyB1bmlmb3JtcyBmb3IgbGlua3NcclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gZGVsdGEgVGltZSBkZWx0YSBzaW5jZSBsYXN0IGRyYXdcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgQHNlZSBzcmMvZHJhd2FibGUuanMjdXBkYXRlVGltZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVUaW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVGltZShkZWx0YSkge1xuICAgICAgdmFyIHJldCA9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKExpbmtEcmF3YWJsZS5wcm90b3R5cGUpLCAndXBkYXRlVGltZScsIHRoaXMpLmNhbGwodGhpcywgZGVsdGEpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X2VsYXBzZWRUaW1lID0gdGhpcy5lbGFwc2VkIC8gMTAwMCAlIDMwMC4wICogMC4xO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTGlua0RyYXdhYmxlO1xufSkoX3RleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTGlua0RyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2RyYXdhYmxlID0gcmVxdWlyZSgnLi4vZHJhd2FibGUnKTtcblxudmFyIF9kcmF3YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZSk7XG5cbi8qKlxyXG4gKiBBIG1lc2ggZHJhd2FibGUgaXMgYSBkcmF3YmxlIHRoYXQgc3VwcG9ydHMgYSBtZXNoXHJcbiAqIChjb25zaXN0aW5nIG9mIHZlcnRleCBhdHRyaWJ1dGVzIGFuZCBmYWNlcy9saW5lcylcclxuICogQGV4dGVuZHMge0RyYXdhYmxlfVxyXG4gKi9cblxudmFyIE1lc2hEcmF3YWJsZSA9IChmdW5jdGlvbiAoX0RyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhNZXNoRHJhd2FibGUsIF9EcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogR2l2ZW4gYSBtZXNoIGludGVybmFsIG5hbWUgYW5kIGEgcHJvZ3JhbSBpbnRlcm5hbCBuYW1lLCBjb25zdHJ1Y3RcclxuICAgKiBhIE1lc2hEcmF3YWJsZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gcHJvZ3JhbU5hbWUgUHJvZ3JhbSBpbnRlcm5hbCBuYW1lXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBtZXNoTmFtZSAgICBNZXNoIGludGVybmFsIE5hbWVcclxuICAgKi9cblxuICBmdW5jdGlvbiBNZXNoRHJhd2FibGUocHJvZ3JhbU5hbWUsIG1lc2hOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1lc2hEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihNZXNoRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBwcm9ncmFtTmFtZSk7XG4gICAgdGhpcy5tZXNoTmFtZSA9IG1lc2hOYW1lO1xuICAgIHRoaXMubWVzaCA9IG51bGw7XG4gICAgdGhpcy5kcmF3Zm4gPSB0aGlzLl9kcmF3LmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyB0aGUgZHJhd2FibGUgd2l0aCBib3VuZCByZXNvdXJjZXMgZnJvbSB0aGUgZ2l2ZW5cclxuICAgKiBtYW5hZ2VyXHJcbiAgICogQHBhcmFtICB7QXNzZXRNYW5hZ2VyfSBtYW5hZ2VyIEFzc2V0TWFuYWdlciBjb250YWluaW5nIGJvdW5kIHJlc291cmNlc1xyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZXNwb25kaW5nIHRvIHRoZSBpbnRlcm5hbCBuYW1lcyBnaXZlblxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhNZXNoRHJhd2FibGUsIFt7XG4gICAga2V5OiAnaW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQobWFuYWdlcikge1xuICAgICAgaWYgKHRoaXMubWVzaE5hbWUpIHtcbiAgICAgICAgdGhpcy5tZXNoID0gbWFuYWdlci5nZXRNZXNoKHRoaXMubWVzaE5hbWUpO1xuICAgICAgICBpZiAoIXRoaXMubWVzaCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignbWlzc2luZyBtZXNoICcgKyB0aGlzLm1lc2hOYW1lKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihNZXNoRHJhd2FibGUucHJvdG90eXBlKSwgJ2luaXQnLCB0aGlzKS5jYWxsKHRoaXMsIG1hbmFnZXIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19kcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2RyYXcobG9jYXRpb25zLCB1bmlmb3Jtcykge1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnVuaWZvcm1zKSB7XG4gICAgICAgIGlmICh0aGlzLnVuaWZvcm1zLmhhc093blByb3BlcnR5KGkpICYmIGkgaW4gdW5pZm9ybXMpIHtcbiAgICAgICAgICB1bmlmb3Jtc1tpXSh0aGlzLnVuaWZvcm1zW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5tZXNoLmRyYXcobG9jYXRpb25zKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTWVzaERyYXdhYmxlO1xufSkoX2RyYXdhYmxlMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTWVzaERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX21lc2ggPSByZXF1aXJlKCcuL21lc2gnKTtcblxudmFyIF9tZXNoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2gpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8qKlxyXG4gKiBBIE1vZGVsRHJhd2FibGUgaXMgYSBNZXNoRHJhd2FibGUgdGhhdCBzdXBwb3J0cyBsb2NhbFxyXG4gKiBhbmQgd29ybGQgdHJhbnNmb3JtcywgdWx0aW1hdGVseSBwcm92aWRpbmcgYSBgdV9tb2RlbFZpZXdQcm9qZWN0YFxyXG4gKiB1bmlmb3JtIHRvIHRoZSBzaGFkZXIuXHJcbiAqL1xuXG52YXIgTW9kZWxEcmF3YWJsZSA9IChmdW5jdGlvbiAoX01lc2hEcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoTW9kZWxEcmF3YWJsZSwgX01lc2hEcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogR2l2ZW4gYSBwcm9ncmFtIGFuZCBtZXNoLCBjb25zdHJ1Y3QgYSBNb2RlbERyYXdibGVcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHByb2dyYW1OYW1lIFByb2dyYW0gaW50ZXJuYWwgbmFtZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gbWVzaE5hbWUgICAgTWVzaCBpbnRlcm5hbCBuYW1lXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gTW9kZWxEcmF3YWJsZShwcm9ncmFtTmFtZSwgbWVzaE5hbWUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kZWxEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihNb2RlbERyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgcHJvZ3JhbU5hbWUsIG1lc2hOYW1lKTtcbiAgICB0aGlzLnZpZXdQcm9qZWN0ID0gX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG4gICAgdGhpcy5tb2RlbCA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIHRoaXMubG9jYWwgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLndvcmxkID0gX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG4gIH1cblxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGludGVybmFsIHVfbW9kZWxWaWV3UHJvamVjdCB1bmlmb3JtXHJcbiAgICogYnkgYXBwbHlpbmcgd29ybGQgYW5kIGxvY2FsIHRyYW5zZm9ybXMgdG8gdGhlIG1vZGVsXHJcbiAgICogbWF0cml4XHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKE1vZGVsRHJhd2FibGUsIFt7XG4gICAga2V5OiAndXBkYXRlTWF0cml4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlTWF0cml4KCkge1xuICAgICAgdmFyIG12cCA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgICAgX2dsTWF0cml4Lm1hdDQubXVsdGlwbHkodGhpcy5tb2RlbCwgdGhpcy53b3JsZCwgdGhpcy5sb2NhbCk7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5tdWx0aXBseShtdnAsIHRoaXMudmlld1Byb2plY3QsIHRoaXMubW9kZWwpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X21vZGVsVmlld1Byb2plY3QgPSBtdnA7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIGludGVybmFsIHZpZXdQcm9qZWN0IG1hdHJpeCAocHJvamVjdGlvbiAqIHZpZXcgbWF0cmljZXMpXHJcbiAgICAgKiBAcGFyYW0gIHttYXQ0fSB2aWV3UHJvamVjdCBQcm9qZWN0aW9uIG1hdHJpeCBtdWx0aXBsaWVkIGJ5IHZpZXcgbWF0cml4XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVZpZXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWaWV3KHZpZXdQcm9qZWN0KSB7XG4gICAgICB0aGlzLnZpZXdQcm9qZWN0ID0gdmlld1Byb2plY3Q7XG4gICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbW9kZWwgdHJhbnNmb3JtIHRvIGEgZ2l2ZW4gbWF0cml4XHJcbiAgICAgKiBAcGFyYW0ge21hdDR9IG1hdCBNYXRyaXggdG8gdXNlXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3NldE1hdHJpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldE1hdHJpeChtYXQpIHtcbiAgICAgIHRoaXMubW9kZWwgPSBtYXQ7XG4gICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIGEgbW9kZWwgYWxvbmcgc29tZSB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSAge3ZlYzN9IHZlYyAgIFRoZSB2ZWN0b3JcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndHJhbnNsYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHZlYykge1xuICAgICAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKHRoaXMubG9jYWwsIHRoaXMubG9jYWwsIHZlYyk7XG4gICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2NhbGUgYSBtb2RlbCBieSBzb21lIHZlY3RvclxyXG4gICAgICogQHBhcmFtICB7dmVjM30gdmVjICAgVGhlIHZlY3RvclxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdzY2FsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNjYWxlKHZlYykge1xuICAgICAgX2dsTWF0cml4Lm1hdDQuc2NhbGUodGhpcy5sb2NhbCwgdGhpcy5sb2NhbCwgdmVjKTtcbiAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBSb3RhdGUgYSBtb2RlbCB3aXRoIGEgcXVhdGVybmlvblxyXG4gICAgICogQHBhcmFtICB7cXVhdH0gcXVhdCAgIFRoZSBxdWF0ZXJuaW9uXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3JvdGF0ZVF1YXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByb3RhdGVRdWF0KHF1YXQpIHtcbiAgICAgIHZhciBxdWF0TWF0cml4ID0gX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5mcm9tUXVhdChxdWF0TWF0cml4LCBxdWF0KTtcbiAgICAgIF9nbE1hdHJpeC5tYXQ0Lm11bHRpcGx5KHRoaXMubG9jYWwsIHRoaXMubG9jYWwsIHF1YXRNYXRyaXgpO1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSB0aGUgbW9kZWwgYWxvbmcgdGhlIFggYXhpc1xyXG4gICAgICogQHBhcmFtICB7ZmxvYXR9IGRpc3QgIERpc3RhbmNlIHRvIHRyYW5zbGF0ZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICd0cmFuc2xhdGVYJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlWChkaXN0KSB7XG4gICAgICB0aGlzLnRyYW5zbGF0ZShfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKGRpc3QsIDAsIDApKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSB0aGUgbW9kZWwgYWxvbmcgdGhlIFkgYXhpc1xyXG4gICAgICogQHBhcmFtICB7ZmxvYXR9IGRpc3QgIERpc3RhbmNlIHRvIHRyYW5zbGF0ZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICd0cmFuc2xhdGVZJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlWShkaXN0KSB7XG4gICAgICB0aGlzLnRyYW5zbGF0ZShfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIGRpc3QsIDApKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSB0aGUgbW9kZWwgYWxvbmcgdGhlIFogYXhpc1xyXG4gICAgICogQHBhcmFtICB7ZmxvYXR9IGRpc3QgIERpc3RhbmNlIHRvIHRyYW5zbGF0ZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICd0cmFuc2xhdGVaJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlWihkaXN0KSB7XG4gICAgICB0aGlzLnRyYW5zbGF0ZShfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDAsIGRpc3QpKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFNjYWxlIGFsbCBkaW1lbnNpb25zIGJ5IHRoZSBzYW1lIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGYgVGhlIGFtb3VudCB0byBzY2FsZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdzY2FsYXJTY2FsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNjYWxhclNjYWxlKGYpIHtcbiAgICAgIHRoaXMuc2NhbGUoX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyhmLCBmLCBmKSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE1vZGVsRHJhd2FibGU7XG59KShfbWVzaDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IE1vZGVsRHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfdGV4dHVyZWQgPSByZXF1aXJlKCcuL3RleHR1cmVkJyk7XG5cbnZhciBfdGV4dHVyZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGV4dHVyZWQpO1xuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbnZhciBQUk9HUkFNID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLlJlZ2lvblRleHR1cmVkO1xuXG4vKipcclxuICogQW4gT3JuYW1lbnREcmF3YWJsZSBpcyBhIFRleHR1ZWREcmF3YWJsZSB0aGF0IGRyYXdzIGFuIG9ybmFtZW50IG9uXHJcbiAqIGEgdW5pdCBwbGFuZS5cclxuICovXG5cbnZhciBPcm5hbWVudERyYXdhYmxlID0gKGZ1bmN0aW9uIChfVGV4dHVyZWREcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoT3JuYW1lbnREcmF3YWJsZSwgX1RleHR1cmVkRHJhd2FibGUpO1xuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYW4gb3JuYW1lbnRcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc2hOYW1lICAgIEludGVybmFsIG5hbWUgb2YgdGhlIG9ybmFtZW50IG1lc2hcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHRleHR1cmVOYW1lIEludGVybmFsIG5hbWUgb2YgdGhlIHRleHR1cmVcclxuICAgKi9cblxuICBmdW5jdGlvbiBPcm5hbWVudERyYXdhYmxlKG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBPcm5hbWVudERyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKE9ybmFtZW50RHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBQUk9HUkFNLCBtZXNoTmFtZSwgdGV4dHVyZU5hbWUpO1xuICAgIHRoaXMudW5pZm9ybXMudV90ZXhDb29yZEJhc2UgPSBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKDAsIDApO1xuICAgIHRoaXMudW5pZm9ybXMudV90ZXhDb29yZEV4dGVudCA9IF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMSwgMSk7XG4gICAgdGhpcy51bmlmb3Jtcy51X2NvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS50ZWFtQ29sb3JzLkxPS0kpO1xuICB9XG5cbiAgcmV0dXJuIE9ybmFtZW50RHJhd2FibGU7XG59KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBPcm5hbWVudERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2xpbmsgPSByZXF1aXJlKCcuL2xpbmsnKTtcblxudmFyIF9saW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpbmspO1xuXG52YXIgX21lc2hQb3J0YWxMaW5rID0gcmVxdWlyZSgnLi4vbWVzaC9wb3J0YWwtbGluaycpO1xuXG52YXIgX21lc2hQb3J0YWxMaW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2hQb3J0YWxMaW5rKTtcblxuLyoqXHJcbiAqIEEgTGlua0RyYXdhYmxlIHRoYXQgcmVwcmVzZW50cyBhIGxpbmsgZnJvbSBvbmUgcG9ydGFsIHRvIGFub3RoZXJcclxuICogQGV4dGVuZHMge0xpbmtEcmF3YWJsZX1cclxuICovXG5cbnZhciBQb3J0YWxMaW5rRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9MaW5rRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFBvcnRhbExpbmtEcmF3YWJsZSwgX0xpbmtEcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgcG9ydGFsIGxpbmtcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBzdGFydCAgICAgICAgICBYLCBaIG9mIG9yaWdpbiBwb3J0YWxcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBlbmQgICAgICAgICAgICBYLCBaIG9mIGRlc3RpbmF0aW9uIHBvcnRhbFxyXG4gICAqIEBwYXJhbSAge3ZlYzR9IGNvbG9yICAgICAgICAgIENvbG9yIG9mIGxpbmtcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHN0YXJ0UGVyY2VudCBQZXJjZW50IGhlYWx0aCBvZiB0aGUgb3JpZ2luIHBvcnRhbFxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gZW5kUGVyY2VudCAgIFBlcmNlbnQgaGVhbHRoIG9mIHRoZSBkZXN0aW5hdGlvbiBwb3J0YWxcclxuICAgKi9cblxuICBmdW5jdGlvbiBQb3J0YWxMaW5rRHJhd2FibGUoc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb3J0YWxMaW5rRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUG9ydGFsTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLkxpbmssIF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZS5Qb3J0YWxMaW5rKTtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuc3RhcnRQZXJjZW50ID0gc3RhcnRQZXJjZW50O1xuICAgIHRoaXMuZW5kUGVyY2VudCA9IGVuZFBlcmNlbnQ7XG4gIH1cblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgdGhlIFBvcnRhbExpbmtNZXNoIGZvciB0aGlzIGxpbmtcclxuICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgQXNzZXRNYW5hZ2VyIHRvIGxvb2sgdXAgdGhlIHByb2dyYW0gYW5kIHRleHR1cmVcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICAgICAgU3VjY2Vzcy9mYWlsdXJlXHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKFBvcnRhbExpbmtEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICB0aGlzLm1lc2ggPSBuZXcgX21lc2hQb3J0YWxMaW5rMlsnZGVmYXVsdCddKG1hbmFnZXIuX2dsLCB0aGlzLnN0YXJ0LCB0aGlzLmVuZCwgdGhpcy5jb2xvciwgdGhpcy5zdGFydFBlcmNlbnQsIHRoaXMuZW5kUGVyY2VudCk7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUG9ydGFsTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICdpbml0JywgdGhpcykuY2FsbCh0aGlzLCBtYW5hZ2VyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUG9ydGFsTGlua0RyYXdhYmxlO1xufSkoX2xpbmsyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQb3J0YWxMaW5rRHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfbGluayA9IHJlcXVpcmUoJy4vbGluaycpO1xuXG52YXIgX2xpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGluayk7XG5cbnZhciBfbWVzaFJlc29uYXRvckxpbmsgPSByZXF1aXJlKCcuLi9tZXNoL3Jlc29uYXRvci1saW5rJyk7XG5cbnZhciBfbWVzaFJlc29uYXRvckxpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaFJlc29uYXRvckxpbmspO1xuXG4vKipcclxuICogQSBSZXNvbmF0b3JMaW5rRHJhd2FibGUgaXMgYSBMaW5rRHJhd2FibGUgdGhhdCByZXByZXNlbnRzIGEgbGlua1xyXG4gKiBiZXR3ZWVuIGEgcG9ydGFsIGFuZCBhIHJlc29uYXRvclxyXG4gKi9cblxudmFyIFJlc29uYXRvckxpbmtEcmF3YWJsZSA9IChmdW5jdGlvbiAoX0xpbmtEcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoUmVzb25hdG9yTGlua0RyYXdhYmxlLCBfTGlua0RyYXdhYmxlKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBwb3J0YWwgbGluayByZXNvbmF0b3JcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBwb3J0YWxQb3NpdGlvbiAgICAgWCxaIG9mIHRoZSBwb3J0YWwgKHVzdWFsbHkgMCwwKVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gc2xvdCAgICAgICAgICAgICBTbG90ICgwLTcpXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBkaXN0YW5jZSAgICAgICAgIFVzdWFsbHkgMC00MFxyXG4gICAqIEBwYXJhbSAge3ZlYzR9IGNvbG9yICAgICAgICAgICAgICBDb2xvciBvZiB0aGUgcmVzb25hdG9yIGxpbmsgKFRPRE86IG1ha2UgdGhpcyBkaXNjbylcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHJlc29uYXRvclBlcmNlbnQgUGVyY2VudCBoZWFsdGggb2YgdGhlIHJlc29uYXRvclxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFJlc29uYXRvckxpbmtEcmF3YWJsZShwb3J0YWxQb3NpdGlvbiwgc2xvdCwgZGlzdGFuY2UsIGNvbG9yLCByZXNvbmF0b3JQZXJjZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlc29uYXRvckxpbmtEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihSZXNvbmF0b3JMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlByb2dyYW0uTGluaywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5UZXh0dXJlLlJlc29uYXRvckxpbmspO1xuICAgIHRoaXMucG9ydGFsUG9zaXRpb24gPSBwb3J0YWxQb3NpdGlvbjtcbiAgICB0aGlzLnNsb3QgPSBzbG90O1xuICAgIHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5yZXNvbmF0b3JQZXJjZW50ID0gcmVzb25hdG9yUGVyY2VudDtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBSZXNvbmF0b3JMaW5rTWVzaCB3aXRoIHRoZSBnaXZlbiBwYXJhbXMsIGFuZCBpbml0aWFsaXplcyB0aGVcclxuICAgKiB0ZXh0dXJlL3Byb2dyYW1cclxuICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgQXNzZXRNYW5hZ2VyIGNvbnRhaW5pbmcgdGhlIHJlcXVpcmVkIHByb2dyYW0vdGV4dHVyZVxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgICAgICBTdWNjZXNzL2ZhaWx1cmVcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoUmVzb25hdG9yTGlua0RyYXdhYmxlLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIHRoaXMubWVzaCA9IG5ldyBfbWVzaFJlc29uYXRvckxpbmsyWydkZWZhdWx0J10obWFuYWdlci5fZ2wsIHRoaXMucG9ydGFsUG9zaXRpb24sIHRoaXMuc2xvdCwgdGhpcy5kaXN0YW5jZSwgdGhpcy5jb2xvciwgdGhpcy5yZXNvbmF0b3JQZXJjZW50KTtcbiAgICAgIHJldHVybiBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihSZXNvbmF0b3JMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2luaXQnLCB0aGlzKS5jYWxsKHRoaXMsIG1hbmFnZXIpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBSZXNvbmF0b3JMaW5rRHJhd2FibGU7XG59KShfbGluazJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJlc29uYXRvckxpbmtEcmF3YWJsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9iaWNvbG9yZWQgPSByZXF1aXJlKCcuL2JpY29sb3JlZCcpO1xuXG52YXIgX2JpY29sb3JlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaWNvbG9yZWQpO1xuXG52YXIgUmVzb3VyY2UgPSB7fTtcbnZhciBtZXNoZXMgPSBfY29uc3RhbnRzMlsnZGVmYXVsdCddLk1lc2guUmVzb3VyY2U7XG5cbi8qKlxyXG4gKiBDcmVhdGVzIGEgcmVzb3VyY2UgZHJhd2FibGVcclxuICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIEludGVybmFsTmFtZVxyXG4gKiBAcmV0dXJuIHtpdGVtYmFzZX0gICAgQSBCaWNvbG9yZWREcmF3YWJsZSByZXByZXNlbnRpbmcgdGhpcyByZXNvdXJjZSBpdGVtXHJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUmVzb3VyY2UobmFtZSkge1xuICB2YXIgaXRlbWJhc2UgPSAoZnVuY3Rpb24gKF9CaWNvbG9yZWREcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhpdGVtYmFzZSwgX0JpY29sb3JlZERyYXdhYmxlKTtcblxuICAgIGZ1bmN0aW9uIGl0ZW1iYXNlKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIGl0ZW1iYXNlKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaXRlbWJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBtZXNoZXNbbmFtZV0sIF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZS5GbGlwQ2FyZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1iYXNlO1xuICB9KShfYmljb2xvcmVkMlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gaXRlbWJhc2U7XG59XG5cbmZvciAodmFyIGkgaW4gbWVzaGVzKSB7XG4gIFJlc291cmNlW25hbWVdID0gY3JlYXRlUmVzb3VyY2UoaSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJlc291cmNlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5TaGllbGRFZmZlY3Q7XG5cbi8vIHRoZXNlIGRlZmF1bHRzIGFyZSB3aGFjay4gIE5lZWQgdG8gZmluZCB0aGUgcmVhbFxuLy8gZnVuY3Rpb25zIHVzZWQgdG8gdXBkYXRlIHRoZXNlLCB0b29cbi8vIEFzIG9mIDEuNjIuMCwgdGhhdCB3YXMgaW4gLi4uaW5ncmVzcy5jb21tb24uc2Nhbm5lci5iLmEuZFxuLy8gVGhlIGJha3NtYWxpIGlzIGEgbGl0dGxlIGphY2tlZCB1cCwgdGhvdWdoLlxudmFyIGRlZmF1bHRDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10udGVhbUNvbG9ycy5ORVVUUkFMKTtcbnZhciBkZWZhdWx0UmFtcFRhcmdldEludiA9IF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMC41LCAxLjMpO1xudmFyIGRlZmF1bHRDb250cmlidXRpb25zID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLjUsIDAuNSwgMC41KTtcblxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIHNoaWVsZCBpZGxlIGVmZmVjdFxyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIHByb2JhYmx5IHNob3VsZCBhY3R1YWxseSBiZSBnZW5lcmFsaXplZCBkaWZmZXJlbnRseS4uLlxyXG4gKiBBcHBhcmVudGx5IGFsbCB0aHJlZSBzaGllbGQgZWZmZWN0cyB1c2UgdGhlIHNhbWUgdGV4dHVyZSBhbmQgbWVzaCwgYnV0IGhhdmVcclxuICogZGlmZmVyZW50IHByb2dyYW1zIGFuZCB2YXJpYWJsZXMuXHJcbiAqXHJcbiAqIFNvLCBwZXJoYXBzIGEgYmV0dGVyIHdheSB3b3VsZCBiZSB0byBoYXZlIHRoZSBiYXNlIGNsYXNzIGhhcmRjb2RlIHRoZSB0ZXh0dXJlXHJcbiAqIGFuZCBtZXNoIGludGVybmFsIG5hbWVzLCBhbmQgdGhlbiB0aGUgZGVyaXZlZCBjbGFzc2VzIHBpY2sgYSBwcm9ncmFtIGFuZCBoYW5kbGVcclxuICogdGhlIHZhcmlhYmxlcy5cclxuICovXG5cbnZhciBTaGllbGRFZmZlY3REcmF3YWJsZSA9IChmdW5jdGlvbiAoX1RleHR1cmVkRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFNoaWVsZEVmZmVjdERyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIHNoaWVsZCBlZmZlY3RcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc2hOYW1lICAgIE1lc2ggaW50ZXJuYWwgbmFtZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dHVyZU5hbWUgVGV4dHVyZSBpbnRlcm5hbCBuYW1lXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gU2hpZWxkRWZmZWN0RHJhd2FibGUobWVzaE5hbWUsIHRleHR1cmVOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNoaWVsZEVmZmVjdERyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFNoaWVsZEVmZmVjdERyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgUFJPR1JBTSwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfY29sb3IgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShkZWZhdWx0Q29sb3IpO1xuICAgIHRoaXMudW5pZm9ybXMudV9yYW1wVGFyZ2V0SW52V2lkdGggPSBfZ2xNYXRyaXgudmVjMi5jbG9uZShkZWZhdWx0UmFtcFRhcmdldEludik7XG4gICAgdGhpcy51bmlmb3Jtcy51X2NvbnRyaWJ1dGlvbnNBbmRBbHBoYSA9IF9nbE1hdHJpeC52ZWMzLmNsb25lKGRlZmF1bHRDb250cmlidXRpb25zKTtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGRlZmF1bHQgdW5pZm9ybXNcclxuICAgKlxyXG4gICAqIE5vdGU6IHRoZXNlIGFyZSBub3RoaW5nIGxpa2Ugd2hhdCdzIGluIHRoZSBhcGssIGp1c3Qgc29tZSBmdW5jdGlvbnMgdGhhdFxyXG4gICAqIGhhcHBlbiB0byBsb29rIGtpbmRhIHNvcnRhIG5pY2VcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGRlbHRhIFRpbWUgc2luY2UgbGFzdCBmcmFtZVxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgUmV0dXJucyB0cnVlIHRvIGNvbnRpbnVlIHRoZSBhbmltYXRpb24uXHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKFNoaWVsZEVmZmVjdERyYXdhYmxlLCBbe1xuICAgIGtleTogJ3VwZGF0ZVRpbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVUaW1lKGRlbHRhKSB7XG4gICAgICB2YXIgcmV0ID0gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2hpZWxkRWZmZWN0RHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVRpbWUnLCB0aGlzKS5jYWxsKHRoaXMsIGRlbHRhKTtcbiAgICAgIHZhciBpbmMgPSB0aGlzLmVsYXBzZWQgLyAxMDAwMDtcbiAgICAgIC8vIHRoaXMgaXMgc28gc2hpdHR5LCBidXQgYWdhaW4sIHRoaXMgamF2YSBkZWNvbXBpbGVyIHJlYWxseSBkb2Vzbid0IGxpa2UgdGhlIGZpbGUuXG4gICAgICAvLyBUaGlzIGlzIG5vdGhpbmcgY2xvc2UgdG8gd2hhdCdzICdzdXBwb3NlZCcgdG8gaGFwcGVuIGluIHRoZXNlIHVuaWZvcm1zLCBqdXN0IGEgaGFja1xuICAgICAgLy8gdGhhdCdzIGtpbmRhIHNvcnRhIGxpa2UgdGhlIGFjdHVhbCB0aGluZy5cbiAgICAgIHRoaXMudW5pZm9ybXMudV9yYW1wVGFyZ2V0SW52V2lkdGhbMF0gPSAtKGluYyAtIE1hdGguZmxvb3IoaW5jKSk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfcmFtcFRhcmdldEludldpZHRoWzFdID0gTWF0aC5zaW4oKGluYyAtIE1hdGguZmxvb3IoaW5jKSkgKiBNYXRoLlBJIC8gMik7XG4gICAgICAvLyB1X2NvbnRyaWJ1dGlvbnNBbmRBbHBoYT9cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNoaWVsZEVmZmVjdERyYXdhYmxlO1xufSkoX3RleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU2hpZWxkRWZmZWN0RHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfbGluayA9IHJlcXVpcmUoJy4vbGluaycpO1xuXG52YXIgX2xpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGluayk7XG5cbnZhciBfbWVzaFNwaGVyaWNhbFBvcnRhbExpbmsgPSByZXF1aXJlKCcuLi9tZXNoL3NwaGVyaWNhbC1wb3J0YWwtbGluaycpO1xuXG52YXIgX21lc2hTcGhlcmljYWxQb3J0YWxMaW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2hTcGhlcmljYWxQb3J0YWxMaW5rKTtcblxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBwb3J0YWwgbGluayB0aGF0IGZvbGxvd3MgdGhlIHN1cmZhY2Ugb2YgYSBzcGhlcmUuXHJcbiAqXHJcbiAqIEhvb3JheSBmb3IgY3VzdG9tIHNoYWRlcnMsIGV0YyFcclxuICovXG5cbnZhciBTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9MaW5rRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFNwaGVyaWNhbFBvcnRhbExpbmtEcmF3YWJsZSwgX0xpbmtEcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgc3BoZXJpY2FsIHBvcnRhbCBsaW5rXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBzcGhlcmVSYWRpdXMgUmFkaXVzIG9mIHRoZSBzcGhlcmVcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBzdGFydCAgICAgICAgICBMYXQsbG5nIG9mIHRoZSBvcmlnaW4gcG9ydGFsXHJcbiAgICogQHBhcmFtICB7dmVjMn0gZW5kICAgICAgICAgICAgTGF0LGxuZyBvZiB0aGUgZGVzdGluYXRpb24gcG9ydGFsXHJcbiAgICogQHBhcmFtICB7dmVjNH0gY29sb3IgICAgICAgICAgQ29sb3Igb2YgdGhlIGxpbmtcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHN0YXJ0UGVyY2VudCBQZXJjZW50IGhlYWx0aCBvZiB0aGUgb3JpZ2luIHBvcnRhbFxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gZW5kUGVyY2VudCAgIFBlcmNlbnQgaGVhbHRoIG9mIHRoZSBkZXN0aW5hdGlvbiBwb3J0YWxcclxuICAgKi9cblxuICBmdW5jdGlvbiBTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUoc3BoZXJlUmFkaXVzLCBzdGFydCwgZW5kLCBjb2xvciwgc3RhcnRQZXJjZW50LCBlbmRQZXJjZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNwaGVyaWNhbFBvcnRhbExpbmtEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlByb2dyYW0uU3BoZXJpY2FsTGluaywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5UZXh0dXJlLlBvcnRhbExpbmspO1xuICAgIHRoaXMucmFkaXVzID0gc3BoZXJlUmFkaXVzO1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5zdGFydFBlcmNlbnQgPSBzdGFydFBlcmNlbnQ7XG4gICAgdGhpcy5lbmRQZXJjZW50ID0gZW5kUGVyY2VudDtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBtZXNoIGZvciB0aGUgbGluaywgdGhlbiBpbml0aWFsaXplcyB0aGUgcmVtYWluaW5nIGFzc2V0cy5cclxuICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgQXNzZXRNYW5hZ2VyIGNvbnRhaW5pbmcgdGhlIHByb2dyYW0vdGV4dHVyZVxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgICAgICBTdWNjZXNzL2ZhaWx1cmVcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoU3BoZXJpY2FsUG9ydGFsTGlua0RyYXdhYmxlLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIHRoaXMubWVzaCA9IG5ldyBfbWVzaFNwaGVyaWNhbFBvcnRhbExpbmsyWydkZWZhdWx0J10obWFuYWdlci5fZ2wsIHRoaXMucmFkaXVzLCB0aGlzLnN0YXJ0LCB0aGlzLmVuZCwgdGhpcy5jb2xvciwgdGhpcy5zdGFydFBlcmNlbnQsIHRoaXMuZW5kUGVyY2VudCk7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3BoZXJpY2FsUG9ydGFsTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICdpbml0JywgdGhpcykuY2FsbCh0aGlzLCBtYW5hZ2VyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVWaWV3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVmlldyh2aWV3UHJvamVjdCwgdmlldywgcHJvamVjdCkge1xuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3BoZXJpY2FsUG9ydGFsTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICd1cGRhdGVWaWV3JywgdGhpcykuY2FsbCh0aGlzLCB2aWV3UHJvamVjdCwgdmlldywgcHJvamVjdCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfbW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGU7XG59KShfbGluazJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFNwaGVyaWNhbFBvcnRhbExpbmtEcmF3YWJsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF90ZXh0dXJlZCA9IHJlcXVpcmUoJy4vdGV4dHVyZWQnKTtcblxudmFyIF90ZXh0dXJlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90ZXh0dXJlZCk7XG5cbnZhciBfbWVzaFNwaGVyZSA9IHJlcXVpcmUoJy4uL21lc2gvc3BoZXJlJyk7XG5cbnZhciBfbWVzaFNwaGVyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNoU3BoZXJlKTtcblxudmFyIFBST0dSQU0gPSBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlByb2dyYW0uVGV4dHVyZWQ7XG5cbi8qKlxyXG4gKiBBIHNwaGVyZSB3aXRoIGEgdGV4dHVyZSBtYXBwZWQgdG8gaXRcclxuICovXG5cbnZhciBUZXh0dXJlZFNwaGVyZURyYXdhYmxlID0gKGZ1bmN0aW9uIChfVGV4dHVyZWREcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoVGV4dHVyZWRTcGhlcmVEcmF3YWJsZSwgX1RleHR1cmVkRHJhd2FibGUpO1xuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIHRleHR1cmVkIHNwaGVyZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dHVyZU5hbWUgSW50ZXJuYWwgbmFtZSBvZiB0aGUgdGV4dHVyZSB0byB1c2VcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHJhZGl1cyAgICAgIFJhZGl1cyBvZiB0aGUgc3BoZXJlXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSB2U2xpY2VzICAgICBOdW1iZXIgb2YgdmVydGljYWwgc2xpY2VzXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBoU2xpY2VzICAgICBOdW1iZXIgb2YgaG9yaXpvbnRhbCBzbGljZXNcclxuICAgKi9cblxuICBmdW5jdGlvbiBUZXh0dXJlZFNwaGVyZURyYXdhYmxlKHRleHR1cmVOYW1lLCByYWRpdXMsIHZTbGljZXMsIGhTbGljZXMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGV4dHVyZWRTcGhlcmVEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihUZXh0dXJlZFNwaGVyZURyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgUFJPR1JBTSwgbnVsbCwgdGV4dHVyZU5hbWUpO1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMudlNsaWNlcyA9IHZTbGljZXM7XG4gICAgdGhpcy5oU2xpY2VzID0gaFNsaWNlcztcbiAgfVxuXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHNwaGVyZSBtZXNoIGFuZCBpbml0aWFsaXplIHRoZSBvdGhlciByZXNvdXJjZXNcclxuICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgQXNzZXRNYW5hZ2VyIGNvbnRhaW5pbmcgdGhlIHRleHR1cmUvcHJvZ3JhbVxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgICAgICBTdWNjZXNzL2ZhaWx1cmVcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoVGV4dHVyZWRTcGhlcmVEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICB0aGlzLm1lc2ggPSBuZXcgX21lc2hTcGhlcmUyWydkZWZhdWx0J10obWFuYWdlci5fZ2wsIHRoaXMucmFkaXVzLCB0aGlzLnZTbGljZXMsIHRoaXMuaFNsaWNlcyk7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV4dHVyZWRTcGhlcmVEcmF3YWJsZS5wcm90b3R5cGUpLCAnaW5pdCcsIHRoaXMpLmNhbGwodGhpcywgbWFuYWdlcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFRleHR1cmVkU3BoZXJlRHJhd2FibGU7XG59KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBUZXh0dXJlZFNwaGVyZURyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX21vZGVsID0gcmVxdWlyZSgnLi9tb2RlbCcpO1xuXG52YXIgX21vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vZGVsKTtcblxuLyoqXHJcbiAqIEEgVGV4dHVyZWREcmF3YWJsZSBpcyBhIE1vZGVsRHJhd2FibGUgd2l0aCBhIHNwZWNpZmljIHRleHR1cmVcclxuICovXG5cbnZhciBUZXh0dXJlZERyYXdhYmxlID0gKGZ1bmN0aW9uIChfTW9kZWxEcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoVGV4dHVyZWREcmF3YWJsZSwgX01vZGVsRHJhd2FibGUpO1xuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIHRleHR1cmVkIGRyYXdhYmxlLCBnaXZlbiBhIHByb2dyYW0sIG1lc2gsIGFuZCB0ZXh0dXJlXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwcm9ncmFtTmFtZSBQcm9ncmFtIGludGVybmFsIG5hbWVcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc2hOYW1lICAgIE1lc2ggaW50ZXJuYWwgbmFtZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dHVyZU5hbWUgVGV4dHVyZSBpbnRlcm5hbCBuYW1lXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gVGV4dHVyZWREcmF3YWJsZShwcm9ncmFtTmFtZSwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRleHR1cmVkRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV4dHVyZWREcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb2dyYW1OYW1lLCBtZXNoTmFtZSk7XG4gICAgdGhpcy50ZXh0dXJlTmFtZSA9IHRleHR1cmVOYW1lO1xuICAgIHRoaXMudGV4dHVyZSA9IG51bGw7XG4gIH1cblxuICAvKipcclxuICAgKiBEcmF3IHRoZSB0ZXh0dXJlZCBvYmplY3RcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoVGV4dHVyZWREcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgIHRoaXMudGV4dHVyZS51c2UoMCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfdGV4dHVyZSA9IDA7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihUZXh0dXJlZERyYXdhYmxlLnByb3RvdHlwZSksICdkcmF3JywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhlIHRleHR1cmUsIHRoZW4gaW5pdGlhbGl6ZSBvdGhlciByZXNvdXJjZXNcclxuICAgICAqIEBwYXJhbSAge0Fzc2V0TWFuYWdlcn0gbWFuYWdlciBBc3NldE1hbmFnZXIgY29udGFpbmluZyB0aGUgdGV4dHVyZSBhbmQgb3RoZXIgcmVzb3VyY2VzXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICAgICAgU3VjY2Vzcy9mYWlsdXJlXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIGlmICh0aGlzLnRleHR1cmVOYW1lKSB7XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IG1hbmFnZXIuZ2V0VGV4dHVyZSh0aGlzLnRleHR1cmVOYW1lKTtcbiAgICAgICAgaWYgKCF0aGlzLnRleHR1cmUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ21pc3NpbmcgdGV4dHVyZSAnICsgdGhpcy50ZXh0dXJlTmFtZSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV4dHVyZWREcmF3YWJsZS5wcm90b3R5cGUpLCAnaW5pdCcsIHRoaXMpLmNhbGwodGhpcywgbWFuYWdlcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFRleHR1cmVkRHJhd2FibGU7XG59KShfbW9kZWwyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBUZXh0dXJlZERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2dsb3dyYW1wID0gcmVxdWlyZSgnLi9nbG93cmFtcCcpO1xuXG52YXIgX2dsb3dyYW1wMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsb3dyYW1wKTtcblxudmFyIF9iaWNvbG9yZWQgPSByZXF1aXJlKCcuL2JpY29sb3JlZCcpO1xuXG52YXIgX2JpY29sb3JlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaWNvbG9yZWQpO1xuXG52YXIgX3NoaWVsZEVmZmVjdCA9IHJlcXVpcmUoJy4vc2hpZWxkLWVmZmVjdCcpO1xuXG52YXIgX3NoaWVsZEVmZmVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaGllbGRFZmZlY3QpO1xuXG52YXIgX29ybmFtZW50ID0gcmVxdWlyZSgnLi9vcm5hbWVudCcpO1xuXG52YXIgX29ybmFtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29ybmFtZW50KTtcblxuLyoqXHJcbiAqIFZhcmlvdXMgd29ybGQgZHJhd2FibGVzXHJcbiAqXHJcbiAqIEluY2x1ZGVzIFBvcnRhbCwgU2hpZWxkRWZmZWN0LCB3YXlwb2ludHMsIHJlc29uYXRvcnMsIGFuZCBhcnRpZmFjdCBnbG93c1xyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cbnZhciBXb3JsZCA9IHt9O1xudmFyIG1lc2hlcyA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uTWVzaC5Xb3JsZDtcbnZhciB0ZXh0dXJlcyA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZTtcblxuZnVuY3Rpb24gbWFrZUdsb3dyYW1wKG1lc2gsIHRleHR1cmUpIHtcbiAgdmFyIGdsb3dyYW1wYmFzZSA9IChmdW5jdGlvbiAoX0dsb3dyYW1wRHJhd2FibGUpIHtcbiAgICBfaW5oZXJpdHMoZ2xvd3JhbXBiYXNlLCBfR2xvd3JhbXBEcmF3YWJsZSk7XG5cbiAgICBmdW5jdGlvbiBnbG93cmFtcGJhc2UoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgZ2xvd3JhbXBiYXNlKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvd3JhbXBiYXNlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgbWVzaCwgdGV4dHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdsb3dyYW1wYmFzZTtcbiAgfSkoX2dsb3dyYW1wMlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gZ2xvd3JhbXBiYXNlO1xufVxuXG5mdW5jdGlvbiBtYWtlQmljb2xvcmVkKG1lc2gsIHRleHR1cmUpIHtcbiAgdmFyIGJpY29sb3JlZGJhc2UgPSAoZnVuY3Rpb24gKF9CaWNvbG9yZWREcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhiaWNvbG9yZWRiYXNlLCBfQmljb2xvcmVkRHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24gYmljb2xvcmVkYmFzZSgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBiaWNvbG9yZWRiYXNlKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoYmljb2xvcmVkYmFzZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIG1lc2gsIHRleHR1cmUpO1xuICAgIH1cblxuICAgIHJldHVybiBiaWNvbG9yZWRiYXNlO1xuICB9KShfYmljb2xvcmVkMlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gYmljb2xvcmVkYmFzZTtcbn1cblxuZnVuY3Rpb24gbWFrZVNoaWVsZEVmZmVjdChtZXNoLCB0ZXh0dXJlKSB7XG4gIHZhciBzaGllbGRlZmZlY3RiYXNlID0gKGZ1bmN0aW9uIChfU2hpZWxkRWZmZWN0RHJhd2FibGUpIHtcbiAgICBfaW5oZXJpdHMoc2hpZWxkZWZmZWN0YmFzZSwgX1NoaWVsZEVmZmVjdERyYXdhYmxlKTtcblxuICAgIGZ1bmN0aW9uIHNoaWVsZGVmZmVjdGJhc2UoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgc2hpZWxkZWZmZWN0YmFzZSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKHNoaWVsZGVmZmVjdGJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBtZXNoLCB0ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hpZWxkZWZmZWN0YmFzZTtcbiAgfSkoX3NoaWVsZEVmZmVjdDJbJ2RlZmF1bHQnXSk7XG5cbiAgcmV0dXJuIHNoaWVsZGVmZmVjdGJhc2U7XG59XG5cbmZ1bmN0aW9uIG1ha2VPcm5hbWVudChtZXNoLCB0ZXh0dXJlKSB7XG4gIHZhciBvcm5hbWVudGJhc2UgPSAoZnVuY3Rpb24gKF9Pcm5hbWVudERyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKG9ybmFtZW50YmFzZSwgX09ybmFtZW50RHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24gb3JuYW1lbnRiYXNlKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIG9ybmFtZW50YmFzZSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9ybmFtZW50YmFzZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIG1lc2gsIHRleHR1cmUpO1xuICAgIH1cblxuICAgIHJldHVybiBvcm5hbWVudGJhc2U7XG4gIH0pKF9vcm5hbWVudDJbJ2RlZmF1bHQnXSk7XG5cbiAgcmV0dXJuIG9ybmFtZW50YmFzZTtcbn1cblxuV29ybGQuUG9ydGFsID0gbWFrZUdsb3dyYW1wKG1lc2hlcy5Qb3J0YWwsIHRleHR1cmVzLkdsb3dyYW1wKTtcbldvcmxkLldheXBvaW50ID0gbWFrZUdsb3dyYW1wKG1lc2hlcy5XYXlwb2ludCwgdGV4dHVyZXMuV2F5cG9pbnQpO1xuV29ybGQuQXJ0aWZhY3RzUmVkR2xvdyA9IG1ha2VHbG93cmFtcChtZXNoZXMuQXJ0aWZhY3RzUmVkR2xvdywgdGV4dHVyZXMuQ29sb3JHbG93KTtcbldvcmxkLkFydGlmYWN0c0dyZWVuR2xvdyA9IG1ha2VHbG93cmFtcChtZXNoZXMuQXJ0aWZhY3RzR3JlZW5HbG93LCB0ZXh0dXJlcy5Db2xvckdsb3cpO1xuV29ybGQuQXJ0aWZhY3RzUHVycGxlR2xvdyA9IG1ha2VHbG93cmFtcChtZXNoZXMuQXJ0aWZhY3RzUHVycGxlR2xvdywgdGV4dHVyZXMuQ29sb3JHbG93KTtcbldvcmxkLkFydGlmYWN0c1RhcmdldEdsb3cgPSBtYWtlR2xvd3JhbXAobWVzaGVzLkFydGlmYWN0c1RhcmdldEdsb3csIHRleHR1cmVzLlRhcmdldEdsb3cpO1xuXG5Xb3JsZC5TaGllbGQgPSBtYWtlU2hpZWxkRWZmZWN0KG1lc2hlcy5TaGllbGQsIHRleHR1cmVzLlNoaWVsZEVmZmVjdCk7XG5Xb3JsZC5SZXNvbmF0b3IgPSBtYWtlQmljb2xvcmVkKG1lc2hlcy5SZXNvbmF0b3IsIHRleHR1cmVzLkZsaXBDYXJkKTtcblxuV29ybGQuT3JuYW1lbnRNZWV0dXBQb2ludCA9IG1ha2VPcm5hbWVudChtZXNoZXMuT3JuYW1lbnRNZWV0dXBQb2ludCwgdGV4dHVyZXMuT3JuYW1lbnRNZWV0dXBQb2ludCk7XG5Xb3JsZC5Pcm5hbWVudEZpbmlzaFBvaW50ID0gbWFrZU9ybmFtZW50KG1lc2hlcy5Pcm5hbWVudEZpbmlzaFBvaW50LCB0ZXh0dXJlcy5Pcm5hbWVudEZpbmlzaFBvaW50KTtcbldvcmxkLk9ybmFtZW50Q2x1c3RlciA9IG1ha2VPcm5hbWVudChtZXNoZXMuT3JuYW1lbnRDbHVzdGVyLCB0ZXh0dXJlcy5Pcm5hbWVudENsdXN0ZXIpO1xuV29ybGQuT3JuYW1lbnRWb2xhdGlsZSA9IG1ha2VPcm5hbWVudChtZXNoZXMuT3JuYW1lbnRWb2xhdGlsZSwgdGV4dHVyZXMuT3JuYW1lbnRWb2xhdGlsZSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFdvcmxkO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5YbTtcbnZhciBkZWZhdWx0VGVhbUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS54bUNvbG9ycy5jb3JlR2xvdyk7XG52YXIgZGVmYXVsdEFsdENvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS54bUNvbG9ycy5jb3JlR2xvd0FsdCk7XG5cbi8qKlxyXG4gKiBBbiBYbURyYXdhYmxlIGlzIGEgZHJhd2FibGUgcmVwcmVzZW50aW5nIHRoZSBhbmltYXRlIFwieG0gY29yZVwiIG9mIGludmVudG9yeSBpdGVtc1xyXG4gKi9cblxudmFyIFhtRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9UZXh0dXJlZERyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhYbURyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGFuIHhtIGNvcmVcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc2hOYW1lICAgIE1lc2ggaW50ZXJuYWwgbmFtZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dHVyZU5hbWUgVGV4dHVyZSBpbnRlcm5hbCBuYW1lXHJcbiAgICogQHBhcmFtICB7dmVjNH0gdGVhbUNvbG9yICAgICBDb2xvciBvZiB0aGUgeG0gZ2xvdy5cclxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKi9cblxuICBmdW5jdGlvbiBYbURyYXdhYmxlKG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSwgdGVhbUNvbG9yKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFhtRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoWG1EcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIFBST0dSQU0sIG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSk7XG4gICAgdGhpcy51bmlmb3Jtcy51X2VsYXBzZWRUaW1lID0gMDtcbiAgICB0aGlzLnVuaWZvcm1zLnVfdGVhbUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUodGVhbUNvbG9yIHx8IGRlZmF1bHRUZWFtQ29sb3IpO1xuICAgIHRoaXMudW5pZm9ybXMudV9hbHRDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGRlZmF1bHRBbHRDb2xvcik7XG4gIH1cblxuICAvKipcclxuICAgKiBBbmltYXRlcyB0aGUgeG0gY29yZVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gZGVsdGEgVGltZSBzaW5jZSBsYXN0IGZyYW1lXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICBSZXR1cm5zIHRydWUgdG8gY29udGludWUgdGhlIGFuaW1hdGlvbi5cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoWG1EcmF3YWJsZSwgW3tcbiAgICBrZXk6ICd1cGRhdGVUaW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVGltZShkZWx0YSkge1xuICAgICAgdmFyIHJldCA9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFhtRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVRpbWUnLCB0aGlzKS5jYWxsKHRoaXMsIGRlbHRhKTtcbiAgICAgIHRoaXMudW5pZm9ybXMudV9lbGFwc2VkVGltZSA9IHRoaXMuZWxhcHNlZCAvIDEwMDAgJSAzMDAuMCAqIDAuMTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFhtRHJhd2FibGU7XG59KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBYbURyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9hc3NldE1hbmFnZXIgPSByZXF1aXJlKCcuL2Fzc2V0LW1hbmFnZXInKTtcblxudmFyIF9hc3NldE1hbmFnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzZXRNYW5hZ2VyKTtcblxudmFyIF9yZW5kZXJlck9iamVjdCA9IHJlcXVpcmUoJy4vcmVuZGVyZXIvb2JqZWN0Jyk7XG5cbnZhciBfcmVuZGVyZXJPYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVuZGVyZXJPYmplY3QpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQgPSByZXF1aXJlKCcuL2RyYXdhYmxlL3dvcmxkJyk7XG5cbnZhciBfZHJhd2FibGVXb3JsZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVdvcmxkKTtcblxudmFyIF9kcmF3YWJsZVJlc291cmNlID0gcmVxdWlyZSgnLi9kcmF3YWJsZS9yZXNvdXJjZScpO1xuXG52YXIgX2RyYXdhYmxlUmVzb3VyY2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVSZXNvdXJjZSk7XG5cbnZhciBfZHJhd2FibGVJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2RyYXdhYmxlL2ludmVudG9yeScpO1xuXG52YXIgX2RyYXdhYmxlSW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlSW52ZW50b3J5KTtcblxudmFyIF9lbnRpdHlJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2VudGl0eS9pbnZlbnRvcnknKTtcblxudmFyIF9lbnRpdHlJbnZlbnRvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5SW52ZW50b3J5KTtcblxudmFyIF9lbnRpdHlQb3J0YWwgPSByZXF1aXJlKCcuL2VudGl0eS9wb3J0YWwnKTtcblxudmFyIF9lbnRpdHlQb3J0YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5UG9ydGFsKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vKipcclxuICogVGhlIEVuZ2luZSBwcm92aWRlcyBuZWFybHkgYWxsIHRoZSBtZWNoYW5pY3MgZm9yIGFjdHVhbGx5IGRyYXdpbmcgdGhpbmdzIHRvIGEgY2FudmFzLlxyXG4gKlxyXG4gKiBBbHNvIGluY2x1ZGVzIGEgZmV3IHNpbXBsZSBmdW5jdGlvbnMgZm9yIGRlbW9pbmcgdmFyaW91cyBlbnRpdGllcy9kcmF3YWJsZXMuICBUaGlzXHJcbiAqIHdpbGwgcHJvYmFibHkgZ28gYXdheSBpbiBhIGZ1dHVyZSByZWxlYXNlLlxyXG4gKi9cblxudmFyIEVuZ2luZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhbiBlbmdpbmUsIGdpdmVuIGEgY2FudmFzIHRvIHJlbmRlciBvbiBhbmQgYSBsaXN0IG9mIGFzc2V0cyB0byBzZWVkXHJcbiAgICogaXRzIEFzc2V0TWFuYWdlciB3aXRoLlxyXG4gICAqIEBwYXJhbSAge0hUTUxDYW52YXN9IGNhbnZhcyAgICAgICBBIENhbnZhcyBlbGVtZW50XHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBhc3NldHMgICAgICAgICAgIEEgbWFuaWZlc3QgdG8gcGFzcyB0byB0aGUgaW50ZXJuYWwgQXNzZXRNYW5hZ2VyXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBzZWUgIEFzc2V0TWFuYWdlclxyXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IGVuYWJsZVNuYXBzaG90cyBJZiBzZXQgdG8gdHJ1ZSwgdGhlIGNhbnZhcyB3aWxsIHByZXNlcnZlIGl0cyBkcmF3aW5nXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciwgdG8gYWxsb3cgZm9yIGFjY3VyYXRlIC50b0RhdGFVUkwgY2FsbHMuXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgd2lsbCBoYXZlIGEgcGVyZm9ybWFuY2UgaW1wYWN0LlxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEVuZ2luZShjYW52YXMsIGFzc2V0cywgZW5hYmxlU25hcHNob3RzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVuZ2luZSk7XG5cbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB2YXIgb3B0ID0ge307XG4gICAgaWYgKGVuYWJsZVNuYXBzaG90cykge1xuICAgICAgb3B0LnByZXNlcnZlRHJhd2luZ0J1ZmZlciA9IHRydWU7XG4gICAgfVxuICAgIHZhciBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcsIG9wdCkgfHwgY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcsIG9wdCk7XG4gICAgaWYgKCFnbCkge1xuICAgICAgdGhyb3cgJ0NvdWxkIG5vdCBpbml0aWFsaXplIHdlYmdsJztcbiAgICB9XG4gICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xuICAgIHRoaXMuZ2wgPSBnbDtcbiAgICB0aGlzLnZpZXcgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICBfZ2xNYXRyaXgubWF0NC5sb29rQXQodGhpcy52aWV3LCBbMC4wLCAyMC4wLCAyNS4wXSwgWzAuMCwgMTAuMCwgMC4wXSwgWzAuMCwgMS4wLCAwLjBdKTtcblxuICAgIC8vIHRoaXMgc2hvdWxkIGJlIGluIHJhZGlhbnMsIG5vdCBkZWdyZWVzLlxuICAgIHRoaXMuaEZvViA9IE1hdGguUEkgLyA0O1xuXG4gICAgdGhpcy5mYXIgPSAxMDA7XG4gICAgdGhpcy5wcm9qZWN0ID0gX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG4gICAgdGhpcy5hc3NldE1hbmFnZXIgPSBuZXcgX2Fzc2V0TWFuYWdlcjJbJ2RlZmF1bHQnXSh0aGlzLmdsLCBhc3NldHMpO1xuICAgIHRoaXMub2JqZWN0UmVuZGVyZXIgPSBuZXcgX3JlbmRlcmVyT2JqZWN0MlsnZGVmYXVsdCddKHRoaXMuZ2wsIHRoaXMuYXNzZXRNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2l6ZShjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLmxhc3QgPSBudWxsO1xuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5jbGVhcmVkID0gZmFsc2U7XG4gICAgdGhpcy5mcmFtZSA9IG51bGw7XG4gIH1cblxuICAvKipcclxuICAgKiBSZXNpemUgdGhlIGNhbnZhcyBhbmQgdmlld3BvcnQgdG8gbmV3IGRpbWVuc2lvbnNcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHdpZHRoICBXaWR0aCwgaW4gcGl4ZWxzXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBoZWlnaHQgSGVpZ2gsIGluIHBpeGVsc1xyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKEVuZ2luZSwgW3tcbiAgICBrZXk6ICdyZXNpemUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnJlbnQgZHJhd2luZyB2aWV3cG9ydCB0byB0aGUgY2FudmFzJyBjdXJyZW50IGRpbWVuc2lvbnNcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVZpZXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWaWV3KCkge1xuICAgICAgdGhpcy5wcm9qZWN0ID0gX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5wZXJzcGVjdGl2ZSh0aGlzLnByb2plY3QsIHRoaXMuaEZvViwgdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLmNhbnZhcy5oZWlnaHQsIDAuMSwgdGhpcy5mYXIpO1xuICAgICAgdGhpcy5vYmplY3RSZW5kZXJlci51cGRhdGVWaWV3KHRoaXMudmlldywgdGhpcy5wcm9qZWN0KTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFN0b3BzIHRoZSByZW5kZXIgbG9vcCwgaWYgaXQncyBydW5uaW5nLlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnc3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgICB0aGlzLmNsZWFyZWQgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmZyYW1lKSB7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEFkZHMgb25lIG9mIGVhY2ggaW52ZW50b3J5IGl0ZW0sIGFuZCBhIHBvcnRhbCwgdG8gdGhlIHNjZW5lXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdkZW1vRW50aXRpZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZW1vRW50aXRpZXMoKSB7XG4gICAgICB2YXIgeCA9IC01LFxuICAgICAgICAgIHkgPSAwLFxuICAgICAgICAgIHogPSA0O1xuICAgICAgdmFyIGksIGl0ZW07XG4gICAgICBmb3IgKGkgaW4gX2VudGl0eUludmVudG9yeTJbJ2RlZmF1bHQnXSkge1xuICAgICAgICBpdGVtID0gbmV3IF9lbnRpdHlJbnZlbnRvcnkyWydkZWZhdWx0J11baV0odGhpcyk7XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgaXRlbS50cmFuc2xhdGUoX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyh4LCB5LCB6KSk7XG4gICAgICAgICAgeCsrO1xuICAgICAgICAgIGlmICh4ID4gNSkge1xuICAgICAgICAgICAgeCA9IC01O1xuICAgICAgICAgICAgei0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZygnYWRkZWQgJyArIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgcG9ydGFsID0gbmV3IF9lbnRpdHlQb3J0YWwyWydkZWZhdWx0J10odGhpcyk7XG4gICAgICBwb3J0YWwudHJhbnNsYXRlKF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoeCwgeSwgeikpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQWRkcyBvbmUgb2YgZWFjaCBkcmF3YWJsZSB0byB0aGUgc2NlbmVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2RlbW8nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZW1vKCkge1xuICAgICAgdmFyIHggPSAtNSxcbiAgICAgICAgICB5ID0gMCxcbiAgICAgICAgICB6ID0gNDtcbiAgICAgIHZhciBpLCBpdGVtO1xuICAgICAgZm9yIChpIGluIF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXSkge1xuICAgICAgICBpdGVtID0gbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXVtpXSgpO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgIF9nbE1hdHJpeC5tYXQ0LnRyYW5zbGF0ZShpdGVtLndvcmxkLCBpdGVtLndvcmxkLCBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHgsIHksIHopKTtcbiAgICAgICAgICB4Kys7XG4gICAgICAgICAgaWYgKHggPiA1KSB7XG4gICAgICAgICAgICB4ID0gLTU7XG4gICAgICAgICAgICB6LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub2JqZWN0UmVuZGVyZXIuYWRkRHJhd2FibGUoaXRlbSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FkZGVkICcgKyBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgaW4gX2RyYXdhYmxlUmVzb3VyY2UyWydkZWZhdWx0J10pIHtcbiAgICAgICAgaXRlbSA9IG5ldyBfZHJhd2FibGVSZXNvdXJjZTJbJ2RlZmF1bHQnXVtpXSgpO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgIF9nbE1hdHJpeC5tYXQ0LnRyYW5zbGF0ZShpdGVtLndvcmxkLCBpdGVtLndvcmxkLCBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHgsIHksIHopKTtcbiAgICAgICAgICB4Kys7XG4gICAgICAgICAgaWYgKHggPiA1KSB7XG4gICAgICAgICAgICB4ID0gLTU7XG4gICAgICAgICAgICB6LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub2JqZWN0UmVuZGVyZXIuYWRkRHJhd2FibGUoaXRlbSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FkZGVkICcgKyBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgaW4gX2RyYXdhYmxlV29ybGQyWydkZWZhdWx0J10pIHtcbiAgICAgICAgaXRlbSA9IG5ldyBfZHJhd2FibGVXb3JsZDJbJ2RlZmF1bHQnXVtpXSgpO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgIF9nbE1hdHJpeC5tYXQ0LnRyYW5zbGF0ZShpdGVtLndvcmxkLCBpdGVtLndvcmxkLCBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHgsIHksIHopKTtcbiAgICAgICAgICB4Kys7XG4gICAgICAgICAgaWYgKHggPiA1KSB7XG4gICAgICAgICAgICB4ID0gLTU7XG4gICAgICAgICAgICB6LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub2JqZWN0UmVuZGVyZXIuYWRkRHJhd2FibGUoaXRlbSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FkZGVkICcgKyBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogRHJhdyBhIHNpbmdsZSBmcmFtZSwgd2l0aCBhIHNwZWNpZmllZCB0aW1lIHNpbmNlIGxhc3QgZHJhd1xyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBkZWx0YSBUaW1lIHNpbmNlIGxhc3QgcmVuZGVyXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdyhkZWx0YSkge1xuICAgICAgdmFyIGdsID0gdGhpcy5nbDtcbiAgICAgIC8vIGRlZmF1bHQgc2V0dXAgc3R1ZmY6XG4gICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gICAgICAoMCwgX3V0aWxzLnJlc2V0R0wpKGdsKTtcbiAgICAgIC8vZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICAgIC8vZ2wuZGVwdGhNYXNrKGZhbHNlKTtcblxuICAgICAgLy8gcmVuZGVyIHBhc3NlczpcbiAgICAgIHRoaXMub2JqZWN0UmVuZGVyZXIucmVuZGVyKCk7XG5cbiAgICAgIC8vIHJ1biBhbmltYXRpb25zXG4gICAgICB0aGlzLm9iamVjdFJlbmRlcmVyLnVwZGF0ZVRpbWUoZGVsdGEpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgdGhlIHJlbmRlciBsb29wLlxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0aWNrIFRpbWUgc2luY2UgbGFzdCB0aWNrIChvcHRpb25hbClcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcih0aWNrKSB7XG4gICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgdGhpcy5jbGVhcmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGRlbHRhID0gMDtcbiAgICAgIGlmICghdGhpcy5zdGFydCkge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gdGljaztcbiAgICAgICAgdGhpcy5sYXN0ID0gdGljaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbHRhID0gdGljayAtIHRoaXMubGFzdDtcbiAgICAgICAgdGhpcy5sYXN0ID0gdGljaztcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhdyhkZWx0YSk7XG4gICAgICAvLyBxdWV1ZSB1cCBuZXh0IGZyYW1lOlxuICAgICAgdGhpcy5mcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBQcmVsb2FkcyBhbGwgYXNzZXRzXHJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIG9uIGNvbXBsZXRpb25cclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3ByZWxvYWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVsb2FkKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmFzc2V0TWFuYWdlci5sb2FkQWxsKGNhbGxiYWNrKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRW5naW5lO1xufSkoKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gRW5naW5lO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxuLy8gVE9ETzogRGVwcmVjYXRlXG5cbnZhciBFbnRpdHkgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFbnRpdHkoZW5naW5lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVudGl0eSk7XG5cbiAgICB0aGlzLmRyYXdhYmxlcyA9IHt9O1xuICAgIHRoaXMudHJhbnNmb3JtID0gX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG4gICAgdGhpcy5lbmdpbmUgPSBlbmdpbmU7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRW50aXR5LCBbe1xuICAgIGtleTogJ2FkZERyYXdhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRHJhd2FibGUobmFtZSwgZHJhd2FibGUpIHtcbiAgICAgIC8vIGFkZCBkaXNwb3NlIGlmIHRoaXMgYWxyZWFkeSBleGlzdHMuXG4gICAgICB0aGlzLnJlbW92ZURyYXdhYmxlKG5hbWUpO1xuICAgICAgdGhpcy5kcmF3YWJsZXNbbmFtZV0gPSBkcmF3YWJsZTtcbiAgICAgIHRoaXMuZW5naW5lLm9iamVjdFJlbmRlcmVyLmFkZERyYXdhYmxlKGRyYXdhYmxlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW1vdmVEcmF3YWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZURyYXdhYmxlKG5hbWUsIGRlc3Ryb3kpIHtcbiAgICAgIC8vIGRpc3Bvc2Ugc3R1ZmZzLlxuICAgICAgaWYgKHRoaXMuZHJhd2FibGVzW25hbWVdKSB7XG4gICAgICAgIHRoaXMuZW5naW5lLm9iamVjdFJlbmRlcmVyLnJlbW92ZURyYXdhYmxlKHRoaXMuZHJhd2FibGVzW25hbWVdLCBkZXN0cm95KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhcHBseVRyYW5zZm9ybScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKCkge1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmRyYXdhYmxlcykge1xuICAgICAgICB0aGlzLmRyYXdhYmxlc1tpXS5zZXRNYXRyaXgodGhpcy50cmFuc2Zvcm0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3RyYW5zbGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSh2ZWMpIHtcbiAgICAgIF9nbE1hdHJpeC5tYXQ0LnRyYW5zbGF0ZSh0aGlzLnRyYW5zZm9ybSwgdGhpcy50cmFuc2Zvcm0sIHZlYyk7XG4gICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncm90YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcm90YXRlKHF1YXQpIHtcbiAgICAgIHZhciByb3RhdGUgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICAgIF9nbE1hdHJpeC5tYXQ0LmZyb21RdWF0KHJvdGF0ZSwgcXVhdCk7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5tdWx0aXBseSh0aGlzLnRyYW5zZm9ybSwgdGhpcy50cmFuc2Zvcm0sIHJvdGF0ZSk7XG4gICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2V0QW5pbWF0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QW5pbWF0aW9uKGFuaW1hdGUpIHtcbiAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5kcmF3YWJsZXMpIHtcbiAgICAgICAgdGhpcy5kcmF3YWJsZXNbaV0ub25VcGRhdGUgPSBhbmltYXRlO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBFbnRpdHk7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBFbnRpdHk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmV4cG9ydHMuY3JlYXRlSXRlbUVudGl0eSA9IGNyZWF0ZUl0ZW1FbnRpdHk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfZW50aXR5ID0gcmVxdWlyZSgnLi4vZW50aXR5Jyk7XG5cbnZhciBfZW50aXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudGl0eSk7XG5cbnZhciBfZHJhd2FibGVJbnZlbnRvcnkgPSByZXF1aXJlKCcuLi9kcmF3YWJsZS9pbnZlbnRvcnknKTtcblxudmFyIF9kcmF3YWJsZUludmVudG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZUludmVudG9yeSk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxuLy8gVE9ETzogRGVwcmVjYXRlIGluIGZhdm9yIG9mIGEgcHJvcGVyIHNjZW5lIGdyYXBoXG52YXIgSW52ZW50b3J5SXRlbXMgPSB7fTtcblxudmFyIHNpbXBsZSA9IHtcbiAgWG1wOiAnTDgnLFxuICBVbHRyYXN0cmlrZTogJ0w4JyxcbiAgUmVzU2hpZWxkOiAnVkVSWV9SQVJFJyxcbiAgUG93ZXJDdWJlOiAnTDgnLFxuICBMaW5rQW1wOiAnRVhUUkVNRUxZX1JBUkUnLFxuICBIZWF0U2luazogJ1ZFUllfUkFSRScsXG4gIE11bHRpSGFjazogJ1ZFUllfUkFSRScsXG4gIEZvcmNlQW1wOiAnUkFSRScsXG4gIFR1cnJldDogJ1JBUkUnLFxuICBSZXNvbmF0b3I6ICdMOCcsXG4gIENhcHN1bGU6ICdSQVJFJ1xufTtcblxuZnVuY3Rpb24gY3JlYXRlSXRlbUVudGl0eShuYW1lLCBjb2xvcikge1xuICB2YXIgZW50aXR5YmFzZSA9IChmdW5jdGlvbiAoX0VudGl0eSkge1xuICAgIF9pbmhlcml0cyhlbnRpdHliYXNlLCBfRW50aXR5KTtcblxuICAgIGZ1bmN0aW9uIGVudGl0eWJhc2UoZW5naW5lKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgZW50aXR5YmFzZSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKGVudGl0eWJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBlbmdpbmUpO1xuICAgICAgdGhpcy5hZGREcmF3YWJsZShuYW1lLCBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddW25hbWVdKCkpO1xuICAgICAgdGhpcy5hZGREcmF3YWJsZShuYW1lICsgJ1htJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXVtuYW1lICsgJ1htJ10oKSk7XG4gICAgICB0aGlzLmRyYXdhYmxlc1tuYW1lXS51bmlmb3Jtcy51X2NvbG9yMCA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGNvbG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW50aXR5YmFzZTtcbiAgfSkoX2VudGl0eTJbJ2RlZmF1bHQnXSk7XG5cbiAgcmV0dXJuIGVudGl0eWJhc2U7XG59XG5cbmZvciAodmFyIGkgaW4gc2ltcGxlKSB7XG4gIEludmVudG9yeUl0ZW1zW2ldID0gY3JlYXRlSXRlbUVudGl0eShpLCBfY29uc3RhbnRzMlsnZGVmYXVsdCddLnF1YWxpdHlDb2xvcnNbc2ltcGxlW2ldXSk7XG59XG5cbnZhciBGbGlwQ2FyZEFkYSA9IChmdW5jdGlvbiAoX0VudGl0eTIpIHtcbiAgX2luaGVyaXRzKEZsaXBDYXJkQWRhLCBfRW50aXR5Mik7XG5cbiAgZnVuY3Rpb24gRmxpcENhcmRBZGEoZW5naW5lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZsaXBDYXJkQWRhKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEZsaXBDYXJkQWRhLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZW5naW5lKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdGbGlwQ2FyZEFkYScsIG5ldyBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J10uRmxpcENhcmRBZGEoKSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnRmxpcENhcmRYbScsIG5ldyBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J10uRmxpcENhcmRYbSgpKTtcbiAgICB0aGlzLmRyYXdhYmxlcy5GbGlwQ2FyZFhtLnVuaWZvcm1zLnVfdGVhbUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS50ZWFtQ29sb3JzLlJFU0lTVEFOQ0UpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkQWRhLnVuaWZvcm1zLnVfY29sb3IxID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS50ZWFtQ29sb3JzLlJFU0lTVEFOQ0UpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkQWRhLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzLlZFUllfUkFSRSk7XG4gIH1cblxuICByZXR1cm4gRmxpcENhcmRBZGE7XG59KShfZW50aXR5MlsnZGVmYXVsdCddKTtcblxuSW52ZW50b3J5SXRlbXMuRmxpcENhcmRBZGEgPSBGbGlwQ2FyZEFkYTtcblxudmFyIEZsaXBDYXJkSmFydmlzID0gKGZ1bmN0aW9uIChfRW50aXR5Mykge1xuICBfaW5oZXJpdHMoRmxpcENhcmRKYXJ2aXMsIF9FbnRpdHkzKTtcblxuICBmdW5jdGlvbiBGbGlwQ2FyZEphcnZpcyhlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxpcENhcmRKYXJ2aXMpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRmxpcENhcmRKYXJ2aXMucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBlbmdpbmUpO1xuICAgIHRoaXMuYWRkRHJhd2FibGUoJ0ZsaXBDYXJkSmFydmlzJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5GbGlwQ2FyZEphcnZpcygpKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdGbGlwQ2FyZFhtJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5GbGlwQ2FyZFhtKCkpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkWG0udW5pZm9ybXMudV90ZWFtQ29sb3IgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnRlYW1Db2xvcnMuRU5MSUdIVEVORUQpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkSmFydmlzLnVuaWZvcm1zLnVfY29sb3IxID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS50ZWFtQ29sb3JzLkVOTElHSFRFTkVEKTtcbiAgICB0aGlzLmRyYXdhYmxlcy5GbGlwQ2FyZEphcnZpcy51bmlmb3Jtcy51X2NvbG9yMCA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10ucXVhbGl0eUNvbG9ycy5WRVJZX1JBUkUpO1xuICB9XG5cbiAgcmV0dXJuIEZsaXBDYXJkSmFydmlzO1xufSkoX2VudGl0eTJbJ2RlZmF1bHQnXSk7XG5cbkludmVudG9yeUl0ZW1zLkZsaXBDYXJkSmFydmlzID0gRmxpcENhcmRKYXJ2aXM7XG5cbnZhciBFeHRyYVNoaWVsZCA9IChmdW5jdGlvbiAoX0VudGl0eTQpIHtcbiAgX2luaGVyaXRzKEV4dHJhU2hpZWxkLCBfRW50aXR5NCk7XG5cbiAgZnVuY3Rpb24gRXh0cmFTaGllbGQoZW5naW5lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4dHJhU2hpZWxkKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEV4dHJhU2hpZWxkLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZW5naW5lKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdFeHRyYVNoaWVsZCcsIG5ldyBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J10uRXh0cmFTaGllbGQoKSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnUmVzU2hpZWxkWG0nLCBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddLlJlc1NoaWVsZFhtKCkpO1xuICAgIHRoaXMuZHJhd2FibGVzLkV4dHJhU2hpZWxkLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzLlZFUllfUkFSRSk7XG4gIH1cblxuICByZXR1cm4gRXh0cmFTaGllbGQ7XG59KShfZW50aXR5MlsnZGVmYXVsdCddKTtcblxuSW52ZW50b3J5SXRlbXMuRXh0cmFTaGllbGQgPSBFeHRyYVNoaWVsZDtcblxudmFyIEludGVyZXN0Q2Fwc3VsZSA9IChmdW5jdGlvbiAoX0VudGl0eTUpIHtcbiAgX2luaGVyaXRzKEludGVyZXN0Q2Fwc3VsZSwgX0VudGl0eTUpO1xuXG4gIGZ1bmN0aW9uIEludGVyZXN0Q2Fwc3VsZShlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSW50ZXJlc3RDYXBzdWxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEludGVyZXN0Q2Fwc3VsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGVuZ2luZSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnSW50ZXJlc3RDYXBzdWxlJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5JbnRlcmVzdENhcHN1bGUoKSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnQ2Fwc3VsZVhtJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5DYXBzdWxlWG0oKSk7XG4gICAgdGhpcy5kcmF3YWJsZXMuSW50ZXJlc3RDYXBzdWxlLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzLlZFUllfUkFSRSk7XG4gIH1cblxuICByZXR1cm4gSW50ZXJlc3RDYXBzdWxlO1xufSkoX2VudGl0eTJbJ2RlZmF1bHQnXSk7XG5cbkludmVudG9yeUl0ZW1zLkludGVyZXN0Q2Fwc3VsZSA9IEludGVyZXN0Q2Fwc3VsZTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gSW52ZW50b3J5SXRlbXM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2VudGl0eSA9IHJlcXVpcmUoJy4uL2VudGl0eScpO1xuXG52YXIgX2VudGl0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9lbnRpdHkpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQgPSByZXF1aXJlKCcuLi9kcmF3YWJsZS93b3JsZCcpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVXb3JsZCk7XG5cbnZhciBfZHJhd2FibGVSZXNvbmF0b3JMaW5rID0gcmVxdWlyZSgnLi4vZHJhd2FibGUvcmVzb25hdG9yLWxpbmsnKTtcblxudmFyIF9kcmF3YWJsZVJlc29uYXRvckxpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVSZXNvbmF0b3JMaW5rKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vLyBUT0RPOiBEZXByZWNhdGUgaW4gZmF2b3Igb2YgYSBwcm9wZXIgc2NlbmUgZ3JhcGhcblxudmFyIFBvcnRhbEVudGl0eSA9IChmdW5jdGlvbiAoX0VudGl0eSkge1xuICBfaW5oZXJpdHMoUG9ydGFsRW50aXR5LCBfRW50aXR5KTtcblxuICBmdW5jdGlvbiBQb3J0YWxFbnRpdHkoZW5naW5lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBvcnRhbEVudGl0eSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihQb3J0YWxFbnRpdHkucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBlbmdpbmUpO1xuICAgIHRoaXMuYWRkRHJhd2FibGUoJ1BvcnRhbCcsIG5ldyBfZHJhd2FibGVXb3JsZDJbJ2RlZmF1bHQnXS5Qb3J0YWwoKSk7XG4gICAgLy8gd2h5IDY/IEkgZHVubm8sIGFzayBOaWFudGljXG4gICAgX2dsTWF0cml4Lm1hdDQuc2NhbGUodGhpcy5kcmF3YWJsZXMuUG9ydGFsLmxvY2FsLCB0aGlzLmRyYXdhYmxlcy5Qb3J0YWwubG9jYWwsIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoNiwgNiwgNikpO1xuICAgIHRoaXMuc2V0Q29sb3IoX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS50ZWFtQ29sb3JzLkxPS0kpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQb3J0YWxFbnRpdHksIFt7XG4gICAga2V5OiAnc2V0Q29sb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRDb2xvcihjb2xvcikge1xuICAgICAgdGhpcy5jb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGNvbG9yKTtcbiAgICAgIHRoaXMuZHJhd2FibGVzLlBvcnRhbC51bmlmb3Jtcy51X2Jhc2VDb2xvciA9IHRoaXMuY29sb3I7XG4gICAgICBpZiAodGhpcy5kcmF3YWJsZXMuU2hpZWxkKSB7XG4gICAgICAgIHRoaXMuZHJhd2FibGVzLlNoaWVsZC51bmlmb3Jtcy51X2NvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRyYXdhYmxlcy5BcnRpZmFjdHNHcmVlbkdsb3cpIHtcbiAgICAgICAgdGhpcy5kcmF3YWJsZXMuQXJ0aWZhY3RzR3JlZW5HbG93LnVfYmFzZUNvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgIH1cbiAgICAgIC8qZm9yKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX3JlZHJhd0xpbmsoaSk7c2RcclxuICAgICAgfSovXG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYWRkUmVzb25hdG9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkUmVzb25hdG9yKGxldmVsLCBzbG90LCByYW5nZSwgcGVyY2VudCkge1xuICAgICAgaWYgKHBlcmNlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwZXJjZW50ID0gMS4wO1xuICAgICAgfVxuICAgICAgaWYgKCtzbG90IDwgMCB8fCArc2xvdCA+IDgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzbG90IG91dCBvZiBib3VuZHMgZm9yIHJlc29uYXRvcicpO1xuICAgICAgfVxuICAgICAgaWYgKCEobGV2ZWwgaW4gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xldmVsIG11c3QgYmUgb25lIG9mICcgKyBPYmplY3Qua2V5cyhfY29uc3RhbnRzMlsnZGVmYXVsdCddLnF1YWxpdHlDb2xvcnMpLmpvaW4oJyAnKSk7XG4gICAgICB9XG4gICAgICByYW5nZSA9IHJhbmdlID09PSB1bmRlZmluZWQgPyA0MCA6IHJhbmdlO1xuICAgICAgdmFyIHJlc29uYXRvck5hbWUgPSAnUmVzb25hdG9yJyArICtzbG90O1xuICAgICAgdmFyIGxpbmtOYW1lID0gJ0xpbmsnICsgK3Nsb3Q7XG4gICAgICB2YXIgdGhldGEgPSBzbG90IC8gOCAqIDIgKiBNYXRoLlBJO1xuICAgICAgdmFyIHJlc29uYXRvciA9IG5ldyBfZHJhd2FibGVXb3JsZDJbJ2RlZmF1bHQnXS5SZXNvbmF0b3IoKTtcbiAgICAgIHZhciB4ID0gcmFuZ2UgKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgICB2YXIgeSA9IHJhbmdlICogTWF0aC5zaW4odGhldGEpO1xuICAgICAgdmFyIGxpbmsgPSBuZXcgX2RyYXdhYmxlUmVzb25hdG9yTGluazJbJ2RlZmF1bHQnXShbMCwgMF0sIHNsb3QsIHJhbmdlLCBfZ2xNYXRyaXgudmVjNC5jbG9uZSh0aGlzLmNvbG9yKSwgMS4wKTtcbiAgICAgIHJlc29uYXRvci51bmlmb3Jtcy51X2NvbG9yMCA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10ucXVhbGl0eUNvbG9yc1tsZXZlbF0pO1xuICAgICAgcmVzb25hdG9yLmxvY2FsID0gX2dsTWF0cml4Lm1hdDQuY2xvbmUodGhpcy5kcmF3YWJsZXMuUG9ydGFsLmxvY2FsKTtcbiAgICAgIC8vbGluay5sb2NhbCA9IG1hdDQuY2xvbmUodGhpcy5kcmF3YWJsZXMuUG9ydGFsLmxvY2FsKTtcbiAgICAgIF9nbE1hdHJpeC5tYXQ0LnRyYW5zbGF0ZShyZXNvbmF0b3IubG9jYWwsIHJlc29uYXRvci5sb2NhbCwgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyh4IC8gNiwgMCwgeSAvIDYpKTtcbiAgICAgIHJlc29uYXRvci51cGRhdGVNYXRyaXgoKTtcbiAgICAgIGxpbmsudXBkYXRlTWF0cml4KCk7XG4gICAgICAvLyBrZWVwIHRoZSBwb3J0YWwgc29ydGVkIGxhc3QgKHRoaXMgaXMgYSB0ZXJyaWJsZSB3YXkgb2YgZG9pbmcgdGhpcy4pXG4gICAgICB0aGlzLmFkZERyYXdhYmxlKGxpbmtOYW1lLCBsaW5rKTtcbiAgICAgIHRoaXMuYWRkRHJhd2FibGUocmVzb25hdG9yTmFtZSwgcmVzb25hdG9yKTtcbiAgICAgIHRoaXMuYWRkRHJhd2FibGUoJ1BvcnRhbCcsIHRoaXMuZHJhd2FibGVzLlBvcnRhbCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVtb3ZlUmVzb25hdG9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlUmVzb25hdG9yKHNsb3QpIHtcbiAgICAgIGlmICgrc2xvdCA8IDAgfHwgK3Nsb3QgPiA4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc2xvdCBvdXQgb2YgYm91bmRzIGZvciByZXNvbmF0b3InKTtcbiAgICAgIH1cbiAgICAgIHZhciBuYW1lID0gJ1Jlc29uYXRvcicgKyArc2xvdDtcbiAgICAgIHZhciByZXNvbmF0b3IgPSB0aGlzLmRyYXdhYmxlc1tuYW1lXSB8fCBudWxsO1xuICAgICAgaWYgKHJlc29uYXRvcikge1xuICAgICAgICB0aGlzLnJlbW92ZURyYXdhYmxlKG5hbWUpO1xuICAgICAgICB0aGlzLl9yZW1vdmVSZXNvbmF0b3JMaW5rKHNsb3QpO1xuICAgICAgICB0aGlzLmFkZERyYXdhYmxlKCdQb3J0YWwnLCB0aGlzLmRyYXdhYmxlcy5Qb3J0YWwpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FkZFNoaWVsZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFNoaWVsZCgpIHtcbiAgICAgIGlmICghKCdTaGllbGQnIGluIHRoaXMuZHJhd2FibGVzKSkge1xuICAgICAgICB0aGlzLmFkZERyYXdhYmxlKCdTaGllbGQnLCBuZXcgX2RyYXdhYmxlV29ybGQyWydkZWZhdWx0J10uU2hpZWxkKCkpO1xuICAgICAgICAvLyB3aHkgMTI/IEkgZG9uJ3Qga25vdy5cbiAgICAgICAgX2dsTWF0cml4Lm1hdDQuc2NhbGUodGhpcy5kcmF3YWJsZXMuU2hpZWxkLmxvY2FsLCB0aGlzLmRyYXdhYmxlcy5TaGllbGQubG9jYWwsIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMTIsIDEyLCAxMikpO1xuICAgICAgICB0aGlzLmRyYXdhYmxlcy5TaGllbGQudXBkYXRlTWF0cml4KCk7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdhYmxlcy5TaGllbGQudW5pZm9ybXMudV9jb2xvciA9IHRoaXMuY29sb3I7XG4gICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYWRkQXJ0aWZhY3QnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRBcnRpZmFjdChhcnRpZmFjdCwgbmFtZSkge1xuICAgICAgdmFyIHJvdGF0ZSA9IGZ1bmN0aW9uIHJvdGF0ZShkZWx0YSAvKiwgZWxhcHNlZCovKSB7XG4gICAgICAgIF9nbE1hdHJpeC5tYXQ0LnJvdGF0ZVkodGhpcy5tb2RlbCwgdGhpcy5tb2RlbCwgZGVsdGEgLyAxMDAwKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgICAgaWYgKCEobmFtZSBpbiB0aGlzLmRyYXdhYmxlcykpIHtcbiAgICAgICAgdGhpcy5hZGREcmF3YWJsZShuYW1lLCBhcnRpZmFjdCk7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdhYmxlc1tuYW1lXS5vblVwZGF0ZSA9IHJvdGF0ZTtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGRHbG93TWFya2VyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkR2xvd01hcmtlcihuYW1lLCBjb2xvcikge1xuICAgICAgdmFyIG4gPSAnQXJ0aWZhY3RzJyArIG5hbWUgKyAnR2xvdyc7XG4gICAgICBpZiAoIShuIGluIHRoaXMuZHJhd2FibGVzKSkge1xuICAgICAgICB0aGlzLmFkZERyYXdhYmxlKG4sIG5ldyBfZHJhd2FibGVXb3JsZDJbJ2RlZmF1bHQnXVtuXSgpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd2FibGVzW25dLnVuaWZvcm1zLnVfYmFzZUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoY29sb3IpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQb3J0YWxFbnRpdHk7XG59KShfZW50aXR5MlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gUG9ydGFsRW50aXR5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiLyoqXHJcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCB0aGluZ3MgYm91bmQgdG8gYSBnbCBjb250ZXh0LlxyXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgR0xCb3VuZCA9XG5cbi8qKlxyXG4gKiBCaW5kcyB0byBhIGdsIGNvbnRleHRcclxuICogQHBhcmFtICB7Y29udGV4dH0gZ2wgIEEgd2ViZ2wgY29udGV4dFxyXG4gKi9cbmZ1bmN0aW9uIEdMQm91bmQoZ2wpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdMQm91bmQpO1xuXG4gIHRoaXMuX2dsID0gZ2w7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEdMQm91bmQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJ1ZmZlciA9IHJlcXVpcmUoJy4vZ2wtYnVmZmVyJyk7XG5cbnZhciBfZ2xCdWZmZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCdWZmZXIpO1xuXG4vKipcclxuICogQSBHTEF0dHJpYnV0ZSBpcyBhIEdMQnVmZmVyIHRoYXQgcmVwcmVzZW50cyB2ZXJ0ZXggYXR0cmlidXRlc1xyXG4gKlxyXG4gKiBAZXh0ZW5kcyB7R0xCdWZmZXJ9XHJcbiAqL1xuXG52YXIgR0xBdHRyaWJ1dGUgPSAoZnVuY3Rpb24gKF9HTEJ1ZmZlcikge1xuICBfaW5oZXJpdHMoR0xBdHRyaWJ1dGUsIF9HTEJ1ZmZlcik7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgdmVydGV4IGF0dHJpYnV0ZSBidWZmZXJcclxuICAgKlxyXG4gICAqIEBjaGFpbmFibGVcclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgICAgICAgICAgICBXZWJHTENvbnRleHRcclxuICAgKiBAcGFyYW0gIHtBcnJheX0gYXR0cmlidXRlcyAgICAgICBBbiBhcnJheSBvZiBWZXJ0ZXhBdHRyaWJ1dGVzXHJcbiAgICogQHBhcmFtICB7QXJyYXlCdWZmZXJ9IHZhbHVlcyAgICAgVmFsdWVzIHRvIGZpbGwgdGhlIGJ1ZmZlciB3aXRoXHJcbiAgICogQHBhcmFtICB7ZW51bX0gdXNhZ2UgICAgICAgICAgICAgVXNhZ2UgQHNlZSBodHRwczovL3d3dy5raHJvbm9zLm9yZy9yZWdpc3RyeS93ZWJnbC9zcGVjcy8xLjAvIzUuMTQuNVxyXG4gICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICovXG5cbiAgZnVuY3Rpb24gR0xBdHRyaWJ1dGUoZ2wsIGF0dHJpYnV0ZXMsIHZhbHVlcywgdXNhZ2UpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR0xBdHRyaWJ1dGUpO1xuXG4gICAgdXNhZ2UgPSB1c2FnZSB8fCBnbC5TVEFUSUNfRFJBVztcbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihHTEF0dHJpYnV0ZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBnbC5BUlJBWV9CVUZGRVIsIHVzYWdlKTtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgIHRoaXMuc2l6ZSA9IHRoaXMuY291bnQgPSBudWxsO1xuICAgIHRoaXMuX3ZhbGlkYXRlID0gZmFsc2U7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgICB0aGlzLndpZHRoID0gMDtcbiAgICBmb3IgKHZhciBpID0gMCwgYTsgaSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgYSA9IHRoaXMuYXR0cmlidXRlc1tpXTtcbiAgICAgIHRoaXMuc2l6ZSArPSA0ICogYS5zaXplOyAvLyA0IGJlY2F1c2UgZmxvYXQgaXMgNCBieXRlcy5cbiAgICAgIHRoaXMud2lkdGggKz0gYS5zaXplO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxyXG4gICAqIENvbmZpcm1zIHRoYXQgdGhlIHVuZGVybHlpbmcgYnVmZmVyJ3MgbGVuZ3RoIGlzIGFuIGV2ZW4gbXVsdGlwbGVcclxuICAgKiBvZiB0b3RhbCBzaXplIG9mIHRoZSBhdHRyaWJ1dGVzIGZvciB0aGUgYnVmZmVyXHJcbiAgICpcclxuICAgKiBJc3N1ZXMgYSB3YXJuaW5nIGlmIG5vdC5cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoR0xBdHRyaWJ1dGUsIFt7XG4gICAga2V5OiAndmFsaWRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgICAgIGlmICh0aGlzLl92YWxpZGF0ZSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoICUgdGhpcy53aWR0aCAhPT0gMCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybigndmFsdWVzIGFycmF5IGxlbmd0aCBpcyBub3QgYW4gZXZlbiBtdWx0aXBsZSBvZiB0aGUgdG90YWwgc2l6ZSBvZiB0aGUgYXR0cmlidXRlcycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIHZhbHVlcyBpbiB0aGUgYnVmZmVyIGFuZCBwdXNoZXMgdGhlIGJ1ZmZlciB0byB0aGUgZ3B1XHJcbiAgICAgKlxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQHBhcmFtICB7QXJyYXlCdWZmZXJ9IHZhbHVlcyBOZXcgdmFsdWVzIHRvIHdyaXRlIHRvIHRoZSBidWZmZXJcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVZhbHVlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZhbHVlcyh2YWx1ZXMpIHtcbiAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBHaXZlbiBhIHNldCBvZiBwcm9ncmFtIGxvY2F0aW9ucywgc2V0IHVwIHRoZSBhdHRyaWJ1dGUgcG9pbnRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGxvY2F0aW9ucyBNYXAgb2YgYXR0cmlidXRlIG5hbWVzIHRvIHByb2dyYW0gbG9jYXRpb25zXHJcbiAgICAgKiBAcmV0dXJuIHt0aGlzfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdyhsb2NhdGlvbnMpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgdmFyIGEsXG4gICAgICAgICAgcyA9IDA7XG4gICAgICBpZiAoIXRoaXMuZ2xCdWYpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYmluZEJ1ZmZlcigpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYSA9IHRoaXMuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgaWYgKCEoYS5uYW1lIGluIGxvY2F0aW9ucykpIHtcbiAgICAgICAgICAvLyBJIGRvbid0IGtub3cgaWYgSSBzaG91bGQgc3VwcHJlc3MgdGhpcywgYnV0IGlmIElcbiAgICAgICAgICAvLyBkb24ndCwgaXQgZ2VuZXJhdGVzIG9uZSB3YXJuaW5nIHBlciBmcmFtZS5cbiAgICAgICAgICAvL2NvbnNvbGUud2FybignUHJvZ3JhbSBpcyBtaXNzaW5nIGF0dHJpYnV0ZSAnICsgYS5uYW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbnNbYS5uYW1lXSk7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb25zW2EubmFtZV0sIGEuc2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCB0aGlzLnNpemUsIHMpO1xuICAgICAgICBzICs9IDQgKiBhLnNpemU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpczsgLy8udW5iaW5kQnVmZmVyKCk7ICAvLyBtYXliZT9cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb24gZWFjaCBzZXQgb2YgdmFsdWVzIGZvciBzb21lIGF0dHJpYnV0ZVxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBhdHRyaWJ1dGVJbmRleCBJbmRleCBvZiB0aGUgYXR0cmlidXRlIHRvIHNlbGVjdFxyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrICAgICAgIENhbGxiYWNrXHJcbiAgICAgKiBAcmV0dXJuIHt0aGlzfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdlYWNoQXR0cmlidXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZWFjaEF0dHJpYnV0ZShhdHRyaWJ1dGVJbmRleCwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBvZmZzZXQgPSAwLFxuICAgICAgICAgIHNpemUsXG4gICAgICAgICAgaTtcbiAgICAgIGlmIChhdHRyaWJ1dGVJbmRleCA+PSAwICYmIGF0dHJpYnV0ZUluZGV4IDwgdGhpcy5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXR0cmlidXRlSW5kZXg7IGkrKykge1xuICAgICAgICAgIG9mZnNldCArPSB0aGlzLmF0dHJpYnV0ZXNbaV0uc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBzaXplID0gdGhpcy5hdHRyaWJ1dGVzW2F0dHJpYnV0ZUluZGV4XS5zaXplO1xuICAgICAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCB0aGlzLnZhbHVlcy5sZW5ndGg7IGkgKz0gdGhpcy53aWR0aCkge1xuICAgICAgICAgIGNhbGxiYWNrKHRoaXMudmFsdWVzLnN1YmFycmF5KGksIGkgKyBzaXplKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBHTEF0dHJpYnV0ZTtcbn0pKF9nbEJ1ZmZlcjJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEdMQXR0cmlidXRlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2dsQm91bmQgPSByZXF1aXJlKCcuLi9nbC1ib3VuZCcpO1xuXG52YXIgX2dsQm91bmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCb3VuZCk7XG5cbi8qKlxyXG4gKiBBIEdMQnVmZmVyIGlzIGEgYnVmZmVyIG9mIHNvbWUgc29ydCB0aGF0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBncHVcclxuICpcclxuICogQGV4dGVuZHMge0dMQm91bmR9XHJcbiAqL1xuXG52YXIgR0xCdWZmZXIgPSAoZnVuY3Rpb24gKF9HTEJvdW5kKSB7XG4gIF9pbmhlcml0cyhHTEJ1ZmZlciwgX0dMQm91bmQpO1xuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIGdsLWJvdW5kIGJ1ZmZlclxyXG4gICAqXHJcbiAgICogQGNoYWluYWJsZVxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgIFdlYkdMIGNvbnRleHRcclxuICAgKiBAcGFyYW0gIHtlbnVtfSB0YXJnZXQgICBnbCB0YXJnZXQgIEBzZWUgaHR0cHM6Ly93d3cua2hyb25vcy5vcmcvcmVnaXN0cnkvd2ViZ2wvc3BlY3MvMS4wLyM1LjE0LjVcclxuICAgKiBAcGFyYW0gIHtlbnVtfSB1c2FnZSAgICBnbCB1c2FnZSBAc2VlIGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3JlZ2lzdHJ5L3dlYmdsL3NwZWNzLzEuMC8jNS4xNC41XHJcbiAgICogQHJldHVybiB7dGhpc30gICAgICAgICAgdGhlIEdMQnVmZmVyXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gR0xCdWZmZXIoZ2wsIHRhcmdldCwgdXNhZ2UpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR0xCdWZmZXIpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoR0xCdWZmZXIucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQgfHwgZ2wuQVJSQVlfQlVGRkVSOyAvLyBwcm9iYWJseSBzaG91bGRuJ3QgZGVmYXVsdCB0aGlzLlxuICAgIHRoaXMudXNhZ2UgPSB1c2FnZSB8fCBnbC5TVEFUSUNfRFJBVztcbiAgICB0aGlzLmdsQnVmID0gbnVsbDtcbiAgICB0aGlzLnZhbHVlcyA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcclxuICAgKiBCaW5kcyB0aGUgYnVmZmVyIHRvIHRoZSBncHVcclxuICAgKlxyXG4gICAqIEBjaGFpbmFibGVcclxuICAgKiBAcmV0dXJuIHt0aGlzfVxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhHTEJ1ZmZlciwgW3tcbiAgICBrZXk6ICdiaW5kQnVmZmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYmluZEJ1ZmZlcigpIHtcbiAgICAgIGlmICghdGhpcy52YWx1ZXMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCd0cnlpbmcgdG8gdXBkYXRlIGEgYnVmZmVyIHdpdGggbm8gdmFsdWVzLicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuZ2xCdWYpIHtcbiAgICAgICAgdGhpcy5nbEJ1ZiA9IHRoaXMuX2dsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgfVxuICAgICAgdGhpcy5fZ2wuYmluZEJ1ZmZlcih0aGlzLnRhcmdldCwgdGhpcy5nbEJ1Zik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVuYmluZHMgdGhlIGJ1ZmZlciAoTlBJKVxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VuYmluZEJ1ZmZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuYmluZEJ1ZmZlcigpIHtcbiAgICAgIC8vIHRoaXMuX2dsLmJpbmRCdWZmZXIodGhpcy50YXJnZXQsIDApOyAgLy8gYXBwYXJlbnRseSB0aGlzIG1ha2VzIHdlYmdsIGNyYW5reVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIGJ1ZmZlciBkYXRhIG9uIHRoZSBncHVcclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcmV0dXJuIHt0aGlzfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB0aGlzLmJpbmRCdWZmZXIoKTtcbiAgICAgIC8vIGlmIEkgZG8gaXQgdGhpcyB3YXksIGRvZXMgaXQgYnJlYWs/XG4gICAgICAvLyBpZiBpdCB3b3Jrcywgd2lsbCB1cGRhdGluZyB0aGUgdW5kZXJseWluZyBidWZmZXJcbiAgICAgIC8vIHVwZGF0ZSB0aGUgYnVmZmVyIHdpdGhvdXQgbmVlZGluZyB0byBjYWxsIGdsLmJ1ZmZlckRhdGEgYWdhaW4/P1xuICAgICAgdGhpcy5fZ2wuYnVmZmVyRGF0YSh0aGlzLnRhcmdldCwgdGhpcy52YWx1ZXMsIHRoaXMudXNhZ2UpO1xuICAgICAgcmV0dXJuIHRoaXM7IC8vIC51bmJpbmRCdWZmZXIoKTsgLy8gYXBwYXJlbnRseSB0aGlzIG1ha2VzIHdlYmdsIGFuZ3J5LlxuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYnVmZmVyIGNvbnRlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gdmFsdWVzIFZhbHVlcyB0byBzdG9yZSBpbiB0aGUgYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0ICAgICAgT2Zmc2V0IHRvIHdyaXRlIHRoZSB2YWx1ZXNcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3NldFZhbHVlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlcyh2YWx1ZXMsIG9mZnNldCkge1xuICAgICAgaWYgKCF0aGlzLnZhbHVlcykge1xuICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWVzLnNldCh2YWx1ZXMsIG9mZnNldCk7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgY2h1bmsgb2YgYSBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHN0YXJ0IFN0YXJ0IG9mIGRlbGV0aW9uXHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGVuZCAgIEVuZCBvZiBkZWxldGlvblxyXG4gICAgICogQHJldHVybiB7dGhpc31cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZGVsZXRlV2l0aGluJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlV2l0aGluKHN0YXJ0LCBlbmQpIHtcbiAgICAgIGlmICghdGhpcy52YWx1ZXMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdUcnlpbmcgdG8gc3BsaWNlIGEgYnVmZmVyIHRoYXQgaGFzIG5vIHZhbHVlcy4nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIG5WYWx1ZXMgPSBlbmQgLSBzdGFydDtcbiAgICAgIHZhciBlbXB0eSA9IG5ldyB0aGlzLnZhbHVlcy5jb25zdHJ1Y3RvcihuVmFsdWVzKTtcbiAgICAgIHRoaXMudmFsdWVzLnNldCh0aGlzLnZhbHVlcy5zdWJhcnJheShlbmQpLCBzdGFydCk7XG4gICAgICB0aGlzLnZhbHVlcy5zZXQoZW1wdHksIHRoaXMudmFsdWVzLmxlbmd0aCAtIG5WYWx1ZXMpO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogRG8gc29tZXRoaW5nIHdpdGggZWFjaCBlbGVtbnQgb2YgdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgKHZhbHVlcyByZXR1cm5lZCB3aWxsIG92ZXJ3cml0ZVxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBjb250ZW50cyBvZiB0aGUgYnVmZmVyIGF0IHRoYXQgb2Zmc2V0KVxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIHN0YXJ0ICAgIE9mZnNldCB0byBzdGFydFxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGVuZCAgICAgIE9mZnNldCB0byBlbmRcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ21hcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hcChjYWxsYmFjaywgc3RhcnQsIGVuZCkge1xuICAgICAgc3RhcnQgPSBzdGFydCA9PT0gdW5kZWZpbmVkID8gMCA6IHN0YXJ0O1xuICAgICAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLnZhbHVlcy5sZW5ndGggOiBlbmQ7XG4gICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICB0aGlzLnZhbHVlc1tpXSA9IGNhbGxiYWNrKHRoaXMudmFsdWVzW2ldLCBpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGEgYnVmZmVyJ3MgdmFsdWVzLCBhbmQgYWxzbyB1cGRhdGUgdGhlIGJ1ZmZlciBvbiB0aGUgZ3B1XHJcbiAgICAgKlxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQHBhcmFtICB7QXJyYXlCdWZmZXJ9IHZhbHVlcyBOZXcgdmFsdWVzIHRvIGZpbGwgdGhlIGJ1ZmZlciB3aXRoXHJcbiAgICAgKiBAcmV0dXJuIHt0aGlzfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVCdWZmZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVCdWZmZXIodmFsdWVzKSB7XG4gICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBHTEJ1ZmZlcjtcbn0pKF9nbEJvdW5kMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gR0xCdWZmZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfZ2xCdWZmZXIgPSByZXF1aXJlKCcuL2dsLWJ1ZmZlcicpO1xuXG52YXIgX2dsQnVmZmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsQnVmZmVyKTtcblxuLyoqXHJcbiAqIEEgR0xJbmRleCBpcyBhIEdMQnVmZmVyIHJlcHJlc2VudGluZyBhbiBpbmRleCBidWZmZXIgb2Ygc29tZSBraW5kXHJcbiAqXHJcbiAqIEBleHRlbmRzIHtHTEJ1ZmZlcn1cclxuICovXG5cbnZhciBHTEluZGV4ID0gKGZ1bmN0aW9uIChfR0xCdWZmZXIpIHtcbiAgX2luaGVyaXRzKEdMSW5kZXgsIF9HTEJ1ZmZlcik7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGFuIGluZGV4IGJ1ZmZlclxyXG4gICAqXHJcbiAgICogQGNoYWluYWJsZVxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgICAgICAgICBXZWJHTCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7QXJyYXlCdWZmZXJ9IHZhbHVlcyAgIFZhbHVlcyB0byBpbml0aWFsaXplIHRoZSBidWZmZXIgd2l0aFxyXG4gICAqIEBwYXJhbSAge2VudW19IGRyYXdNb2RlICAgICAgICBEcmF3IG1vZGUgQHNlZSBodHRwczovL3d3dy5raHJvbm9zLm9yZy9yZWdpc3RyeS93ZWJnbC9zcGVjcy8xLjAvIzUuMTQuMTFcclxuICAgKiBAcGFyYW0gIHtlbnVtfSB1c2FnZSAgICAgICAgICAgVXNhZ2UgQHNlZSBodHRwczovL3d3dy5raHJvbm9zLm9yZy9yZWdpc3RyeS93ZWJnbC9zcGVjcy8xLjAvIzUuMTQuNVxyXG4gICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICovXG5cbiAgZnVuY3Rpb24gR0xJbmRleChnbCwgdmFsdWVzLCBkcmF3TW9kZSwgdXNhZ2UpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR0xJbmRleCk7XG5cbiAgICB1c2FnZSA9IHVzYWdlIHx8IGdsLlNUQVRJQ19EUkFXO1xuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEdMSW5kZXgucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCwgZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHVzYWdlKTtcbiAgICB0aGlzLm1vZGUgPSBkcmF3TW9kZTtcbiAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLmNvdW50ID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxyXG4gICAqIFBlcmZvcm0gYSBkcmF3IGNhbGwgdXNpbmcgdGhpcyBpbmRleCBidWZmZXIuXHJcbiAgICpcclxuICAgKiBAY2hhaW5hYmxlXHJcbiAgICogQHJldHVybiB7dGhpc31cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoR0xJbmRleCwgW3tcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgaWYgKCF0aGlzLmdsQnVmKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJpbmRCdWZmZXIoKTtcbiAgICAgIH1cbiAgICAgIGdsLmRyYXdFbGVtZW50cyh0aGlzLm1vZGUsIHRoaXMudmFsdWVzLmxlbmd0aCwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdMSW5kZXg7XG59KShfZ2xCdWZmZXIyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBHTEluZGV4O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfZW5naW5lID0gcmVxdWlyZSgnLi9lbmdpbmUnKTtcblxudmFyIF9lbmdpbmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW5naW5lKTtcblxudmFyIF9hc3NldExvYWRlciA9IHJlcXVpcmUoJy4vYXNzZXQtbG9hZGVyJyk7XG5cbnZhciBfZHJhd2FibGVJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2RyYXdhYmxlL2ludmVudG9yeScpO1xuXG52YXIgX2RyYXdhYmxlSW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlSW52ZW50b3J5KTtcblxudmFyIF9kcmF3YWJsZVdvcmxkID0gcmVxdWlyZSgnLi9kcmF3YWJsZS93b3JsZCcpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVXb3JsZCk7XG5cbnZhciBfZHJhd2FibGVQb3J0YWxMaW5rID0gcmVxdWlyZSgnLi9kcmF3YWJsZS9wb3J0YWwtbGluaycpO1xuXG52YXIgX2RyYXdhYmxlUG9ydGFsTGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVBvcnRhbExpbmspO1xuXG52YXIgX2RyYXdhYmxlUmVzb25hdG9yTGluayA9IHJlcXVpcmUoJy4vZHJhd2FibGUvcmVzb25hdG9yLWxpbmsnKTtcblxudmFyIF9kcmF3YWJsZVJlc29uYXRvckxpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVSZXNvbmF0b3JMaW5rKTtcblxudmFyIF9kcmF3YWJsZVNwaGVyaWNhbFBvcnRhbExpbmsgPSByZXF1aXJlKCcuL2RyYXdhYmxlL3NwaGVyaWNhbC1wb3J0YWwtbGluaycpO1xuXG52YXIgX2RyYXdhYmxlU3BoZXJpY2FsUG9ydGFsTGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVNwaGVyaWNhbFBvcnRhbExpbmspO1xuXG52YXIgX2RyYXdhYmxlQXRtb3NwaGVyZSA9IHJlcXVpcmUoJy4vZHJhd2FibGUvYXRtb3NwaGVyZScpO1xuXG52YXIgX2RyYXdhYmxlQXRtb3NwaGVyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZUF0bW9zcGhlcmUpO1xuXG52YXIgX2RyYXdhYmxlVGV4dHVyZWRTcGhlcmUgPSByZXF1aXJlKCcuL2RyYXdhYmxlL3RleHR1cmVkLXNwaGVyZScpO1xuXG52YXIgX2RyYXdhYmxlVGV4dHVyZWRTcGhlcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVUZXh0dXJlZFNwaGVyZSk7XG5cbnZhciBfZW50aXR5SW52ZW50b3J5ID0gcmVxdWlyZSgnLi9lbnRpdHkvaW52ZW50b3J5Jyk7XG5cbnZhciBfZW50aXR5SW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudGl0eUludmVudG9yeSk7XG5cbnZhciBfZW50aXR5UG9ydGFsID0gcmVxdWlyZSgnLi9lbnRpdHkvcG9ydGFsJyk7XG5cbnZhciBfZW50aXR5UG9ydGFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudGl0eVBvcnRhbCk7XG5cbnZhciBfb3JiaXRDb250cm9scyA9IHJlcXVpcmUoJy4vb3JiaXQtY29udHJvbHMnKTtcblxudmFyIF9vcmJpdENvbnRyb2xzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29yYml0Q29udHJvbHMpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSB7XG4gIENvbnN0YW50czogX2NvbnN0YW50czJbJ2RlZmF1bHQnXSxcbiAgRW5naW5lOiBfZW5naW5lMlsnZGVmYXVsdCddLFxuICBVdGlsaXRpZXM6IHtcbiAgICBsb2FkUmVzb3VyY2U6IF9hc3NldExvYWRlci5sb2FkUmVzb3VyY2UsXG4gICAgcmVzZXRHTDogX3V0aWxzLnJlc2V0R0wsXG4gICAgc2V0UGFyYW1zOiBfdXRpbHMuc2V0UGFyYW1zLFxuICAgIGRpc2NvOiBfdXRpbHMuZGlzY28sXG4gICAgZ2VuZXJhdGVBcnRpZmFjdHM6IF91dGlscy5nZW5lcmF0ZUFydGlmYWN0c1xuICB9LFxuICBEcmF3YWJsZXM6IHtcbiAgICBJbnZlbnRvcnk6IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXSxcbiAgICBXb3JsZDogX2RyYXdhYmxlV29ybGQyWydkZWZhdWx0J10sXG4gICAgUmVzb25hdG9yTGluazogX2RyYXdhYmxlUmVzb25hdG9yTGluazJbJ2RlZmF1bHQnXSxcbiAgICBQb3J0YWxMaW5rOiBfZHJhd2FibGVQb3J0YWxMaW5rMlsnZGVmYXVsdCddLFxuICAgIFNwaGVyaWNhbFBvcnRhbExpbms6IF9kcmF3YWJsZVNwaGVyaWNhbFBvcnRhbExpbmsyWydkZWZhdWx0J10sXG4gICAgQXRtb3NwaGVyZTogX2RyYXdhYmxlQXRtb3NwaGVyZTJbJ2RlZmF1bHQnXSxcbiAgICBUZXh0dXJlZFNwaGVyZTogX2RyYXdhYmxlVGV4dHVyZWRTcGhlcmUyWydkZWZhdWx0J11cbiAgfSxcbiAgRW50aXRpZXM6IHtcbiAgICBXb3JsZDoge1xuICAgICAgUG9ydGFsOiBfZW50aXR5UG9ydGFsMlsnZGVmYXVsdCddXG4gICAgfSxcbiAgICBJbnZlbnRvcnk6IF9lbnRpdHlJbnZlbnRvcnkyWydkZWZhdWx0J11cbiAgfSxcbiAgQ29udHJvbHM6IHtcbiAgICBPcmJpdDogX29yYml0Q29udHJvbHMyWydkZWZhdWx0J11cbiAgfSxcbiAgVkVSU0lPTjogJzAuMTguMCdcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfZ2xCb3VuZCA9IHJlcXVpcmUoJy4vZ2wtYm91bmQnKTtcblxudmFyIF9nbEJvdW5kMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsQm91bmQpO1xuXG52YXIgTU9ERV9UUklBTkdMRVMgPSAndHJpYW5nbGVzJztcbnZhciBNT0RFX0xJTkVTID0gJ2xpbmVzJztcblxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBtZXNoZXNcclxuICpcclxuICogQGV4dGVuZHMge0dMQm91bmR9XHJcbiAqL1xuXG52YXIgTWVzaCA9IChmdW5jdGlvbiAoX0dMQm91bmQpIHtcbiAgX2luaGVyaXRzKE1lc2gsIF9HTEJvdW5kKTtcblxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyBhIG1lc2hcclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgICAgICAgICAgICAgQSB3ZWJnbCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7RmxvYXQzMkFycmF5fSBhdHRyaWJ1dGVzIEEgdHlwZWQgYXJyYXkgb2YgdmVydGV4IGF0dHJpYnV0ZXNcclxuICAgKiBAcGFyYW0gIHtVaW50MTZBcnJheX0gZmFjZXMgICAgICAgQSB0eXBlZCBhcnJheSBvZiBmYWNlIGluZGljZXNcclxuICAgKiBAcGFyYW0gIHtVaW50MTZBcnJheX0gbGluZXMgICAgICAgQSB0eXBlZCBhcnJheSBvZiBsaW5lIGluZGljZXNcclxuICAgKi9cblxuICBmdW5jdGlvbiBNZXNoKGdsLCBhdHRyaWJ1dGVzLCBmYWNlcywgbGluZXMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWVzaCk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihNZXNoLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wpO1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgdGhpcy5mYWNlcyA9IGZhY2VzO1xuICAgIHRoaXMubGluZXMgPSBsaW5lcztcbiAgICB0aGlzLm1vZGUgPSBNT0RFX1RSSUFOR0xFUztcbiAgICB0aGlzLmJvdW5kcyA9IG51bGw7XG4gICAgdGhpcy5jZW50ZXIgPSBudWxsO1xuICB9XG5cbiAgLyoqXHJcbiAgICogR2l2ZW4gYSBzZXQgb2YgbG9jYXRpb25zIGZyb20gdGhlIGN1cnJlbnRseS1hY3RpdmUgc2hhZGVyLCBkcmF3IHRoaXMgbWVzaFxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gbG9jYXRpb25zIEEgaGFzaCBvZiBsb2NhdGlvbnMgYnkgbmFtZVxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhNZXNoLCBbe1xuICAgIGtleTogJ2RyYXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3KGxvY2F0aW9ucykge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVzLmRyYXcobG9jYXRpb25zKTtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09IE1PREVfVFJJQU5HTEVTKSB7XG4gICAgICAgIHRoaXMuZmFjZXMuZHJhdygpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09IE1PREVfTElORVMpIHtcbiAgICAgICAgdGhpcy5saW5lcy5kcmF3KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgbWVzaFxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBjb29yZEF0dHJpYnV0ZSBJbmRleCBvZiB0aGUgYXR0cmlidXRlIHJlcHJlc2VudGluZyB2ZXJ0ZXggcG9zaXRpb25cclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgQW4gb2JqZWN0IGNvbnNpc3Rpbmcgb2YgdHdvIGFycmF5cyBvZiB0aGUgc2FtZSBsZW5ndGhcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMgdGhlIGNvb3JkaW5hdGUgYXR0cmlidXRlLCByZXByZXNlbnRpbmcgbWluIGFuZCBtYXhcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMuXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2JvdW5kaW5nQm94JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmRpbmdCb3goY29vcmRBdHRyaWJ1dGUpIHtcbiAgICAgIGlmICghdGhpcy5ib3VuZHMpIHtcbiAgICAgICAgY29vcmRBdHRyaWJ1dGUgPSBjb29yZEF0dHJpYnV0ZSA9PT0gdW5kZWZpbmVkID8gMCA6IGNvb3JkQXR0cmlidXRlO1xuICAgICAgICB2YXIgYm91bmRzID0ge1xuICAgICAgICAgIG1heDogbnVsbCxcbiAgICAgICAgICBtaW46IG51bGxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLmVhY2hBdHRyaWJ1dGUoY29vcmRBdHRyaWJ1dGUsIGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICBpZiAoQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKGFyciwgZnVuY3Rpb24gKHMsIGEpIHtcbiAgICAgICAgICAgIHJldHVybiBzICsgYTtcbiAgICAgICAgICB9LCAwKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYm91bmRzLm1heCkge1xuICAgICAgICAgICAgYm91bmRzLm1heCA9IGJvdW5kcy5tYXgubWFwKGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChlLCBhcnJbaV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvdW5kcy5tYXggPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYm91bmRzLm1pbikge1xuICAgICAgICAgICAgYm91bmRzLm1pbiA9IGJvdW5kcy5taW4ubWFwKGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbihlLCBhcnJbaV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvdW5kcy5taW4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYm91bmRzID0gYm91bmRzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYm91bmRzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGZpeG1lXG4gIH0sIHtcbiAgICBrZXk6ICdjZW50ZXJPZk1hc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjZW50ZXJPZk1hc3MoY29vcmRBdHRyaWJ1dGUpIHtcbiAgICAgIGlmICghdGhpcy5jZW50ZXIpIHtcbiAgICAgICAgY29vcmRBdHRyaWJ1dGUgPSBjb29yZEF0dHJpYnV0ZSA9PT0gdW5kZWZpbmVkID8gMCA6IGNvb3JkQXR0cmlidXRlO1xuICAgICAgICB2YXIgc3VtID0gbnVsbCxcbiAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLmVhY2hBdHRyaWJ1dGUoY29vcmRBdHRyaWJ1dGUsIGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICBpZiAoQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKGFyciwgZnVuY3Rpb24gKHMsIGEpIHtcbiAgICAgICAgICAgIHJldHVybiBzICsgYTtcbiAgICAgICAgICB9LCAwKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgIGlmIChzdW0pIHtcbiAgICAgICAgICAgIHN1bSA9IHN1bS5tYXAoZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGUgKyBhcnJbaV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VtID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzdW0ubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGUgLyBjb3VudDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2VudGVyID0gc3VtO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY2VudGVyO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGJvdW5kaW5nIGJveC5cclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gY29vcmRBdHRyaWJ1dGUgSW5kZXggb2YgdGhlIGF0dHJpYnV0ZSByZXByZXNlbnRpb24gdmVydGV4IHBvc2l0aW9uLlxyXG4gICAgICogQHJldHVybiB7bWl4ZWR9ICAgICAgICAgICAgICAgICBBIHZlY3RvciBvZiB0aGUgc2FtZSBzaXplIGFzIHRoZSBwb3NpdGlvbiBhdHRyaWJ1dGUsXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcHJlc2VudGluZyB0aGUgY2VudGVyIG9mIHRoZSBib3VuZGluZyBib3guXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2JvdW5kaW5nQm94Q2VudGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmRpbmdCb3hDZW50ZXIoY29vcmRBdHRyaWJ1dGUpIHtcbiAgICAgIGlmICghdGhpcy5ib3VuZHMpIHtcbiAgICAgICAgdGhpcy5ib3VuZGluZ0JveChjb29yZEF0dHJpYnV0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5ib3VuZHMubWF4Lm1hcCgoZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgcmV0dXJuIChlIC0gdGhpcy5ib3VuZHMubWluW2ldKSAvIDI7XG4gICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTWVzaDtcbn0pKF9nbEJvdW5kMlsnZGVmYXVsdCddKTtcblxuTWVzaC5NT0RFX0xJTkVTID0gTU9ERV9MSU5FUztcbk1lc2guTU9ERV9UUklBTkdMRVMgPSBNT0RFX1RSSUFOR0xFUztcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTWVzaDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9tZXNoID0gcmVxdWlyZSgnLi4vbWVzaCcpO1xuXG52YXIgX21lc2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaCk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlID0gcmVxdWlyZSgnLi4vdmVydGV4LWF0dHJpYnV0ZScpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJ0ZXhBdHRyaWJ1dGUpO1xuXG52YXIgX2dsR2xJbmRleCA9IHJlcXVpcmUoJy4uL2dsL2dsLWluZGV4Jyk7XG5cbnZhciBfZ2xHbEluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xJbmRleCk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL2dsL2dsLWF0dHJpYnV0ZScpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEF0dHJpYnV0ZSk7XG5cbnZhciBfamF2YURlc2VyaWFsaXplciA9IHJlcXVpcmUoJ2phdmEtZGVzZXJpYWxpemVyJyk7XG5cbnZhciBfamF2YURlc2VyaWFsaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qYXZhRGVzZXJpYWxpemVyKTtcblxuZnVuY3Rpb24gcGFyc2VBdHRyaWJ1dGVzKGJ1Zikge1xuICB2YXIgdiA9IG5ldyBEYXRhVmlldyhidWYuYnVmZmVyLCBidWYuYnl0ZU9mZnNldCwgYnVmLmJ5dGVMZW5ndGgpLFxuICAgICAgYyA9IDA7XG4gIHZhciBuID0gdi5nZXRVaW50MzIoYyksXG4gICAgICB0eXBlLFxuICAgICAgc2l6ZSxcbiAgICAgIGxlbixcbiAgICAgIGosXG4gICAgICBuYW1lO1xuICBjICs9IDQ7XG4gIHZhciBhdHRyaWJ1dGVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgdHlwZSA9IHYuZ2V0VWludDMyKGMpO1xuICAgIGlmICh0eXBlICE9IDB4MDEgJiYgdHlwZSAhPSAweDEwKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3Vua25vd24gdHlwZSAnICsgdHlwZSk7XG4gICAgfVxuICAgIGMgKz0gNDtcbiAgICBzaXplID0gdi5nZXRVaW50MzIoYyk7XG4gICAgYyArPSA0O1xuICAgIGxlbiA9IHYuZ2V0VWludDE2KGMpO1xuICAgIGMgKz0gMjtcbiAgICBuYW1lID0gJyc7XG4gICAgZm9yIChqID0gMDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICBuYW1lICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodi5nZXRVaW50OChjICsgaikpO1xuICAgIH1cbiAgICBjICs9IGxlbjtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10obmFtZSwgc2l6ZSkpO1xuICB9XG4gIHJldHVybiBhdHRyaWJ1dGVzO1xufVxuXG4vKipcclxuICogQSBGaWxlTWVzaCBpcyBhIE1lc2ggdGhhdCBpcyBsb2FkZWQgZnJvbSBhIHNlcmlhbHppZWQgSmF2YSBvYmplY3QsXHJcbiAqIGFzIGZvdW5kIGluIHRoZSBhcGsuXHJcbiAqXHJcbiAqIEBleHRlbmRzIHtNZXNofVxyXG4gKi9cblxudmFyIEZpbGVNZXNoID0gKGZ1bmN0aW9uIChfTWVzaCkge1xuICBfaW5oZXJpdHMoRmlsZU1lc2gsIF9NZXNoKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgdGhlIE1lc2ggZnJvbSB0aGUgZ2l2ZW4gZmlsZVxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgICAgICAgICBXZWJHTCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7QXJyYXlCdWZmZXJ9IGFycmF5YnVmIEFycmF5QnVmZmVyIHJlcHJlc2VudGluZyB0aGUgZW50aXJlIC5vYmogZmlsZVxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEZpbGVNZXNoKGdsLCBhcnJheWJ1Zikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGaWxlTWVzaCk7XG5cbiAgICB2YXIgamQgPSBuZXcgX2phdmFEZXNlcmlhbGl6ZXIyWydkZWZhdWx0J10oYXJyYXlidWYpO1xuICAgIHZhciBibG9ja3MgPSBqZC5nZXRDb250ZW50cygpO1xuXG4gICAgLy8gc2hvdWxkIGJlIEZsb2F0MzJBcnJheVxuICAgIHZhciB2YWx1ZXMgPSBibG9ja3NbMF0uZWxlbWVudHM7XG5cbiAgICAvLyBzaG91bGQgYmUgQXJyYXlCdWZmZXJcbiAgICB2YXIgYXR0cmlidXRlRGF0YSA9IGJsb2Nrc1szXTtcblxuICAgIC8vIGFycmF5IG9mIFZlcnRleEF0dHJpYnV0ZXNcbiAgICB2YXIgc3BlYyA9IHBhcnNlQXR0cmlidXRlcyhhdHRyaWJ1dGVEYXRhKTtcblxuICAgIC8vIHNob3VsZCBiZSBVaW50MTZBcnJheVxuICAgIHZhciBmYWNlcyA9IG5ldyBfZ2xHbEluZGV4MlsnZGVmYXVsdCddKGdsLCBibG9ja3NbMV0uZWxlbWVudHMsIGdsLlRSSUFOR0xFUyk7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBuZXcgX2dsR2xBdHRyaWJ1dGUyWydkZWZhdWx0J10oZ2wsIHNwZWMsIHZhbHVlcyk7XG5cbiAgICAvLyBzaG91bGQgYmUgVWludDE2QXJyYXlcbiAgICB2YXIgbGluZXMgPSBuZXcgX2dsR2xJbmRleDJbJ2RlZmF1bHQnXShnbCwgYmxvY2tzWzJdLmVsZW1lbnRzLCBnbC5MSU5FUyk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihGaWxlTWVzaC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBhdHRyaWJ1dGVzLCBmYWNlcywgbGluZXMpO1xuICB9XG5cbiAgcmV0dXJuIEZpbGVNZXNoO1xufSkoX21lc2gyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBGaWxlTWVzaDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9tZXNoID0gcmVxdWlyZSgnLi4vbWVzaCcpO1xuXG52YXIgX21lc2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaCk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlID0gcmVxdWlyZSgnLi4vdmVydGV4LWF0dHJpYnV0ZScpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJ0ZXhBdHRyaWJ1dGUpO1xuXG52YXIgX2dsR2xJbmRleCA9IHJlcXVpcmUoJy4uL2dsL2dsLWluZGV4Jyk7XG5cbnZhciBfZ2xHbEluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xJbmRleCk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL2dsL2dsLWF0dHJpYnV0ZScpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxuLy8gVE9ETzogUGFyYW1ldGVyaXplIHRoaXMgY29uY2VwdCBhIGxpdHRsZSBiZXR0ZXJcbi8vIHRoaXMgaGFzIHBvdGVudGlhbCB0byBiZSBhIHJlYWxseSBmbGV4aWJsZSBhbmQgcG93ZXJmdWwgd2F5IG9mXG4vLyBtYWtpbmcsIGVzc2VudGlhbGx5LCBleHRydWRlZCBnZW9tZXRyeS5cblxuLy8gOSBzZXRzIG9mIDYgcG9pbnRzLCBicmVha2luZyB0aGUgbGluayBpbnRvIDggcGllY2VzLCBlYWNoIHByb3ZpZGluZyA2IGZhY2VzLCBzb21ldGhpbmcgbGlrZSB0aGF0P1xudmFyIF9sZW4gPSA5LFxuICAgIF9zaXplID0gX2xlbiAqIDYsXG4gICAgX2NodW5rU2l6ZSA9IDEyO1xudmFyIGMgPSBuZXcgQXJyYXkoX2xlbiksXG4gICAgZCA9IG5ldyBBcnJheShfbGVuKSxcbiAgICBlID0gbmV3IEFycmF5KF9sZW4pO1xuXG52YXIgYmFzZUNvbG9yID0gX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjQ2LCAwLjE4LCAwLjE4LCAxLjApO1xudmFyIGJhc2VPZmZzZXQgPSBfZ2xNYXRyaXgudmVjNC5jcmVhdGUoKTtcblxuZnVuY3Rpb24gY2xhbXBlZFNpbihmKSB7XG4gIHJldHVybiBNYXRoLnNpbihNYXRoLlBJICogTWF0aC5tYXgoTWF0aC5taW4oMS4wLCBmKSwgMCkgLyAyKTtcbn1cblxuZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgdmFyIGYgPSBpIC8gOC4wO1xuICBjW2ldID0gZjtcbiAgZVtpXSA9IDMuMCArIC0xLjUgKiBNYXRoLnBvdyhjbGFtcGVkU2luKDIuMCAqIE1hdGguYWJzKGYgLSAwLjUpKSwgNCk7XG4gIGRbaV0gPSBjbGFtcGVkU2luKDEuMCAtIDIuMCAqIE1hdGguYWJzKGYgLSAwLjUpKTtcbn1cblxuZnVuY3Rpb24gZmlsbENodW5rKGJ1ZiwgaW5kZXgsIHgsIHksIHosIHUsIHYsIG5vcm1hbCwgZjYsIGNvbG9yKSB7XG4gIHZhciBvZmYgPSBpbmRleCAqIF9jaHVua1NpemU7XG4gIGJ1ZltvZmYgKyAwXSA9IHg7XG4gIGJ1ZltvZmYgKyAxXSA9IHk7XG4gIGJ1ZltvZmYgKyAyXSA9IHo7XG4gIGJ1ZltvZmYgKyAzXSA9IGY2O1xuICBidWZbb2ZmICsgNF0gPSB1O1xuICBidWZbb2ZmICsgNV0gPSB2O1xuICBidWZbb2ZmICsgNl0gPSBub3JtYWxbMF07XG4gIGJ1ZltvZmYgKyA3XSA9IG5vcm1hbFsyXTtcbiAgYnVmW29mZiArIDhdID0gY29sb3JbMF07XG4gIGJ1ZltvZmYgKyA5XSA9IGNvbG9yWzFdO1xuICBidWZbb2ZmICsgMTBdID0gY29sb3JbMl07XG4gIGJ1ZltvZmYgKyAxMV0gPSBjb2xvclszXTtcbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlTGlua0F0dHJpYnV0ZXMoc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCkge1xuICBzdGFydFBlcmNlbnQgPSBzdGFydFBlcmNlbnQgPT09IHVuZGVmaW5lZCA/IDEgOiBNYXRoLm1heChNYXRoLm1pbihzdGFydFBlcmNlbnQsIDEpLCAwKTtcbiAgZW5kUGVyY2VudCA9IGVuZFBlcmNlbnQgPT09IHVuZGVmaW5lZCA/IDEgOiBNYXRoLm1heChNYXRoLm1pbihlbmRQZXJjZW50LCAxKSwgMCk7XG4gIHZhciB2YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KF9zaXplICogX2NodW5rU2l6ZSk7XG4gIHZhciBsZW5ndGggPSBNYXRoLnNxcnQoKGVuZFswXSAtIHN0YXJ0WzBdKSAqIChlbmRbMF0gLSBzdGFydFswXSkgKyAoZW5kWzFdIC0gc3RhcnRbMV0pICogKGVuZFsxXSAtIHN0YXJ0WzFdKSk7XG4gIHZhciB5TWluID0gYmFzZU9mZnNldFsxXSxcbiAgICAgIHlNYXggPSB5TWluICsgTWF0aC5taW4oMzAuMCwgMC4wOCAqIGxlbmd0aCksXG4gICAgICBhdmdQZXJjZW50ID0gKHN0YXJ0UGVyY2VudCArIGVuZFBlcmNlbnQpIC8gMi4wLFxuICAgICAgZjYgPSAwLjAxICogbGVuZ3RoLFxuICAgICAgZjcgPSAwLjEgKyBhdmdQZXJjZW50ICogMC4zO1xuICB2YXIgdmVjID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyhlbmRbMF0sIDAsIGVuZFsxXSk7XG4gIF9nbE1hdHJpeC52ZWMzLnN1YnRyYWN0KHZlYywgdmVjLCBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHN0YXJ0WzBdLCAwLCBzdGFydFsxXSkpO1xuICB2YXIgdXAgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDEsIDApO1xuICB2YXIgcmlnaHQgPSBfZ2xNYXRyaXgudmVjMy5jcm9zcyhfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgdmVjLCB1cCk7XG4gIF9nbE1hdHJpeC52ZWMzLm5vcm1hbGl6ZShyaWdodCwgcmlnaHQpO1xuICB2YXIgc3RlcCA9IF9sZW4gKiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgIHZhciBmOCA9IGNbaV0sXG4gICAgICAgIGY5ID0gc3RhcnRQZXJjZW50ICsgZjggKiAoZW5kUGVyY2VudCAtIHN0YXJ0UGVyY2VudCksXG4gICAgICAgIGYxMCA9IDAuNiArIDAuMzUgKiBmOSxcbiAgICAgICAgZjEyID0gZjggKiBmNixcbiAgICAgICAgZjEzID0gc3RhcnRbMF0gKyBmOCAqIHZlY1swXSxcbiAgICAgICAgZjE0ID0gc3RhcnRbMV0gKyBmOCAqIHZlY1syXSxcbiAgICAgICAgZjE1ID0geU1pbiArIGRbaV0gKiAoeU1heCAtIHlNaW4pLFxuICAgICAgICBmMTYgPSBlW2ldO1xuICAgIHZhciBjbCA9IF9nbE1hdHJpeC52ZWM0LmxlcnAoX2dsTWF0cml4LnZlYzQuY3JlYXRlKCksIGJhc2VDb2xvciwgY29sb3IsIDAuMjUgKyBmOSAqIDAuNzUpO1xuICAgIGNsWzNdID0gZjEwO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIGkgKiAyLCBmMTMgKyBmMTYgKiByaWdodFswXSwgZjE1LCBmMTQgKyBmMTYgKiByaWdodFsyXSwgMCwgZjEyLCB1cCwgZjcsIGNsKTtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBpICogMiArIDEsIGYxMyAtIGYxNiAqIHJpZ2h0WzBdLCBmMTUsIGYxNCAtIGYxNiAqIHJpZ2h0WzJdLCAwLjUsIGYxMiwgdXAsIGY3LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgc3RlcCArIGkgKiAyLCBmMTMsIGYxNSArIGYxNiwgZjE0LCAwLCBmMTIsIHJpZ2h0LCBmNywgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIHN0ZXAgKyBpICogMiArIDEsIGYxMywgZjE1IC0gZjE2LCBmMTQsIDAuNSwgZjEyLCByaWdodCwgZjcsIGNsKTtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCAyICogc3RlcCArIGkgKiAyLCBmMTMsIGYxNSAtIGYxNiwgZjE0LCAwLjUsIGYxMiwgcmlnaHQsIGY3LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgMiAqIHN0ZXAgKyBpICogMiArIDEsIGYxMywgMCwgZjE0LCAxLjAsIGYxMiwgcmlnaHQsIGY3LCBjbCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlRmFjZXModmVydGV4T2Zmc2V0KSB7XG4gIHZhciBpbmQgPSBuZXcgVWludDE2QXJyYXkoMTQ0KSxcbiAgICAgIGlPZmYgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBfbGVuIC0gMTsgaisrKSB7XG5cbiAgICAgIGluZFtpT2ZmICsgMF0gPSB2ZXJ0ZXhPZmZzZXQgKyAxO1xuICAgICAgaW5kW2lPZmYgKyAxXSA9IHZlcnRleE9mZnNldCArIDA7XG4gICAgICBpbmRbaU9mZiArIDJdID0gdmVydGV4T2Zmc2V0ICsgMjtcbiAgICAgIGluZFtpT2ZmICsgM10gPSB2ZXJ0ZXhPZmZzZXQgKyAxO1xuICAgICAgaW5kW2lPZmYgKyA0XSA9IHZlcnRleE9mZnNldCArIDI7XG4gICAgICBpbmRbaU9mZiArIDVdID0gdmVydGV4T2Zmc2V0ICsgMztcbiAgICAgIHZlcnRleE9mZnNldCArPSAyO1xuICAgICAgaU9mZiArPSA2O1xuICAgIH1cbiAgICB2ZXJ0ZXhPZmZzZXQgKz0gMjtcbiAgfVxuXG4gIHJldHVybiBpbmQ7XG59XG5cbi8qKlxyXG4gKiBBIFBvcnRhbExpbmtNZXNoIHJlcHJlc2VudHMgdGhlIG1lc2ggZm9yIGEgc2luZ2xlIHBvcnRhbCBsaW5rLlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyB7TWVzaH1cclxuICovXG5cbnZhciBQb3J0YWxMaW5rTWVzaCA9IChmdW5jdGlvbiAoX01lc2gpIHtcbiAgX2luaGVyaXRzKFBvcnRhbExpbmtNZXNoLCBfTWVzaCk7XG5cbiAgLyoqXHJcbiAgICogUHJvZ3JhbWF0aWNhbGx5IGNvbnN0cnVjdHMgdGhlIG1lc2ggZm9yIGEgbGluayBiZXR3ZWVuIHR3byBwb2ludHNcclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgICAgICAgICBXZWJHTCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7dmVjMn0gc3RhcnQgICAgICAgICAgWCxaIG9mIHRoZSBvcmlnaW4gcG9pbnRcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBlbmQgICAgICAgICAgICBYLFogb2YgdGhlIGRlc3RpbmF0aW9uIHBvaW50XHJcbiAgICogQHBhcmFtICB7dmVjNH0gY29sb3IgICAgICAgICAgQ29sb3Igb2YgdGhlIGxpbmtcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHN0YXJ0UGVyY2VudCBPcmlnaW4gcG9pbnQgcGVyY2VudGFnZVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gZW5kUGVyY2VudCAgIERlc3RpbmF0aW9uIHBvaW50IHBlcmNlbnRhZ2VcclxuICAgKi9cblxuICBmdW5jdGlvbiBQb3J0YWxMaW5rTWVzaChnbCwgc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb3J0YWxMaW5rTWVzaCk7XG5cbiAgICB2YXIgYnVmID0gX2dlbmVyYXRlTGlua0F0dHJpYnV0ZXMoc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCk7XG4gICAgdmFyIGluZCA9IF9nZW5lcmF0ZUZhY2VzKDApO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gW107XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3Bvc2l0aW9uJywgNCkpO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV90ZXhDb29yZDAnLCA0KSk7XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX2NvbG9yJywgNCkpO1xuICAgIHZhciBhdHRyaWJ1dGUgPSBuZXcgX2dsR2xBdHRyaWJ1dGUyWydkZWZhdWx0J10oZ2wsIGF0dHJpYnV0ZXMsIGJ1ZiwgZ2wuRFlOQU1JQ19EUkFXKTtcbiAgICB2YXIgZmFjZXMgPSBuZXcgX2dsR2xJbmRleDJbJ2RlZmF1bHQnXShnbCwgaW5kLCBnbC5UUklBTkdMRVMpO1xuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFBvcnRhbExpbmtNZXNoLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIGF0dHJpYnV0ZSwgZmFjZXMpO1xuICB9XG5cbiAgcmV0dXJuIFBvcnRhbExpbmtNZXNoO1xufSkoX21lc2gyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQb3J0YWxMaW5rTWVzaDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9tZXNoID0gcmVxdWlyZSgnLi4vbWVzaCcpO1xuXG52YXIgX21lc2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaCk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlID0gcmVxdWlyZSgnLi4vdmVydGV4LWF0dHJpYnV0ZScpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJ0ZXhBdHRyaWJ1dGUpO1xuXG52YXIgX2dsR2xJbmRleCA9IHJlcXVpcmUoJy4uL2dsL2dsLWluZGV4Jyk7XG5cbnZhciBfZ2xHbEluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xJbmRleCk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL2dsL2dsLWF0dHJpYnV0ZScpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxuLy8gVE9ETzogUGFyYW1ldGVyaXplIHRoaXMgY29uY2VwdCBhIGxpdHRsZSBiZXR0ZXJcbi8vIHRoaXMgaGFzIHBvdGVudGlhbCB0byBiZSBhIHJlYWxseSBmbGV4aWJsZSBhbmQgcG93ZXJmdWwgd2F5IG9mXG4vLyBtYWtpbmcsIGVzc2VudGlhbGx5LCBleHRydWRlZCBnZW9tZXRyeS5cblxuLy8gNSBzZXRzIG9mIDQgcG9pbnRzLCBicmVha2luZyB0aGUgbGluayBpbnRvIDQgcGllY2VzLCBlYWNoIHByb3ZpZGluZyA0IGZhY2VzXG4vLyBjaHVua3NpemUgaXMgc2l6ZSBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIHBhY2tlZCB2ZXJ0ZXggYXJyYXksIGluIGJ5dGVzXG52YXIgX2xlbiA9IDUsXG4gICAgX3NpemUgPSBfbGVuICogNCxcbiAgICBfY2h1bmtTaXplID0gMTI7XG52YXIgaiA9IG5ldyBBcnJheShfbGVuKSxcbiAgICBrID0gbmV3IEFycmF5KF9sZW4pLFxuICAgIGwgPSBuZXcgQXJyYXkoX2xlbik7XG5cbmZ1bmN0aW9uIGNsYW1wZWRTaW4oZikge1xuICByZXR1cm4gTWF0aC5zaW4oTWF0aC5QSSAqIE1hdGgubWF4KE1hdGgubWluKDEuMCwgZiksIDApIC8gMik7XG59XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gIHZhciBmID0gaSAvIDQuMDtcbiAgaltpXSA9IGY7XG4gIGxbaV0gPSAzLjUgKiBNYXRoLm1heCgxLjAgLSBNYXRoLnBvdyhjbGFtcGVkU2luKDIuMCAqIE1hdGguYWJzKGYgLSAwLjUpKSwgNC4wKSwgMC4yKTtcbiAga1tpXSA9IGNsYW1wZWRTaW4oMS4wIC0gMi4wICogTWF0aC5hYnMoZiAtIDAuNSkpO1xufVxuXG52YXIgYmFzZUNvbG9yID0gX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjc4LCAwLjMxLCAwLjMxLCAxLjApO1xudmFyIHJlc29uYXRvck1pZE9mZnNldCA9IDA7XG52YXIgcG9ydGFsQmFzZU9mZnNldCA9IDA7XG52YXIgdXAgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDEsIDApO1xuXG5mdW5jdGlvbiBmaWxsQ2h1bmsoYnVmLCBpbmRleCwgeCwgeSwgeiwgdSwgdiwgbm9ybWFsLCBmNiwgY29sb3IpIHtcbiAgdmFyIG9mZiA9IGluZGV4ICogX2NodW5rU2l6ZTtcbiAgYnVmW29mZiArIDBdID0geDtcbiAgYnVmW29mZiArIDFdID0geTtcbiAgYnVmW29mZiArIDJdID0gejtcbiAgYnVmW29mZiArIDNdID0gZjY7XG4gIGJ1ZltvZmYgKyA0XSA9IHU7XG4gIGJ1ZltvZmYgKyA1XSA9IHY7XG4gIGJ1ZltvZmYgKyA2XSA9IG5vcm1hbFswXTtcbiAgYnVmW29mZiArIDddID0gbm9ybWFsWzJdO1xuICBidWZbb2ZmICsgOF0gPSBjb2xvclswXTtcbiAgYnVmW29mZiArIDldID0gY29sb3JbMV07XG4gIGJ1ZltvZmYgKyAxMF0gPSBjb2xvclsyXTtcbiAgYnVmW29mZiArIDExXSA9IGNvbG9yWzNdO1xufVxuXG5mdW5jdGlvbiBfZ2VuZXJhdGVMaW5rQXR0cmlidXRlcyhwb3J0YWwsIHJlc29uYXRvciwgY29sb3IsIHJlc29uYXRvclBlcmNlbnQpIHtcbiAgcmVzb25hdG9yUGVyY2VudCA9IHJlc29uYXRvclBlcmNlbnQgPT09IHVuZGVmaW5lZCA/IDEgOiBNYXRoLm1heChNYXRoLm1pbihyZXNvbmF0b3JQZXJjZW50LCAxKSwgMCk7XG4gIHZhciB2YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KF9zaXplICogX2NodW5rU2l6ZSk7XG4gIHZhciBkaXN0ID0gTWF0aC5zcXJ0KChyZXNvbmF0b3JbMF0gLSBwb3J0YWxbMF0pICogKHJlc29uYXRvclswXSAtIHBvcnRhbFswXSkgKyAocmVzb25hdG9yWzFdIC0gcG9ydGFsWzFdKSAqIChyZXNvbmF0b3JbMV0gLSBwb3J0YWxbMV0pKTtcbiAgdmFyIGY0ID0gMiAvIDMwICogZGlzdCxcbiAgICAgIGY1ID0gMC45ICsgMC4xICogcmVzb25hdG9yUGVyY2VudCxcbiAgICAgIGY2ID0gMC42NSArIDAuMzUgKiByZXNvbmF0b3JQZXJjZW50LFxuICAgICAgZjggPSAwLjEgKyAwLjMgKiByZXNvbmF0b3JQZXJjZW50O1xuICB2YXIgY2wgPSBfZ2xNYXRyaXgudmVjNC5sZXJwKF9nbE1hdHJpeC52ZWM0LmNyZWF0ZSgpLCBiYXNlQ29sb3IsIGNvbG9yLCAwLjEgKyByZXNvbmF0b3JQZXJjZW50ICogMC44NSk7XG4gIGNsWzNdID0gMC43NSArIDAuMjUgKiByZXNvbmF0b3JQZXJjZW50ICogY2xbM107XG4gIHZhciB2ZWMgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHJlc29uYXRvclswXSwgMCwgcmVzb25hdG9yWzFdKTtcbiAgX2dsTWF0cml4LnZlYzMuc3VidHJhY3QodmVjLCB2ZWMsIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMocG9ydGFsWzBdLCAwLCBwb3J0YWxbMV0pKTtcbiAgdmFyIHJpZ2h0ID0gX2dsTWF0cml4LnZlYzMuY3Jvc3MoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHZlYywgdXApO1xuICBfZ2xNYXRyaXgudmVjMy5ub3JtYWxpemUocmlnaHQsIHJpZ2h0KTtcbiAgdmFyIHN0ZXAgPSBfbGVuICogMjtcbiAgdmFyIGYxMCA9IDUuMCAqIChwb3J0YWxbMF0gKyBwb3J0YWxbMV0gLSBNYXRoLmZsb29yKHBvcnRhbFswXSArIHBvcnRhbFsxXSkpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgIHZhciBmMTEgPSBqW2ldLFxuICAgICAgICBmMTIgPSBwb3J0YWxbMF0gKyBmMTEgKiB2ZWNbMF0sXG4gICAgICAgIGYxMyA9IHBvcnRhbFsxXSArIGYxMSAqIHZlY1syXSxcbiAgICAgICAgZjE0ID0gcG9ydGFsQmFzZU9mZnNldCArIGYxMSAqIChyZXNvbmF0b3JNaWRPZmZzZXQgLSBwb3J0YWxCYXNlT2Zmc2V0KSArIGY1ICoga1tpXSxcbiAgICAgICAgZjE1ID0gZjYgKiBsW2ldLFxuICAgICAgICBmMTYgPSBmMTEgKiBmNDtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBpICogMiArIDAsIGYxMiArIGYxNSAqIHJpZ2h0WzBdLCBmMTQsIGYxMyArIGYxNSAqIHJpZ2h0WzJdLCAwLjAsIGYxNiArIGYxMCwgdXAsIGY4LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgaSAqIDIgKyAxLCBmMTIgLSBmMTUgKiByaWdodFswXSwgZjE0LCBmMTMgLSBmMTUgKiByaWdodFsyXSwgMS4wLCBmMTYgKyBmMTAsIHVwLCBmOCwgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIHN0ZXAgKyBpICogMiArIDAsIGYxMiwgZjE0ICsgZjE1LCBmMTMsIDAuMCwgZjE2ICsgZjEwLCByaWdodCwgZjgsIGNsKTtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBzdGVwICsgaSAqIDIgKyAxLCBmMTIsIGYxNCAtIGYxNSwgZjEzLCAxLjAsIGYxNiArIGYxMCwgcmlnaHQsIGY4LCBjbCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlRmFjZXModmVydGV4T2Zmc2V0KSB7XG4gIHZhciBpbmQgPSBuZXcgVWludDE2QXJyYXkoNDgpLFxuICAgICAgaU9mZiA9IDA7XG5cbiAgZm9yIChpID0gMDsgaSA8IDI7IGkrKykge1xuICAgIGZvciAodmFyIGkyID0gMDsgaTIgPCBfbGVuIC0gMTsgaTIrKykge1xuICAgICAgaW5kW2lPZmYgKyAwXSA9IHZlcnRleE9mZnNldCArIDE7XG4gICAgICBpbmRbaU9mZiArIDFdID0gdmVydGV4T2Zmc2V0ICsgMDtcbiAgICAgIGluZFtpT2ZmICsgMl0gPSB2ZXJ0ZXhPZmZzZXQgKyAyO1xuICAgICAgaW5kW2lPZmYgKyAzXSA9IHZlcnRleE9mZnNldCArIDE7XG4gICAgICBpbmRbaU9mZiArIDRdID0gdmVydGV4T2Zmc2V0ICsgMjtcbiAgICAgIGluZFtpT2ZmICsgNV0gPSB2ZXJ0ZXhPZmZzZXQgKyAzO1xuICAgICAgdmVydGV4T2Zmc2V0ICs9IDI7XG4gICAgICBpT2ZmICs9IDY7XG4gICAgfVxuICAgIHZlcnRleE9mZnNldCArPSAyO1xuICB9XG5cbiAgcmV0dXJuIGluZDtcbn1cblxuLyoqXHJcbiAqIEEgUmVzb25hdG9yTGlua01lc2ggaXMgYSBNZXNoIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBsaW5rIGJldHdlZW4gYSBwb3J0YWwgYW5kIGEgcmVzb25hdG9yXHJcbiAqXHJcbiAqIFRPRE86IE1ha2UgZGlzY29cclxuICpcclxuICogQGV4dGVuZHMge01lc2h9XHJcbiAqL1xuXG52YXIgUmVzb25hdG9yTGlua01lc2ggPSAoZnVuY3Rpb24gKF9NZXNoKSB7XG4gIF9pbmhlcml0cyhSZXNvbmF0b3JMaW5rTWVzaCwgX01lc2gpO1xuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIHJlc29uYXRvciBsaW5rIG1lc2hcclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgICAgICAgICAgICAgV2ViR0wgY29udGV4dFxyXG4gICAqIEBwYXJhbSAge3ZlYzJ9IHBvcnRhbFBvc2l0aW9uICAgICBYLFogb2YgdGhlIHBvcnRhbFxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gc2xvdCAgICAgICAgICAgICBSZXNvbmF0b3Igc2xvdCAoMC03KVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gZGlzdGFuY2UgICAgICAgICBEaXN0YW5jZSBmcm9tIHRoZSBwb3J0YWxcclxuICAgKiBAcGFyYW0gIHt2ZWM0fSBjb2xvciAgICAgICAgICAgICAgQ29sb3Igb2YgdGhlIHJlc29uYXRvciBsaW5rXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSByZXNvbmF0b3JQZXJjZW50IFBlcmNlbnQgaGVhbHRoIG9mIHRoZSByZXNvbmF0b3JcclxuICAgKi9cblxuICBmdW5jdGlvbiBSZXNvbmF0b3JMaW5rTWVzaChnbCwgcG9ydGFsUG9zaXRpb24sIHNsb3QsIGRpc3RhbmNlLCBjb2xvciwgcmVzb25hdG9yUGVyY2VudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZXNvbmF0b3JMaW5rTWVzaCk7XG5cbiAgICB2YXIgdGhldGEgPSBzbG90IC8gOCAqIDIgKiBNYXRoLlBJO1xuICAgIHZhciBlbmQgPSBfZ2xNYXRyaXgudmVjMi5jcmVhdGUoKTtcbiAgICB2YXIgcmVsYXRpdmUgPSBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKGRpc3RhbmNlICogTWF0aC5jb3ModGhldGEpLCBkaXN0YW5jZSAqIE1hdGguc2luKHRoZXRhKSk7XG4gICAgX2dsTWF0cml4LnZlYzIuYWRkKGVuZCwgcG9ydGFsUG9zaXRpb24sIHJlbGF0aXZlKTtcbiAgICB2YXIgYnVmID0gX2dlbmVyYXRlTGlua0F0dHJpYnV0ZXMocG9ydGFsUG9zaXRpb24sIGVuZCwgY29sb3IsIHJlc29uYXRvclBlcmNlbnQpO1xuICAgIHZhciBpbmQgPSBfZ2VuZXJhdGVGYWNlcygwKTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IFtdO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9wb3NpdGlvbicsIDQpKTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfdGV4Q29vcmQwJywgNCkpO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9jb2xvcicsIDQpKTtcbiAgICB2YXIgYXR0cmlidXRlID0gbmV3IF9nbEdsQXR0cmlidXRlMlsnZGVmYXVsdCddKGdsLCBhdHRyaWJ1dGVzLCBidWYsIGdsLkRZTkFNSUNfRFJBVyk7XG4gICAgdmFyIGZhY2VzID0gbmV3IF9nbEdsSW5kZXgyWydkZWZhdWx0J10oZ2wsIGluZCwgZ2wuVFJJQU5HTEVTKTtcbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihSZXNvbmF0b3JMaW5rTWVzaC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBhdHRyaWJ1dGUsIGZhY2VzKTtcbiAgfVxuXG4gIHJldHVybiBSZXNvbmF0b3JMaW5rTWVzaDtcbn0pKF9tZXNoMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gUmVzb25hdG9yTGlua01lc2g7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfbWVzaCA9IHJlcXVpcmUoJy4uL21lc2gnKTtcblxudmFyIF9tZXNoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2gpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL3ZlcnRleC1hdHRyaWJ1dGUnKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmVydGV4QXR0cmlidXRlKTtcblxudmFyIF9nbEdsSW5kZXggPSByZXF1aXJlKCcuLi9nbC9nbC1pbmRleCcpO1xuXG52YXIgX2dsR2xJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsSW5kZXgpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi9nbC9nbC1hdHRyaWJ1dGUnKTtcblxudmFyIF9nbEdsQXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xBdHRyaWJ1dGUpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8vIHBhcnQgb2YgZG9pbmcgYXdheSB3aXRoIHRoZSBUSFJFRS5qcyBkZXBlbmRlbmN5XG4vLyBtZWFucyBnaXZpbmcgdXAgYSBsb3Qgb2YgaGVscGVyIGNvZGUgZm9yIGRvaW5nIHRoaW5nc1xuLy8gbGlrZSB0aGlzLlxuLy9cbi8vIE5lZWRsZXNzIHRvIHNheSwgdGhpcyBib3Jyb3dzIGhlYXZpbHkgZnJvbSBUSFJFRS5TcGhlcmVHZW9tZXRyeVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9zcmMvZXh0cmFzL2dlb21ldHJpZXMvU3BoZXJlR2VvbWV0cnkuanNcbmZ1bmN0aW9uIGNyZWF0ZVNwaGVyZShyYWRpdXMsIHBoaVNsaWNlcywgdGhldGFTbGljZXMpIHtcbiAgdmFyIGksXG4gICAgICBqLFxuICAgICAgdSxcbiAgICAgIHYsXG4gICAgICB2ZWMsXG4gICAgICB2MSxcbiAgICAgIHYyLFxuICAgICAgdjMsXG4gICAgICB2NCxcbiAgICAgIHZlcnRpY2VzUm93LFxuICAgICAgZmFjZXMsXG4gICAgICBwaGkgPSBNYXRoLlBJICogMixcbiAgICAgIHRoZXRhID0gTWF0aC5QSSxcblxuICAvLyBzaXplIGlzIDggZm9yIHZlYzMgYV9wb3NpdGlvbiArIHZlYzIgYV90ZXhDb29yZCArIHZlYzMgYV9ub3JtYWxcbiAgdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheSgocGhpU2xpY2VzICsgMSkgKiAodGhldGFTbGljZXMgKyAxKSAqIDgpLFxuICAgICAgZmFjZUFycmF5ID0gW10sXG4gICAgICB2ZXJ0aWNlcyA9IFtdLFxuICAgICAgYUlkeCA9IDAsXG4gICAgICBhdHRyaWJ1dGVzID0gW107XG4gIHBoaVNsaWNlcyA9IE1hdGgubWF4KDMsIHBoaVNsaWNlcyB8fCA4KTtcbiAgdGhldGFTbGljZXMgPSBNYXRoLm1heCgyLCB0aGV0YVNsaWNlcyB8fCA2KTtcblxuICBmb3IgKGkgPSAwOyBpIDw9IHBoaVNsaWNlczsgaSsrKSB7XG4gICAgdmVydGljZXNSb3cgPSBbXTtcbiAgICBmb3IgKGogPSAwOyBqIDw9IHRoZXRhU2xpY2VzOyBqKyspIHtcbiAgICAgIHUgPSBqIC8gcGhpU2xpY2VzO1xuICAgICAgdiA9IGkgLyB0aGV0YVNsaWNlcztcbiAgICAgIHZlYyA9IF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoLXJhZGl1cyAqIE1hdGguY29zKHUgKiBwaGkpICogTWF0aC5zaW4odiAqIHRoZXRhKSwgcmFkaXVzICogTWF0aC5jb3ModiAqIHRoZXRhKSwgcmFkaXVzICogTWF0aC5zaW4odSAqIHBoaSkgKiBNYXRoLnNpbih2ICogdGhldGEpKTtcblxuICAgICAgdmFsdWVzW2FJZHggKiA4ICsgMF0gPSB2ZWNbMF07XG4gICAgICB2YWx1ZXNbYUlkeCAqIDggKyAxXSA9IHZlY1sxXTtcbiAgICAgIHZhbHVlc1thSWR4ICogOCArIDJdID0gdmVjWzJdO1xuICAgICAgdmFsdWVzW2FJZHggKiA4ICsgM10gPSB1O1xuICAgICAgdmFsdWVzW2FJZHggKiA4ICsgNF0gPSB2O1xuICAgICAgLy8gbm9ybWFsaXplZDpcbiAgICAgIF9nbE1hdHJpeC52ZWMzLm5vcm1hbGl6ZSh2ZWMsIHZlYyk7XG4gICAgICB2YWx1ZXNbYUlkeCAqIDggKyA1XSA9IHZlY1swXTtcbiAgICAgIHZhbHVlc1thSWR4ICogOCArIDZdID0gdmVjWzFdO1xuICAgICAgdmFsdWVzW2FJZHggKiA4ICsgN10gPSB2ZWNbMl07XG5cbiAgICAgIHZlcnRpY2VzUm93LnB1c2goYUlkeCsrKTtcbiAgICB9XG4gICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1Jvdyk7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgcGhpU2xpY2VzOyBpKyspIHtcbiAgICBmb3IgKGogPSAwOyBqIDwgdGhldGFTbGljZXM7IGorKykge1xuICAgICAgdjEgPSB2ZXJ0aWNlc1tpXVtqICsgMV07XG4gICAgICB2MiA9IHZlcnRpY2VzW2ldW2pdO1xuICAgICAgdjMgPSB2ZXJ0aWNlc1tpICsgMV1bal07XG4gICAgICB2NCA9IHZlcnRpY2VzW2kgKyAxXVtqICsgMV07XG5cbiAgICAgIGlmIChNYXRoLmFicyh2YWx1ZXNbdjEgKiA4ICsgMV0pID09PSByYWRpdXMpIHtcbiAgICAgICAgZmFjZUFycmF5LnB1c2guYXBwbHkoZmFjZUFycmF5LCBbdjEsIHYzLCB2NF0pO1xuICAgICAgICB2YWx1ZXNbdjEgKiA4ICsgM10gPSAodmFsdWVzW3YxICogOCArIDNdICsgdmFsdWVzW3YyICogOCArIDNdKSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKHZhbHVlc1t2MyAqIDggKyAxXSkgPT09IHJhZGl1cykge1xuICAgICAgICBmYWNlQXJyYXkucHVzaC5hcHBseShmYWNlQXJyYXksIFt2MSwgdjIsIHYzXSk7XG4gICAgICAgIHZhbHVlc1t2MyAqIDggKyAzXSA9ICh2YWx1ZXNbdjMgKiA4ICsgM10gKyB2YWx1ZXNbdjQgKiA4ICsgM10pIC8gMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY2VBcnJheS5wdXNoLmFwcGx5KGZhY2VBcnJheSwgW3YxLCB2MiwgdjRdKTtcbiAgICAgICAgZmFjZUFycmF5LnB1c2guYXBwbHkoZmFjZUFycmF5LCBbdjIsIHYzLCB2NF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZhY2VzID0gbmV3IFVpbnQxNkFycmF5KGZhY2VBcnJheS5sZW5ndGgpO1xuICBmYWNlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAodiwgaSkge1xuICAgIGZhY2VzW2ldID0gdjtcbiAgfSk7XG4gIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9wb3NpdGlvbicsIDMpKTtcbiAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3RleENvb3JkMCcsIDIpKTtcbiAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX25vcm1hbCcsIDMpKTtcbiAgcmV0dXJuIHtcbiAgICB2YWx1ZXM6IHZhbHVlcyxcbiAgICBmYWNlczogZmFjZXMsXG4gICAgYXR0cmlidXRlczogYXR0cmlidXRlc1xuICB9O1xufVxuXG4vKipcclxuICogQSBTcGhlcmVNZXNoIGlzIGEgTWVzaCB0aGF0IGlzIGEgc3BoZXJlLCBtYWRlIG9mIGEgbnVtYmVyIG9mIHF1YWRzIGRldGVybWluZWRcclxuICogYnkgdGhlIG51bWJlciBvZiBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBzbGljZXMgaW52b2x2ZWQgaW4gaXRzIGNvbnN0cnVjdGlvblxyXG4gKlxyXG4gKiBAZXh0ZW5kcyB7TWVzaH1cclxuICovXG5cbnZhciBTcGhlcmVNZXNoID0gKGZ1bmN0aW9uIChfTWVzaCkge1xuICBfaW5oZXJpdHMoU3BoZXJlTWVzaCwgX01lc2gpO1xuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIHNwaGVyZVxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgICBXZWJHTCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSByYWRpdXMgIFJhZGl1cyBvZiB0aGUgc3BoZXJlXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSB2U2xpY2VzIE51bWJlciBvZiB2ZXJ0aWNhbCBzbGljZXNcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGhTbGljZXMgTnVtYmVyIG9mIGhvcml6b250YWwgc2xpY2VzXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gU3BoZXJlTWVzaChnbCwgcmFkaXVzLCB2U2xpY2VzLCBoU2xpY2VzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNwaGVyZU1lc2gpO1xuXG4gICAgdmFyIHBhcnNlZCA9IGNyZWF0ZVNwaGVyZShyYWRpdXMsIHZTbGljZXMsIGhTbGljZXMpO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gbmV3IF9nbEdsQXR0cmlidXRlMlsnZGVmYXVsdCddKGdsLCBwYXJzZWQuYXR0cmlidXRlcywgcGFyc2VkLnZhbHVlcyk7XG4gICAgdmFyIGZhY2VzID0gbmV3IF9nbEdsSW5kZXgyWydkZWZhdWx0J10oZ2wsIHBhcnNlZC5mYWNlcywgZ2wuVFJJQU5HTEVTKTtcbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTcGhlcmVNZXNoLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIGF0dHJpYnV0ZXMsIGZhY2VzKTtcbiAgfVxuXG4gIHJldHVybiBTcGhlcmVNZXNoO1xufSkoX21lc2gyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBTcGhlcmVNZXNoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX21lc2ggPSByZXF1aXJlKCcuLi9tZXNoJyk7XG5cbnZhciBfbWVzaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNoKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi92ZXJ0ZXgtYXR0cmlidXRlJyk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlcnRleEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xHbEluZGV4ID0gcmVxdWlyZSgnLi4vZ2wvZ2wtaW5kZXgnKTtcblxudmFyIF9nbEdsSW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEluZGV4KTtcblxudmFyIF9nbEdsQXR0cmlidXRlID0gcmVxdWlyZSgnLi4vZ2wvZ2wtYXR0cmlidXRlJyk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsQXR0cmlidXRlKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgX2NodW5rU2l6ZSA9IDEzO1xudmFyIGJhc2VDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC40NiwgMC4xOCwgMC4xOCwgMS4wKTtcbnZhciBiYXNlT2Zmc2V0ID0gX2dsTWF0cml4LnZlYzQuY3JlYXRlKCk7XG5cbmZ1bmN0aW9uIGNsYW1wZWRTaW4oZikge1xuICByZXR1cm4gTWF0aC5zaW4oTWF0aC5QSSAqIE1hdGgubWF4KE1hdGgubWluKDEuMCwgZiksIDApIC8gMik7XG59XG5cbmZ1bmN0aW9uIGdldEJlYXJpbmcoc3RhcnQsIGVuZCkge1xuICB2YXIgcyA9IHN0YXJ0WzBdLFxuICAgICAgZSA9IGVuZFswXSxcbiAgICAgIGRsID0gZW5kWzFdIC0gc3RhcnRbMV07XG4gIHZhciB5ID0gTWF0aC5zaW4oZGwpICogTWF0aC5jb3MoZSksXG4gICAgICB4ID0gTWF0aC5jb3MocykgKiBNYXRoLnNpbihlKSAtIE1hdGguc2luKHMpICogTWF0aC5jb3MoZSkgKiBNYXRoLmNvcyhkbCk7XG5cbiAgcmV0dXJuIChNYXRoLmF0YW4yKHksIHgpICsgTWF0aC5QSSAqIDIpICUgKE1hdGguUEkgKiAyKTtcbn1cblxuZnVuY3Rpb24gZGVzdChwLCBiZWFyaW5nLCBhbmdsZSkge1xuICB2YXIgbGF0ID0gTWF0aC5hc2luKE1hdGguc2luKHBbMF0pICogTWF0aC5jb3MoYW5nbGUpICsgTWF0aC5jb3MocFswXSkgKiBNYXRoLnNpbihhbmdsZSkgKiBNYXRoLmNvcyhiZWFyaW5nKSksXG4gICAgICBsb24gPSBwWzFdICsgTWF0aC5hdGFuMihNYXRoLnNpbihiZWFyaW5nKSAqIE1hdGguc2luKGFuZ2xlKSAqIE1hdGguY29zKHBbMF0pLCBNYXRoLmNvcyhhbmdsZSkgLSBNYXRoLnNpbihwWzBdKSAqIE1hdGguc2luKGxhdCkpO1xuXG4gIGxvbiA9IChsb24gKyAzICogTWF0aC5QSSkgJSAoMiAqIE1hdGguUEkpIC0gTWF0aC5QSTtcbiAgcmV0dXJuIF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMobGF0LCBsb24pO1xufVxuXG5mdW5jdGlvbiBidWlsZE1hdHJpeChzLCBlLCByYWRpdXMpIHtcbiAgdmFyIG1hdCA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICBfZ2xNYXRyaXgubWF0NC5yb3RhdGVZKG1hdCwgbWF0LCBzWzFdKTtcbiAgX2dsTWF0cml4Lm1hdDQucm90YXRlWihtYXQsIG1hdCwgc1swXSAtIE1hdGguUEkgLyAyKTtcbiAgX2dsTWF0cml4Lm1hdDQucm90YXRlWShtYXQsIG1hdCwgLWdldEJlYXJpbmcocywgZSkpO1xuICBfZ2xNYXRyaXgubWF0NC50cmFuc2xhdGUobWF0LCBtYXQsIFswLCByYWRpdXMsIDBdKTtcbiAgcmV0dXJuIG1hdDtcbn1cblxuZnVuY3Rpb24gZ2V0UmFkaWFsRGlzdGFuY2UocywgZSkge1xuICB2YXIgZExhdCA9IGVbMF0gLSBzWzBdLFxuICAgICAgZExvbiA9IGVbMV0gLSBzWzFdO1xuXG4gIHZhciBhID0gTWF0aC5zaW4oZExhdCAvIDIpICogTWF0aC5zaW4oZExhdCAvIDIpICsgTWF0aC5jb3Moc1swXSkgKiBNYXRoLmNvcyhlWzBdKSAqIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguc2luKGRMb24gLyAyKTtcblxuICByZXR1cm4gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMSAtIGEpKTtcbn1cblxuZnVuY3Rpb24gdG9SYWRpYW5zKHBvaW50KSB7XG4gIHJldHVybiBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKHBvaW50WzBdICogTWF0aC5QSSAvIDE4MCwgcG9pbnRbMV0gKiBNYXRoLlBJIC8gMTgwKTtcbn1cblxuZnVuY3Rpb24gZmlsbENodW5rKGJ1ZiwgaW5kZXgsIHBvcywgdXYsIG5vcm1hbCwgZjYsIGNvbG9yKSB7XG4gIHZhciBvZmYgPSBpbmRleCAqIF9jaHVua1NpemU7XG4gIF9nbE1hdHJpeC52ZWMzLm5vcm1hbGl6ZShub3JtYWwsIG5vcm1hbCk7XG4gIGJ1ZltvZmYgKyAwXSA9IHBvc1swXTtcbiAgYnVmW29mZiArIDFdID0gcG9zWzFdO1xuICBidWZbb2ZmICsgMl0gPSBwb3NbMl07XG4gIGJ1ZltvZmYgKyAzXSA9IGY2O1xuICBidWZbb2ZmICsgNF0gPSB1dlswXTtcbiAgYnVmW29mZiArIDVdID0gdXZbMV07XG4gIGJ1ZltvZmYgKyA2XSA9IG5vcm1hbFswXTtcbiAgYnVmW29mZiArIDddID0gbm9ybWFsWzFdO1xuICBidWZbb2ZmICsgOF0gPSBub3JtYWxbMl07XG4gIGJ1ZltvZmYgKyA5XSA9IGNvbG9yWzBdO1xuICBidWZbb2ZmICsgMTBdID0gY29sb3JbMV07XG4gIGJ1ZltvZmYgKyAxMV0gPSBjb2xvclsyXTtcbiAgYnVmW29mZiArIDEyXSA9IGNvbG9yWzNdO1xufVxuXG4vLyBzdGFydCBhbmQgZW5kIHNob3VsZCBwcm9iYWJseSBiZSBpbiByYWRpYW5zP1xuZnVuY3Rpb24gX2dlbmVyYXRlTGlua0F0dHJpYnV0ZXMocmFkaXVzLCBzdGFydCwgZW5kLCBjb2xvciwgc3RhcnRQZXJjZW50LCBlbmRQZXJjZW50KSB7XG4gIHZhciBzID0gdG9SYWRpYW5zKHN0YXJ0KTtcbiAgdmFyIGUgPSB0b1JhZGlhbnMoZW5kKTtcbiAgdmFyIGFuZ2xlID0gZ2V0UmFkaWFsRGlzdGFuY2UocywgZSk7XG4gIHZhciBiZWFyaW5nID0gZ2V0QmVhcmluZyhzLCBlKTtcbiAgdmFyIGxlbmd0aCA9IGFuZ2xlICogcmFkaXVzO1xuICB2YXIgc2VnbWVudHMgPSBNYXRoLm1heChNYXRoLmZsb29yKGFuZ2xlIC8gTWF0aC5QSSAqIDUwKSArIDEsIDgpOyAvLyA1MCBzZWdtZW50cyBmb3IgYSBoYWxmLWNpcmNsZSBzb3VuZHMgZ29vZCwgSSBndWVzcy5cbiAgc3RhcnRQZXJjZW50ID0gc3RhcnRQZXJjZW50ID09PSB1bmRlZmluZWQgPyAxIDogTWF0aC5tYXgoTWF0aC5taW4oc3RhcnRQZXJjZW50LCAxKSwgMCk7XG4gIGVuZFBlcmNlbnQgPSBlbmRQZXJjZW50ID09PSB1bmRlZmluZWQgPyAxIDogTWF0aC5tYXgoTWF0aC5taW4oZW5kUGVyY2VudCwgMSksIDApO1xuICB2YXIgdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShzZWdtZW50cyAqIF9jaHVua1NpemUgKiA2KTtcbiAgdmFyIHlNaW4gPSBiYXNlT2Zmc2V0WzFdLFxuICAgICAgeU1heCA9IHlNaW4gKyBNYXRoLm1pbihyYWRpdXMgKiAwLjAxLCAwLjA4ICogbGVuZ3RoKSxcbiAgICAgIGF2Z1BlcmNlbnQgPSAoc3RhcnRQZXJjZW50ICsgZW5kUGVyY2VudCkgLyAyLjAsXG4gICAgICBmNiA9IDAuMDEgKiBsZW5ndGgsXG4gICAgICBmNyA9IDAuMSArIGF2Z1BlcmNlbnQgKiAwLjMsXG4gICAgICB1cCA9IF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMCwgMSwgMCksXG4gICAgICByaWdodCA9IF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMSk7XG4gIHZhciBzdGVwID0gc2VnbWVudHMgKiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNlZ21lbnRzOyBpKyspIHtcbiAgICB2YXIgZjggPSBpIC8gKHNlZ21lbnRzIC0gMSksXG4gICAgICAgIGY5ID0gc3RhcnRQZXJjZW50ICsgZjggKiAoZW5kUGVyY2VudCAtIHN0YXJ0UGVyY2VudCksXG4gICAgICAgIGYxMCA9IDAuNiArIDAuMzUgKiBmOSxcblxuICAgIC8vIHYgYXMgaW4gXCJ1dlwiIGFzIGluIHRleGNvb3Jkc1xuICAgIHYgPSBmOCAqIGY2LFxuXG4gICAgLy8gXCJjdXJyZW50XCIgcG9pbnQgaW4gcHJvZ3Jlc3Npb25cbiAgICBjdXJyID0gZjggPT09IDAgPyBzIDogZGVzdChzLCBiZWFyaW5nLCBhbmdsZSAqIGY4KSxcblxuICAgIC8vIFwibmV4dFwiIHBvaW50IGluIHRoZSBwcm9ncmVzc2lvblxuICAgIG5leHQgPSBkZXN0KHMsIGJlYXJpbmcsIGFuZ2xlICogKGY4ICsgMSAvIChzZWdtZW50cyAtIDEpKSksXG4gICAgICAgIHRyYW5zZm9ybSA9IGJ1aWxkTWF0cml4KGN1cnIsIG5leHQsIHJhZGl1cyksXG5cbiAgICAvLyBcImhlaWdodFwiIG9mIHRoZSBjZW50ZXJwb2ludCBvZiB0aGUgbGluay5cbiAgICBoID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCB5TWluICsgKDMuMCArIC0xLjUgKiBNYXRoLnBvdyhjbGFtcGVkU2luKDIuMCAqIE1hdGguYWJzKGY4IC0gMC41KSksIDQpKSAqICh5TWF4IC0geU1pbiksIDApLFxuXG4gICAgLy8gXCJyYWRpdXNcIiBvZiB0aGUgbGlua1xuICAgIHcgPSByYWRpdXMgKiAwLjAxICogY2xhbXBlZFNpbigxLjAgLSAyLjAgKiBNYXRoLmFicyhmOCAtIDAuNSkpLFxuICAgICAgICB3VXAgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIHcsIDApLFxuICAgICAgICB3UmlnaHQgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDAsIHcpLFxuICAgICAgICBjbCA9IF9nbE1hdHJpeC52ZWM0LmxlcnAoX2dsTWF0cml4LnZlYzQuY3JlYXRlKCksIGJhc2VDb2xvciwgY29sb3IsIDAuMjUgKyBmOSAqIDAuNzUpO1xuICAgIGNsWzNdID0gZjEwO1xuXG4gICAgLy8gdG9wIGhvcml6b250YWwgc2VnbWVudFxuICAgIC8vIHJpZ2h0IHBvaW50XG4gICAgZmlsbENodW5rKHZhbHVlcywgaSAqIDIsIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLmFkZChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgaCwgd1JpZ2h0KSwgdHJhbnNmb3JtKSwgX2dsTWF0cml4LnZlYzIuZnJvbVZhbHVlcygwLCB2KSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgdXAsIHRyYW5zZm9ybSksIGY3LCBjbCk7XG4gICAgLy8gbGVmdCBwb2ludFxuICAgIGZpbGxDaHVuayh2YWx1ZXMsIGkgKiAyICsgMSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgX2dsTWF0cml4LnZlYzMuc3VidHJhY3QoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIGgsIHdSaWdodCksIHRyYW5zZm9ybSksIF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMC41LCB2KSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgdXAsIHRyYW5zZm9ybSksIGY3LCBjbCk7XG5cbiAgICAvLyB0b3AgdmVydGljYWwgc2VnbWVudFxuICAgIGZpbGxDaHVuayh2YWx1ZXMsIHN0ZXAgKyBpICogMiwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgX2dsTWF0cml4LnZlYzMuYWRkKF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBoLCB3VXApLCB0cmFuc2Zvcm0pLCBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKDAsIHYpLCBfZ2xNYXRyaXgudmVjMy50cmFuc2Zvcm1NYXQ0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCByaWdodCwgdHJhbnNmb3JtKSwgZjcsIGNsKTtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBzdGVwICsgaSAqIDIgKyAxLCBfZ2xNYXRyaXgudmVjMy50cmFuc2Zvcm1NYXQ0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBfZ2xNYXRyaXgudmVjMy5zdWJ0cmFjdChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgaCwgd1VwKSwgdHJhbnNmb3JtKSwgX2dsTWF0cml4LnZlYzIuZnJvbVZhbHVlcygwLjUsIHYpLCBfZ2xNYXRyaXgudmVjMy50cmFuc2Zvcm1NYXQ0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCByaWdodCwgdHJhbnNmb3JtKSwgZjcsIGNsKTtcblxuICAgIC8vIGJvdHRvbSB2ZXJ0aWNhbCBzZWdtZW50XG4gICAgZmlsbENodW5rKHZhbHVlcywgMiAqIHN0ZXAgKyBpICogMiwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgX2dsTWF0cml4LnZlYzMuc3VidHJhY3QoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIGgsIHdVcCksIHRyYW5zZm9ybSksIF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMC41LCB2KSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgcmlnaHQsIHRyYW5zZm9ybSksIGY3LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgMiAqIHN0ZXAgKyBpICogMiArIDEsIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCksIHRyYW5zZm9ybSksIF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMS4wLCB2KSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgcmlnaHQsIHRyYW5zZm9ybSksIGY3LCBjbCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlRmFjZXModmVydGV4T2Zmc2V0LCBzZWdtZW50cykge1xuICB2YXIgaW5kID0gbmV3IFVpbnQxNkFycmF5KDYgKiAoc2VnbWVudHMgLSAxKSAqIDMpLFxuICAgICAgaU9mZiA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlZ21lbnRzIC0gMTsgaisrKSB7XG5cbiAgICAgIGluZFtpT2ZmICsgMF0gPSB2ZXJ0ZXhPZmZzZXQgKyAxO1xuICAgICAgaW5kW2lPZmYgKyAxXSA9IHZlcnRleE9mZnNldCArIDA7XG4gICAgICBpbmRbaU9mZiArIDJdID0gdmVydGV4T2Zmc2V0ICsgMjtcbiAgICAgIGluZFtpT2ZmICsgM10gPSB2ZXJ0ZXhPZmZzZXQgKyAxO1xuICAgICAgaW5kW2lPZmYgKyA0XSA9IHZlcnRleE9mZnNldCArIDI7XG4gICAgICBpbmRbaU9mZiArIDVdID0gdmVydGV4T2Zmc2V0ICsgMztcbiAgICAgIHZlcnRleE9mZnNldCArPSAyO1xuICAgICAgaU9mZiArPSA2O1xuICAgIH1cbiAgICB2ZXJ0ZXhPZmZzZXQgKz0gMjtcbiAgfVxuXG4gIHJldHVybiBpbmQ7XG59XG5cbi8qKlxyXG4gKiBBIFNwaGVyZWljYWxQb3J0YWxMaW5rTWVzaCBpcyBhIE1lc2ggdGhhdCByZXByZXNlbnRzIGEgcG9ydGFsIGxpbmsgYmV0d2VuIHR3byBwb3J0YWxzXHJcbiAqIG9uIHRoZSBzdXJmYWNlIG9mIGEgc3BoZXJlXHJcbiAqXHJcbiAqIEBleHRlbmRzIHtNZXNofVxyXG4gKi9cblxudmFyIFNwaGVyaWNhbFBvcnRhbExpbmtNZXNoID0gKGZ1bmN0aW9uIChfTWVzaCkge1xuICBfaW5oZXJpdHMoU3BoZXJpY2FsUG9ydGFsTGlua01lc2gsIF9NZXNoKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBzcGhlcmljYWwgcG9ydGFsIGxpbmtcclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgICAgICAgICBXZWJHTCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBzcGhlcmVSYWRpdXMgUmFkaXVzIG9mIHRoZSBzcGhlcmVcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBzdGFydCAgICAgICAgICBsYXQsbG5nIG9mIHRoZSBvcmlnaW4gcG9pbnRcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBlbmQgICAgICAgICAgICBsYXQsbG5nIG9mIHRoZSBkZXN0aW9uYXRpb24gcG9pbnRcclxuICAgKiBAcGFyYW0gIHt2ZWM0fSBjb2xvciAgICAgICAgICBDb2xvciBvZiB0aGUgbGlua1xyXG4gICAqIEBwYXJhbSAge051bWJlcn0gc3RhcnRQZXJjZW50IE9yaWdpbiBwb3J0YWwgaGVhbHRoIHBlcmNlbnRhZ2VcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGVuZFBlcmNlbnQgICBEZXN0aW5hdGlvbiBwb3J0YWwgaGVhbHRoIHBlcmNlbnRhZ2VcclxuICAgKi9cblxuICBmdW5jdGlvbiBTcGhlcmljYWxQb3J0YWxMaW5rTWVzaChnbCwgc3BoZXJlUmFkaXVzLCBzdGFydCwgZW5kLCBjb2xvciwgc3RhcnRQZXJjZW50LCBlbmRQZXJjZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNwaGVyaWNhbFBvcnRhbExpbmtNZXNoKTtcblxuICAgIHZhciBidWYgPSBfZ2VuZXJhdGVMaW5rQXR0cmlidXRlcyhzcGhlcmVSYWRpdXMsIHN0YXJ0LCBlbmQsIGNvbG9yLCBzdGFydFBlcmNlbnQsIGVuZFBlcmNlbnQpO1xuICAgIHZhciBsZW4gPSBidWYubGVuZ3RoLFxuICAgICAgICBzZWdtZW50cyA9IE1hdGguZmxvb3IobGVuIC8gX2NodW5rU2l6ZSAvIDYpO1xuICAgIHZhciBpbmQgPSBfZ2VuZXJhdGVGYWNlcygwLCBzZWdtZW50cyk7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBbXTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfcG9zaXRpb24nLCA0KSk7XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3RleENvb3JkMCcsIDIpKTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2Ffbm9ybWFsJywgMykpO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9jb2xvcicsIDQpKTtcbiAgICB2YXIgYXR0cmlidXRlID0gbmV3IF9nbEdsQXR0cmlidXRlMlsnZGVmYXVsdCddKGdsLCBhdHRyaWJ1dGVzLCBidWYsIGdsLkRZTkFNSUNfRFJBVyk7XG4gICAgdmFyIGZhY2VzID0gbmV3IF9nbEdsSW5kZXgyWydkZWZhdWx0J10oZ2wsIGluZCwgZ2wuVFJJQU5HTEVTKTtcbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTcGhlcmljYWxQb3J0YWxMaW5rTWVzaC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBhdHRyaWJ1dGUsIGZhY2VzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiBTcGhlcmljYWxQb3J0YWxMaW5rTWVzaDtcbn0pKF9tZXNoMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU3BoZXJpY2FsUG9ydGFsTGlua01lc2g7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUElfSEFMRiA9IE1hdGguUEkgLyAyLjA7XG52YXIgTUlOX0xPR19ESVNUID0gNS4wO1xuXG5mdW5jdGlvbiBjbG9uZVRvdWNoKHRvdWNoKSB7XG4gIHJldHVybiB7IGlkZW50aWZpZXI6IHRvdWNoLmlkZW50aWZpZXIsIHg6IHRvdWNoLmNsaWVudFgsIHk6IHRvdWNoLmNsaWVudFkgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VG91Y2hJbmRleCh0b3VjaGVzLCB0b3VjaCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodG91Y2hlc1tpXS5pZGVudGlmaWVyID09IHRvdWNoLmlkZW50aWZpZXIpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxyXG4gKiBDYW1lcmEgY29udHJvbHMgZm9yIGNvbnRyb2xsaW5nIGEgY2FtZXJhIHRoYXQgb3JiaXRzIGEgZml4ZWQgcG9pbnQsXHJcbiAqIHdpdGggdmFyaWFibGUgcG9zaXRpb24gYW5kIGRlcHRoLlxyXG4gKlxyXG4gKiBUaGlzIGlzIGEgcG9ydCBvZiB0aGUgVEhSRUUuanMgT3JiaXRDb250cm9scyBmb3VuZCB3aXRoIHRoZSB3ZWJnbCBnbG9iZS5cclxuICovXG5cbnZhciBPcmJpdENvbnRyb2xzID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGFuIG9yYml0aW5nIGNhbWVyYSBjb250cm9sLlxyXG4gICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50ICBUYXJnZXQgZWxlbWVudCB0byBiaW5kIGxpc3RlbmVycyB0b1xyXG4gICAqIEBwYXJhbSAge051bWJlcn0gZGlzdGFuY2UgU3RhcnRpbmcgZGlzdGFuY2UgZnJvbSBvcmlnaW5cclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgIEhhc2ggb2Ygb3B0aW9ucyBmb3IgY29uZmlndXJhdGlvblxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIE9yYml0Q29udHJvbHMoZWxlbWVudCwgZGlzdGFuY2UsIG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgT3JiaXRDb250cm9scyk7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZSB8fCAyO1xuICAgIHRoaXMuZGlzdGFuY2VUYXJnZXQgPSB0aGlzLmRpc3RhbmNlO1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICB6b29tRGFtcDogMC41LFxuICAgICAgZGlzdGFuY2VTY2FsZTogMC41LFxuICAgICAgZGlzdGFuY2VNYXg6IDEwMDAsXG4gICAgICBkaXN0YW5jZU1pbjogMSxcbiAgICAgIHRvdWNoU2NhbGU6IDAuMSxcbiAgICAgIHdoZWVsU2NhbGU6IDAuMDEsXG4gICAgICBmcmljdGlvbjogMC4yLFxuICAgICAgdGFyZ2V0OiBfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSxcbiAgICAgIGFsbG93Wm9vbTogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zID0gKDAsIF91dGlscy5zZXRQYXJhbXMpKHBhcmFtcywgb3B0aW9ucyk7XG4gICAgdGhpcy5tb3VzZSA9IHsgeDogMCwgeTogMCB9O1xuICAgIHRoaXMubW91c2VPbkRvd24gPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLnJvdGF0aW9uID0geyB4OiAwLCB5OiAwIH07XG4gICAgdGhpcy50YXJnZXQgPSB7IHg6IE1hdGguUEkgKiAzIC8gMiwgeTogTWF0aC5QSSAvIDYuMCB9O1xuICAgIHRoaXMudGFyZ2V0T25Eb3duID0geyB4OiAwLCB5OiAwIH07XG4gICAgdGhpcy5vdmVyUmVuZGVyZXIgPSBmYWxzZTtcbiAgICAvLyBQcmUtYmluZCBhbGwgdGhlc2UgaGFuZGxlcnMgc28gd2UgY2FuIHVuYmluZCB0aGUgbGlzdGVuZXJzIGxhdGVyLlxuICAgIHRoaXMubW91c2VNb3ZlID0gdGhpcy5fb25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlVXAgPSB0aGlzLl9vbk1vdXNlVXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlT3V0ID0gdGhpcy5fb25Nb3VzZU91dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW91c2VEb3duID0gdGhpcy5fb25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlV2hlZWwgPSB0aGlzLl9vbk1vdXNlV2hlZWwuYmluZCh0aGlzKTtcblxuICAgIHRoaXMudG91Y2hlcyA9IFtdO1xuICAgIHRoaXMudG91Y2hEZWx0YSA9IDA7XG4gICAgdGhpcy50b3VjaE1vdmUgPSB0aGlzLl9vblRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG91Y2hFbmQgPSB0aGlzLl9vblRvdWNoRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy50b3VjaExlYXZlID0gdGhpcy5fb25Ub3VjaExlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gdGhpcy5fb25Ub3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZU92ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5vdmVyUmVuZGVyZXIgPSB0cnVlO1xuICAgIH0pLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZU91dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLm92ZXJSZW5kZXJlciA9IGZhbHNlO1xuICAgIH0pLmJpbmQodGhpcyk7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gIH1cblxuICAvKipcclxuICAgKiBVbmJpbmRzIGFsbCBsaXN0ZW5lcnMgYW5kIGRpc2FibGVzIHRoZSBjb250cm9sc1xyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhPcmJpdENvbnRyb2xzLCBbe1xuICAgIGtleTogJ2Rpc2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLm1vdXNlT3V0LCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hsZWF2ZScsIHRoaXMudG91Y2hMZWF2ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB0aGlzLm1vdXNlV2hlZWwsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm1vdXNlT3ZlciwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5tb3VzZU91dCwgZmFsc2UpO1xuICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyBhbGwgbGlzdGVuZXJzIGFuZCBlbmFibGVzIHRoZSBjb250cm9sc1xyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdlbmFibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24sIGZhbHNlKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dab29tKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgdGhpcy5tb3VzZVdoZWVsLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMubW91c2VPdmVyLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLm1vdXNlT3V0LCBmYWxzZSk7XG4gICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSBnaXZlbiBjYW1lcmEgbWF0cml4IHdpdGggbmV3IHBvc2l0aW9uIGluZm9ybWF0aW9uLCBldGNcclxuICAgICAqIEBwYXJhbSAge21hdDR9IHZpZXcgICBBIHZpZXcgbWF0cml4XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVZpZXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWaWV3KHZpZXcpIHtcbiAgICAgIHZhciBkeCA9IHRoaXMudGFyZ2V0LnggLSB0aGlzLnJvdGF0aW9uLngsXG4gICAgICAgICAgZHkgPSB0aGlzLnRhcmdldC55IC0gdGhpcy5yb3RhdGlvbi55LFxuICAgICAgICAgIGR6ID0gdGhpcy5kaXN0YW5jZVRhcmdldCAtIHRoaXMuZGlzdGFuY2UsXG4gICAgICAgICAgY2FtZXJhUG9zaXRpb24gPSBfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKTtcbiAgICAgIGlmIChNYXRoLmFicyhkeCkgPiAwLjAwMDAxIHx8IE1hdGguYWJzKGR5KSA+IDAuMDAwMDEgfHwgTWF0aC5hYnMoZHopID4gMC4wMDAwMSkge1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnggKz0gZHggKiB0aGlzLm9wdGlvbnMuZnJpY3Rpb247XG4gICAgICAgIHRoaXMucm90YXRpb24ueSArPSBkeSAqIHRoaXMub3B0aW9ucy5mcmljdGlvbjtcbiAgICAgICAgdGhpcy5kaXN0YW5jZSArPSBkeiAqIHRoaXMub3B0aW9ucy5kaXN0YW5jZVNjYWxlO1xuXG4gICAgICAgIGNhbWVyYVBvc2l0aW9uWzBdID0gdGhpcy5kaXN0YW5jZSAqIE1hdGguc2luKHRoaXMucm90YXRpb24ueCkgKiBNYXRoLmNvcyh0aGlzLnJvdGF0aW9uLnkpICsgdGhpcy5vcHRpb25zLnRhcmdldFswXTtcbiAgICAgICAgY2FtZXJhUG9zaXRpb25bMV0gPSB0aGlzLmRpc3RhbmNlICogTWF0aC5zaW4odGhpcy5yb3RhdGlvbi55KSArIHRoaXMub3B0aW9ucy50YXJnZXRbMV07XG4gICAgICAgIGNhbWVyYVBvc2l0aW9uWzJdID0gdGhpcy5kaXN0YW5jZSAqIE1hdGguY29zKHRoaXMucm90YXRpb24ueCkgKiBNYXRoLmNvcyh0aGlzLnJvdGF0aW9uLnkpICsgdGhpcy5vcHRpb25zLnRhcmdldFsyXTtcblxuICAgICAgICBfZ2xNYXRyaXgubWF0NC5sb29rQXQodmlldywgY2FtZXJhUG9zaXRpb24sIHRoaXMub3B0aW9ucy50YXJnZXQsIFswLCAxLCAwXSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3VwZGF0ZVRhcmdldHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlVGFyZ2V0cygpIHtcbiAgICAgIHZhciBzY2FsZSA9IHRoaXMuZGlzdGFuY2UgPCBNSU5fTE9HX0RJU1QgPyB0aGlzLmRpc3RhbmNlIDogTWF0aC5sb2codGhpcy5kaXN0YW5jZSk7XG4gICAgICB2YXIgem9vbURhbXAgPSBzY2FsZSAvIHRoaXMub3B0aW9ucy56b29tRGFtcDtcblxuICAgICAgdGhpcy50YXJnZXQueCA9IHRoaXMudGFyZ2V0T25Eb3duLnggKyAodGhpcy5tb3VzZS54IC0gdGhpcy5tb3VzZU9uRG93bi54KSAqIDAuMDA1ICogem9vbURhbXA7XG4gICAgICB0aGlzLnRhcmdldC55ID0gdGhpcy50YXJnZXRPbkRvd24ueSArICh0aGlzLm1vdXNlLnkgLSB0aGlzLm1vdXNlT25Eb3duLnkpICogMC4wMDUgKiB6b29tRGFtcDtcblxuICAgICAgdGhpcy50YXJnZXQueSA9IHRoaXMudGFyZ2V0LnkgPiBQSV9IQUxGID8gUElfSEFMRiA6IHRoaXMudGFyZ2V0Lnk7XG4gICAgICB0aGlzLnRhcmdldC55ID0gdGhpcy50YXJnZXQueSA8IC1QSV9IQUxGID8gLVBJX0hBTEYgOiB0aGlzLnRhcmdldC55O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlRG93bicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRG93bihldikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXAsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMubW91c2VPdXQsIGZhbHNlKTtcblxuICAgICAgdGhpcy5tb3VzZU9uRG93bi54ID0gLWV2LmNsaWVudFg7XG4gICAgICB0aGlzLm1vdXNlT25Eb3duLnkgPSBldi5jbGllbnRZO1xuICAgICAgdGhpcy50YXJnZXRPbkRvd24ueCA9IHRoaXMudGFyZ2V0Lng7XG4gICAgICB0aGlzLnRhcmdldE9uRG93bi55ID0gdGhpcy50YXJnZXQueTtcblxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZU1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZU1vdmUoZXYpIHtcbiAgICAgIHRoaXMubW91c2UueCA9IC1ldi5jbGllbnRYO1xuICAgICAgdGhpcy5tb3VzZS55ID0gZXYuY2xpZW50WTtcbiAgICAgIHRoaXMuX3VwZGF0ZVRhcmdldHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZVVwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VVcChldikge1xuICAgICAgdGhpcy5fb25Nb3VzZU91dChldik7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2F1dG8nO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlT3V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VPdXQoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLm1vdXNlT3V0LCBmYWxzZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VXaGVlbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlV2hlZWwoZXYpIHtcbiAgICAgIGlmICh0aGlzLm92ZXJSZW5kZXJlcikge1xuICAgICAgICB0aGlzLl96b29tKGV2LndoZWVsRGVsdGFZICogdGhpcy5vcHRpb25zLndoZWVsU2NhbGUgKiAodGhpcy5kaXN0YW5jZSA8IE1JTl9MT0dfRElTVCA/IHRoaXMuZGlzdGFuY2UgOiBNYXRoLmxvZyh0aGlzLmRpc3RhbmNlKSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoU3RhcnQoZXYpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50b3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hsZWF2ZScsIHRoaXMudG91Y2hMZWF2ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMudG91Y2hlcy5wdXNoKGNsb25lVG91Y2goZXYuY2hhbmdlZFRvdWNoZXNbaV0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5tb3VzZU9uRG93bi54ID0gLXRoaXMudG91Y2hlc1swXS54O1xuICAgICAgICB0aGlzLm1vdXNlT25Eb3duLnkgPSB0aGlzLnRvdWNoZXNbMF0ueTtcblxuICAgICAgICB0aGlzLnRhcmdldE9uRG93bi54ID0gdGhpcy50YXJnZXQueDtcbiAgICAgICAgdGhpcy50YXJnZXRPbkRvd24ueSA9IHRoaXMudGFyZ2V0Lnk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudG91Y2hlcy5sZW5ndGggPT09IDIgJiYgdGhpcy5vcHRpb25zLmFsbG93Wm9vbSkge1xuICAgICAgICB2YXIgeCA9IE1hdGguYWJzKHRoaXMudG91Y2hlc1swXS54IC0gdGhpcy50b3VjaGVzWzFdLngpO1xuICAgICAgICB2YXIgeSA9IE1hdGguYWJzKHRoaXMudG91Y2hlc1swXS55IC0gdGhpcy50b3VjaGVzWzFdLnkpO1xuXG4gICAgICAgIHRoaXMudG91Y2hEZWx0YSA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Ub3VjaE1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Ub3VjaE1vdmUoZXYpIHtcbiAgICAgIHZhciBjaGFuZ2VkID0gZXYuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgbCA9IGNoYW5nZWQubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGlkeCA9IGdldFRvdWNoSW5kZXgodGhpcy50b3VjaGVzLCBjaGFuZ2VkW2ldKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgdGhpcy50b3VjaGVzLnNwbGljZShpZHgsIDEsIGNsb25lVG91Y2goY2hhbmdlZFtpXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3VsZCBub3QgZmluZCBldmVudCAnLCBjaGFuZ2VkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLm1vdXNlLnggPSAtdGhpcy50b3VjaGVzWzBdLng7XG4gICAgICAgIHRoaXMubW91c2UueSA9IHRoaXMudG91Y2hlc1swXS55O1xuICAgICAgICB0aGlzLnVwZGF0ZVRhcmdldHMoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMiAmJiB0aGlzLm9wdGlvbnMuYWxsb3dab29tKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy50b3VjaGVzWzBdLnggLSB0aGlzLnRvdWNoZXNbMV0ueDtcbiAgICAgICAgdmFyIHkgPSB0aGlzLnRvdWNoZXNbMF0ueSAtIHRoaXMudG91Y2hlc1sxXS55O1xuXG4gICAgICAgIHZhciBuZXdEZWx0YSA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICAgICAgdGhpcy5fem9vbSgobmV3RGVsdGEgLSB0aGlzLnRvdWNoRGVsdGEpICogdGhpcy5vcHRpb25zLnRvdWNoU2NhbGUpO1xuICAgICAgICB0aGlzLnRvdWNoRGVsdGEgPSBuZXdEZWx0YTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfcmVtb3ZlVG91Y2hlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZW1vdmVUb3VjaGVzKGV2KSB7XG4gICAgICB2YXIgY2hhbmdlZCA9IGV2LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgIGwgPSBjaGFuZ2VkLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBpZHggPSBnZXRUb3VjaEluZGV4KHRoaXMudG91Y2hlcywgY2hhbmdlZFtpXSk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgIHRoaXMudG91Y2hlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMudG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobGVhdmUnLCB0aGlzLnRvdWNoTGVhdmUsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLm1vdXNlT25Eb3duLnggPSAtdGhpcy50b3VjaGVzWzBdLng7XG4gICAgICAgIHRoaXMubW91c2VPbkRvd24ueSA9IHRoaXMudG91Y2hlc1swXS55O1xuXG4gICAgICAgIHRoaXMudGFyZ2V0T25Eb3duLnggPSB0aGlzLnRhcmdldC54O1xuICAgICAgICB0aGlzLnRhcmdldE9uRG93bi55ID0gdGhpcy50YXJnZXQueTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Ub3VjaEVuZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoRW5kKGV2KSB7XG4gICAgICB0aGlzLl9yZW1vdmVUb3VjaGVzKGV2KTtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hMZWF2ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoTGVhdmUoZXYpIHtcbiAgICAgIHRoaXMuX3JlbW92ZVRvdWNoZXMoZXYpO1xuICAgIH1cblxuICAgIC8vP1xuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hDYW5jZWwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Ub3VjaENhbmNlbChldikge1xuICAgICAgdGhpcy5fcmVtb3ZlVG91Y2hlcyhldik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3pvb20nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfem9vbShkZWx0YSkge1xuICAgICAgdGhpcy5kaXN0YW5jZVRhcmdldCAtPSBkZWx0YTtcbiAgICAgIHRoaXMuZGlzdGFuY2VUYXJnZXQgPSBNYXRoLm1pbih0aGlzLmRpc3RhbmNlVGFyZ2V0LCB0aGlzLm9wdGlvbnMuZGlzdGFuY2VNYXgpO1xuICAgICAgdGhpcy5kaXN0YW5jZVRhcmdldCA9IE1hdGgubWF4KHRoaXMuZGlzdGFuY2VUYXJnZXQsIHRoaXMub3B0aW9ucy5kaXN0YW5jZU1pbik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE9yYml0Q29udHJvbHM7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBPcmJpdENvbnRyb2xzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmV4cG9ydHMuZml4UHJlY2lzaW9uID0gZml4UHJlY2lzaW9uO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfZ2xCb3VuZCA9IHJlcXVpcmUoJy4vZ2wtYm91bmQnKTtcblxudmFyIF9nbEJvdW5kMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsQm91bmQpO1xuXG4vKipcclxuICogRml4ZXMgYW4gaXNzdWUgd2l0aCBzaGFkZXJzIHdoZXJlIHRoZSBzaGFkZXIgZG9lc24ndCBzZXQgYSBwcmVjaXNpb24sXHJcbiAqIGxlYWRpbmcgaXQgdG8gaGF2ZSBhIG1pc21hdGNoIHdpdGggaXRzIGNvdW50ZXJwYXJ0XHJcbiAqXHJcbiAqIEkuZS4gdGhlIHZlcnRleCBzaGFkZXIgbWlnaHQgc2V0IGEgcHJlY2lzaW9uLCBidXQgdGhlIGZyYWdtZW50IHNoYWRlclxyXG4gKiBkb2VzIG5vdCwgbGVhZGluZyB0byBwcmVjaXNpb24gbWlzbWF0Y2ggZXJyb3JzLlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHNoYWRlciBUaGUgc2hhZGVyIHRvIGNoZWNrL2ZpeFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICBUaGUgZml4ZWQgc2hhZGVyLCBvciB0aGUgb3JpZ2luYWwgaWYgaXQgbmVlZGVkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG5vIHBhdGNoaW5nLlxyXG4gKi9cblxuZnVuY3Rpb24gZml4UHJlY2lzaW9uKHNoYWRlcikge1xuICBpZiAoL3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0L2cudGVzdChzaGFkZXIpKSB7XG4gICAgcmV0dXJuIHNoYWRlcjtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGluZXMgPSBzaGFkZXIuc3BsaXQoXCJcXG5cIik7XG4gICAgbGluZXMuc3BsaWNlKDEsIDAsIFwiI2lmZGVmIEdMX0VTXCIsIFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsIFwiI2VuZGlmXCIpO1xuICAgIHJldHVybiBsaW5lcy5qb2luKFwiXFxuXCIpO1xuICB9XG59XG5cbi8vIFRha2VuIGZyb20gUGhpbG9HTCdzIHByb2dyYW0gY2xhc3M6XG4vL1JldHVybnMgYSBNYWdpYyBVbmlmb3JtIFNldHRlclxuZnVuY3Rpb24gZ2V0VW5pZm9ybVNldHRlcihnbCwgcHJvZ3JhbSwgaW5mbywgaXNBcnJheSkge1xuICB2YXIgbmFtZSA9IGluZm8ubmFtZSxcbiAgICAgIGxvYyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKSxcbiAgICAgIHR5cGUgPSBpbmZvLnR5cGUsXG4gICAgICBtYXRyaXggPSBmYWxzZSxcbiAgICAgIHZlY3RvciA9IHRydWUsXG4gICAgICBnbEZ1bmN0aW9uLFxuICAgICAgdHlwZWRBcnJheTtcblxuICBpZiAoaW5mby5zaXplID4gMSAmJiBpc0FycmF5KSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIGdsLkZMT0FUOlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTFmdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IEZsb2F0MzJBcnJheTtcbiAgICAgICAgdmVjdG9yID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5JTlQ6Y2FzZSBnbC5CT09MOmNhc2UgZ2wuU0FNUExFUl8yRDpjYXNlIGdsLlNBTVBMRVJfQ1VCRTpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0xaXY7XG4gICAgICAgIHR5cGVkQXJyYXkgPSBVaW50MTZBcnJheTtcbiAgICAgICAgdmVjdG9yID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmICh2ZWN0b3IpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgZ2wuRkxPQVQ6XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtMWY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5GTE9BVF9WRUMyOlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTJmdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IGlzQXJyYXkgPyBGbG9hdDMyQXJyYXkgOiBuZXcgRmxvYXQzMkFycmF5KDIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZ2wuRkxPQVRfVkVDMzpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0zZnY7XG4gICAgICAgIHR5cGVkQXJyYXkgPSBpc0FycmF5ID8gRmxvYXQzMkFycmF5IDogbmV3IEZsb2F0MzJBcnJheSgzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLkZMT0FUX1ZFQzQ6XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtNGZ2O1xuICAgICAgICB0eXBlZEFycmF5ID0gaXNBcnJheSA/IEZsb2F0MzJBcnJheSA6IG5ldyBGbG9hdDMyQXJyYXkoNCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5JTlQ6Y2FzZSBnbC5CT09MOmNhc2UgZ2wuU0FNUExFUl8yRDpjYXNlIGdsLlNBTVBMRVJfQ1VCRTpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0xaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLklOVF9WRUMyOmNhc2UgZ2wuQk9PTF9WRUMyOlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTJpdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IGlzQXJyYXkgPyBVaW50MTZBcnJheSA6IG5ldyBVaW50MTZBcnJheSgyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLklOVF9WRUMzOmNhc2UgZ2wuQk9PTF9WRUMzOlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTNpdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IGlzQXJyYXkgPyBVaW50MTZBcnJheSA6IG5ldyBVaW50MTZBcnJheSgzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLklOVF9WRUM0OmNhc2UgZ2wuQk9PTF9WRUM0OlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTRpdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IGlzQXJyYXkgPyBVaW50MTZBcnJheSA6IG5ldyBVaW50MTZBcnJheSg0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLkZMT0FUX01BVDI6XG4gICAgICAgIG1hdHJpeCA9IHRydWU7XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtTWF0cml4MmZ2O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZ2wuRkxPQVRfTUFUMzpcbiAgICAgICAgbWF0cml4ID0gdHJ1ZTtcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm1NYXRyaXgzZnY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5GTE9BVF9NQVQ0OlxuICAgICAgICBtYXRyaXggPSB0cnVlO1xuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybU1hdHJpeDRmdjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy9UT0RPKG5pY28pOiBTYWZhcmkgNS4xIGRvZXNuJ3QgaGF2ZSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5cbiAgLy9yZW1vdmUgdGhpcyBjaGVjayB3aGVuIHRoZXkgaW1wbGVtZW50IGl0LlxuICBpZiAoZ2xGdW5jdGlvbi5iaW5kKSB7XG4gICAgZ2xGdW5jdGlvbiA9IGdsRnVuY3Rpb24uYmluZChnbCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdsRnVuY3Rpb247XG4gICAgZ2xGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRhcmdldC5hcHBseShnbCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy9TZXQgYSB1bmlmb3JtIGFycmF5XG4gIGlmIChpc0FycmF5ICYmIHR5cGVkQXJyYXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgZ2xGdW5jdGlvbihsb2MsIG5ldyB0eXBlZEFycmF5KHZhbCkpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICB9O1xuXG4gICAgLy9TZXQgYSBtYXRyaXggdW5pZm9ybVxuICB9IGVsc2UgaWYgKG1hdHJpeCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgZ2xGdW5jdGlvbihsb2MsIGZhbHNlLCB2YWwpO1xuICAgICAgfTtcblxuICAgICAgLy9TZXQgYSB2ZWN0b3IvdHlwZWQgYXJyYXkgdW5pZm9ybVxuICAgIH0gZWxzZSBpZiAodHlwZWRBcnJheSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIHR5cGVkQXJyYXkuc2V0KHZhbC50b0Zsb2F0MzJBcnJheSA/IHZhbC50b0Zsb2F0MzJBcnJheSgpIDogdmFsKTtcbiAgICAgICAgICBnbEZ1bmN0aW9uKGxvYywgdHlwZWRBcnJheSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy9TZXQgYSBwcmltaXRpdmUtdmFsdWVkIHVuaWZvcm1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGdsRnVuY3Rpb24obG9jLCB2YWwpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAvLyBGSVhNRTogVW5yZWFjaGFibGUgY29kZVxuICB0aHJvdyBcIlVua25vd24gdHlwZTogXCIgKyB0eXBlO1xufVxuXG4vKipcclxuICogUmVwcmVzZW50cyBhIHNoYWRlciBwcm9ncmFtIGNvbnNpc3Rpbmcgb2YgYSB2ZXJ0ZXggc2hhZGVyIGFuZCBhIGZyYWdtZW50XHJcbiAqIHNoYWRlci5cclxuICogQGV4dGVuZHMge0dMQm91bmR9XHJcbiAqL1xuXG52YXIgUHJvZ3JhbSA9IChmdW5jdGlvbiAoX0dMQm91bmQpIHtcbiAgX2luaGVyaXRzKFByb2dyYW0sIF9HTEJvdW5kKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgcHJvZ3JhbSBmcm9tIHRoZSBnaXZlbiB2ZXJ0ZXggYW5kIGZyYWdtZW50IHNoYWRlciBzdHJpbmdzLlxyXG4gICAqXHJcbiAgICogTWFuYWdlcyB0aGUgc2hhZGVyJ3MgYXR0cmlidXRlcyBhbmQgdW5pZm9ybXMuXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgICBXZWJnbCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSB2ZXJ0ZXggICBWZXJ0ZXggc2hhZGVyXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBmcmFnbWVudCBGcmFnbWVudCBzaGFkZXJcclxuICAgKi9cblxuICBmdW5jdGlvbiBQcm9ncmFtKGdsLCB2ZXJ0ZXgsIGZyYWdtZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFByb2dyYW0pO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUHJvZ3JhbS5wcm90b3R5cGUpLCBcImNvbnN0cnVjdG9yXCIsIHRoaXMpLmNhbGwodGhpcywgZ2wpO1xuICAgIHRoaXMucHJvZ3JhbSA9IG51bGw7XG4gICAgdGhpcy52ZXJ0ZXhTb3VyY2UgPSBmaXhQcmVjaXNpb24odmVydGV4KTtcbiAgICB0aGlzLmZyYWdtZW50U291cmNlID0gZnJhZ21lbnQ7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy51bmlmb3JtcyA9IHt9O1xuICB9XG5cbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgc2hhZGVyXHJcbiAgICpcclxuICAgKiBQYXJzZXMgb3V0IHNoYWRlciBwYXJhbWV0ZXJzLCBjb21waWxlcyB0aGUgc2hhZGVyLCBhbmQgYmluZHMgaXQgdG9cclxuICAgKiB0aGUgY29udGV4dC5cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoUHJvZ3JhbSwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2wsXG4gICAgICAgICAgdmVydGV4LFxuICAgICAgICAgIGZyYWdtZW50O1xuICAgICAgdmVydGV4ID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleCwgdGhpcy52ZXJ0ZXhTb3VyY2UpO1xuICAgICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXgpO1xuICAgICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodmVydGV4LCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGdsLmdldFNoYWRlckluZm9Mb2codmVydGV4KSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvdWxkIG5vdCBjb21waWxlIHZlcnRleCBzaGFkZXI6ICcgKyB0aGlzLnZlcnRleFNvdXJjZSk7XG4gICAgICAgIHRocm93ICdWZXJ0ZXggc2hhZGVyIGNvbXBpbGUgZXJyb3IhJztcbiAgICAgIH1cbiAgICAgIGZyYWdtZW50ID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnQsIHRoaXMuZnJhZ21lbnRTb3VyY2UpO1xuICAgICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudCk7XG4gICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihmcmFnbWVudCwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihnbC5nZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50KSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvdWxkIG5vdCBjb21waWxlIGZyYWdtZW50IHNoYWRlcjogJyArIHRoaXMuZnJhZ21lbnRTb3VyY2UpO1xuICAgICAgICB0aHJvdyAnRnJhZ21lbnQgc2hhZGVyIGNvbXBpbGUgZXJyb3IhJztcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdmVydGV4KTtcbiAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIGZyYWdtZW50KTtcblxuICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKTtcblxuICAgICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgIC8vIFRPRE86IHZlcmJvc2UgbGlrZSBhYm92ZVxuICAgICAgICB0aHJvdyAnQ291bGQgbm90IGxpbmsgcHJvZ3JhbSc7XG4gICAgICB9XG4gICAgICBnbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG5cbiAgICAgIHRoaXMuX3NldHVwTG9jYXRpb25zKCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdGhlIHByb2dyYW0gd2l0aCB0aGUgZ2l2ZW4gZHJhdyBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYWN0dWFsIGRyYXdpbmcuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgVGhlIHByb2dyYW1zIGF0dHJpYnV0ZXMgYW5kIHVuaWZvcm1zIHdpbGxcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICBiZSBwYXNzZWQgdG8gdGhlIGRyYXcgZnVuY3Rpb24gZm9yIHVzZS5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInVzZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1c2UoZm4pIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgaWYgKCF0aGlzLnByb2dyYW0pIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG4gICAgICB9XG4gICAgICBmbih0aGlzLmF0dHJpYnV0ZXMsIHRoaXMudW5pZm9ybXMpO1xuICAgICAgLy9nbC51c2VQcm9ncmFtKDApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfc2V0dXBMb2NhdGlvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldHVwTG9jYXRpb25zKCkge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2wsXG4gICAgICAgICAgcHJvZ3JhbSA9IHRoaXMucHJvZ3JhbTtcbiAgICAgIC8vIHRoaXMgaXMgdGFrZW4gcGFydGx5IGZyb20gUGhpbG9HTCdzIFByb2dyYW0gY2xhc3MuXG4gICAgICAvL2ZpbGwgYXR0cmlidXRlIGxvY2F0aW9uc1xuICAgICAgdmFyIGxlbiA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpLFxuICAgICAgICAgIGluZm8sXG4gICAgICAgICAgbmFtZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaW5mbyA9IGdsLmdldEFjdGl2ZUF0dHJpYihwcm9ncmFtLCBpKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW2luZm8ubmFtZV0gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBpbmZvLm5hbWUpO1xuICAgICAgfVxuXG4gICAgICAvL2NyZWF0ZSB1bmlmb3JtIHNldHRlcnNcbiAgICAgIGxlbiA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpbmZvID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybShwcm9ncmFtLCBpKTtcbiAgICAgICAgbmFtZSA9IGluZm8ubmFtZTtcbiAgICAgICAgLy9pZiBhcnJheSBuYW1lIHRoZW4gY2xlYW4gdGhlIGFycmF5IGJyYWNrZXRzXG4gICAgICAgIG5hbWUgPSBuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT0gJ10nID8gbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAzKSA6IG5hbWU7XG4gICAgICAgIHRoaXMudW5pZm9ybXNbbmFtZV0gPSBnZXRVbmlmb3JtU2V0dGVyKGdsLCBwcm9ncmFtLCBpbmZvLCBpbmZvLm5hbWUgIT0gbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFByb2dyYW07XG59KShfZ2xCb3VuZDJbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBQcm9ncmFtOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9wcm9ncmFtID0gcmVxdWlyZSgnLi4vcHJvZ3JhbScpO1xuXG52YXIgX3Byb2dyYW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvZ3JhbSk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcclxuICogQSBHbG93cmFtcFByb2dyYW0gaXMgYSBwcm9ncmFtIG1lYW50IGZvciBkcmF3aW5nXHJcbiAqIHRyYW5zcGFyZW50IGdsb3dyYW1wIGRyYXdhYmxlc1xyXG4gKlxyXG4gKiBAZXh0ZW5kcyB7UHJvZ3JhbX1cclxuICovXG5cbnZhciBHbG93cmFtcFByb2dyYW0gPSAoZnVuY3Rpb24gKF9Qcm9ncmFtKSB7XG4gIF9pbmhlcml0cyhHbG93cmFtcFByb2dyYW0sIF9Qcm9ncmFtKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgR2xvd3JhbXAgcHJvZ3JhbSBnaXZlbiB2ZXJ0ZXggYW5kIGZyYWdtZW50IHNoYWRlciBzb3VyY2VzXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgICBXZWJHTCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSB2ZXJ0ZXggICBWZXJ0ZXggc2hhZGVyIHNvdXJjZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gZnJhZ21lbnQgRnJhZ21lbnQgc2hhZGVyIHNvdXJjZVxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEdsb3dyYW1wUHJvZ3JhbShnbCwgdmVydGV4LCBmcmFnbWVudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHbG93cmFtcFByb2dyYW0pO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoR2xvd3JhbXBQcm9ncmFtLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIHZlcnRleCwgZnJhZ21lbnQpO1xuICB9XG5cbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgcHJvZ3JhbSB0byBkcmF3XHJcbiAgICpcclxuICAgKiBTZXRzIHVwIHRoZSBwcm9wZXIgYmxlbmRpbmcgbW9kZXMsIGV0Y1xyXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiBUaGUgZHJhdyBmdW5jdGlvblxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhHbG93cmFtcFByb2dyYW0sIFt7XG4gICAga2V5OiAndXNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXNlKGZuKSB7XG4gICAgICBpZiAoIXRoaXMucHJvZ3JhbSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH1cbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgLy8gaW5pdCBzdHVmZnMuXG4gICAgICBnbC5kaXNhYmxlKGdsLkNVTExfRkFDRSk7XG4gICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgZ2wuZGVwdGhNYXNrKGZhbHNlKTtcbiAgICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgICAgLy9nbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSwgZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgICAgZm4odGhpcy5hdHRyaWJ1dGVzLCB0aGlzLnVuaWZvcm1zKTtcblxuICAgICAgKDAsIF91dGlscy5yZXNldEdMKShnbCk7XG4gICAgICAvL2dsLnVzZVByb2dyYW0oMCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdsb3dyYW1wUHJvZ3JhbTtcbn0pKF9wcm9ncmFtMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gR2xvd3JhbXBQcm9ncmFtO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3Byb2dyYW0gPSByZXF1aXJlKCcuLi9wcm9ncmFtJyk7XG5cbnZhciBfcHJvZ3JhbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtKTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxyXG4gKiBBbmQgT3BhcXVlUHJvZ3JhbSBpcyBhIFByb2dyYW0gdXNlZCB0byBkcmF3IG9wYXF1ZSBkcmF3YWJsZXNcclxuICpcclxuICogQGV4dGVuZHMge1Byb2dyYW19XHJcbiAqL1xuXG52YXIgT3BhcXVlUHJvZ3JhbSA9IChmdW5jdGlvbiAoX1Byb2dyYW0pIHtcbiAgX2luaGVyaXRzKE9wYXF1ZVByb2dyYW0sIF9Qcm9ncmFtKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYW4gb3BhcXVlIHByb2dyYW0gZ2l2ZW4gdmVydGV4IGFuZCBmcmFnbWVudCBzaGFkZXJcclxuICAgKiBzb3VyY2VzLlxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgICAgV2ViR0wgY29udGV4dFxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdmVydGV4ICAgVmVydGV4IHNoYWRlciBzb3VyY2VcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGZyYWdtZW50IEZyYWdtZW50IHNoYWRlciBzb3VyY2VcclxuICAgKi9cblxuICBmdW5jdGlvbiBPcGFxdWVQcm9ncmFtKGdsLCB2ZXJ0ZXgsIGZyYWdtZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE9wYXF1ZVByb2dyYW0pO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoT3BhcXVlUHJvZ3JhbS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCB2ZXJ0ZXgsIGZyYWdtZW50KTtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIHByb2dyYW0gdG8gZHJhdy5cclxuICAgKlxyXG4gICAqIFNldHMgdXAgdGhlIHByb3BlciBjdWxsaW5nIGZvciBkcmF3aW5nIG9wYXF1ZSBvYmplY3RzXHJcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuIFRoZSBkcmF3IGZ1bmN0aW9uXHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKE9wYXF1ZVByb2dyYW0sIFt7XG4gICAga2V5OiAndXNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXNlKGZuKSB7XG4gICAgICBpZiAoIXRoaXMucHJvZ3JhbSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH1cbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgLy8gaW5pdCBzdHVmZnMuXG4gICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcbiAgICAgIGdsLmZyb250RmFjZShnbC5DQ1cpO1xuICAgICAgZ2wuY3VsbEZhY2UoZ2wuQkFDSyk7XG4gICAgICBnbC5kZXB0aE1hc2sodHJ1ZSk7XG5cbiAgICAgIGZuKHRoaXMuYXR0cmlidXRlcywgdGhpcy51bmlmb3Jtcyk7XG5cbiAgICAgICgwLCBfdXRpbHMucmVzZXRHTCkoZ2wpO1xuICAgICAgLy9nbC51c2VQcm9ncmFtKDApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBPcGFxdWVQcm9ncmFtO1xufSkoX3Byb2dyYW0yWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBPcGFxdWVQcm9ncmFtO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2dsQm91bmQgPSByZXF1aXJlKCcuL2dsLWJvdW5kJyk7XG5cbnZhciBfZ2xCb3VuZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEJvdW5kKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vKipcclxuICogLi4uIEluIHJldHJvc3BlY3QsIEknbSBub3Qgc3VyZSBleGFjdGx5IHRoZSBwdXJwb3NlIHRoaXMgY2xhc3Mgc2VydmVzXHJcbiAqIEl0IHNlZW1zIHRoYXQgT2JqZWN0UmVuZGVyZXIgaW5oZXJpdHMgZnJvbSB0aGlzIGNsYXNzLCBidXQgaXQncyBhbHNvXHJcbiAqIHRoZSBvbmx5IHJlbmRlcmVyIHRoYXQncyBjdXJyZW50bHkgdXNlZC5cclxuICogVE9ETzogUmV2aXNpdCB0aGlzXHJcbiAqIEBleHRlbmRzIHtHTEJvdW5kfVxyXG4gKi9cblxudmFyIFJlbmRlcmVyID0gKGZ1bmN0aW9uIChfR0xCb3VuZCkge1xuICBfaW5oZXJpdHMoUmVuZGVyZXIsIF9HTEJvdW5kKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSByZW5kZXJlciBnaXZlbiBhIGNvbnRleHQgYW5kIGEgbWFuYWdlclxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgICAgICAgICBBIFdlYkdMIGNvbnRleHRcclxuICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgQW4gQXNzZXRNYW5hZ2VyIHRvIG1hbmFnZSBHTC1ib3VuZFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXNcclxuICAgKi9cblxuICBmdW5jdGlvbiBSZW5kZXJlcihnbCwgbWFuYWdlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZW5kZXJlcik7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihSZW5kZXJlci5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsKTtcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMudmlld1Byb2plY3QgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLnZpZXcgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLnByb2plY3QgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICB9XG5cbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBpbnRlcm5hbCB2aWV3IGFuZCBwcm9qZWN0aW9uIG1hdHJpY2VzXHJcbiAgICogQHBhcmFtICB7bWF0NH0gdmlldyAgICBWaWV3IG1hdHJpeFxyXG4gICAqIEBwYXJhbSAge21hdDR9IHByb2plY3QgUHJvamVjdGlvbiBtYXRyaXhcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoUmVuZGVyZXIsIFt7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcodmlldywgcHJvamVjdCkge1xuICAgICAgdGhpcy52aWV3ID0gdmlldztcbiAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5tdWx0aXBseSh0aGlzLnZpZXdQcm9qZWN0LCBwcm9qZWN0LCB2aWV3KTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEFjdHVhbGx5IGNvbnRyb2xzIHRoZSByZW5kZXIgbG9vcD9cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgY29uc29sZS53YXJuKFwiYmFzZSBjbGFzcyByZW5kZXJzIG5vdGhpbmcuXCIpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgaW50ZXJuYWwgY291bnRlciBvZiBlbGFwc2VkIHRpbWUuXHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGRlbHRhIFRpbWUgZWxhcHNlZCBzaW5jZSBsYXN0IHJlbmRlciBjYWxsXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVRpbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVUaW1lKGRlbHRhKSB7XG4gICAgICB0aGlzLmVsYXBzZWQgKz0gZGVsdGE7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFJlbmRlcmVyO1xufSkoX2dsQm91bmQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBSZW5kZXJlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9yZW5kZXJlciA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyJyk7XG5cbnZhciBfcmVuZGVyZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVuZGVyZXIpO1xuXG52YXIgX2RyYXdhYmxlID0gcmVxdWlyZSgnLi4vZHJhd2FibGUnKTtcblxudmFyIF9kcmF3YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZSk7XG5cbi8vIFRPRE8gcmV3b3JrIHRoaXMuXG5cbnZhciBPYmplY3RSZW5kZXJlciA9IChmdW5jdGlvbiAoX1JlbmRlcmVyKSB7XG4gIF9pbmhlcml0cyhPYmplY3RSZW5kZXJlciwgX1JlbmRlcmVyKTtcblxuICBmdW5jdGlvbiBPYmplY3RSZW5kZXJlcihnbCwgbWFuYWdlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBPYmplY3RSZW5kZXJlcik7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3RSZW5kZXJlci5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBtYW5hZ2VyKTtcbiAgICB0aGlzLmRyYXdhYmxlcyA9IFtdO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE9iamVjdFJlbmRlcmVyLCBbe1xuICAgIGtleTogJ2FkZERyYXdhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRHJhd2FibGUoZHJhd2FibGUpIHtcbiAgICAgIGlmICghZHJhd2FibGUgaW5zdGFuY2VvZiBfZHJhd2FibGUyWydkZWZhdWx0J10pIHtcbiAgICAgICAgdGhyb3cgJ0RyYXdhYmxlcyBtdXN0IGFsd2F5cyBpbmhlcml0IGZyb20gdGhlIGJhc2UgRHJhd2FibGUnO1xuICAgICAgfVxuICAgICAgaWYgKCFkcmF3YWJsZS5pbml0KHRoaXMubWFuYWdlcikpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdjb3VsZCBub3QgaW5pdGlhbGl6ZSBkcmF3YWJsZTogJywgZHJhd2FibGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoZHJhd2FibGUudXBkYXRlVmlldykge1xuICAgICAgICBkcmF3YWJsZS51cGRhdGVWaWV3KHRoaXMudmlld1Byb2plY3QsIHRoaXMudmlldywgdGhpcy5wcm9qZWN0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd2FibGVzLnB1c2goZHJhd2FibGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZURyYXdhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRHJhd2FibGUoZHJhd2FibGUsIGRlc3Ryb3kpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kcmF3YWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhd2FibGVzW2ldID09PSBkcmF3YWJsZSkge1xuICAgICAgICAgIHRoaXMuZHJhd2FibGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBpZiAoZGVzdHJveSkge1xuICAgICAgICAgICAgZHJhd2FibGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkcmF3YWJsZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGRFbnRpdHknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRFbnRpdHkoZW50aXR5KSB7XG4gICAgICBmb3IgKHZhciBpIGluIGVudGl0eS5kcmF3YWJsZXMpIHtcbiAgICAgICAgdGhpcy5hZGREcmF3YWJsZShlbnRpdHkuZHJhd2FibGVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVWaWV3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVmlldyh2aWV3LCBwcm9qZWN0KSB7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3RSZW5kZXJlci5wcm90b3R5cGUpLCAndXBkYXRlVmlldycsIHRoaXMpLmNhbGwodGhpcywgdmlldywgcHJvamVjdCk7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICBsZW4gPSB0aGlzLmRyYXdhYmxlcy5sZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhd2FibGVzW2ldLnVwZGF0ZVZpZXcpIHtcbiAgICAgICAgICB0aGlzLmRyYXdhYmxlc1tpXS51cGRhdGVWaWV3KHRoaXMudmlld1Byb2plY3QsIHZpZXcsIHByb2plY3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAgbGVuID0gdGhpcy5kcmF3YWJsZXMubGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHRoaXMuZHJhd2FibGVzW2ldLmRyYXcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVUaW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVGltZShkZWx0YSkge1xuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0UmVuZGVyZXIucHJvdG90eXBlKSwgJ3VwZGF0ZVRpbWUnLCB0aGlzKS5jYWxsKHRoaXMsIGRlbHRhKTtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGxlbiA9IHRoaXMuZHJhd2FibGVzLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAvLyBpZiB0aGVzZSByZXR1cm4gZmFsc2UsIHJlbW92ZSB0aGVtIGZyb20gdGhlIHJlbmRlciBsb29wOlxuICAgICAgICBpZiAoIXRoaXMuZHJhd2FibGVzW2ldLnVwZGF0ZVRpbWUoZGVsdGEpKSB7XG4gICAgICAgICAgdGhpcy5kcmF3YWJsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgICBsZW4tLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBPYmplY3RSZW5kZXJlcjtcbn0pKF9yZW5kZXJlcjJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IE9iamVjdFJlbmRlcmVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2dsQm91bmQgPSByZXF1aXJlKCcuL2dsLWJvdW5kJyk7XG5cbnZhciBfZ2xCb3VuZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEJvdW5kKTtcblxuLyoqXHJcbiAqIEEgZ2wtYm91bmQgdGV4dHVyZVxyXG4gKiBTdXBwb3J0cyBtb3N0IChhbGw/KSBvZiB0aGUgdGV4dHVyZSBiaW5kaW5nIG9wdGlvbnMuXHJcbiAqIEFsc28gZ2VuZXJhdGVzIG1pcG1hcHMgaWYgdGhlIHRleHR1cmUgcmVxdWlyZXMgaXQuXHJcbiAqL1xuXG52YXIgVGV4dHVyZSA9IChmdW5jdGlvbiAoX0dMQm91bmQpIHtcbiAgX2luaGVyaXRzKFRleHR1cmUsIF9HTEJvdW5kKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgZ2wtYm91bmQgdGV4dHVyZSwgc2V0cyBhbGwgdGhlIHByb3BlciBwYXJhbWV0ZXJzLCBhbmQgYmluZHNcclxuICAgKiBpdCB0byB0aGUgY29udGV4dFxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgQSBXZWJHTCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBpbmZvICBUZXh0dXJlIHBhcmFtZXRlcnNcclxuICAgKiBAcGFyYW0gIHtJbWFnZXN9IGltYWdlIEFuIGltYWdlIHRvIHVzZSBhcyB0aGUgdGV4dHVyZVxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFRleHR1cmUoZ2wsIGluZm8sIGltYWdlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRleHR1cmUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV4dHVyZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsKTtcbiAgICB0aGlzLmluZm8gPSBpbmZvO1xuICAgIHZhciBtYXAgPSB7XG4gICAgICAnTWlwTWFwTGluZWFyTGluZWFyJzogZ2wuTElORUFSX01JUE1BUF9MSU5FQVIsXG4gICAgICAnTGluZWFyJzogZ2wuTElORUFSLFxuICAgICAgJ01pcE1hcExpbmVhck5lYXJlc3QnOiBnbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QsXG4gICAgICAnTWlwTWFwTmVhcmVzdExpbmVhcic6IGdsLk5FQVJFU1RfTUlQTUFQX0xJTkVBUixcbiAgICAgICdSZXBlYXQnOiBnbC5SRVBFQVQsXG4gICAgICAnQ2xhbXBUb0VkZ2UnOiBnbC5DTEFNUF9UT19FREdFXG4gICAgfTtcbiAgICB2YXIgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgbWFwW2luZm8ubWluRmlsdGVyXSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIG1hcFtpbmZvLm1hZ0ZpbHRlcl0pO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIG1hcFtpbmZvLndyYXBTXSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgbWFwW2luZm8ud3JhcFRdKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGltYWdlKTtcbiAgICBpZiAoL01pcE1hcC8udGVzdChpbmZvLm1pbkZpbHRlcikpIHtcbiAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuICAgIH1cblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuXG4gICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhlIHRleHR1cmUgdG8gYSBwYXJ0aWN1bGFyIHRleHR1cmUgaW5kZXhcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGluZGV4IFRleHR1cmUgaW5kZXggdG8gYmluZCB0b1xyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhUZXh0dXJlLCBbe1xuICAgIGtleTogJ3VzZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVzZShpbmRleCkge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2w7XG4gICAgICBpbmRleCA9IGluZGV4IHx8IDA7XG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmUpO1xuICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIGluZGV4KTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIE5ZSTogVE9ET1xyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdkaXNwb3NlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgIC8vIFRPRE86IEZpZ3VyZSBvdXQgd2hlbiB0aGlzIHNob3VsZCBiZSBjYWxsZWQuXG4gICAgICAvLyBub29wO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUZXh0dXJlO1xufSkoX2dsQm91bmQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBUZXh0dXJlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5leHBvcnRzLnJlc2V0R0wgPSByZXNldEdMO1xuZXhwb3J0cy5zZXRQYXJhbXMgPSBzZXRQYXJhbXM7XG5leHBvcnRzLmRpc2NvID0gZGlzY287XG5leHBvcnRzLmdlbmVyYXRlQXJ0aWZhY3RzID0gZ2VuZXJhdGVBcnRpZmFjdHM7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9kcmF3YWJsZVRleHR1cmVkID0gcmVxdWlyZSgnLi9kcmF3YWJsZS90ZXh0dXJlZCcpO1xuXG52YXIgX2RyYXdhYmxlVGV4dHVyZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVUZXh0dXJlZCk7XG5cbi8qKlxyXG4gKiBSZXNldCB0aGUgR0wgc3RhdGUgdG8gc29tZSBiYXNlIHN0YXRlXHJcbiAqIEBwYXJhbSAge2NvbnRleHR9IGdsIEEgV2ViR0wgY29udGV4dFxyXG4gKi9cblxuZnVuY3Rpb24gcmVzZXRHTChnbCkge1xuICBnbC5saW5lV2lkdGgoMS4wKTtcbiAgZ2wuZW5hYmxlKGdsLkNVTExfRkFDRSk7XG4gIGdsLmZyb250RmFjZShnbC5DQ1cpO1xuICBnbC5jdWxsRmFjZShnbC5CQUNLKTtcbiAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xuICBnbC5ibGVuZEVxdWF0aW9uKGdsLkZVTkNfQUREKTtcbiAgLy9nbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgZ2wuYmxlbmRGdW5jU2VwYXJhdGUoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBLCBnbC5PTkUsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICBnbC5kaXNhYmxlKGdsLkJMRU5EKTtcbiAgZ2wuZGVwdGhNYXNrKHRydWUpO1xufVxuXG4vKipcclxuICogU2V0IHBhcmFtZXRlcnMgYmFzZSBvbiBzb21lIGJhc2Ugc2V0IG9mIGRlZmF1bHRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBiYXNlICBQYXJhbWV0ZXIgZGVmaW5pdGlvbiB3aXRoIGRlZmF1bHRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzICBPcHRpb25zIChvdmVycmlkZXMpXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVlcCBEbyBkZWVwIGNvcHlpbmcgb24gb2JqZWN0cy5cclxuICovXG5cbmZ1bmN0aW9uIHNldFBhcmFtcyhiYXNlLCBvcHRzLCBkZWVwKSB7XG4gIGZvciAodmFyIGkgaW4gYmFzZSkge1xuICAgIGlmIChiYXNlLmhhc093blByb3BlcnR5KGkpICYmIG9wdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIGlmIChkZWVwICYmIHR5cGVvZiBiYXNlW2ldID09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRzW2ldID09ICdvYmplY3QnKSB7XG4gICAgICAgIGJhc2VbaV0gPSBzZXRQYXJhbXMoYmFzZVtpXSwgb3B0c1tpXSwgZGVlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYXNlW2ldID0gb3B0c1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJhc2U7XG59XG5cbi8qKlxyXG4gKiBEaXNjbyBwb3J0YWwgYW5pbWF0aW9uXHJcbiAqIEBwYXJhbSAge051bWJlcn0gZGVsdGEgICBUaW1lIHNpbmNlIGxhc3QgZnJhbWVcclxuICogQHBhcmFtICB7TnVtYmVyfSBlbGFwc2VkIFRvdGFsIHRpbWUgZWxhcHNlZFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgUmV0dXJucyB0cnVlIHRvIGNvbnRpbnVlIGFuaW1hdGlvblxyXG4gKi9cblxuZnVuY3Rpb24gZGlzY28oZGVsdGEsIGVsYXBzZWQpIHtcbiAgdmFyIGluYyA9IGVsYXBzZWQgLyAxMDAwO1xuICB0aGlzLnVuaWZvcm1zLnVfYmFzZUNvbG9yWzBdID0gTWF0aC5zaW4oaW5jKTtcbiAgdGhpcy51bmlmb3Jtcy51X2Jhc2VDb2xvclsxXSA9IE1hdGguc2luKGluYyArIDIgKiBNYXRoLlBJIC8gMyk7XG4gIHRoaXMudW5pZm9ybXMudV9iYXNlQ29sb3JbMl0gPSBNYXRoLnNpbihpbmMgKyA0ICogTWF0aC5QSSAvIDMpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gbWFrZUFydGlmYWN0KG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSkge1xuICB2YXIgYXJ0aWZhY3QgPSAoZnVuY3Rpb24gKF9UZXh0dXJlZERyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKGFydGlmYWN0LCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgICBmdW5jdGlvbiBhcnRpZmFjdCgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBhcnRpZmFjdCk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKGFydGlmYWN0LnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLlRleHR1cmVkLCBtZXNoTmFtZSwgdGV4dHVyZU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnRpZmFjdDtcbiAgfSkoX2RyYXdhYmxlVGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG4gIHJldHVybiBhcnRpZmFjdDtcbn1cblxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgc2V0IG9mIGFydGlmYWN0c1xyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBzZXJpZXMgICAgU2VyaWVzIG5hbWVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3VsZCBtYXRjaCB0aGUgaW50ZXJuYWwgbmFtZSBvZiB0aGUgcmVzb3VyY2VzXHJcbiAqIEBwYXJhbSAge051bWJlcn0gIG51bSAgICAgICBOdW1iZXIgb2YgYXJ0aWZhY3RzIGluIHRoZSBzZXJpZXNcclxuICogQHBhcmFtICB7Qm9vbGVhbn0gaGFzRnJvemVuIFdoZXRoZXIgb3Igbm90IHRoZSBzZXJpZXMgYWxzbyBpbmNsdWRlcyBmcm96ZW5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnRzXHJcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICBPYmplY3QgY29udGFpbmluZyBhcnRpZmFjdCBkcmF3YWJsZSBjbGFzc2VzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgZWFjaCBhcnRpZmFjdC5cclxuICovXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQXJ0aWZhY3RzKHNlcmllcywgbnVtLCBoYXNGcm96ZW4pIHtcbiAgdmFyIGksXG4gICAgICBtZXNoTmFtZSxcbiAgICAgIHRleHR1cmVOYW1lID0gJ0FydGlmYWN0JyArIHNlcmllcyArICdUZXh0dXJlJztcblxuICB2YXIgYXJ0aWZhY3RzID0ge307XG5cbiAgZm9yIChpID0gMTsgaSA8PSBudW07IGkrKykge1xuICAgIG1lc2hOYW1lID0gc2VyaWVzICsgaTtcbiAgICBhcnRpZmFjdHNbJycgKyBpXSA9IG1ha2VBcnRpZmFjdChtZXNoTmFtZSwgdGV4dHVyZU5hbWUpO1xuICB9XG4gIGlmIChoYXNGcm96ZW4pIHtcbiAgICBmb3IgKGkgPSAxOyBpIDw9IG51bTsgaSsrKSB7XG4gICAgICBtZXNoTmFtZSA9IHNlcmllcyArICdGcm96ZW4nICsgaTtcbiAgICAgIGFydGlmYWN0c1snRnJvemVuJyArIGldID0gbWFrZUFydGlmYWN0KG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFydGlmYWN0cztcbn0iLCIvKipcclxuICogQSB2ZXJ0ZXggYXR0cmlidXRlXHJcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBWZXJ0ZXhBdHRyaWJ1dGUgPVxuLyoqXHJcbiAqIEEgdmVydGV4IGF0dHJpYnV0ZVxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgYXR0cmlidXRlXHJcbiAqIEBwYXJhbSAge051bWJlcn0gc2l6ZSBTaXplIG9mIHRoZSBhdHRyaWJ1dGUgKGluIGJ5dGVzKVxyXG4gKi9cbmZ1bmN0aW9uIFZlcnRleEF0dHJpYnV0ZShuYW1lLCBzaXplKSB7XG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBWZXJ0ZXhBdHRyaWJ1dGUpO1xuXG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuc2l6ZSA9IHNpemU7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFZlcnRleEF0dHJpYnV0ZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07Il19
