module.exports = function() {
// move = 50
// carry = 50
// work = 100

// 300
// 550
// 800
// 1300

// harvester
// deliverer
// upgrader
// repairer
// builder

// remote harvester
// claimer

  StructureSpawn.prototype.createCustomCreep =
  function(energy, roleName, dest, birthplace) {
// 300 - 550 energy --- initial spawn
    console.log("proto -- " + energy);

    if ( energy < 550 ) {
      if (roleName == 'harvester') {
        var body = [ WORK, MOVE, MOVE, WORK, CARRY ]; // 300
        var roleName = 'harvester';
      }
      else if (roleName == 'builder') {
        var body = [ WORK, MOVE, MOVE, WORK, CARRY ]; // 300
      	roleName = "builder";
      }
      else if (roleName == 'repairer') {
        var body = [ WORK, MOVE, MOVE, WORK, CARRY ]; // 300
        var roleName = 'repairer';
      }
      else if (roleName == 'upgrader') {
        var body = [ WORK, MOVE, MOVE, WORK, CARRY ]; // 300
      }
      else if (roleName == 'repairer') {
        var body = [ WORK, MOVE, MOVE, WORK, CARRY ]; // 300
      }
    }

    // 550 energy
    else if ( energy >= 550 && energy < 800 ) {
      if (roleName == 'harvester') {
        var body = [ WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ]; //550
      }
      else if (roleName == 'deliverer') {
        var body = [ WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; // 550
      }
      else if (roleName == 'upgrader') {
    		var body = [WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; // 550
      }
      else if (roleName == 'builder') {
    		var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY ]; // 550
      }
      else if (roleName == 'repairer') {
        var body = [ WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ]; //  550
      }

    //}
    // 800 energy
    else if ( energy >= 800 && energy < 1100 ) {
      if (roleName == 'harvester') {
        var body = [ WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ]; //550
      }
      else if (roleName == 'deliverer') {
        var body = [ WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; // 550
      }
      else if (roleName == 'upgrader') {
        var body = [WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; // 550
      }
      else if (roleName == 'builder') {
        var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY ]; // 550
      }
      else if (roleName == 'repairer') {
        var body = [ WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ]; //  550
      }

      else if (roleName == "remote_harvester") {
  	    var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; // 700
      }
    	else if (roleName == "claimer") {
        var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; //  700
      }
    	else if (roleName == "claimer_lg") {
    		var body = [ CLAIM, MOVE, MOVE]; // 700
    		roleName = "claimer";
    	}
    }

    // 1100 energy
    else if ( energy >= 1100 ){
      if (roleName == "energy_mover") {
        var body = [ WORK, WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY ]; // 1100
      }
      else if (roleName == "soldier") {
        var body = [ TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]; // 900
      }
    }

    // create creep with the created body and the given role
    console.log("spawning -- " + roleName + " -- "+ energy )
    return this.createCreep(body, undefined, { role: roleName, working: false, destid: dest, birthplace: birthplace});
  };
};
