// this is kinda backwards :(
var StaticMesh = function(gl, attributeBuf, attributeSpec, faces)
{
  Mesh.call(this, gl, attributeSpec, attributeBuf);
  this.faces = faces;
  this.nFaces = faces.length;
};
inherits(StaticMesh, Mesh);

imv.Meshes = imv.Meshes || {};
imv.Meshes.Static = StaticMesh;