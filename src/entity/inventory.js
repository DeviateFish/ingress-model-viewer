(function(){

  imv.Entities = imv.Entities || {};
  imv.Entities.Inventory = imv.Entities.Inventory || {};

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

  var createItem = function(name, color) {
    var item = function() {
      Entity.call(this);
      this.addDrawable(name, new imv.Drawables.Inventory[name]());
      this.addDrawable(name + 'Xm', new imv.Drawables.Inventory[name + 'Xm']());
      this.drawables[name].uniforms.u_color0 = vec4.clone(color);
    };
    inherits(item, Entity);

    return item;
  };

  for(var i in simple) {
    imv.Entities.Inventory[i] = createItem(i, imv.Constants.qualityColors[simple[i]]);
  }

}());