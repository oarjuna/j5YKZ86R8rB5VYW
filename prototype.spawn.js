module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
	   
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
	    

	    //var body = ["WORK","WORK","MOVE","MOVE","CARRY","CARRY"];

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: false, destid: null });
        };
};
