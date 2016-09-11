Creep.prototype.simpleHarvest = function () {
  if (this.memory.loaded === false && this.carry.energy === this.carryCapacity ){
      this.memory.loaded = true;
//      this.say('unloading')
  }
  else if (this.memory.loaded === true && this.carry.energy === 0){
    this.memory.loaded = false;
//    this.say('harvesting')
  }

//  var spot = Game.creeps[creep.name].pos;
//    console.log(spot)
//  var roomIn = Game.creeps[creep.name].room.name;
//    console.log(roomIn)

//  if(Game.rooms[roomIn].lookForAt(LOOK_STRUCTURES, spot)[0]===undefined){
//    Game.rooms[roomIn].createConstructionSite(Game.creeps[creep.name].pos, STRUCTURE_ROAD);
//  }

  if (this.memory.loaded === true){
    var targets = this.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_EXTENSION ||
                              structure.structureType == STRUCTURE_SPAWN ||
                              structure.structureType == STRUCTURE_CONTAINER ||
                              structure.structureType == STRUCTURE_STORAGE ||
                              structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                  }
          });

    if(targets.length > 0) {
      var target = this.pos.findClosestByPath(targets);
      //console.log()
      if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
        }
      }
    }
  else {
    var source = this.pos.findClosestByPath(FIND_SOURCES);
    if (this.harvest(source) == ERR_NOT_IN_RANGE) {
      this.moveTo(source);
    }
  }
};


Creep.prototype.simpleUpgrader = function () {
  if(this.carry.energy==this.carryCapacity && this.memory.loaded == false){
    this.memory.loaded = true;
  }
  if(this.carry.energy == 0 && this.memory.loaded == true){
    this.memory.loaded = false;
  }

  if(this.memory.loaded == false) {
    var targets = this.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE)
                            && structure.energy > this.carryCapacity +200;
                }
        });
    if (targets.length !== 0) {
        var target = this.pos.findClosestByPath(targets)
        if(this.withdraw(target, RESOURCE_ENERGY, this.carryCapacity) == ERR_NOT_IN_RANGE){
          this.moveTo(target)
          }
        }
    else{
     var source = this.pos.findClosestByPath(FIND_SOURCES);
     if(this.harvest(source) == ERR_NOT_IN_RANGE) {
            this.moveTo(source);
          }
        }
      }
  else {
      if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
          this.moveTo(this.room.controller);
      }
  }
};

Creep.prototype.simpleBuilder = function () {
  if (this.memory.loaded == true && this.carry.energy == 0){
    this.memory.loaded = false
//    this.say('getting energy');
  }
  if (this.memory.loaded == false && this.carry.energy == this.carryCapacity){
    this.memory.loaded = true
//    this.say('building');
  }

  if(this.memory.loaded == true){
    var constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if (constructionSite != undefined){
      if (this.build(constructionSite) == ERR_NOT_IN_RANGE){
        this.moveTo(constructionSite);
      }
    }
    else{
      this.simpleUpgrader();
    }
  }
  else{
    var targets = this.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_SPAWN ||
                              structure.structureType == STRUCTURE_CONTAINER ||
                              structure.structureType == STRUCTURE_STORAGE)
                              && structure.energy > this.carryCapacity +200;
                  }
          });
    if (targets.length !== 0) {
      if(this.withdraw(this.pos.findClosestByPath(targets), RESOURCE_ENERGY, this.carryCapacity)){
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

Creep.prototype.simpleDefender = function () {
  var hostile = this.room.findClosestByPath(FIND_HOSTILE_CREEPS);
  if(hostile != undefined){
    if(this.attack(hostile) == ERR_NOT_IN_RANGE){
      this.moveTo(hostile)
    }
  }
};
/*
Creep.prototype.simpleMiner = function (num) {
  var source = this pos.find(FIND_SOURCES)[num]
  if (this.harvest(source)== ERR_NOT_IN_RANGE){
    this.moveTo(source)
  }
  if(Game.time % 20 === 1){
    var spot = Game.creeps[creep.name].pos;
    var roomIn = Game.creeps[creep.name].room.name;
    if(Game.rooms[roomIn].lookForAt(LOOK_STRUCTURES, spot)[0]===undefined){
      Game.rooms[roomIn].createConstructionSite(Game.creeps[creep.name].pos, STRUCTURE_CONTAINER);
    }
  }
};
*/
