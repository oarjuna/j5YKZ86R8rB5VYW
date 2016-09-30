var roleUpgrader = require('role.upgrader');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            console.log(creep + " -- builder -- out of energy.");
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            console.log(creep + " -- builder -- energy storage full.");
            creep.memory.working = true;
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
	    //var constructionSite = Game.getObjectById('57e9bf6830c9d8c674855b40');

            if (constructionSite != undefined) {
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
		    creep.say("build");
                    creep.moveTo(constructionSite);
                }
            }
	else if ( creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)  ) {
		// if you  can find energy laying around //
		var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
			creep.say("drop-pick");
                        creep.moveTo(energy);
                }
		else {
			console.log(creep + " -- build - dropped energy " + creep.pickup(energy[0]));
		}	

		console.log(creep + " -- dropped energy " + energy);
	}
            else {
                // go upgrading the controller
                roleUpgrader.run(creep);
            }
        }
        // need energy?
        else {
		// find closest container with energy 
		var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: (s) => ( s.structureType==STRUCTURE_CONTAINER || 
                                s.structureType==STRUCTURE_STORAGE ) &&
			       s.store[RESOURCE_ENERGY] > 250
    		});

            	// try to transfer energy, if the container is not in range
            	if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                	// move towards the container
                	creep.moveTo(container);
            	}
        }
    }
};
