var shared  = require('func.shared');

module.exports = {
  run: function(creep) {

    // Switch States
    // when creep is xfering energy to a structure and has no energy left to xfer
    if (creep.memory.working == true && _.sum(creep.carry) == 0) {
      // switch state
      //console.log(creep + " -- deliv -- out of energy");
      creep.memory.working = false;
      creep.memory.carrytype = 'none';
    }
    // when creep is harvesting energy and becomes full
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      // switch state
      //console.log(creep + " -- deliv -- energy capacity full");
      creep.memory.working = true;
      creep.memory.carrytype = 'energy';
    }
    else if (creep.memory.working == false && _.sum(creep.carry) == creep.carryCapacity){
      creep.memory.working = true;
      creep.memory.carrytype = 'mineral';
    }

    // Do stuff

    if (creep.memory.working == true) {
      // When Full
      // Decide where to go
      if ( creep.memory.carrytype == 'mineral' ) {
        var structure = creep.room.storage;
        creep.say('\u26A0.KK'); // 🚚
       for(const resourceType in creep.carry) {
           status = creep.transfer(structure, resourceType);
           if (status == ERR_NOT_IN_RANGE ) {
               creep.moveTo(structure);
           }
       }
      }
      else {
        // Find the SPAWN and extensions
        var structure_spawn = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
          filter: (s) => (
            ( s.structureType == STRUCTURE_SPAWN && s.energy < s.energyCapacity ) ||
            ( s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity )
          )});

        // Find Towers
        var structure_tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
           filter: (s) => (
              ( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity - 250 )
            )});

  	    // Find storage
  	    var structure_storage = creep.room.storage;

        // find the sending links
        var rec_link = creep.memory.destid;
        var structure_link = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (s) => (
            ( s.structureType == STRUCTURE_LINK && s.id != rec_link )
        )});



        if ( creep.room.controller.ticksToDowngrade < 500 ) {
            // Emergency controller upgrade
            var structure = creep.room.controller;
            creep.say('\uD83D\uDE9A.ER'); // 🚚
        }

        else if ( creep.room.controller.memory.alert_state == 'red' && structure_tower != null ) {
          // Load a container
          var structure = structure_tower;
          creep.say('\u26A0.tw'); // 🚚
        }

        else if ( structure_spawn != null ) {
          // Load the extension or spawn
          var structure = structure_spawn;
          creep.say('\uD83D\uDE9A.+sp'); // 🚚;
        }

        else if ( structure_tower != null ) {
          // Load a container
          var structure = structure_tower;
          creep.say('\uD83D\uDE9A.+tw'); // 🚚
        }

        else if ( structure_link != undefined && structure_link.energy < structure_link.energyCapacity - 500) {
          // Load a sending link
          var structure = structure_link;
          creep.say('\uD83D\uDE9A.+li'); // 🚚
        }

        else {
          // drop off at storage
          var structure = structure_storage;
          creep.say('\uD83D\uDE9A.+st'); // 🚚
  	     }
       }

       status = creep.transfer(structure, RESOURCE_ENERGY);
       if (status == ERR_NOT_IN_RANGE ) {
           creep.moveTo(structure);
       }
      } // End UNLOAD

      else {
//*/
        // Find container with resoures
        var res_container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (s) =>
            (
              ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_KEANIUM] >= 400 ) ||
              ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_LEMERGIUM] >= 400 ) ||
              ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_OXYGEN] >= 400 )

        )});

        console.log(creep + " RES: " + res_container);

          var ryanflag = true;

          if ( res_container && ryanflag == true ) {
          //status = creep.withdraw(res_container, RESOURCE_KEANIUM);
          for(const resourceType in creep.carry) {
              status = creep.withdraw(res_container, resourceType);
          }
          if (status == ERR_NOT_IN_RANGE) {
            creep.say("KK");
            creep.moveTo(res_container);
          }
        }

        else {
          // Pick up more energy
          shared.pickupEnergy(creep);
        }
//*/
        //shared.pickupEnergy(creep);

    } // EnD LOAD

  }
};
