//require('priorityassigner')();
//var roadBuilder = require('road.Builder');
//require('spawnercode');
//require('simpleroles');
//require('tier3roles');
/*
StructureSpawn.prototype.pickCreepToSpawn= function(){
  var body = [WORK, CARRY, MOVE];
  var roleName = 'harvester';
  return this.createCreep(body, undefined, {role: roleName, loaded: false});
}
*/
require('creepextension')
require('harvester')
require('builder')
require('upgrader')

module.exports.loop = function () {
   for(var name in Game.creeps){
     var creep = Game.creeps[name]
     switch (creep.memory.role) {
       case 'harvester':
        creep.simpleHarvester();
        break;

      case 'upgrader':
        creep.simpleUpgrader();
        break;

      case 'builder':
        creep.simpleBuilder();
        break;
   }
 }
}
