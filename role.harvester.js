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
               filter: (s) => (s.structureType == STRUCTURE_SPAWN
                         || s.structureType == STRUCTURE_EXTENSION
                         || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });


            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
		creep.say("sp-drop");
            }
	    else {
		creep.say("st-drop");
		//var structure = creep.room.controller;
	    	var structure = creep.room.storage;
	    }

            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards it
		console.log(creep + " -- harv -- storage -- " + structure );
            	creep.moveTo(structure);
            }

        }
        else {
               // find closest container with energy
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                //filter: (s) => ( s.structureType==STRUCTURE_CONTAINER &&
                filter: (s) => ( s.structureType==STRUCTURE_STORAGE &&
                               s.store[RESOURCE_ENERGY] > 500
			       {});
		console.log(creep + " -- harv --pickup -- " + structure );

                // try to transfer energy, if the container is not in range
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards the container
                        creep.moveTo(container);
                }


        }
    }
};
