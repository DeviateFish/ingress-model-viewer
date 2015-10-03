import GLBound from './gl-bound';

const MODE_TRIANGLES = 'triangles';
const MODE_LINES = 'lines';

/**
 * Base class for all meshes
 *
 * @extends {GLBound}
 */
class Mesh extends GLBound {

  /**
   * Initializes a mesh
   * @param  {context} gl              A webgl context
   * @param  {Float32Array} attributes A typed array of vertex attributes
   * @param  {Uint16Array} faces       A typed array of face indices
   * @param  {Uint16Array} lines       A typed array of line indices
   */
  constructor(gl, attributes, faces, lines) {
    super(gl);
    this.attributes = attributes;
    this.faces = faces;
    this.lines = lines;
    this.bounds = null;
    this.center = null;
  }

  /**
   * Given a set of locations from the currently-active shader, draw this mesh
   * @param  {Object} locations A hash of locations by name
   */
  draw(locations, mode) {
    mode = mode || MODE_TRIANGLES;
    this.attributes.draw(locations);
    if(mode === MODE_TRIANGLES) {
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
  boundingBox(coordAttribute) {
    if(!this.bounds) {
      coordAttribute = coordAttribute === undefined ? 0 : coordAttribute;
      var bounds = {
        max: null,
        min: null
      };
      this.attributes.eachAttribute(coordAttribute, function(arr) {
        if(Array.prototype.reduce.call(arr, function(s, a) { return s + a; }, 0) === 0) {
          return;
        }
        if(bounds.max) {
          bounds.max = bounds.max.map(function(e, i) {
            return Math.max(e, arr[i]);
          });
        } else {
          bounds.max = Array.prototype.slice.call(arr);
        }
        if(bounds.min) {
          bounds.min = bounds.min.map(function(e, i) {
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
  centerOfMass(coordAttribute) {
    if(!this.center) {
      coordAttribute = coordAttribute === undefined ? 0 : coordAttribute;
      var sum = null,
        count = 0;
      this.attributes.eachAttribute(coordAttribute, function(arr) {
        if(Array.prototype.reduce.call(arr, function(s, a) { return s + a; }, 0) === 0) {
          return;
        }
        count++;
        if(sum) {
          sum = sum.map(function(e, i) {
            return e + arr[i];
          });
        } else {
          sum = Array.prototype.slice.call(arr);
        }
      });
      sum.map(function(e) {
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
  boundingBoxCenter(coordAttribute) {
    if(!this.bounds) {
      this.boundingBox(coordAttribute);
    }
    return this.bounds.max.map(function(e, i) {
      return (e - this.bounds.min[i]) / 2;
    }.bind(this));
  }
}

Mesh.MODE_LINES = MODE_LINES;
Mesh.MODE_TRIANGLES = MODE_TRIANGLES;

export default Mesh;
