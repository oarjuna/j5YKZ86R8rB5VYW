
module.exports = {
    /*
      Harvest, Deliv, Upgrade, Build, Energy, RemoHarv, Claim, Soldier, Repair
    */
    run: function(spawn_num,Empire) {
      [MinHarv,MinDeli,MinUgra,MinBuil,MinEner,MinReHa,MinClai,MinSold,MinRepa] =  Empire.spawn_levels[spawn_num];
      var spawn_name = Empire.spawn_names[spawn_num];

        console.log("Sp -- " + MinHarv + " " + spawn_name);

        // count the number of creeps alive for each role born at
        var numHarv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == spawn_name);
        var numReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harv' && c.memory.birthplace == spawn_name);
        var numDeli = _.sum(Game.creeps, (c) => c.memory.role == 'deliverer' && c.memory.birthplace == spawn_name);
        var numUpgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == spawn_name);
        var numBuil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == spawn_name);
        var numClai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == spawn_name);
        var numSold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == spawn_name);
        var numRepa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == spawn_name);
        var numWaRe = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.birthplace == spawn_name);
        var numEnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthplace == spawn_name);

   //var energy_avail = Game.spawns.spawn_name.room.energyCapacityAvailable;

   // if not enough harvesters
    if (numHarv < MinHarv) {
      var h_tmp = _.sum(Game.creeps,
                      (c) => c.memory.role == 'harvester' &&
                              c.memory.destid == '5873bcc211e3e4361b4d81ec'
                      );

        if ( h_tmp < 2 ) { var dest = '5873bcc211e3e4361b4d81ec'; } // north
        else { var dest = '5873bcc211e3e4361b4d81ed'; } // south

        // try to spawn one
        name = Game.spawns.spawn_name.createCustomCreep(energy_avail, 'harvester',dest,spawn_name);
        console.log("sp1 -- spawning harvester");

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numHarv == 0) {
            // spawn one with what is available
            name = Game.spawns.spawn_name.createCustomCreep(
                Game.spawns.spawn_name.room.energyAvailable, 'harvester','',spawn_name);
        }
    }

   // if not enough deliverers
    else if (numDeli < MinDeli) {
        console.log("sp1 -- spawning deliverer");
        name = Game.spawns.spawn_name.createCustomCreep(energy_avail, 'deliverer',dest,spawn_name);
    }

   // if not enough energy movers
    else if (numEnMo < MinEner) {
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
        name = Game.spawns.spawn_name.createCustomCreep(energy_avail, 'energy_mover',dest,spawn_name);
    }
    // if not enough soldiers
    else if (numSold < MinSold) {
        console.log("sp1 -- spawning soldier");
        name = Game.spawns.spawn_name.createCustomCreep(energy_avail, 'soldier','Attack',spawn_name);
    }
    // if not enough upgraders
    else if (numUpgr < MinUgra) {
        console.log("sp1 -- spawning upgrader");
        name = Game.spawns.spawn_name.createCustomCreep(energy_avail, 'upgrader','',spawn_name);
    }
    // if not enough repairers
    else if (numRepa < MinRepa) {
        console.log("sp1 -- spawning repairer");
        name = Game.spawns.spawn_name.createCustomCreep(energy_avail, 'repairer','',spawn_name);
    }
    // if not enough builders
    else if (numBuil < MinBuil) {
        console.log("sp1 -- spawning builder");
        name = Game.spawns.spawn_name.createCustomCreep(energy_avail, 'builder','',spawn_name);
    }

    // if not enough remote harvesters
    else if (numReHa < MinReHa) {
        // count the number of remote harvs per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag5');

        if ( c_flag1 < 3 ) { var dest = 'Flag1'; }
        else if ( c_flag2 == 9999999 ) { var dest = 'Flag2'; }
        else if ( c_flag3 == 0 ) { var dest = 'Flag3'; }
        else if ( c_flag4 == 0 ) { var dest = 'Flag4'; }
        else if ( c_flag5 == 0 ) { var dest = 'Flag5'; }
        else { var dest = 'error'; }

        console.log("sp1 -- spawning remote_harv");
        name = Game.spawns.spawn_name.createCustomCreep(energy_avail, 'remote_harv',dest,spawn_name);
    }
        // claimers
    else if (numClai < MinClai) {
        // count the number of claimers per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag5');

        var role;
        if ( c_flag1 < 1 ) { var dest = 'CFlag1'; role = "claimer"; }
        else if ( c_flag2 == 0 ) { var dest = 'CFlag1'; role = "claimer"; }
        else if ( c_flag3 == 0 ) { var dest = 'CFlag1'; role = "claimer"; }
        else if ( c_flag4 == 0 ) { var dest = 'CFlag1'; role = "claimer"; }
        else if ( c_flag5 == 0 ) { var dest = 'CFlag1'; role = "claimer"; }
        else { var dest = 'error'; }

        console.log("sp1 -- spawning claimer " + dest + " body - " + role);
        name = Game.spawns.spawn_name.createCustomCreep(energy_avail, role, dest,spawn_name);
    }
    // local Tower control
    var towers = Game.rooms.W28S81.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });

    for (let tower of towers) {
      var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

      var repair_target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) =>
          ( s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax) ||
          ( s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax) ||
          ( s.structureType == STRUCTURE_STORAGE && s.hits < s.hitsMax) ||
          ( s.structureType == STRUCTURE_WALL && s.hits < 25000 ) ||
          ( s.structureType == STRUCTURE_RAMPART && s.hits < 25000)
        });

        if (target != undefined) {
          console.log(tower + " -- attacking " + target);
          tower.attack(target);
        }
        else if (repair_target != undefined ) {
          console.log(tower + " -- repairing " + repair_target);
          tower.repair(repair_target);
        }
    }

}
};
