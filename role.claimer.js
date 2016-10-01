module.exports = {
	run: function(creep) {
		creep.say("!!");

		// get your assignment
                var dest_key = creep.memory.destid;
                if ( dest_key == 'Flag1') {  var gotoFlag = Game.flags.Flag1; }
                else if ( dest_key == 'Flag2') {  var gotoFlag = Game.flags.Flag2; }
                else if ( dest_key == 'Flag3') {  var gotoFlag = Game.flags.Flag4; }
		
		// are we in the room with the flag?
		if ( creep.pos.roomName != gotoFlag.pos.roomName ) {
			// not in the room with the flag, move towards the flag
			moveStatus = creep.moveTo(gotoFlag);
			console.log(creep + " claimer -movestatus " + moveStatus + " GF " + gotoFlag);	
			console.log(creep + " claimer -CR " + creep.pos.roomName + " FR: " + gotoFlag.pos.roomName);
		}
		else {
			// in the room with the flag, look for stuff to do (likely very CPU heavy)

			var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                        var repairStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                        });
			var harvestSite = creep.pos.findClosestByPath(FIND_SOURCES);

			if (creep.memory.working == true && creep.carry.energy == 0) {
				console.log(creep + " -- claimer -- out of energy");
				creep.memory.working = false;
			}
			else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            			console.log(creep + " -- claimer -- energy capacity full");
            			creep.memory.working = true;
        		}

                        // harvesting
                        if ( harvestSite != undefined  && creep.memory.working == false ) {
                                if ( creep.harvest(harvestSite) == ERR_NOT_IN_RANGE ) {
                                        console.log(creep + " claimer -- HS " + harvestSite);
                                        creep.moveTo(harvestSite);
                                }
                                else {
                                        console.log(creep + " claimer -- HS " + harvestSite.energy);
                                }
                        }
                        // construction jobs
                        else if ( constructionSite != undefined  && creep.memory.working == true) {
                                if ( creep.build(constructionSite) == ERR_NOT_IN_RANGE ) {
                                        console.log(creep + " claimer -- CS " + constructionSite);
                                        creep.moveTo(constructionSite);
                                }
                                else {
                                        console.log(creep + " claimer -- CS " + creep.moveTo(constructionSite));
                                }

                        }
			// repair jobs
			else if ( repairStructure != undefined  && creep.memory.working == true ) {
                                if ( creep.repair(repairStructure) == ERR_NOT_IN_RANGE ) {
                                        console.log(creep + " claimer -- RS " + repairStructure);
                                        creep.moveTo(repairStructure);
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
