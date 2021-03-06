var shared  = require('func.shared');
var roleBuilder = require('role.builder');


module.exports = {
  run: function(creep) {
    // *** switch states ***

    // TODO -- should be a creep.memory item
    var deliver_to_spawn = false;
//_.sum(structure.store) < structure.storeCapacity
    // if creep is bringing a  resource to a structure but has no resource left
    if (creep.memory.working == true && _.sum(creep.carry) == 0) {
      // switch state
      //console.log(creep + " -- harvester -- out of a resource");
      creep.memory.working = false;
    }
    // if creep is harvesting a resource but is full
    else if (creep.memory.working == false && _.sum(creep.carry) == creep.carryCapacity) {
      // switch state
    //  console.log(creep + " -- harvester -- capacity full");
      creep.memory.working = true;
    }

    // if creep is supposed to transfer a resource to a structure
    if (creep.memory.working == true) {
      // START UNLOAD

      // Find CONTAINERS
      var structure_container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => (
            ( s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < s.storeCapacity - 100)
          )});

      // Find links
      var structure_link = creep.pos.findInRange(FIND_MY_STRUCTURES, 2, {
        filter: (s) => (
          ( s.structureType == STRUCTURE_LINK && s.energy != s.energyCapacity )
      )});

      //console.log(creep + " SL:  " + structure_link[0]);
      //var structure_link = undefined;

      // Find storage
      var structure_storage = creep.room.storage;

      if ( creep.room.controller.ticksToDowngrade < 200 ) {
          // Emergency controller upgrade
          var structure = creep.room.controller;
          creep.say('\uD83D\uDE9A.ER'); // 🚚
      }

      else if ( structure_link[0] != undefined ){
        // Load the closest link
        var structure = structure_link[0];
        creep.say('\uD83D\uDE9A.li'); // 🚚
        var deliv_link = true;
      }

      else if ( structure_container != null ) {
        // Load a container
        var structure = structure_container;
        creep.say('\uD83D\uDE9A.st'); // 🚚
      }

      else {
        // drop off at storage
        var structure = structure_storage;
        creep.say('\uD83D\uDE9A'); // 🚚
			}

      for(const resourceType in creep.carry) {
          status = creep.transfer(structure, resourceType);
      }

      if (status == ERR_NOT_IN_RANGE) {
          // move towards it
          creep.travelTo(structure);
        }
      }
    // END unload
    else {
      // START HARVESTING
      var mem_source = creep.memory.destid;
      var target_source = Game.getObjectById(mem_source);

      if ( target_source == null) {
        var source = creep.pos.findClosestByRange(FIND_SOURCES);
      }
      else {
        var source = target_source;
      }
      creep.say('\u26CF'); //  ⛏
      //console.log(creep + " dest " + source);

      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    status = creep.travelTo(source);
        //Log.debug(creep + " "+ status );
      }

    } // END HARVEST

  }
};
