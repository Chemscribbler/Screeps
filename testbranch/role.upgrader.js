var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
      if(creep.carry.energy==creep.carryCapacity && creep.memory.loaded == false){
        creep.memory.loaded = true;
      }
      if(creep.carry.energy == 0 && creep.memory.loaded == true){
        creep.memory.loaded = false;
      }

	    if(creep.memory.loaded == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;
