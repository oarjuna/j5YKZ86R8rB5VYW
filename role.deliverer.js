var shared  = require('func.shared');

module.exports = {
  run: function(creep) {
    // Switch States

    // when creep is xfering energy to a structure and has no energy left to xfer
    if (creep.memory.working == true && creep.carry.energy == 0) {
      // switch state
      //console.log(creep + " -- deliv -- out of energy");
      creep.memory.working = false;
    }
    // when creep is harvesting energy and becomes full
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      // switch state
      //console.log(creep + " -- deliv -- energy capacity full");
      creep.memory.working = true;
    }

    // Do stuff

    if (creep.memory.working == true) {
      // When Full
      // Decide where to go

      // Find the SPAWN
      var structure_spawn = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: (s) => (
          ( s.structureType == STRUCTURE_SPAWN )
        )});

      // Find EXTENSTIONs
      var structure_extension = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
         filter: (s) => (
            ( s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity )
          )});

      // Find Towers
      var structure_tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
         filter: (s) => (
            ( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity - 250 )
          )});

	    // Find storage
	    var structure_storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
	    filter: (s) => (
            ( s.structureType == STRUCTURE_STORAGE )
      )});

      // find the sending links
      var rec_link = creep.memory.destid;
      var structure_link = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => (
          ( s.structureType == STRUCTURE_LINK && s.id != rec_link )
      )});

      if ( creep.room.controller.ticksToDowngrade < 500 ) {
          // Emergency controller upgrade
          var structure = creep.room.controller;
          creep.say("deliv-co");
      }
      else if ( structure_spawn.energy < structure_spawn.energyCapacity) {
        // load the spawn
        var structure = structure_spawn;
        creep.say("deliv-s");
      }
      else if (structure_extension != null) {
        // Load the extension
        var structure = structure_extension;
        creep.say("deliv.ex");
      }
      else if ( structure_tower != null ) {
        // Load a container
        var structure = structure_tower;
        creep.say("deliv-tw");
      }
      else if ( structure_link != undefined && structure_link.energy < structure_link.energyCapacity - 200) {
        // Load a sending link
        var structure = structure_link;
        creep.say("deliv-li");
      }
      else {
        // drop off at storage
        var structure = structure_storage;
        creep.say("deliv.ST");
	}

      if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure);
      }

      } // End UNLOAD
      else {
        // Pick up more energy
        shared.pickupEnergy(creep);
      } // EnD LOAD

  }
};
