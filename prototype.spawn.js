module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {

        if (roleName == 'harvester') {
		var body = [
			WORK, WORK, WORK, // 150
                        MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                     	CARRY, CARRY, CARRY, CARRY, CARRY, CARRY // 300
		] // 600
        }
        else if (roleName == 'upgrader') {
		var body = [
			WORK, WORK,  // 200
			MOVE, MOVE,  // 100
			CARRY, CARRY // 100
		] // 400
        }
        else if (roleName == 'builder') {
		var body = [
			WORK, WORK,  // 100
			MOVE, MOVE, MOVE, MOVE, MOVE, // 250
			CARRY, CARRY, CARRY, CARRY // 200
		] // 550
        }
	// m - 50 / w - 100 / c - 50 / a - 80 / t - 10
        else if (roleName == 'repairer') {
		var body = [
                        WORK, WORK,
                        MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY
		]
        }
        else if (roleName == 'wallRepairer') {
		var body = [
                        WORK, WORK,
                        MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY
		]
        }
        else if (roleName == "remote_harvester") {
	    var body = [
			WORK, WORK, // 200
		    	MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, // 350
			CARRY, CARRY, // 100
			ATTACK, // 80
                      	TOUGH, TOUGH // 20
		] // 750
        }
	else if (roleName == "claimer") {
                var body = [
                        MOVE, MOVE, MOVE, MOVE,   // 200
                        CLAIM,  //  600
                ] //  800
	}
        else if (roleName == "local_harvester") {
                var body = [
                        WORK, WORK, WORK, WORK, // 400
                        MOVE,   // 50
                        CARRY  // 100
                ] // 550
        }


        else {
                var body = [
                        WORK, WORK, WORK, WORK, // 400
                        MOVE,   // 50
                        CARRY, CARRY  // 100
                ] // 550
        }

	/* ACTION - COST - DESC 
	 * MOVE - 50 - Decreases fatigue by 2 points per tick.
	 * WORK - 100 - faster work based on task
	 * CARRY - 50 - Can contain up to 50 resource units.
	 * ATTACK - 80 - Attacks another creep/structure with 30 hits per tick in a short-ranged attack.
	 * RANGED_ATTACK - 150 - Attacks another single creep/structure with 10 hits 
	 * 			per tick in a long-range attack up to 3 squares long.
	 * 			Attacks all hostile creeps/structures within 3 squares 
	 * 			range with 1-4-10 hits (depending on the range).
	 * HEAL - 250 - Heals self or another creep restoring 12 hits per tick 
	 * 			in short range or 4 hits per tick at a distance.
	 * CLAIM - 600 - Claims a neutral room controller. ( see doc )
	 * TOUGH - 10 - 	No effect, just additional hit points to the creep's body. 
	 * 			Can be boosted to resist damage.
	 */

        // create creep with the created body and the given role
        return this.createCreep(body, undefined, { role: roleName, working: false, destid: null });
     };
};
