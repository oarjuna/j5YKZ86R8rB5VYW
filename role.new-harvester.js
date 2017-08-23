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
      // get a list of closest spawn, extension or tower which is not full
      var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (
          ( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity - 200 ) ||
          ( s.structureType == STRUCTURE_SPAWN && s.energy < s.energyCapacity ) ||
          ( s.structureType == STRUCTURE_CONTAINER && s.energy < s.energyCapacity) ||
          ( s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity )
        )});
    if (structure == null) {
      // if we don't find someplace to drop energy
			if ( creep.room.storage == undefined && creep.room.controller.ticksToDowngrade < 2000 ) {
          // check to see if the controller upgrading
          var structure = creep.room.controller;
					console.log(creep + " " + creep.room.controller.ticksToDowngrade);
      }
			else {
        // otherwise, become a builder
				roleBuilder.run(creep);
			}
		}
    else {
      // we found someplace to drop energy
		  creep.say("s-drop");
		 }

		 console.log(creep + " S: " + structure);
     if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
     // move towards it
      creep.moveTo(structure);
      }
    }
    // END unload
    else {
		  // find closest container with energy and fill up
		  // can't pickup from the large storage as it's the final dropoff point
		  // and that makes them loop infinately at the storage
      var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => (
				s.structureType==STRUCTURE_STORAGE ||
        s.structureType==STRUCTURE_CONTAINER ) &&
        s.store[RESOURCE_ENERGY] > 1
      });
      creep.say("pickup");
		  if ( container == undefined ) {
        //	console.log(creep + " harv --pickup -- " + container );
			  var container = creep.pos.findClosestByRange(FIND_SOURCES);
		    if (creep.harvest(container) == ERR_NOT_IN_RANGE) {
		      creep.moveTo(container);
        }
      }
      else {
        //	console.log(creep + " harv --pickup -- " + container );
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      }
    }
  }
};
