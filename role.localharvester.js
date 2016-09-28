
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

        if (creep.memory.working == true) {

                // find closest container with energy
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType==STRUCTURE_CONTAINER &&
                               s.store[RESOURCE_ENERGY] <2000
                });

		console.log(creep + " --  dropoff container " + container);
                // try to transfer energy, if the container is not in range
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards the container
                        creep.moveTo(container);
                }

        }
        // if creep is supposed to harvest energy from source
        else {
                // assign a source from the array, based on your local_harvester #
                // ie -- harv0 gets array slot 0
                var source_list =[
                                '579faa710700be0674d30fd7', // north
                                '579faa710700be0674d30fd7', // north
                                '579faa710700be0674d30fd7' // south
                                ];
                var srccount  = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester');
                var srccount = srccount - 1;
                var source = Game.getObjectById(source_list[srccount]);
                console.log(creep + " --  local harv - source " + source);


            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};
