module.exports = function() {
// move = 50
// carry = 50
// work = 100


    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName, dest, birthplace) {
        if (roleName == 'harvester') {
		        var body = [
			           WORK, WORK, WORK, // 300
                 MOVE, MOVE, MOVE, // 150
                 CARRY, CARRY, // 100
		         ]; // 350
        }
	       else if (roleName == 'harvester_lite') {
            var body = [
              WORK,   // 100
              MOVE, MOVE,  // 100
              CARRY, CARRY // 100
            ]; // 300
		        var roleName = 'harvester';
        }
        else if (roleName == 'deliverer') {
    var body = [
      WORK, WORK,  // 200
      MOVE, MOVE, MOVE, // 150
      CARRY, CARRY, CARRY, CARRY // 200
    ]; // 550`

        else if (roleName == 'upgrader') {
		var body = [
			WORK, WORK,  // 200
			MOVE, MOVE, MOVE,  // 150
			CARRY, CARRY, CARRY, CARRY // 200
		]; // 550
        }
        else if (roleName == 'builder') {
		var body = [
			WORK, WORK,  // 200
			MOVE, MOVE, MOVE, MOVE, // 200
			CARRY, CARRY, CARRY // 150
		]; // 550
       }
        else if (roleName == 'builder_med') {
                var body = [
                        WORK, WORK, WORK,  // 300
                        MOVE, MOVE, MOVE, // 100
                        CARRY // 100
                ]; // 550
		roleName = "builder";
        }
        else if (roleName == 'builder_sm') {
                var body = [
                        WORK,  // 100
                        MOVE, MOVE, // 100
                        CARRY, CARRY // 200
                ]; // 300
		roleName = "builder";
        }
        else if (roleName == 'repairer') {
		var body = [
                        WORK, WORK, WORK, // 300
                        MOVE, MOVE, MOVE, // 150
                        CARRY, CARRY // 100
		]; //  550
        }
        else if (roleName == 'wallRepairer') {
		var body = [
                        WORK, WORK, // 200
                        MOVE, MOVE, MOVE, /// 150
                        CARRY, CARRY // 200
		]; // 550
        }
        else if (roleName == "remote_harvester") {
	    var body = [
			WORK, WORK, // 200
		    	MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
			 MOVE, MOVE, MOVE, MOVE, MOVE, // 550
			CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, // 300
			ATTACK, // 80
                      	TOUGH, TOUGH // 20
		]; // 1150
        }
	else if (roleName == "claimer") {
                var body = [
			WORK, WORK, WORK, WORK, WORK, WORK, // 300
                        MOVE, MOVE, MOVE, MOVE,   // 200
			CARRY, CARRY, // 100
                        ATTACK, // 80
                        TOUGH, TOUGH // 20
                ];//  600
	}
	else if (roleName == "claimer_lg") {
		var body = [
			CLAIM, // 500
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE  // 350
		]; // 850
		roleName = "claimer";
	}
        else if (roleName == "local_harvester") {
                var body = [
			WORK, WORK, WORK, WORK, // 500
                        WORK, WORK, WORK, // 300
                        MOVE,   // 50
                        CARRY  // 50
                ]; // 800
        }
	else if (roleName == "local_harvester_sm") {
               var body = [
                        WORK, WORK, WORK, WORK, // 400
                        MOVE,   // 50
                        CARRY  // 50
                ]; // 500
		roleName = "local_harvester";
	}
        else if (roleName == "energy_mover") {
                var body = [
                        WORK, WORK, WORK, WORK, WORK,
			//WORK, WORK, WORK, WORK, WORK,// 1000
                        MOVE,   // 50
                        CARRY, CARRY  // 100
                ]; // 1100
        }
	else if (roleName == "soldier") {
		var body = [
			TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, // 50
			MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, // 450
			ATTACK,ATTACK,ATTACK,ATTACK // 400
			]; // 900
	}
	else if (roleName == "soldier_sm") {
		var body = [
                        TOUGH,TOUGH,TOUGH,TOUGH, // 40
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, // 350
                        ATTACK,ATTACK,ATTACK // 360
                        ]; // 750
			roleName = "soldier";
	}
        else if (roleName == "soldier2") {
                var body = [
                        CLAIM,
                        MOVE,MOVE,MOVE,MOVE,MOVE
                        ];
        }

        // create creep with the created body and the given role
        return this.createCreep(body, undefined, { role: roleName, working: false, destid: dest, birthplace: birthplace});
     };
};
