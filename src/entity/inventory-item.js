var InventoryItemEntity = function(itemSpec, coreSpec, defaultQualityColor, defaultCoreColor) {

  //let's predictably order these, so we can access them
  // by index, for part-specific tasks (setting xm core
  // color, etc, etc.
  var drawables = [
    itemSpec,
    coreSpec
  ];
  var DEFAULT_QUALITY_COLOR = vec4.clone(defaultQualityColor);
  var DEFAULT_GLOW_COLOR = vec4.clone(defaultCoreColor);
  var DEFAULT_ALT_COLOR = vec4.clone(imv.Constants.xmColors.coreGlow);

  var base = Entity(drawables);

  var leveledItem = function(renderer, qualityColor, glowColor) {
    base.call(this, renderer);
    this.drawables[0].uniforms.u_color0 = qualityColor || DEFAULT_QUALITY_COLOR;
    this.drawables[0].uniforms.u_color1 =
      this.drawables[1].uniforms.u_teamColor = glowColor || DEFAULT_GLOW_COLOR;
    this.drawables[1].uniforms.u_altColor = DEFAULT_ALT_COLOR;
  };
  inherits(leveledItem, base);

  leveledItem.prototype.setQualityColor = function(color) {
    this.drawables[0].uniforms.u_color0 = color;
  };

  leveledItem.prototype.setCoreColor = function(color) {
    this.drawables[0].u_color0 = color;
    this.drawables[1].u_teamColor = color;
  };

  leveledItem.prototype.setQuality = function(quality) {
    var color;
    if(!(quality in imv.Constants.qualityColors))
    {
      console.warn("quality should be one of:\n" + Object.keys(imv.Constants.qualityColors).join("\n"));
      console.warn('use setQualityColor to set arbitrary colors');
      color = vec4.clone(DEFAULT_QUALITY_COLOR);
    }
    else
    {
      color = vec4.clone(imv.Constants.qualityColors[quality]);
    }
    this.setQualityColor(color);
  };

  // shortcut for ADA Refactor:
  leveledItem.prototype.setAdaCore = function() {
    var color = vec4.clone(imv.Constants.xmColors.coreGlowAda);
    this.setCoreColor(color);
  };

  leveledItem.prototype.setJarvisCore = function() {
    var color = vec4.clone(imv.Constants.xmColors.coreGlowJarvis);
    this.setCoreColor(color);
  };

  // shortcut (if necessary) for default core colors:
  leveledItem.prototype.setDefaultCore = function() {
    var color = vec4.clone(imv.Constants.xmColors.coreGlow);
    this.setCoreColor(color);
  };

  return leveledItem;
};

imv.Entities = imv.Entities || {};
imv.Entities.InventoryItem = InventoryItemEntity;