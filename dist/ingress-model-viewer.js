(function(root, undefined) {

  "use strict";

  var imv = {};


if(!JavaDeserializer || !glMatrix || !libtga)
{
  throw 'Missing dependencies';
}

var console = window.console || {
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

var constants = {
  teamColors: {
    RESISTANCE: vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    ENLIGHTENED: vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0),
    NEUTRAL: vec4.fromValues(0.9764705882352941, 0.9764705882352941, 0.9764705882352941, 1.0),
    LOKI: vec4.fromValues(1, 0.1568627450980392, 0.1568627450980392, 1.0)
  },
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
  anomalyColors: {
    1: vec4.fromValues(1.0, 0.5686274509803921, 0.21176470588235294, 1.0),
    2: vec4.fromValues(1.0, 0.3215686274509804, 0.9058823529411765, 1.0),
    3: vec4.fromValues(0.6196078431372549, 0.35294117647058826, 1.0, 1.0),
    4: vec4.fromValues(0.8431372549019608, 0.27058823529411763, 0.27058823529411763, 1.0),
    5: vec4.fromValues(1.0, 0.9450980392156862, 0.0, 1.0),
    6: vec4.fromValues(0.6509803921568628, 1.0, 0.9019607843137255, 1.0),
    7: vec4.fromValues(0.5725490196078431, 0.5803921568627451, 0.592156862745098, 1.0)
  },
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
    }
  },
  xmColors: {
    coreGlow: vec4.fromValues(0.92, 0.7, 0.89, 1.0),
    coreGlowAlt: vec4.fromValues(0.6, 0.4, 0.6, 0.8),
    coreGlowAda: vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    coreGlowJarvis: vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0)
  },
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
      CapsuleXm: 'CapsuleXmMesh',
      ExtraShield: 'ExtraShieldMesh',
      MediaCube: 'MediaCubeMesh',
      MediaPlaneMesh: 'MediaPlaneMesh'
    },
    Resource: {
      Xmp: 'XmpResourceUnitMesh',
      PortalKeyResourceUnit: 'PortalKeyResourceUnit',
      Ultrastrike: 'UltrastrikeResourceUnitMesh',
      PowerCube: 'PowerCubeResourceUnitMesh',
      LinkAmp: 'LinkAmpResourceUnitMesh',
      HeatSink: 'HeatSinkResourceUnitMesh',
      MultiHack: 'MultiHackResourceUnitMesh',
      ForceAmp: 'ForceAmpResourceUnitMesh',
      Turret: 'TurretResourceUnitMesh',
      FlipCardAda: 'FlipCardResourceUnitMeshAda',
      FlipCardJarvis: 'FlipCardResourceUnitMeshJarvis',
      Resonator: 'ResonatorResourceUnitMesh',
      PortalShield: 'PortalShieldResourceUnitMesh',
      Capsule: 'CapsuleResourceUnitMesh',
      ExtraShield: 'ExtraShieldResourceUnitMesh',
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
    Artifact: {
      Helios: {
        Helios1: 'Helios1',
        HeliosFrozen1: 'HeliosFrozen1',
        Helios2: 'Helios2',
        HeliosFrozen2: 'HeliosFrozen2',
        Helios3: 'Helios3',
        HeliosFrozen3: 'HeliosFrozen3',
        Helios4: 'Helios4',
        HeliosFrozen4: 'HeliosFrozen4',
        Helios5: 'Helios5',
        HeliosFrozen5: 'HeliosFrozen5',
        Helios6: 'Helios6',
        HeliosFrozen6: 'HeliosFrozen6',
        Helios7: 'Helios7',
        HeliosFrozen7: 'HeliosFrozen7',
        Helios8: 'Helios8',
        HeliosFrozen8: 'HeliosFrozen8',
        Helios9: 'Helios9',
        HeliosFrozen9: 'HeliosFrozen9',
        Helios10: 'Helios10',
        HeliosFrozen10: 'HeliosFrozen10',
        Helios11: 'Helios11',
        HeliosFrozen11: 'HeliosFrozen11',
        Helios12: 'Helios12',
        HeliosFrozen12: 'HeliosFrozen12',
        Helios13: 'Helios13',
        HeliosFrozen13: 'HeliosFrozen13',
        Helios14: 'Helios14',
        HeliosFrozen14: 'HeliosFrozen14',
        Helios15: 'Helios15',
        HeliosFrozen15: 'HeliosFrozen15',
        Helios16: 'Helios16',
        HeliosFrozen16: 'HeliosFrozen16',
        Helios17: 'Helios17',
        HeliosFrozen17: 'HeliosFrozen17',
        Helios18: 'Helios18',
        HeliosFrozen18: 'HeliosFrozen18',
        Helios19: 'Helios19',
        HeliosFrozen19: 'HeliosFrozen19',
        Helios20: 'Helios20',
        HeliosFrozen20: 'HeliosFrozen20',
        Helios21: 'Helios21',
        HeliosFrozen21: 'HeliosFrozen21',
        Helios22: 'Helios22',
        HeliosFrozen22: 'HeliosFrozen22',
        Helios23: 'Helios23',
        HeliosFrozen23: 'HeliosFrozen23',
        Helios24: 'Helios24',
        HeliosFrozen24: 'HeliosFrozen24',
        Helios25: 'Helios25',
        HeliosFrozen25: 'HeliosFrozen25',
        Helios26: 'Helios26',
        HeliosFrozen26: 'HeliosFrozen26',
        Helios27: 'Helios27',
        HeliosFrozen27: 'HeliosFrozen27',
        Helios28: 'Helios28',
        HeliosFrozen28: 'HeliosFrozen28',
        Helios29: 'Helios29',
        HeliosFrozen29: 'HeliosFrozen29',
        Helios30: 'Helios30',
        HeliosFrozen30: 'HeliosFrozen30',
        Helios31: 'Helios31',
        HeliosFrozen31: 'HeliosFrozen31',
        Helios32: 'Helios32',
        HeliosFrozen32: 'HeliosFrozen32',
        Helios33: 'Helios33',
        HeliosFrozen33: 'HeliosFrozen33',
        Helios34: 'Helios34',
        HeliosFrozen34: 'HeliosFrozen34',
        Helios35: 'Helios35',
        HeliosFrozen35: 'HeliosFrozen35',
        Helios36: 'Helios36',
        HeliosFrozen36: 'HeliosFrozen36',
        Helios37: 'Helios37',
        HeliosFrozen37: 'HeliosFrozen37',
        Helios38: 'Helios38',
        HeliosFrozen38: 'HeliosFrozen38',
        Helios39: 'Helios39',
        HeliosFrozen39: 'HeliosFrozen39',
        Helios40: 'Helios40',
        HeliosFrozen40: 'HeliosFrozen40'
      },
      Amar: {
        Amar1: 'Amar1',
        AmarFrozen1: 'AmarFrozen1',
        Amar2: 'Amar2',
        AmarFrozen2: 'AmarFrozen2',
        Amar3: 'Amar3',
        AmarFrozen3: 'AmarFrozen3',
        Amar4: 'Amar4',
        AmarFrozen4: 'AmarFrozen4',
        Amar5: 'Amar5',
        AmarFrozen5: 'AmarFrozen5',
        Amar6: 'Amar6',
        AmarFrozen6: 'AmarFrozen6',
        Amar7: 'Amar7',
        AmarFrozen7: 'AmarFrozen7',
        Amar8: 'Amar8',
        AmarFrozen8: 'AmarFrozen8',
        Amar9: 'Amar9',
        AmarFrozen9: 'AmarFrozen9',
        Amar10: 'Amar10',
        AmarFrozen10: 'AmarFrozen10',
        Amar11: 'Amar11',
        AmarFrozen11: 'AmarFrozen11',
        Amar12: 'Amar12',
        AmarFrozen12: 'AmarFrozen12',
        Amar13: 'Amar13',
        AmarFrozen13: 'AmarFrozen13',
        Amar14: 'Amar14',
        AmarFrozen14: 'AmarFrozen14',
        Amar15: 'Amar15',
        AmarFrozen15: 'AmarFrozen15',
        Amar16: 'Amar16',
        AmarFrozen16: 'AmarFrozen16',
        Amar17: 'Amar17',
        AmarFrozen17: 'AmarFrozen17'
      },
      Jarvis: {
        Jarvis1: 'Jarvis1',
        Jarvis2: 'Jarvis2',
        Jarvis3: 'Jarvis3',
        Jarvis4: 'Jarvis4',
        Jarvis5: 'Jarvis5',
        Jarvis6: 'Jarvis6',
        Jarvis7: 'Jarvis7',
        Jarvis8: 'Jarvis8',
        Jarvis9: 'Jarvis9',
        Jarvis10: 'Jarvis10',
        Jarvis11: 'Jarvis11',
        Jarvis12: 'Jarvis12',
        Jarvis13: 'Jarvis13'
      },
      Shonin: {
        Shonin1: "Shonin1",
        ShoninFrozen1: "ShoninFrozen1",
        Shonin2: "Shonin2",
        ShoninFrozen2: "ShoninFrozen2",
        Shonin3: "Shonin3",
        ShoninFrozen3: "ShoninFrozen3",
        Shonin4: "Shonin4",
        ShoninFrozen4: "ShoninFrozen4",
        Shonin5: "Shonin5",
        ShoninFrozen5: "ShoninFrozen5",
        Shonin6: "Shonin6",
        ShoninFrozen6: "ShoninFrozen6",
        Shonin7: "Shonin7",
        ShoninFrozen7: "ShoninFrozen7",
        Shonin8: "Shonin8",
        ShoninFrozen8: "ShoninFrozen8",
        Shonin9: "Shonin9",
        ShoninFrozen9: "ShoninFrozen9",
        Shonin10: "Shonin10",
        ShoninFrozen10: "ShoninFrozen10",
        Shonin11: "Shonin11",
        ShoninFrozen11: "ShoninFrozen11",
        Shonin12: "Shonin12",
        ShoninFrozen12: "ShoninFrozen12",
        Shonin13: "Shonin13",
        ShoninFrozen13: "ShoninFrozen13",
        Shonin14: "Shonin14",
        ShoninFrozen14: "ShoninFrozen14",
        Shonin15: "Shonin15",
        ShoninFrozen15: "ShoninFrozen15",
        Shonin16: "Shonin16",
        ShoninFrozen16: "ShoninFrozen16",
        Shonin17: "Shonin17",
        ShoninFrozen17: "ShoninFrozen17",
        Shonin18: "Shonin18",
        ShoninFrozen18: "ShoninFrozen18",
        Shonin19: "Shonin19",
        ShoninFrozen19: "ShoninFrozen19",
        Shonin20: "Shonin20",
        ShoninFrozen20: "ShoninFrozen20",
        Shonin21: "Shonin21",
        ShoninFrozen21: "ShoninFrozen21",
        Shonin22: "Shonin22",
        ShoninFrozen22: "ShoninFrozen22",
        Shonin23: "Shonin23",
        ShoninFrozen23: "ShoninFrozen23",
        Shonin24: "Shonin24",
        ShoninFrozen24: "ShoninFrozen24",
        Shonin25: "Shonin25",
        ShoninFrozen25: "ShoninFrozen25",
        Shonin26: "Shonin26",
        ShoninFrozen26: "ShoninFrozen26",
        Shonin27: "Shonin27",
        ShoninFrozen27: "ShoninFrozen27",
        Shonin28: "Shonin28",
        ShoninFrozen28: "ShoninFrozen28",
        Shonin29: "Shonin29",
        ShoninFrozen29: "ShoninFrozen29",
        Shonin30: "Shonin30",
        ShoninFrozen30: "ShoninFrozen30",
        Shonin31: "Shonin31",
        ShoninFrozen31: "ShoninFrozen31"
      },
      Lightman: {
        Lightman1: "Lightman1",
        LightmanFrozen1: "LightmanFrozen1",
        Lightman2: "Lightman2",
        LightmanFrozen2: "LightmanFrozen2",
        Lightman3: "Lightman3",
        LightmanFrozen3: "LightmanFrozen3",
        Lightman4: "Lightman4",
        LightmanFrozen4: "LightmanFrozen4",
        Lightman5: "Lightman5",
        LightmanFrozen5: "LightmanFrozen5",
        Lightman6: "Lightman6",
        LightmanFrozen6: "LightmanFrozen6",
        Lightman7: "Lightman7",
        LightmanFrozen7: "LightmanFrozen7",
        Lightman8: "Lightman8",
        LightmanFrozen8: "LightmanFrozen8",
        Lightman9: "Lightman9",
        LightmanFrozen9: "LightmanFrozen9",
        Lightman10: "Lightman10",
        LightmanFrozen10: "LightmanFrozen10",
        Lightman11: "Lightman11",
        LightmanFrozen11: "LightmanFrozen11",
        Lightman12: "Lightman12",
        LightmanFrozen12: "LightmanFrozen12",
        Lightman13: "Lightman13",
        LightmanFrozen13: "LightmanFrozen13",
        Lightman14: "Lightman14",
        LightmanFrozen14: "LightmanFrozen14",
        Lightman15: "Lightman15",
        LightmanFrozen15: "LightmanFrozen15",
        Lightman16: "Lightman16",
        LightmanFrozen16: "LightmanFrozen16",
        Lightman17: "Lightman17",
        LightmanFrozen17: "LightmanFrozen17",
        Lightman18: "Lightman18",
        LightmanFrozen18: "LightmanFrozen18",
        Lightman19: "Lightman19",
        LightmanFrozen19: "LightmanFrozen19",
        Lightman20: "Lightman20",
        LightmanFrozen20: "LightmanFrozen20",
        Lightman21: "Lightman21",
        LightmanFrozen21: "LightmanFrozen21",
        Lightman22: "Lightman22",
        LightmanFrozen22: "LightmanFrozen22",
        Lightman23: "Lightman23",
        LightmanFrozen23: "LightmanFrozen23",
        Lightman24: "Lightman24",
        LightmanFrozen24: "LightmanFrozen24",
        Lightman25: "Lightman25",
        LightmanFrozen25: "LightmanFrozen25",
        Lightman26: "Lightman26",
        LightmanFrozen26: "LightmanFrozen26",
        Lightman27: "Lightman27",
        LightmanFrozen27: "LightmanFrozen27",
        Lightman28: "Lightman28",
        LightmanFrozen28: "LightmanFrozen28",
        Lightman29: "Lightman29",
        LightmanFrozen29: "LightmanFrozen29",
        Lightman30: "Lightman30",
        LightmanFrozen30: "LightmanFrozen30",
        Lightman31: "Lightman31",
        LightmanFrozen31: "LightmanFrozen31",
        Lightman32: "Lightman32",
        LightmanFrozen32: "LightmanFrozen32",
        Lightman33: "Lightman33",
        LightmanFrozen33: "LightmanFrozen33",
        Lightman34: "Lightman34",
        LightmanFrozen34: "LightmanFrozen34",
        Lightman35: "Lightman35",
        LightmanFrozen35: "LightmanFrozen35",
        Lightman36: "Lightman36",
        LightmanFrozen36: "LightmanFrozen36",
        Lightman37: "Lightman37",
        LightmanFrozen37: "LightmanFrozen37",
        Lightman38: "Lightman38",
        LightmanFrozen38: "LightmanFrozen38",
        Lightman39: "Lightman39",
        LightmanFrozen39: "LightmanFrozen39",
        Lightman40: "Lightman40",
        LightmanFrozen40: "LightmanFrozen40",
        Lightman41: "Lightman41",
        LightmanFrozen41: "LightmanFrozen41"
      }
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
      SingleResonator: 'SingleResonatorMesh'
    }
  },
  Program: {
    Bicolored: 'bicolor_textured',
    Textured: 'textured',
    Glowramp: 'portal_scanner',
    Xm: 'xm',
    ShieldEffect: 'shield',
    Atmosphere: 'atmosphere'
  },
  Texture: {
    FlipCard: 'FlipCardTexture',
    Xm: 'ObjectXMTexture',
    Glowramp: 'GlowrampTexture',
    Media: 'MediaCubeTexture',
    Waypoint: 'FtWaypointTexture',
    ShieldEffect: 'PortalShieldTexture',
    ColorGlow: 'ColorGlowTexture',
    TargetGlow: 'TargetGlowTexture',
    ArtifactHelios: 'ArtifactHeliosTexture',
    ArtifactAmar: 'ArtifactAmarTexture',
    ArtifactJarvis: 'ArtifactJarvisTexture',
    ArtifactShonin: 'ArtifactShoninTexture',
    ArtifactLightman: 'ArtifactLightmanTexture'
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

// base state.
var resetGL = function(gl) {
  gl.lineWidth(1.0);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.blendEquation(gl.FUNC_ADD);
  //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.BLEND);
  gl.depthMask(true);
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

imv.Utilities = imv.Utilities || {};
imv.Utilities.inherits = inherits;
imv.Utilities.resetGL = resetGL;
imv.Utilities.setParams = setParams;


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
        var image = new Image();
        image.onload = function() {
          callback(null, this);
        };
        image.onerror = function(e) {
          callback(e, null);
        };
        image.src = canvas.toDataURL();
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

var AssetLoader = function()
{
  var _callbacks = {};
  var _assets = {};

  this.loadAsset = function(url, type, callback)
  {
    var name = '_' + encodeURIComponent(url);
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

  this.loadAssetGroup = function(urls, types, callback)
  {
    if(urls.length !== types.length)
    {
      throw 'Incompatible types: types.length = ' + types.length + '; urls.length = ' + urls.length;
    }
    var len = urls.length, results = new Array(len);
    var onEach = function(idx, err, value) {
      if(err) {
        callback(err, null);
        return;
      }
      results[idx] = value;
      var i, r = true;
      for(i = 0; i < len; i++)
      {
        r = r && results[i];
      }
      if(r)
      {
        callback(null, results);
      }
    };
    for(var i = 0; i < urls.length; i++)
    {
      this.loadAsset(urls[i], types[i], onEach.bind(undefined, i));
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

var GLBound = function(gl)
{
  this._gl = gl;
};

imv.GLBound = GLBound;


var GLBuffer = function(gl, target, usage) {
  GLBound.call(this, gl);
  this.target = target || gl.ARRAY_BUFFER; // probably shouldn't default this.
  this.usage = usage || gl.STATIC_DRAW;
  this.glBuf = null;
  this.values = null;
  return this;
};
inherits(GLBuffer, GLBound);

GLBuffer.prototype.bindBuffer = function() {
  if(!this.values) {
    console.warn('trying to update a buffer with no values.');
    return false;
  }
  if(!this.glBuf) {
    this.glBuf = this._gl.createBuffer();
  }
  this._gl.bindBuffer(this.target, this.glBuf);
  return this;
};

GLBuffer.prototype.unbindBuffer = function() {
  // this._gl.bindBuffer(this.target, 0);  // apparently this makes webgl cranky
  return this;
};

GLBuffer.prototype.update = function() {
  this.bindBuffer();
  // if I do it this way, does it break?
  // if it works, will updating the underlying buffer
  // update the buffer without needing to call gl.bufferData again??
  this._gl.bufferData(this.target, this.values, this.usage);
  return this; // .unbindBuffer(); // apparently this makes webgl angry.
};

GLBuffer.prototype.setValues = function(values, offset) {
  if(!this.values) {
    this.values = values;
  } else {
    this.values.set(values, offset);
  }
  return this;
};

GLBuffer.prototype.updateBuffer = function(values) {
  this.values = values;
  return this.update();
};

imv.GL = imv.GL || {};
imv.GL.Buffer = GLBuffer;


var GLAttribute = (function() {

  var glAttribute = function(gl, attributes, values, usage)
  {
    usage = usage || gl.STATIC_DRAW;
    GLBuffer.call(this, gl, gl.ARRAY_BUFFER, usage);
    this.attributes = attributes;
    this.values = values;
    this.size = this.count = null;
    this.validate = false;
    this.getSize();
    return this;
  };
  inherits(glAttribute, GLBuffer);

  // these are float-based types only, for now.
  glAttribute.prototype.getSize = function()
  {
    this.size = 0;
    var width = 0;
    for(var i = 0, a; i < this.attributes.length; i++)
    {
      a = this.attributes[i];
      this.size += 4 * a.size; // 4 because float is 4 bytes.
      width += a.size;
    }
  };

  glAttribute.prototype.validate = function() {
    if(this.validate) {
      var width = this.attributes.reduce(function(sum, attr){
        return sum + attr.size;
      }, 0);
      if(this.values.length % width !== 0)
      {
        console.warn('values array length is not an even multiple of the total size of the attributes');
      }
    }
  };

  glAttribute.prototype.updateValues = function(values) {
    this.values = values;
    this.validate();
    return this.update();
  };

  glAttribute.prototype.draw = function(locations)
  {
    var gl = this._gl;
    var a, s = 0;
    if(!this.glBuf) {
      this.update();
    } else {
      this.bindBuffer();
    }
    for(var i = 0; i < this.attributes.length; i++)
    {
      a = this.attributes[i];
      if(!(a.name in locations))
      {
        // I don't know if I should suppress this, but if I
        // don't, it generates one warning per frame.
        //console.warn('Program is missing attribute ' + a.name);
        continue;
      }
      gl.enableVertexAttribArray(locations[a.name]);
      gl.vertexAttribPointer(locations[a.name], a.size, gl.FLOAT, false, this.size, s);
      s += 4 * a.size;
    }
    return this; //.unbindBuffer();  // maybe?
  };

  return glAttribute;
}());

imv.GL = imv.GL || {};
imv.GL.Attribute = GLAttribute;


var GLIndex = (function() {

  var glIndex = function(gl, values, drawMode, usage)
  {
    usage = usage || gl.STATIC_DRAW;
    GLBuffer.call(this, gl, gl.ELEMENT_ARRAY_BUFFER, usage);
    this.mode = drawMode;
    this.values = values;
    this.count = null;
    return this;
  };
  inherits(glIndex, GLBuffer);

  glIndex.prototype.draw = function()
  {
    var gl = this._gl;
    if(!this.glBuf) {
      this.update();
    } else {
      this.bindBuffer();
    }
    gl.drawElements(this.mode, this.values.length, gl.UNSIGNED_SHORT, 0);
    return this;
  };

  return glIndex;
}());

imv.GL = imv.GL || {};
imv.GL.Index = GLIndex;


var Texture = function(gl, info, image)
{
  GLBound.call(this, gl);
  this.info = info;
  var map = {
    'MipMapLinearLinear': gl.LINEAR_MIPMAP_LINEAR,
    'Linear': gl.LINEAR,
    'MipMapLinearNearest': gl.LINEAR_MIPMAP_NEAREST,
    'MipMapNearestLinear': gl.NEAREST_MIPMAP_LINEAR,
    'Repeat': gl.REPEAT,
    'ClampToEdge': gl.CLAMP_TO_EDGE
  };
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, map[info.minFilter]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, map[info.magFilter]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, map[info.wrapS]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, map[info.wrapT]);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  if(/MipMap/.test(info.minFilter))
  {
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  gl.bindTexture(gl.TEXTURE_2D, null);

  this.texture = texture;
};

Texture.prototype.use = function(index)
{
  var gl = this._gl;
  index = index || 0;
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.activeTexture(gl.TEXTURE0 + index);
};

imv.Texture = Texture;


var VertexAttribute = function(name, size)
{
  this.name = name;
  this.size = size;
};

imv.VertexAttribute = VertexAttribute;

var Mesh = (function() {
  var MODE_TRIANGLES = 'triangles',
      MODE_LINES = 'lines';

  var Mesh = function(gl, attributes, faces, lines) {
    GLBound.call(this, gl);
    this.attributes = attributes;
    this.faces = faces;
    this.lines = lines;
    this.mode = MODE_TRIANGLES;
  };
  inherits(Mesh, GLBound);

  Mesh.MODE_LINES = MODE_LINES;
  Mesh.MODE_TRIANGLES = MODE_TRIANGLES;

  Mesh.prototype.draw = function(locations) {
    this.attributes.draw(locations);
    if(this.mode === MODE_TRIANGLES) {
      this.faces.draw();
    } else if (this.mode === MODE_LINES) {
      this.lines.draw();
    }
  };

  return Mesh;
}());

imv.Mesh = Mesh;


var FileMesh = (function(){

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
      attributes.push(new VertexAttribute(name, size));
    }
    return attributes;
  };

  var fileMesh = function(gl, arraybuf)
  {
    var jd = new JavaDeserializer(arraybuf);
    var stream = jd.getStream();
    var blocks = stream.getContents();

    // should be Float32Array
    var values = blocks[0].contents.toArray();

    // should be ArrayBuffer
    var attributeData = blocks[3].contents.toArray();

    // array of VertexAttributes
    var spec = parseAttributes(attributeData);

    // should be Uint16Array
    var faces = new GLIndex(gl, blocks[1].contents.toArray(), gl.TRIANGLES);
    var attributes = new GLAttribute(gl, spec, values);

    // should be Uint16Array
    var lines = new GLIndex(gl, blocks[2].contents.toArray(), gl.LINES);

    Mesh.call(this, gl, attributes, faces, lines);
  };
  inherits(fileMesh, Mesh);

  return fileMesh;
}());

imv.Meshes = imv.Meshes || {};
imv.Meshes.File = FileMesh;


var SphereMesh = (function(){

  // part of doing away with the THREE.js dependency
  // means giving up a lot of helper code for doing things
  // like this.
  //
  // Needless to say, this borrows heavily from THREE.SphereGeometry
  // https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js
  var createSphere = function(radius, phiSlices, thetaSlices) {
    var i, j, u, v, vec, v1, v2, v3, v4,
        verticesRow, faces,
        phi = Math.PI * 2,
        theta = Math.PI,
        // size is 8 for vec3 a_position + vec2 a_texCoord + vec3 a_normal
        values = new Float32Array((phiSlices + 1) * (thetaSlices + 1) * 8),
        faceArray = [],
        vertices = [],
        aIdx = 0,
        attributes = [];
    phiSlices = Math.max(3, phiSlices || 8);
    thetaSlices = Math.max(2, thetaSlices || 6);

    for(i = 0; i <= phiSlices; i++) {
      verticesRow = [];
      for(j = 0; j <= thetaSlices; j++)
      {
        u = j / phiSlices;
        v = i / thetaSlices;
        vec = vec3.fromValues(
          -radius * Math.cos(u * phi) * Math.sin(v * theta),
          radius * Math.cos(v * theta),
          radius * Math.sin(u * phi) * Math.sin(v * theta)
        );

        values[aIdx * 8 + 0] = vec[0];
        values[aIdx * 8 + 1] = vec[1];
        values[aIdx * 8 + 2] = vec[2];
        values[aIdx * 8 + 3] = u;
        values[aIdx * 8 + 4] = v;
        // normalized:
        vec3.normalize(vec, vec);
        values[aIdx * 8 + 5] = vec[0];
        values[aIdx * 8 + 6] = vec[1];
        values[aIdx * 8 + 7] = vec[2];

        verticesRow.push(aIdx++);
      }
      vertices.push(verticesRow);
    }

    for(i = 0; i < phiSlices; i++) {
      for(j = 0; j < thetaSlices; j++) {
        v1 = vertices[i][j + 1];
        v2 = vertices[i][j];
        v3 = vertices[i + 1][j];
        v4 = vertices[i + 1][j + 1];

        if(Math.abs(values[v1 * 8 + 1]) === radius) {
          faceArray.push.apply(faceArray, [v1, v3, v4]);
          values[v1 * 8 + 3] = (values[v1 * 8 + 3] + values[v2 * 8 + 3]) / 2;
        }
        else if(Math.abs(values[v3 * 8 + 1]) === radius) {
          faceArray.push.apply(faceArray, [v1, v2, v3]);
          values[v3 * 8 + 3] = (values[v3 * 8 + 3] + values[v4 * 8 + 3]) / 2;
        }
        else {
          faceArray.push.apply(faceArray, [v1, v2, v4]);
          faceArray.push.apply(faceArray, [v2, v3, v4]);
        }
      }
    }

    faces = new Uint16Array(faceArray.length);
    faceArray.forEach(function(v, i) {
      faces[i] = v;
    });
    attributes.push(new VertexAttribute('a_position', 3));
    attributes.push(new VertexAttribute('a_texCoord0', 2));
    attributes.push(new VertexAttribute('a_normal', 3));
    return {
      values: values,
      faces: faces,
      attributes: attributes
    };
  };

  var sphereMesh = function(gl, radius, vSlices, hSlices) {
    var parsed = createSphere(radius, vSlices, hSlices);
    var attributes = new GLAttribute(gl, parsed.attributes, parsed.values);
    var faces = new GLIndex(gl, parsed.faces, gl.TRIANGLES);
    Mesh.call(this, gl, attributes, faces);
  };
  inherits(sphereMesh, Mesh);

  return sphereMesh;
}());

imv.Meshes = imv.Meshes || {};
imv.Meshes.Sphere = SphereMesh;


var PortalLinkMesh = (function(){

  // TODO: Parameterize this concept a little better
  // this has potential to be a really flexible and powerful way of
  // making, essentially, extruded geometry.

  // 9 sets of 6 points, breaking the link into 8 pieces, each providing 6 faces, something like that?
  var _len = 9, _size = _len * 6, _chunkSize = 12;
  var c = new Array(_len),
    d = new Array(_len),
    e = new Array(_len);

  var MAX_LINKS = 100; // seems reasonable.

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

  var baseColor = vec4.fromValues(0.46, 0.18, 0.18, 1.0);

  var baseOffset = vec4.create();

  var fillChunk = function(buf, index, x, y, z, u, v, normal, f6, color)
  {
    var off = index * _chunkSize;
    buf[off + 0] = x;
    buf[off + 1] = y;
    buf[off + 2] = z;
    buf[off + 3] = f6;
    buf[off + 4] = u;
    buf[off + 5] = v;
    buf[off + 6] = normal[0];
    buf[off + 7] = normal[2];
    buf[off + 8] = color[0];
    buf[off + 9] = color[1];
    buf[off + 10] = color[2];
    buf[off + 11] = color[3];
  };

  var _generateLinkAttributes = function(start, end, color, startPercent, endPercent) {
    startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
    endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
    var values = new Float32Array(_size * _chunkSize);
    var length = Math.sqrt((end[0] - start[0]) * (end[0] - start[0]) + (end[1] - start[1]) * (end[1] - start[1]));
    var yMin = baseOffset[1],
      yMax = yMin + Math.min(30.0, 0.08 * length),
      avgPercent = (startPercent + endPercent) / 2.0,
      f6 = 0.01 * length,
      f7 = 0.1 + avgPercent * 0.3;
    var vec = vec3.fromValues(end[0], 0, end[1]);
    vec3.subtract(vec, vec, vec3.fromValues(start[0], 0, start[1]));
    var up = vec3.fromValues(0, 1, 0);
    var right = vec3.cross(vec3.create(), vec, up);
    vec3.normalize(right, right);
    var step = _len * 2;
    for(var i = 0; i < _len; i++)
    {
      var f8 = c[i],
        f9 = startPercent + f8 * (endPercent - startPercent),
        f10 = 0.6 + 0.35 * f9,
        f12 = f8 * f6,
        f13 = start[0] + f8 * vec[0],
        f14 = start[1] + f8 * vec[2],
        f15 = yMin + d[i] * (yMax - yMin),
        f16 = e[i];
      var cl = vec4.lerp(vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
      cl[3] = f10;
      fillChunk(values, (i * 2), f13 + f16 * right[0], f15, f14 + f16 * right[2], 0, f12, up, f7, cl);
      fillChunk(values, (i * 2) + 1, f13 - f16 * right[0], f15, f14 - f16 * right[2], 0.5, f12, up, f7, cl);
      fillChunk(values, step + (i * 2), f13, f15 + f16, f14, 0, f12, right, f7, cl);
      fillChunk(values, step + (i * 2) + 1, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(values, 2 * step + (i * 2), f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
      fillChunk(values, 2 * step + (i * 2) + 1, f13, 0, f14, 1.0, f12, right, f7, cl);
    }
    return values;
  };

  var _generateFaces = function(vertexOffset) {
    var ind = new Uint16Array(144),
        iOff = 0;
    for(var i = 0; i < 3; i++) {

      for(var j = 0; j < _len - 1; j++) {

        ind[iOff + 0] = vertexOffset + 1;
        ind[iOff + 1] = vertexOffset + 0;
        ind[iOff + 2] = vertexOffset + 2;
        ind[iOff + 3] = vertexOffset + 1;
        ind[iOff + 4] = vertexOffset + 2;
        ind[iOff + 5] = vertexOffset + 3;
        vertexOffset += 2;
        iOff += 6;
      }
      vertexOffset += 2;
    }

    return ind;
  };

  var linkmesh = function(gl) {
    // make room for some max number links... though technically, since we
    // have to rebind these every time we update them anyway, we could just
    // grow this to whatever arbitrary limit, on the fly.
    var buf = new Float32Array(_size * _chunkSize * MAX_LINKS);
    var attributes = [];
    attributes.push(new VertexAttribute('a_position', 4));
    attributes.push(new VertexAttribute('a_texCoord0', 4));
    attributes.push(new VertexAttribute('a_color', 4));
    var attribute = new GLAttribute(gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new GLIndex(gl, new Uint16Array(144 * MAX_LINKS), gl.TRIANGLES);
    Mesh.call(this, gl, attribute, faces);
    this.nLinks = 0;
  };
  inherits(linkmesh, Mesh);

  linkmesh.prototype.addLink = function(start, end, color, startPercent, endPercent) {

    var linkAttributes = _generateLinkAttributes(start, end, color, startPercent, endPercent);
    var vertexOffset = this.nLinks * _size;
    var ind = _generateFaces(vertexOffset);
    this.attributes.setValues(linkAttributes, vertexOffset * _chunkSize);
    this.faces.setValues(ind, this.nLinks * 144);
    this.nFaces += 144;
    return this.nLinks++;
  };

  return linkmesh;
}());

imv.Meshes = imv.Meshes || {};
imv.Meshes.PortalLink = PortalLinkMesh;


var SphericalPortalLinkMesh = (function(){

  var _chunkSize = 13;
  var MAX_LINKS = 50; // seems reasonable.
  var EST_CHUNKS = 25; // half a hemisphere

  var clampedSin = function(f)
  {
    return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
  };

  var getBearing = function(start, end) {
    var s = start[0],
        e = end[0],
        dl = (end[1] - start[1]);
    var y = Math.sin(dl) * Math.cos(e),
        x = Math.cos(s) * Math.sin(e) - Math.sin(s) * Math.cos(e) * Math.cos(dl);

    return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
  };

  var dest = function(p, bearing, angle) {
    var lat = Math.asin(Math.sin(p[0]) * Math.cos(angle) + Math.cos(p[0]) * Math.sin(angle) * Math.cos(bearing)),
        lon = p[1] + Math.atan2(Math.sin(bearing) * Math.sin(angle) * Math.cos(p[0]), Math.cos(angle) - Math.sin(p[0]) * Math.sin(lat));

    lon = (lon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
    return vec2.fromValues(lat, lon);
  };

  var buildMatrix = function(s, e, radius) {
    var mat = mat4.create();
    mat4.rotateY(mat, mat, s[1]);
    mat4.rotateZ(mat, mat, s[0] - Math.PI / 2);
    mat4.rotateY(mat, mat, -getBearing(s, e));
    mat4.translate(mat, mat, [0, radius, 0]);
    return mat;
  };

  var getRadialDistance = function(s, e) {
    var dLat = e[0] - s[0],
        dLon = e[1] - s[1];

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(s[0]) * Math.cos(e[0]) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  var toRadians = function(point) {
    return vec2.fromValues(point[0] * Math.PI / 180, point[1] * Math.PI / 180);
  };

  var baseColor = vec4.fromValues(0.46, 0.18, 0.18, 1.0);

  var baseOffset = vec4.create();

  var fillChunk = function(buf, index, pos, uv, normal, f6, color)
  {
    var off = index * _chunkSize;
    vec3.normalize(normal, normal);
    buf[off + 0] = pos[0];
    buf[off + 1] = pos[1];
    buf[off + 2] = pos[2];
    buf[off + 3] = f6;
    buf[off + 4] = uv[0];
    buf[off + 5] = uv[1];
    buf[off + 6] = normal[0];
    buf[off + 7] = normal[1];
    buf[off + 8] = normal[2];
    buf[off + 9] = color[0];
    buf[off + 10] = color[1];
    buf[off + 11] = color[2];
    buf[off + 12] = color[3];
  };

  // start and end should probably be in radians?
  var _generateLinkAttributes = function(radius, start, end, color, startPercent, endPercent) {
    var s = toRadians(start);
    var e = toRadians(end);
    var angle = getRadialDistance(s, e);
    var bearing = getBearing(s, e);
    var length = angle * radius;
    var segments = Math.max(Math.floor(angle / Math.PI * 50) + 1, 8); // 50 segments for a half-circle sounds good, I guess.
    startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
    endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
    var values = new Float32Array(segments * _chunkSize * 6);
    var yMin = baseOffset[1],
      yMax = yMin + Math.min(radius * 0.01, 0.08 * length),
      avgPercent = (startPercent + endPercent) / 2.0,
      f6 = 0.01 * length,
      f7 = 0.1 + avgPercent * 0.3,
      up = vec3.fromValues(0, 1, 0),
      right = vec3.fromValues(0, 0, 1);
    var step = segments * 2;
    for(var i = 0; i < segments; i++)
    {
      var f8 = i / (segments - 1),
        f9 = startPercent + f8 * (endPercent - startPercent),
        f10 = 0.6 + 0.35 * f9,
        // v as in "uv" as in texcoords
        v = f8 * f6,
        // "current" point in progression
        curr = f8 === 0 ? s : dest(s, bearing, angle * f8),
        // "next" point in the progression
        next = dest(s, bearing, angle * (f8 + 1 / (segments - 1))),
        transform = buildMatrix(curr, next, radius),
        // "height" of the centerpoint of the link.
        h = vec3.fromValues(0, yMin + (3.0 + (-1.5 * Math.pow(clampedSin(2.0 * Math.abs(f8 - 0.5)), 4))) * (yMax - yMin), 0),
        // "radius" of the link
        w = radius * 0.01 * clampedSin(1.0 - 2.0 * Math.abs(f8 - 0.5)),
        wUp = vec3.fromValues(0, w, 0),
        wRight = vec3.fromValues(0, 0, w),
        cl = vec4.lerp(vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
      cl[3] = f10;

      // top horizontal segment
      // right point
      fillChunk(values, (i * 2),
        vec3.transformMat4(vec3.create(), vec3.add(vec3.create(), h, wRight), transform),
        vec2.fromValues(0, v),
        vec3.transformMat4(vec3.create(), up, transform),
        f7,
        cl);
      // left point
      fillChunk(values, (i * 2) + 1,
        vec3.transformMat4(vec3.create(), vec3.subtract(vec3.create(), h, wRight), transform),
        vec2.fromValues(0.5, v),
        vec3.transformMat4(vec3.create(), up, transform),
        f7,
        cl);

      // top vertical segment
      fillChunk(values, step + (i * 2),
        vec3.transformMat4(vec3.create(), vec3.add(vec3.create(), h, wUp), transform),
        vec2.fromValues(0, v),
        vec3.transformMat4(vec3.create(), right, transform),
        f7,
        cl);
      fillChunk(values, step + (i * 2) + 1,
        vec3.transformMat4(vec3.create(), vec3.subtract(vec3.create(), h, wUp), transform),
        vec2.fromValues(0.5, v),
        vec3.transformMat4(vec3.create(), right, transform),
        f7,
        cl);

      // bottom vertical segment
      fillChunk(values, 2 * step + (i * 2),
        vec3.transformMat4(vec3.create(), vec3.subtract(vec3.create(), h, wUp), transform),
        vec2.fromValues(0.5, v),
        vec3.transformMat4(vec3.create(), right, transform),
        f7,
        cl);
      fillChunk(values, 2 * step + (i * 2) + 1,
        vec3.transformMat4(vec3.create(), vec3.fromValues(0, 0, 0), transform),
        vec2.fromValues(1.0, v),
        vec3.transformMat4(vec3.create(), right, transform),
        f7,
        cl);
    }
    return values;
  };

  var _generateFaces = function(vertexOffset, segments) {
    var ind = new Uint16Array(6 * (segments - 1) * 3),
        iOff = 0;
    for(var i = 0; i < 3; i++) {

      for(var j = 0; j < segments - 1; j++) {

        ind[iOff + 0] = vertexOffset + 1;
        ind[iOff + 1] = vertexOffset + 0;
        ind[iOff + 2] = vertexOffset + 2;
        ind[iOff + 3] = vertexOffset + 1;
        ind[iOff + 4] = vertexOffset + 2;
        ind[iOff + 5] = vertexOffset + 3;
        vertexOffset += 2;
        iOff += 6;
      }
      vertexOffset += 2;
    }

    return ind;
  };

  var linkmesh = function(gl, sphereRadius) {
    var buf = new Float32Array(EST_CHUNKS * _chunkSize * MAX_LINKS);
    var attributes = [];
    attributes.push(new VertexAttribute('a_position', 4));
    attributes.push(new VertexAttribute('a_texCoord0', 2));
    attributes.push(new VertexAttribute('a_normal', 3));
    attributes.push(new VertexAttribute('a_color', 4));
    var attribute = new GLAttribute(gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new GLIndex(gl, new Uint16Array(EST_CHUNKS * 18 * MAX_LINKS), gl.TRIANGLES);
    this.radius = sphereRadius;
    this.vertexOffset = 0;
    this.faceOffset = 0;
    Mesh.call(this, gl, attribute, faces);
    return this;
  };
  inherits(linkmesh, Mesh);

  linkmesh.prototype.addLink = function(start, end, color, startPercent, endPercent) {

    var linkAttributes = _generateLinkAttributes(this.radius, start, end, color, startPercent, endPercent);
    var len = linkAttributes.length, segments = Math.floor(len / _chunkSize / 6);
    var ind = _generateFaces(this.vertexOffset / _chunkSize, segments);
    this.attributes.setValues(linkAttributes, this.vertexOffset);
    this.vertexOffset += len;
    this.faces.setValues(ind, this.faceOffset);
    this.faceOffset += ind.length;
    return this;
  };

  return linkmesh;
}());

imv.Meshes = imv.Meshes || {};
imv.Meshes.SphericalPortalLink = SphericalPortalLinkMesh;


var Program = (function(){

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

  // Taken from PhiloGL's program class:
  //Returns a Magic Uniform Setter
  var getUniformSetter = function(gl, program, info, isArray) {
    var name = info.name,
        loc = gl.getUniformLocation(program, name),
        type = info.type,
        matrix = false,
        vector = true,
        glFunction, typedArray;

    if (info.size > 1 && isArray) {
      switch(type) {
        case gl.FLOAT:
          glFunction = gl.uniform1fv;
          typedArray = Float32Array;
          vector = false;
          break;
        case gl.INT: case gl.BOOL: case gl.SAMPLER_2D: case gl.SAMPLER_CUBE:
          glFunction = gl.uniform1iv;
          typedArray = Uint16Array;
          vector = false;
          break;
      }
    }

    if (vector) {
      switch (type) {
        case gl.FLOAT:
          glFunction = gl.uniform1f;
          break;
        case gl.FLOAT_VEC2:
          glFunction = gl.uniform2fv;
          typedArray = isArray ? Float32Array : new Float32Array(2);
          break;
        case gl.FLOAT_VEC3:
          glFunction = gl.uniform3fv;
          typedArray = isArray ? Float32Array : new Float32Array(3);
          break;
        case gl.FLOAT_VEC4:
          glFunction = gl.uniform4fv;
          typedArray = isArray ? Float32Array : new Float32Array(4);
          break;
        case gl.INT: case gl.BOOL: case gl.SAMPLER_2D: case gl.SAMPLER_CUBE:
          glFunction = gl.uniform1i;
          break;
        case gl.INT_VEC2: case gl.BOOL_VEC2:
          glFunction = gl.uniform2iv;
          typedArray = isArray ? Uint16Array : new Uint16Array(2);
          break;
        case gl.INT_VEC3: case gl.BOOL_VEC3:
          glFunction = gl.uniform3iv;
          typedArray = isArray ? Uint16Array : new Uint16Array(3);
          break;
        case gl.INT_VEC4: case gl.BOOL_VEC4:
          glFunction = gl.uniform4iv;
          typedArray = isArray ? Uint16Array : new Uint16Array(4);
          break;
        case gl.FLOAT_MAT2:
          matrix = true;
          glFunction = gl.uniformMatrix2fv;
          break;
        case gl.FLOAT_MAT3:
          matrix = true;
          glFunction = gl.uniformMatrix3fv;
          break;
        case gl.FLOAT_MAT4:
          matrix = true;
          glFunction = gl.uniformMatrix4fv;
          break;
      }
    }

    //TODO(nico): Safari 5.1 doesn't have Function.prototype.bind.
    //remove this check when they implement it.
    if (glFunction.bind) {
      glFunction = glFunction.bind(gl);
    } else {
      var target = glFunction;
      glFunction = function() { target.apply(gl, arguments); };
    }

    //Set a uniform array
    if (isArray && typedArray) {
      return function(val) {
        glFunction(loc, new typedArray(val));
      };

    //Set a matrix uniform
    } else if (matrix) {
      return function(val) {
        glFunction(loc, false, val);
      };

    //Set a vector/typed array uniform
    } else if (typedArray) {
      return function(val) {
        typedArray.set(val.toFloat32Array ? val.toFloat32Array() : val);
        glFunction(loc, typedArray);
      };

    //Set a primitive-valued uniform
    } else {
      return function(val) {
        glFunction(loc, val);
      };
    }

    // FIXME: Unreachable code
    throw "Unknown type: " + type;

  };

  var program = function(gl, vertex, fragment)
  {
    GLBound.call(this, gl);
    this.program = null;
    this.vertexSource = fixPrecision(vertex);
    this.fragmentSource = fragment;
    this.attributes = {};
    this.uniforms = {};
  };
  inherits(program, GLBound);

  program.prototype.setupLocations = function()
  {
    var gl = this._gl, program = this.program;
    // this is taken partly from PhiloGL's Program class.
    //fill attribute locations
    var len = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES), info, name;
    for (var i = 0; i < len; i++) {
      info = gl.getActiveAttrib(program, i);
      this.attributes[info.name] = gl.getAttribLocation(program, info.name);
    }

    //create uniform setters
    len = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (i = 0; i < len; i++) {
      info = gl.getActiveUniform(program, i);
      name = info.name;
      //if array name then clean the array brackets
      name = name[name.length -1] == ']' ? name.substr(0, name.length -3) : name;
      this.uniforms[name] = getUniformSetter(gl, program, info, info.name != name);
    }
  };

  program.prototype.init = function()
  {
    var gl = this._gl, vertex, fragment;
    vertex = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex, this.vertexSource);
    gl.compileShader(vertex);
    if(!gl.getShaderParameter(vertex, gl.COMPILE_STATUS))
    {
      console.warn(gl.getShaderInfoLog(vertex));
      console.error('could not compile vertex shader: ' + this.vertexSource);
      throw 'Vertex shader compile error!';
    }
    fragment = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment, this.fragmentSource);
    gl.compileShader(fragment);
    if(!gl.getShaderParameter(fragment, gl.COMPILE_STATUS))
    {
      console.warn(gl.getShaderInfoLog(fragment));
      console.error('could not compile fragment shader: ' + this.fragmentSource);
      throw 'Fragment shader compile error!';
    }

    this.program = gl.createProgram();
    gl.attachShader(this.program, vertex);
    gl.attachShader(this.program, fragment);

    gl.linkProgram(this.program);

    if(!gl.getProgramParameter(this.program, gl.LINK_STATUS))
    {
      // TODO: verbose like above
      throw 'Could not link program';
    }
    gl.useProgram(this.program);

    this.setupLocations();

    //gl.useProgram(0);
  };

  program.prototype.use = function(fn)
  {
    var gl = this._gl;
    if(!this.program)
    {
      this.init();
    }
    else
    {
      gl.useProgram(this.program);
    }
    fn(this.attributes, this.uniforms);
    //gl.useProgram(0);
  };

  return program;
}());


imv.Program = Program;


var OpaqueProgram = (function(){

  var opaque = function(gl, vertex, fragment) {
    Program.call(this, gl, vertex, fragment);
  };
  inherits(opaque, Program);

  opaque.prototype.use = function(fn)
  {
    if(!this.program)
    {
      this.init();
    }
    var gl = this._gl;
    gl.useProgram(this.program);
    // init stuffs.
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    gl.depthMask(true);

    fn(this.attributes, this.uniforms);

    resetGL(gl);
    //gl.useProgram(0);
  };

  return opaque;
}());

imv.Programs = imv.Programs || {};
imv.Programs.Opaque = OpaqueProgram;

var GlowrampProgram = (function(){

  var glowramp = function(gl, vertex, fragment) {
    Program.call(this, gl, vertex, fragment);
  };
  inherits(glowramp, Program);

  glowramp.prototype.use = function(fn)
  {
    if(!this.program)
    {
      this.init();
    }
    var gl = this._gl;
    gl.useProgram(this.program);
    // init stuffs.
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.depthMask(false);
    gl.blendEquation(gl.FUNC_ADD);
    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    fn(this.attributes, this.uniforms);

    resetGL(gl);
    //gl.useProgram(0);
  };

  return glowramp;
}());

imv.Programs = imv.Programs || {};
imv.Programs.Glowramp = GlowrampProgram;

var Drawable = function(programName)
{
  this.programName = programName;
  this.program = null;
  this.uniforms = {};
  this.drawfn = null;
  this.elapsed = 0;
  this.ready = false;
};

Drawable.prototype.init = function(manager)
{
  this.program = manager.getProgram(this.programName);
  if(!this.program) {
    console.warn('missing program ' + this.programName);
    return false;
  }
  this.ready = true;
  return true;
};

Drawable.prototype.setDrawFn = function(fn) {
  this.drawfn = fn;
};

Drawable.prototype.draw = function()
{
  if(!this.ready) {
    console.warn('drawable is not initialized');
    return false;
  }
  this.program.use(this.drawfn);
};

Drawable.prototype.setUniform = function(name, value)
{
  this.uniforms[name] = value;
};

Drawable.prototype.updateTime = function(delta) {
  this.elapsed += delta;
  if(this.onUpdate)
  {
    return this.onUpdate(delta, this.elapsed);
  }
  return true;
};

imv.Drawable = Drawable;

var MeshDrawable = (function() {

  // private function ;)
  var _draw = function(locations, uniforms)
  {
    for(var i in this.uniforms)
    {
      if(this.uniforms.hasOwnProperty(i) && (i in uniforms))
      {
        uniforms[i](this.uniforms[i]);
      }
    }
    this.mesh.draw(locations);
  };

  var meshDrawable = function(programName, meshName)
  {
    Drawable.call(this, programName);
    this.meshName = meshName;
    this.mesh = null;
    this.drawfn = _draw.bind(this);
  };
  inherits(meshDrawable, Drawable);

  meshDrawable.prototype.init = function(manager)
  {
    this.mesh = manager.getMesh(this.meshName);
    if(!this.mesh) {
      console.warn('missing mesh ' + this.meshName);
      return false;
    }
    return Drawable.prototype.init.call(this, manager);
  };

  return meshDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Mesh = MeshDrawable;

var ModelDrawable = (function() {

  var modelDrawable = function(programName, meshName) {
    MeshDrawable.call(this, programName, meshName);
    this.viewProject = mat4.create();
    this.model = mat4.create();
    this.local = mat4.create();
    this.world = mat4.create();
  };
  inherits(modelDrawable, MeshDrawable);

  modelDrawable.prototype.updateMatrix = function() {
    var mvp = mat4.create();
    mat4.multiply(this.model, this.world, this.local);
    mat4.multiply(mvp, this.viewProject, this.model);
    this.uniforms.u_modelViewProject = mvp;
  };

  modelDrawable.prototype.updateView = function(viewProject) {
    this.viewProject = viewProject;
    this.updateMatrix();
  };

  modelDrawable.prototype.setMatrix = function(mat) {
    this.model = mat;
    this.updateMatrix();
  };

  return modelDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Model = ModelDrawable;


var TexturedDrawable = function(programName, meshName, textureName) {
  ModelDrawable.call(this, programName, meshName);
  this.textureName = textureName;
  this.texture = null;
};
inherits(TexturedDrawable, ModelDrawable);

TexturedDrawable.prototype.draw = function()
{
  this.texture.use(0);
  this.uniforms.u_texture = 0;
  ModelDrawable.prototype.draw.call(this);
};

TexturedDrawable.prototype.init = function(manager)
{
  this.texture = manager.getTexture(this.textureName);
  if(!this.texture) {
    console.warn('missing texture ' + this.textureName);
    return false;
  }
  return ModelDrawable.prototype.init.call(this, manager);
};

imv.Drawables = imv.Drawables || {};
imv.Drawables.Textured = TexturedDrawable;

var BicoloredDrawable = (function(){

  // TODO: make constants for these,
  // similar to how mesh names are now handled.
  var PROGRAM = imv.Constants.Program.Bicolored;

  // default quality color: very rare
  var defaultColor0 = vec4.clone(constants.qualityColors.VERY_RARE);

  // default glow color: xm color
  var defaultColor1 = vec4.clone(constants.xmColors.coreGlow);

  var bicolorDrawable = function(meshName, textureName) {
    TexturedDrawable.call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_color0 = vec4.clone(defaultColor0);
    this.uniforms.u_color1 = vec4.clone(defaultColor1);
  };
  inherits(bicolorDrawable, TexturedDrawable);

  return bicolorDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Bicolored = BicoloredDrawable;

var GlowrampDrawable = (function(){

  // is this correct?  Might want to doublecheck
  // what program the waypoint uses.
  var PROGRAM = imv.Constants.Program.Glowramp;

  // default base color: neutral portal color
  var defaultBaseColor = vec4.clone(imv.Constants.teamColors.NEUTRAL);

  var glowrampDrawable = function(meshName, textureName) {
    TexturedDrawable.call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_baseColor = vec4.clone(defaultBaseColor);
    this.uniforms.u_rotation = 0;
    this.uniforms.u_rampTarget = 0;
    this.uniforms.u_alpha = 0.6;
  };
  inherits(glowrampDrawable, TexturedDrawable);

  glowrampDrawable.prototype.updateTime = function(tick) {
    var ret = ModelDrawable.prototype.updateTime.call(this, tick);
    var inc = this.elapsed / 5000;
    this.uniforms.u_rotation = inc;
    this.uniforms.u_rampTarget = Math.sin(Math.PI / 2 * (inc - Math.floor(inc)));
    this.uniforms.u_alpha = Math.sin(inc) * 0.05 + 0.75;
    return ret;
  };

  return glowrampDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Glowramp = GlowrampDrawable;

var XmDrawable = (function(){

  var PROGRAM = imv.Constants.Program.Xm;

  var defaultTeamColor = vec4.clone(constants.xmColors.coreGlow);
  var defaultAltColor = vec4.clone(constants.xmColors.coreGlowAlt);

  var xmDrawable = function(meshName, textureName, teamColor) {
    TexturedDrawable.call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_elapsedTime = 0;
    this.uniforms.u_teamColor = vec4.clone(teamColor || defaultTeamColor);
    this.uniforms.u_altColor = vec4.clone(defaultAltColor);
  };
  inherits(xmDrawable, TexturedDrawable);

  xmDrawable.prototype.updateTime = function(delta) {
    var ret = MeshDrawable.prototype.updateTime.call(this, delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  };

  return xmDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Xm = XmDrawable;

var ShieldEffectDrawable = (function(){

  var PROGRAM = imv.Constants.Program.ShieldEffect;

  // these defaults are whack.  Need to find the real
  // functions used to update these, too
  // As of 1.62.0, that was in ...ingress.common.scanner.b.a.d
  // The baksmali is a little jacked up, though.
  var defaultColor = vec4.clone(imv.Constants.teamColors.NEUTRAL),
    defaultRampTargetInv = vec2.fromValues(0.5, 1.3),
    defaultContributions = vec3.fromValues(0.5, 0.5, 0.5);

  var shieldEffectDrawable = function(meshName, textureName) {
    TexturedDrawable.call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_color = vec4.clone(defaultColor);
    this.uniforms.u_rampTargetInvWidth = vec2.clone(defaultRampTargetInv);
    this.uniforms.u_contributionsAndAlpha = vec3.clone(defaultContributions);
  };
  inherits(shieldEffectDrawable, TexturedDrawable);

  shieldEffectDrawable.prototype.updateTime = function(delta) {
    var ret = ModelDrawable.prototype.updateTime.call(this, delta);
    var inc = this.elapsed / 10000;
    this.uniforms.u_rampTargetInvWidth[0] = (inc - Math.floor(inc)) * -2.0 + 1.0;
    this.uniforms.u_rampTargetInvWidth[1] = (inc - Math.floor(inc)) * 2.0;
    return ret;
  };

  return shieldEffectDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.ShieldEffect = ShieldEffectDrawable;

(function() {
  var inventory = imv.Constants.Mesh.Inventory;
  var textures = imv.Constants.Texture;

  imv.Drawables = imv.Drawables || {};
  imv.Drawables.Inventory = imv.Drawables.Inventory || {};

  var createShell = function(name) {
    var itembase = function() {
      BicoloredDrawable.call(this, inventory[name], textures.FlipCard);
    };
    inherits(itembase, BicoloredDrawable);
    return itembase;
  };

  var createCore = function(name) {
    var xmbase = function() {
      XmDrawable.call(this, inventory[name], textures.Xm);
    };
    inherits(xmbase, XmDrawable);
    return xmbase;
  };

  var createMedia = function(name) {
    var media = function() {
      TexturedDrawable.call(this,
        imv.Constants.Program.Textured,
        inventory[name],
        imv.Constants.Texture.FlipCard
      );
    };
    inherits(media, TexturedDrawable);
    return media;
  };

  for(var i in inventory) {
    if(/^Media/.test(i)) {
      if(i === 'MediaPlane') {
        continue;
      }
      imv.Drawables.Inventory[i] = createMedia(i);
    }
    else {
      if(/Xm$/.test(i)) {
        imv.Drawables.Inventory[i] = createCore(i);
      }
      else {
        imv.Drawables.Inventory[i] = createShell(i);
      }
    }
  }
}());


(function() {
  var resource = imv.Constants.Mesh.Resource;

  imv.Drawables = imv.Drawables || {};
  imv.Drawables.Resource = imv.Drawables.Resource || {};

  var createResource = function(name) {
    var itembase = function() {
      BicoloredDrawable.call(this, resource[name], imv.Constants.Texture.FlipCard);
    };
    inherits(itembase, BicoloredDrawable);
    imv.Drawables.Resource[name] = itembase;
  };

  for(var i in resource) {
    createResource(i);
  }

}());

(function() {
  var meshes = imv.Constants.Mesh.World;
  var textures = imv.Constants.Texture;

  imv.Drawables = imv.Drawables || {};
  imv.Drawables.World = imv.Drawables.World || {};

  var portal = function() {
    GlowrampDrawable.call(this, meshes.Portal, textures.Glowramp);
  };
  inherits(portal, GlowrampDrawable);

  imv.Drawables.World.Portal = portal;

  var shieldEffect = function() {
    ShieldEffectDrawable.call(this, meshes.Shield, textures.ShieldEffect);
  };
  inherits(shieldEffect, ShieldEffectDrawable);

  imv.Drawables.World.Shield = shieldEffect;

  var waypoint = function() {
    GlowrampDrawable.call(this, meshes.Waypoint, textures.Waypoint);
  };
  inherits(waypoint, GlowrampDrawable);

  imv.Drawables.World.Waypoint = waypoint;

  var resonator = function() {
    BicoloredDrawable.call(this, meshes.Resonator, textures.FlipCard);
  };
  inherits(resonator, BicoloredDrawable);

  imv.Drawables.World.Resonator = resonator;

  var artifactsRedGlow = function() {
    GlowrampDrawable.call(this, meshes.ArtifactsRedGlow, textures.ColorGlow);
  };
  inherits(artifactsRedGlow, GlowrampDrawable);

  imv.Drawables.World.ArtifactsRedGlow = artifactsRedGlow;

  var artifactsGreenGlow = function() {
    GlowrampDrawable.call(this, meshes.ArtifactsGreenGlow, textures.ColorGlow);
  };
  inherits(artifactsGreenGlow, GlowrampDrawable);

  imv.Drawables.World.ArtifactsGreenGlow = artifactsGreenGlow;

  var artifactsPurpleGlow = function() {
    GlowrampDrawable.call(this, meshes.ArtifactsPurpleGlow, textures.ColorGlow);
  };
  inherits(artifactsPurpleGlow, GlowrampDrawable);

  imv.Drawables.World.ArtifactsPurpleGlow = artifactsPurpleGlow;

  var artifactsTargetGlow = function() {
    GlowrampDrawable.call(this, meshes.ArtifactsTargetGlow, textures.TargetGlow);
  };
  inherits(artifactsTargetGlow, GlowrampDrawable);

  imv.Drawables.World.ArtifactsTargetGlow = artifactsTargetGlow;
}());

(function(){
  var meshes = imv.Constants.Mesh.Artifact;
  var textures = imv.Constants.Texture;
  var i, j;

  imv.Drawables = imv.Drawables || {};
  imv.Drawables.Artifact = imv.Drawables.Artifact || {};

  var makeArtifact = function(series, name) {
    var artifact = function() {
      TexturedDrawable.call(this, imv.Constants.Program.Textured, name, textures['Artifact' + series]);
    };
    inherits(artifact, TexturedDrawable);

    return artifact;
  };

  for(i in meshes) {
    var series = meshes[i];
    imv.Drawables.Artifact[i] = imv.Drawables.Artifact[i] || {};
    for(j in series) {
      imv.Drawables.Artifact[i][j] = makeArtifact(i, j);
    }
  }

}());

var DynamicDrawable = (function() {

  // private function ;)
  var _draw = function(locations, uniforms)
  {
    for(var i in this.uniforms)
    {
      if(this.uniforms.hasOwnProperty(i) && (i in uniforms))
      {
        uniforms[i](this.uniforms[i]);
      }
    }
    this.mesh.draw(locations);
  };

  var dynamic = function(programName, mesh) {
    Drawable.call(this, programName);
    this.mesh = mesh;
    this.drawfn = _draw.bind(this);
  };
  inherits(dynamic, Drawable);

  return dynamic;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Dynamic = DynamicDrawable;


var DynamicModelDrawable = (function() {

  var modelDrawable = function(programName, mesh) {
    DynamicDrawable.call(this, programName, mesh);
    this.viewProject = mat4.create();
    this.model = mat4.create();
    this.local = mat4.create();
    this.world = mat4.create();
  };
  inherits(modelDrawable, DynamicDrawable);

  modelDrawable.prototype.updateMatrix = function() {
    var mvp = mat4.create();
    mat4.multiply(this.model, this.world, this.local);
    mat4.multiply(mvp, this.viewProject, this.model);
    this.uniforms.u_modelViewProject = mvp;
  };

  modelDrawable.prototype.updateView = function(viewProject) {
    this.viewProject = viewProject;
    this.updateMatrix();
  };

  modelDrawable.prototype.setMatrix = function(mat) {
    this.model = mat;
    this.updateMatrix();
  };

  return modelDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.DynamicModel = DynamicModelDrawable;


var DynamicTexturedDrawable = function(programName, mesh, textureName) {
  DynamicModelDrawable.call(this, programName, mesh);
  this.textureName = textureName;
  this.texture = null;
};
inherits(DynamicTexturedDrawable, DynamicModelDrawable);

DynamicTexturedDrawable.prototype.draw = function()
{
  this.texture.use(0);
  this.uniforms.u_texture = 0;
  DynamicModelDrawable.prototype.draw.call(this);
};

DynamicTexturedDrawable.prototype.init = function(manager)
{
  this.texture = manager.getTexture(this.textureName);
  if(!this.texture) {
    console.warn('missing texture ' + this.textureName);
    return false;
  }
  return DynamicModelDrawable.prototype.init.call(this, manager);
};

imv.Drawables = imv.Drawables || {};
imv.Drawables.DynamicTextured = DynamicTexturedDrawable;

var LinkDrawable = (function(){

  var linkDrawable = function(programName, mesh, textureName) {
    DynamicTexturedDrawable.call(this, programName, mesh, textureName);
    this.uniforms.u_cameraFwd = vec3.fromValues(0, 0, -1);
    this.uniforms.u_elapsedTime = 0;
  };
  inherits(linkDrawable, DynamicTexturedDrawable);

  // TODO: needs a camera class:
  linkDrawable.prototype.updateView = function(viewProject, view, project) {
    DynamicTexturedDrawable.prototype.updateView.call(this, viewProject, view, project);
    if(view) {
      var rot = mat3.fromMat4(mat3.create(), view);
      var q = quat.fromMat3(quat.create(), rot);
      var fwd = vec3.transformQuat(vec3.create(), vec3.fromValues(0, 0, -1), q);
      vec3.normalize(fwd, fwd);
      this.uniforms.u_cameraFwd = fwd;
    }
  };

  linkDrawable.prototype.updateTime = function(delta) {
    var ret = DynamicTexturedDrawable.prototype.updateTime.call(this, delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  };

  linkDrawable.prototype.addLink = function(start, end, color, startPercent, endPercent) {
    // since this doesn't need to be loaded
    // perhaps change this behavior?
    if(!this.mesh) {
      throw 'Mesh not ready yet!';
    }

    return this.mesh.addLink(start, end, color, startPercent, endPercent);
  };

  return linkDrawable;
}());

var PortalLinkDrawable = function(mesh, textureName) {
  LinkDrawable.call(this, 'LinkShader', mesh, textureName);
};
inherits(PortalLinkDrawable, LinkDrawable);

var SphericalLinkDrawable = function(mesh, textureName) {
  LinkDrawable.call(this, 'link3d', mesh, textureName);
};
inherits(SphericalLinkDrawable, LinkDrawable);

SphericalLinkDrawable.prototype.updateView = function(viewProject, view, project) {
  LinkDrawable.prototype.updateView.call(this, viewProject, view, project);
  this.uniforms.u_model = this.model;
};

imv.Drawables = imv.Drawables || {};
imv.Drawables.Link = LinkDrawable;
imv.Drawables.PortalLink = PortalLinkDrawable;
imv.Drawables.SphericalLink = SphericalLinkDrawable;


var AtmosphereDrawable = (function(){

  // this program (atmosphere.glsl.vert and atmosphere.glsl.frag)
  // is a modified version of the atmosphere program in
  // https://github.com/dataarts/webgl-globe/blob/master/globe/globe.js
  var PROGRAM = imv.Constants.Program.Atmosphere;

  // this current expects a SphereMesh, but what that really
  // means is that it's expecting a mesh that provides
  // a_postion, a_texCoord0 and a_normal attributes.
  var atmosphereDrawable = function(mesh, scaleFactor) {
    DynamicModelDrawable.call(this, PROGRAM, mesh);
    this.uniforms.u_normalMatrix = mat3.create();
    this.scaleFactor = scaleFactor || 1.1;
    mat4.scale(this.local, this.local, [this.scaleFactor, this.scaleFactor, this.scaleFactor]);
  };
  inherits(atmosphereDrawable, DynamicModelDrawable);

  atmosphereDrawable.prototype.updateView = function(viewProject) {
    DynamicModelDrawable.prototype.updateView.call(this, viewProject);
     var invert = mat4.invert(mat4.create(), viewProject),
         transpose = mat4.transpose(mat4.create(), invert);
    this.uniforms.u_normalMatrix = mat3.fromMat4(mat3.create(), transpose);
  };

  return atmosphereDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Atmosphere = AtmosphereDrawable;


var Entity = function() {
  this.drawables = {};
  this.transform = mat4.create();
};

Entity.prototype.addDrawable = function(name, drawable) {
  // add dispose if this already exists.
  this.drawables[name] = drawable;
};

Entity.prototype.removeDrawable = function(/*name*/) {
  // dispose stuffs.
};

Entity.prototype.applyTransform = function() {
  for(var i in this.drawables)
  {
    this.drawables[i].setMatrix(this.transform);
  }
};

Entity.prototype.translate = function(vec) {
  mat4.translate(this.transform, this.transform, vec);
  this.applyTransform();
};

Entity.prototype.rotate = function(quat) {
  var rotate = mat4.create();
  mat4.fromQuat(rotate, quat);
  mat4.multiply(this.transform, this.transform, rotate);
  this.applyTransform();
};

Entity.prototype.setAnimation = function(animate) {
  for(var i in this.drawables)
  {
    this.drawables[i].onUpdate = animate;
  }
};

imv.Entity = Entity;

(function(){

  imv.Entities = imv.Entities || {};
  imv.Entities.Inventory = imv.Entities.Inventory || {};

  var simple = {
    Xmp: 'L8',
    Ultrastrike: 'L8',
    ResShield: 'VERY_RARE',
    PowerCube: 'L8',
    LinkAmp: 'EXTREMELY_RARE',
    HeatSink: 'VERY_RARE',
    MultiHack: 'VERY_RARE',
    ForceAmp: 'RARE',
    Turret: 'RARE',
    Resonator: 'L8',
    Capsule: 'RARE'
  };

  var createItem = function(name, color) {
    var item = function() {
      Entity.call(this);
      this.addDrawable(name, new imv.Drawables.Inventory[name]());
      this.addDrawable(name + 'Xm', new imv.Drawables.Inventory[name + 'Xm']());
      this.drawables[name].uniforms.u_color0 = vec4.clone(color);
    };
    inherits(item, Entity);

    return item;
  };

  for(var i in simple) {
    imv.Entities.Inventory[i] = createItem(i, imv.Constants.qualityColors[simple[i]]);
  }

  var Ada = function() {
    Entity.call(this);
    this.addDrawable('FlipCardAda', new imv.Drawables.Inventory.FlipCardAda());
    this.addDrawable('FlipCardXm', new imv.Drawables.Inventory.FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = vec4.clone(imv.Constants.teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color1 = vec4.clone(imv.Constants.teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color0 = vec4.clone(imv.Constants.qualityColors.VERY_RARE);
  };
  inherits(Ada, Entity);

  imv.Entities.Inventory.FlipCardAda = Ada;

  var Jarvis = function() {
    Entity.call(this);
    this.addDrawable('FlipCardJarvis', new imv.Drawables.Inventory.FlipCardJarvis());
    this.addDrawable('FlipCardXm', new imv.Drawables.Inventory.FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = vec4.clone(imv.Constants.teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color1 = vec4.clone(imv.Constants.teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color0 = vec4.clone(imv.Constants.qualityColors.VERY_RARE);
  };
  inherits(Jarvis, Entity);

  imv.Entities.Inventory.FlipCardJarvis = Jarvis;

  var ExtraShield = function() {
    Entity.call(this);
    this.addDrawable('ExtraShield', new imv.Drawables.Inventory.ExtraShield());
    this.addDrawable('ResShieldXm', new imv.Drawables.Inventory.ResShieldXm());
    this.drawables.ExtraShield.uniforms.u_color0 = vec4.clone(imv.Constants.qualityColors.VERY_RARE);
  };
  inherits(ExtraShield, Entity);

  imv.Entities.Inventory.ExtraShield = ExtraShield;
}());

var PortalEntity = function() {
  Entity.call(this);
  this.color = vec4.clone(imv.Constants.teamColors.LOKI);
  this.addDrawable('Portal', new imv.Drawables.World.Portal());
  this.drawables.Portal.onUpdate = function(delta, elapsed) {
    var inc = elapsed / 1000;
    this.uniforms.u_baseColor[0] = Math.sin(inc);
    this.uniforms.u_baseColor[1] = Math.sin(inc + (2 * Math.PI / 3));
    this.uniforms.u_baseColor[2] = Math.sin(inc + (4 * Math.PI / 3));
    return true;
  };
};
inherits(PortalEntity, Entity);

PortalEntity.prototype.setColor = function(color) {
  this.color = vec4.clone(color);
  if(this.drawables.Portal) {
    this.drawables.Portal.onUpdate = undefined;
    this.drawables.Portal.uniforms.u_baseColor = this.color;
  }
  if(this.drawables.Shield) {
    this.drawables.Shield.uniforms.u_color = this.color;
  }
  if(this.drawables.ArtifactsGreenGlow) {
    this.drawables.ArtifactsGreenGlow.u_baseColor = this.color;
  }
};

PortalEntity.prototype.addShield = function() {
  if(!('Shield' in this.drawables)) {
    this.addDrawable('Shield', new imv.Drawables.World.Shield());
  }
  this.drawables.Shield.uniforms.u_color = this.color;
  this.applyTransform();
};

PortalEntity.prototype.addArtifact = function(series, num, frozen) {
  var rotate = function(delta/*, elapsed*/) {
    mat4.rotateY(this.model, this.model, delta / 1000);
    this.updateMatrix();
    return true;
  };
  var name = series + (frozen ? 'Frozen' : '') + num;
  if(!(name in this.drawables)) {
    this.addDrawable(name, new imv.Drawables.Artifact[series][name]());
  }
  this.drawables[name].onUpdate = rotate;
  this.applyTransform();
};

PortalEntity.prototype.addGlowMarker = function(name, color) {
  var n = 'Artifacts' + name + 'Glow';
  if(!(n in this.drawables)) {
    this.addDrawable(n, new imv.Drawables.World[n]());
  }
  this.drawables[n].uniforms.u_baseColor = vec4.clone(color);
};

imv.Entities = imv.Entities || {};
imv.Entities.World = imv.Entities.World || {};
imv.Entities.World.Portal = PortalEntity;



var AssetManager = (function() {

  var areLoading = function(n, e) {
    if(e === 0) {
      n++;
    }
    return n;
  };

  var areLoaded = function(n, e) {
    if(e > 0) {
      n++;
    }
    return n;
  };

  var areError = function(n, e) {
    if(e < 0) {
      n++;
    }
    return n;
  };

  var summarize = function(queue) {
    return {
      total: queue.length,
      loading: queue.reduce(areLoading, 0),
      loaded: queue.reduce(areLoaded, 0),
      error: queue.reduce(areError, 0)
    };
  };

  var assetManager = function(gl, manifest) {
    GLBound.call(this, gl);
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
    this.complete = null;
    this.path = '/assets/';
  };
  inherits(assetManager, GLBound);

  var _isComplete = function() {
    var status = this.getStatus();
    if(this.complete && status.texture.loading === 0 &&
       status.mesh.loading === 0 && status.program.loading === 0)
    {
      this.complete();
    }
  };

  assetManager.prototype.addTexture = function(name, texture) {
    this.textures[name] = texture;
  };

  assetManager.prototype.addMesh = function(name, mesh) {
    this.meshes[name] = mesh;
  };

  assetManager.prototype.addProgram = function(name, program) {
    this.programs[name] = program;
  };

  assetManager.prototype.handleTexture = function(idx, name, info, err, value) {
    if(err)
    {
      this.queues.texture[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.addTexture(name, new Texture(this._gl, info, value));
    this.queues.texture[idx] = 1;
    console.info('loaded texture ' + name);
    _isComplete.call(this);
  };

  assetManager.prototype.handleMesh = function(idx, name, info, err, value) {
    if(err)
    {
      this.queues.mesh[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.addMesh(name, new FileMesh(this._gl, value));
    this.queues.mesh[idx] = 1;
    console.info('loaded mesh ' + name);
    _isComplete.call(this);
  };

  assetManager.prototype.createProgram = function(name, info) {
    var klass = Program;
    if(info.program in imv.Programs)
    {
      klass = imv.Programs[info.program];
    }
    this.addProgram(name, new klass(this._gl, info.vertex, info.fragment));
    console.log('created program ' + name);
  };

  assetManager.prototype.handleProgram = function(idx, name, info, err, vals) {
    if(err)
    {
      this.queues.program[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    var klass = Program;
    if(info.program in imv.Programs)
    {
      klass = imv.Programs[info.program];
    }
    this.addProgram(name, new klass(this._gl, vals[0], vals[1]));
    this.queues.program[idx] = 1;
    console.info('loaded program ' + name);
    _isComplete.call(this);
  };

  assetManager.prototype.getTexture = function(name) {
    var texture = this.textures[name];
    if(texture) {
      this.stats.texture[name] = (this.stats.texture[name] || 0) + 1;
    }
    return texture;
  };

  assetManager.prototype.getMesh = function(name) {
    var mesh = this.meshes[name];
    if(mesh) {
      this.stats.mesh[name] = (this.stats.mesh[name] || 0) + 1;
    }
    return mesh;
  };

  assetManager.prototype.getProgram = function(name) {
    var prog = this.programs[name];
    if(prog) {
      if(this.stats.rawProgram.hasOwnProperty(name)) {
        this.stats.rawProgram[name]++;
      }
      else {
        this.stats.program[name] = (this.stats.program[name] || 0) + 1;
      }
    }
    return prog;
  };

  assetManager.prototype.loadAll = function(callback) {
    var i, asset, manifest = this.manifest;
    this.complete = callback;
    for(i in manifest.texture) {
      if(manifest.texture.hasOwnProperty(i) && !(i in this.textures))
      {
        this.textures[i] = null;
        asset = manifest.texture[i];
        this.loader.loadAsset(
          (!asset.static ? this.path : '') + asset.path,
          'image',
          this.handleTexture.bind(this, this.queues.texture.length, i, asset)
        );
        this.queues.texture.push(0);
      }
    }
    for(i in manifest.mesh) {
      if(manifest.mesh.hasOwnProperty(i) && !(i in this.meshes))
      {
        this.meshes[i] = null;
        asset = manifest.mesh[i];
        this.loader.loadAsset(
          (!asset.static ? this.path : '') + asset.path,
          'arraybuffer',
          this.handleMesh.bind(this, this.queues.mesh.length, i, asset)
        );
        this.queues.mesh.push(0);
      }
    }
    for(i in manifest.program) {
      if(manifest.program.hasOwnProperty(i) && !(i in this.programs))
      {
        this.programs[i] = null;
        asset = manifest.program[i];
        this.loader.loadAssetGroup(
          [(!asset.static ? this.path : '') + asset.vertex, (!asset.static ? this.path : '') + asset.fragment],
          ['text', 'text'],
          this.handleProgram.bind(this, this.queues.program.length, i, asset)
        );
        this.queues.program.push(0);
      }
    }
    for(i in manifest.rawProgram) {
      if(manifest.rawProgram.hasOwnProperty(i) && !(i in this.programs)) {
        this.stats.rawProgram[i] = 0;
        this.createProgram(i, manifest.rawProgram[i]);
      }
    }

    return this.getStatus.bind(this);
  };

  assetManager.prototype.getStatus = function() {
    return {
      texture: summarize(this.queues.texture),
      mesh: summarize(this.queues.mesh),
      program: summarize(this.queues.program)
    };
  };

  assetManager.prototype.generateManifest = function() {
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
  };

  return assetManager;
}());

imv.AssetManager = AssetManager;


var Renderer = function(gl, manager) {
  GLBound.call(this, gl);
  this.manager = manager;
  this.viewProject = mat4.create();
  this.view = mat4.create();
  this.project = mat4.create();
  this.elapsed = 0;
};
inherits(Renderer, GLBound);

Renderer.prototype.updateView = function(view, project) {
  this.view = view;
  this.project = project;
  mat4.multiply(this.viewProject, project, view);
};

Renderer.prototype.render = function() {
  console.warn("base class renders nothing.");
};

Renderer.prototype.updateTime = function(delta) {
  this.elapsed += delta;
};

imv.Renderer = Renderer;

var ObjectRenderer = function(gl, manager) {
  Renderer.call(this, gl, manager);
  this.drawables = [];
};
inherits(ObjectRenderer, Renderer);

ObjectRenderer.prototype.addDrawable = function(drawable) {
  if(!drawable instanceof Drawable)
  {
    throw 'Drawables must always inherit from the base Drawable';
  }
  if(!drawable.init(this.manager))
  {
    console.warn('could not initialize drawable: ', drawable);
    return false;
  }
  if(drawable.updateView)
  {
    drawable.updateView(this.viewProject, this.view, this.project);
  }
  this.drawables.push(drawable);
};

ObjectRenderer.prototype.removeDrawable = function(drawable) {
  for(var i = 0; i < this.drawables.length; i++)
  {
    if(this.drawables[i] === drawable)
    {
      this.drawables.splice(i, 1);
      // TODO: should dispose of drawable here.
      return;
    }
  }
};

ObjectRenderer.prototype.addEntity = function(entity) {
  for(var i in entity.drawables) {
    this.addDrawable(entity.drawables[i]);
  }
};

ObjectRenderer.prototype.updateView = function(view, project) {
  Renderer.prototype.updateView.call(this, view, project);
  var i, len = this.drawables.length;
  for(i = 0; i < len; i++)
  {
    if(this.drawables[i].updateView) {
      this.drawables[i].updateView(this.viewProject, view, project);
    }
  }
};

ObjectRenderer.prototype.render = function() {
  var i, len = this.drawables.length;
  for(i = 0; i < len; i++)
  {
    this.drawables[i].draw();
  }
};

ObjectRenderer.prototype.updateTime = function(delta) {
  Renderer.prototype.updateTime.call(this, delta);
  var i, len = this.drawables.length;
  for(i = 0; i < len; i++)
  {
    // if these return false, remove them from the render loop:
    if(!this.drawables[i].updateTime(delta))
    {
      this.drawables.splice(i, 1);
      i--;
      len--;
    }
  }
};

imv.Renderers = imv.Renderers || {};
imv.Renderers.Object = ObjectRenderer;


var PortalRenderer = function(gl, manager) {
  Renderer.call(this, gl, manager);
  this.portals = [];
  this.links = null;
  this.particles = null;
};
inherits(PortalRenderer, Renderer);

PortalRenderer.prototype.updateView = function(view, project) {
  Renderer.prototype.updateView.call(this, view, project);
  var i, len = this.portals.length;
  for(i = 0; i < len; i++)
  {
    this.portals[i].updateView(this.viewProject, view, project);
  }
};

PortalRenderer.prototype.render = function() {
  var i, len = this.portals.length;
  for(i = 0; i < len; i++)
  {
    this.portals[i].draw();
  }
};

PortalRenderer.prototype.updateTime = function(delta) {
  Renderer.prototype.updateTime.call(this, delta);
  var i, len = this.portals.length;
  for(i = 0; i < len; i++)
  {
    // if these return false, remove them from the render loop:
    if(!this.portals[i].updateTime(delta))
    {
      this.portals.splice(i, 1);
      i--;
      len--;
    }
  }
};

imv.Renderers = imv.Renderers || {};
imv.Renderers.Portal = PortalRenderer;

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
  };

  controls.prototype.disable = function() {
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
  };

  controls.prototype.enable = function() {
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    if(this.options.allowZoom)
    {
      this.canvas.addEventListener('mousewheel', this.mouseWheel, false);
    }
    this.canvas.addEventListener('touchstart', this.touchStart, false);
    this.canvas.addEventListener('mouseover', this.mouseOver, false);
    this.canvas.addEventListener('mouseout', this.mouseOut, false);
    this.enabled = true;
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
    if (this.overRenderer) {
      this.zoom(ev.wheelDeltaY * this.options.wheelScale * (this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance)));
    }
    return true;
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


var Engine = function(canvas, assets, enableSnapshots)
{
  this.canvas = canvas;
  var opt = {};
  if(enableSnapshots) {
    opt.preserveDrawingBuffer = true;
  }
  var gl = canvas.getContext('webgl', opt) || canvas.getContext('experimental-webgl', opt);
  if(!gl)
  {
    throw 'Could not initialize webgl';
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  this.gl = gl;
  this.view = mat4.create();
  mat4.lookAt(this.view, [0.0, 20.0, 25.0], [0.0, 10.0, 0.0], [0.0, 1.0, 0.0]);

  // this should be in radians, not degrees.
  this.hFoV = Math.PI / 4;

  this.far = 100;
  this.project = mat4.create();
  this.assetManager = new AssetManager(this.gl, assets);
  this.objectRenderer = new ObjectRenderer(this.gl, this.assetManager);
  this.resize(canvas.width, canvas.height);
  this.start = this.last = null;
  this.paused = false;
  this.cleared = false;
  this.frame = null;
};

Engine.prototype.resize = function(width, height)
{
  this.canvas.width = width;
  this.canvas.height = height;
  this.gl.viewport(0, 0, width, height);
  this.updateView();
};

Engine.prototype.updateView = function() {
  this.project = mat4.create();
  mat4.perspective(this.project, this.hFoV, this.canvas.width / this.canvas.height, 0.1, this.far);
  this.objectRenderer.updateView(this.view, this.project);
};

Engine.prototype.stop = function() {
  this.paused = true;
  this.cleared = false;
  if(this.frame) {
    window.cancelAnimationFrame(this.frame);
  }
};

Engine.prototype.demoEntities = function() {
  var x = -5, y = 0, z = 4;
  var i, item;
  for(i in imv.Entities.Inventory) {
    item = new imv.Entities.Inventory[i]();
    if(item) {
      item.translate(vec3.fromValues(x, y, z));
      x++;
      if(x > 5) {
        x = -5;
        z--;
      }
      this.objectRenderer.addEntity(item);
      console.log('added ' + i);
    }
  }
  var portal = new imv.Entities.World.Portal();
  portal.translate(vec3.fromValues(x, y, z));
  this.objectRenderer.addEntity(portal);
};

Engine.prototype.demo = function() {
  var x = -5, y = 0, z = 4;
  var i, j, item;
  for(i in imv.Drawables.Inventory) {
    item = new imv.Drawables.Inventory[i]();
    if(item) {
      mat4.translate(item.world, item.world, vec3.fromValues(x, y, z));
      x++;
      if(x > 5) {
        x = -5;
        z--;
      }
      this.objectRenderer.addDrawable(item);
      console.log('added ' + i);
    }
  }

  for(i in imv.Drawables.Resource) {
    item = new imv.Drawables.Resource[i]();
    if(item) {
      mat4.translate(item.world, item.world, vec3.fromValues(x, y, z));
      x++;
      if(x > 5) {
        x = -5;
        z--;
      }
      this.objectRenderer.addDrawable(item);
      console.log('added ' + i);
    }
  }

  for(i in imv.Drawables.World) {
    item = new imv.Drawables.World[i]();
    if(item) {
      mat4.translate(item.world, item.world, vec3.fromValues(x, y, z));
      x++;
      if(x > 5) {
        x = -5;
        z--;
      }
      this.objectRenderer.addDrawable(item);
      console.log('added ' + i);
    }
  }

  for(i in imv.Drawables.Artifact) {
    for(j in imv.Drawables.Artifact[i]) {
      item = new imv.Drawables.Artifact[i][j]();
      if(item) {
        mat4.translate(item.world, item.world, vec3.fromValues(x, y, z));
        x++;
        if(x > 5) {
          x = -5;
          z--;
        }
        this.objectRenderer.addDrawable(item);
        console.log('added ' + i + ': ' + j);
      }
    }
  }
};

Engine.prototype.draw = function(delta) {
  var gl = this.gl;
  // default setup stuff:
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  resetGL(gl);
  //gl.enable(gl.BLEND);
  //gl.depthMask(false);

  // render passes:
  this.objectRenderer.render();

  // run animations
  this.objectRenderer.updateTime(delta);
};

Engine.prototype.render = function(tick)
{
  if(this.paused) {
    this.cleared = true;
    this.paused = false;
    return;
  }
  var delta = 0;
  if(!this.start)
  {
    this.start = tick;
    this.last = tick;
  }
  else
  {
    delta = tick - this.last;
    this.last = tick;
  }
  this.draw(delta);
  // queue up next frame:
  this.frame = window.requestAnimationFrame(this.render.bind(this));
};

Engine.prototype.preload = function(callback) {
  this.assetManager.loadAll(callback);
};

imv.Engine = Engine;


  imv.VERSION = '0.14.0';

  root.IMV = imv;

}(this));

//# sourceMappingURL=ingress-model-viewer.js.map