module.exports = {
  // a function to run the logic for this role
  run: function(creep) {
    creep.say("\u2694");

    // get your assignment
    var dest_key = creep.memory.destid;
    if ( dest_key == 'Attack1') {  var gotoFlag = Game.flags.Attack1; }
    if ( dest_key == 'Attack2') {  var gotoFlag = Game.flags.Attack2; }
    if ( dest_key == 'Attack3') {  var gotoFlag = Game.flags.Attack3; }

    // are we in the room with the flag?
    if ( creep.pos.roomName != gotoFlag.pos.roomName && creep.memory.working != true ) {
       // not in the room with the flag, move towards the flag
       creep.moveTo(gotoFlag);
       creep.say("\u2694.!!");
    }
    else {
  	  // collect targets

      var creep_target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    	var hostile_tower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
    			filter: (s) => s.structureType==STRUCTURE_TOWER
    	});

    	var other_target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
    			filter: (s) => s.structureType==STRUCTURE_SPAWN  ||
    					s.structureType==STRUCTURE_EXTENSION /* ||
              s.structureType==STRUCTURE_STORAGE */
    	});

      var containers_target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    			filter: (s) => s.structureType==STRUCTURE_CONTAINER
    	});

      // attack tower
      if( hostile_tower != undefined ) {
              console.log(creep + "SOLDIER -- attacking hostile tower!" + hostile_tower);
              if(creep.attack(hostile_tower) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(hostile_tower);
              }
      }

      // attack hostile creep
      else if ( creep_target != undefined ) {
       console.log(creep + "SOLDIER -- attacking hostile creep!" + creep_target);
         if(creep.attack(creep_target) == ERR_NOT_IN_RANGE) {
           creep.moveTo(creep_target);
       }
      }

      // attack spawn or extensions
      else if ( containers_target != undefined ) {
        console.log(creep + "SOLDIER -- attacking hostile target!" + containers_target);
        if(creep.attack(containers_target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers_target);
        }
      }

      // attack containers
      else if ( other_target != undefined ) {
        console.log(creep + "SOLDIER -- attacking hostile target!" + other_target);
        if(creep.attack(other_target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(other_target);
        }
      }

      else {  creep.moveTo(gotoFlag); }

      }

  }
};
