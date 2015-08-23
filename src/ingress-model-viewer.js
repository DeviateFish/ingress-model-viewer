import Constants from './constants';
import Engine from './engine';
import { loadResource } from './asset-loader';
import Inventory from './drawable/inventory';
import World from './drawable/world';
import PortalLink from './drawable/portal-link';
import ResonatorLink from './drawable/resonator-link';
import SphericalPortalLink from './drawable/spherical-portal-link';
import Atmosphere from './drawable/atmosphere';
import TexturedSphere from './drawable/textured-sphere';

import InventoryItems from './entity/inventory';
import PortalEntity from './entity/portal';

import OrbitControls from './orbit-controls';

import { resetGL, setParams, disco, generateArtifacts } from './utils';


export default {
  Constants,
  Engine,
  Utilities: {
    loadResource,
    resetGL,
    setParams,
    disco,
    generateArtifacts
  },
  Drawables: {
    Inventory,
    World,
    ResonatorLink,
    PortalLink,
    SphericalPortalLink,
    Atmosphere,
    TexturedSphere
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
  VERSION: '0.18.0'
};
