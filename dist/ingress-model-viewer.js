(function(root, undefined) {

  "use strict";

  var imv = {};


if(!JavaDeserializer || !THREE || !libtga)
{
  throw 'Missing dependencies';
}

var console = console || {
  log: function(){},
  warn: function(){},
  info: function(){}
};

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

/**
 * @author troffmo5 / http://github.com/troffmo5
 *
 * Effect to render the scene in stereo 3d side by side with lens distortion.
 * It is written to be used with the Oculus Rift (http://www.oculusvr.com/) but
 * it works also with other HMD using the same technology
 */

 // slight cleanup to pass jshint

THREE.OculusRiftEffect = function ( renderer, options ) {
	// worldFactor indicates how many units is 1 meter
	var worldFactor = (options && options.worldFactor) ? options.worldFactor: 1.0;

	// Specific HMD parameters
	var HMD = (options && options.HMD) ? options.HMD: {
		// DK1
		hResolution: 1280,
		vResolution: 800,
		hScreenSize: 0.14976,
		vScreenSize: 0.0936,
		interpupillaryDistance: 0.064,
		lensSeparationDistance: 0.064,
		eyeToScreenDistance: 0.041,
		distortionK : [1.0, 0.22, 0.24, 0.0],
		chromaAbParameter: [ 0.996, -0.004, 1.014, 0.0]
		/*
		// DK2
		hResolution: 1920,
		vResolution: 1080,
		hScreenSize: 0.12576,
		vScreenSize: 0.07074,
		interpupillaryDistance: 0.0635,
		lensSeparationDistance: 0.0635,
		eyeToScreenDistance: 0.041,
		distortionK : [1.0, 0.22, 0.24, 0.0],
		chromaAbParameter: [ 0.996, -0.004, 1.014, 0.0]
		*/
	};
	this.HMD = HMD;

	// Perspective camera
	var pCamera = new THREE.PerspectiveCamera();
	pCamera.matrixAutoUpdate = false;
	pCamera.target = new THREE.Vector3();

	// Orthographic camera
	var oCamera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 1000 );
	oCamera.position.z = 1;

	// pre-render hooks
	this.preLeftRender = function() {};
	this.preRightRender = function() {};

	renderer.autoClear = false;
	var emptyColor = new THREE.Color("black");

	// Render target
	var RTParams = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };
	var renderTarget = new THREE.WebGLRenderTarget( 640, 800, RTParams );
	var RTMaterial = new THREE.ShaderMaterial( {
		uniforms: {
			"texid": { type: "t", value: renderTarget },
			"scale": { type: "v2", value: new THREE.Vector2(1.0,1.0) },
			"scaleIn": { type: "v2", value: new THREE.Vector2(1.0,1.0) },
			"lensCenter": { type: "v2", value: new THREE.Vector2(0.0,0.0) },
			"hmdWarpParam": { type: "v4", value: new THREE.Vector4(1.0,0.0,0.0,0.0) },
			"chromAbParam": { type: "v4", value: new THREE.Vector4(1.0,0.0,0.0,0.0) }
		},
		vertexShader: [
			"varying vec2 vUv;",
			"void main() {",
			" vUv = uv;",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"
		].join("\n"),

		fragmentShader: [
			"uniform vec2 scale;",
			"uniform vec2 scaleIn;",
			"uniform vec2 lensCenter;",
			"uniform vec4 hmdWarpParam;",
			'uniform vec4 chromAbParam;',
			"uniform sampler2D texid;",
			"varying vec2 vUv;",
			"void main()",
			"{",
			"  vec2 uv = (vUv*2.0)-1.0;", // range from [0,1] to [-1,1]
			"  vec2 theta = (uv-lensCenter)*scaleIn;",
			"  float rSq = theta.x*theta.x + theta.y*theta.y;",
			"  vec2 rvector = theta*(hmdWarpParam.x + hmdWarpParam.y*rSq + hmdWarpParam.z*rSq*rSq + hmdWarpParam.w*rSq*rSq*rSq);",
			'  vec2 rBlue = rvector * (chromAbParam.z + chromAbParam.w * rSq);',
			"  vec2 tcBlue = (lensCenter + scale * rBlue);",
			"  tcBlue = (tcBlue+1.0)/2.0;", // range from [-1,1] to [0,1]
			"  if (any(bvec2(clamp(tcBlue, vec2(0.0,0.0), vec2(1.0,1.0))-tcBlue))) {",
			"    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
			"    return;}",
			"  vec2 tcGreen = lensCenter + scale * rvector;",
			"  tcGreen = (tcGreen+1.0)/2.0;", // range from [-1,1] to [0,1]
			"  vec2 rRed = rvector * (chromAbParam.x + chromAbParam.y * rSq);",
			"  vec2 tcRed = lensCenter + scale * rRed;",
			"  tcRed = (tcRed+1.0)/2.0;", // range from [-1,1] to [0,1]
			"  gl_FragColor = vec4(texture2D(texid, tcRed).r, texture2D(texid, tcGreen).g, texture2D(texid, tcBlue).b, 1);",
			"}"
		].join("\n")
	} );

	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), RTMaterial );

	// Final scene
	var finalScene = new THREE.Scene();
	finalScene.add( oCamera );
	finalScene.add( mesh );

    var left = {}, right = {};
    var distScale = 1.0;
	this.setHMD = function(v) {
		HMD = v;
		// Compute aspect ratio and FOV
		var aspect = HMD.hResolution / (2*HMD.vResolution);

		// Fov is normally computed with:
		//   THREE.Math.radToDeg( 2*Math.atan2(HMD.vScreenSize,2*HMD.eyeToScreenDistance) );
		// But with lens distortion it is increased (see Oculus SDK Documentation)
		var r = -1.0 - (4 * (HMD.hScreenSize/4 - HMD.lensSeparationDistance/2) / HMD.hScreenSize);
		distScale = (HMD.distortionK[0] + HMD.distortionK[1] * Math.pow(r,2) + HMD.distortionK[2] * Math.pow(r,4) + HMD.distortionK[3] * Math.pow(r,6));
		var fov = THREE.Math.radToDeg(2*Math.atan2(HMD.vScreenSize*distScale, 2*HMD.eyeToScreenDistance));

		// Compute camera projection matrices
		var proj = (new THREE.Matrix4()).makePerspective( fov, aspect, 0.3, 10000 );
		var h = 4 * (HMD.hScreenSize/4 - HMD.interpupillaryDistance/2) / HMD.hScreenSize;
		left.proj = ((new THREE.Matrix4()).makeTranslation( h, 0.0, 0.0 )).multiply(proj);
		right.proj = ((new THREE.Matrix4()).makeTranslation( -h, 0.0, 0.0 )).multiply(proj);

		// Compute camera transformation matrices
		left.tranform = (new THREE.Matrix4()).makeTranslation( -worldFactor * HMD.interpupillaryDistance/2, 0.0, 0.0 );
		right.tranform = (new THREE.Matrix4()).makeTranslation( worldFactor * HMD.interpupillaryDistance/2, 0.0, 0.0 );

		// Compute Viewport
		left.viewport = [0, 0, HMD.hResolution/2, HMD.vResolution];
		right.viewport = [HMD.hResolution/2, 0, HMD.hResolution/2, HMD.vResolution];

		// Distortion shader parameters
		var lensShift = 4 * (HMD.hScreenSize/4 - HMD.lensSeparationDistance/2) / HMD.hScreenSize;
		left.lensCenter = new THREE.Vector2(lensShift, 0.0);
		right.lensCenter = new THREE.Vector2(-lensShift, 0.0);

		RTMaterial.uniforms.hmdWarpParam.value = new THREE.Vector4(HMD.distortionK[0], HMD.distortionK[1], HMD.distortionK[2], HMD.distortionK[3]);
		RTMaterial.uniforms.chromAbParam.value = new THREE.Vector4(HMD.chromaAbParameter[0], HMD.chromaAbParameter[1], HMD.chromaAbParameter[2], HMD.chromaAbParameter[3]);
		RTMaterial.uniforms.scaleIn.value = new THREE.Vector2(1.0,1.0/aspect);
		RTMaterial.uniforms.scale.value = new THREE.Vector2(1.0/distScale, 1.0*aspect/distScale);

		// Create render target
		if ( renderTarget )
		{
		  renderTarget.dispose();
		}
		renderTarget = new THREE.WebGLRenderTarget( ( HMD.hResolution * distScale / 2 ) * renderer.devicePixelRatio, ( HMD.vResolution * distScale ) * renderer.devicePixelRatio, RTParams );
		RTMaterial.uniforms.texid.value = renderTarget;

	};
	this.getHMD = function() {return HMD;};

	this.setHMD(HMD);

	this.setSize = function ( width, height ) {
		left.viewport = [width/2 - HMD.hResolution/2, height/2 - HMD.vResolution/2, HMD.hResolution/2, HMD.vResolution];
		right.viewport = [width/2, height/2 - HMD.vResolution/2, HMD.hResolution/2, HMD.vResolution];

		renderer.setSize( width, height );
	};

	this.render = function ( scene, camera ) {
		var cc = renderer.getClearColor().clone();

		// Clear
		renderer.setClearColor(emptyColor);
		renderer.clear();
		renderer.setClearColor(cc);

		// camera parameters
		if (camera.matrixAutoUpdate)
		{
		  camera.updateMatrix();
		}

		// Render left
		pCamera.projectionMatrix.copy(left.proj);

		pCamera.matrix.copy(camera.matrix).multiply(left.tranform);
		pCamera.matrixWorldNeedsUpdate = true;

		this.preLeftRender(pCamera);

		renderer.setViewport(left.viewport[0], left.viewport[1], left.viewport[2], left.viewport[3]);

		RTMaterial.uniforms.lensCenter.value = left.lensCenter;
		renderer.render( scene, pCamera, renderTarget, true );

		renderer.render( finalScene, oCamera );

		// Render right
		pCamera.projectionMatrix.copy(right.proj);

		pCamera.matrix.copy(camera.matrix).multiply(right.tranform);
		pCamera.matrixWorldNeedsUpdate = true;

		this.preRightRender(pCamera);

		renderer.setViewport(right.viewport[0], right.viewport[1], right.viewport[2], right.viewport[3]);

		RTMaterial.uniforms.lensCenter.value = right.lensCenter;

		renderer.render( scene, pCamera, renderTarget, true );
		renderer.render( finalScene, oCamera );

	};

	this.dispose = function() {
		if ( RTMaterial ) {
			RTMaterial.dispose();
		}
		if ( renderTarget ) {
			renderTarget.dispose();
		}
	};

};


