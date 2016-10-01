module.exports = {
	run: function(creep) {
		creep.say("!!");
		// get your assignment
		var gotoFlag = Game.getObjectById(creep.memory.destid);	

		
		if ( creep.room != gotoFlag.room ) {
			// move towards it
			moveStatus = creep.moveTo(gotoFlag);
			console.log(creep + " claimer -movestatus " + moveStatus);	
		}
		else {

		}

	}
};
