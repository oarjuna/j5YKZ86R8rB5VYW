module.exports = {
  // a function to run the logic for this role
  run: function(creep) {
    creep.say("\u2694");

    // get your assignment
    var dest_key = creep.memory.destid;
    if ( dest_key == 'Attack1') {  var gotoFlag = Game.flags.Attack1; }
    if ( dest_key == 'Attack2') {  var gotoFlag = Game.flags.Attack2; }



    var creep_target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  	var hostile_tower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
  			filter: (s) => s.structureType==STRUCTURE_TOWER
  	});

  	var other_target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
  			filter: (s) => s.structureType==STRUCTURE_SPAWN  ||
  					s.structureType==STRUCTURE_EXTENSION
  	});

    // attack tower
    if( hostile_tower != undefined ) {
            console.log(creep + "SOLDIER -- attacking hostile tower!" + hostile_tower);
            if(creep.attack(hostile_tower) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(hostile_tower);
            }
    }

    // attack hostile creep
  	else if ( creep_target != undefined ) {
  		console.log(creep + "SOLDIER -- attacking hostile creep!" + creep_target);
        if(creep.attack(creep_target) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep_target);
        }
  	}

    // attack spawn or extensions
    else if ( other_target != undefined ) {
      console.log(creep + "SOLDIER -- attacking hostile target!" + other_target);
      if(creep.attack(other_target) == ERR_NOT_IN_RANGE) {
              creep.travelTo(other_target);
      }
    }

    // move towards the flag
    else {
  		creep.travelTo(gotoFlag);
  	}

  }
};
