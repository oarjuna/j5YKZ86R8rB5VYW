module.exports = {

	// pickup energy from the closest container
	pickupEnergy: function(creep)
	{
		var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    	filter: (s) =>
				(
					( s.structureType==STRUCTURE_LINK && s.energy[RESOURCE_ENERGY] > 90 ) ||
					( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300 ) ||
					( s.structureType==STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 90 )
    )});

		creep.say("++");
		console.log(creep + " ++ " + container);

		if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			console.log(creep + " --- " + container);
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