var constants = {
  teamColors: {
    RESISTANCE: new THREE.Vector4(0, 0.7607843137254902, 1, 1.0),
    ENLIGHTENED: new THREE.Vector4(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0),
    NEUTRAL: new THREE.Vector4(0.9764705882352941, 0.9764705882352941, 0.9764705882352941, 1.0),
    LOKI: new THREE.Vector4(1, 0.1568627450980392, 0.1568627450980392, 1.0)
  },
  qualityColors: {
    EXTREMELY_RARE: new THREE.Vector4(0.9803921568627451, 0.39215686274509803, 0.39215686274509803, 1.0),
    VERY_RARE: new THREE.Vector4(0.9568627450980393, 0.5215686274509804, 0.9254901960784314, 1.0),
    MORE_RARE: new THREE.Vector4(0.7647058823529411, 0, 1, 1.0),
    RARE: new THREE.Vector4(0.6666666666666666, 0.5372549019607843, 0.984313725490196, 1.0),
    LESS_COMMON: new THREE.Vector4(0.45098039215686275, 0.6588235294117647, 1, 1.0),
    COMMON: new THREE.Vector4(0.5098039215686274, 0.9529411764705882, 0.7058823529411765, 1.0),
    VERY_COMMON: new THREE.Vector4(0.6980392156862745, 0.6980392156862745, 0.6980392156862745, 1.0),
    L1: new THREE.Vector4(0.996078431372549, 0.807843137254902, 0.35294117647058826, 1.0),
    L2: new THREE.Vector4(1, 0.6509803921568628, 0.18823529411764706, 1.0),
    L3: new THREE.Vector4(1, 0.45098039215686275, 0.08235294117647059, 1.0),
    L4: new THREE.Vector4(0.8941176470588236, 0, 0, 1.0),
    L5: new THREE.Vector4(0.9921568627450981, 0.1607843137254902, 0.5725490196078431, 1.0),
    L6: new THREE.Vector4(0.9215686274509803, 0.14901960784313725, 0.803921568627451, 1.0),
    L7: new THREE.Vector4(0.7568627450980392, 0.1411764705882353, 0.8784313725490196, 1.0),
    L8: new THREE.Vector4(0.5882352941176471, 0.15294117647058825, 0.9568627450980393, 1.0)
  },
  anomalyColors: {
    1: new THREE.Vector4(1.0, 0.5686274509803921, 0.21176470588235294, 1.0),
    2: new THREE.Vector4(1.0, 0.3215686274509804, 0.9058823529411765, 1.0),
    3: new THREE.Vector4(0.6196078431372549, 0.35294117647058826, 1.0, 1.0),
    4: new THREE.Vector4(0.8431372549019608, 0.27058823529411763, 0.27058823529411763, 1.0),
    5: new THREE.Vector4(1.0, 0.9450980392156862, 0.0, 1.0),
    6: new THREE.Vector4(0.6509803921568628, 1.0, 0.9019607843137255, 1.0),
    7: new THREE.Vector4(0.5725490196078431, 0.5803921568627451, 0.592156862745098, 1.0)
  },
  artifactColors: {
    Helios: {
      artifactsRedGlow: new THREE.Vector4(0.92, 0.51, 0.14, 1.0),
      artifactsPurpleGlow: new THREE.Vector4(1.0, 0.87, 0.55, 1.0),
      artifactTargetGlow: new THREE.Vector4(1.0, 0.72, 0.0, 1.0)
    },
    Amar: {
      artifactTargetGlow: new THREE.Vector4(0.62, 0.22, 0.62, 1.0),
      artifactsRedGlow: new THREE.Vector4(0.79, 0.11, 0.49, 1.0),
      artifactsPurpleGlow: new THREE.Vector4(0.58, 0.17, 1.0, 1.0)
    },
    Jarvis: {
      artifactTargetGlow: new THREE.Vector4(0.62, 0.22, 0.62, 1.0),
      artifactsRedGlow: new THREE.Vector4(0.79, 0.11, 0.49, 1.0),
      artifactsPurpleGlow: new THREE.Vector4(0.58, 0.17, 1.0, 1.0)
    }
  },
  xmColors: {
    coreGlow: new THREE.Vector4(0.92, 0.7, 0.89, 1.0),
    coreGlowAlt: new THREE.Vector4(0.6, 0.4, 0.6, 0.8)
  }
};

imv.Constants = constants;

var inherits = function(a, b) {
  function C(){}
  C.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new C();
  a.prototype.constructor = a;
};

var setParams = function(base, opts, deep)
{
  for(var i in base)
  {
    if(base.hasOwnProperty(i) && opts.hasOwnProperty(i))
    {
      if(deep && typeof(base[i]) == 'object' && typeof(opts[i]) == 'object')
      {
        base[i] = setParams(base[i], opts[i], deep);
      }
      else
      {
        base[i] = opts[i];
      }
    }
  }
  return base;
};

var copyInto = function(obj, params)
{
  for(var i in params)
  {
    if(params.hasOwnProperty(i))
    {
      if(typeof(obj[i]) == 'object' && typeof(params[i]) == 'object')
      {
        obj[i] = copyInto(obj[i], params[i]);
      }
      else
      {
        obj[i] = params[i];
      }
    }
  }
  return obj;
};

var cloneUniforms = function(uniforms, exclude)
{
  var ret = {};
  for(var i in uniforms)
  {
    if(uniforms.hasOwnProperty(i) && (!exclude || !(i in exclude)))
    {
      var u = uniforms[i];
      if(typeof(u.value) == 'object' && 'clone' in u.value)
      {
        ret[i] = { type: u.type, value: u.value.clone() };
      }
      else
      {
        ret[i] = { type: u.type, value: u.value };
      }
    }
  }
  return ret;
};

var copyUniforms = function(uniforms, exclude)
{
  var ret = {};
  for(var i in uniforms)
  {
    if(uniforms.hasOwnProperty(i) && (!exclude || !(i in exclude)))
    {
      ret[i] = uniforms[i];
    }
  }
  return ret;
};

var asyncForeach = function(arr, callback, complete, delay)
{
  delay = delay || 0;
  var i = 0, n = arr.length;
  var next = function()
  {
    if(i >= n)
    {
      complete();
      return;
    }
    callback(arr[i], i);
    i++;
    setTimeout(next, delay);
  };
  setTimeout(next, 0);
};

imv.Utilities = imv.Utilities || {};
imv.Utilities.cloneUniforms = cloneUniforms;
imv.Utilities.copyUniforms = copyUniforms;
imv.Utilities.asyncForeach = asyncForeach;
imv.Utilities.setParams = setParams;
imv.Utilities.inherits = inherits;

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
      distanceScale: 0.25,
      distanceMax: 1000,
      distanceMin: 1,
      touchScale: 0.1,
      wheelScale: 0.01,
      friction: 0.1,
      target: new THREE.Vector3(),
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

  controls.prototype.updateCamera = function(camera)
  {
    var dx = this.target.x - this.rotation.x,
      dy = this.target.y - this.rotation.y,
      dz = this.distanceTarget - this.distance;
    if(Math.abs(dx) > 0.00001 || Math.abs(dy) > 0.00001 || Math.abs(dz) > 0.00001)
    {
      this.rotation.x += dx * this.options.friction;
      this.rotation.y += dy * this.options.friction;
      this.distance += dz * this.options.distanceScale;

      camera.position.x = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y) + this.options.target.x;
      camera.position.y = this.distance * Math.sin(this.rotation.y) + this.options.target.y;
      camera.position.z = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y) + this.options.target.z;

      camera.lookAt(this.options.target);
      camera.matrixWorldNeedsUpdate = true;
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
imv.Controls.OrbitControls = OrbitControls;

var Geometry = function(options)
{
  this.geometry = new THREE.BufferGeometry();
  this.transparent = (options && options.transparent) || false;
  this.attributes = {};
};

Geometry.prototype.getAttributeNames = function()
{
  return Object.keys(this.attributes);
};

imv.Geometry = imv.Geometry || {};
imv.Geometry.Geometry = Geometry;

