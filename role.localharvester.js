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

	    var container_id = '57e9bb84c345ba440e136382'; // north container

	    	// assign a container from the array, based on your local_harvester #
		// ie -- harv0 gets array slot 0
		var containers =[
		    		'57e9bb84c345ba440e136382',
		    		'57e9bb84c345ba440e136382',
				'57e9bb84c345ba440e136382',
				'unknown'
				];
		var lhcount  = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester');
		var lhcount = lhcount - 1;
		var target_source = Game.getObjectById(containers[lhcount]);
		console.log(creep + " --  dropoff container " + target_source);

				
            var container = Game.getObjectById(container_id);
            // if one is found
            if (container != undefined) {
                // try to build, if the container is not in range
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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

                // assign a container from the array, based on your local_harvester #
                // ie -- harv0 gets array slot 0
                var source_list =[
                                '57e9bb84c345ba440e136382',
                                '57e9bb84c345ba440e136382',
                                '57e9bb84c345ba440e136382',
                                'unknown'
                                ];
                var srccount  = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester');
                var srccount = srccount - 1;
                var target_source = Game.getObjectById(source_list[srccount]);
                console.log(creep + " --  local harv - source " + target_source);


            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};
