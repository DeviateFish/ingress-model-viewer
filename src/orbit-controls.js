var OrbitControls = (function() {

  var PI_HALF = Math.PI / 2.0;
  var MIN_LOG_DIST = 5.0;

  var cloneTouch = function(touch)
  {
    return {identifier: touch.identifier, x: touch.clientX, y: touch.clientY};
  };

  var getTouchIndex = function(touches, touch)
  {
    for(var i = 0; i < touches.length; i++)
    {
      if(touches[i].identifier == touch.identifier)
      {
        return i;
      }
    }
    return -1;
  };

  var controls = function(canvas, distance, options)
  {
    options = options || {};
    this.canvas = canvas;
    this.distance = distance || 2;
    this.distanceTarget = this.distance;
    var params = {
      zoomDamp: 0.5,
      distanceScale: 0.5,
      distanceMax: 1000,
      distanceMin: 1,
      touchScale: 0.1,
      wheelScale: 0.01,
      friction: 0.2,
      target: vec3.create(),
      allowZoom: true
    };
    this.options = setParams(params, options);
    this.mouse = {x: 0, y: 0};
    this.mouseOnDown = {x: 0, y: 0};
    this.rotation = {x: 0, y: 0};
    this.target = {x: Math.PI * 3 / 2, y: Math.PI / 6.0};
    this.targetOnDown = {x: 0, y: 0};
    this.overRenderer = false;
    this.mouseMove = this.onMouseMove.bind(this);
    this.mouseUp = this.onMouseUp.bind(this);
    this.mouseOut = this.onMouseOut.bind(this);
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    if(this.options.allowZoom)
    {
      this.canvas.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
    }

    this.touches = [];
    this.touchDelta = 0;
    this.touchMove = this.onTouchMove.bind(this);
    this.touchEnd = this.onTouchEnd.bind(this);
    this.touchLeave = this.onTouchLeave.bind(this);
    this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);

    var _this = this;
    this.canvas.addEventListener('mouseover', function() { _this.overRenderer = true; }, false);
    this.canvas.addEventListener('mouseout', function() { _this.overRenderer = false; }, false);
  };

  controls.prototype.updateTargets = function()
  {
    var scale = this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance);
    var zoomDamp = scale / this.options.zoomDamp;

    this.target.x = this.targetOnDown.x + (this.mouse.x - this.mouseOnDown.x) * 0.005 * zoomDamp;
    this.target.y = this.targetOnDown.y + (this.mouse.y - this.mouseOnDown.y) * 0.005 * zoomDamp;

    this.target.y = this.target.y > PI_HALF ? PI_HALF : this.target.y;
    this.target.y = this.target.y < - PI_HALF ? - PI_HALF : this.target.y;
  };

  controls.prototype.onMouseDown = function(ev)
  {
    ev.preventDefault();
    this.canvas.addEventListener('mousemove', this.mouseMove, false);
    this.canvas.addEventListener('mouseup', this.mouseUp, false);
    this.canvas.addEventListener('mouseout', this.mouseOut, false);

    this.mouseOnDown.x = -ev.clientX;
    this.mouseOnDown.y = ev.clientY;
    this.targetOnDown.x = this.target.x;
    this.targetOnDown.y = this.target.y;

    this.canvas.style.cursor = 'move';
  };

  controls.prototype.onMouseMove = function(ev)
  {
    this.mouse.x = -ev.clientX;
    this.mouse.y = ev.clientY;
    this.updateTargets();
  };

  controls.prototype.onMouseUp = function(ev)
  {
    this.onMouseOut(ev);
    this.canvas.style.cursor = 'auto';
  };

  controls.prototype.onMouseOut = function()
  {
    this.canvas.removeEventListener('mousemove', this.mouseMove, false);
    this.canvas.removeEventListener('mouseup', this.mouseUp, false);
    this.canvas.removeEventListener('mouseout', this.mouseOut, false);
  };

  controls.prototype.updateView = function(view)
  {
    var dx = this.target.x - this.rotation.x,
      dy = this.target.y - this.rotation.y,
      dz = this.distanceTarget - this.distance,
      cameraPosition = vec3.create();
    if(Math.abs(dx) > 0.00001 || Math.abs(dy) > 0.00001 || Math.abs(dz) > 0.00001)
    {
      this.rotation.x += dx * this.options.friction;
      this.rotation.y += dy * this.options.friction;
      this.distance += dz * this.options.distanceScale;

      cameraPosition[0] = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y) + this.options.target[0];
      cameraPosition[1] = this.distance * Math.sin(this.rotation.y) + this.options.target[1];
      cameraPosition[2] = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y) + this.options.target[2];

      mat4.lookAt(view, cameraPosition, this.options.target, [0, 1, 0]);
    }
  };

  controls.prototype.onMouseWheel = function(ev)
  {
    ev.preventDefault();
    if (this.overRenderer) {
      this.zoom(ev.wheelDeltaY * this.options.wheelScale * (this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance)));
    }
    return false;
  };

  controls.prototype.onTouchStart = function(ev)
  {
    ev.preventDefault();
    if(this.touches.length === 0)
    {
      this.canvas.addEventListener('touchmove', this.touchMove, false);
      this.canvas.addEventListener('touchend', this.touchEnd, false);
      this.canvas.addEventListener('touchleave', this.touchLeave, false);
    }

    for(var i = 0; i < ev.changedTouches.length; i++)
    {
      this.touches.push(cloneTouch(ev.changedTouches[i]));
    }

    if(this.touches.length === 1)
    {
      this.mouseOnDown.x = -this.touches[0].x;
      this.mouseOnDown.y = this.touches[0].y;

      this.targetOnDown.x = this.target.x;
      this.targetOnDown.y = this.target.y;
    }
    else if(this.touches.length === 2 && this.options.allowZoom)
    {
      var x = Math.abs(this.touches[0].x - this.touches[1].x);
      var y = Math.abs(this.touches[0].y - this.touches[1].y);

      this.touchDelta = Math.sqrt(x * x + y * y);
    }

    this.canvas.style.cursor = 'move';
  };

  controls.prototype.onTouchMove = function(ev) {
    var changed = ev.changedTouches, l = changed.length;
    for(var i = 0; i < l; i++)
    {
      var idx = getTouchIndex(this.touches, changed[i]);
      if(idx >= 0)
      {
        this.touches.splice(idx, 1, cloneTouch(changed[i]));
      }
      else
      {
        console.log('could not find event ', changed[i]);
      }
    }

    if(this.touches.length === 1)
    {
      this.mouse.x = - this.touches[0].x;
      this.mouse.y = this.touches[0].y;
      this.updateTargets();
    }
    else if(this.touches.length === 2 && this.options.allowZoom)
    {
      var x = this.touches[0].x - this.touches[1].x;
      var y = this.touches[0].y - this.touches[1].y;

      var newDelta = Math.sqrt(x * x + y * y);
      this.zoom((newDelta - this.touchDelta) * this.options.touchScale);
      this.touchDelta = newDelta;
    }
  };

  controls.prototype.removeTouches = function (ev) {
    var changed = ev.changedTouches, l = changed.length;
    for(var i = 0; i < l; i++)
    {
      var idx = getTouchIndex(this.touches, changed[i]);
      if(idx >= 0)
      {
        this.touches.splice(idx, 1);
      }
    }
    if(this.touches.length === 0)
    {
      this.canvas.removeEventListener('touchmove', this.touchMove, false);
      this.canvas.removeEventListener('touchend', this.touchEnd, false);
      this.canvas.removeEventListener('touchleave', this.touchLeave, false);
    }
    else if(this.touches.length === 1)
    {
      this.mouseOnDown.x = -this.touches[0].x;
      this.mouseOnDown.y = this.touches[0].y;

      this.targetOnDown.x = this.target.x;
      this.targetOnDown.y = this.target.y;
    }
  };

  controls.prototype.onTouchEnd = function(ev)
  {
    this.removeTouches(ev);
    this.canvas.style.cursor = 'auto';
  };

  controls.prototype.onTouchLeave = function(ev)
  {
    this.removeTouches(ev);
  };

  //?
  controls.prototype.onTouchCancel = function(ev)
  {
    this.removeTouches(ev);
  };

  controls.prototype.zoom = function(delta)
  {
    this.distanceTarget -= delta;
    this.distanceTarget = Math.min(this.distanceTarget, this.options.distanceMax);
    this.distanceTarget = Math.max(this.distanceTarget, this.options.distanceMin);
  };

  return controls;
}());

imv.Controls = imv.Controls || {};
imv.Controls.Orbit = OrbitControls;