var IngressGeometry = (function(){

  //typed arrays only, plz.
  var eachSlice = function(array, size, callback)
  {
    for(var i = 0; i < Math.floor(array.length / size); i++)
    {
      callback(array.subarray(i * size, (i + 1) * size), i);
    }
  };

  var parseAttributes = function(buf)
  {
    var v = new DataView(buf), c = 0;
    var n = v.getUint32(c), type, size, len, j, name;
    c += 4;
    var attributes = [];
    for(var i = 0; i < n; i++)
    {
      type = v.getUint32(c);
      if(type != 0x01 && type != 0x10)
      {
        console.warn('unknown type ' + type);
      }
      c += 4;
      size = v.getUint32(c);
      c += 4;
      len = v.getUint16(c);
      c += 2;
      name = '';
      for(j = 0; j < len; j++)
      {
        name += String.fromCharCode(v.getUint8(c+j));
      }
      c += len;
      attributes.push({
        name: name,
        type: type,
        size: size
      });
    }
    return attributes;
  };

  var loadGeometry = function(geom)
  {
    var jd = new JavaDeserializer(geom.buf);
    var stream = jd.getStream();
    var blocks = stream.getContents();
    var attributeData = blocks[3].contents.toArray(), total = 0;
    var attributes = parseAttributes(attributeData);
    var nAttributes = attributes.length;
    var points = blocks[0].contents.toArray();
    var arrays = [], i, a, type;
    for(i = 0; i < nAttributes; i++)
    {
      a = attributes[i];
      type = 'v' + a.size;
      total += a.size;
      geom.attributes[a.name] = { type: type, values: null };
    }
    var len = Math.floor(points.length / total);
    for(i = 0; i < nAttributes; i++)
    {
      arrays.push(new Float32Array(attributes[i].size * len));
    }
    var position = new Float32Array(3 * len);
    eachSlice(points, total, function(slice, index) {
      var off = 0, i;
      for(i = 0; i < nAttributes; i++)
      {
        var l = attributes[i].size;
        for(var j = 0; j < l; j++)
        {
          arrays[i][index * l + j] = slice[off+j];
        }
        off += l;
      }
      // this always assumes position comes first and is xyz
      // unfortunately, three.js makes some assumptions about
      // there being 'position' and 'index' attributes
      for(i = 0; i < 3; i++)
      {
        position[index + i] = slice[i];
      }
    });
    for(i = 0; i < nAttributes; i++)
    {
      a = attributes[i];
      geom.geometry.addAttribute(a.name, new THREE.BufferAttribute(arrays[i], a.size));
    }
    geom.geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
    var faces = blocks[1].contents.toArray();
    var index = new Uint16Array(faces.length);
    index.set(faces);
    geom.geometry.addAttribute('index', new THREE.BufferAttribute(index, 1));
  };

  var ingressgeometry = function(arraybuf, options)
  {
    Geometry.call(this, options);
    this.buf = arraybuf;
    loadGeometry(this);
    return this;
  };
  inherits(ingressgeometry, Geometry);

  return ingressgeometry;
}());

imv.Geometry = imv.Geometry || {};
imv.Geometry.IngressGeometry = IngressGeometry;

