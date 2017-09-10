module.exports = {
	run: function(creep) {
		creep.say("[-]");

		// get your assignment
    var dest_key = creep.memory.destid;
    if ( dest_key == 'CFlag1') {  var gotoFlag = Game.flags.CFlag1; }
    else if ( dest_key == 'CFlag2') {  var gotoFlag = Game.flags.CFlag2; }
    else if ( dest_key == 'CFlag3') {  var gotoFlag = Game.flags.CFlag3; }
    else if ( dest_key == 'CFlag4') {  var gotoFlag = Game.flags.CFlag4; }
    else if ( dest_key == 'CFlag5') {  var gotoFlag = Game.flags.CFlag5; }

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
			creep.claimController(creep.room.controller);
			var status = creep.signController(creep.room.controller,"Non Servium");
			console.log(creep + " claimer -- controller status " + status);

			if (status == ERR_NOT_IN_RANGE ) {
				console.log(creep + " claimer -- claiming ");
      	creep.moveTo(creep.room.controller);
      }

      // harvesting
      else if ( harvestSite != undefined  && creep.memory.working == false ) {
				//console.log(creep + " claimer -- harvesting");
        if ( creep.harvest(harvestSite) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(harvestSite);
        }
      }

			// upgrade the controller
			else if ( creep.room.controller.ticksToDowngrade < 5000  && creep.memory.working == true ) {
				//console.log(creep + " claimer -- upgrading");
				if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
						creep.moveTo(creep.room.controller);
				}
			}

			// construction jobs
      else if ( constructionSite != undefined  && creep.memory.working == true) {
				//console.log(creep + " claimer -- building");
        if ( creep.build(constructionSite) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(constructionSite);
        }
			}

			// drop stuff off
			else {
				var container = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
					filter: (s) => s.structureType==STRUCTURE_SPAWN
          });

				//console.log(creep + " claimer -- transfering energy.");
        if ( creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
					creep.moveTo(container);
        }
			}

		}
	}
};
