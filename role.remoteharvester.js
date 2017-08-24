module.exports = {
  run: function(creep) {
	  creep.say("!!");
    // get your assignment
    var dest_key = creep.memory.destid;
    if ( dest_key == 'Flag1') {  var gotoFlag = Game.flags.Flag1; }
    else if ( dest_key == 'Flag2') {  var gotoFlag = Game.flags.Flag2; }
    else if ( dest_key == 'Flag3') {  var gotoFlag = Game.flags.Flag3; }
    else if ( dest_key == 'Flag4') {  var gotoFlag = Game.flags.Flag4; }
    else if ( dest_key == 'Flag5') {  var gotoFlag = Game.flags.Flag5; }

    // are we in the room with the flag?
    if ( creep.pos.roomName != gotoFlag.pos.roomName && creep.memory.working != true ) {
	     // not in the room with the flag, move towards the flag
	     creep.moveTo(gotoFlag);
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

      // do stuff
    	if (creep.memory.working == true) {
        // drop off
        var container = '599f20d2c9f2bd7d098da2d5';
        var structure = Game.getObjectById(container);
/*
        // Find CONTAINERS
        var structure_container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => (
              ( s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity - 200)
            )});

        var structure = structure_container;

          */  
    		var action_status = creep.transfer(structure, RESOURCE_ENERGY);
    		if (action_status == ERR_NOT_IN_RANGE) {
				  creep.say("rh-drop");
          creep.moveTo(structure);
        }
      }
      else {
        // find closest source and fill up
        var source = creep.pos.findClosestByRange(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
  		    creep.moveTo(source);
        }
	    }

	   }
  }
};
