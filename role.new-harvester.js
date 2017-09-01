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
      var structure_link = creep.pos.findInRange(FIND_MY_STRUCTURES, {
          filter: (s) => (
            s.structureType == STRUCTURE_LINK &&
            s.energy < s.energyCapacity
      )},6);

      console.log(creep + " SL:  " + structure_link);
      // Find storage
      var structure_storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) => (
                ( s.structureType == STRUCTURE_STORAGE )
              )});

      if ( creep.room.controller.ticksToDowngrade < 200 ) {
          // Emergency controller upgrade
          var structure = creep.room.controller;
          creep.say("deliv-ER");
      }
      else if ( structure_link != undefined ){
        // Load the closest link
        var structure = structure_link;
        creep.say("deliv.li");
        var deliv_link = true;
      }
      else if ( structure_container != null ) {
        // Load a container
        var structure = structure_container;
        creep.say("deliv-cn");
      }
			else {
        // drop off at storage
        var structure = structure_storage;
        creep.say("deliv.ST");
			}


      if ( deliv_link == true ) {
        if ( creep.transfer(structure, RESOURCE_ENERGY) != 0 ) {
          creep.moveTo(structure);
        }
      }
      else if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
      creep.say("harvest");
    //console.log(creep + " dest " + target_source);
		  if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source);
      }

    } // END HARVEST

  }
};
