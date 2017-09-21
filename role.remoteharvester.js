module.exports = {
  run: function(creep) {

    // get your assignment
    var dest_flag = creep.memory.destid;
    var gotoFlag = Game.flags[dest_flag];

    // are we in the room with the flag?
    if ( creep.pos.roomName != gotoFlag.pos.roomName && creep.memory.working != true ) {
	     // not in the room with the flag, move towards the flag
	     creep.travelTo(gotoFlag);
       creep.say("\uD83D\uDE9A.!!");
    }
    else {
      // switch states
    	if (creep.memory.working == true && creep.carry.energy == 0) {
        // if creep is bringing energy to a structure but has no energy left
    		creep.memory.working = false;
    	}
    	else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        // if creep is harvesting energy but is full
        creep.memory.working = true;
    	}

    	 if (creep.memory.working == true) {
        // drop off
        var container = creep.memory.return_id;
        var structure = Game.getObjectById(container);
    		var action_status = creep.transfer(structure, RESOURCE_ENERGY);

      	if (action_status == ERR_NOT_IN_RANGE) {
				  creep.say("\uD83D\uDE9A.st");
          creep.travelTo(structure);
        }
      }
      else {
        // find closest source and fill up
        var source = creep.pos.findClosestByPath(FIND_SOURCES);

/*
        var source = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
      			filter: (s) => s.structureType==STRUCTURE_STORAGE
      	});
*/

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        //if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
  		    creep.travelTo(source);
          creep.say("\uD83D\uDE9A.so");
        }

	    }

	   }
  }
};
