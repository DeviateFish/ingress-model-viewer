(function() {
  var resource = imv.Constants.Mesh.Resource;

  imv.Drawables = imv.Drawables || {};
  imv.Drawables.Resource = imv.Drawables.Resource || {};

  var createResource = function(name) {
    var itembase = function() {
      BicoloredDrawable.call(this, resource[name], imv.Constants.Texture.FlipCard);
    };
    inherits(itembase, BicoloredDrawable);
    imv.Drawables.Resource[name] = itembase;
  };

  for(var i in resource) {
    createResource(i);
  }

}());