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
/*
		var structures = creep.pos.lookFor(LOOK_STRUCTURES);
		for ( let foo of structures) {
			console.log(creep + " ST: " + foo);
		}

		if ( creep.memory.role == 'upgrader') {

			console.log(creep + " LI: " + link);
		} else { var link = undefined; }
*/


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
