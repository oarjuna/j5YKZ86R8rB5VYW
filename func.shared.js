module.exports = {

	// pickup energy from the closest container
	pickupEnergy: function(creep)
	{


	// TODO ?????? This is not good, clean it up
		if ( ( creep.memory.role == 'upgrader' || creep.memory.role == 'deliverer' ) && creep.memory.destid != '000000000000000000000001' ) {
			// upgraders and deliverers  with destids Find receiving link w/ energy
			let rec_link_id = creep.memory.destid;
			tmp_c = Game.getObjectById(rec_link_id);
			//console.log("xxxx " + tmp_c + " " + rec_link_id);
			if ( tmp_c.energy > 90 ) { container = tmp_c; }
		}
		console.log(creep + "--" + creep.memory.role + " ++ " + container);

		if ( container == undefined ) {
			// Find containers with energy
			var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
	    	filter: (s) =>
					(
						( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 200 ) ||
						( s.structureType==STRUCTURE_LINK && s.energy > 200 ) ///  TODO - needs to receiving link only -- pass Empire to creeps?
	    )});
		}


		if ( container == undefined ) {
			// otherwise, go to storage
			container = creep.room.storage;
		}

		creep.say("++");
		//console.log(creep + "--" + creep.memory.role + " ++ " + container);

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
