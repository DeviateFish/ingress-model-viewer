// basic api for each renderer.
// Should provide the base methods
// at the very least, this should include a draw function
// and an update camera function.
var Renderer = (function(){

  var renderer = function() {

  };

  // things to do when the camera is updated
  renderer.prototype.updateView = function(camera) {

  };

  // here's where we draw stuff.
  renderer.prototype.draw = function(gl) {

  };
}());