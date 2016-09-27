var roleUpgrader = require('role.upgrader');

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

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite != undefined) {
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
		    creep.say("build");
                    creep.moveTo(constructionSite);
                }
            }
            else {
                // go upgrading the controller
                roleUpgrader.run(creep);
            }
        }
        // need energy?
        else {
            // find closest source
	    // STRUCTURE_CONTAINER
	    var room = Game.spawns.Spawn1.room;
            var c_structures = room.find(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                   i.store[RESOURCE_ENERGY] > 100
            });
	    var source = c_structures[0];
//
		var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    		filter: function(object) {
			return i.store[RESOURCE_ENERGY] > 100
    		}
		});

		console.log(creep + " -- TAR: " + target);
            // try to transfer energy, if the source is not in range
            if (creep.transfer(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};
