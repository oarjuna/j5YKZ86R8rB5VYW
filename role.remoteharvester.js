module.exports = {
    run: function(creep) {
	creep.say("!!");

        // get your assignment
        var dest_key = creep.memory.destid;
        if ( dest_key == 'Flag1') {  var gotoFlag = Game.flags.Flag1; }
        else if ( dest_key == 'Flag2') {  var gotoFlag = Game.flags.Flag2; }

	// attack hostile creeps
	var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if(target) {
		console.log(creep + "ALERT -- found hostile creep!" + target);
    		if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        		creep.moveTo(target);
    		}
	}

        // are we in the room with the flag?
	if ( creep.pos.roomName != gotoFlag.pos.roomName && creep.memory.working != true ) {
		// not in the room with the flag, move towards the flag
		moveStatus = creep.moveTo(gotoFlag);
                console.log(creep + " remoteharv -movestatus " + moveStatus + " GF " + gotoFlag);
                console.log(creep + " removeharv -CR " + creep.pos.roomName + " FR: " + gotoFlag.pos.roomName);
	}	
	else {
        	// if creep is bringing energy to a structure but has no energy left
        	if (creep.memory.working == true && creep.carry.energy == 0) {
            		console.log(creep + " -- remoteharv -- xfer complete");
            		creep.memory.working = false;
        	}

        	// if creep is harvesting energy but is full
        	else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
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
        	else {
               		// find closest container with energy and fill up
                	var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                		filter: (s) => s.structureType==STRUCTURE_CONTAINER 
                		});

			if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(container);
			}
	    	}
	}
    }
};
