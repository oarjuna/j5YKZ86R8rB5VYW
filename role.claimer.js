module.exports = {
	run: function(creep) {
		creep.say("[-]");

		// get your assignment
    var dest_key = creep.memory.destid;
    if ( dest_key == 'Flag1') {  var gotoFlag = Game.flags.Flag1; }
    else if ( dest_key == 'Flag2') {  var gotoFlag = Game.flags.Flag2; }
    else if ( dest_key == 'Flag3') {  var gotoFlag = Game.flags.Flag3; }
    else if ( dest_key == 'Flag4') {  var gotoFlag = Game.flags.Flag4; }
    else if ( dest_key == 'Flag5') {  var gotoFlag = Game.flags.Flag5; }

		// are we in the room with the flag?
		if ( creep.pos.roomName != gotoFlag.pos.roomName ) {
			// No
			moveStatus = creep.moveTo(gotoFlag);
		}
		else {
			// yes, in the room with the flag,

			// look for stuff to do
			var constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
                        var repairStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                        });
			var harvestSite = creep.pos.findClosestByPath(FIND_SOURCES);

			// Switch states
			if (creep.memory.working == true && creep.carry.energy == 0) {
				creep.memory.working = false;
			}
			else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
				creep.memory.working = true;
      }

			// claim the controller if necessary
			var status = creep.claimController(creep.room.controller);
			//console.log(creep + " claimer -- controller status " + status);

			if (status == ERR_NOT_IN_RANGE && status != ERR_INVALID_TARGET) {
				console.log(creep + " claimer -- claiming ");
      	creep.moveTo(creep.room.controller);
      }

      // harvesting
      else if ( harvestSite != undefined  && creep.memory.working == false ) {
				console.log(creep + " claimer -- harvesting");
        if ( creep.harvest(harvestSite) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(harvestSite);
        }
      }

			// construction jobs
      else if ( constructionSite != undefined  && creep.memory.working == true) {
				console.log(creep + " claimer -- building");
        if ( creep.build(constructionSite) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(constructionSite);
        }
			}

			// repair jobs
			else if ( repairStructure != undefined  && creep.memory.working == true ) {
				console.log(creep + " claimer -- repairing");
      	if ( creep.repair(repairStructure) == ERR_NOT_IN_RANGE ) {
        	creep.moveTo(repairStructure);
        }
      }

			// upgrade the controller
			else if ( creep.room.controller.ticksToDowngrade < 2000  && creep.memory.working == true ) {
				console.log(creep + " claimer -- upgrading");
  			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      			creep.moveTo(creep.room.controller);
  			}
			}

			// drop stuff off
			else {
				var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: (s) => s.structureType==STRUCTURE_CONTAINER &&
							s.store[RESOURCE_ENERGY] < 2000
          });

				console.log(creep + " claimer -- transfering energy.");
        if ( creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
					creep.moveTo(container);
        }
			}

		}
	}
};
