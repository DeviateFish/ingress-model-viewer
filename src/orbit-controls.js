import { setParams } from './utils';
import { vec3, mat4 } from 'gl-matrix';

const PI_HALF = Math.PI / 2.0;
const MIN_LOG_DIST = 5.0;

function cloneTouch(touch)
{
  return {identifier: touch.identifier, x: touch.clientX, y: touch.clientY};
}

function getTouchIndex(touches, touch)
{
  for(var i = 0; i < touches.length; i++)
  {
    if(touches[i].identifier == touch.identifier)
    {
      return i;
    }
  }
  return -1;
}

class OrbitControls {

  constructor(canvas, distance, options)
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
    this.mouseDown = this.onMouseDown.bind(this);
    this.mouseWheel = this.onMouseWheel.bind(this);

    this.touches = [];
    this.touchDelta = 0;
    this.touchMove = this.onTouchMove.bind(this);
    this.touchEnd = this.onTouchEnd.bind(this);
    this.touchLeave = this.onTouchLeave.bind(this);
    this.touchStart = this.onTouchStart.bind(this);
    this.mouseOver = function() { this.overRenderer = true; }.bind(this);
    this.mouseOut = function() { this.overRenderer = false; }.bind(this);
    this.enabled = false;
  }

  disable() {
    this.canvas.removeEventListener('mousedown', this.mouseDown, false);
    this.canvas.removeEventListener('mousemove', this.mouseMove, false);
    this.canvas.removeEventListener('mouseup', this.mouseUp, false);
    this.canvas.removeEventListener('mouseout', this.mouseOut, false);
    this.canvas.removeEventListener('touchstart', this.touchStart, false);
    this.canvas.removeEventListener('touchmove', this.touchMove, false);
    this.canvas.removeEventListener('touchend', this.touchEnd, false);
    this.canvas.removeEventListener('touchleave', this.touchLeave, false);
    this.canvas.removeEventListener('mousewheel', this.mouseWheel, false);
    this.canvas.removeEventListener('mouseover', this.mouseOver, false);
    this.canvas.removeEventListener('mouseout', this.mouseOut, false);
    this.enabled = false;
  }

  enable() {
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    if(this.options.allowZoom)
    {
      this.canvas.addEventListener('mousewheel', this.mouseWheel, false);
    }
    this.canvas.addEventListener('touchstart', this.touchStart, false);
    this.canvas.addEventListener('mouseover', this.mouseOver, false);
    this.canvas.addEventListener('mouseout', this.mouseOut, false);
    this.enabled = true;
  }

  updateTargets()
  {
    var scale = this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance);
    var zoomDamp = scale / this.options.zoomDamp;

    this.target.x = this.targetOnDown.x + (this.mouse.x - this.mouseOnDown.x) * 0.005 * zoomDamp;
    this.target.y = this.targetOnDown.y + (this.mouse.y - this.mouseOnDown.y) * 0.005 * zoomDamp;

    this.target.y = this.target.y > PI_HALF ? PI_HALF : this.target.y;
    this.target.y = this.target.y < - PI_HALF ? - PI_HALF : this.target.y;
  }

  onMouseDown(ev)
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
  }

  onMouseMove(ev)
  {
    this.mouse.x = -ev.clientX;
    this.mouse.y = ev.clientY;
    this.updateTargets();
  }

  onMouseUp(ev)
  {
    this.onMouseOut(ev);
    this.canvas.style.cursor = 'auto';
  }

  onMouseOut()
  {
    this.canvas.removeEventListener('mousemove', this.mouseMove, false);
    this.canvas.removeEventListener('mouseup', this.mouseUp, false);
    this.canvas.removeEventListener('mouseout', this.mouseOut, false);
  }

  updateView(view)
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
  }

  onMouseWheel(ev)
  {
    if (this.overRenderer) {
      this.zoom(ev.wheelDeltaY * this.options.wheelScale * (this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance)));
    }
    return true;
  }

  onTouchStart(ev)
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
  }

  onTouchMove(ev) {
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
  }

  removeTouches(ev) {
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
  }

  onTouchEnd(ev)
  {
    this.removeTouches(ev);
    this.canvas.style.cursor = 'auto';
  }

  onTouchLeave(ev)
  {
    this.removeTouches(ev);
  }

  //?
  onTouchCancel(ev)
  {
    this.removeTouches(ev);
  }

  zoom(delta)
  {
    this.distanceTarget -= delta;
    this.distanceTarget = Math.min(this.distanceTarget, this.options.distanceMax);
    this.distanceTarget = Math.max(this.distanceTarget, this.options.distanceMin);
  }
}

export default OrbitControls;
