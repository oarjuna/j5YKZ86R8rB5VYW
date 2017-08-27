module.exports = {

   display_status: function(spawn_num,Empire) {
     [MinHarv,MinDeli,MinUgra,MinBuil,MinEner,MinReHa,MinClai,MinSold,MinRepa] =  Empire.spawn_levels[spawn_num];
     var spawn_name = Empire.spawn_names[spawn_num];

        // count the number of creeps alive for each role and according to spawn
        var numHarv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == spawn_name);
        var numReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harv' && c.memory.birthplace == spawn_name);
        var numLoHa = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester' && c.memory.birthplace == spawn_name);
        var numUpgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == spawn_name);
        var numBuil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == spawn_name);
        var numClai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == spawn_name);
        var numSold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == spawn_name);
        var numRepa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == spawn_name);
        var numDeli = _.sum(Game.creeps, (c) => c.memory.role == 'deliverer' && c.memory.birthplace == spawn_name);
        var numEnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthplace == spawn_name);

        //var cur_room = Game.spawns.[spawn_name].room;
        //var cur_energy_cap = Game.spawns.[spawn_name].room.energyCapacityAvailable;

        var cur_energy = Game.spawns[spawn_name].room.energyAvailable;
        var cur_energy_cap = Game.spawns[spawn_name].room.energyCapacityAvailable;

        var status1 = "H: " + numHarv + "/" + MinHarv;
        var status2 = " U: " + numUpgr + "/" + MinUgra;
        var status3 = " R: " + numRepa + "/" + MinRepa;
        var status4 = " B: " + numBuil + "/" + MinBuil;
        var status5 = " RH: " + numReHa + "/" + MinReHa;
        var status7 = " C: " + numClai + "/" + MinClai;
        var status8 = " De: " + numDeli + "/" + MinDeli;
        var status9 = " EM: " + numEnMo  + "/" + MinEner;
        var status10 =" S: " + numSold + "/" + MinSold;

        var status11 = "E: " + cur_energy + "/" + cur_energy_cap
      //  var status12 = " UP: " + cur_room.controller.progress +
        //                 "/" + cur_room.controller.progressTotal +
        //                " lvl: " + cur_room.controller.level;

    	  //var status13 = " energy_avail -- " + energy_avail;

            // print the thing
            //console.log(": " + status11 + status12 + status13);
            console.log(spawn_name + ": " + status1 + status2 + status3 + status4 + status5 +
                            status7 + status8 + status9 + status10 + status11);

////// end

}
};
