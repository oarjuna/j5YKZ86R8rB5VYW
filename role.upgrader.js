var shared  = require('func.shared');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {

        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
	    //console.log(creep + " -- upgrader -- out of energy");
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
	    //console.log(creep + " -- upgrader -- energy capacity full");
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
        //  creep.moveTo(creep.room.controller);
        //  creep.signController(creep.room.controller,"Non Servium");
            creep.say('\u2699\uFE0F'); // ⚙️
            // upgrade the controller
            creep.signController(creep.room.controller,"Non Servium");
            creep.moveTo(creep.room.controller);

            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
               // find closest container with energy and fill up
               // if you  can find energy laying around //
                var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES,5);
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                        creep.say("drop-pick");
                        creep.moveTo(energy);
		            }
		            else {
			               shared.pickupEnergy(creep);
		            }
        }
    }
};