var PortalLinkGeometry = (function(){

  // TODO: Parameterize this concept a little better
  // this has potential to be a really flexible and powerful way of
  // making, essentially, extruded geometry.

  // 9 sets of 6 points, breaking the link into 8 pieces, each providing 6 faces, something like that?
  var _len = 9, _size = _len * 6;
  var c = new Array(_len),
    d = new Array(_len),
    e = new Array(_len);

  var clampedSin = function(f)
  {
    return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
  };

  for(var i = 0; i < _len; i++)
  {
    var f = i / 8.0;
    c[i] = f;
    e[i] = (3.0 + (-1.5 * Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4)));
    d[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
  }

  var baseColor = new THREE.Vector4(0.46, 0.18, 0.18, 1.0);

  var baseOffset = new THREE.Vector3();

  var fillChunk = function(vert, pos, tex, col, index, f1, f2, f3, f4, f5, v1, f6, v2)
  {
    var off = index * 4;
    vert[index * 3 + 0] = f1;
    vert[index * 3 + 1] = f2;
    vert[index * 3 + 2] = f3;
    pos[off + 0] = f1;
    pos[off + 1] = f2;
    pos[off + 2] = f3;
    pos[off + 3] = f6;
    tex[off + 0] = f4;
    tex[off + 1] = f5;
    tex[off + 2] = v1.x;
    tex[off + 3] = v1.z;
    col[off + 0] = v2.x;
    col[off + 1] = v2.y;
    col[off + 2] = v2.z;
    col[off + 3] = v2.w;
  };

  var linkgeometry = function(options)
  {
    options = options || {};
    options.transparent = true;
    Geometry.call(this, options);
    this.position = new THREE.BufferAttribute(new Float32Array(), 3);
    this.index = new THREE.BufferAttribute(new Uint16Array(), 1);
    this.a_position = new THREE.BufferAttribute(new Float32Array(), 4);
    this.a_texCoord0 = new THREE.BufferAttribute(new Float32Array(), 4);
    this.a_color = new THREE.BufferAttribute(new Float32Array(), 4);
    this.geometry.addAttribute('position', this.position);
    this.geometry.addAttribute('index', this.index);
    this.geometry.addAttribute('a_position', this.a_position);
    this.geometry.addAttribute('a_texCoord0', this.a_texCoord0);
    this.geometry.addAttribute('a_color', this.a_color);
    this.attributes = {
      "a_position": { type: "v4", values: null },
      "a_texCoord0": { type: "v4", values: null },
      "a_color": { type: "v4", values: null }
    };
    this.linkCount = 0;
  };
  inherits(linkgeometry, Geometry);

  linkgeometry.prototype.extendBuffer = function(attribute, count)
  {
    var buf = new Float32Array(attribute.length + (count * attribute.itemSize));
    buf.set(attribute.array);
    attribute.array = buf;
    return buf;
  };

  linkgeometry.prototype.addLink = function(start, end, color, distance)
  {
    distance = distance || Math.sqrt((end.x - start.x) * (end.x - start.x) + (end.y - start.y) * (end.y - start.y));
    var f1 = baseOffset.y,
      f2 = f1 + Math.min(30.0, 0.08 * distance),
      f3 = start.percent,
      f4 = end.percent,
      f5 = (f3 + f4) / 2.0,
      f6 = 0.01 * distance,
      f7 = 0.1 + f5 * 0.3;
    var vec = new THREE.Vector3(end.x, 0, end.y).sub(new THREE.Vector3(start.x, 0, start.y));
    var up = new THREE.Vector3(0, 1, 0);
    var right = vec.clone().cross(up).normalize();
    var pos = this.extendBuffer(this.a_position, _size),
      tex = this.extendBuffer(this.a_texCoord0, _size),
      col = this.extendBuffer(this.a_color, _size),
      vert = this.extendBuffer(this.position, _size);
    var off = this.linkCount * _size;
    var step = _len * 2;
    for(var i = 0; i < _len; i++)
    {
      var f8 = c[i],
        f9 = f3 + f8 * (f4 - f3),
        f10 = 0.6 + 0.35 * f9,
        f12 = f8 * f6,
        f13 = start.x + f8 * vec.x,
        f14 = start.y + f8 * vec.z,
        f15 = f1 + d[i] * (f2 - f1),
        f16 = e[i];
      var cl = baseColor.clone();
      cl.lerp(color, 0.25 + f9 * 0.75);
      cl.w = f10;
      fillChunk(vert, pos, tex, col, off + (i * 2), f13 + f16 * right.x, f15, f14 + f16 * right.z, 0, f12, up, f7, cl);
      fillChunk(vert, pos, tex, col, off + (i * 2) + 1, f13 - f16 * right.x, f15, f14 - f16 * right.z, 0.5, f12, up, f7, cl);
      fillChunk(vert, pos, tex, col, off + step + (i * 2), f13, f15 + f16, f14, 0, f12, right, f7, cl);
      fillChunk(vert, pos, tex, col, off + step + (i * 2) + 1, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(vert, pos, tex, col, off + 2 * step + (i * 2), f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(vert, pos, tex, col, off + 2 * step + (i * 2) + 1, f13, 0, f14, 1.0, f12, right, f7, cl);
    }
    var ind = new Uint16Array((this.linkCount + 1) * 144);
    ind.set(this.index.array);
    var vOff = this.linkCount * _size;
    var iOff = this.linkCount * 144;
    for(i = 0; i < 3; i++)
    {
      for(var j = 0; j < _len - 1; j++)
      {
        ind[iOff + 0] = vOff + 1;
        ind[iOff + 1] = vOff + 0;
        ind[iOff + 2] = vOff + 2;
        ind[iOff + 3] = vOff + 1;
        ind[iOff + 4] = vOff + 2;
        ind[iOff + 5] = vOff + 3;
        vOff += 2;
        iOff += 6;
      }
      vOff += 2;
    }
    this.linkCount++;
    this.index.array = ind;
    this.position.needsUpdate = true;
    this.index.needsUpdate = true;
    this.a_position.needsUpdate = true;
    this.a_texCoord0.needsUpdate = true;
    this.a_color.needsUpdate = true;
    this.geometry.needsUpdate = true;
    return this;
  };

  return linkgeometry;
}());

imv.Geometry = imv.Geometry || {};
imv.Geometry.PortalLinkGeometry = PortalLinkGeometry;

var ResonatorLinkGeometry = (function(){

  // 5 sets of 4 points, breaking the link into 4 pieces, each providing 4 faces
  var _len = 5, _size = _len * 4;
  var j = new Array(_len),
    k = new Array(_len),
    l = new Array(_len);

  var clampedSin = function(f)
  {
    return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
  };

  for(var i = 0; i < _len; i++)
  {
    var f = i / 4.0;
    j[i] = f;
    l[i] = 3.5 * Math.max(1.0 - Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4.0), 0.2);
    k[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
  }

  var baseColor = new THREE.Vector4(0.78, 0.31, 0.31, 1.0);

  var portalBaseOffset = new THREE.Vector3();
  var resonatorMidOffset = new THREE.Vector3();

  var fillChunk = function(vert, pos, tex, col, index, f1, f2, f3, f4, f5, v1, f6, v2)
  {
    var off = index * 4;
    vert[index * 3 + 0] = f1;
    vert[index * 3 + 1] = f2;
    vert[index * 3 + 2] = f3;
    pos[off + 0] = f1;
    pos[off + 1] = f2;
    pos[off + 2] = f3;
    pos[off + 3] = f6;
    tex[off + 0] = f4;
    tex[off + 1] = f5;
    tex[off + 2] = v1.x;
    tex[off + 3] = v1.z;
    col[off + 0] = v2.x;
    col[off + 1] = v2.y;
    col[off + 2] = v2.z;
    col[off + 3] = v2.w;
  };

  var linkgeometry = function(options)
  {
    options = options || {};
    options.transparent = true;
    Geometry.call(this, options);
    this.position = new THREE.BufferAttribute(new Float32Array(), 3);
    this.index = new THREE.BufferAttribute(new Uint16Array(), 1);
    this.a_position = new THREE.BufferAttribute(new Float32Array(), 4);
    this.a_texCoord0 = new THREE.BufferAttribute(new Float32Array(), 4);
    this.a_color = new THREE.BufferAttribute(new Float32Array(), 4);
    this.geometry.addAttribute('position', this.position);
    this.geometry.addAttribute('index', this.index);
    this.geometry.addAttribute('a_position', this.a_position);
    this.geometry.addAttribute('a_texCoord0', this.a_texCoord0);
    this.geometry.addAttribute('a_color', this.a_color);
    this.attributes = {
      "a_position": { type: "v4", values: null },
      "a_texCoord0": { type: "v4", values: null },
      "a_color": { type: "v4", values: null }
    };
    this.linkCount = 0;
  };
  inherits(linkgeometry, Geometry);

  linkgeometry.prototype.extendBuffer = function(attribute, count)
  {
    var buf = new Float32Array(attribute.length + (count * attribute.itemSize));
    buf.set(attribute.array);
    attribute.array = buf;
    return buf;
  };

  linkgeometry.prototype.addLink = function(portal, reso, color)
  {
    // f1 = resonator midpoint y value
    // f2 = portal min y value
    var dist = Math.sqrt((reso.x - portal.x) * (reso.x - portal.x) + (reso.y - portal.y) * (reso.y - portal.y));
    var f1 = resonatorMidOffset.y,
      f2 = portalBaseOffset.y,
      f3 = reso.percent,
      f4 = (2 / 30) * dist,
      f5 = 0.9 + 0.1 * f3,
      f6 = 0.65 + 0.35 * f3,
      f7 = 0.75 + 0.25 * f3,
      f8 = 0.1 + 0.3 * f3;
    var cl = baseColor.clone();
    cl.lerp(color, 0.1 + f3 * 0.85);
    cl.w = f7 * cl.w;
    var vec = new THREE.Vector3(reso.x, 0, reso.y).sub(new THREE.Vector3(portal.x, 0, portal.y));
    var up = new THREE.Vector3(0, 1, 0);
    var right = vec.clone().cross(up).normalize();
    var pos = this.extendBuffer(this.a_position, _size),
      tex = this.extendBuffer(this.a_texCoord0, _size),
      col = this.extendBuffer(this.a_color, _size),
      vert = this.extendBuffer(this.position, _size);
    var off = this.linkCount * _size;
    var step = _len * 2;
    var f10 = 5.0 * ((portal.x + portal.y) - Math.floor(portal.x + portal.y));
    for(var i = 0; i < _len; i++)
    {
      var f11 = j[i],
        f12 = portal.x + f11 * vec.x,
        f13 = portal.y + f11 * vec.z,
        f14 = f2 + f11 * (f1 - f2) + f5 * k[i],
        f15 = f6 * l[i],
        f16 = f11 * f4;
      fillChunk(vert, pos, tex, col, off + (i * 2) + 0, f12 + f15 * right.x, f14, f13 + f15 * right.z, 0.0, f16 + f10, up, f8, cl);
      fillChunk(vert, pos, tex, col, off + (i * 2) + 1, f12 - f15 * right.x, f14, f13 - f15 * right.z, 1.0, f16 + f10, up, f8, cl);

      fillChunk(vert, pos, tex, col, off + step + (i * 2) + 0, f12, f14 + f15, f13, 0.0, f16 + f10, right, f8, cl);
      fillChunk(vert, pos, tex, col, off + step + (i * 2) + 1, f12, f14 - f15, f13, 1.0, f16 + f10, right, f8, cl);
    }
    var ind = new Uint16Array((this.linkCount + 1) * 48);
    ind.set(this.index.array);
    var vOff = this.linkCount * _size;
    var iOff = this.linkCount * 48;
    for(i = 0; i < 2; i++)
    {
      for(var i2 = 0; i2 < _len - 1; i2++)
      {
        ind[iOff + 0] = vOff + 1;
        ind[iOff + 1] = vOff + 0;
        ind[iOff + 2] = vOff + 2;
        ind[iOff + 3] = vOff + 1;
        ind[iOff + 4] = vOff + 2;
        ind[iOff + 5] = vOff + 3;
        vOff += 2;
        iOff += 6;
      }
      vOff += 2;
    }
    this.linkCount++;
    this.index.array = ind;
    this.position.needsUpdate = true;
    this.index.needsUpdate = true;
    this.a_position.needsUpdate = true;
    this.a_texCoord0.needsUpdate = true;
    this.a_color.needsUpdate = true;
    this.geometry.needsUpdate = true;
    return this;
  };

  return linkgeometry;
}());

imv.Geometry = imv.Geometry || {};
imv.Geometry.ResonatorLinkGeometry = ResonatorLinkGeometry;


var FieldGeometry = (function(){

  // 5 sets of 4 points, breaking the link into 4 pieces, each providing 4 faces
  var fillChunk = function(vert, pos, col, index, v1, f1, f2, v2)
  {
    var off = index * 4;
    vert[index * 3 + 0] = v1.x;
    vert[index * 3 + 1] = 0;
    vert[index * 3 + 2] = v1.y;
    pos[off + 0] = v1.x;
    pos[off + 1] = v1.y;
    pos[off + 2] = f1;
    pos[off + 3] = f2;
    col[off + 0] = v2.x;
    col[off + 1] = v2.y;
    col[off + 2] = v2.z;
    col[off + 3] = v2.w;
    return index + 1;
  };

  var fillVectors = function(vert, pos, col, index, v1, f1, v2, f2, v3, f3, v4)
  {
    return fillChunk(vert, pos, col, fillChunk(vert, pos, col, fillChunk(vert, pos, col, index, v1, 0, f1, v4), v2, 0, f2, v4), v3, ((v2.x - v1.x) * (v1.y - v3.y) - (v2.y - v1.y) * (v1.x - v3.x)) / v1.distanceTo(v2), f3, v4);
  };

  var fieldgeometry = function(options)
  {
    options = options || {};
    options.transparent = true;
    Geometry.call(this, options);
    this.position = new THREE.BufferAttribute(new Float32Array(), 3);
    this.index = new THREE.BufferAttribute(new Uint16Array(), 1);
    this.a_position = new THREE.BufferAttribute(new Float32Array(), 4);
    this.a_color = new THREE.BufferAttribute(new Float32Array(), 4);
    this.geometry.addAttribute('position', this.position);
    this.geometry.addAttribute('index', this.index);
    this.geometry.addAttribute('a_position', this.a_position);
    this.geometry.addAttribute('a_color', this.a_color);
    this.attributes = {
      "a_position": { type: "v4", values: null },
      "a_color": { type: "v4", values: null }
    };
    this.fieldCount = 0;
    this.lastOffset = 0;
  };
  inherits(fieldgeometry, Geometry);

  fieldgeometry.prototype.extendBuffer = function(attribute, count)
  {
    var buf = new Float32Array(attribute.length + (count * attribute.itemSize));
    buf.set(attribute.array);
    attribute.array = buf;
    return buf;
  };

  fieldgeometry.prototype.addField = function(A, B, C, color, duration /* ? */)
  {
    duration = 1.0;
    var f1 = 1.1,
      f2 = A.percent,
      f3 = B.percent,
      f4 = C.percent;
    var vert = this.extendBuffer(this.position, 9),
      pos = this.extendBuffer(this.a_position, 9),
      col = this.extendBuffer(this.a_color, 9);
    if(duration < 1.0)
    {
      var f6 = Math.max(0.0, duration);
      f1 = 1.1 * f6;
      var f7 = f6 * f6;
      f2 *= f7;
      f3 *= f7;
      f4 *= f7;
    }
    var aVec = new THREE.Vector2(A.x, A.y),
      bVec = new THREE.Vector2(B.x, B.y),
      cVec = new THREE.Vector2(C.x, C.y);
    var center = aVec.clone().add(bVec).add(cVec).multiplyScalar(0.333333333333);
    var start = this.lastOffset;
    this.lastOffset = fillVectors(vert, pos, col, this.lastOffset, aVec, f2, bVec, f3, center, f1, color);
    this.lastOffset = fillVectors(vert, pos, col, this.lastOffset, bVec, f3, cVec, f4, center, f1, color);
    this.lastOffset = fillVectors(vert, pos, col, this.lastOffset, cVec, f4, aVec, f2, center, f1, color);
    var ind = new Uint16Array((this.fieldCount + 1) * 9);
    ind.set(this.index.array);
    for(var i = 0; i < 9; i++)
    {
      ind[start + i] = start + i;
    }
    this.index.array = ind;
    this.index.needsUpdate = true;
    this.position.needsUpdate = true;
    this.a_position.needsUpdate = true;
    this.a_color.needsUpdate = true;
    this.geometry.needsUpdate = true;
    this.fieldCount++;
    return this.fieldCount;
  };

  return fieldgeometry;
}());

imv.Geometry = imv.Geometry || {};
imv.Geometry.FieldGeometry = FieldGeometry;

var ParametricGeometry = (function(){

  // basic template for our parametric function.
  // takes u, v;
  // gives array of proper length (options.paramSize)
  var linear = function(u, v) {
    // x, y, z
    return [u, 0, v];
  };

  var parametric = function(func, options)
  {
    Geometry.call(this, options);
    func = func || linear;
    options = options || {};
    var params = {
      slices: 1,
      paramSize: 3
    };
    this.options = setParams(params, options);
    var t = func(0, 0);
    if(!t.length || t.length != this.options.paramSize)
    {
      throw 'Parametric function returned invalid results, must be array of length ' + this.options.paramSize;
    }
    this.attributes = {
      'a_position': { type: 'v' + this.options.paramSize, values: null },
      'a_texCoord0': { type: 'v2', values: null }
    };
    var n = this.options.slices, l = this.options.paramSize;
    // (n + 1) ^ points to define n x n squares in u,v space
    var len = (n + 1) * (n + 1);
    var position = new Float32Array(len * 3);
    var a_position = new Float32Array(len * l);
    var a_texCoord0 = new Float32Array(len * 2);
    // number of square subdivisions is n^2, 3 indices per face, 2 faces per square
    var faces = new Uint16Array(n * n * 3 * 2);
    var f = 0;
    for(var i = 0; i <= n; i++)
    {
      for(var j = 0; j <= n; j++)
      {
        var u = i / n, v = j / n;
        var slice = func(u, v);
        var idx = i * (n + 1) + j;
        a_texCoord0[idx * 2] = u;
        a_texCoord0[idx * 2 + 1] = v;
        for(var k = 0; k < l; k++)
        {
          a_position[(idx * l) + k] = slice[k];
          if(k < 3)
          {
            position[(idx * l) + k] = slice[k];
          }
        }
        if(l < 3)
        {
          position[(idx * 3) + 2] = 0.0;
        }
        if(i < n && j < n)
        {
          faces[f++] = idx;
          faces[f++] = idx + 1;
          faces[f++] = idx + n + 1;
          faces[f++] = idx + n + 1;
          faces[f++] = idx + 1;
          faces[f++] = idx + n + 2;
        }
      }
    }
    this.geometry.addAttribute('a_position', new THREE.BufferAttribute(a_position, l));
    this.geometry.addAttribute('a_texCoord0', new THREE.BufferAttribute(a_texCoord0, 2));
    this.geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
    this.geometry.addAttribute('index', new THREE.BufferAttribute(faces, 1));
  };
  inherits(parametric, Geometry);

  return parametric;
}());

imv.Geometry = imv.Geometry || {};
imv.Geometry.ParametricGeometry = ParametricGeometry;

var ShaderSet = (function(){

  var types = {
    'mat4': 'm4',
    'vec4': 'v4',
    'vec3': 'v3',
    'vec2': 'v2',
    'float': 'f',
    'sampler2D': 't',
    'int': 'i'
  };
  var getUniforms = function(program)
  {
    var uMatch = /uniform ([^ ]+) ([^;]+);/ig;
    var uniforms = {};
    var matches;
    while((matches = uMatch.exec(program)) !== null)
    {
      var t = matches[1];
      if(types.hasOwnProperty(t))
      {
        t = types[t];
      }
      else
      {
        console.warn('no known conversion from ' + t);
      }
      uniforms[matches[2]] = { type: t };
    }
    return uniforms;
  };

  var getAttributes = function(program)
  {
    var aMatch = /attribute ([^ ]+) ([^;]+);/ig;
    var attributes = {};
    var matches;
    while((matches = aMatch.exec(program)) !== null)
    {
      var t = matches[1];
      if(types.hasOwnProperty(t))
      {
        t = types[t];
      }
      else
      {
        console.warn('no known conversion from ' + t);
      }
      attributes[matches[2]] = { type: t };
    }
    return attributes;
  };

  var fixPrecision = function(shader)
  {
    if(/precision mediump float/g.test(shader))
    {
      return shader;
    }
    else
    {
      var lines = shader.split("\n");
      lines.splice(1, 0, "#ifdef GL_ES", "precision mediump float;", "#endif");
      return lines.join("\n");
    }
  };

  var shaderset = function(vertex, fragment)
  {
    this.vertex = fixPrecision(vertex);
    this.fragment = fragment;
    this.uniforms = getUniforms(vertex + "\n" + fragment);
    this.attributes = getAttributes(vertex + "\n" + fragment);
  };

  shaderset.prototype.getUniformsList = function()
  {
    return Object.keys(this.uniforms);
  };

  shaderset.prototype.getAttributesList = function()
  {
    return Object.keys(this.attributes);
  };

  return shaderset;
}());

imv.ShaderSet = ShaderSet;

var Drawable = (function(){

  var drawable = function()
  {
    this.geometry = null;
    this.material = null;
    this.mesh = null;
    this.shaders = null;
    this.elapsed = 0;
    this.uniforms = {};
    this.options = {};
  };

  drawable.prototype.init = function(geometry, shaders)
  {
    if(!(geometry instanceof imv.Geometry.Geometry))
    {
      throw 'Geometry must inherit from base';
    }
    if(!(shaders instanceof imv.ShaderSet))
    {
      throw 'Shaders must inherit from base';
    }
    var params = {
      transparent: false
    };
    this.options = setParams(params, this.options);
    this.geometry = geometry;
    this.shaders = shaders;

    var materialParams = {
      uniforms: this.uniforms,
      attributes: geometry.attributes,
      vertexShader: shaders.vertex,
      fragmentShader: shaders.fragment,
      transparent: this.options.transparent,
      side: THREE.DoubleSide,
      depthWrite: !this.options.transparent
    };
    this.material = new THREE.RawShaderMaterial(materialParams);

    this.mesh = new THREE.Mesh(geometry.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.updateMatrix();
    this.mesh.matrixAutoUpdate = false;
    this.id = null;

    return this;
  };

  drawable.prototype.updateView = function() {
    // this most basic is usually a u_modelViewProject update:
    console.warn('Nothing to udpate');
  };

  drawable.prototype.updateTime = function(time) {
    this.elapsed += time;
  };

  drawable.prototype.updateUniformF = function(name, value) {
    this.uniforms[name].value = value;
  };

  drawable.prototype.updateUniformV = function(name, value) {
    this.uniforms[name].value.copy(value);
  };

  drawable.prototype.updateUniformM = function(name, value) {
    this.uniforms[name].value.copy(value);
  };

  return drawable;
}());

imv.Drawable = Drawable;

var ModelDrawable = (function() {

  var modelDrawable = function() {
    Drawable.call(this);
    this.uniforms.u_modelViewProject = {
      type: "m4",
      value: new THREE.Matrix4()
    };
    this.projectView = new THREE.Matrix4();
  };
  inherits(modelDrawable, Drawable);

  modelDrawable.prototype.updateView = function(camera) {
    // this most basic is usually a u_modelViewProject update:
    this.projectView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.updateModel();
  };

  // signals that the model's mesh has been updated in some way...
  // means we need to recalculate the u_modelViewProject uniform
  modelDrawable.prototype.updateModel = function() {
    var modelViewProject = this.projectView.clone().multiply(this.mesh.matrixWorld);
    this.updateUniformM('u_modelViewProject', modelViewProject);
  };

  return modelDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Model = ModelDrawable;

var TexturedDrawable = (function(){

  var texturedDrawable = function(texture) {
    ModelDrawable.call(this);
    if(!(texture instanceof THREE.Texture))
    {
      throw 'Texture must be a THREE.Texture';
    }
    this.uniforms.u_texture = {
      type: "t",
      value: texture
    };
    texture.needsUpdate = true; // not sure I need this here now.
  };
  inherits(texturedDrawable, ModelDrawable);

  return texturedDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Textured = TexturedDrawable;

var BicoloredDrawable = (function(){

  // default quality color: very rare
  var defaultColor0 = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  // default glow color: xm color
  var defaultColor1 = new THREE.Vector4().copy(constants.xmColors.coreGlow);

  var bicolorDrawable = function(texture, u_color0, u_color1) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_color0 = {
      type: "v4",
      value: u_color0 || (defaultColor0.clone())
    };
    this.uniforms.u_color1 = {
      type: "v4",
      value: u_color1 || (defaultColor1.clone())
    };
  };
  inherits(bicolorDrawable, TexturedDrawable);

  bicolorDrawable.prototype.setPrimaryColor = function(color)
  {
    this.updateUniformV('u_color0', color);
  };

  bicolorDrawable.prototype.setSecondaryColor = function(color)
  {
    this.updateUniformV('u_color1', color);
  };

  return bicolorDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Bicolored = BicoloredDrawable;

var XmDrawable = (function(){

  var defaultTeamColor = new THREE.Vector4().copy(constants.xmColors.coreGlow);
  var defaultAltColor = new THREE.Vector4().copy(constants.xmColors.coreGlowAlt);

  var xmDrawable = function(texture, teamColor, altColor, elapsed) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_elapsedTime = {
      type: "f",
      value: elapsed || 0
    };
    this.uniforms.u_teamColor = {
      type: "v4",
      value: teamColor || defaultTeamColor.clone()
    };
    this.uniforms.u_altColor = {
      type: "v4",
      value: altColor || defaultAltColor.clone()
    };
  };
  inherits(xmDrawable, TexturedDrawable);

  xmDrawable.prototype.setTeamColor = function(color) {
    this.updateUniformV('u_teamColor', color);
  };

  xmDrawable.prototype.setAltColor = function(color) {
    this.updateUniformV('u_altColor', color);
  };

  xmDrawable.prototype.updateTime = function(tick) {
    Drawable.prototype.updateTime.call(this, tick);
    this.updateUniformF('u_elapsedTime', ((this.elapsed / 1000) % 300.0) * 0.1);
  };

  return xmDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Xm = XmDrawable;

var GlowrampDrawable = (function(){

  // default base color: neutral portal color
  var defaultBaseColor = new THREE.Vector4().copy(imv.Constants.teamColors.NEUTRAL);

  var glowrampDrawable = function(texture, baseColor, rotation, rampTarget, alpha) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_baseColor = {
      type: "v4",
      value: baseColor || defaultBaseColor.clone()
    };
    this.uniforms.u_rotation = {
      type: "f",
      value: rotation || 0
    };
    this.uniforms.u_rampTarget = {
      type: "f",
      value: rampTarget || 0
    };
    this.uniforms.u_alpha = {
      type: "f",
      value: alpha || 0.6
    };
    this.options.transparent = true;
  };
  inherits(glowrampDrawable, TexturedDrawable);

  glowrampDrawable.prototype.setBaseColor = function(color) {
    this.updateUniformV('u_baseColor', color);
  };

  glowrampDrawable.prototype.setAlpha = function(alpha) {
    this.updateuniformF('u_alpha', alpha);
  };

  glowrampDrawable.prototype.updateTime = function(tick) {
    Drawable.prototype.updateTime.call(this, tick);
    var inc = this.elapsed / 5000;
    this.updateUniformF('u_rotation', inc);
    this.updateUniformF('u_rampTarget', Math.sin(Math.PI / 2 * (inc - Math.floor(inc))));
  };

  return glowrampDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Glowramp = GlowrampDrawable;

var LinkDrawable = (function(){

  // no defaults here.

  var linkDrawable = function(texture) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_cameraFwd = {
      type: "v3",
      value: new THREE.Vector3(0, 0, -1)
    };
    this.uniforms.u_elapsedTime = {
      type: "f",
      value: 0
    };
    this.options.transparent = true;
  };
  inherits(linkDrawable, TexturedDrawable);

  linkDrawable.prototype.updateView = function(camera) {
    var fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    this.updateUniformV('u_cameraFwd', fwd);
    ModelDrawable.prototype.updateView.call(this, camera);
  };

  linkDrawable.prototype.updateTime = function(tick) {
    Drawable.prototype.updateTime.call(this, tick);
    this.updateUniformF('u_elapsedTime', ((this.elapsed / 1000) % 300.0) * 0.1);
  };

  return linkDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Link = LinkDrawable;

var ShieldEffectDrawable = (function(){

  // these defaults are whack.  Need to find the real
  // functions used to update these, too
  // As of 1.62.0, that was in ...ingress.common.scanner.b.a.d
  // The baksmali is a little jacked up, though.
  var defaultColor = new THREE.Vector4().copy(imv.Constants.teamColors.NEUTRAL),
    defaultRampTargetInv = new THREE.Vector2(0.5, 1.3),
    defaultContributions = new THREE.Vector3(0.5, 0.5, 0.5);

  var shieldEffectDrawable = function(texture, color, rampTargetInvWidth, contributions) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_color = {
      type: "v4",
      value: color || defaultColor
    };
    this.uniforms.u_rampTargetInvWidth = {
      type: "v2",
      value: rampTargetInvWidth || defaultRampTargetInv.clone()
    };
    this.uniforms.u_contributionsAndAlpha = {
      type: "v3",
      value: contributions || defaultContributions.clone()
    };
    this.options.transparent = true;
  };
  inherits(shieldEffectDrawable, TexturedDrawable);

  shieldEffectDrawable.prototype.setColor = function(color) {
    this.updateUniformV('u_color', color);
  };

  shieldEffectDrawable.prototype.updateTime = function(tick) {
    Drawable.prototype.updateTime.call(this, tick);
    var inc = this.elapsed / 10000;
    var v = this.uniforms.u_rampTargetInvWidth.value.clone();
    v.x = (inc - Math.floor(inc)) * 2.0 - 0.5;
    this.updateUniformV('u_rampTargetInvWidth', v);
  };

  return shieldEffectDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.ShieldEffect = ShieldEffectDrawable;

var loadResource = function(url, type, callback)
{
  if(type === 'image' || type === 'image.co')
  {
    if(/\.tga$/.test(url))
    {
      libtga.loadFile(url, function(err, tga) {
        if(err)
        {
          callback(err, null);
          return;
        }
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(tga.width, tga.height);
        imageData.data.set(tga.imageData);
        canvas.height = tga.height;
        canvas.width = tga.width;
        context.putImageData(imageData, 0, 0);
        callback(null, canvas);
      });
    }
    else
    {
      var i = new Image();
      // cross-origin image:
      if(type === 'image.co')
      {
        i.crossOrigin = 'anoymous';
      }
      i.onload = function()
      {
        callback(null, this);
      };
      i.onerror = function(e)
      {
        callback(e, null);
      };
      i.src = url;
    }
  }
  else
  {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;
    xhr.onload = function() {
      callback(null, this.response);
    };
    xhr.onerror = function(e) {
      callback(e, null);
    };

    xhr.send();
  }
};

var AssetLoader = function(type, transform)
{
  type = type || 'text';
  transform = transform || function(v) { return v; };
  var _callbacks = {};
  var _assets = {};

  this.loadAsset = function(name, url, callback, options)
  {
    if(_assets[name])
    {
      callback(null, _assets[name]);
      return;
    }
    _callbacks[name] = _callbacks[name] || [];
    _callbacks[name].push(callback);
    if(!_assets.hasOwnProperty(name))
    {
      _assets[name] = false;
      loadResource(url, type, function(err, value) {
        if(!err)
        {
          value = transform(value, options);
          _assets[name] = value;
        }
        var cb;
        while((cb = _callbacks[name].shift()))
        {
          cb(err, value);
        }
      });
    }
  };

  this.getAsset = function(name)
  {
    return _assets[name];
  };
};

imv.AssetLoader = AssetLoader;
imv.Utilities = imv.Utilities || {};
imv.Utilities.loadResource = loadResource;

var GeometryLoader = function(basepath, type)
{
  this.base = basepath;
  type = type || Geometry;
  this.geometries = new AssetLoader('arraybuffer', function(v, opt) { return new (type)(v, opt);});
};

GeometryLoader.prototype.loadAsset = function(name, asset, callback)
{
  this.geometries.loadAsset(name, this.base+asset.path, callback, asset);
};

GeometryLoader.prototype.getAsset = function(name)
{
  return this.geometries.getAsset(name);
};

imv.Loaders = imv.Loaders || {};
imv.Loaders.GeometryLoader = GeometryLoader;

var ShaderLoader = function(basepath)
{
  this.base = basepath;
  this.vertex = new AssetLoader('text');
  this.fragment = new AssetLoader('text');
};

ShaderLoader.prototype.loadAsset = function(name, asset, callback)
{
  var loaded = {}, loading = false;
  var onload = function() {
    if(!loading && loaded.fragment && loaded.vertex)
    {
      loading = true;
      callback(null, new ShaderSet(loaded.vertex, loaded.fragment));
    }
  };
  this.vertex.loadAsset(name, this.base+asset.vertex, function(err, v){
    if(err)
    {
      callback(err, null);
      return;
    }
    loaded.vertex = v;
    onload();
  });
  this.fragment.loadAsset(name, this.base+asset.fragment, function(err, v){
    if(err)
    {
      callback(err, null);
      return;
    }
    loaded.fragment = v;
    onload();
  });
};

ShaderLoader.prototype.getAsset = function(name)
{
  var vertex = this.vertex.getAsset(name),
    fragment = this.fragment.getAsset(name);
  if(vertex && fragment)
  {
    return new ShaderSet(vertex, fragment);
  }
  return null;
};

imv.Loaders = imv.Loaders || {};
imv.Loaders.ShaderLoader = ShaderLoader;

var TextureLoader = (function(){

  var typeMap = {
    'MipMapLinearLinear': THREE.LinearMipMapLinearFilter,
    'Linear': THREE.LinearFilter,
    'MipMapLinearNearest': THREE.LinearMipMapNearestFilter,
    'MipMapNearestLinear': THREE.NearestMipMapLinearFilter,
    'Nearest': THREE.NearestFilter,
    'Repeat': THREE.RepeatWrapping,
    'ClampToEdge': THREE.ClampToEdgeWrapping
  };

  var typeChange = function(type)
  {
    if(typeMap.hasOwnProperty(type))
    {
      type = typeMap[type];
    }
    else
    {
      console.warn('unknown type ' + type);
    }
    return type;
  };

  var textureloader = function(basepath)
  {
    this.base = basepath;
    this.metadata = {};
    this.textures = new AssetLoader('image', function(i, asset) {
      var magFilter = typeChange(asset.magFilter);
      var minFilter = typeChange(asset.minFilter);
      var wrapS = typeChange(asset.wrapS);
      var wrapT = typeChange(asset.wrapT);
      var t = new THREE.Texture(i, undefined, wrapS, wrapT, magFilter, minFilter);
      t.flipY = false;
      t.needsUpdate = true;
      return t;
    });
  };

  textureloader.prototype.loadAsset = function(name, asset, callback)
  {
    this.textures.loadAsset(name, this.base+asset.path, callback, asset);
  };

  textureloader.prototype.getAsset = function(name)
  {
    return this.textures.getAsset(name);
  };

  return textureloader;
}());

imv.Loaders = imv.Loaders || {};
imv.Loaders.TextureLoader = TextureLoader;

var AssetManager = function(basepath, map) {

  var assetMap = map || {};
  var cache = {
    model: new GeometryLoader(basepath, IngressGeometry),
    texture: new TextureLoader(basepath),
    shaders: new ShaderLoader(basepath)
  };
  var keys = Object.keys(cache);

  this.setAssets = function(list)
  {
    assetMap = list;
    return this;
  };

  this.addAssets = function(list)
  {
    assetMap = copyInto(assetMap, list);
  };

  this.getAsset = function(type, key)
  {
    if(type in cache)
    {
      return cache[type].getAsset(key);
    }
    return null;
  };

  this.getRawShader = function(name)
  {
    if(assetMap && ('rawShaders' in assetMap) && (name in assetMap.rawShaders))
    {
      return new ShaderSet(assetMap.rawShaders[name].vertex, assetMap.rawShaders[name].fragment);
    }
  };

  this.preloadAssets = function(onComplete)
  {
    var queues = {};
    var end = function()
    {
      var e = true;
      for(var i = 0; i < keys.length; i++)
      {
        e = e && (queues[keys[i]].i >= queues[keys[i]].n);
      }
      if(e)
      {
        setTimeout(onComplete, 0);
      }
    };
    var fetch = function(k) {
      var _keys = Object.keys(assetMap[k]);
      queues[k] = {
        i: 0,
        n: _keys.length
      };
      var next = function()
      {
        if(queues[k].i >= queues[k].n)
        {
          end();
          return;
        }
        var j = queues[k].i++;
        cache[k].loadAsset(_keys[j], assetMap[k][_keys[j]], function(err){
          if(err)
          {
            console.warn('Unable to load asset: ' + err);
          }
          setTimeout(next, 0);
        });
      };
      next();
    };
    for(var i = 0; i < keys.length; i++)
    {
      fetch(keys[i]);
    }

    return function () {
      var k = Object.keys(queues);
      var l = k.length;
      var s = 0;
      for(var i = 0; i < l; i++)
      {
        s += (queues[k[i]].i / queues[k[i]].n) / l;
      }
      return s;
    };
  };

  return this;
};

imv.AssetManager = AssetManager;

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

var LeveledXMItemEntity = (function(){

  var ITEM_TEXTURE = 'FlipCardTexture',
    ITEM_SHADER = 'bicolor_textured',
    CORE_TEXTURE = 'ObjectXMTexture',
    CORE_SHADER = 'xm';

  var leveledItem = function(loader, meshName, coreName, quality) {
    Entity.call(this, loader);
    var itemGeometry = loader.getAsset('model', meshName);
    var itemTexture = loader.getAsset('texture', ITEM_TEXTURE);
    var itemShaders = loader.getAsset('shaders', ITEM_SHADER);
    if(!itemGeometry)
    {
      throw 'Unable to load Geometry ' + meshName;
    }
    if(!itemTexture)
    {
      throw 'Unable to load texture ' + ITEM_TEXTURE;
    }
    if(!itemShaders)
    {
      throw 'Unable to load shaders: ' + ITEM_SHADER;
    }
    this.item = new BicoloredDrawable(itemTexture, this.quality);
    this.item.init(itemGeometry, itemShaders);
    var coreGeometry = loader.getAsset('model', coreName);
    var coreTexture = loader.getAsset('texture', CORE_TEXTURE);
    var coreShaders = loader.getAsset('shaders', CORE_SHADER);
    if(!coreGeometry)
    {
      throw 'Unable to load Geometry ' + coreName;
    }
    if(!coreTexture)
    {
      throw 'Unable to load texture ' + CORE_TEXTURE;
    }
    if(!coreShaders)
    {
      throw 'Unable to load shaders: ' + CORE_SHADER;
    }
    this.core = new XmDrawable(coreTexture);
    this.core.init(coreGeometry, coreShaders);
    this.setQuality(quality);
    this.models = [this.item, this.core];
  };
  inherits(leveledItem, Entity);

  leveledItem.prototype.setQuality = function(quality)
  {
    if(quality instanceof THREE.Vector4)
    {
      this.quality = quality;
    }
    else if(!(quality in constants.qualityColors))
    {
      throw 'Unknown quality color ' + quality;
    }
    else
    {
      this.quality = constants.qualityColors[quality].clone();
    }
    if(this.item)
    {
      this.item.setPrimaryColor(this.quality);
    }
    return this;
  };

  return leveledItem;
}());

imv.Entities = imv.Entities || {};
imv.Entities.LeveledXMItem = LeveledXMItemEntity;

var CapsuleItemEntity = (function(){

  // default quality to Rare, even though
  // no colors need to be rendered
  // Could be replaced with texturedDrawable, too
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.RARE);

  var capsule = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'CapsuleMesh', 'CapsuleXmMesh', quality);
  };
  inherits(capsule, LeveledXMItemEntity);

  return capsule;
}());

imv.Entities = imv.Entities || {};
imv.Entities.CapsuleItem = CapsuleItemEntity;

var HeatSinkItemEntity = (function(){

  // Defaulting to VR, because everyone likes VR.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  var heatsink = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'HeatSinkMesh', 'HeatSinkXmMesh', quality);
  };
  inherits(heatsink, LeveledXMItemEntity);

  return heatsink;
}());

imv.Entities = imv.Entities || {};
imv.Entities.HeatSinkItem = HeatSinkItemEntity;

var ExtraShieldItemEntity = (function(){

  // Default quality to very rare
  // They only seem to drop in VR rarieties, anyway.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  var extrashield = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'ExtraShieldMesh', 'ResShieldXMMesh', quality);
  };
  inherits(extrashield, LeveledXMItemEntity);

  return extrashield;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ExtraShieldItem = ExtraShieldItemEntity;

var ForceAmpItemEntity = (function(){

  // Defaulting to rare, since they only drop in the one quality
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.RARE);

  var forceamp = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'ForceAmpMesh', 'ForceAmpXmMesh', quality);
  };
  inherits(forceamp, LeveledXMItemEntity);

  return forceamp;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ForceAmpItem = ForceAmpItemEntity;

var LinkAmpItemEntity = (function(){

  // Defaulting to rare, because wouldn't VR be nice?
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.RARE);

  var linkamp = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'LinkAmpMesh', 'LinkAmpXmMesh', quality);
  };
  inherits(linkamp, LeveledXMItemEntity);

  return linkamp;
}());

imv.Entities = imv.Entities || {};
imv.Entities.LinkAmpItem = LinkAmpItemEntity;

var MultiHackItemEntity = (function(){

  // Defaulting to VR, because everyone likes VR.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  var multihack = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'MultiHackMesh', 'MultiHackXmMesh', quality);
  };
  inherits(multihack, LeveledXMItemEntity);

  return multihack;
}());

imv.Entities = imv.Entities || {};
imv.Entities.MultiHackItem = MultiHackItemEntity;

var ResonatorItemEntity = (function(){

  // Defaulting to a random level, because hey why not.
  var r = Math.floor(Math.random() * 8) + 1;
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors['L' + r]);

  var resonator = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'ResonatorMesh', 'ResonatorXMMesh', quality);
  };
  inherits(resonator, LeveledXMItemEntity);

  return resonator;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ResonatorItem = ResonatorItemEntity;

var ShieldItem = (function(){

  // Defaulting to VR, because everyone likes VR.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  var shield = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'ResShieldMesh', 'ResShieldXMMesh', quality);
  };
  inherits(shield, LeveledXMItemEntity);

  return shield;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ShieldItem = ShieldItem;

var TurretItem = (function(){

  // Defaulting to Rare because that's the only quality they come.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.RARE);

  var turret = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'TurretMesh', 'TurretXmMesh', quality);
  };
  inherits(turret, LeveledXMItemEntity);

  return turret;
}());

imv.Entities = imv.Entities || {};
imv.Entities.TurretItem = TurretItem;

var UltraStrikeItem = (function(){

  // Defaulting to a random level, because hey why not.
  var r = Math.floor(Math.random() * 8) + 1;
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors['L' + r]);

  var ultrastrike = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'UltrastrikeMesh', 'UltrastrikeXMMesh', quality);
  };
  inherits(ultrastrike, LeveledXMItemEntity);

  return ultrastrike;
}());

