 var ParticlePortalsDrawable = (function(){

  var MAX_SYSTEMS = 40;

  var system = function(color, position, count, height, distance, spread, id)
  {
    this.color = color;
    this.position = position;
    this.count = count;
    this.height = height;
    this.distance = distance;
    this.spread = spread;
    this.id = id;
  };

  var particlePortalsDrawable = function(texture) {
    ParticleDrawable.call(this, texture);
    this.colors = [];
    this.position = [];
    this.params = [];
    this.count = 0;
    this.id = 0;
    this.systems = [];
    for(var i = 0; i < MAX_SYSTEMS; i++)
    {
      this.colors.push(new THREE.Vector4());
      this.position.push(new THREE.Vector4());
      this.params.push(new THREE.Vector4());
    }
    this.uniforms.u_color = {
      type: "v4v",
      value: this.colors
    };
    this.uniforms.u_position = {
      type: "v4v",
      value: this.position
    };
    this.uniforms.u_params = {
      type: "v4v",
      value: this.params
    };
  };
  inherits(particlePortalsDrawable, ParticleDrawable);

  particlePortalsDrawable.prototype.updateView = function(camera) {
    ParticleDrawable.prototype.updateView.call(this, camera);
    var n = this.count, delta = new THREE.Vector3(), cur, scale;
    for(var i = 0; i < n; i++)
    {
      cur = this.systems[i];
      delta.copy(cur.position).sub(camera.position);
      scale = Math.pow(delta.length(), 0.2);
      this.position[i].set(cur.position.x, cur.position.y, cur.position.z, cur.height);
      this.params[i].w = scale;
    }
  };

  particlePortalsDrawable.prototype.addSystem = function(color, position, count,
    height, spread, distance)
  {
    if(this.count + 1 >= MAX_SYSTEMS)
    {
      throw 'This system is full';
    }
    // position should be relative to the system's position
    position.sub(this.mesh.position);
    var n = this.count++;
    var pos = this.uniforms.u_cameraPos.value;
    var delta = position.clone().sub(pos);
    var scale = Math.pow(delta.length(), 0.2);
    var id = this.id++;
    this.systems.push(new system(color, position, count, height, spread, distance, id));
    this.colors[n].set(color.x, color.y, color.z, count);
    this.position[n].set(position.x, position.y, position.z, height);
    this.params[n].set(this.elapsed / 100000 * distance, distance, spread, scale);
    return id;
  };

  particlePortalsDrawable.prototype.updateTime = function(tick) {
    Drawable.prototype.updateTime.call(this, tick);
    var n = this.count;
    for(var i = 0; i < n; i++)
    {
      this.params[i].x = (this.elapsed / 100000) * this.params[i].y;
    }
  };

  return particlePortalsDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.ParticlePortals = ParticlePortalsDrawable;