Creep.prototype.simpleHarvester = function () {
  var target = Game.getObjectById(creep.memory.target)
  if(creep.memory.loaded == false && creep.carry == creep.carryCapacity){
    creep.memory.loaded = true;
  }
  if (creep.memory.loaded == true && creep.carry == 0) {
    creep.memory.loaded = false;
    creep.memory.target = this.pos.findClosestByPath(FIND_SOURCES).id;
  }
  if (this.memory.loaded === true &&
    (target.energyCapacity == target.energy)){
    var targets = this.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_EXTENSION ||
                              structure.structureType == STRUCTURE_SPAWN ||
                              structure.structureType == STRUCTURE_CONTAINER ||
                              structure.structureType == STRUCTURE_STORAGE ||
                              structure.structureType == STRUCTURE_TOWER) && (structure.energy <= structure.energyCapacity);
                  }
        });
      creep.memory.target = creep.pos.findClosestByPath(targets).id;
    }

  if(creep.memory.loaded == false) {
    if (harvest(target) == ERR_NOT_IN_RANGE) {
      this.moveIt();
    }
  }
  else {
    if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      this.moveIt();
      }
    }
};
