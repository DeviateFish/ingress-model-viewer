var r;

imv.Entities = imv.Entities || {};
imv.Entities.Items = imv.Entities.Items || {};
// capsule
// Rare because why not.
var CapsuleItemEntity = LeveledXMItemEntity('CapsuleMesh', 'CapsuleXmMesh', constants.qualityColors.RARE);
imv.Entities.Items.Capsule = CapsuleItemEntity;

// AXA Shield
// Very Rare since that's the only quality they drop in.
var ExtraShieldItemEntity = LeveledXMItemEntity('ExtraShieldMesh', 'ResShieldXMMesh', constants.qualityColors.VERY_RARE);
imv.Entities.Items.ExtraShield = ExtraShieldItemEntity;

// Force Amp
// Rare since that's the only quality they drop in.
var ForceAmpItemEntity = LeveledXMItemEntity('ForceAmpMesh', 'ForceAmpXmMesh', constants.qualityColors.RARE);
imv.Entities.Items.ForceAmp = ForceAmpItemEntity;

// Heatsink
// Very Rare because people like that.
var HeatSinkItemEntity = LeveledXMItemEntity('HeatSinkMesh', 'HeatSinkXmMesh', constants.qualityColors.VERY_RARE);
imv.Entities.Items.HeatSink = HeatSinkItemEntity;

// Link Amp
// Rare because yeah, right :P
var LinkAmpItemEntity = LeveledXMItemEntity('LinkAmpMesh', 'LinkAmpXmMesh', constants.qualityColors.RARE);
imv.Entities.Items.LinkAmp = LinkAmpItemEntity;

// MultiHack
// Very Rare because people like that.
var MultiHackItemEntity = LeveledXMItemEntity('MultiHackMesh', 'MultiHackXmMesh', constants.qualityColors.VERY_RARE);
imv.Entities.Items.MultiHack = MultiHackItemEntity;

// Resonator
// Random level because I can:
r = Math.floor(Math.random() * 8) + 1;
var ResonatorItemEntity = LeveledXMItemEntity('ResonatorMesh', 'ResonatorXMMesh', constants.qualityColors['L' + r]);
imv.Entities.Items.Resonator = ResonatorItemEntity;

// Shield
// Very Rare because people like that.
var ShieldItemEntity = LeveledXMItemEntity('ResShieldMesh', 'ResShieldXMMesh', constants.qualityColors.VERY_RARE);
imv.Entities.Items.Shield = ShieldItemEntity;

// Turret
// Rare because that's the only quality.
var TurretItemEntity = LeveledXMItemEntity('TurretMesh', 'TurretXmMesh', constants.qualityColors.RARE);
imv.Entities.Items.Turret = TurretItemEntity;

// Ultrastrike
// Random level because I can:
r = Math.floor(Math.random() * 8) + 1;
var UltrastrikeItemEntity = LeveledXMItemEntity('UltrastrikeMesh', 'UltrastrikeXMMesh', constants.qualityColors['L' + r]);
imv.Entities.Items.Ultrastrike = UltrastrikeItemEntity;

// Xmp
// Random level because I can:
r = Math.floor(Math.random() * 8) + 1;
var XmpItemEntity = LeveledXMItemEntity('XmpMesh', 'XmpXMMesh', constants.qualityColors['L' + r]);
imv.Entities.Items.Xmp = XmpItemEntity;

// Jarvis Virus
// default core color is enlightened team color
var JarvisVirusItemEntity = FlipCardXMItemEntity('FlipCardMeshJarvis', constants.teamColors.ENLIGHTENED);
imv.Entities.Items.JarvisVirus = JarvisVirusItemEntity;

// Ada Refactor
// default core color is resistance team color
var AdaRefactorItemEntity = FlipCardXMItemEntity('FlipCardMeshAda', constants.teamColors.RESISTANCE);
imv.Entities.Items.AdaRefactor = AdaRefactorItemEntity;
