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
            ( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity)
          )});

	// Find storage
	var structure_storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
	filter: (s) => (
            ( s.structureType == STRUCTURE_STORAGE )
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
      else if ( structure_storage != null ) {
	var structure = structure_storage;
	creep.say("deliv-st");
     }
      else {
        // upgrade the controller
        var structure = creep.room.controller;
        var contr_flag = true;
        creep.say("deliv.XX");
      }

      if ( contr_flag == true ) {
          if (creep.upgradeController(structure) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
          }
      }
      else {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }

    } // End UNLOAD
    else {
      // when Empty
      // Pick up more energy
      shared.pickupEnergy(creep);
    } // EnD LOAD

  }
};
