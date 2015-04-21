(function() {
  var inventory = imv.Constants.Mesh.Inventory;
  var textures = imv.Constants.Texture;

  imv.Drawables = imv.Drawables || {};
  imv.Drawables.Inventory = imv.Drawables.Inventory || {};

  var createShell = function(name) {
    var itembase = function() {
      BicoloredDrawable.call(this, inventory[name], textures.FlipCard);
    };
    inherits(itembase, BicoloredDrawable);
    return itembase;
  };

  var createCore = function(name) {
    var xmbase = function() {
      XmDrawable.call(this, inventory[name], textures.Xm);
    };
    inherits(xmbase, XmDrawable);
    return xmbase;
  };

  var createMedia = function(name) {
    var media = function() {
      TexturedDrawable.call(this,
        imv.Constants.Program.Textured,
        inventory[name],
        imv.Constants.Texture.FlipCard
      );
    };
    inherits(media, TexturedDrawable);
    return media;
  };

  for(var i in inventory) {
    if(/^Media/.test(i)) {
      if(i === 'MediaPlane') {
        continue;
      }
      imv.Drawables.Inventory[i] = createMedia(i);
    }
    else {
      if(/Xm$/.test(i)) {
        imv.Drawables.Inventory[i] = createCore(i);
      }
      else {
        imv.Drawables.Inventory[i] = createShell(i);
      }
    }
  }
}());
