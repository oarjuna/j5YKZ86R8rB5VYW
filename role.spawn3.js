
module.exports = {
    // a function to run the logic for this role
    run: function(spawn3MinHarv,spawn3MinDeli,spawn3MinUgra,spawn3MinBuil,spawn3MinEner,spawn3MinReHa,spawn3MinClai,spawn3MinSold,spawn3MinRepa) {
  
        // count the number of creeps alive for each role born at Spawn3
        var numSpawn3Harv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == 'Spawn3');
        var numSpawn3ReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harv' && c.memory.birthplace == 'Spawn3');
        var numSpawn3Deli = _.sum(Game.creeps, (c) => c.memory.role == 'deliverer' && c.memory.birthplace == 'Spawn3');
        var numSpawn3Upgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == 'Spawn3');
        var numSpawn3Buil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == 'Spawn3');
        var numSpawn3Clai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == 'Spawn3');
        var numSpawn3Sold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == 'Spawn3');
        var numSpawn3Repa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == 'Spawn3');
        var numSpawn3WaRe = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.birthplace == 'Spawn3');
        var numSpawn3EnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthplace == 'Spawn3');


   var energy_avail = Game.spawns.Spawn3.room.energyCapacityAvailable;

   // if not enough harvesters
    if (numSpawn3Harv < spawn3MinHarv) {
      var h_tmp = _.sum(Game.creeps,
                      (c) => c.memory.role == 'harvester' &&
                              c.memory.destid == '5873bcc511e3e4361b4d822f'
                      );

        if ( h_tmp < 2 ) { var dest = '5873bcc511e3e4361b4d822f'; } // west
        else { var dest = '5873bcc511e3e4361b4d822e'; } // east

        // try to spawn one
        name = Game.spawns.Spawn3.createCustomCreep(energy_avail, 'harvester',dest,'Spawn3');
        console.log("sp2 -- spawning harvester");

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numSpawn3Harv == 0) {
            // spawn one with what is available
            name = Game.spawns.Spawn3.createCustomCreep(
                Game.spawns.Spawn3.room.energyAvailable, 'harvester','','Spawn3');
        }
    }

   // if not enough deliverers
    else if (numSpawn3Deli < spawn3MinDeli) {
        console.log("sp2 -- spawning deliverer");
        name = Game.spawns.Spawn3.createCustomCreep(energy_avail, 'deliverer',dest,'Spawn3');
    }
   // if not enough energy_avail movers
    else if (numSpawn3EnMo < spawn3MinEner) {
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
        console.log("sp2 -- spawning energy_mover -- " + dest );
        name = Game.spawns.Spawn3.createCustomCreep(energy_avail, 'energy_mover',dest,'Spawn3');
    }
    // if not enough soldiers
    else if (numSpawn3Sold < spawn3MinSold) {
        console.log("sp2 -- spawning soldier");
        name = Game.spawns.Spawn3.createCustomCreep(energy_avail, 'soldier','Attack','Spawn3');
    }
    // if not enough upgraders
    else if (numSpawn3Upgr < spawn3MinUgra) {
        console.log("sp2 -- spawning upgrader");
        name = Game.spawns.Spawn3.createCustomCreep(energy_avail, 'upgrader','','Spawn3');
    }
    // if not enough repairers
    else if (numSpawn3Repa < spawn3MinRepa) {
        console.log("sp2 -- spawning repairer");
        name = Game.spawns.Spawn3.createCustomCreep(energy_avail, 'repairer','','Spawn3');
    }
    // if not enough builders
    else if (numSpawn3Buil < spawn3MinBuil) {
        console.log("sp2 -- spawning builder");
        name = Game.spawns.Spawn3.createCustomCreep(energy_avail, 'builder','','Spawn3');
    }

    // if not enough remote harvesters
    else if (numSpawn3ReHa < spawn3MinReHa) {
        // count the number of remote harvs per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == 'Flag5');

        if ( c_flag1 == 99999 ) { var dest = 'Flag1'; } // spawn 1 using this flag
        else if ( c_flag2  < 3 ) { var dest = 'Flag2'; }
        else if ( c_flag3 == 0 ) { var dest = 'Flag3'; }
        else if ( c_flag4 == 0 ) { var dest = 'Flag4'; }
        else if ( c_flag5 == 0 ) { var dest = 'Flag5'; }
        else { var dest = 'error'; }

        console.log("sp2 -- spawning remote_harv");
        name = Game.spawns.Spawn3.createCustomCreep(energy_avail, 'remote_harv',dest,'Spawn3');
    }
        // claimers
    else if (numSpawn3Clai < spawn3MinClai) {
        // count the number of claimers per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'CFlag5');

        var role;
        if ( c_flag1 < 1 ) { var dest = 'CFlag2'; role = "claimer"; }
        else if ( c_flag2 < 1 ) { var dest = 'CFlag2'; role = "claimer"; }
        else if ( c_flag3 == 0 ) { var dest = 'CFlag2'; role = "claimer"; }
        else if ( c_flag4 == 0 ) { var dest = 'CFlag2'; role = "claimer"; }
        else if ( c_flag5 == 0 ) { var dest = 'CFlag2'; role = "claimer"; }
        else { var dest = 'error'; }
        console.log("sp2 -- spawning claimer " + dest + " body - " + role);
        name = Game.spawns.Spawn3.createCustomCreep(energy_avail, role, dest,'Spawn3');
    }

    // local Tower control
    var towers = Game.rooms.W26S81.find(FIND_STRUCTURES, {
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
