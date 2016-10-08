module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        creep.say("^-!");

        // get your assignment
        var dest_key = creep.memory.destid;
        if ( dest_key == 'Attack') {  var gotoFlag = Game.flags.Attack; }
	else { var gotoFlag = creep.room.spawn; }

	// gotoFlag = "57e990dd30c9d8c674851969"; // his spawn

        // collect targets
        var creep_target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
			filter: (s) => s.owner.username != 'nabo_c'
	});

	var hostile_tower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
			filter: (s) => s.structureType==STRUCTURE_TOWER 
	});

	var other_target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
			filter: (s) => s.structureType==STRUCTURE_SPAWN  ||
					s.structureType==STRUCTURE_EXTENSION
	});

        var neutral_controller = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => s.structureType==STRUCTURE_CONTROLLER &&
					( s.owner.username != 'Arjuna'  ||
					s.owner.username != 'nabo_c'
					)

        });

	var claim_parts = creep.body.find( x => x.type == 'claim');
	var heal_parts = creep.body.find( x => x.type == 'heal');

        if( hostile_tower != undefined ) {
                console.log(creep + "SOLDIER -- attacking hostile tower!" + hostile_tower);
                if(creep.attack(hostile_tower) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostile_tower);
                }
        }
	else if ( creep_target != undefined ) {
		console.log(creep + "SOLDIER -- attacking hostile creep!" + creep_target);
                if(creep.attack(creep_target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep_target);
                }
	}
        else if ( other_target != undefined ) {
                console.log(creep + "SOLDIER -- attacking hostile target!" + other_target);
                if(creep.attack(other_target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(other_target);
                }
        }
        /*
	else if ( neutral_controller != undefined && claim_parts != undefined ) {
                console.log(creep + "SOLDIER -- claiming target!" + neutral_controller);
                if(creep.attack(neutral_controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(neutral_controller);
                }
        }
	*/
	else { 
		creep.moveTo(gotoFlag); 
	}

/*
        // are we in the room with the flag?
        if ( creep.pos.roomName != gotoFlag.pos.roomName ) {
                // not in the room with the flag, move towards the flag
                moveStatus = creep.moveTo(gotoFlag);
                console.log(creep + " soldier -movestatus " + moveStatus + " GF " + gotoFlag);
                console.log(creep + " soldier -CR " + creep.pos.roomName + " FR: " + gotoFlag.pos.roomName);
        }
	else {
		creep.moveTo(gotoFlag);
	}
*/

// end
    }
};

