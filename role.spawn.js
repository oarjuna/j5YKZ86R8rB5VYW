
module.exports = {
    /*
      Harvest, Deliv, Upgrade, Build, ClaimrREg, RemoHarv, Claim, Soldier, Repair
    */
    var jobcontrol = require('jobcontrol');

    run: function(spawn_num,Hive) {
      [MinHarv,MinDeli,MinUgra,MinBuil,MinClReg,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
      var spawn_name = Hive.spawn_names[spawn_num];
        // count the number of creeps alive for each role born at
        var numHarv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == spawn_name);
        var numReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harv' && c.memory.birthplace == spawn_name);
        var numDeli = _.sum(Game.creeps, (c) => c.memory.role == 'deliverer' && c.memory.birthplace == spawn_name);
        var numUpgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == spawn_name);
        var numBuil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == spawn_name);
        var numClai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == spawn_name);
        var numSold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == spawn_name);
        var numSolM = _.sum(Game.creeps, (c) => c.memory.role == 'soldier_melee' && c.memory.birthplace == spawn_name);
        var numSolR = _.sum(Game.creeps, (c) => c.memory.role == 'soldier_ranged' && c.memory.birthplace == spawn_name);
        var numSolH = _.sum(Game.creeps, (c) => c.memory.role == 'soldier_healer' && c.memory.birthplace == spawn_name);
        var numRepa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == spawn_name);
        var numClReg = _.sum(Game.creeps, (c) => c.memory.role == 'claimer_reg' && c.memory.birthplace == spawn_name);

        var energy_avail = Game.spawns[spawn_name].room.energyCapacityAvailable;
	      if ( spawn_name == 'Spawn4' ) { energy_avail = 550; }

        // soldiers
        if (numSold < MinSold) {
           console.log(spawn_name + " -- spawning soldier");
           if ( spawn_name == 'Spawn1' ) { var attackFlag = 'Attack1'; }
           if ( spawn_name == 'Spawn2' ) { var attackFlag = 'Attack2'; }
           if ( spawn_name == 'Spawn3' ) { var attackFlag = 'Attack3'; }
           name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'soldier',attackFlag,spawn_name);
         }
         else if (numSolM < MinSolM) {
            console.log(spawn_name + " -- spawning soldier_melee");
            if ( spawn_name == 'Spawn1' ) { var attackFlag = 'Attack1'; }
            if ( spawn_name == 'Spawn2' ) { var attackFlag = 'Attack2'; }
            if ( spawn_name == 'Spawn3' ) { var attackFlag = 'Attack3'; }
            name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'soldier_melee',attackFlag,spawn_name);
        }
        else if (numSolR < MinSolR) {
           console.log(spawn_name + " -- spawning soldier_ranged");
           if ( spawn_name == 'Spawn1' ) { var attackFlag = 'Attack1'; }
           if ( spawn_name == 'Spawn2' ) { var attackFlag = 'Attack2'; }
           if ( spawn_name == 'Spawn3' ) { var attackFlag = 'Attack3'; }
           name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'soldier_ranged',attackFlag,spawn_name);
        }
        else if (numSolH < MinSolH) {
          console.log(spawn_name + " -- spawning soldier_healer");
          if ( spawn_name == 'Spawn1' ) { var attackFlag = 'Attack1'; }
          if ( spawn_name == 'Spawn2' ) { var attackFlag = 'Attack2'; }
          if ( spawn_name == 'Spawn3' ) { var attackFlag = 'Attack3'; }
          name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'soldier_healer',attackFlag,spawn_name);
        }

   // if not enough harvesters
   // TODO -- deliver_to_spawn memory flag

   else  if (numHarv < MinHarv) {
      for (let xx in Hive.sources[spawn_num] ) {
        var h_tmp = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.destid == Hive.sources[spawn_num][xx]);
        //console.log(spawn_name + " -- " + h_tmp  + " " +  Hive.harvs_per_source[spawn_num][xx]);
        if ( h_tmp < Hive.harvs_per_source[spawn_num][xx]) {
           var dest =  Hive.sources[spawn_num][xx];
        }
      }
        // try to spawn one
        name = Game.spawns[spawn_name].createCustomCreep(energy_avail,'harvester',dest,spawn_name);
        console.log(spawn_name + " -- spawning harvester for: "+ dest);
    }


   // if not enough deliverers
    else if (numDeli < MinDeli) {
        console.log(spawn_name + " -- spawning deliverer");
        name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'deliverer',Hive.receiving_link[spawn_num],spawn_name);
    }
   // if not enough regular claimers
    else if (numClReg < MinClReg) {
      console.log(spawn_name + " -- spawning claimer_Reg");
      var return_id =  Game.spawns[spawn_name].room.storage.id;
      name =Game.spawns[spawn_name].createCustomCreep(energy_avail,'claimer_reg','CFlag1',spawn_name);
    }
    // if not enough soldiers
    else if (numSold < MinSold) {
        console.log(spawn_name + " -- spawning soldier");
        name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'soldier','Attack',spawn_name);
    }
    // if not enough upgraders
    else if (numUpgr < MinUgra) {
        console.log(spawn_name + " -- spawning upgrader - dest: " + Hive.receiving_link[spawn_num]);
        name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'upgrader',Hive.receiving_link[spawn_num],spawn_name);
    }
    // if not enough repairers
    else if (numRepa < MinRepa) {
        console.log(spawn_name + " -- spawning repairer");
        name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'repairer','',spawn_name);
    }
    // if not enough builders
    else if (numBuil < MinBuil) {
        console.log(spawn_name + " -- spawning builder");
        name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'builder','',spawn_name);
    }

    // if not enough remote harvesters
    // TODO -- remote harv do_building flag
    else if (numReHa < MinReHa) {
        // count the number of remote harvs per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == spawn_name + 'Flag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == spawn_name + 'Flag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == spawn_name + 'Flag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harv' && c.memory.destid == spawn_name + 'Flag4');

        // one remote harvester per flag, four flags per spawn
        if ( c_flag1 < 2 ) { var dest = spawn_name + 'Flag1'; }
        else if ( c_flag2 == 0 ) { var dest = spawn_name +'Flag2'; }
        else if ( c_flag3 == 0 ) { var dest = spawn_name + 'Flag3'; }
        else if ( c_flag4 == 0 ) { var dest = spawn_name + 'Flag4'; }
        else { var dest = 'error'; }

        console.log(spawn_name + " -- spawning remote_harv");
        var return_id =  Game.spawns[spawn_name].room.storage.id;
        name =Game.spawns[spawn_name].createCustomCreep(energy_avail,'remote_harv',dest,spawn_name,return_id);
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
        if ( c_flag1 < 2 ) { var dest = 'CFlag1'; role = "claimer"; }
        else if ( c_flag2 == 0 ) { var dest = 'CFlag1'; role = "claimer"; }
        else if ( c_flag3 == 0 ) { var dest = 'CFlag1'; role = "claimer"; }
        else if ( c_flag4 == 0 ) { var dest = 'CFlag1'; role = "claimer"; }
        else if ( c_flag5 == 0 ) { var dest = 'CFlag1'; role = "claimer"; }
        else { var dest = 'error'; }

        console.log(spawn_name + " -- spawning claimer " + dest + " body - " + role);
        name = Game.spawns[spawn_name].createCustomCreep(energy_avail, role, dest,spawn_name);
    }

    // local Tower control
    var towers = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });

    var wall_ramp_str = 55000;


    for (let tower of towers) {
      //console.log("RCL: " +  Game.spawns[spawn_name].room.controller.level);

      if (   Game.spawns[spawn_name].room.controller.level < 5 ) { var wall_ramp_str = 5000; }
      else {
      //  var wall_upgrades =
        var wall_ramp_str = 60000;

      }

      var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: (s) => (
          s.getActiveBodyparts(ATTACK) != 0         ||
          s.getActiveBodyparts(RANGED_ATTACK) != 0  ||
          s.getActiveBodyparts(CLAIM) != 0          ||
          s.getActiveBodyparts(HEAL) != 0          ||
          s.getActiveBodyparts(WORK)
         )});

         var weak_target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
           filter: (s) => (
             s.hits < 110
         )});

         if ( target == undefined ) { target = weak_target; }

       if ( target ) {
          console.log("TW: " + spawn_name+ " " + target); // We are under attack!
          // set alert flag for room to 'red'
          Game.spawns[spawn_name].room.controller.memory.alert_state = 'red';
          //console.log("TW: alert " + spawn_name+ " " + Game.spawns[spawn_name].room.controller.memory.alert_state);
        }
        else {
          Game.spawns[spawn_name].room.controller.memory.alert_state = 'green';
          //console.log("TW: alert " + spawn_name+ " " + Game.spawns[spawn_name].room.controller.memory.alert_state);
        }

      var repair_target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) =>
          ( s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax - 1000) ||
          ( s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax - 25000 ) ||
          ( s.structureType == STRUCTURE_WALL && s.hits < wall_ramp_str ) ||
          ( s.structureType == STRUCTURE_RAMPART && s.hits < wall_ramp_str)
        });

        tower.room.visual.circle(tower.pos,
            {fill: 'transparent', radius: 20, stroke: 'red'});

        tower.room.visual.circle(tower.pos,
            {fill: 'transparent', radius: 10, stroke: 'blue'});

        if (target != undefined) {
          console.log(spawn_name + " " + tower + " -- attacking " + target);
          tower.attack(target);
        }
        else if (repair_target != undefined && tower.energy > 200 ) { // combat reserve
          console.log(spawn_name + " " + tower + " -- repairing " + repair_target);
          tower.repair(repair_target);
        }
    }

    // Local Link control
    for ( let link of Hive.links[spawn_num]) {
      // Find the receiving link
      var link_obj = Game.getObjectById(link);
      if ( link_obj != undefined && ( link == Hive.receiving_link[spawn_num]) ) {
        //console.log("rec link: " + link_obj);
        var receiving_link = link_obj;
      }
    }

    // check if the sending lnks are full, xfer if so
    for ( let link of Hive.links[spawn_num]) {
      var link_obj = Game.getObjectById(link);
      if ( link_obj != undefined && ( link != Hive.receiving_link[spawn_num])  ) {
          var status = link_obj.transferEnergy(receiving_link);
          //console.log("link xfer status: " + status + " : " + link_obj);
      }
    }
    // run job control
    jobcontrol.run(spawn_num,Hive)

  }
};
