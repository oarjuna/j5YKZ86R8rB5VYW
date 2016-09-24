module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
	
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            console.log(creep + " -- remoteharv -- xfer complete");
            creep.memory.working = false;
        }

        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            console.log(creep + " -- remoteharv -- energy capacity full. return.");
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
	    var structure = Game.rooms.E58N3.controller;
            //var structure = Game.spawns.Spawn1;

	    var room = Game.spawns.Spawn1.room;
	    var containersWithEnergy = room.find(FIND_STRUCTURES, {
		        filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
		    			i.structureType == STRUCTURE_TOWER// &&
		                       //i.store[RESOURCE_ENERGY] < 2000
	    });
	    console.log("CT: " + containersWithEnergy);

            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards it
		creep.say("drop");
                creep.moveTo(structure);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
	    if (creep.memory._move == undefined ) {
		creep.moveTo(Game.flags.Flag1);
	    }
	    //console.log(creep + " -- remoteharv -- in " + creep.memory._move.room);
	    if (creep.memory._move.room == 'E58N3' ) {
	        // move to flag1
		creep.say("flag");
	    	creep.moveTo(Game.flags.Flag1);
	    }	
	    else {
            	// when you get ther, find closest source and harvest
            	//console.log(creep + " --  remoteharv -- looking for energy source");
            	var source = creep.pos.findClosestByPath(FIND_SOURCES);
            	// try to harvest energy, if the source is not in range
            	if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                	// move towards the source
			creep.say("source");
                	creep.moveTo(source);
            	}
	    }
        }
    }
};
