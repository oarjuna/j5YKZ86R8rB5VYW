module.exports = {
  run: function(spawn_num,Hive) {
    [MinHarv,MinDeli,MinUgra,MinBuil,MinClReg,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
    var spawn_name = Hive.spawn_names[spawn_num];

    //if ( spawn_name != 'Spawn1' && spawn_name != 'Spawn2') { return; }
    if ( spawn_name != 'Spawn1') { return; }

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

    // Manual commands for testing
    if (Memory.clearqueue == true ){
      Memory.clearqueue = false;
      Hive.memory.job_queue = [];
    }

    if ( Memory.clearjob != 'xxx' ) {
        // get owning creep, if any
        var job = _.find(Hive.memory.job_queue, function(s) {
          return  ( s.id == Memory.clearjob && s.state == 'assigned' );
        });

        //  if there is a job owner, clear it's job
        if ( job != undefined) {
          //let c_obj = Game.getObjectById(job.assigned_creep);
          //c_obj.job = undefined;
        }

        // remove the job
        var removed = _.remove(Hive.memory.job_queue, function(s) {
          return  ( s.id == Memory.clearjob );
        });

        // clear the Memory flag
        Memory.clearjob = 'xxx';
        Log.debug("removed " + removed,'Planner');
    }

    // TYPES OF actions
    /////// FILL
    // Fillfrom - 01aa - resource -> harv
    // Fillfrom - 01dd - rec link - upgraders
    // Fillfrom - 01hh - energy from storage - upgraders
    // Fillfrom - 01jj - energy from containers - upgraders
    // Fillfrom - 01bb - energy from container -> deliv
    // Fillfrom - 01cc - energy from storage   -> deliv
    // Fillfrom - 01ff - mins from storage     -> deliv
    // Fillfrom - 01gg - mins from cont       -> deliv
    ///////   DELIVER
    // Deliverto - 02aa - energy to closest cont/link - harv
    // Deliverto - 02cc - energy to spawn or extension - deliv
    // Deliverto - 02dd - energy to tower - deliv
    // Deliverto - 02ee - mins to storage - deliv
    // Deliverto - 02ff - energy to controller - upgrader
    // Deliverto - 02gg - energy to sending link - deliv
    // Deliverto - 02ii - energy to storage - deliv
    // Deliverto - 02hh - mins to term - deliv

//######################################################################################################################
// Fillfrom - 01dd - rec link - upgraders
// Fillfrom - 01hh - energy from storage - upgraders
// Fillfrom - 01jj - energy from containers - upgraders
  // Ensure these jobs exist
  var upgrader_fill_jobs = _.filter(Hive.memory.job_queue, function(s) {
    return  (
      ( s.type == '01dd' || s.type == '01hh' || s.type == '01jj' ) &&
      s.spawn_name == spawn_name
      );
  });

  var upgrader_jobs_needed = Hive.spawn_levels[spawn_num][2]; // upgraders

  if ( upgrader_fill_jobs.length < upgrader_jobs_needed ) {
    // spawn some jobs, prioritize filling from links first, then containers, then storage
    // Find close by receiving links that have energy

    // Find

  }
//######################################################################################################################
    // Ensure jobs exists to Harvesting from sources and minerals
    var harvesting_jobs = _.filter(Hive.memory.job_queue, function(s) {
      return  ( s.type == '01aa' && s.spawn_name == spawn_name );
    });
    // count the number of total # of harvs each room will spawn
    var harvs_needed =  _.sum(Hive.harvs_per_source[spawn_num]);

    //Log.debug("harvesting " + harvesting_jobs.length + "/" + harvs_needed);
    // if we have less jobs than harvs_needed
    if ( harvesting_jobs.length < harvs_needed ) {
      // spawn a generic harvesting job
      var job = new Job(spawn_name,'01aa',1,'unassigned','harvester','default',RESOURCE_ENERGY,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " job " + job.type,'Planner');
    }
//######################################################################################################################
    // Ensure jobs exists to tell full harvs to drop stuff off
    // Get a list of 01aa jobs
    var harvest_job_count = _.filter(Hive.memory.job_queue, function(s) {
      return  (
        s.spawn_name == spawn_name &&
        s.type == '01aa'
      );});

    // get a list of 02aa jobs
    var deliv_job_count = _.filter(Hive.memory.job_queue, function(s) {
      return  (
        s.spawn_name == spawn_name &&
        s.type == '02aa'
      );});

    if ( deliv_job_count < harvest_job_count ) {
      var job = new Job(spawn_name,'02aa',1,'unassigned','harvester','closest',RESOURCE_ENERGY,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " job " + job.type,'Planner');
    }

//######################################################################################################################
    // Ensure jobs exist to Empty containers
    // Fillfrom - 01bb - energy from container -> deliv
    // Fillfrom - 01jj - energy from containers - upgraders ( low RCL levels need this) // TODO
    var res_containers = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
      filter: (s) =>
        (
        //  ( spawn_name == 'Spawn1') &&
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= Hive.deliverer_carry_cap[spawn_num] ) ||
        //  ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_KEANIUM] >= Hive.deliverer_carry_cap[spawn_num] ) ||
        //  ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_LEMERGIUM] >= Hive.deliverer_carry_cap[spawn_num] ) ||
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_OXYGEN] >= Hive.deliverer_carry_cap[spawn_num] )
    )});

    if ( res_containers.length > 0) { // if there are containers needing pickup
      for ( var x of res_containers ) { // for each container with stuff
        for ( var res in x.store ) { // for each resource type in each container's store list
          if ( x.store[res] > 0 ) { // that is not empty

            // get the amount of resource to pickup = resources / carry cap
            num_of_jobs_needed =  x.store[res] / Hive.deliverer_carry_cap[spawn_num];

            // get a count of existing jobs for this resource and pickup location
            var job_count = _.filter(Hive.memory.job_queue, function(s) {
              return  (
                ( s.type == '01bb' || s.type == '01jj' ) &&
                s.spawn_name == spawn_name &&
                s.dest_id == x.id &&
                s.extra == res
              );});

            Log.debug(x.id + " RES " + res + " " + x.store[res] + " ex jobs: " + job_count.length + " num: " + num_of_jobs_needed,'Planner');

            // if there are more jobs than existing jobs
            if ( job_count.length < num_of_jobs_needed ) {
              // spawn a new job
              var job = new Job(spawn_name,'01bb',4,'unassigned','deliv_or_upgrd',x.id,res,Game.time,'','');
              Hive.memory.job_queue.push(job);
              Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " type " + job.type + " res " + job.extra + " dest " + x.structureType + " " + x.id,'Planner');
            }

          } // END empty check
        } // END foreach res type
      } // END foreach container with stuff
    } // END if >0 check

//######################################################################################################################
    // Ensure jobs exist for towers, spawns, extensions, and sending_links needing energy
    // DO NOT ASSIGN CREEPS JOBS IN PLANNING, however tempting!

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

    /// create jobs to upgrade the controller
    //// Upgrading the Controller
    // Deliverto - 02ff - energy to controller - upgrader

//######################################################################################################################

    // Building and Repairing
    // create jobs to build and repair

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
//######################################################################################################################
    // if there are unasigned jobs needing energy
    // and there are idle, empty deliverers
    // create jobs to bring energy from storage
    // Fillfrom - 01cc - energy from storage   -> deliv

    // TODO -- improve. it does not do the above, but it should

    var deliv_job_count = _.filter(Hive.memory.job_queue, function(s) {
      return  (
        s.spawn_name == spawn_name &&
        s.type == '01cc'
    );});

    var storage = Game.spawns[spawn_name].room.storage.id;

    if ( deliv_job_count < Hive.spawn_levels[spawn_num][1] ) {
      var job = new Job(spawn_name,'01cc',10,'unassigned','deliverer',storage,RESOURCE_ENERGY,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " job " + job.type,'Planner');
    }



//######################################################################################################################

  }
};