imv.Entities = imv.Entities || {};
imv.Entities.UltraStrikeItem = UltraStrikeItem;

var XmpItem = (function(){

  // Defaulting to a random level, because hey why not.
  var r = Math.floor(Math.random() * 8) + 1;
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors['L' + r]);

  var xmp = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'XmpMesh', 'XmpXMMesh', quality);
  };
  inherits(xmp, LeveledXMItemEntity);

  return xmp;
}());

imv.Entities = imv.Entities || {};
imv.Entities.XmpItem = XmpItem;

var PortalLinkSystemEntity = (function(){

  var LINK_TEXTURE = 'PortalLinkTexture',
    LINK_SHADER = 'LinkShader';

  var portalLinkSystem = function(loader, options) {
    Entity.call(this, loader);
    options = options || {};
    this.linkGeometry = new PortalLinkGeometry();
    var linkTexture = loader.getAsset('texture', LINK_TEXTURE);
    var linkShaders = loader.getRawShader(LINK_SHADER);
    if(!linkTexture)
    {
      throw 'Unable to load texture ' + LINK_TEXTURE;
    }
    if(!linkShaders)
    {
      throw 'Unable to load shaders: ' + LINK_SHADER;
    }
    this.linkSystem = new LinkDrawable(linkTexture);
    this.linkSystem.init(this.linkGeometry, linkShaders);
    this.models = [this.linkSystem];
  };
  inherits(portalLinkSystem, Entity);

  portalLinkSystem.prototype.addLink = function(srcx, srcy, srcPercent,
    destx, desty, destPercent, color)
  {
    if(!(color instanceof THREE.Vector4))
    {
      throw 'Color must be a Vector4';
    }
    this.linkGeometry.addLink({
      x: srcx,
      y: srcy,
      percent: srcPercent
    }, {
      x: destx,
      y: desty,
      percent: destPercent
    }, color);
    return this;
  };

  return portalLinkSystem;
}());

