/* jshint ignore:start */
var ParticlePortalsGeometry = (function(){

  var MAX_SYSTEMS = 40,
    NUM_PARTICLES = 96,
    NUM_INDICES_PER_PARTICLE = 4,
    NUM_INDICES_PER_FACE = 6;

  var U = [0.0, 0.0, 1.0, 1.0];
  var V = [1.0, 0.0, 1.0, 0.0];

  var extendBuffer = function(attribute, count)
  {
    var buf = new Float32Array(attribute.length + (count * attribute.itemSize));
    buf.set(attribute.array);
    attribute.array = buf;
    return buf;
  };

  var particlePortalsGeometry = function() {
    Geometry.call(this, {transparent: true});
    this.count = 0;
    this.attributes = {
      'a_position': { type: 'v3', values: null },
      'a_texCoord0': { type: 'v2', values: null },
      'a_scale': { type: "f", values: null },
      'a_speed': { type: "f", values: null },
      'a_portalIndex': { type: "f", values: null },
      'a_index': { type: "f", values: null}
    };
    this.position = new THREE.BufferAttribute(new Float32Array(), 3);
    this.index = new THREE.BufferAttribute(new Uint16Array(), 1);
    this.a_position = new THREE.BufferAttribute(new Float32Array(), 3);
    this.a_texCoord0 = new THREE.BufferAttribute(new Float32Array(), 2);
    this.a_scale = new THREE.BufferAttribute(new Float32Array(), 1);
    this.a_speed = new THREE.BufferAttribute(new Float32Array(), 1);
    this.a_portalIndex = new THREE.BufferAttribute(new Float32Array(), 1);
    this.a_index = new THREE.BufferAttribute(new Float32Array(), 1);
    this.seeds = [];
    for(var i = 0; i < NUM_PARTICLES; i++)
    {
      this.seeds.push({
        x: Math.random() - 0.5,
        y: 0.4 * Math.random() - 0.2,
        z: Math.random() - 0.5,
        a_scale: 10.0 * (0.1 + 0.9 * Math.random()),
        a_speed: 6.0 * (0.5 + 0.5 * Math.random())
      });
    }
    this.geometry.addAttribute('a_position', this.a_position);
    this.geometry.addAttribute('a_texCoord0', this.a_texCoord0);
    this.geometry.addAttribute('a_scale', this.a_scale);
    this.geometry.addAttribute('a_speed', this.a_speed);
    this.geometry.addAttribute('a_portalIndex', this.a_portalIndex);
    this.geometry.addAttribute('a_index', this.a_index);
    this.geometry.addAttribute('position', this.position);
    this.geometry.addAttribute('index', this.index);
  };
  inherits(particlePortalsGeometry, Geometry);

  particlePortalsGeometry.prototype.addSystem = function() {
    if(this.count + 1 >= MAX_SYSTEMS)
    {
      throw 'This system is full';
    }
    var n = NUM_PARTICLES * NUM_INDICES_PER_PARTICLE;
    var a_position = extendBuffer(this.a_position, n);
    var a_texCoord0 = extendBuffer(this.a_texCoord0, n);
    var a_scale = extendBuffer(this.a_scale, n);
    var a_speed = extendBuffer(this.a_speed, n);
    var a_portalIndex = extendBuffer(this.a_portalIndex, n);
    var a_index = extendBuffer(this.a_index, n);
    var position = extendBuffer(this.position, n);
    var c = this.count++;
    var idx = c * n, seed, i, j;
    for(i = 0; i < NUM_PARTICLES; i++)
    {
      seed = this.seeds[i];
      for(j = 0; j < NUM_INDICES_PER_PARTICLE; j++)
      {
        position[idx * 3 + 0] = 0;//seed.x;
        position[idx * 3 + 1] = 0;//seed.y;
        position[idx * 3 + 2] = 0;//seed.z;
        a_position[idx * 3 + 0] = seed.x;
        a_position[idx * 3 + 1] = seed.y;
        a_position[idx * 3 + 1] = seed.z;
        a_texCoord0[idx * 2 + 0] = U[j];
        a_texCoord0[idx * 2 + 1] = V[j];
        a_scale[idx] = seed.a_scale;
        a_speed[idx] = seed.a_speed;
        a_portalIndex[idx] = c;
        a_index[idx] = i;
        idx++;
      }
    }

    var index = new Uint16Array((c + 1) * NUM_PARTICLES * NUM_INDICES_PER_FACE);
    index.set(this.index.array);
    var indices = [0, 1, 2, 1, 3, 2];
    idx = c * n;
    var f = c * NUM_PARTICLES * NUM_INDICES_PER_FACE;
    for(i = 0; i < NUM_PARTICLES; i++)
    {
      for(j = 0; j < NUM_INDICES_PER_FACE; j++)
      {
        index[f + j] = idx + indices[j];
      }
      f += 6;
      idx += 4;
    }
    this.index.array = index;
    this.position.needsUpdate = true;
    this.index.needsUpdate = true;
    this.a_position.needsUpdate = true;
    this.a_texCoord0.needsUpdate = true;
    this.a_scale.needsUpdate = true;
    this.a_speed.needsUpdate = true;
    this.a_portalIndex.needsUpdate = true;
    this.a_index.needsUpdate = true;
    this.geometry.needsUpdate = true;
  };

  return particlePortalsGeometry;
}());

imv.Geometries = imv.Geometries || {};
imv.Geometries.ParticlePortals = ParticlePortalsGeometry;

/* jshint ignore:end */
