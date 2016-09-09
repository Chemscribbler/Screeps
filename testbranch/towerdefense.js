var Towers = {

  Defend: function(roomCheck){

    var hostiles = Game.rooms[roomCheck].find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0) {

      var towers = Game.rooms[roomCheck].find(

          FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

          towers.forEach(tower => tower.attack(hostiles[0]));

        }

    }

}

module.exports = Towers;
