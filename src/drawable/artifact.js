(function(){
  var meshes = imv.Constants.Mesh.Artifact;
  var textures = imv.Constants.Texture;
  var i, j;

  imv.Drawables = imv.Drawables || {};
  imv.Drawables.Artifact = imv.Drawables.Artifact || {};

  var makeArtifact = function(series, name) {
    var artifact = function() {
      TexturedDrawable.call(this, imv.Constants.Program.Textured, name, textures['Artifact' + series]);
    };
    inherits(artifact, TexturedDrawable);

    return artifact;
  };

  for(i in meshes) {
    var series = meshes[i];
    imv.Drawables.Artifact[i] = imv.Drawables.Artifact[i] || {};
    for(j in series) {
      imv.Drawables.Artifact[i][j] = makeArtifact(i, j);
    }
  }

}());