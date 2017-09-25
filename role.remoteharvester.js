module.exports = {
  run: function(creep) {

    // get your assignment
    var dest_flag = creep.memory.destid;
    var gotoFlag = Game.flags[dest_flag];

    // are we in the room with the flag?
    if (creep.pos.roomName != gotoFlag.pos.roomName && creep.memory.working != true ) {
	     // not in the room with the flag, move towards the flag
	     creep.travelTo(gotoFlag);
       creep.say("\uD83D\uDE9A.!!");
    }
    else {
      // switch states
    	if (creep.memory.working == true && creep.carry.energy == 0) {
        // if creep is bringing energy to a structure but has no energy left
    		creep.memory.working = false;
    	}
    	else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        // if creep is harvesting energy but is full
        creep.memory.working = true;
    	}

    if (creep.memory.working == true) {

        // drop off
        var container = creep.memory.return_id;
        var structure = Game.getObjectById(container);

        var repairSite = creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (s) =>
            ( s.structureType == STRUCTURE_ROAD && s.hits < 4000 )
        });

	if ( repairSite[0] != undefined ) {
	  creep.say('\uD83D\uDEE0\uFE0F'); // 🛠️
	  creep.repair(repairSite);		
	}
	else {
    	  var action_status = creep.transfer(structure, RESOURCE_ENERGY);
      	  if (action_status == ERR_NOT_IN_RANGE) {
	    creep.say("\uD83D\uDE9A.st");
            creep.travelTo(structure);
          }

      }
      else {
        // find closest container with energy and fill up
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
  	    	filter: (s) =>
  					(
  						( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= 100 )
  	      )});

        //if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
  		    creep.travelTo(container);
          creep.say("\uD83D\uDE9A.con");
        }

	    }

	   }
  }
};
