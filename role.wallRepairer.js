var roleBuilder = require('role.builder');
//xxxxxx
module.exports = {
    // a function to run the logic for this role
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
            // find all walls in the room
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });

            var target = undefined;

            // loop with increasing percentages
            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                // find a wall with less than percentage hits

                // for some reason this doesn't work
                // target = creep.pos.findClosestByPath(walls, {
                //     filter: (s) => s.hits / s.hitsMax < percentage
                // });

                // so we have to use this
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_WALL &&
                                   s.hits / s.hitsMax < percentage
                });

                // if there is one
                if (target != undefined) {
                    // break the loop
                    break;
                }
            }

            // if we find a wall that has to be repaired
            if (target != undefined) {
                // try to repair it, if not in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(target);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        }
        else {
               // find closest container with energy
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType==STRUCTURE_CONTAINER &&
				s.structureType==STRUCTURE_STORAGE &&
                               s.store[RESOURCE_ENERGY] > 0
                });

                // try to transfer energy, if the container is not in range
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards the container
                        creep.moveTo(container);
                }

        }
    }
};

