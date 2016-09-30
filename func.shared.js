module.exports = {
	// create a new function for pickup energy 
	// pickup energy from the closest container
	pickupEnergy: function(creep)
	{
		//console.log(creep + "TESTING SHARED FUNC " + foo);
               // find closest container with energy and fill up
		//var shared  = require('func.shared');
  	       // shared.pickupEnergy(creep);

                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => ( s.structureType==STRUCTURE_CONTAINER ||
                                s.structureType==STRUCTURE_STORAGE ) &&
                               s.store[RESOURCE_ENERGY] > 250
                });

                console.log(creep + " TEST --pickup -- " + container );
		creep.say("pickup");

                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                }

	}
};
