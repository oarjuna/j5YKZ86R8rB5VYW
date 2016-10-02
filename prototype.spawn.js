module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName, dest, birthplace) {
        if (roleName == 'harvester') {
		var body = [
			WORK, // 100
                        //MOVE, MOVE, // 200
                        MOVE, MOVE, MOVE, MOVE, // 200
                     	//CARRY, CARRY //200
                     	CARRY, CARRY, CARRY, CARRY //200
		]; // 500
        }
	else if (roleName == 'harvester_lite') {
                var body = [
                        WORK,   // 100
                        MOVE, MOVE,  // 100
                        CARRY, CARRY // 100
                ]; // 300
		var roleName = 'harvester';
        }
        else if (roleName == 'upgrader') {
		var body = [
			WORK, WORK,  // 200
			MOVE, MOVE, MOVE,  // 200
			CARRY, CARRY, CARRY, CARRY // 200
		]; // 550
        }
        else if (roleName == 'builder') {
		var body = [
			WORK, WORK,  // 200
			MOVE, MOVE, MOVE, MOVE, // 250
			CARRY, CARRY, CARRY // 200
		]; // 550
        }
        else if (roleName == 'repairer') {
		var body = [
                        WORK, WORK, // 200
                        MOVE, MOVE, MOVE, // 150
                        CARRY, CARRY // 200
		]; //  150
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
                        WORK, WORK, WORK, // 150 
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,  // 350
                        CARRY, CARRY // 100
		]; // 1000
		roleName = "claimer";
	} 
        else if (roleName == "local_harvester") {
                var body = [
                        WORK, WORK, WORK, // 150
                        WORK, WORK, WORK, WORK, WORK, WORK, // 300
                        MOVE,   // 50
                        CARRY  // 50
                ]; // 550
        }
        else if (roleName == "energy_mover") {
                var body = [
                        WORK, WORK, WORK, WORK, WORK, 
			WORK, WORK, WORK, WORK, WORK,// 1000
                        MOVE,   // 50
                        CARRY  // 50
                ]; // 1100
        }
	else if (roleName == "soldier") {
		var body = [
			TOUGH,TOUGH,TOUGH,
			CLAIM,
			MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
			ATTACK,ATTACK,ATTACK,ATTACK,ATTACK
			];
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
