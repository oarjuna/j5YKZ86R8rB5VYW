var shared  = require('func.shared');
var roleHarv = require('role.harvester');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            console.log(creep + " -- builder -- out of energy.");
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            console.log(creep + " -- builder -- energy storage full.");
            creep.memory.working = true;
        }

        // complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
           //var constructionSite = Game.getObjectById("57ee747d1bc46fa650bf2aa9");

            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
		    creep.say("build");
                    creep.moveTo(constructionSite);
                }
            }
	else if ( false  ) {
	//else if ( creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)  ) {
		// if you  can find energy laying around //
		var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
			creep.say("drop-pick");
                        creep.moveTo(energy);
                }
		else {
			console.log(creep + " -- build - dropped energy " + creep.pickup(energy));
			console.log(creep + " -- build dropped energy " + energy);
		}	

	}
            else {
                roleHarv.run(creep);
            }
        }
        else {
               // find closest container with energy and fill up
		shared.pickupEnergy(creep);
        }
    }
};
