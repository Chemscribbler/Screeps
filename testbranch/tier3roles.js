RoomObject.prototype.checkMined = function () {
  var xpos = this.pos.x;
  var ypos = this.pos.y;
  var miner = false;
  var checks = this.room.lookForAtArea(LOOK_CREEPS, xpos - 1, ypos -1, xpos + 1, ypos +1, true);
  for (var check in checks) {
    if (check.creep.role == 'miner') {
      miner = true;
      break;
    }
  }
  if (!miner) {
    miner = false
  }
  return miner
};

Creep.prototype.posMiner = function () {
  var source = this.memory.mine;
  //console.log(source);
  if ( source == 'none') {
    for (var i = 0; i < Memory.energyMines.length; i++) {
      console.log(i);
      var mSource = Game.getObjectById(Memory.energyMines[i].id)
      //console.log(mSource.pos.x);
      console.log(mSource.id);
      if (mSource.checkMined() == false) {
        this.memory = {"mine" : mSource.id};
      }
    }
  }
  else{
    var mine = Game.getObjectById(source);
    if (this.harvest(mine) == ERR_NOT_IN_RANGE){
      this.moveTo(mine);
    }
  }
};

Creep.prototype.tier3Truck = function () {
  if (this.memory.loaded == false && this.carry.energy == this.carryCapacity){
    this.memory.loaded = true;
  }
  if(this.memory.loaded == true && this.carry.energy == 0){
    this.memory.loaded = false;
    for (var i = 0; i < energyMines.length; i++) {
      var dropped_energy = energyMines[i].room.findInRange(FIND_RESOURCE_ENERGY, 2);
      if (dropped_energy.length > 0){
        this.memory = {'toPickUp' : dropped_energy[0]};
      }
    }
  }
  if (this.memory.toPickUp == undefined && this.memory.loaded == false) {
    for (var i = 0; i < energyMines.length; i++) {
      var dropped_energy = energyMines[i].room.findInRange(FIND_RESOURCE_ENERGY, 2);
      if (dropped_energy.length > 0){
        this.memory = {'toPickUp' : dropped_energy[0]};
      }
    }
  }
  else if (this.memory.loaded == false) {
    if (this.pickup(this.memory.toPickUp)== ERR_NOT_IN_RANGE) {
      this.moveTo(this.memory.toPickUp)
    }
  }
  else {
    var targets = this.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_EXTENSION ||
                              structure.structureType == STRUCTURE_SPAWN ||
                              structure.structureType == STRUCTURE_STORAGE ||
                              structure.structureType == STRUCTURE_CONTAINER ||
                              structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                  }
    });
    var target = this.pos.findClosestByPath(targets);
      //console.log()
    if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
  }
};
