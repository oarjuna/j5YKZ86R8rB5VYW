var sharedfunctions = require('func.shared');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {

        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
	    console.log(creep + " -- upgrader -- out of energy");
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
	    console.log(creep + " -- upgrader -- energy capacity full");
            creep.memory.working = true;
            creep.memory.destid = null;
        }
	creep.pickupEnergy;
        if (creep.memory.working == true) {
            // upgrade the controller
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
               // find closest container with energy
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => ( s.structureType==STRUCTURE_CONTAINER ||
                                s.structureType==STRUCTURE_STORAGE ) &&
                               s.store[RESOURCE_ENERGY] > 250
                });

		//console.log(creep + " -- upgrader --pickup -- " + container );

                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                }
 
        }
    }
};
