var Entity = (function(){

  var entity = function(loader) {
    this.loader = loader;
    this.models = [];
  };

  // Add functions for translations, rotations, etc
  // Anything you'd want to manipulate the entire entity at once.

  // TODO: Centralized resource listing
  // TODO: Provide "read-only" access to asset lists.

  return entity;
}());

imv.Entity = Entity;