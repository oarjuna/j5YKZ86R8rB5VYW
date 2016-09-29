var roleBuilder = require('role.builder');

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
	    console.log(creep + " -- repairer -- out of energy")
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
	    console.log(creep + " -- repairer -- full of energy")
            creep.memory.working = true;
        }

        // find someting to repair
        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
		creep.say("repair");
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        }
        else {
               // find closest container with energy
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => ( s.structureType==STRUCTURE_CONTAINER ||
                                s.structureType==STRUCTURE_STORAGE ) &&
                               s.store[RESOURCE_ENERGY] > 250
                });

                console.log(creep + " -- repairer --pickup -- " + container );

                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                }
        }
    }
};
