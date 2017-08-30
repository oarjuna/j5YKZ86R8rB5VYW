module.exports = {

	// pickup energy from the closest container
	pickupEnergy: function(creep)
	{


	// TODO ??????
		if ( creep.memory.role == 'upgrader' && creep.memory.destid != '000000000000000000000001' ) {
			// upgraders, with destids Find receiving link w/ energy
			let rec_link_id = creep.memory.destid;
			tmp_c = Game.getObjectById(rec_link_id);
			//console.log("xxxx " + tmp_c + " " + rec_link_id);
			if ( tmp_c.energy > 90 ) { container = tmp_c; }
		}

		else {
			// Find containers with energy
			var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
	    	filter: (s) =>
					(
						( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 200 )
	    )});
		}


		if ( container == undefined ) {
			// otherwise, go to storage
			container = creep.room.storage;
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
