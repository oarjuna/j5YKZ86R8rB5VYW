
module.exports = {
    // a function to run the logic for this role
    run: function(foo) {
        // spawn levels

        var spawn1MinReHa = 0;
        var spawn1MinClai = 0;

        var spawn1MinHarv = 2 ; // 3
        var spawn1MinLoHa = 2; //3 
        var spawn1MinUgra = 2;
        var spawn1MinBuil = 1; //1
        var spawn1MinSold = 0;
        var spawn1MinRepa = 0;
        var spawn1MinWall = 1; //1
        var spawn1MinEner = 1; //3

        // count the number of creeps alive for each role born at Spawn1
        var numSpawn1Harv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == 'Spawn1');
        var numSpawn1ReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harvester' && c.memory.birthplace == 'Spawn1');
        var numSpawn1LoHa = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Upgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Buil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Clai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Sold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Repa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == 'Spawn1');
        var numSpawn1WaRe = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.birthplace == 'Spawn1');
        var numSpawn1EnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthplace == 'Spawn1');

        console.log("\n#------------------#");
   // if not enough harvesters
    if (numSpawn1Harv < spawn1MinHarv) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester','','Spawn1');
        console.log("sp1 -- spawning harvester");
        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numSpawn1Harv == 0) {
            // spawn one with what is available
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester_lite','','Spawn1');
        }
    }

   // if not enough local harvesters
    else if (numSpawn1LoHa < spawn1MinLoHa) {
        var lh_tmp = _.sum(Game.creeps,
                        (c) => c.memory.role == 'local_harvester' &&
                                c.memory.destid == '579faa710700be0674d30fd7'
                        );
        if ( lh_tmp < 1 ) { var dest = '579faa710700be0674d30fd7'; } // north
        else { var dest = '579faa710700be0674d30fd8'; } // south
        console.log("sp1 -- spawning local_harvester -- " + dest + " -- " + lh_tmp);
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'local_harvester',dest,'Spawn1');
    }
   // if not enough energy movers
    else if (numSpawn1EnMo < spawn1MinEner) {
        var st_num = _.sum(Game.creeps,
                        (c) => c.memory.role == 'energy_mover'  &&
                                c.memory.destid == '57e7f8f77e983bb210dcc654'
                        );

        var c1_num = _.sum(Game.creeps,
                        (c) => c.memory.role == 'energy_mover' &&
                                c.memory.destid == '57e6b6f9bf7be6eb05caa521'
                        );

        var c2_num =  _.sum(Game.creeps,
                        (c) => c.memory.role == 'energy_mover' &&
                                c.memory.destid == '57e6b5c1135326b41e54835e'
                        );

        if ( st_num == 0 ) { var dest = '57e7f8f77e983bb210dcc654'; } // storage
        else if ( c1_num == 0 ) { var dest = '57e6b6f9bf7be6eb05caa521'; } // controller #1
        else if ( c2_num == 0 ){ var dest = '57e6b5c1135326b41e54835e'; } // controller  #2
        else {  var dest = '57e6530dfb8875006e762b5e'; } // controller #3
        console.log("sp1 -- spawning energy_mover -- " + dest );
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'energy_mover',dest,'Spawn1');
    }
    // if not enough soldiers
    else if (numSpawn1Sold < spawn1MinSold) {
        console.log("sp1 -- spawning soldier");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'soldier','Attack','Spawn1');
    }
    // if not enough upgraders
    else if (numSpawn1Upgr < spawn1MinUgra) {
        console.log("sp1 -- spawning upgrader");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader','','Spawn1');
    }
    // if not enough repairers
    else if (numSpawn1Repa < spawn1MinRepa) {
        console.log("sp1 -- spawning repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer','','Spawn1');
    }
    // if not enough builders
    else if (numSpawn1Buil < spawn1MinBuil) {
        console.log("sp1 -- spawning builder");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder','','Spawn1');
    }
    // if not enough wallRepairers
    else if (numSpawn1WaRe < spawn1MinWall) {
        // try to spawn one
        console.log("sp1 -- spawning wall repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer','','Spawn1');
    }
    // if not enough remote harvesters
    else if (numSpawn1ReHa < spawn1MinReHa) {
        // count the number of remote harvs per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag5');

        if ( c_flag1 == 0 ) { var dest = 'Flag1'; }
        else if ( c_flag2 == 0 ) { var dest = 'Flag2'; }
        else if ( c_flag3 == 0 ) { var dest = 'Flag3'; }
        else if ( c_flag4 == 0 ) { var dest = 'Flag4'; }
        else if ( c_flag5 == 0 ) { var dest = 'Flag5'; }
        else { var dest = 'error'; }

        console.log("sp1 -- spawning remote_harvester");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remote_harvester',dest,'Spawn1');
    }
        // claimers
    else if (numSpawn1Clai < spawn1MinClai) {
        // count the number of claimers per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag5');

        var role;
        if ( c_flag1 == 0 ) { var dest = 'Flag1'; role = "claimer"; }
        else if ( c_flag2 == 0 ) { var dest = 'Flag2'; role = "claimer"; }
        else if ( c_flag3 == 0 ) { var dest = 'Flag3'; role = "claimer"; }
        else if ( c_flag4 == 0 ) { var dest = 'Flag4'; role = "claimer"; }
        else if ( c_flag5 == 0 ) { var dest = 'Flag5'; role = "claimer"; }
        else { var dest = 'error'; }

        var energy = '';
        console.log("sp1 -- spawning claimer " + dest + " body - " + role);
        name = Game.spawns.Spawn1.createCustomCreep(energy, role, dest,'Spawn1');
    }

        // start of the status bar
        var name = undefined;

        var roomSp1 = Game.spawns.Spawn1.room;
        var energySp1 = Game.spawns.Spawn1.room.energyCapacityAvailable;
        var energyAvailableSp1 = Game.spawns.Spawn1.room.energyAvailable;

        var status1Sp1 = "H: " + numSpawn1Harv + "/" + spawn1MinHarv;
        var status2Sp1 = " U: " + numSpawn1Upgr + "/" + spawn1MinUgra;
        var status3Sp1 = " R: " + numSpawn1Repa + "/" + spawn1MinRepa;
        var status4Sp1 = " B: " + numSpawn1Buil + "/" + spawn1MinBuil;
        var status5Sp1 = " RH: " + numSpawn1ReHa + "/" + spawn1MinReHa;
        var status6Sp1 = " WR: " + numSpawn1WaRe + "/" + spawn1MinWall;
        var status7Sp1 = " C: " + numSpawn1Clai + "/" + spawn1MinClai;
        var status8Sp1 = " LH: " + numSpawn1LoHa + "/" + spawn1MinLoHa;
        var status9Sp1 = " EM: " + numSpawn1EnMo  + "/" + spawn1MinEner;
        var status10Sp1 =" S: " + numSpawn1Sold + "/" + spawn1MinSold;

        var status11Sp1 = "E: " + energyAvailableSp1 + "/" + energySp1
        var status12Sp1 = " UP: " + roomSp1.controller.progress +
                         "/" + roomSp1.controller.progressTotal +
                        " lvl: " + roomSp1.controller.level;

	var status13Sp1 = " Stored -- " + Game.spawns.Spawn1.room.storage.store[RESOURCE_ENERGY];

        // print the thing
        console.log("Sp1: " + status11Sp1 + status12Sp1 + status13Sp1);
        console.log("Sp1: " + status1Sp1 + status2Sp1 + status3Sp1 + status4Sp1 + status5Sp1 + status6Sp1 +
                        status7Sp1 + status8Sp1 + status9Sp1 + status10Sp1);


// end
}
};
