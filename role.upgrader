module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        console.log("C: " + creep + " upgrader");

        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            creep.memory.destid = null;
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // instead of upgraderController we could also use:
            // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            // try to upgrade the controller
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.moveTo(creep.room.controller);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // do I have a source?
            if (creep.memory.destid == null ) {
            //if ( true ) {
                // No, pick one randonmly
                var randomnum = _.random(0,1)
                var room = Game.spawns.Spawn1.room;
                var source_new = room.find(FIND_SOURCES);
                
                creep.memory.destid = source_new[randomnum].id;
                
                var source = creep.memory.destid;
                
                console.log("C: " + creep + " -- assigned source: " + creep.memory.destid);
              
            }
            // find closest source
           // var source = creep.pos.findClosestByPath(FIND_SOURCES);
            var source = Game.getObjectById(creep.memory.destid);

            
            console.log("C: " + creep + " -- source: " + source);
            
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
            
        }
    }
};
