import Constants from './constants';
import Engine from './engine';
import { default as AssetLoader } from './asset-loader';
import Drawable from './drawable';
import Inventory from './drawable/inventory';
import World from './drawable/world';
import PortalLink from './drawable/portal-link';
import ResonatorLink from './drawable/resonator-link';
import SphericalPortalLink from './drawable/spherical-portal-link';
import Atmosphere from './drawable/atmosphere';
import TexturedSphere from './drawable/textured-sphere';
import ParticlePortal from './drawable/particle-portal';

import InventoryItems from './entity/inventory';
import PortalEntity from './entity/portal';

import OrbitControls from './orbit-controls';

import { resetGL, setParams, disco, generateArtifacts, makeArtifact } from './utils';
import Ease from './animation/easing';
import Animation from './animation/animation';
import * as GLMatrix from 'gl-matrix';

const IMV = {
  Constants,
  Engine,
  AssetLoader,
  Utilities: {
    resetGL,
    setParams,
    disco,
    generateArtifacts,
    makeArtifact,
    Ease,
    Animation,
    GLMatrix,
    Promise,
  },
  Drawables: {
    Inventory,
    World,
    ResonatorLink,
    PortalLink,
    SphericalPortalLink,
    Atmosphere,
    TexturedSphere,
    ParticlePortal,
    Drawable
  },
  Entities: {
    World: {
      Portal: PortalEntity
    },
    Inventory: InventoryItems
  },
  Controls: {
    Orbit: OrbitControls
  },
  VERSION: '0.22.2'
};

export default IMV;

//if (module) module.exports = IMV; // eslint-disable-line no-undef
