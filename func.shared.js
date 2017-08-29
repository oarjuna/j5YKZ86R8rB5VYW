module.exports = {

	// pickup energy from the closest container
	pickupEnergy: function(creep)
	{
		var container = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    	filter: (s) =>
				(
					( s.structureType==STRUCTURE_LINK && s.store[RESOURCE_ENERGY] > 90 ) &&
					( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 90 ) &&
					( s.structureType==STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 90
    });

		creep.say("++");

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
