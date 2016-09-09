var roleUpgrader = require('role.upgrader')

module.exports = {
  run: function(creep){
    if (creep.memory.loaded == true && creep.carry.energy == 0){
      creep.memory.loaded = false
    }
    if (creep.memory.loaded == false && creep.carry.energy == creep.carryCapacity){
      creep.memory.loaded = true
    }

    if(creep.memory.loaded == true){
      var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (constructionSite != undefined){
        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE){
          creep.moveTo(constructionSite);
        }
      }
      else{
        roleUpgrader.run(creep)
      }
    }
    else{
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source)==   ERR_NOT_IN_RANGE){
        creep.moveTo(source);
      }
    }
  }
}
