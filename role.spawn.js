
module.exports = {
    /*
      Harvest, Deliv, Upgrade, Build, Energy, RemoHarv, Claim, Soldier, Repair
    */
    run: function(spawn_num,Hive) {
      [MinHarv,MinDeli,MinUgra,MinBuil,MinEner,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
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
        var numEnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthplace == spawn_name);

        var energy_avail = Game.spawns[spawn_name].room.energyCapacityAvailable;
	//     if ( spawn_name == 'Spawn2' ) { energy_avail = 300; }

        // soldiers
        if (numSold < MinSold) {
           console.log(spawn_name + " -- spawning soldier");
           if ( spawn_name == 'Spawn1' ) { var attackFlag = 'Attack1'; }
           if ( spawn_name == 'Spawn2' ) { var attackFlag = 'Attack2'; }
           if ( spawn_name == 'Spawn3' ) { var attackFlag = 'Attack2'; }
           name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'soldier',attackFlag,spawn_name);
         }
         else if (numSolM < MinSolM) {
            console.log(spawn_name + " -- spawning soldier_melee");
            if ( spawn_name == 'Spawn1' ) { var attackFlag = 'Attack1'; }
            if ( spawn_name == 'Spawn2' ) { var attackFlag = 'Attack2'; }
            if ( spawn_name == 'Spawn3' ) { var attackFlag = 'Attack2'; }
            name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'soldier_melee',attackFlag,spawn_name);
        }
        else if (numSolR < MinSolR) {
           console.log(spawn_name + " -- spawning soldier_ranged");
           if ( spawn_name == 'Spawn1' ) { var attackFlag = 'Attack1'; }
           if ( spawn_name == 'Spawn2' ) { var attackFlag = 'Attack2'; }
           if ( spawn_name == 'Spawn3' ) { var attackFlag = 'Attack2'; }
           name = Game.spawns[spawn_name].createCustomCreep(energy_avail, 'soldier_ranged',attackFlag,spawn_name);
        }
        else if (numSolH < MinSolH) {
          console.log(spawn_name + " -- spawning soldier_healer");
          if ( spawn_name == 'Spawn1' ) { var attackFlag = 'Attack1'; }
          if ( spawn_name == 'Spawn2' ) { var attackFlag = 'Attack2'; }
          if ( spawn_name == 'Spawn3' ) { var attackFlag = 'Attack2'; }
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
   // if not enough energy movers
    else if (numEnMo < MinEner) {

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
        if ( c_flag1 < 2 ) { var dest = 'CFlag1'; role = "claimer_lg"; }
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


    // ----- Below here lies job control
    // container info - actual energy / working energy
    // job states - assigned / complete / abandoned / timed out
    // creep state - source_bound / dest_bound / working / idle

    // job object prototype - spawn_name,type, priority, state, body_type, dest_id, tick_issued, tick_complete
    //    states - assigned / complete / abandoned / timed out / unasssigned

    function Job (spawn_name,type,priority,state,body_type_req,dest_id,tick_issued,tick_complete) {
        this.spawn_name = spawn_name;
        this.type = type;
        this.priority = priority;
        this.state = state;
        this.body_type_req = body_type_req;
        this.dest_id = dest_id;
        this.tick_issued = tick_issued;
        this.tick_complete = tick_complete;

    }

    // variables
    var container_energy_floor = 100;
    var tower_energy_ceiling = 250;
    var link_energy_celiing = 100;
    var empty = 0;
    var deliver_carry_cap = 50;
    var job_TTL = 10;

    // detect sources to harvest
    var sources = Hive.sources[spawn_num];

    // detect containers with energy (working variable >= SOME_VALUE, not actual) needing empty
    var containers = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
      filter: (s) => (
        ( s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= deliver_carry_cap )
        // ( s.structureType == STRUCTURE_CONTAINER && s.memory.working_count >= container_energy_floor )
    )});

    // detect towers needing energy ( update working var, not actual)
    var towers =  Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
       filter: (s) => (
          ( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity - tower_energy_ceiling )
    )});

    // detect sending links needing filling
    var rec_link = Hive.receiving_link[spawn_num];
    var links = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
      filter: (s) => (
        ( s.structureType == STRUCTURE_LINK && s.id != rec_link && s.energy < s.energyCapacity - link_energy_celiing )
    )});

    // detect controllers needing upgrading ( update working var )
    var controller = Game.spawns[spawn_name].room.controller;

    // detect spawns and extensions needing delivery
    var spawns = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
      filter: (s) => (
        ( s.structureType == STRUCTURE_SPAWN && s.energy < s.energyCapacity ) ||
        ( s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity )
      )});

    // detect things needing to be built or repaired ( flag working queue as true for this object id)
    var construction = Game.spawns[spawn_name].room.find(FIND_CONSTRUCTION_SITES);

    // detect resources laying on the ground ( update working var, not actual) <<< --- TODO?

    // when a job is completed, times out, or is abandoned, remove it from the job_queue
    // find those jobs and remove them
    var removed = _.remove(Hive.memory.job_queue, function(s) {
        return  (( Game.time - s.tick_issued ) > job_TTL || s.state == 'abandoned' || s.state == 'complete');
      });

    // do things for each removed job
    for ( let x of removed ) {
      console.log("JQ: removed " + x.dest_id);
      // if the job was timed out or abandoned, adjust any associated containers working_var
      if (( Game.time - x.tick_issued ) > job_TTL || x.state == 'abandoned' ) {
          // get the container associated with the removed job
          let rm_container_id = x.dest_id;
          // get its object
          let rm_container_obj = Game.getObjectById(rm_container_id);
          // if the obj is a container
          if ( rm_container_obj.structureType == STRUCTURE_CONTAINER ) {
            // add deliver_carry_cap back to container working_var since the job did not complete
            var adjustmest = rm_container_obj.memory.working_count + deliver_carry_cap;
            console.log("XX: " + spawn_name + " curr: " + rm_container_obj.memory.working_count + " ++adj: " + adjustmest);
            rm_container_obj.memory.working_count = rm_container_obj.memory.working_count + deliver_carry_cap;
          }
      }

      // find any creep with this job still assigned and remove it from their memory.job // TODO

    }


    // Display container counts
   var all_containers = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
     filter: (s) => (
       ( s.structureType == STRUCTURE_CONTAINER  )
   )});

   for ( let c of all_containers ) {
      //c.memory.working_count = c.store[RESOURCE_ENERGY]; // debugging
      //Hive.memory.job_queue = [];
      console.log("JQ: " + spawn_name + " cont: " + c + " - total - " + c.memory.working_count);
    }

    // now, look for the need for a jobs for each type of job, add them to the queue

    // 01 - fillfrom - aa - source - harvesters
