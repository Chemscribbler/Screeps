/*
Room.prototype.orderConstructionSites = function (roomCheck) {
  var priorSort = {
    spawn : 4,
    extension : 3,
    wall : 2,
    road : 1,
    tower: 5
  };
  var sorter = function(a, b){
    return priorSort[a]-priorSort[b];
  };
  var unsortedSites = Game.room[roomCheck].find(FIND_CONSTRUCTION_STIES);
  var sortedSites = unsortedSites.sort(sorter(A.type, B.type));
  console.log(sortedSites);
};


Room.prototype.creepSpawnDecider = function(roomCheck){
  var hostiles = Game.rooms[roomCheck].find(FIND_HOSTILE_CREEPS);
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var meleeDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'mDefender');
  var rangedDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'rDefender');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
  var trucks = _.filter(Game.creeps, (creep) => creep.memory.role == 'truck');
  var numSources = Game.rooms[roomCheck].find(FIND_SOURCES);
  var controllerLevel = Game.rooms[roomCheck].controller.level;
  if(hostiles.length > 0){
    if(numMeleeDefenders.length < hostiles.length){
      return 'mDefender';
    }
    else{
      return 'rDefender';
    }
  }
  else if(numSources > harvesters && (controllerLevel < 3 || miners === 0)){
    return 'harvester';
  }
  else if (upgraders < 3 * numSources) {
    return 'upgrader';
  }
  else if (miners < numSources && controllerLevel > 2){
    return 'miner';
  }
  else if (trucks < miners * 2 && miners >= 1){
    return 'truck';
  }
  else{
    return null;
  };
};
*/
module.exports = function(){
  StructureSpawn.prototype.autoCreateCreep =
  function(energy, roleName, controllerLevel = 0){
    var energyMax = energy;
    var body = [];
    var numOfMove = 0;
    var numOfWork = 0;
    var numOfCarry = 0;
    var i=0;
    var n=0;
    if ((roleName == 'harvester' || 'upgrader' || 'builder') && controllerLevel < 3){

      console.log(energyMax)
      while(i < energyMax){

        if(numOfMove * 4 < numOfWork + numOfCarry || numOfMove == 0){
//          body.push(MOVE);
          i = i + 50;
          numOfMove += 1;
        }
        else if (numOfCarry % numOfWork == 3 || numOfWork == 0) {
//          body.push(WORK);
          i = i + 100;
          numOfWork += 1;
        }
        else{
//          body.push(CARRY);
          i = i + 50;
          numOfCarry += 1
        }
      }
      while(n<numOfCarry+numOfWork+numOfMove){
        while (n < numOfCarry) {
            body.push(CARRY);
            n += 1;
        }
        while(n < numOfCarry + numOfWork){
          body.push(WORK);
          n += 1;
        }
        body.push(MOVE);
        n+=1;
      }
    }
  else if(roleName == 'harvester' && controllerLevel > 2){
      while(n<5){
        body.push(WORK);
        n += 1;
      }
      body.push(MOVE);
    }

  else if (roleName == 'courior' && controllerLevel > 2){
    var parts = energyMax / 150;
    while(n<parts){
      body.push(CARRY);
      body.push(CARRY);
      body.push(MOVE);
      n = n+1
      }
    }



  return this.createCreep(body, undefined, {role: roleName, loaded: false});
  }
}



/*
const sortMap = {
	spawn: 1,
  road: 10,
  wall: 11,
  extension: 2
}

const structures = [
  { type: 'spawn' },
  { type: 'road' },
  { type: 'wall' },
  { type: 'extension' }
];

const result = structures.sort((structureA, structureB) => {
  return sortMap[structureA.type] - sortMap[structureB.type];
});

console.log(result);
