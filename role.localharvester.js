//var roleLocalHarvester = require('role.localharvester');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            console.log(creep + " -- localharv -- energy store empty.");
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            console.log(creep + " -- localharv -- energy storage full.");
            creep.memory.working = true;
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
	    var container_id = '57e9afb83cd48b64657b2501'; // north container
            var container = Game.getObjectById(container_id);
            // if one is found
            if (container != undefined) {
                // try to build, if the container is not in range
                if (creep.transfer(container) == ERR_NOT_IN_RANGE) {
                    // move towards the container
                    creep.moveTo(container);
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
	    var source_id = '579faa710700be0674d30fd7'; // north source
            var source = Game.getObjectById(source_id);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};
