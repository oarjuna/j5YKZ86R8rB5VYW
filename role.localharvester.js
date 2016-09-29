
module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            console.log(creep + " -- localharv -- energy store empty.");
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            console.log(creep + " -- localharv -- energy storage full.");
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
                // find closest container with energy
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType==STRUCTURE_CONTAINER &&
				//s.structureType==STRUCTURE_STORAGE &&
                               s.store[RESOURCE_ENERGY] <2000
                });

		console.log(creep + " --  dropoff container " + container);
                // try to transfer energy, if the container is not in range
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards the container
                        //creep.moveTo(container);
                }

        }
        // if creep is supposed to harvest energy from source
        else {
		var source = creep.memory.destid;
		//var source = '579faa710700be0674d30fd7';
		var target_source = Game.getObjectById(source);

		//console.log(creep + " ttt " + creep.memory.destid);
            	// try to harvest energy, if the source is not in range
            	if (creep.harvest(target_source) == ERR_NOT_IN_RANGE) {
                	// move towards the source
                	creep.moveTo(target_source);
            	}
	    	else {
		//    	console.log(creep + " ttt " + creep.moveTo(target_source));
	    	}		    
       	}
    }
};
