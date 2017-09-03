module.exports = {
  run: function(creep) {

    // get your assignment
    var dest_flag = creep.memory.destid;
    var gotoFlag = Game.flag.dest_flag;

    /*
    if ( dest_flag == 'Flag1') {  var gotoFlag = Game.flags.Flag1; }
    else if ( dest_flag == 'Flag2') {  var gotoFlag = Game.flags.Flag2; }
    else if ( dest_flag == 'Flag3') {  var gotoFlag = Game.flags.Flag3; }
    else if ( dest_flag == 'Flag4') {  var gotoFlag = Game.flags.Flag4; }
    */

    // are we in the room with the flag?
    if ( creep.pos.roomName != gotoFlag.pos.roomName && creep.memory.working != true ) {
	     // not in the room with the flag, move towards the flag
	     creep.moveTo(gotoFlag);
       creep.say("rh.!!");
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
        var container = creep.memory.storage;
        var structure = Game.getObjectById(container);
    		var action_status = creep.transfer(structure, RESOURCE_ENERGY);

      	if (action_status == ERR_NOT_IN_RANGE) {
				  creep.say("rh.st");
          creep.moveTo(structure);
        }
      }
      else {
        // find closest source and fill up
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
  		    creep.moveTo(source);
          creep.say("rh.so");
        }

	    }

	   }
  }
};
