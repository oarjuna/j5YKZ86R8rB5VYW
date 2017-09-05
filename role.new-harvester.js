var shared  = require('func.shared');
var roleBuilder = require('role.builder');


module.exports = {
  run: function(creep) {
    // *** switch states ***

    // TODO -- should be a creep.memory item
    var deliver_to_spawn = false;

    // if creep is bringing energy to a structure but has no energy left
    if (creep.memory.working == true && creep.carry.energy == 0) {
      // switch state
      //console.log(creep + " -- harvester -- out of energy");
      creep.memory.working = false;
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      // switch state
    //  console.log(creep + " -- harvester -- energy capacity full");
      creep.memory.working = true;
    }

    // if creep is supposed to transfer energy to a structure
    if (creep.memory.working == true) {
      // START UNLOAD

      // Find CONTAINERS
      var structure_container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => (
            ( s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity - 100)
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
          creep.say("🚚.ER");
      }

      else if ( structure_link[0] != undefined ){
        // Load the closest link
        var structure = structure_link[0];
        creep.say("🚚.li");
        var deliv_link = true;
      }

      else if ( structure_container != null ) {
        // Load a container
        var structure = structure_container;
        creep.say("🚚.cn");
      }

      else {
        // drop off at storage
        var structure = structure_storage;
        creep.say("🚚.ST");
			}

    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        // move towards it
        creep.moveTo(structure);
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
      creep.say(⛏️);
    //console.log(creep + " dest " + target_source);
		  if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source);
      }

    } // END HARVEST

  }
};
