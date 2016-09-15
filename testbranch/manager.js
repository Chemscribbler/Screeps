Room.prototype.creepList = function () {
  var listOfCreeps = this.find(FIND_MY_CREEPS)
  var listCreepIds = []
  for(creep in listOfCreeps){
    listCreepIds.push(creep.id)
  }
  Memory.CreepIds = listCreepIds
  Memory.creepNum = listCreepIds.length
};

Room.prototype.conSiteList = function () {
  if (Game.time % 5 == 0) {
    var list = Game.rooms['sim'].find(FIND_CONSTRUCTION_SITES);
    var sitePriority = {
      "tower": 1,
      "extension": 2,
      "spawn": 3,
      "storage": 4,
      "container": 5,
      "road": 6,
      "wall": 7
    };
    list.sort(function(a,b){
      return (sitePriority[a.structureType.toString()]-sitePriority[b.structureType.toString()]);
    });*/
    var orderedSites = []
    for (var item in list) {
      orderedSites.push(item.id);
    };
    Memory.conSites = orderedSites
    return void
  }
};
