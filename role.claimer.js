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
			moveStatus = creep.travelTo(gotoFlag);
		}
		else {
			// yes, in the room with the flag,

			// look for stuff to do
			var constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);

			var harvestSite = creep.pos.findClosestByPath(FIND_SOURCES, {
							filter: (s) => s.energy > 0

			});

			var repairSite = creep.pos.findInRange(FIND_STRUCTURES, 1, {
				filter: (s) =>
				( s.structureType == STRUCTURE_CONTAINER && s.hits < 200000 )
			});


			// Switch states
			if (creep.memory.working == true && creep.carry.energy == 0) {
				creep.memory.working = false;
			}
			else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
				creep.memory.working = true;
      }

			if ( creep.getActiveBodyparts(CLAIM) ) {
//				var status = creep.claimController(creep.room.controller);
				var status = creep.reserveController(creep.room.controller);
				if (status == ERR_NOT_IN_RANGE ) {
					console.log(creep + " claimer -- moving to controller ");
					creep.travelTo(creep.room.controller);
				}
			}
			// harvesting
			else if ( harvestSite != undefined  && creep.memory.working == false ) {
				//console.log(creep + " claimer -- harvesting");
        if ( creep.harvest(harvestSite) == ERR_NOT_IN_RANGE ) {
                creep.travelTo(harvestSite);
        }
      }
			// construction jobs
			else if ( constructionSite != undefined  && creep.memory.working == true) {
				//console.log(creep + " claimer -- building");
				if ( creep.build(constructionSite) == ERR_NOT_IN_RANGE ) {
								creep.travelTo(constructionSite);
				}
			}
			// upgrade the controller
			else if ( creep.room.controller.ticksToDowngrade < 2000  && creep.memory.working == true ) {
				//console.log(creep + " claimer -- upgrading");
				if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
						creep.travelTo(creep.room.controller);
				}
			}

			// repair stuff
			else if ( ( repairSite[0] != undefined ) && creep.memory.working == true ) {
				creep.say('\uD83D\uDEE0\uFE0F'); // 🛠️
				console.log(creep + " -- repairer --repair --" + repairSite[0] + "--");
				if (creep.repair(repairSite[0]) == ERR_NOT_IN_RANGE) {
					creep.travelTo(repairSite[0]);
				}
			}

			// drop stuff off
			else {
				var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: (s) =>
					( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity ) ||
					( s.structureType==STRUCTURE_SPAWN && s.energy < s.energyCapacity ) ||
					( s.structureType==STRUCTURE_EXTENSION && s.energy < s.energyCapacity )
         		 });

				//console.log(creep + " claimer -- transfering energy.");
        if ( creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
					creep.travelTo(container);
        }
			}



		}
	}
};
