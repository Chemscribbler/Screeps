Creep.prototype.simpleUpgrader = function () {
  var target = Game.getObjectById(this.memory.target)
  if (this.memory.loaded == false && this.carryCapacity == this.carry.energy) {
    this.memory.loaded = true;
    this.memory.target = this.room.controller.id
    this.pathSearch()
  }
  if (this.memory.loaded == true && this.carry.energy == 0){
    this.memory.loaded = false;
    this.memory.target = this.pos.findClosestByPath(FIND_SOURCES).id
    this.pathSearch
  }

  if(this.memory.loaded == true){
    if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
        this.moveTo(this.room.controller);
    }
  }
  else if (this.memory.loaded == false) {
    //console.log(!target.ticksToRegeneration);
    //console.log(this.pickup(target));
    if(!target.ticksToRegeneration){
      if (this.pickup(target) == ERR_NOT_IN_RANGE) {
          this.moveIt();
        }
      }
    else if (this.harvest(target) == ERR_NOT_IN_RANGE) {
      this.moveIt();
    }
  }
};
