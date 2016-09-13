Creep.prototype.pathSearch = function () {
  var target = this.memory.target;
  var path = this.pos.findPathTo(Game.getObjectById(target));
  this.memory.path = path;
};

Creep.prototype.moveIt = function () {
  this.moveByPath(this.memory.path);
};

Creep.prototype.findEnergyPickup = function () {
  if (this.room.controller.level < 3) {
    var target = this.pos.findClosestByPath(FIND_SOURCES);
    this.memory.target = target;
    this.pathSearch();
  }
  else{
    var target = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    if (!target) {
      target = this.pos.findClosestByPath(FIND_STRUCTURES).filter(
        (s) => {
            return (structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_STORAGE ||
                    structure.structureType == STRUCTURE_TOWER) && (structure.energy > this.energyCapacity);
        }
      )
    }
    if (!target){
      target = this.pos.findClosestByPath(FIND_SOURCES);
    }
  }
};
