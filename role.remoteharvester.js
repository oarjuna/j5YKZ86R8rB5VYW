module.exports = {
    run: function(creep) {
		creep.say("!!");

                // get your assignment
                var dest_key = creep.memory.destid;
                if ( dest_key == 'Flag1') {  var gotoFlag = Game.flags.Flag1; }

                // are we in the room with the flag?
                if ( creep.pos.roomName != gotoFlag.pos.roomName ) {
                        // not in the room with the flag, move towards the flag
                        moveStatus = creep.moveTo(gotoFlag);
                        console.log(creep + " claimer -movestatus " + moveStatus + " GF " + gotoFlag);
                        console.log(creep + " claimer -CR " + creep.pos.roomName + " FR: " + gotoFlag.pos.roomName);
                }
	
		// attack hostile creeps
		var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(target) {
			console.log(creep + " ALERT -- found hostile creep!" + target);
    			if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        			creep.moveTo(target);
    			}
		}	

        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            console.log(creep + " -- remoteharv -- xfer complete");
            creep.memory.working = false;
	    creep.memory.destid = undefined;
        }

        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            console.log(creep + " -- remoteharv -- energy capacity full. return.");
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
	   var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType==STRUCTURE_STORAGE &&
                               s.store[RESOURCE_ENERGY] < s.storeCapacity
                });
	    if (container != undefined) { var structure = container; }
	    else { var structure = Game.rooms.E58N3.controller; }

	    var action_status = creep.transfer(structure, RESOURCE_ENERGY);

            if (action_status == ERR_NOT_IN_RANGE) {
		creep.say("rh-drop");
                creep.moveTo(structure);
            }
        }
        // creep is supposed to harvest energy from source
        else {
		var dest_key = creep.memory.destid;
		if ( dest_key == 'Flag1') {  dest = Game.flags.Flag1; }
		else if ( dest_key == 'Flag2') {  dest = Game.flags.Flag2; }
		else if ( dest_key == 'Flag3') {  dest = Game.flags.Flag4; }
		else if ( dest_key == 'Flag4') {  dest = Game.flags.Flag4; }
		else if ( dest_key == 'Flag5') {  dest = Game.flags.Flag1; }
		else { dest = 'error'; }
	    }
	    else {
		// Flag1 test logic
		var flag_id = '579faa610700be0674d30e48';	
		var source = Game.getObjectById(flag_id);
		console.log(creep + " Flag1 test " + flag_id + " -- " + source);
                // try to harvest energy, if the source is not in range
 	               if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                       // move towards the source
                       creep.say("!!");
                       creep.moveTo(source);
		}
	    }

        }
    }
};
