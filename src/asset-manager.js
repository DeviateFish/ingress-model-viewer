import GLBound from './gl-bound';
import AssetLoader from './asset-loader';
import FileMesh from './mesh/file';
import Texture from './texture';
import Program from './program';
import GlowrampProgram from './program/glowramp';
import OpaqueProgram from './program/opaque';

var _programs = {
  'Glowramp': GlowrampProgram,
  'Opaque': OpaqueProgram
};

function simpleMerge(left, right) {
  left = left || {};
  for(var i in right) {
    left[i] = right[i];
  }
  return left;
}

function mergeManifests(base, add) {
  var keys = ['texture', 'mesh', 'program', 'rawProgram'];
  keys.forEach(function(key) {
    if (key in add) {
      base[key] = simpleMerge(base[key], add[key]);
    }
  });
  return base;
}

/**
 * An AssetManager manages all the various types of assets that need to be bound to
 * to a gl context.  It uses an AssetLoader to handle the loading and caching of the
 * asset sources, and also maintains a parallel cache of the bound resources.
 */
class AssetManager extends GLBound {

  /**
   * Constructs an asset loader.
   * @param  {context} gl      A 3d context from a canvas
   * @param  {Object} manifest A mapping of key:value pairs for the following types:
   *                           texture, mesh, program, rawProgram
   */
  constructor(gl, manifest) {
    super(gl);
    this.manifest = manifest;
    this.loader = new AssetLoader();
    this.textures = {};
    this.meshes = {};
    this.programs = {};
    this.queues = {
      texture: [],
      mesh: [],
      program: []
    };
    this.stats = {
      texture: {},
      mesh: {},
      program: {},
      rawProgram: {}
    };
    this.path = '/assets/';
  }

  /**
   * Merges in another manifest to the existing asset manifest
   *
   * Additional manifests should be merged in before loading.
   * @param {Object} manifest @see constructor
   *
   * @return {void}
   */
  addAssets(manifest) {
    this.manifest = mergeManifests(this.manifest, manifest);
  }

  /**
   * Adds a bound texture to the texture cache, under a given internal name
   * @param {String} name     Texture internal name
   * @param {Texture} texture A bound Texture
   *
   * @return {void}
   */
  addTexture(name, texture) {
    this.textures[name] = texture;
  }

  /**
   * Adds a bound mesh to the mesh cache, under a given internal name
   * @param {String} name Mesh internal name
   * @param {Mesh} mesh   A bound mesh
   *
   * @return {void}
   */
  addMesh(name, mesh) {
    this.meshes[name] = mesh;
  }

  /**
   * Adds a bound program to the program cache, under a given internal name
   * @param {String} name     Program internal name
   * @param {Program} program A bound Program
   *
   * @return {void}
   */
  addProgram(name, program) {
    this.programs[name] = program;
  }

  /**
   * Returns a promise that resolves to a bound texture.
   * @param  {String} name Texture internal name
   * @return {Promise}     Resolves to the bound texture.
   */
  loadTexture(name) {
    if (!(name in this.manifest.texture)) {
      return Promise.reject(new Error('Unknown texture ' + name));
    } else if (this.textures[name]) {
      this._recordUsage('texture', name);
      return Promise.resolve(this.textures[name]);
    } else {
      let asset = this.manifest.texture[name];
      return this.loader.loadAsset(this._getFullPath(asset.static, asset.path), 'image')
        .then((texture) => {
          if (!this.textures[name]) {
            this.textures[name] = new Texture(this._gl, asset, texture);
          }
          this._recordUsage('texture', name);
          return this.textures[name];
        });
    }
  }

  /**
   * Returns a promise that resolves to a bound mesh.
   * @param  {String} name Mesh internal name
   * @return {Promise}     Resolves to the bound mesh.
   */
  loadMesh(name) {
    if (!(name in this.manifest.mesh)) {
      return Promise.reject(new Error('Unknown mesh ' + name));
    } else if (this.meshes[name]) {
      this._recordUsage('mesh', name);
      return Promise.resolve(this.meshes[name]);
    } else {
      let asset = this.manifest.mesh[name];
      return this.loader.loadAsset(this._getFullPath(asset.static, asset.path), 'arraybuffer')
        .then((mesh) => {
          if (!this.meshes[name]) {
            this.meshes[name] = new FileMesh(this._gl, mesh);
          }
          this._recordUsage('mesh', name);
          return this.meshes[name];
        });
    }
  }

  /**
   * Returns a promise that resolves to a bound program.
   * @param  {String} name Program internal name (raw or loaded)
   * @return {Promise}     Resolves to the bound program.
   */
  loadProgram(name) {
    if (!(name in this.manifest.program) && !(name in this.manifest.rawProgram)) {
      return Promise.reject(new Error('Unknown program ' + name));
    } else if (this.programs[name]) {
      this._recordUsage('program', name);
      return Promise.resolve(this.programs[name]);
    } else {
      if (name in this.manifest.rawProgram) {
        let asset = this.manifest.rawProgram[name];
        return new Promise((resolve) => {
          if (!this.programs[name]) {
            let Klass = _programs[asset.program] || Program;
            this.programs[name] = new Klass(this._gl, asset.vertex, asset.fragment);
          }
          this._recordUsage('program', name);
          resolve(this.programs[name]);
        });
      } else {
        let asset = this.manifest.program[name];
        return Promise.all([
            this.loader.loadAsset(this._getFullPath(asset.static, asset.vertex), 'text'),
            this.loader.loadAsset(this._getFullPath(asset.static, asset.fragment), 'text')
          ]).then((program) => {
            if (!this.programs[name]) {
              let Klass = _programs[asset.program] || Program;
              this.programs[name] = new Klass(this._gl, program[0], program[1]);
            }
            this._recordUsage('program', name);
            return this.programs[name];
          });
      }
    }
  }

  /**
   * Loads all remote resources found in the manifest, and creates any static programs
   * included in the manifest's rawPrograms section, if it exists.
   * @return {Promise}          Promise that resolves when all assets are loaded
   */
  loadAll() {
    var manifest = this.manifest;
    return Promise.all([
      Object.keys(manifest.texture).reduce((promise, name) => {
        return promise.then(() => {
          return this.loadTexture(name);
        });
      }, Promise.resolve()),
      Object.keys(manifest.mesh).reduce((promise, name) => {
        return promise.then(() => {
          return this.loadMesh(name);
        });
      }, Promise.resolve()),
      Object.keys(manifest.program)
        .concat(Object.keys(manifest.rawProgram))
        .reduce((promise, name) => {
          return promise.then(() => {
            return this.loadProgram(name);
          });
        }, Promise.resolve())
    ]);
  }

  /**
   * Generates a compact manifest containing only the resources that have been
   * actually be fetched from the cache, after loading.  Useful to reduce loading
   * time for scenes that only use a few resources.
   * @return {Object} A manifest containing only the resources that were actually used
   *                  after loading.
   */
  generateManifest() {
    var manifest = {}, keys = ['texture', 'mesh', 'rawProgram', 'program'];
    keys.forEach(function(section) {
      manifest[section] = {};
      for(var i in this.stats[section]) {
        if(this.stats[section].hasOwnProperty(i) && this.stats[section][i] > 0) {
          manifest[section][i] = this.manifest[section][i];
        }
      }
    }.bind(this));
    return manifest;
  }

  _getFullPath(isStatic, path) {
    return (isStatic ? '' : this.path) + path;
  }

  _recordUsage(type, name) {
    this.stats[type][name] = (this.stats[type][name] || 0) + 1;
  }
}

export default AssetManager;
