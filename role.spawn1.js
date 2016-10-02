
module.exports = {
    // a function to run the logic for this role
    run: function() {
   // if not enough harvesters
    if (numSpawn1Harv < spawn1MinHarv) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
        console.log("main -- spawning harvester");
        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numSpawn1Harv == 0) {
            // spawn one with what is available
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
    }

   // if not enough local harvesters
    else if (numSpawn1LoHa < spawn1MinLoHa) {
        var lh_tmp = _.sum(Game.creeps,
                        (c) => c.memory.role == 'local_harvester' &&
                                c.memory.destid == '579faa710700be0674d30fd7'
                        );
        if ( lh_tmp < 2 ) { var dest = '579faa710700be0674d30fd7'; } // north
        else { var dest = '579faa710700be0674d30fd8'; } // south
        console.log("main -- spawning local_harvester -- " + dest + " -- " + lh_tmp);
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'local_harvester',dest);
    }
   // if not enough energy movers
    else if (numSpawn1EnMo < spawn1MinEner) {
        var st_num = _.sum(Game.creeps,
                        (c) => c.memory.role == 'energy_mover'  &&
                                c.memory.destid == '57e7235e6b66411171b7f0f8'
                        );

        var c1_num = _.sum(Game.creeps,
                        (c) => c.memory.role == 'energy_mover' &&
                                c.memory.destid == '57e6b6f9bf7be6eb05caa521'
                        );

        var c2_num =  _.sum(Game.creeps,
                        (c) => c.memory.role == 'energy_mover' &&
                                c.memory.destid == '57e6b5c1135326b41e54835e'
                        );

        if ( st_num == 0 ) { var dest = '57e7235e6b66411171b7f0f8'; } // storage
        else if ( c1_num == 0 ) { var dest = '57e6b6f9bf7be6eb05caa521'; } // controller #1
        else if ( c2_num == 0 ){ var dest = '57e6b5c1135326b41e54835e'; } // controller  #2
        else {  var dest = '57e6530dfb8875006e762b5e'; } // controller #3
        console.log("main -- spawning energy_mover -- " + dest );
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'energy_mover',dest);
    }
    // if not enough soldiers
    else if (numSpawn1Sold < spawn1MinSold) {
        console.log("main -- spawning soldier");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'soldier2','Attack');
    }
    // if not enough upgraders
    else if (numSpawn1Upgr < spawn1MinUgra) {
        console.log("main -- spawning upgrader");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    // if not enough repairers
    else if (numSpawn1Repa < spawn1MinRepa) {
        console.log("main -- spawning repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numSpawn1Buil < spawn1MinBuil) {
        console.log("main -- spawning builder");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
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
        else if ( c_flag5 == 1 ) { var dest = 'Flag5'; role = "claimer"; }  // allow two of these
        else { var dest = 'error'; }

        var energy = '';
        console.log("main -- spawning claimer " + dest + " body - " + role);
        name = Game.spawns.Spawn1.createCustomCreep(energy, role, dest);
    }
    // if not enough wallRepairers
    else if (numSpawn1WaRe < spawn1MinWall) {
        // try to spawn one
        console.log("main -- spawning wall repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
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

        console.log("main -- spawning remote_harvester");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remote_harvester',dest);
    }
// end
}
};
