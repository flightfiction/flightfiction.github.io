// 3D model files for the "3D Model" tab in each popup. Each entry maps a part
// name to a binary .stl file in assets/models/. Put your STL files there with
// these names (or edit the paths). A build whose files are missing simply
// hides/shows an empty 3D tab; nothing else breaks.
//
// A part can also be a list of files; they are joined back together in order
// (the Dune model is split in two so each file fits GitHub's 25 MB web-upload limit).
//
// Part names control the colors in the viewer: Back, Front, RightArmor,
// LeftArmor, Nose, PCB, Tail, Wings, Hull.
var MODEL_FILES = {
  edith:       {Back:'assets/models/edith-back.stl', Front:'assets/models/edith-front.stl',
                RightArmor:'assets/models/edith-right-armor.stl', LeftArmor:'assets/models/edith-left-armor.stl'},
  redwing:     {Nose:'assets/models/redwing-nose.stl', PCB:'assets/models/redwing-pcb.stl',
                Tail:'assets/models/redwing-tail.stl', Wings:'assets/models/redwing-wings.stl'},
  helicarrier: {Hull:'assets/models/helicarrier.stl'},
  tie:         {Hull:'assets/models/tie-fighter.stl'},
  batwing:     {Hull:'assets/models/batwing.stl'},
  dune:        {Hull:['assets/models/dune-ornithopter.part00.bin','assets/models/dune-ornithopter.part01.bin']}
};
