module.exports = {
  run: function(spawn_num,Hive) {
    [MinHarv,MinDeli,MinUgra,MinBuil,MinClReg,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
    var spawn_name = Hive.spawn_names[spawn_num];

    // Define the job object
    // job object prototype - spawn_name,type, priority, state, body_type_req, dest_id, extra, tick_issued, tick_complete
    //    states - assigned / complete / abandoned / timed out / unasssigned
    function Job (spawn_name,type,priority,state,body_type_req,dest_id,extra,tick_issued,tick_complete) {
        this.spawn_name = spawn_name;
        this.type = type;
        this.priority = priority;
        this.state = state;
        this.body_type_req = body_type_req;
        this.dest_id = dest_id;
        this.extra = extra;
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

    // Manual commands for testing
    if (Memory.clearqueue == true ){
      Memory.clearqueue = false;
      Hive.memory.job_queue = [];
    }
    if (Memory.addjobs_min_deliv == true) {
      var job = new Job(spawn_name,'01ff',1,'unassigned','deliverer',Game.spawns[spawn_name].room.storage.id,RESOURCE_KEANIUM,Game.time,'');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type);

      var job = new Job(spawn_name,'02hh',1,'unassigned','deliverer',Game.spawns[spawn_name].room.terminal.id,RESOURCE_KEANIUM,Game.time,'');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type);
      Memory.addjobs = false;
    }
    if (Memory.addjobs_harv == true ) {
      var job = new Job(spawn_name,'01aa',1,'unassigned','harvester','default',RESOURCE_ENERGY,Game.time,'');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type);

      var job = new Job(spawn_name,'02aa',1,'unassigned','harvester','closest',RESOURCE_ENERGY,Game.time,'');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type);
      Memory.addjobs_harv = false;

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
    // Deliverto - 02aa - energy to closest cont - harv
    // Deliverto - 02bb - energy to closest sending link - harv
    // Deliverto - 02cc - energy to spawn or extension - deliv
    // Deliverto - 02dd - energy to tower - deliv
    // Deliverto - 02ee - mins to storage - deliv
    // Deliverto - 02ff - energy to controller - upgrader
    // Deliverto - 02hh - mins to term - deliv

    // Do I need to create jobs for:
//######################################################################################################################
    // Harvesting from sources and minerals
    var harvesting_jobs = _.filter(Hive.memory.job_queue, function(s) {
      return  ( s.type == '01aa' && s.spawn_name == spawn_name );
    });
    // count the number of total # of harvs each room will spawn
    var harvs_needed =  _.sum(Hive.harvs_per_source[spawn_num]);

    // if we have less jobs than harvs_needed
    if ( harvesting_jobs.length < harvs_needed ) {
      // spawn a generic harvesting job
      var job = new Job(spawn_name,'01aa',1,'unassigned','harvester','default',RESOURCE_ENERGY,Game.time,'');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type);

      // and the corresponding unload to nearest container job
      var job = new Job(spawn_name,'02aa',1,'unassigned','harvester','closest',RESOURCE_ENERGY,Game.time,'');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type);
    }
//######################################################################################################################
    // Emptying containers - are there containers which need to be emptied?
    // Fillfrom - 01bb - energy from container -> deliv
    // Fillfrom - 01jj - energy from containers - upgraders ( low RCL levels need this) // TODO
    var res_containers = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
      filter: (s) =>
        (
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= 150 ) ||
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_KEANIUM] >= 200 ) ||
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_LEMERGIUM] >= 400 ) ||
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_OXYGEN] >= 400 )
    )});

    // foreach container found, create a pickup job
    for ( let container of res_containers) {
        Log.debug("PL: " + spawn_name + " PU "+ container + " with " + _.keys(container.store) );

    }

//######################################################################################################################

    // Assign idle creeps with full inventories
    //// Filling Spawns and Extensions
    //// Filling Towers
    //// Filling Sending links
    //// Filling storage

    //// Upgrading the Controller
    //// Bringing minerals to Terminal

    // Building and Repairing

  }
};
