module.exports = {
  run: function(creep){
    if (creep.memory.loaded == false && creep.carry.energy == creep.carryCapacity ){
        creep.memory.loaded = true;
    }
    else if (creep.memory.loaded == true && creep.carry.energy == 0){
    creep.memory.loaded = false;
    }

    var spot = Game.creeps[creep.name].pos;
//    console.log(spot)
    var roomIn = Game.creeps[creep.name].room.name;
//    console.log(roomIn)

    if(Game.rooms[roomIn].lookForAt(LOOK_STRUCTURES, spot)[0]===undefined){
      Game.rooms[roomIn].createConstructionSite(Game.creeps[creep.name].pos, STRUCTURE_ROAD)
    }
    var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if (creep.memory.loaded == true){
      var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.pickup(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                  }
                }
      }
      else if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedEnergy);
      }
  }
}
