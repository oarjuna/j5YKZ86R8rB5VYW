var shared  = require('func.shared');
var roleBuilder = require('role.builder');


module.exports = {
  run: function(creep) {
    // *** switch states ***

    // if creep is bringing energy to a structure but has no energy left
    if (creep.memory.working == true && creep.carry.energy == 0) {
      // switch state
      console.log(creep + " -- harvester -- out of energy");
      creep.memory.working = false;
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      // switch state
      console.log(creep + " -- harvester -- energy capacity full");
      creep.memory.working = true;
    }

    // if creep is supposed to transfer energy to a structure
    if (creep.memory.working == true) {
      // START UNLOAD

      // CONTAINERS
      var structure_container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (s) => (
            ( s.structureType == STRUCTURE_CONTAINER )
          )});

      // SPAWN
      var structure_spawn = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: (s) => (
          ( s.structureType == STRUCTURE_SPAWN )
        )});

      // EXTENSTION
      var structure_extension = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
         filter: (s) => (
                    ( s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity )
                  )});

      // Tower


      if ( creep.room.controller.ticksToDowngrade < 2000 ) {
          var structure = creep.room.controller;
          creep.say("deliv-co");
      }
      else if ( structure_spawn.energy < structure_spawn.energyCapacity) {
        // load the spawn
        var structure = structure_spawn;
        creep.say("deliv-s");
      }
      else if (structure_extension != null) {
          var structure = structure_extension;
          creep.say("deliv.ex");
      }
      else if ( structure_container.store[RESOURCE_ENERGY] < structure_container.storeCapacity) {
          var structure = structure_container;
          creep.say("deliv-cn");
      }
			else {
        // upgrade the controller
        var structure = creep.room.controller;
        creep.say("deliv.co");
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
      creep.say("harvest");
      console.log(creep + " dest " + target_source);
		  if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source);
      }

    } // END HARVEST

  }
};
