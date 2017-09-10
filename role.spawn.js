
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
        this.uuid = function uuid()  {
          var uuid = "", i, random,uuidlen = 12;

          for (i = 0; i < uuidlen; i++) {
            random = Math.random() * 16 | 0;
            if (i == 8 || i == 12 || i == 16 || i == 20) {
              uuid += "-";
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
          }
          return uuid;
        };
        this.id = this.uuid();
    }

    // variables
    var container_energy_floor = 100;
    var container_energy_ceiling = deliver_carry_cap;
    var tower_energy_ceiling = 250;
    var link_energy_celiing = 100;
    var empty = 0;
    var deliver_carry_cap = 50;
    var harvester_carry_cap = 50;
    var job_TTL = 20;

    // detect sources to harvest
    var sources = Hive.sources[spawn_num];

    // detect containers with energy needing empyting (use working count >=carry cap, not actual store.energy )
    var containers = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
      filter: (s) => (
        ( s.structureType == STRUCTURE_CONTAINER && s.memory.working_count >= deliver_carry_cap )
    )});

    // detect towers needing energy ( update working var, not actual)
    var towers =  Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
       filter: (s) => (
          ( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity - tower_energy_ceiling )
    )});

    // detect sending links needing filling
    var rec_link = Hive.receiving_link[spawn_num];


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
      console.log("JQ: " + spawn_name + " removed job " + x.id + " dest " + x.dest_id);
      // if the job was timed out or abandoned, adjust any associated containers working_count
      if (( Game.time - x.tick_issued ) > job_TTL || x.state == 'abandoned' ) {
          // get the container associated with the removed job
          let rm_container_id = x.dest_id;
          // get its object
          let rm_container_obj = Game.getObjectById(rm_container_id);
          // if the obj is a container
          if ( rm_container_obj.structureType == STRUCTURE_CONTAINER ) {
            // add deliver_carry_cap back to container working_count since the job did not complete
            var adjustmest = rm_container_obj.memory.working_count + deliver_carry_cap;
            console.log("\tXX: " + spawn_name + " curr: " + rm_container_obj.memory.working_count + " ++adj: " + adjustmest);
            rm_container_obj.memory.working_count = rm_container_obj.memory.working_count + deliver_carry_cap;
          }
      }

      // find any creep with this job's id still assigned and remove it from their memory.job // TODO

    }


    // Display container counts // debugging
   var all_containers = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
     filter: (s) => (
       ( s.structureType == STRUCTURE_CONTAINER  )
   )});

/*   for ( let c of all_containers ) {
      //c.memory.working_count = c.store[RESOURCE_ENERGY]; // debugging
      //Hive.memory.job_queue = [];
    /*  if ( c.memory.working_count > 0 ) {
        console.log("JQ: " + spawn_name + " cont: " + c + " - total - " + c.memory.working_count);
      }
    }*/

    // now, look for the need for a jobs for each type of job, add them to the queue

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 01 - fillfrom - aa - source - harvesters

    // find all local, idle, empty, harvs
    // this will create an assigned job for a specific harvester
    var harvesters = _.filter(Game.creeps, (c) =>
      ( c.memory.birthplace == spawn_name ) &&
      ( _.sum(c.carry) == 0 ) &&
      ( c.memory.state == 'idle' ) &&
      ( c.memory.role == 'harvester' )
    );

    if ( harvesters != undefined ) {
      for ( let harv of harvesters ) { // foreach harvester
        // find it's source
        var mem_source = harv.memory.destid;
        var dest = Game.getObjectById(mem_source);
        // create a job object
        var job = new Job(spawn_name,'01aa',1,'assigned','harvester',dest,Game.time,'');
        console.log("JQ: " + spawn_name + " newjob " + dest + " job " + job.type + " j_id: " + job.id );
        // push the job onto the job_queue
        Hive.memory.job_queue.push(job);
        // assign the job to the creep
        harv.memory.job = job.id;
      }
    }
    // END -- 01aa
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    // 01 - fillfrom - bb - container - deliverers
    if ( containers.length != 0 ) {
      for ( let y of containers) {
        // while there is energy in the container, create jobs
        while ( y.memory.working_count >= deliver_carry_cap) {
          // create a job for each container
          var job = new Job(spawn_name,'01bb',1,'unassigned','deliverer',y.id,Game.time,'');
          console.log("JQ: " + spawn_name + " newjob " + y + " job " + job.type + " j_id: " + job.id );
          // push the job onto the job_queue
          Hive.memory.job_queue.push(job);
          // record the desired resource state
          var adjustmest = y.memory.working_count - deliver_carry_cap;
          if ( adjustmest < 0 ) { adjustmest = 0; }
          console.log("\tXX: " + spawn_name + " id: " + y.id + " curr: " + y.memory.working_count + " --adj: " + adjustmest );
          y.memory.working_count = y.memory.working_count - deliver_carry_cap;
          if ( y.memory.working_count < 0 ) { y.memory.working_count = 0;  }
        }
      }
    }
    // END -- 01bb
