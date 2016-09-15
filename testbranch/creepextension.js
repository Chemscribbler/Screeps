Creep.prototype.pathSearch = function () {
  var target = this.memory.target;
  var path = this.pos.findPathTo(Game.getObjectById(target));
  this.memory.path = path;
};

Creep.prototype.moveIt = function () {
  //console.log(this.memory.path[0].x, this.memory.path[0].y);
  this.moveByPath(this.memory.path);
};

Creep.prototype.findEnergyPickup = function () {
  if (this.room.controller.level < 3) {
    var target = this.pos.findClosestByPath(FIND_SOURCES).id;
  }
  else{
    var target = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES).id;
    if (!target) {
      target = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_TOWER) && (structure.energy <= structure.energyCapacity);
                    }
            }).id
    }
    if (!target){
      target = this.pos.findClosestByPath(FIND_SOURCES);
    }
  }
  this.memory.target = target;
};