imv.Entities = imv.Entities || {};
imv.Entities.PortalLinkSystem = PortalLinkSystemEntity;

var ResonatorLinkSystemEntity = (function(){

  var LINK_TEXTURE = 'ResonatorLinkTexture',
    LINK_SHADER = 'LinkShader';

  var resonatorLinkSystem = function(loader, options) {
    Entity.call(this, loader);
    options = options || {};
    this.linkGeometry = new ResonatorLinkGeometry();
    var linkTexture = loader.getAsset('texture', LINK_TEXTURE);
    var linkShaders = loader.getRawShader(LINK_SHADER);
    if(!linkTexture)
    {
      throw 'Unable to load texture ' + LINK_TEXTURE;
    }
    if(!linkShaders)
    {
      throw 'Unable to load shaders: ' + LINK_SHADER;
    }
    this.linkSystem = new LinkDrawable(linkTexture);
    this.linkSystem.init(this.linkGeometry, linkShaders);
    this.models = [this.linkSystem];
  };
  inherits(resonatorLinkSystem, Entity);

  resonatorLinkSystem.prototype.addLink = function(srcx, srcy, srcPercent,
    destx, desty, destPercent, color)
  {
    if(!(color instanceof THREE.Vector4))
    {
      throw 'Color must be a Vector4';
    }
    this.linkGeometry.addLink({
      x: srcx,
      y: srcy,
      percent: srcPercent
    }, {
      x: destx,
      y: desty,
      percent: destPercent
    }, color);
    return this;
  };

  return resonatorLinkSystem;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ResonatorLinkSystem = ResonatorLinkSystemEntity;

var ShieldEffectEntity = (function(){

  var SHIELD_GEOMETRY = 'PortalShieldMesh',
    SHIELD_TEXTURE = 'PortalShieldTexture',
    SHIELD_SHADER = 'shield',
    SHIELD_SCALE = 12.0;

  var shieldEffect = function(loader, color, options) {
    Entity.call(this, loader);
    options = options || {};
    color = color || constants.teamColors.LOKI.clone();
    this.setColor(color);
    var geometry = loader.getAsset('model', SHIELD_GEOMETRY);
    var texture = loader.getAsset('texture', SHIELD_TEXTURE);
    var shaders = loader.getAsset('shaders', SHIELD_SHADER);
    if(!geometry)
    {
      throw 'Unable to load Geometry ' + SHIELD_GEOMETRY;
    }
    if(!texture)
    {
      throw 'Unable to load texture ' + SHIELD_TEXTURE;
    }
    if(!shaders)
    {
      throw 'Unable to load shaders: ' + SHIELD_SHADER;
    }
    this.effect = new ShieldEffectDrawable(texture, this.color);
    this.effect.init(geometry, shaders);
    this.effect.mesh.scale.set(SHIELD_SCALE, SHIELD_SCALE, SHIELD_SCALE);
    this.effect.mesh.updateMatrix();
    this.effect.mesh.updateMatrixWorld();
    this.effect.updateModel();
    this.models = [this.effect];
  };
  inherits(shieldEffect, Entity);

  shieldEffect.prototype.setColor = function(color)
  {
    if(!(color instanceof THREE.Vector4))
    {
      throw 'Color must be a Vector4';
    }
    this.color = color;
    if(this.effect)
    {
      this.effect.setColor(this.color);
    }
    return this;
  };

  return shieldEffect;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ShieldEffect = ShieldEffectEntity;

var PortalEntity = (function(){

  var PORTAL_GEOMETRY = 'TexturedPortalMesh',
    PORTAL_TEXTURE = 'GlowrampTexture',
    PORTAL_SHADER = 'portal_scanner',
    PORTAL_SCALE = 6.0;

  var portal = function(loader, teamColor, options) {
    Entity.call(this, loader);
    options = options || {};
    teamColor = teamColor || 'NEUTRAL';
    this.setTeamColor(teamColor);
    var portalGeometry = loader.getAsset('model', PORTAL_GEOMETRY);
    var portalTexture = loader.getAsset('texture', PORTAL_TEXTURE);
    var portalShaders = loader.getAsset('shaders', PORTAL_SHADER);
    if(!portalGeometry)
    {
      throw 'Unable to load Geometry ' + PORTAL_GEOMETRY;
    }
    if(!portalTexture)
    {
      throw 'Unable to load texture ' + PORTAL_TEXTURE;
    }
    if(!portalShaders)
    {
      throw 'Unable to load shaders: ' + PORTAL_SHADER;
    }
    this.portal = new GlowrampDrawable(portalTexture, this.teamColor);
    this.portal.init(portalGeometry, portalShaders);
    this.portal.mesh.scale.set(PORTAL_SCALE, PORTAL_SCALE, PORTAL_SCALE);
    this.portal.mesh.updateMatrix();
    this.portal.mesh.updateMatrixWorld();
    this.portal.updateModel();
    this.models = [this.portal];
  };
  inherits(portal, Entity);

  portal.prototype.setTeamColor = function(color)
  {
    if(color instanceof THREE.Vector4)
    {
      this.teamColor = color;
    }
    else if(!(color in constants.teamColors))
    {
      throw 'Unknown team color ' + color;
    }
    else
    {
      this.teamColor = constants.teamColors[color].clone();
    }
    if(this.portal)
    {
      this.portal.setBaseColor(this.teamColor);
    }
    return this;
  };

  return portal;
}());

imv.Entities = imv.Entities || {};
imv.Entities.Portal = PortalEntity;

var Engine = function(canvas, options)
{
  options = options || {};
  var params = {
    cameraOptions: {
      fov: 75,
      aspect: 1.0,
      near: 0.01,
      far: 50
    },
    shaderPrecision: 'mediump',
    premultipliedAlpha: true,
    alpha: false,
    preserveDrawingBuffer: false,
  };
  this.options = setParams(params, options, true);

  var created = Date.now();
  var models = {};
  var id = 0;
  this.addDrawable = function(model, soft)
  {
    if(!(model instanceof Drawable))
    {
      throw 'Object must be of type Drawable';
    }
    if(!model.id)
    {
      var n = id++;
      models[n] = model;
      model.id = n;
    }
    else
    {
      models[model.id] = model;
    }
    model.updateView(this.camera);
    if(!soft)
    {
      this.scene.add(model.mesh);
    }
  };

  this.removeDrawable = function(model)
  {
    if(!(model instanceof Drawable))
    {
      return false;
    }
    var i = model.id;
    if(i in models)
    {
      this.scene.remove(models[i].mesh);
      delete models[i];
    }
    return true;
  };

  this.addEntity = function(entity, soft)
  {
    if(!(entity instanceof Entity))
    {
      throw 'Must pass an instance of IMV.Entity';
    }
    for(var i = 0; i < entity.models.length; i++)
    {
      this.addDrawable(entity.models[i], soft);
    }
  };

  this.removeEntity = function(entity)
  {
    if(!(entity instanceof Entity))
    {
      return false;
    }
    var t = true;
    for(var i = 0; i < entity.models.length; i++)
    {
      t = this.removeDrawable(entity.models[i]) && t;
    }
    return t;
  };

  this.hideModel = function(model)
  {
    var i = model.id;
    if(i in models)
    {
      this.scene.remove(models[i].mesh);
    }
    return this;
  };

  this.showModel = function(model)
  {
    var i = model.id;
    if(i in models)
    {
      this.scene.add(models[i].mesh);
    }
    return this;
  };

  this.clearScene = function()
  {
    var keys = Object.keys(models);
    for(var i = 0; i < keys.length; i++)
    {
      this.scene.remove(models[keys[i]].mesh);
      delete models[keys[i]];
    }
    return this;
  };

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(
    this.options.cameraOptions.fov,
    this.options.cameraOptions.aspect,
    this.options.cameraOptions.near,
    this.options.cameraOptions.far
  );
  this.renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    precision: this.options.shaderPrecision,
    premultipliedAlpha: this.options.premultipliedAlpha,
    alpha: this.options.alpha,
    preserveDrawingBuffer: this.options.preserveDrawingBuffer,
    antialias: true
  });
  //this.renderer.sortObjects = false;

  var _this = this;
  var _periodics = [];
  this.getElapsed = function() { return Date.now() - created; };

  this.registerPeriodic = function(fn)
  {
    _periodics.push(fn);
    return this;
  };

  this.unregisterPeriodic = function(fn)
  {
    for(var i = 0; i < _periodics.length; i++)
    {
      if(_periodics[i] === fn)
      {
        _periodics.splice(i, 1);
      }
    }
    return this;
  };

  var lastTick = created;
  var updatePeriodics = function()
  {
    var i;
    var n = Date.now(), d = n - lastTick;
    lastTick = n;
    for(i in models)
    {
      if(models.hasOwnProperty(i) && models[i] instanceof Drawable)
      {
        models[i].updateTime(d);
      }
    }
    var l = _periodics.length;
    for(i = 0; i < l; i++)
    {
      _periodics[i](d);
    }
  };

  var updateViewUniforms = function(camera)
  {
    var i;
    for(i in models)
    {
      if(models.hasOwnProperty(i))
      {
        if(models[i] instanceof Drawable)
        {
          models[i].updateView(camera);
        }
      }
    }
  };

  var _ovr = false;
  var _effect = null;
  this.enableOVR = function() {
    if(!_effect)
    {
      _effect = new THREE.OculusRiftEffect(this.renderer);
      _effect.preLeftRender = updateViewUniforms;
      _effect.preRightRender = updateViewUniforms;
    }
    _ovr = true;
  };

  var width, height;
  var updateViewport = function()
  {
    _this.camera.aspect = width / height;
    _this.camera.updateProjectionMatrix();
    updateViewUniforms(_this.camera);
    _this.renderer.setSize(width, height);
    if(_effect)
    {
      _effect.setSize(width, height);
    }
  };

  this.updateViewport = function(w, h)
  {
    width = w;
    height = h;
    updateViewport();
  };

  this.disableOVR = function() {
    _ovr = false;
    updateViewport();
  };

  var suspended = false;
  var cleared = false;
  var render = function() {
    if(suspended)
    {
        cleared = true;
        return;
    }
    // update the default worldview.
    window.requestAnimationFrame(render);
    updatePeriodics();
    if(_ovr)
    {
      _effect.render(_this.scene, _this.camera);
    }
    else
    {
      if(_this.camera.matrixWorldNeedsUpdate)
      {
        updateViewUniforms(_this.camera);
      }
      _this.renderer.render(_this.scene, _this.camera);
    }
  };

  this.suspend = function()
  {
    if(!suspended)
    {
      suspended = true;
      cleared = false;
    }
  };

  this.resume = function()
  {
    suspended = false;
    if(cleared)
    {
      cleared = false;
      render();
    }
  };

  render();

  return this;
};

imv.Engine = Engine;

  imv.VERSION = '0.11.0';

  root.IMV = imv;

}(this));

//# sourceMappingURL=ingress-model-viewer.js.map