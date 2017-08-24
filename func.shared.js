module.exports = {

	// pickup energy from the closest container
	pickupEnergy: function(creep)
	{
		var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    	filter: (s) =>
				( s.structureType==STRUCTURE_CONTAINER ||
					s.structureType==STRUCTURE_STORAGE ) &&
					s.store[RESOURCE_ENERGY] > 100
    });
		creep.say("pickup");
		if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(container);
		}
	}

/*
	// head to the spawner for regeneration
	regenTTL: function(creep)
	{


	}
*/

};
