import { vec4 } from 'gl-matrix';

/**
 * A bunch of useful constants.
 * @type {Object}
 */
var Constants = {
  /**
   * Short list of team colors by internal name.
   * @type {Object}
   */
  teamColors: {
    RESISTANCE: vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    ENLIGHTENED: vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0),
    NEUTRAL: vec4.fromValues(0.9764705882352941, 0.9764705882352941, 0.9764705882352941, 1.0),
    LOKI: vec4.fromValues(1, 0.1568627450980392, 0.1568627450980392, 1.0)
  },
  /**
   * Quality and level colors, by internal name.
   * @type {Object}
   */
  qualityColors: {
    EXTREMELY_RARE: vec4.fromValues(0.9803921568627451, 0.39215686274509803, 0.39215686274509803, 1.0),
    VERY_RARE: vec4.fromValues(0.9568627450980393, 0.5215686274509804, 0.9254901960784314, 1.0),
    MORE_RARE: vec4.fromValues(0.7647058823529411, 0, 1, 1.0),
    RARE: vec4.fromValues(0.6666666666666666, 0.5372549019607843, 0.984313725490196, 1.0),
    LESS_COMMON: vec4.fromValues(0.45098039215686275, 0.6588235294117647, 1, 1.0),
    COMMON: vec4.fromValues(0.5098039215686274, 0.9529411764705882, 0.7058823529411765, 1.0),
    VERY_COMMON: vec4.fromValues(0.6980392156862745, 0.6980392156862745, 0.6980392156862745, 1.0),
    L1: vec4.fromValues(0.996078431372549, 0.807843137254902, 0.35294117647058826, 1.0),
    L2: vec4.fromValues(1, 0.6509803921568628, 0.18823529411764706, 1.0),
    L3: vec4.fromValues(1, 0.45098039215686275, 0.08235294117647059, 1.0),
    L4: vec4.fromValues(0.8941176470588236, 0, 0, 1.0),
    L5: vec4.fromValues(0.9921568627450981, 0.1607843137254902, 0.5725490196078431, 1.0),
    L6: vec4.fromValues(0.9215686274509803, 0.14901960784313725, 0.803921568627451, 1.0),
    L7: vec4.fromValues(0.7568627450980392, 0.1411764705882353, 0.8784313725490196, 1.0),
    L8: vec4.fromValues(0.5882352941176471, 0.15294117647058825, 0.9568627450980393, 1.0)
  },
  /**
   * Color constants for anomaly markers.
   * @type {Object}
   */
  anomalyColors: {
    1: vec4.fromValues(1.0, 0.5686274509803921, 0.21176470588235294, 1.0),
    2: vec4.fromValues(1.0, 0.3215686274509804, 0.9058823529411765, 1.0),
    3: vec4.fromValues(0.6196078431372549, 0.35294117647058826, 1.0, 1.0),
    4: vec4.fromValues(0.8431372549019608, 0.27058823529411763, 0.27058823529411763, 1.0),
    5: vec4.fromValues(1.0, 0.9450980392156862, 0.0, 1.0),
    6: vec4.fromValues(0.6509803921568628, 1.0, 0.9019607843137255, 1.0),
    7: vec4.fromValues(0.5725490196078431, 0.5803921568627451, 0.592156862745098, 1.0)
  },
  /**
   * Glow colors for the various artifact<color>Glow decorations for shard portals and
   * target portals, by series.
   * @type {Object}
   */
  artifactGlowColors: {
    Helios: {
      Red: vec4.fromValues(0.92, 0.51, 0.14, 1.0),
      Purple: vec4.fromValues(1.0, 0.87, 0.55, 1.0),
      Target: vec4.fromValues(1.0, 0.72, 0.0, 1.0)
    },
    Amar: {
      Target: vec4.fromValues(0.62, 0.22, 0.62, 1.0),
      Red: vec4.fromValues(0.79, 0.11, 0.49, 1.0),
      Purple: vec4.fromValues(0.58, 0.17, 1.0, 1.0)
    },
    Jarvis: {
      Target: vec4.fromValues(0.62, 0.22, 0.62, 1.0),
      Red: vec4.fromValues(0.79, 0.11, 0.49, 1.0),
      Purple: vec4.fromValues(0.58, 0.17, 1.0, 1.0)
    },
    Shonin: {
      Red: vec4.fromValues(0.78, 0.84, 1.0, 1.0),
      Purple: vec4.fromValues(0.25, 0.81, 1.0, 1.0),
      Target: vec4.fromValues(0.70, 0.70, 0.70, 1.0)
    },
    Lightman: {
      Red: vec4.fromValues(1.0, 0.44, 0.45, 1.0),
      Purple: vec4.fromValues(1.0, 0.24, 0.25, 1.0),
      Target: vec4.fromValues(0.74, 0.0, 0.02, 1.0)
    },
    Abaddon1: {
      Red: vec4.fromValues(1.0, 0.7, 0.86, 1.0),
      Purple: vec4.fromValues(0.82, 0.7, 1.0, 1.0),
      Target: vec4.fromValues(0.0, 0.95, 0.4, 1.0)
    },
    Abaddon2: {
      Red: vec4.fromValues(0.7, 1.0, 0.87, 1.0),
      Purple: vec4.fromValues(0.86, 0.7, 1.0, 1.0),
      Target: vec4.fromValues(0.0, 0.59, 1.0, 1.0)
    },
    Shard2017: {
      Red: vec4.fromValues(0.7, 1.0, 0.87, 1.0),
      Purple: vec4.fromValues(0.86, 0.7, 1.0, 1.0),
      Target: vec4.fromValues(0.0, 0.59, 1.0, 1.0)
    }
  },
  /**
   * Constants for key locker colors. Each capsule has two colors: the 0 index
   * color is for the highlight markings on the key locker; the 1 index color is
   * the base color of the key locker. These correspond to u_color0 and
   * u_color1.
   * @type {Object}
   */
  keyCapsuleColors: {
    blue: [
      vec4.fromValues(0.3686274509803921, 0.6784313725490196, 1.0, 1.0),
      vec4.fromValues(0.3568627450980392, 0.4705882352941176, 0.6470588235294117, 1.0)
    ],
    green: [
      vec4.fromValues(0.2117647058823529, 1.0, 0.4705882352941176, 1.0),
      vec4.fromValues(0.2980392156862745, 0.5607843137254901, 0.4117647058823529, 1.0)
    ],
    red: [
      vec4.fromValues(1.0, 0.0431372549019607, 0.3764705882352941, 1.0),
      vec4.fromValues(0.6784313725490196, 0.2078431372549019, 0.3607843137254901, 1.0)
    ],
    white: [
      vec4.fromValues(1.0, 1.0, 1.0, 1.0),
      vec4.fromValues(0.5921568627450980, 0.5882352941176470, 0.5843137254901960, 1.0)
    ],
    yellow: [
      vec4.fromValues(0.9019607843137254, 0.9411764705882352, 0.1647058823529411, 1.0),
      vec4.fromValues(0.6862745098039215, 0.6509803921568627, 0.3607843137254901, 1.0)
    ]
  },
  /**
   * Constants for xm glow colors (for item xm cores)
   * @type {Object}
   */
  xmColors: {
    coreGlow: vec4.fromValues(0.92, 0.7, 0.89, 1.0),
    coreGlowAlt: vec4.fromValues(0.6, 0.4, 0.6, 0.8),
    coreGlowAda: vec4.fromValues(0, 0.7607843137254902, 1.0, 1.0),
    coreGlowJarvis: vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0),
    coreGlowChaotic: vec4.fromValues(1.0, 0.35, 0.0, 1.0),
    coreGlowChaoticAlt: vec4.fromValues(0.66, 0.1, 0.09, 1.0)
  },
  /**
   * Mesh internal name constants.
   * @type {Object}
   */
  Mesh: {
    Inventory: {
      Xmp: 'XmpMesh',
      XmpXm: 'XmpXMMesh',
      Ultrastrike: 'UltrastrikeMesh',
      UltrastrikeXm: 'UltrastrikeXMMesh',
      ResShield: 'ResShieldMesh',
      ResShieldXm: 'ResShieldXMMesh',
      PowerCube: 'PowerCubeMesh',
      PowerCubeXm: 'PowerCubeXmMesh',
      LinkAmp: 'LinkAmpMesh',
      LinkAmpXm: 'LinkAmpXmMesh',
      UltraLinkAmp: 'UltraLinkAmpMesh',
      UltraLinkAmpXm: 'UltraLinkAmpXmMesh',
      HeatSink: 'HeatSinkMesh',
      HeatSinkXm: 'HeatSinkXmMesh',
      MultiHack: 'MultiHackMesh',
      MultiHackXm: 'MultiHackXmMesh',
      ForceAmp: 'ForceAmpMesh',
      ForceAmpXm: 'ForceAmpXmMesh',
      Turret: 'TurretMesh',
      TurretXm: 'TurretXmMesh',
      FlipCardAda: 'FlipCardMeshAda',
      FlipCardJarvis: 'FlipCardMeshJarvis',
      FlipCardXm: 'FlipCardXmMesh',
      Resonator: 'ResonatorMesh',
      ResonatorXm: 'ResonatorXMMesh',
      Capsule: 'CapsuleMesh',
      InterestCapsule: 'InterestCapsuleMesh',
      KeyCapsule: 'KeyCapsuleMesh',
      KeyCapsuleXm: 'KeyCapsuleXmMesh',
      CapsuleXm: 'CapsuleXmMesh',
      Fracker: 'FrackerMesh',
      FrackerXm: 'FrackerXmMesh',
      TransmuterAttack: 'TransmuterAttackMesh',
      TransmuterAttackXm: 'TransmuterAttackXmMesh',
      TransmuterDefense: 'TransmuterDefenseMesh',
      TransmuterDefenseXm: 'TransmuterDefenseXmMesh',
      Mysterious: 'MysteriousMesh',
      MysteriousXm: 'MysteriousXmMesh',
      Niantic: 'NianticMesh',
      ExtraShield: 'ExtraShieldMesh',
      BoostedPowerCube: 'BoostedPowerCubeMesh',
      BoostedPowerCubeXm: 'BoostedPowerCubeXmMesh',
      BoostedPowerCubeK: 'BoostedPowerCubeKMesh',
      BoostedPowerCubeKXm: 'BoostedPowerCubeKXmMesh',
      MediaCube: 'MediaCubeMesh',
      MediaPlaneMesh: 'MediaPlaneMesh',
      PortalKeyResourceUnit: 'PortalKeyResourceUnit'
    },
    Resource: {
      Xmp: 'XmpResourceUnitMesh',
      PortalKeyResourceUnit: 'PortalKeyResourceUnit',
      Ultrastrike: 'UltrastrikeResourceUnitMesh',
      PowerCube: 'PowerCubeResourceUnitMesh',
      LinkAmp: 'LinkAmpResourceUnitMesh',
      UltraLinkAmp: 'UltraLinkAmpResourceUnitMesh',
      HeatSink: 'HeatSinkResourceUnitMesh',
      MultiHack: 'MultiHackResourceUnitMesh',
      ForceAmp: 'ForceAmpResourceUnitMesh',
      Turret: 'TurretResourceUnitMesh',
      FlipCardAda: 'FlipCardResourceUnitMeshAda',
      FlipCardJarvis: 'FlipCardResourceUnitMeshJarvis',
      Resonator: 'ResonatorResourceUnitMesh',
      PortalShield: 'PortalShieldResourceUnitMesh',
      Capsule: 'CapsuleResourceUnitMesh',
      InterestCapsule: 'InterestCapsuleResourceUnitMesh',
      Fracker: 'FrackerResourceUnitMesh',
      TransmuterAttack: 'TransmuterAttackResourceUnitMesh',
      TransmuterDefense: 'TransmuterDefenseResourceUnitMesh',
      Mysterious: 'MysteriousResourceUnitMesh',
      ExtraShield: 'ExtraShieldResourceUnitMesh',
      KeyCapsule: 'KeyCapsuleResourceUnitMesh',
      BoostedPowerCube: 'BoostedPowerCubeResourceUnitMesh',
      BoostedPowerCubeK: 'BoostedPowerCubeKResourceUnitMesh'
    },
    Player: {
      Player: 'PlayerMesh',
      PlayerEdge: 'PlayerMeshEdge',
      PlayerReflection: 'PlayerMeshReflection',
      PlayerGlow: 'PlayerMeshGlow',
      BreadCrumb: 'BreadCrumbMesh',
      Compass: 'CompassMesh'
    },
    Ornament: {
      MeetupPoint: 'OrnamentMeetupPointMesh',
      FinishPoint: 'OrnamentFinishPointMesh',
      Cluster: 'OrnamentClusterMesh',
      Volatile: 'OrnamentVolatileMesh'
    },
    World: {
      Shield: 'PortalShieldMesh',
      Portal: 'TexturedPortalMesh',
      Waypoint: 'TexturedScannerFTMesh',
      Resonator: 'ResonatorUnitLowResMesh',
      XmpRing: 'XmpRingMesh',
      UltraStrikeRing: 'UltraStrikeRingMesh',
      UltraStrikeColumn: 'UltraStrikeColumnMesh',
      ArtifactsRedGlow: 'ArtifactsRedGlow',
      ArtifactsGreenGlow: 'ArtifactsGreenGlow',
      ArtifactsPurpleGlow: 'ArtifactsPurpleGlow',
      ArtifactsTargetGlow: 'ArtifactsTargetGlow',
      SingleResonator: 'SingleResonatorMesh',
      OrnamentMeetupPoint: 'OrnamentMeetupPointMesh',
      OrnamentFinishPoint: 'OrnamentFinishPointMesh',
      OrnamentCluster: 'OrnamentClusterMesh',
      OrnamentVolatile: 'OrnamentVolatileMesh',
    }
  },
  /**
   * Program internal name constants.
   * @type {Object}
   */
  Program: {
    Bicolored: 'bicolor_textured',
    Textured: 'textured',
    RegionTextured: 'region_textured',
    Glowramp: 'portal_scanner',
    Xm: 'xm',
    ShieldEffect: 'shield',
    Atmosphere: 'atmosphere',
    Link: 'LinkShader',
    SphericalLink: 'link3d',
    ParticlePortal: 'particle_portals'
  },
  /**
   * Texture internal name constants.
   * @type {Object}
   */
  Texture: {
    FlipCard: 'FlipCardTexture',
    Xm: 'ObjectXMTexture',
    Glowramp: 'GlowrampTexture',
    Media: 'MediaCubeTexture',
    Waypoint: 'FtWaypointTexture',
    ShieldEffect: 'PortalShieldTexture',
    ColorGlow: 'ColorGlowTexture',
    TargetGlow: 'TargetGlowTexture',
    PortalLink: 'PortalLinkTexture',
    ResonatorLink: 'ResonatorLinkTexture',
    OrnamentMeetupPoint: 'OrnamentMeetupPointTexture',
    OrnamentFinishPoint: 'OrnamentFinishPointTexture',
    OrnamentCluster: 'OrnamentClusterTexture',
    OrnamentVolatile: 'OrnamentVolatileTexture',
    Particle: 'ParticleTexture'
  }
};

export default Constants;
