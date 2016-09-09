var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var towerDefense = require('towerdefense');
var roleCourier = require('role.courier');
require('protoype.autobuilder')();
//var roadBuilder = require('road.Builder');

module.exports.loop = function () {
  for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:' + name);
        }
    }


  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
  var couriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'courier')

 for(var roomCheck in Game.rooms){
   towerDefense.Defend(roomCheck);
   var roomLevel = Game.rooms[roomCheck].controller.level;
   var sourceNumber = Game.rooms[roomCheck].find(FIND_SOURCES).length;
 }
//  console.log(roomLevel);
//    Game.rooms.prototype.autoDefend(roomcheck);
//

/*
    var hostiles = Game.rooms[roomcheck].find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0) {
        var towers = Game.rooms[roomcheck].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
          }
        }
*/
//    console.log(Game.time);
  if(Game.time % 30 == 0){
    var energyCap = Game.spawns['Spawn1'].room.energyCapacityAvailable;
//    console.log(energyCap);
    if(Game.spawns['Spawn1'].room.energyAvailable == energyCap){
      if((harvesters.length < 1 || builders.length > harvesters.length)
      && roomLevel < 3){
        var newName = Game.spawns['Spawn1'].autoCreateCreep(energyCap, 'harvester');
        console.log('Spawning new harvester: ' + newName);
      }
      else if (roomLevel > 2 && 'harvesters' < sourceNumber) {
        var newName = Game.spawns['Spawn1'].autoCreateCreep(energyCap, 'harvester', roomLevel);
        console.log('Spawning big harverster' + newName)
      }
      else if ((Game.rooms[roomCheck].find(FIND_DROPPED_ENERGY).length !== 0) && (couriers.length < 2 * harvesters.length) && (roomLevel >2)) {
          var newName = Game.spawns['Spawn1'].autoCreateCreep(energyCap, 'courier', roomLevel);
      }
      else if (upgraders.length < builders.length * 2 || upgraders.length == 0) {
        var newName = Game.spawns['Spawn1'].autoCreateCreep(energyCap, 'upgrader');
        console.log('Spawning new upgrader: ' + newName);
      }
      else{
        var newName = Game.spawns['Spawn1'].autoCreateCreep(energyCap, 'builder');
          console.log('Spawning new builder: ' + newName);
        }
      }
    }


  for(var name in Game.creeps) {

        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
          roleBuilder.run(creep);
        }
        if(creep.memory.role == 'courier'){
          roleCourier.run(creep);
        }
    }

}
