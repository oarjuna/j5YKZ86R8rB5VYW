module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
	creep.say("!!");
	console.log(creep + " -- claimer");
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
	    console.log(creep + " -- claimer -- out of energy");
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
	    console.log(creep + " -- claimer -- energy capacity full");
            creep.memory.working = true;
            creep.memory.destid = null;
        }
	//creep.memory.working = true;
        // if creep is supposed to transfer energy to the controller
	creep.memory.working = true;
        if (creep.memory.working == true) {
		var claim_room = ["579faa820700be0674d31159","579faa820700be0674d31159","E58N4","E58N3","E58N2"];
		// 579faa610700be0674d30e47 -- E57N3
		// 579faa820700be0674d31159 -- E59N3
		var claimers_tmp = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
		claimers_tmp = claimers_tmp - 1;
          	var target_controller = Game.getObjectById(claim_room[claimers_tmp]);
		console.log(creep + " XXX  -- " + target_controller);

            	// try to upgrade the controller
            if (creep.reserveController(target_controller) == ERR_NOT_IN_RANGE) {
            //if (creep.attackController(target_controller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
		console.log(creep + " -- claimer -- moving to  " + target_controller);
                creep.moveTo(target_controller);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // do I have a source?
            console.log(creep + " -- claimer -- looking for energy source");
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }

    }
};
