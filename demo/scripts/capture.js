window.captureScreenshots = function(engine, options) {
  (function() {
    for (var i in IMV.Utilities.GLMatrix) {
      window[i] = IMV.Utilities.GLMatrix[i];
    }
  }());
  options = options || {};
  // camera work
  var series = options.series || 'Lightman';
  var shardCount = options.shardCount || 41;
  var highlightTexture = options.highlightTexture || 'Helios';
  var useFrozenHighlight = options.useFrozenHighlight || false;
  var hasFrozen = options.hasFrozen || true;
  var targetWidth = options.targetWidth || 768;
  var targetHeight = options.targetHeight || 1024;
  var ratio = options.ratio || 4;
  // how many milliseconds should "elapse" between frames
  var frameTimeSkip = options.frameTimeSkip || 100;
  // how long to pause after saving output before rendering the next frame
  var framePauseTime = options.framePauseSkip || 100;
  // run through the paces, but don't capture output.
  var dryRun = options.dryRun || true;
  var canvas = options.canvas || document.querySelector('#screen');
  if(!canvas) {
    throw new Error('Could not find screen to adjust');
  }

  var cameraPosition = options.cameraPosition || vec3.fromValues(0, 40, 35),
    cameraFocus = options.cameraFocus || vec3.fromValues(0, 10, 0);

  var shards = IMV.Utilities.generateArtifacts(series, shardCount, hasFrozen);

  canvas.style.right = '';
  canvas.style.bottom = '';
  canvas.style.width = targetWidth + 'px';
  canvas.style.height = targetHeight + 'px';
  engine.camera.setPosition(cameraPosition).lookAt(cameraFocus).setFar(500);
  engine.updateView();
  engine.resize(targetWidth * ratio, targetHeight * ratio);

  // markers/decoration, etc
  //var marker = new IMV.Drawables.Resource.Capsule();
  //mat4.translate(marker.model, marker.model, cameraFocus);
  //engine.objectRenderer.addDrawable(marker);

  // ornaments:
  var targetGlow = new IMV.Drawables.World.ArtifactsTargetGlow();
  targetGlow.uniforms.u_baseColor = vec4.clone(IMV.Constants.artifactGlowColors[series].Target);
  engine.objectRenderer.addDrawable(targetGlow);

  var greenGlow = new IMV.Drawables.World.ArtifactsGreenGlow();
  greenGlow.uniforms.u_baseColor = vec4.clone(IMV.Constants.teamColors.LOKI);
  engine.objectRenderer.addDrawable(greenGlow);

  var redGlow = new IMV.Drawables.World.ArtifactsRedGlow();
  redGlow.uniforms.u_baseColor = vec4.clone(IMV.Constants.artifactGlowColors[series].Red);
  engine.objectRenderer.addDrawable(redGlow);

  var purpleGlow = new IMV.Drawables.World.ArtifactsPurpleGlow();
  purpleGlow.uniforms.u_baseColor = vec4.clone(IMV.Constants.artifactGlowColors[series].Purple);
  engine.objectRenderer.addDrawable(purpleGlow);

  // portal:
  var portal = new IMV.Drawables.World.Portal();
  portal.uniforms.u_baseColor = vec4.fromValues(
    0.5,
    Math.sin(2 * Math.PI / 3) * 0.5 + 0.5,
    Math.sin(4 * Math.PI / 3) * 0.5 + 0.5,
    1.0
  );
  engine.objectRenderer.addDrawable(portal);
  portal.onUpdate = function(delta, elapsed) {
    var c = (elapsed / 5000) * 2 * Math.PI;
    this.uniforms.u_baseColor[0] = Math.sin(c) * 0.5 + 0.5;
    this.uniforms.u_baseColor[1] = Math.sin(c + 2 * Math.PI / 3) * 0.5 + 0.5;
    this.uniforms.u_baseColor[2] = Math.sin(c + 4 * Math.PI / 3) * 0.5 + 0.5;
    //this.uniforms.u_baseColor[3] = Math.sin(c / 4) * 0.1 + 0.9;
    return true;
  };

  // shards:
  var makeHighlight = function(index) {
    var name = series + (useFrozenHighlight ? 'Frozen' : '') + index;
    return IMV.Utilities.makeArtifact(name, 'Artifact' + highlightTexture + 'Texture');
  };

  var unfrozen = [], frozen = [], __shards = [], highlight = [];
  (function() {
    var s;
    for(var i = 1; i <= shardCount; i++) {
      s = makeHighlight(i);
      __shards.push(s);
      unfrozen.push(new shards['' + i]());
      if(hasFrozen) {
        frozen.push(new shards['Frozen' + i]());
      }
      highlight.push(new s());
    }
  }());

  // snapshots:
  var dataURLToBlob = function(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  };

  var snapshots = [], snapshotURLs = [];
  var captureOutput = function(name) {
    if(!dryRun) {
      var s = dataURLToBlob(engine.canvas.toDataURL());
      saveAs(s, name);
      console.log(snapshots.length + ' snapshots saved');
    }
  };

  var highlightShard = function(index) {
    clear();
    for(var i = 0; i < shardCount; i++) {
      if(i === (index - 1)) {
        engine.objectRenderer.addDrawable(highlight[i]);
      }
      else {
        engine.objectRenderer.addDrawable(unfrozen[i]);
      }
    }

    addPortal();
  };

  var clear = function() {
    engine.objectRenderer.drawables = [];
  };

  var addPortal = function() {
    engine.objectRenderer.addDrawable(targetGlow);
    engine.objectRenderer.addDrawable(greenGlow);
    engine.objectRenderer.addDrawable(redGlow);
    engine.objectRenderer.addDrawable(purpleGlow);
    engine.objectRenderer.addDrawable(portal);
  };

  var pad = function(i) {
    return (i < 10 ? '0' : '') + i;
  };

  var __i = 1;
  var nextHighlight = function() {
    if(__i > shardCount) return;
    highlightShard(__i++);
    return series + 'Highlight' + pad(__i - 1);
  };

  var __j = 1;
  var nextNormal = function() {
    if(__j > shardCount) return;
    clear();
    engine.objectRenderer.addDrawable(unfrozen[__j - 1]);
    addPortal();
    __j++;
    return series + pad(__j - 1);
  };

  var __k = 1;
  var nextFrozen = function() {
    if(__k > shardCount) return;
    clear();
    engine.objectRenderer.addDrawable(frozen[__k - 1]);
    addPortal();
    __k++;
    return series + 'Frozen' + pad(__k - 1);
  };

  var __frozen = false;
  var allFrozen = function() {
    if(__frozen) return;
    clear();
    for(var i = 0; i < shardCount; i++) {
      engine.objectRenderer.addDrawable(frozen[i]);
    }
    addPortal();
    __frozen = true;
    return series + 'Frozen';
  };

  var __unfrozen = false;
  var allUnfrozen = function() {
    if(__unfrozen) return;
    clear();
    for(var i = 0; i < shardCount; i++) {
      engine.objectRenderer.addDrawable(unfrozen[i]);
    }
    addPortal();
    __unfrozen = true;
    return series;
  };

  var next = null;
  var tick = function() {
    if(next) {
      captureOutput(next);
      setTimeout(tick, framePauseTime);
    }
    if(__i <= shardCount) {
      next = nextHighlight();
    }
    else if(__j <= shardCount) {
      next = nextNormal();
    }
    else if(hasFrozen && __k <= shardCount) {
      next = nextFrozen();
    }
    else if(hasFrozen && !__frozen) {
      next = allFrozen();
    }
    else if(!__unfrozen) {
      next = allUnfrozen();
    }
    else {
      next = null;
    }
    engine.draw(frameTimeSkip);
  };

  var grabFrame = function() {
    dryRun = false;
    captureOutput(series + highlightTexture + (hasFrozen ? 'Frozen' : ''));
    dryRun = true;
  };

  return tick;
};
