module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        creep.say("^-!");

        // get your assignment
        var dest_key = creep.memory.destid;
        if ( dest_key == 'Attack') {  var gotoFlag = Game.flags.Attack; }
	else { var gotoFlag = creep.room.spawn; }

        // attack hostile creeps
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
                console.log(creep + "ALERT -- found hostile creep!" + target);
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
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

