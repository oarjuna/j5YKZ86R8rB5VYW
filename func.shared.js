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

// TODO
		if ( creep.memory.role == 'upgrader' && creep.memory.destid != '000000000000000000000001' ) {
			let foo = creep.memory.destid;
			tmp_c = Game.getObjectById(foo);
			console.log("xxxx " + tmp_c + " " + foo);
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
