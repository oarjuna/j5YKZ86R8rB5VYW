var shared  = require('func.shared');

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
               filter: (s) => (
                         	( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity - 200 ) ||
				s.structureType == STRUCTURE_SPAWN ||
                         	s.structureType == STRUCTURE_EXTENSION
				)
                             	&& s.energy < s.energyCapacity
            });


            // if we found one
            if (structure != undefined) {
		creep.say("sp-drop");
            }
	    else {
		creep.say("st-drop");
	    	var structure = creep.room.storage;
	    }

            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards it
            	creep.moveTo(structure);
            }

        }
        else {
		// find closest container with energy and fill up
		// can't pickup from the large storage as it's the final dropoff point
		// and that makes them loop infinately at the storage
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType==STRUCTURE_CONTAINER &&
                               s.store[RESOURCE_ENERGY] > 199
                });

                //console.log(creep + " harv --pickup -- " + container );
                creep.say("pickup");

                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                }

        }
    }
};
