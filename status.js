module.exports = {
   display_status: function(foo) {
     let x = -1;
     console.log("in status");

     for (var cur_spawn_tmp in Game.spawns){
        cur_spawn = Game.spawns[cur_spawn_tmp].name;
         x++;
		     console.log(cur_spawn + " helo!");
        // count the number of creeps alive for each role and according to spawn
        var numHarv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == cur_spawn);
        var numReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harv' && c.memory.birthplace == cur_spawn);
        var numLoHa = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester' && c.memory.birthplace == cur_spawn);
        var numUpgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == cur_spawn);
        var numBuil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == cur_spawn);
        var numClai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == cur_spawn);
        var numSold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == cur_spawn);
        var numRepa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == cur_spawn);
        var numWaRe = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.birthplace == cur_spawn);
        var numEnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthplace == cur_spawn);

        var cur_room = Game.spawns.cur_spawn.room;
        var cur_energy_cap = Game.spawns.cur_spawn.room.energyCapacityAvailable;
        var cur_energy = Game.spawns.cur_spawn.room.energyAvailable;

        var status1 = "H: " + numHarv + "/" + spawn1MinHarv;
        var status2 = " U: " + numUpgr + "/" + spawn1MinUgra;
        var status3 = " R: " + numRepa + "/" + spawn1MinRepa;
        var status4 = " B: " + numBuil + "/" + spawn1MinBuil;
        var status5 = " RH: " + numReHa + "/" + spawn1MinReHa;
        var status6 = " WR: " + numWaRe + "/" + spawn1MinWall;
        var status7 = " C: " + numClai + "/" + spawn1MinClai;
        var status8 = " De: " + numDeli + "/" + spawn1MinDeli;
        var status9 = " EM: " + numEnMo  + "/" + spawn1MinEner;
        var status10 =" S: " + numSold + "/" + spawn1MinSold;

        var status11 = "E: " + cur_energy + "/" + cur_energy_cap
        var status12 = " UP: " + cur_room.controller.progress +
                         "/" + cur_room.controller.progressTotal +
                        " lvl: " + cur_room.controller.level;

    	//var status13 = " Stored -- " +  _.sum(cur_room.storage.store[RESOURCE_ENERGY]);
    	var status13 = " energy_avail -- " + energy_avail;

            // print the thing
            console.log(": " + status11 + status12 + status13);
            console.log(": " + status1 + status2 + status3 + status4 + status5 + status6 +
                            status7 + status8 + status9 + status10);

////// end
   }
}
};
