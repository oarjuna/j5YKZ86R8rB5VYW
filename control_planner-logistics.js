module.exports = {
  run: function(spawn_num,Hive) {
    var spawn_name = Hive.spawn_names[spawn_num];

    // Define the job object
    // job object prototype - spawn_name,type, priority, state, body_type_req, dest_id, extra, tick_issued, tick_complete
    //    states - assigned / complete / abandoned / timed out / unasssigned
    function Job (spawn_name,type,priority,state,body_type_req,dest_id,extra,tick_issued,tick_complete,assigned_creep) {
        this.spawn_name = spawn_name;
        this.type = type;
        this.priority = priority;
        this.state = state;
        this.body_type_req = body_type_req;
        this.dest_id = dest_id;
        this.extra = extra;
        this.tick_issued = tick_issued;
        this.tick_complete = tick_complete;
        this.assigned_creep = assigned_creep;
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
    /// START LOGIC
    //######################################################################################################################
    // Ensure jobs exist to Empty res_pickup_spots
    // Fillfrom - 01bb - energy from container -> deliv or upgraders
    // Fillfrom - 01dd - rec link - upgraders
    var res_pickup_spots_cont = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
      filter: (s) =>
        (
          // TODO -- make this list handle resources better, not hardcoded
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= Hive.deliverer_carry_cap[spawn_num] ) ||
        //  ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_KEANIUM] >= Hive.deliverer_carry_cap[spawn_num] ) ||
        //  ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_LEMERGIUM] >= Hive.deliverer_carry_cap[spawn_num] ) ||
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_OXYGEN] >= Hive.deliverer_carry_cap[spawn_num] )
    )});

    var res_pickup_spots_links = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
      filter: (s) =>
        (
          ( s.structureType== STRUCTURE_LINK && s.id == Hive.receiving_link[spawn_num] && s.energy >= Hive.upgrader_carry_cap[spawn_num] )
    )});

    var res_pickup_spots = _.union(res_pickup_spots_cont,res_pickup_spots_links);
    var res_list = [ RESOURCE_ENERGY,RESOURCE_OXYGEN ]; // TODO - what to do with this?

    if ( res_pickup_spots.length > 0) { // if there are res_pickup_spots needing pickup
      for ( var x of res_pickup_spots ) { // for each res_pickup_spots with stuff
        for ( var res of res_list ) { // for each resource type
          if ( x.store == undefined ) {
            // we are a link
            eng_check = x.energy;
          }
          else if ( x.store[res] == undefined ) {
            // we are a container without the resource being checked
            eng_check = -1;
          }
          else {
            // we are a container with the resource being checked
            eng_check = x.store[res];
          }

          Log.debug("Res: " + res + " res_list " + res_list[0] + " eng_check " + eng_check,'Planner');

          if (
            ( x.structureType == STRUCTURE_LINK && eng_check > 0 && res == RESOURCE_ENERGY ) ||
            ( x.structureType == STRUCTURE_CONTAINER && eng_check > 0 ))
          {

            // get the amount of resource to pickup = resources / carry cap
            if ( x.structureType == STRUCTURE_CONTAINER) {
              num_of_jobs_needed =  x.store[res] / Hive.deliverer_carry_cap[spawn_num];
            }
            else if ( x.structureType == STRUCTURE_LINK) {
              num_of_jobs_needed =  x.energy / Hive.upgrader_carry_cap[spawn_num];
            }

            // get a count of existing jobs for this resource and pickup location
            var job_count = _.filter(Hive.memory.job_queue, function(s) {
              return  (
                ( s.type == '01bb' || s.type == '01dd' ) &&
                s.spawn_name == spawn_name &&
                s.dest_id == x.id &&
                s.extra == res
              );});

            Log.debug(x.id + " RES " + res + " " + res + " ex jobs: " + job_count.length + " num: " + num_of_jobs_needed + " stType " + x.structureType,'Planner');

            // if there are more jobs than existing jobs
            if ( job_count.length < num_of_jobs_needed ) {
              // spawn a new job

              if ( x.structureType == STRUCTURE_CONTAINER ) {
                var job = new Job(spawn_name,'01bb',4,'unassigned','deliv_or_upgrd',x.id,res,Game.time,'','');
                Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " type " + job.type + " res " + job.extra + " dest " + x.structureType + " " + x.id,'Planner');
                Hive.memory.job_queue.push(job);
              }
              else if  ( x.structureType == STRUCTURE_LINK ) {
                var job = new Job(spawn_name,'01dd',3,'unassigned','upgrader',x.id,res,Game.time,'','');
                Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " type " + job.type + " res " + job.extra + " dest " + x.structureType + " " + x.id,'Planner');
                Hive.memory.job_queue.push(job);
                Log.debug("RES cont type " + x.structureType,'Planner');
              }
            }

          } // END empty check
        } // END foreach res type
      } // END foreach container with stuff
    } // END if >0 check

    //######################################################################################################################
    // Ensure delivery jobs exist for towers, spawns, extensions, and sending_links needing energy
    // get a lists of towers needing energy
    var structure_towers = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
       filter: (s) => (
          ( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity - 100 )
    )});

    // Foreach tower needing energy, ensure a job exists. assigned or otherwise
    for ( var t of structure_towers ) {
      // get a list of  02dd  jobs in the queue for this tower
      // Deliverto - 02dd - energy to tower - deliv
      job_count = _.filter(Hive.memory.job_queue, function(s) {
        return  (
          s.spawn_name == spawn_name &&
          s.type == '02dd' &&
          s.dest_id == t.id
        );});

      num_of_jobs_needed =  ( t.energyCapacity - t.energy ) / Hive.deliverer_carry_cap[spawn_num];

      Log.debug("PL: job_count towers: " + job_count.length + "/" + num_of_jobs_needed,'Planner');

      if (  job_count.length < num_of_jobs_needed ) {
        // spawn a job for this tower
        var job = new Job(spawn_name,'02dd',2,'unassigned','deliverer',t.id,RESOURCE_ENERGY,Game.time,'','');
        Hive.memory.job_queue.push(job);
        Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " type " + job.type + " res " + job.extra + " dest " + t.structureType + " " + t.id,'Planner');
      }
    }

    // get a list of spawns and extensions needing energy
    var structure_spawns_extensions = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
       filter: (s) => (
         ( s.structureType == STRUCTURE_SPAWN && s.energy < s.energyCapacity ) ||
         ( s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity )
    )});

    var energy_needed = 0;
    var num_of_jobs_needed = 0;
    // Foreach spawn or extension needing energy, ensure a job exists. assigned or otherwise
    for ( var t of structure_spawns_extensions ) {
      // Deliverto - 02cc - energy to spawn or extension - deliv

      // count all jobs for spawns or extensions
      job_count = _.filter(Hive.memory.job_queue, function(s) {
        return  (
          s.spawn_name == spawn_name &&
          s.type == '02cc'
        );});

      if ( t.structureType == STRUCTURE_SPAWN ) { energy_needed = energy_needed + 300; }
      else { energy_needed = energy_needed + 50; }

      //num_of_jobs_needed = energy_needed / Hive.deliverer_carry_cap[spawn_num];
      num_of_jobs_needed = num_of_jobs_needed + 1;

      Log.debug("PL: job_count sp & ext: " + t.id + " " + job_count.length + "/" + num_of_jobs_needed,'Planner');

      if (  job_count.length < num_of_jobs_needed ) {
        // spawn a job for this sp or ext
        var job = new Job(spawn_name,'02cc',1,'unassigned','deliverer','closest',RESOURCE_ENERGY,Game.time,'','');
        Hive.memory.job_queue.push(job);
        Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " type " + job.type + " res " + job.extra + " dest " + t.structureType + " " + t.id,'Planner');
      }
    }

    // get a list of sending links needing energy
    var structure_sending_links = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
       filter: (s) => (
         ( s.structureType == STRUCTURE_LINK && s.id != Hive.receiving_link[spawn_num] )
    )});

    // Foreach sending links needing energy, ensure a job exists. assigned or otherwise
    for ( var t of structure_sending_links ) {
      // get a list of  02gg  jobs in the queue for this spawn or extension
      // Deliverto - 02gg - energy to sending link - deliv

      job_count = _.filter(Hive.memory.job_queue, function(s) {
        return  (
          s.spawn_name == spawn_name &&
          s.type == '02gg' &&
          s.dest_id == t.id
        );});

      num_of_jobs_needed = ( t.energyCapacity - t.energy ) / Hive.deliverer_carry_cap[spawn_num];

      Log.debug("PL: job_count send links : " + job_count.length + "/" + num_of_jobs_needed,'Planner');

      if (  job_count.length < num_of_jobs_needed ) {
        // spawn a job for this sp or ext
        var job = new Job(spawn_name,'02gg',3,'unassigned','deliverer',t.id,RESOURCE_ENERGY,Game.time,'','');
        Hive.memory.job_queue.push(job);
        Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " type " + job.type + " res " + job.extra + " dest " + t.structureType + " " + t.id,'Planner');
      }
    }

    //######################################################################################################################
    // create jobs for full idle creeps - 02ii
    // Deliverto - 02ii - energy to storage - deliv
    // Ensure jobs exists to tell full idle delivs to drop stuff off

    // get a list of 02ii jobs
    var deliv_job_count = _.filter(Hive.memory.job_queue, function(s) {
     return  (
       s.spawn_name == spawn_name &&
       s.type == '02ii'
     );});

     // only if there are no other energy needing jobs

    var storage = Game.spawns[spawn_name].room.storage.id;
    //Log.debug("Hive " + deliv_job_count.length + "/" + Hive.spawn_levels[spawn_num][1],'Planner');

    if ( deliv_job_count.length < Hive.spawn_levels[spawn_num][1] ) {
     var job = new Job(spawn_name,'02ii',10,'unassigned','deliverer',storage,RESOURCE_ENERGY,Game.time,'','');
     Hive.memory.job_queue.push(job);
     Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " job " + job.type,'Planner');
    }


  } // END
};
