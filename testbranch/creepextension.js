Creep.prototype.pathSearch = function () {
  var target = this.memory.target;
  var path = this.pos.findPathTo(getObjectById(target));
  this.memory.path = path;
};

Creep.prototype.moveIt = function () {
  this.moveByPath(this.memory.path);
};

Creep.prototype.findEnergyPickup = function () {
  var target = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
  if (this.pickup(target) == ERR_NOT_IN_RANGE) {
    this.moveTo(target)
  }
};
