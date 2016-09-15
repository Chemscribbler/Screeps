Creep.prototype.simpleHarvester = function () {
  var target = Game.getObjectById(this.memory.target)
  if(!target){
    this.memory.target = this.pos.findClosestByPath();
    this.pathSearch();
  }
  if(this.memory.loaded == false && this.carry.energy == this.carryCapacity){
    this.memory.loaded = true;
    var targets = this.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_EXTENSION ||
                              structure.structureType == STRUCTURE_SPAWN ||
                              structure.structureType == STRUCTURE_CONTAINER ||
                              structure.structureType == STRUCTURE_STORAGE ||
                              structure.structureType == STRUCTURE_TOWER) && (structure.energy < structure.energyCapacity);
                  }
        });
    if (targets.length != 0) {
      this.memory.target = this.pos.findClosestByPath(targets).id;
      this.pathSearch();
    }
    else{
      this.say("No Deposit Spot")
      this.memory.loaded = false;
      //this resets the creep so that it will try the loop again
    }
  }
  if (this.memory.loaded == true && this.carry.energy == 0) {
    this.memory.loaded = false;
    this.memory.target = this.pos.findClosestByPath(FIND_SOURCES).id;
    this.pathSearch();
  }
  if (this.memory.loaded === true &&
    (target.energyCapacity == target.energy)){
      var targets = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_TOWER) && (structure.energy < structure.energyCapacity);
                    }
          });
      if (targets.length != 0) {
        this.memory.target = this.pos.findClosestByPath(targets).id;
        this.pathSearch();
      }
      else{
        this.say("No Deposit Spot")
      }
    }
  else if (this.memory.loaded == true) {
    if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      this.moveIt();
      }
  }
  else if(this.memory.loaded == false){
    if(this.harvest(target) == ERR_NOT_IN_RANGE){
      this.moveIt();
    }
  }
};
