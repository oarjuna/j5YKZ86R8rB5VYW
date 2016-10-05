
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
                var old_cont = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType==STRUCTURE_CONTAINER &&
				//s.structureType==STRUCTURE_STORAGE &&
                               s.store[RESOURCE_ENERGY] <2000
                });

		var link =  creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.structureType==STRUCTURE_LINK,1 });

		if ( link == undefined ) { 
			var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (s) => s.structureType==STRUCTURE_CONTAINER 
			});
		}
		else {
			var container = link;
		}

		console.log(creep + " --  dropoff " + container);
                // try to transfer energy, if the container is not in range
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // dont move towards the container
                        //creep.moveTo(container);
                }

        }
        // if creep is supposed to harvest energy from source
        else {
		var source = creep.memory.destid;
		var target_source = Game.getObjectById(source);

		//console.log(creep + " ttt " + creep.memory.destid);
            	// try to harvest energy, if the source is not in range
            	if (creep.harvest(target_source) == ERR_NOT_IN_RANGE) {
                	creep.moveTo(target_source);
            	}
        	else if ( creep.pos.findInRange(FIND_DROPPED_ENERGY,1)  ) {
                	// if you  can find energy laying around //
                	var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY,1);
			status = creep.pickup(energy[0]);
                       	//console.log(creep + " -- dropped energy " + status);
        	}
       	}
    }
};
