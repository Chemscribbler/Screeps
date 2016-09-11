//require('priorityassigner')();
//var roadBuilder = require('road.Builder');
require('spawnercode');
require('simpleroles');
require('tier3roles');
/*
StructureSpawn.prototype.pickCreepToSpawn= function(){
  var body = [WORK, CARRY, MOVE];
  var roleName = 'harvester';
  return this.createCreep(body, undefined, {role: roleName, loaded: false});
}
*/


module.exports.loop = function () {
  for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            var roleClass = Memory.creeps[name].role + "s"
            console.log(roleClass + " removing one from memory");
            Memory.creepRoles[roleClass] -= 1;
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:' + name);
        }
      }
  if(Game.time % 20 === 0){
  for (var spawner in Game.spawns){
    var roomID= Game.spawns[spawner].pos.roomName;
    console.log(Game.rooms[roomID].energyAvailable);
    var orderCreep = Game.spawns[spawner].pickCreepToSpawn(roomID);
    console.log("Ordering " + orderCreep);
    var energy = Game.rooms[roomID].energyAvailable;
    Game.spawns[spawner].chosenCreepSpawn(orderCreep, energy);
  }}
  for(var name in Game.creeps){
    var creep = Game.creeps[name]
    
    switch (creep.memory.role) {
      case 'harvester':
        creep.simpleHarvest();

        break;
      case 'upgrader':
        creep.simpleUpgrader();
        break;

      case 'builder':
        creep.simpleBuilder();
        break;
      case 'miner':
        creep.posMiner();
        break;
      case 'truck':
        creap.tier3Truck();
        break;
    }
  }
}
