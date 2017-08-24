
module.exports = {
    // a function to run the logic for this role
    run: function(foo) {
        // spawn levels
        var spawn2MinHarv = 4; // 3
        var spawn2MinDeli = 4; // 3
        var spawn2MinUgra = 5; // 3
        var spawn2MinBuil = 1; // 1
        var spawn2MinWall = 0; // 1
        var spawn2MinEner = 0; // 1

        var spawn2MinReHa = 2;
        var spawn2MinClai = 1;
        var spawn2MinSold = 0;
        var spawn2MinRepa = 1;

        // count the number of creeps alive for each role born at Spawn2
        var numSpawn2Harv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == 'Spawn2');
        var numSpawn2ReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harvester' && c.memory.birthplace == 'Spawn2');
        var numSpawn2Deli = _.sum(Game.creeps, (c) => c.memory.role == 'deliverer' && c.memory.birthplace == 'Spawn2');
        var numSpawn2Upgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == 'Spawn2');
        var numSpawn2Buil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == 'Spawn2');
        var numSpawn2Clai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == 'Spawn2');
        var numSpawn2Sold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == 'Spawn2');
        var numSpawn2Repa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == 'Spawn2');
        var numSpawn2WaRe = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.birthplace == 'Spawn2');
        var numSpawn2EnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthplace == 'Spawn2');

        console.log("\n#------------------#");

   // if not enough harvesters
    if (numSpawn2Harv < spawn2MinHarv) {
      var h_tmp = _.sum(Game.creeps,
                      (c) => c.memory.role == 'harvester' &&
                              c.memory.destid == '5873bcc211e3e4361b4d81ec'
                      );

        if ( h_tmp < 2 ) { var dest = '5873bcc211e3e4361b4d81ec'; } // north
        else { var dest = '5873bcc211e3e4361b4d81ed'; } // south

        // try to spawn one
        name = Game.spawns.Spawn2.createCustomCreep(energy, 'harvester',dest,'Spawn2');
        console.log("sp1 -- spawning harvester");

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numSpawn2Harv == 0) {
            // spawn one with what is available
            name = Game.spawns.Spawn2.createCustomCreep(
                Game.spawns.Spawn2.room.energyAvailable, 'harvester_lite','','Spawn2');
        }
    }

   // if not enough deliverers
    else if (numSpawn2Deli < spawn2MinDeli) {
        console.log("sp1 -- spawning deliverer");
        name = Game.spawns.Spawn2.createCustomCreep(energy, 'deliverer',dest,'Spawn2');
    }
   // if not enough energy movers
    else if (numSpawn2EnMo < spawn2MinEner) {
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
        name = Game.spawns.Spawn2.createCustomCreep(energy, 'energy_mover',dest,'Spawn2');
    }
    // if not enough soldiers
    else if (numSpawn2Sold < spawn2MinSold) {
        console.log("sp1 -- spawning soldier");
        name = Game.spawns.Spawn2.createCustomCreep(energy, 'soldier','Attack','Spawn2');
    }
    // if not enough upgraders
    else if (numSpawn2Upgr < spawn2MinUgra) {
        console.log("sp1 -- spawning upgrader");
        name = Game.spawns.Spawn2.createCustomCreep(energy, 'upgrader','','Spawn2');
    }
    // if not enough repairers
    else if (numSpawn2Repa < spawn2MinRepa) {
        console.log("sp1 -- spawning repairer");
        name = Game.spawns.Spawn2.createCustomCreep(energy, 'repairer','','Spawn2');
    }
    // if not enough builders
    else if (numSpawn2Buil < spawn2MinBuil) {
        console.log("sp1 -- spawning builder");
        name = Game.spawns.Spawn2.createCustomCreep(energy, 'builder','','Spawn2');
    }
    // if not enough wallRepairers
    else if (numSpawn2WaRe < spawn2MinWall) {
        // try to spawn one
        console.log("sp1 -- spawning wall repairer");
        name = Game.spawns.Spawn2.createCustomCreep(energy, 'wallRepairer','','Spawn2');
    }
    // if not enough remote harvesters
    else if (numSpawn2ReHa < spawn2MinReHa) {
        // count the number of remote harvs per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag5');

        if ( c_flag1 < 3 ) { var dest = 'Flag1'; }
        else if ( c_flag2 == 0 ) { var dest = 'Flag2'; }
        else if ( c_flag3 == 0 ) { var dest = 'Flag3'; }
        else if ( c_flag4 == 0 ) { var dest = 'Flag4'; }
        else if ( c_flag5 == 0 ) { var dest = 'Flag5'; }
        else { var dest = 'error'; }

        console.log("sp1 -- spawning remote_harvester");
        name = Game.spawns.Spawn2.createCustomCreep(energy, 'remote_harvester',dest,'Spawn2');
    }
        // claimers
    else if (numSpawn2Clai < spawn2MinClai) {
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
        name = Game.spawns.Spawn2.createCustomCreep(energy, role, dest,'Spawn2');
    }

        // start of the status bar
        var name = undefined;

        var roomSp2 = Game.spawns.Spawn2.room;
        var energySp2 = Game.spawns.Spawn2.room.energyCapacityAvailable;
        var energyAvailableSp2 = Game.spawns.Spawn2.room.energyAvailable;

        var status1Sp2 = "H: " + numSpawn2Harv + "/" + spawn2MinHarv;
        var status2Sp2 = " U: " + numSpawn2Upgr + "/" + spawn2MinUgra;
        var status3Sp2 = " R: " + numSpawn2Repa + "/" + spawn2MinRepa;
        var status4Sp2 = " B: " + numSpawn2Buil + "/" + spawn2MinBuil;
        var status5Sp2 = " RH: " + numSpawn2ReHa + "/" + spawn2MinReHa;
        var status6Sp2 = " WR: " + numSpawn2WaRe + "/" + spawn2MinWall;
        var status7Sp2 = " C: " + numSpawn2Clai + "/" + spawn2MinClai;
        var status8Sp2 = " De: " + numSpawn2Deli + "/" + spawn2MinDeli;
        var status9Sp2 = " EM: " + numSpawn2EnMo  + "/" + spawn2MinEner;
        var status10Sp2 =" S: " + numSpawn2Sold + "/" + spawn2MinSold;

        var status11Sp2 = "E: " + energyAvailableSp2 + "/" + energySp2
        var status12Sp2 = " UP: " + roomSp2.controller.progress +
                         "/" + roomSp2.controller.progressTotal +
                        " lvl: " + roomSp2.controller.level;

	//var status13Sp2 = " Stored -- " +  _.sum(roomSp2.storage.store[RESOURCE_ENERGY]);
	var status13Sp2 = " Stored -- R ";

        // print the thing
        console.log("Sp2: " + status11Sp2 + status12Sp2 + status13Sp2);
        console.log("Sp2: " + status1Sp2 + status2Sp2 + status3Sp2 + status4Sp2 + status5Sp2 + status6Sp2 +
                        status7Sp2 + status8Sp2 + status9Sp2 + status10Sp2);


// end
}
};
