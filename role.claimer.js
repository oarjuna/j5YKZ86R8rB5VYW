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
			//
		}
        	else {
		}
	}
}
};
