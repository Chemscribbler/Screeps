module.exports = {
  run: function(creep){
    if (creep.memory.loaded === false && creep.carry.energy === creep.carryCapacity ){
        creep.memory.loaded = true;
    }
    else if (creep.memory.loaded === true && creep.carry.energy === 0){
      creep.memory.loaded = false;
    }

    var spot = Game.creeps[creep.name].pos;
//    console.log(spot)
    var roomIn = Game.creeps[creep.name].room.name;
//    console.log(roomIn)

    if(Game.rooms[roomIn].lookForAt(LOOK_STRUCTURES, spot)[0]===undefined){
      Game.rooms[roomIn].createConstructionSite(Game.creeps[creep.name].pos, STRUCTURE_ROAD);
    }

    if (creep.memory.loaded === true){
      var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                  }
                }
      }
    else {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
};
