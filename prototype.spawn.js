module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {

        if (roleName == 'harvester') {
	    var body = [WORK, WORK, MOVE, MOVE, CARRY, CARRY]
        }
        else if (roleName == 'upgrader') {
	    var body = [WORK, WORK, MOVE, MOVE, CARRY, CARRY]
        }
        else if (roleName == 'builder') {
	    var body = [WORK, WORK, MOVE, MOVE, CARRY, CARRY]
        }
        else if (roleName == 'repairer') {
	    var body = [WORK, WORK, MOVE, MOVE, CARRY, CARRY]
        }
        else if (roleName == 'wallRepairer') {
	    var body = [WORK, WORK, MOVE, MOVE, CARRY, CARRY]
        }
        else if (roleName == "remote_harvester") {
	    var body = [WORK, WORK, // 200
		    	MOVE, MOVE,  // 100
			CARRY, CARRY // 100
			]
	    //var body = [WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, ATTACK]
        }

	/* ACTION - COST
	 * MOVE - 50
	 * WORK - 100
	 * CARRY - 50
	 * ATTACK - 80
	 * RANGED_ATTACK - 150
	 * HEAL - 250
	 * CLAIM - 600
	 * TOUGH - 10
	 */

        // create creep with the created body and the given role
        return this.createCreep(body, undefined, { role: roleName, working: false, destid: null });
     };
};
