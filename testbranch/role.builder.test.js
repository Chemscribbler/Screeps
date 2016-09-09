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
      siteArray =  Game.creeps[creep].room.find(FIND_CONSTRUCTION_SITES);
      numSite = siteArray.length;
      constructionSites = []
      var priority = undefined;
      var priorityArray = [['tower', 'container', 'extension'],['wall','rampart'],['road']];
      for(i=0, i < numSite, i ++){
        if(siteArray[i].structureType == for(j = 0, j < priorityArray[0].length, j++){priorityArray[0][j]}{
          priority = 0;
//          constructionSite.push(siteArray[i]);
        }
        else if ((siteArray[i].structureType == for(j = 0, j < priorityArray[1].length, j++){priorityArray[1][j]}) && priority !== 0){
          priority = 1;
//          constructionSite.push(siteArray[i]);
        }
        else if ((siteArray[i].structureType == for(j = 0, j < priorityArray[2].length, j++){priorityArray[2][j]}) && (priority !== 0 || priority !== 1)){
          priority = 2;
//          constructionSite.push(siteArray[i]);
        }
      }
      for(i=0, i < numSite, i ++){
        for(j = 0, j < priorityArray[priority].length, j ++){
          if(priorityArray[priority][j]==siteArray[i].structureType){
            constructionSites.push(siteArray[i]);
          }
        }
      }
      var constructionSite = creep.pos.findClosestByPath(constructionSites);

      if (constructionSite.length === 1){
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
