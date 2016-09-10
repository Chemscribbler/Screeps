StructureSpawn.prototype.pickCreepToSpawn= function(room){
  var roomSpawningIn = Game.rooms[room];
  var controllerLevel = roomSpawningIn.controller.level
  var hostiles = roomSpawningIn.find(FIND_HOSTILE_CREEPS);
//  console.log(roomSpawningIn)

// Getting the number of each role in the room (currently this is done for every spawner, eventually could do this as a per-room function)
/*
  var harvesters = roomSpawningIn.find(FIND_MY_CREEPS).filter((creep) => creep.memory.role == 'harvester');
  var upgraders = roomSpawningIn.find(FIND_MY_CREEPS).filter((creep) => creep.memory.role == 'upgrader');
  var builders = roomSpawningIn.find(FIND_MY_CREEPS).filter((creep) => creep.memory.role == 'builder');
  var repairers = roomSpawningIn.find(FIND_MY_CREEPS).filter((creep) => creep.memory.role == 'repairer');
  var miners = roomSpawningIn.find(FIND_MY_CREEPS).filter((creep) => creep.memory.role == 'miner');
  var trucks = roomSpawningIn.find(FIND_MY_CREEPS).filter((creep) => creep.memory.role == 'truck');
  var mdefenders = roomSpawningIn.find(FIND_MY_CREEPS).filter((creep) => creep.memory.role == 'mdefender');
  var rdefenders = roomSpawningIn.find(FIND_MY_CREEPS).filter((creep) => creep.memory.role == 'rdefender');
  var healers = roomSpawningIn.find(FIND_MY_CREEPS).filter((creep) => creep.memory.role == 'healer');
*/
  var numSources = roomSpawningIn.find(FIND_SOURCES).length;

  var harvesters = Memory.creepRoles['harvesters']
  var upgraders = Memory.creepRoles['upgraders']
  var builders = Memory.creepRoles['builders']
  var repairers = Memory.creepRoles['repairers']
  var miners = Memory.creepRoles['miners']
  var trucks = Memory.creepRoles['trucks']
  var mdefenders = Memory.creepRoles['mdefenders']
  var mdefenders = Memory.creepRoles['mdefenders']
  var rdefenders = Memory.creepRoles['rdefenders']
  console.log("Harvesters: " + harvesters + " Upgraders: " + upgraders + " Builders: " + builders);
  if(hostiles.length > 0 && 1===0){
    if(mdefenders < hostiles.length){
      return 'mDefender';
    }
    else{
      return 'rDefender';
    }
  }
  else if(numSources > harvesters && controllerLevel < 3){
    return 'harvester';
  }
  else if (upgraders < 3 * numSources && harvesters> 0) {
    return 'upgrader';
  }
  else if (miners < numSources && controllerLevel > 2){
    return 'miner';
  }
  else if (builders < 4 && harvesters >= 1){
    return 'builder';
  }
  else if (trucks < miners * 2 && miners >= 1){
    return 'truck';
  }
  else{
    return null;
  };
}

StructureSpawn.prototype.chosenCreepSpawn = function(creepJob, energyToUse){
//    console.log(energyToUse);
    switch (creepJob) {
      case 'harvester':
        var body = [WORK, CARRY, MOVE];
        break;
      case 'upgrader':
        var parts = Math.floor(energyToUse/200);
//        console.log(parts);
        var body = [] ;
        for(i = 0; i < parts; i++){
          body.push(WORK);
          body.push(CARRY);
          body.push(MOVE);
        };
//          console.log(body);
        break;
      case 'builder':
        var parts = Math.floor(energyToUse/200);
//        console.log(parts);
        var body = [] ;
        for(i = 0; i < parts; i++){
          body.push(WORK);
          body.push(CARRY);
          body.push(MOVE);
      };
        break;
      case 'miner':
        var body = [WORK, WORK, WORK, WORK, WORK, MOVE];
      case 'truck':
        var body = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
      case 'mDefender':
        var parts = Math.floor(energyToUse/280);
        for (i = 0; i < parts; i++){
          body.push(ATTACK);
          body.push(ATTACK);
          body.push(TOUGH);
          body.push(TOUGH)
          body.push(MOVE);
          body.push(MOVE);
        }
      default:
        return

    }
//    console.log(body);
//    console.log(creepJob);
  if (body.length > 2) {
    Memory.creepRoles[creepJob+"s"] += 1;
  }
    return this.createCreep(body, undefined, {role: creepJob, loaded: false});
}
