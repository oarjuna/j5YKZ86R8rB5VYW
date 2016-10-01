module.exports = {
	run: function(creep) {
		creep.say("!!");
		// get your assignment
		var gotoFlag = Game.getObjectById(creep.memory.destid);	

		// move towards it
		moveStatus = creep.moveTo(gotoFlag);
		if ( moveStatus != 0 ) {
			
		}
		else {

		}

	}
};
