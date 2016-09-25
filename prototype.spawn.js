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
	    var body = [WORK, WORK, MOVE, MOVE, CARRY, CARRY]
	    //var body = [WORK, WORK, MOVE, MOVE, CARRY, CARRY, ATTACK]
        }

        // create creep with the created body and the given role
        return this.createCreep(body, undefined, { role: roleName, working: false, destid: null });
     };
};
