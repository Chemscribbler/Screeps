Creep.prototype.simpleBuilder = function () {
  // This code checkes if the builder has used all of it energy & assigns it a new place to get more energy
  if (this.memory.loaded == true && this.carry.energy == 0){
    this.memory.loaded = false;
    this.findEnergyPickup();
  }
// Switches state to full & gives it build site
  if (this.memory.loaded == false && this.carry.energy == this.carryCapacity){
    this.memory.loaded = true;
    this.memory.target = Memory.conSites[0]
//    this.say('building');
  }
  if (Memory.conSites.length > 0){ //this could probably be removed, currently filters if B acts as Upgrader
    var target = Game.getObjectById(this.memory.target)
    if (this.memory.loaded == true) {
      if (target.structureType != undefined) {
        if (this.build(target) == ERR_NOT_IN_RANGE) {
          this.moveIt();
        }
        if(this.build(target)== ERR_INVALID_TARGET) {
          this.memory.target = Memory.conSites[0];
        }
      }
    }
    else if (this.memory.loaded == false) {
      if (this.pickup(target) == ERR_NOT_IN_RANGE) {
          this.moveIt();
      }
      else if (this.pickup(target) == ERR_INVALID_TARGET) {
        this.harvest(target);
      }
    }
  }
  else{
    this.simpleUpgrader();
  }
}
/*  else{
    var target = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    if(target !== null){
      if(target.amount > this.carryCapacity){
        if (this.pickup(target) == ERR_NOT_IN_RANGE) {
          this.moveTo(target)
        }
      }
    }
    var targets = this.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_SPAWN ||
                              structure.structureType == STRUCTURE_CONTAINER ||
                              structure.structureType == STRUCTURE_STORAGE)
                              && structure.energy > 0;
                  }
          });
    if (targets.length !== 0) {
      if(this.withdraw(this.pos.findClosestByPath(targets), RESOURCE_ENERGY, this.carryCapacity-this.carry.energy)){
        this.moveTo(targets[0])
      }
    }
    else{
      var source = this.pos.findClosestByPath(FIND_SOURCES);
      if (this.harvest(source)==   ERR_NOT_IN_RANGE){
        this.moveTo(source);
      }
    }
  }
};
*/
