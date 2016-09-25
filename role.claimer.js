module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
	creep.say("!!");
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

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // instead of claimerController we could also use:
            // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            // try to upgrade the controller
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.moveTo(creep.room.controller);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // dOo I have a source?
            if (creep.memory.destid == null ) {
		var claimers_tmp = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
		claimers_tmp = claimers_tmp - 1;
		console.log(creep + " XXX  -- " + claimers_tmp);

            }
            var source = Game.getObjectById(creep.memory.destid);
            
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
            
        }
    }
};