/*
    for ( let source of sources ) { // foreach source in the room
      // search jobs for any jobs with a dest_id == source
      var result = _.find(Hive.memory.job_queue, { 'dest_id' : source });

      if ( result == undefined ) {
        // if no jobs are found, create a fillfrom job for this source
        // create a job object
        var job = new Job(spawn_name,'01aa',1,'unassigned','harvester',source,Game.time,'');
        console.log("JQ: " + spawn_name + " newjob " + source + " job " + job.type );

        // push the job onto the job_queue
        Hive.memory.job_queue.push(job);
      }
    }
    // END -- 01aa
*/

    // 01 - fillfrom - bb - container - deliverers
    if ( containers.length != 0 ) {
      for ( let y of containers) {
        // create a job for each container
        var job = new Job(spawn_name,'01bb',1,'unassigned','deliverer',y.id,Game.time,'');
        console.log("JQ: " + spawn_name + " newjob " + y + " job " + job.type );
        // push the job onto the job_queue
        Hive.memory.job_queue.push(job);
        // record the desired resource state
        y.memory.working_count = y.memory.working_count - deliver_carry_cap;
        var adjustmest = y.working_count - deliver_carry_cap;
        console.log("XX: " + spawn_name + " curr: " + y.memory.working_count + " --adj: " + adjustmest);
      }
    }
    // END -- 01bb


    // 01 - fillfrom - cc - storage - deliverers / upgraders *** TODO

    // 01 - fillfrom - dd - receiving links - upgraders
    // 01 - fillfrom - ee - resources on the ground - builder

    // 02 - delivto - aa - closest container - harvesters
    // 02 - delivto - bb - sending links - harvesters

    // 02 - delivto - cc - spawns extensions - deliverer *** TODO
    // 02 - delivto - dd - towers - deliverer *** TODO
    // 02 - delivto - ee - storage - deliverer *** TODO

    // 02 - delivto - ff - controller - upgrader

    // 03 - work - aa - construction sites - builder
    // 03 - work - bb - repair jobs - builder


    // now, try to assign jobs to creeps
    job_index = 0;
    for ( let job of Hive.memory.job_queue) {
/*
      if ( result == undefined ) {
        // find local, empty, idle, harvester, with memory.destid = source
        var harvester = _.find(Game.creeps, (c) =>
          ( c.memory.birthplace == spawn_name ) &&
          ( _.sum(c.carry) == empty ) &&
          ( c.memory.state == 'idle' ) &&
          ( c.memory.role == 'harvester' ) &&
          ( c.memory.destid == source )
        );
*/
      // assign the job to the creep
      //harvester.memory.job = job_index;
      //console.log("assigning -- " + job + " to "+ harvester + " index " + job_index);

      //console.log("JQ: " + job.spawn_name+ " index " + x + " type " + job.type + " " + job.dest_id);
      job_index++;
      // factors - creep state, energy carried, body type

      // assign the creep to the job
      //creep.memory.job = job_num;

      // mark the job as assigned

    }
  }
};
