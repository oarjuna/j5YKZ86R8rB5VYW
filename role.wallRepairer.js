var shared  = require('func.shared');
var roleBuilder = require('role.builder');

module.exports = {
    run: function(creep) {
        // if creep is trying to repair something but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to repair something
        if (creep.memory.working == true) {
            var target = undefined;

            // loop with increasing percentages
            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                // find a wall with less than percentage hits
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (
				s.structureType == STRUCTURE_WALL ||
				s.structureType == STRUCTURE_RAMPART
				) && 	
                                   s.hits / s.hitsMax < percentage
                });
                // if there is one, break the loop
                if (target != undefined) { break; }
            }

            // if we find a wall that has to be repaired
            if (target != undefined) {
                // try to repair it, if not in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            // if we can't fine one, become a builder
            else {  roleBuilder.run(creep); }
        }
        else {
               // find closest container with energy and fill up
                shared.pickupEnergy(creep);


        }
    }
};

