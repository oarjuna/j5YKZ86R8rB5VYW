module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        creep.say("^-!");

        // get your assignment
        var dest_key = creep.memory.destid;
        if ( dest_key == 'Attack') {  var gotoFlag = Game.flags.Attack; }
	else { var gotoFlag = creep.room.spawn; }

        // collect targets
        var creep_target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

	var hostile_tower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
			filter: (s) => s.structureType==STRUCTURE_TOWER 
	});

	var other_target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
			filter: (s) => s.structureType==STRUCTURE_EXTENSION
	});

        if(hostile_tower != undefined ) {
                console.log(creep + "ALERT -- attacking hostile tower!" + hostile_tower);
                if(creep.attack(hostile_tower) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostile_tower);
                }
        }
	else if ( creep_target != undefined ) {
		console.log(creep + "ALERT -- attacking hostile creep!" + creep_target);
                if(creep.attack(creep_target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep_target);
                }

	}

        // are we in the room with the flag?
        if ( creep.pos.roomName != gotoFlag.pos.roomName ) {
                // not in the room with the flag, move towards the flag
                moveStatus = creep.moveTo(gotoFlag);
                console.log(creep + " soldier -movestatus " + moveStatus + " GF " + gotoFlag);
                console.log(creep + " soldier -CR " + creep.pos.roomName + " FR: " + gotoFlag.pos.roomName);
        }



// end
    }
};

