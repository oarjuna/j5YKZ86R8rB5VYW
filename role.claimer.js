module.exports = {
	run: function(creep) {
	creep.say("[-]");

	// array search function
	function contains(a, obj) {
		for (var i = 0; i < a.length; i++) {
       			if (a[i] === obj) { return true; }
    		}
    	return false;
	}


	// get your assignment
        var dest_key = creep.memory.destid;
        if ( dest_key == 'Flag1') {  var gotoFlag = Game.flags.Flag1; }
        else if ( dest_key == 'Flag2') {  var gotoFlag = Game.flags.Flag2; }
        else if ( dest_key == 'Flag3') {  var gotoFlag = Game.flags.Flag3; }
        else if ( dest_key == 'Flag4') {  var gotoFlag = Game.flags.Flag4; }
        else if ( dest_key == 'Flag5') {  var gotoFlag = Game.flags.Flag5; }

//	//console.log(creep + " body " + creep.body[0].type);

        // attack hostile creeps
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
                //console.log(creep + "ALERT -- found hostile creep!" + target);
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                }
        }

		
		// are we in the room with the flag?
		if ( creep.pos.roomName != gotoFlag.pos.roomName ) {
			moveStatus = creep.moveTo(gotoFlag);
		}
		else {
			// in the room with the flag, look for stuff to do (likely very CPU heavy)

			var constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
                        var repairStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                        });
			var harvestSite = creep.pos.findClosestByPath(FIND_SOURCES);
			//var upgradeControl = creep.room.controller

			if (creep.memory.working == true && creep.carry.energy == 0) {
				//console.log(creep + " -- claimer -- out of energy");
				creep.memory.working = false;
			}
			else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            			//console.log(creep + " -- claimer -- energy capacity full");
            			creep.memory.working = true;
        		}

                        // harvesting
                        if ( harvestSite != undefined  && creep.memory.working == false ) {
				//console.log(creep + " claimer -- harvesting");
                                if ( creep.harvest(harvestSite) == ERR_NOT_IN_RANGE ) {
                                        creep.moveTo(harvestSite);
                                }
                        }
			// other, construction jobs
                        else if ( constructionSite != undefined  && creep.memory.working == true) {
				//console.log(creep + " claimer -- building");
                                if ( creep.build(constructionSite) == ERR_NOT_IN_RANGE ) {
                                        creep.moveTo(constructionSite);
                                }
                        }
                       	// does the container exist? if not, rebuild it? 

			/*
			// claim the controller if necessary
			else if ( false && dest_key == 'FlagX' ) {
				//console.log(creep + " claimer -- claiming");
				if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(creep.room.controller);
                                }
			}
// upgrade the controller if necessary
			else if ( false || 
				 dest_key == 'FlagX'
				) {
				//console.log(creep + " claimer -- upgrading");
            			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                			creep.moveTo(creep.room.controller);
            			}
				else {
					//console.log(creep + " upgrade - " + creep.room.controller.owner.username);
				}
			}
*/
			// repair jobs
			else if ( repairStructure != undefined  && creep.memory.working == true ) {
				//console.log(creep + " claimer -- repairing");
                                if ( creep.repair(repairStructure) == ERR_NOT_IN_RANGE ) {
					//console.log(creep + " repair");
                                        creep.moveTo(repairStructure);
                                }
                        }
			// drop stuff off
			else {
				var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: (s) => s.structureType==STRUCTURE_CONTAINER &&
							s.store[RESOURCE_ENERGY] < 2000
                		});
				//console.log(creep + " claimer -- transfering energy.");
                                if ( creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
					creep.moveTo(container);
                                }
			}

			// attacking hostiles?
			// reserving?
		}

	}
};
