import GLBound from './gl-bound';

const MODE_TRIANGLES = 'triangles';
const MODE_LINES = 'lines';

class Mesh extends GLBound {
  constructor(gl, attributes, faces, lines) {
    super(gl);
    this.attributes = attributes;
    this.faces = faces;
    this.lines = lines;
    this.mode = MODE_TRIANGLES;
    this.bounds = null;
    this.center = null;
  }

  draw(locations) {
    this.attributes.draw(locations);
    if(this.mode === MODE_TRIANGLES) {
      this.faces.draw();
    } else if (this.mode === MODE_LINES) {
      this.lines.draw();
    }
  }

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
