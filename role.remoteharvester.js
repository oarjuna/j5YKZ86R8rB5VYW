module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
	// identify yourself
        console.log(creep + " remoteharvester");
	
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            console.log("\t" + creep + " -- xfer complete");
            creep.memory.working = false;
        }

        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            console.log("\t" + creep + " -- energy capacity full. return.");
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest spawn, extension or tower which is not full
            var structure = spawn TODO:

            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards it
                console.log("\t" + creep + " -- moving to drop off");
                creep.moveTo(structure);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
	    // move to flag1
		TODO:
			
            // find closest source
            console.log("\t" + creep + " -- looking for energy source");
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                console.log("\t" + creep + " -- moving to source");
                creep.moveTo(source);
            }
        }
    }
};
