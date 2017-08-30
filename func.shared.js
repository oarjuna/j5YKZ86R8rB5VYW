module.exports = {

	// pickup energy from the closest container
	pickupEnergy: function(creep)
	{

		var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    	filter: (s) =>
				(
					( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300 )
    )});

		if ( container == undefined ) {
			container = creep.room.storage;
		}

		if ( creep.memory.role == 'upgrader' ) {
			tmp_c = Game.getObjectById(creep.memory.destid);
			console.log("xxxx " + (creep.memory.destid);
			//if ( tmp_c.energy > 90 ) { container = tmp_c; }
		}

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
