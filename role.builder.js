var shared  = require('func.shared');

module.exports = {
    run: function(creep) {
	     creep.say('\uD83D\uDD28'); // 🔨
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            //console.log(creep + " -- builder -- out of energy.");
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            //console.log(creep + " -- builder -- energy storage full.");
            creep.memory.working = true;
        }

        // complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
           var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            if ( constructionSite != undefined ) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
		                creep.say("build");
                    creep.moveTo(constructionSite);
                }
            }
        }
        else {
          // we'e out of energy
          shared.pickupEnergy(creep)
        }
    }
};
