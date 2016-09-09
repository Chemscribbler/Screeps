var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:' + name);
        }
      }
      
module.exports.loop = function () {
  var numberOfHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
  var numberOfBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
  var numberofUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

  if (numberOfHarvester > 2){
    if(numberOfBuilder > 6 || numberofUpgrader == 0){
      Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'})
    }
    else{
      Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'builder'})
    }
  }
  else{
    Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester'})
  }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}