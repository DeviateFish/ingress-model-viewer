var LinkMesh = (function(){

  var linkmesh = function(gl) {
    this._attributeSize = this._attributeSize || 4096;
    this._faceSize = this._faceSize || 2048;
    this._attributeWidth = this._attributeWidth || 12;
    this.attributeOffset = 0;
    this.faceOffset = 0;
    var attributes = [];
    attributes.push(new VertexAttribute('a_position', 4));
    attributes.push(new VertexAttribute('a_texCoord0', 4));
    attributes.push(new VertexAttribute('a_color', 4));
    var attribute = new GLAttribute(gl, attributes, new Float32Array(this._attributeSize), gl.DYNAMIC_DRAW);
    var faces = new GLIndex(gl, new Uint16Array(this._faceSize), gl.TRIANGLES);
    Mesh.call(this, gl, attribute, faces);
    this.links = [];
    this.linkId = 0;
  };
  inherits(linkmesh, Mesh);

  linkmesh.prototype.addLink = function(linkAttributes, faces) {
    var attributeLen = linkAttributes.length;
    var faceLen = faces.length;
    if(this.attributeOffset + attributeLen > this._attributeSize || this.faceOffset + faceLen > this._faceSize) {
      throw new Error('This link system has reached capacity');
    }
    this.attributes.setValues(linkAttributes, this.attributeOffset);
    this.faces.setValues(faces, this.faceOffset);
    var link = {
      attribute: attributeLen,
      face: faceLen,
      id: this.linkId++
    };
    this.attributeOffset += attributeLen;
    this.faceOffset += faceLen;
    this.links.push(link);
    return link.id;
  };

  linkmesh.prototype.removeLink = function(linkId) {
    var attributeOffset = 0;
    var faceOffset = 0;
    var link;
    var map = function(shift, val) {
      return val > 0 ? val + shift : val;
    };
    for(var i = 0; i < this.links.length; i++) {
      if(this.links[i].id === linkId) {
        link = this.links.splice(i, 1);
        this.attributes.deleteWithin(attributeOffset, attributeOffset + link[0].attribute);
        this.attributeOffset -= link[0].attribute;
        this.faces.map(map.bind(this, -link[0].attribute / this._attributeWidth), faceOffset + link[0].face);
        this.faces.deleteWithin(faceOffset, faceOffset + link[0].face);
        this.faceOffset -= link[0].face;
        return true;
      } else {
        attributeOffset += this.links[i].attribute;
        faceOffset += this.links[i].face;
      }
    }
    return false;
  };

  return linkmesh;
}());

imv.Meshes = imv.Meshes || {};
imv.Meshes.Link = LinkMesh;
