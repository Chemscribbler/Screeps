require('creepextension')
require('harvester')
require('builder')
require('upgrader')
require('spawnercode')
require('manager');

module.exports.loop = function () {
/*  for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            var roleClass = Memory.creeps[name].role + "s"
            console.log(roleClass + " removing one from memory");
            Memory.creepRoles[roleClass] -= 1;
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:' + name);
        }
      }*/
  if (Game.time % (Memory.creepNum + 1) == 0) {
    for (var room in Game.rooms) {
      //console.log(room);
      room.creepList()
    }
  }
  else {
    var pathingCreepId = Memory.CreepIds[Game.time % Memory.creepNum];
    var pathingCreep = Game.getObjectById(pathingCreepId);
    if(!pathingCreep){
      for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
          var roleClass = Memory.creeps[name].role + "s"
          console.log(roleClass + " removing one from memory");
          Memory.creepRoles[roleClass] -= 1;
          delete Memory.creeps[name];
          console.log('Clearing non-existing creep memory:' + name);
        }
      }
    }
    pathingCreep.memory.path = pathingCreep.pathSearch();
  }
  if(Game.time % 20 == 0){
    for (var spawner in Game.spawns){
      var roomID= Game.spawns[spawner].pos.roomName;
      console.log(Game.rooms[roomID].energyAvailable);
      var orderCreep = Game.spawns[spawner].pickCreepToSpawn(roomID);
      console.log("Ordering " + orderCreep);
      var energy = Game.rooms[roomID].energyAvailable;
      Game.spawns[spawner].chosenCreepSpawn(orderCreep, energy);
    }
  }
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
