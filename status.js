module.exports = {

   display_status: function(spawn_num,Empire) {
     [MinHarv,MinDeli,MinUgra,MinBuil,MinEner,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Empire.spawn_levels[spawn_num];
     var spawn_name = Empire.spawn_names[spawn_num];

        // count the number of creeps alive for each role and according to spawn
        var numHarv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == spawn_name);
        var numReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harv' && c.memory.birthplace == spawn_name);
        var numLoHa = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester' && c.memory.birthplace == spawn_name);
        var numUpgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == spawn_name);
        var numBuil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == spawn_name);
        var numClai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == spawn_name);
        var numSold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == spawn_name);
        var numSolM = _.sum(Game.creeps, (c) => c.memory.role == 'soldier_melee' && c.memory.birthplace == spawn_name);
        var numSolR = _.sum(Game.creeps, (c) => c.memory.role == 'soldier_ranged' && c.memory.birthplace == spawn_name);
        var numSolH = _.sum(Game.creeps, (c) => c.memory.role == 'soldier_healer' && c.memory.birthplace == spawn_name);
        var numRepa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == spawn_name);
        var numDeli = _.sum(Game.creeps, (c) => c.memory.role == 'deliverer' && c.memory.birthplace == spawn_name);
        var numEnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthplace == spawn_name);

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

        var total_have = numHarv + numUpgr + numRepa + numBuil + numReHa + numClai + numDeli + numEnMo + numSold;
        var total_want = MinHarv + MinUgra + MinRepa + MinBuil + MinReHa + MinClai + MinDeli + MinEner + MinSold;
        var total_status = total_have + "/" + total_want;

        var status21 = "SM: " + numSolM + "/" + MinSolM;
        var status22 = " SR: " + numSolR + "/" + MinSolR;
        var status23 = " SH: " + numSolH + "/" + MinSolH;



        var status11 = " E: " + cur_energy + "/" + cur_energy_cap;

        var status12 = " UP: " + Game.spawns[spawn_name].room.controller.progress + "/" + Game.spawns[spawn_name].room.controller.progressTotal;
        var lvl =  Game.spawns[spawn_name].room.controller.level;

        console.log(spawn_name + " : lvl" + lvl + status11 + status12 + " C: "+ total_status + " -- " + status1 + status2 + status3 + status4 + status5 + status7 + status8 + status9 + status10);
        console.log("\t" + status21 + status22 + status23);

        // source status information
        var msg = '';
        for ( let source_id in Empire.sources[spawn_num]) {
          var source = Game.getObjectById(Empire.sources[spawn_num][source_id]);
          var source_energy = source.energy;
          var source_energy_cap = source.energyCapacity;
          var source_ticks = source.ticksToRegeneration;
          var out = "\tSo: " + source_id + " - " + source_energy + " @ " + source_ticks + " t";
          //var msg = msg + out;
          console.log(out);
        }
  }
};
