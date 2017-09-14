module.exports = {
  run: function(spawn_num,Hive) {
    [MinHarv,MinDeli,MinUgra,MinBuil,MinClReg,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
    var spawn_name = Hive.spawn_names[spawn_num];
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
  }
};
