
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
