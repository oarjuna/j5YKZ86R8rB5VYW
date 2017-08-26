module.exports = function() {
// move = 50
// carry = 50
// work = 100

// 300
// 550
// 800
// 1300

  StructureSpawn.prototype.createCustomCreep =
  function(energy, roleName, dest, birthplace) {
// 300 - 550 energy --- initial spawn
    console.log("proto -- " + energy);

    if ( energy < 550 ) {
      if (roleName == 'harvester_lite') {
        var body = [ WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY ]; //500
        var roleName = 'harvester';
      }
      else if (roleName == 'builder_lite') {
        var body = [ WORK, MOVE, MOVE, CARRY, CARRY ]; // 300
      	roleName = "builder";
      }
      else if (roleName == 'repairer_lite') {
        var body = [ WORK, MOVE, MOVE, CARRY, CARRY ]; // 300
        var roleName = 'repairer';
      }
    }

    // 550 energy
    else if ( energy >= 550 && energy < 10000 ) {
      if (roleName == 'harvester') {
        var body = [ WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ]; //550
      }
      else if (roleName == 'deliverer') {
        var body = [ WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; // 550
      }
      else if (roleName == 'deliverer_lite') {
        var body = [ WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY ]; // 500
        var roleName = 'deliverer';
      }
      else if (roleName == 'upgrader') {
    		var body = [WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; // 550
      }
      else if (roleName == 'upgrader_lite') {
        var body = [ WORK, MOVE, MOVE, CARRY, CARRY ]; // 550
        var roleName = 'upgrader';
      }
      else if (roleName == 'builder') {
    		var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY ]; // 550
      }
      else if (roleName == 'builder_med') {
        var body = [ WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY ]; // 550
  		  roleName = "builder";
      }
      else if (roleName == 'repairer') {
        var body = [ WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ]; //  550
      }
      else if (roleName == 'wallRepairer') {
        var body = [ WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ]; // 550
      }
      else if (roleName == "local_harvester_sm") {
        var body = [ WORK, WORK, WORK, WORK, MOVE, CARRY ]; // 500
        roleName = "local_harvester";
      }
    //}
    // 800 energy
    //else if ( energy >= 800 && energy < 1100 ) {
      else if (roleName == "remote_harvester") {
  	    var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; // 700
      }
    	else if (roleName == "claimer") {
        var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ];//  700
      }
    	else if (roleName == "claimer_lg") {
    		var body = [ CLAIM, MOVE, MOVE]; // 700
    		roleName = "claimer";
    	}
      else if (roleName == "local_harvester") {
        var body = [ WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, CARRY ]; // 800
      }
       else if (roleName == "soldier_sm") {
         var body = [  TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK]; // 750
  			roleName = "soldier";
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
