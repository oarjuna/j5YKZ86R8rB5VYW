module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            console.log(creep + " -- harvester -- out of energy");
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            console.log(creep + " -- harvester -- energy capacity full");
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest spawn, extension or tower which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
               filter: (s) => (s.structureType == STRUCTURE_SPAWN
                         || s.structureType == STRUCTURE_EXTENSION
                         || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });

            // if we found one
            if (structure != undefined) {
                console.log(creep + " -- harvester -- transfering.");
                // try to transfer energy, if it is not in range
		creep.say("drop");
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    //console.log(creep + " -- harvester -- moving to drop off");
                    creep.moveTo(structure);
                }
            }
	    else {
		console.log(creep + " -- harvester -- did not find a structure to xfer to!");
	    }
        }
        // if creep is supposed to harvest energy from source
        else {
            	// find closest source
            	//console.log(creep + " -- harvester -- looking for energy source");
            	var s_source = creep.pos.findClosestByPath(FIND_SOURCES);
		var room = Game.spawns.Spawn1.room;

            	var c_structures = room.find(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                       i.store[RESOURCE_ENERGY] > 0
            	});


		// take the first one off the list
            	var c_source = c_structures[0];

		if ( c_source != undefined ) { var source = c_source; }
		else { var source = creep.pos.findClosestByPath(FIND_SOURCES); }

       	    	creep.say("harv");
            	// try to harvest energy, if the source is not in range
            	if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                	// move towards the source
                	// console.log(creep + " -- harvester -- moving to harvest");
                	creep.moveTo(source);
            	}
	    	else {
			//console.log(creep + " -- harvester -- harvesting");
	    	}
        }
    }
};
