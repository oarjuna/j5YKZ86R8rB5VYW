module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {
	console.log(roleName + energy);

        if (roleName == 'harvester') {
	    var body = ["WORK", "WORK", "MOVE", "MOVE", "CARRY", "CARRY"];
        }
        else if (roleName == 'upgrader') {
	    console.log = ("spawn: " + body);
	    var body = ["WORK","WORK","MOVE","MOVE","CARRY","CARRY"];
        }
        else if (roleName == 'builder') {
	    console.log = ("spawn: " + body);
	    var body = ["WORK","WORK","MOVE","MOVE","CARRY","CARRY"];
        }
        else if (roleName == 'repairer') {
	    console.log = ("spawn: " + body);
	    var body = ["WORK","WORK","MOVE","MOVE","CARRY","CARRY"];
        }
        else if (roleName == 'wallRepairer') {
	    console.log = ("spawn: " + body);
	    var body = ["WORK","WORK","MOVE","MOVE","CARRY","CARRY"];
        }
        else if (roleName == "remote_harvester") {
	    console.log = ("spawn: " + body);
	    var body = ["WORK", "WORK", "MOVE", "MOVE", "CARRY", "CARRY"];
        }
	console.log = ("spawn: " + body);
        // create creep with the created body and the given role
        return this.createCreep(body, undefined, { role: roleName, working: false, destid: null });
     };
};
