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
    var item = function(engine) {
      Entity.call(this, engine);
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

  var Ada = function(engine) {
    Entity.call(this, engine);
    this.addDrawable('FlipCardAda', new imv.Drawables.Inventory.FlipCardAda());
    this.addDrawable('FlipCardXm', new imv.Drawables.Inventory.FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = vec4.clone(imv.Constants.teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color1 = vec4.clone(imv.Constants.teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color0 = vec4.clone(imv.Constants.qualityColors.VERY_RARE);
  };
  inherits(Ada, Entity);

  imv.Entities.Inventory.FlipCardAda = Ada;

  var Jarvis = function(engine) {
    Entity.call(this, engine);
    this.addDrawable('FlipCardJarvis', new imv.Drawables.Inventory.FlipCardJarvis());
    this.addDrawable('FlipCardXm', new imv.Drawables.Inventory.FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = vec4.clone(imv.Constants.teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color1 = vec4.clone(imv.Constants.teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color0 = vec4.clone(imv.Constants.qualityColors.VERY_RARE);
  };
  inherits(Jarvis, Entity);

  imv.Entities.Inventory.FlipCardJarvis = Jarvis;

  var ExtraShield = function(engine) {
    Entity.call(this, engine);
    this.addDrawable('ExtraShield', new imv.Drawables.Inventory.ExtraShield());
    this.addDrawable('ResShieldXm', new imv.Drawables.Inventory.ResShieldXm());
    this.drawables.ExtraShield.uniforms.u_color0 = vec4.clone(imv.Constants.qualityColors.VERY_RARE);
  };
  inherits(ExtraShield, Entity);

  imv.Entities.Inventory.ExtraShield = ExtraShield;

  var InterestCapsule = function(engine) {
    Entity.call(this, engine);
    this.addDrawable('InterestCapsule', new imv.Drawables.Inventory.InterestCapsule());
    this.addDrawable('CapsuleXm', new imv.Drawables.Inventory.CapsuleXm());
    this.drawables.InterestCapsule.uniforms.u_color0 = vec4.clone(imv.Constants.qualityColors.VERY_RARE);
  };
  inherits(InterestCapsule, Entity);

  imv.Entities.Inventory.InterestCapsule = InterestCapsule;
}());
