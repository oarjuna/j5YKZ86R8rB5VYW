module.exports = {
	run: function(creep) {
		creep.say("!!");

		// get your assignment
		var gotoFlag = creep.memory.destid.pos;	
		
		// are we in the room with the flag?
		if ( creep.room.name != creep.memory.destid.room.name ) {
			// not in the room with the flag, move towards the flag
			moveStatus = creep.moveTo(gotoFlag);
			console.log(creep + " claimer -movestatus " + moveStatus + " GF " + gotoFlag);	
			console.log(creep + " claimer -creeproom " + creep.room.name + " FR " + creep.memory.destid.room.name);	
		}
		else {
			// in the room with the flag, look for stuff to do (likely very CPU heavy)

			var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                        var repairStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                        });
			var harvestSite = creep.pos.findClosestByPath(FIND_SPAWNS);

			// construction jobs
			if ( constructionSite != undefined ) {
				if ( creep.build(constructionSite) == ERR_NOT_IN_RANGE ) {
					console.log(creep + " claimer -- CS " + constructionSite);
					creep.moveTo(constructionSite);
				}
			}
			// repair jobs
			else if ( repairStructure != undefined ) {
                                if ( creep.repair(repairStructure) == ERR_NOT_IN_RANGE ) {
                                        console.log(creep + " claimer -- RS " + repairStructure);
                                        creep.moveTo(repairStructure);
                                }
                        }
			// harvesting
                        else if ( harvestSite != undefined ) {
                                if ( creep.harvest(harvestSite) == ERR_NOT_IN_RANGE ) {
                                        console.log(creep + " claimer -- HS " + harvestSite);
                                        creep.moveTo(harvestSite);
                                }
                        }
			// drop stuff off
			else {
				var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: (s) => s.structureType==STRUCTURE_CONTAINER &&
							s.store[RESOURCE_ENERGY] < 2000
                		});
                                if ( creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
	                                console.log(creep + " claimer -- C " + container);
					creep.moveTo(container);
                                }
			}

			// attacking hostiles?
			// reserving?
		}

	}
};
