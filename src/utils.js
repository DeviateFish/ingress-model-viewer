var inherits = function(a, b) {
  function C(){}
  C.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new C();
  a.prototype.constructor = a;
};

imv.Utilities = imv.Utilities || {};
imv.Utilities.inherits = inherits;