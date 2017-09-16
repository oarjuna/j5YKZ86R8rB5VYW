module.exports = {
  run: function(spawn_num,Hive) {
    [MinHarv,MinDeli,MinUgra,MinBuil,MinClReg,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
    var spawn_name = Hive.spawn_names[spawn_num];

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
    if (Memory.addjobs_min_deliv == true) {
      var job = new Job(spawn_name,'01ff',1,'unassigned','deliverer',Game.spawns[spawn_name].room.storage.id,RESOURCE_KEANIUM,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type,'Planner');

      var job = new Job(spawn_name,'02hh',1,'unassigned','deliverer',Game.spawns[spawn_name].room.terminal.id,RESOURCE_KEANIUM,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type,'Planner');
      Memory.addjobs = false;
    }
    if (Memory.addjobs_harv == true ) {
      var job = new Job(spawn_name,'01aa',1,'unassigned','harvester','default',RESOURCE_ENERGY,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type,'Planner');

      var job = new Job(spawn_name,'02aa',1,'unassigned','harvester','closest',RESOURCE_ENERGY,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type,'Planner');
      Memory.addjobs_harv = false;
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
    // Deliverto - 02aa - energy to closest cont - harv
    // Deliverto - 02bb - energy to closest sending link - deliv
    // Deliverto - 02cc - energy to spawn or extension - deliv
    // Deliverto - 02dd - energy to tower - deliv
    // Deliverto - 02ee - mins to storage - deliv
    // Deliverto - 02ff - energy to controller - upgrader
    // Deliverto - 02gg - energy to storage - deliv
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
      var job = new Job(spawn_name,'01aa',1,'unassigned','harvester','default',RESOURCE_ENERGY,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type,'Planner');

      // and the corresponding unload to nearest container job
      var job = new Job(spawn_name,'02aa',1,'unassigned','harvester','closest',RESOURCE_ENERGY,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " job " + job.type,'Planner');
    }
//######################################################################################################################
    // Emptying containers - are there containers which need to be emptied?
    // Fillfrom - 01bb - energy from container -> deliv
    // Fillfrom - 01jj - energy from containers - upgraders ( low RCL levels need this) // TODO
    var res_containers = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
      filter: (s) =>
        (
          ( spawn_name == 'Spawn1') &&
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= 100 ) ||
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_KEANIUM] >= 150 ) || //TODO -- make these globals
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_LEMERGIUM] >= 400 ) ||
          ( s.structureType==STRUCTURE_CONTAINER && s.store[RESOURCE_OXYGEN] >= 400 )
    )});

    var need_count = {};
    if ( res_containers.length > 0) { // if there are containers needing pickup
      for ( var x of res_containers ) { // for each container with stuff
        for ( var res in x.store ) { // for each resource type in each container's store list
          if ( x.store[res] > 0 ) { // that is not empty

            // get a count of existing jobs for this resource and pickup location
            var job_count = _.filter(Hive.memory.job_queue, function(s) {
              return  (
                ( s.type == '01bb' || s.type == '01jj' ) &&
                s.spawn_name == spawn_name &&
                s.dest_id == x.id &&
                s.extra == res
              );});

            // count how many jobs we need per resource type
            if ( need_count[res] == undefined ) { need_count[res] = 1;}
            else {need_count[res]++; }

            Log.debug("PL: " + x + " RES " + res + " " + x.store[res] + " ex jobs: " + job_count.length + " need: " + need_count[res],'Planner');

            // if there are more jobs than existing jobs
            if ( job_count.length < need_count[res]  ) {
              // spawn a new job
              var job = new Job(spawn_name,'01bb',1,'unassigned','deliverer',x.id,res,Game.time,'','');
              //Hive.memory.job_queue.push(job);
              //Log.debug("JQ: ADDING : " + spawn_name + " newjob " + job.id + " type " + job.type + " res " + res + " dest " + x.id,'Planner');
            }

          } // END empty check
        } // END foreach res type
      } // END foreach container with stuff
    } // END if >0 check

//######################################################################################################################
    // Ensure jobs exist for towers, spawns, extensions, and sending_linsks needing energy
    // DO NOT ASSIGN CREEPS JOBS IN PLANNING, however tempting!

    // get a lists of towers needing energy
    var structure_towers = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
       filter: (s) => (
          ( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity - 100 )
    )});
    Log.debug("PL: structure_towers: " + structure_towers.length,'Planner');

    // Foreach tower needing energy, ensure a job exists.

    // get a list of  02dd  jobs in the queue
    // Deliverto - 02dd - energy to tower - deliv
    job_count = _.filter(Hive.memory.job_queue, function(s) {
      return  (
        s.type == '02dd'
      );});


    // get a list of spawns and extensions needing energy
    var structure_spawns_extensions = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
       filter: (s) => (
         ( s.structureType == STRUCTURE_SPAWN && s.energy < s.energyCapacity ) ||
         ( s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity )
    )});
    Log.debug("PL: structure_spawns_extensions: " + structure_spawns_extensions.length,'Planner');

    // get a list of sending links needing energy
    var structure_sending_links = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
       filter: (s) => (
         ( s.structureType == STRUCTURE_LINK && s.id != Hive.receiving_link[spawn_num] )
    )});
    Log.debug("PL: structure_sending_links: " + structure_sending_links.length,'Planner');


    /*
    var dest;
    // foreach idle creep
    for ( let creep of idle_full_deliverers ) {
      // assign a dest based on resource type and priority
      if ( creep.carry[RESOURCE_ENERGY] ) {
        if ( structure_towers.length > 0 && Game.spawns[spawn_name].room.controller.memory.alert_state == 'red' ) {
          // Deliverto - 02dd - Towers ( red alerts gives towers priority )
          dest = creep.pos.findClosestByPath(structure_towers);
        }
        else if ( structure_spawns_extensions.length > 0 ) {
          // Deliverto - 02cc - Spawns and Extensions
          dest = creep.pos.findClosestByPath(structure_spawns_extensions);
        }
        else if ( structure_towers.length > 0 ) {
          // Deliverto - 02dd - Towers
          dest = creep.pos.findClosestByPath(structure_towers);
        }
        else if ( structure_sending_links.length > 0 ) {
          // Deliverto - 02bb - Sending links #3
          dest = creep.pos.findClosestByPath(structure_sending_links);
        }
        else {
          // Deliverto - 02gg - Storage #4
          dest = creep.room.storage;
        }
      }
      else {
        if ( Memory.marketorder == true ) {
          // Deliverto - 02hh - minerals to Terminal
          dest = creep.room.terminal;
        }
        else {
          // Deliverto - 02ee - minerals to storage
          dest = creep.room.storage;
        }
      } // END else

      Log.debug(creep + " dest " + dest.structureType,'Planner');
    } // END foreach idle creep

    */

    // Spawn the job


//######################################################################################################################

    /// create jobs to upgrade the controller
    //// Upgrading the Controller
    // Deliverto - 02ff - energy to controller - upgrader

//######################################################################################################################

    // Building and Repairing
    // create jobs to build and repair

  }
};