*/

    // 01 - fillfrom - cc - storage - deliverers / upgraders

    // 01 - fillfrom - dd - receiving links - upgraders
    // 01 - fillfrom - ee - resources on the ground - builder

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 02 - delivto - aa - closest container or sending link - harvesters
    // this will create an assigned job for a specific harvester
    // get a list of local, full, idle harvesters
    var harvesters = _.filter(Game.creeps, (c) =>
      ( c.memory.birthplace == spawn_name ) &&
      ( _.sum(c.carry) == c.carryCapacity ) &&
      ( c.memory.state == 'idle' ) &&
      ( c.memory.role == 'harvester' )
    );

    if ( harvesters != undefined ) {
      for ( let harv of harvesters ) { // foreach harvester
        // find the closest non-full container or non-full sending link
        var container = harv.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (s) => (
            ( s.structureType == STRUCTURE_CONTAINER && ( s.memory.working_count < s.storeCapacity - harvester_carry_cap ) )
        )});

        var structure_link = harv.pos.findInRange(FIND_MY_STRUCTURES, 2, {
          filter: (s) => ( // this should use s.memory.working count -- need to setup memory for links
            ( s.structureType == STRUCTURE_LINK && s.id != rec_link && s.energy < s.energyCapacity - link_energy_celiing )
        )});
        console.log("JQ: full harv: " + harv);

        if ( structure_link[0] != undefined ) {
          console.log("\t link : full harv dest: " + structure_link[0]);
          var dest = structure_link[0];

        }
        else if ( container != undefined ) {
          console.log("\t cont: full harv dest: " + container);
          var dest = container;
        }
        else {
          // no destination
        }
        // create a new job
        if ( dest != undefined ) {
          var job = new Job(spawn_name,'02aa',1,'assigned','harvester',dest.id,Game.time,'');
          console.log("JQ: " + spawn_name + " newjob " + dest.id + " job " + job.type + " j_id: " + job.id );
          // push the job onto the job_queue
          Hive.memory.job_queue.push(job);
          // assign the job to the creep
          harv.memory.job = job.id;
        }
      }
    }
    // END 02aa
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // 02 - delivto - cc - spawns extensions - deliverer
    // 02 - delivto - dd - towers - deliverer
    // 02 - delivto - ee - storage - deliverer

    // 02 - delivto - ff - controller - upgrader

    // 03 - work - aa - construction sites - builder
    // 03 - work - bb - repair jobs - builder

    // now, try to assign jobs to creeps
    for ( let job of Hive.memory.job_queue) {

      //Fillfrom -- 01aa - source - harv          // 01bb - container - deliv     // 01cc - storage - deliv/upgraders
      //Fillfrom -- 01dd - rec link - upgraders   // 01ee - ground - builder
      //Delivto  -- 02aa - closest cont - harv    // 02bb - send links - harv     // 02cc - spawn - deliv
      //Delivto  -- 02dd - tower - deliv          // 02ee - storage - deliv       // 02ff - controller - upgrader
      //Work     -- 03aa - contruct - builder     // 03bb - repair - builder

      if ( job.type == '01aa' && job.spawn_name == spawn_name ) {
        console.log("JQ: trying to assign " + spawn_name + " id " + job.id + " t: " + job.type + " d: " + job.dest_id);
        // find local, empty, idle, harvester, with memory.destid = job.dest_id (this is assigned at spawn)
        let creep = _.find(Game.creeps, (c) =>
          ( c.memory.birthplace == job.spawn_name ) &&
          ( _.sum(c.carry) == empty ) &&
          ( c.memory.state == 'idle' ) &&
          ( c.memory.role == 'harvester' ) &&
          ( c.memory.destid == job.dest_id )
        );

        if ( creep != undefined ) {
          console.log("\tXX: " + creep + " @ " + job.spawn_name + " assgn to "+ job.id);
          // assign the job to the creep
          creep.memory.job = job.id;
          // mark the job as assigned
          job.state = 'assigned';
        }
        else {
          // no creep for the job
        }

      } // END 01aa

    } // END job assignment

  }
};
