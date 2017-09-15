module.exports = {
  run: function(spawn_num,Hive) {
    [MinHarv,MinDeli,MinUgra,MinBuil,MinClReg,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
    var spawn_name = Hive.spawn_names[spawn_num];

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

    // Debugging - clear the queue or add jobs to it

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

    // detect sources to harvest
    var sources = Hive.sources[spawn_num];
    /*
    // detect containers with energy needing empyting (use working count >=carry cap, not actual store.energy )
    var containers = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
      filter: (s) => (
        ( s.structureType == STRUCTURE_CONTAINER && s.memory.working_count >= deliver_carry_cap )
    )});
    */
    /*
    // detect towers needing energy ( update working var, not actual)
    var towers =  Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
       filter: (s) => (
          ( s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity - tower_energy_ceiling )
    )});
    */
    // detect sending links needing filling
    var rec_link = Hive.receiving_link[spawn_num];


    // detect controllers needing upgrading ( update working var )
    var controller = Game.spawns[spawn_name].room.controller;
    /*
    // detect spawns and extensions needing delivery
    var spawns = Game.spawns[spawn_name].room.find(FIND_MY_STRUCTURES, {
      filter: (s) => (
        ( s.structureType == STRUCTURE_SPAWN && s.energy < s.energyCapacity ) ||
        ( s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity )
      )});

    // detect things needing to be built or repaired ( flag working queue as true for this object id)
    var construction = Game.spawns[spawn_name].room.find(FIND_CONSTRUCTION_SITES);
    */
    // detect resources laying on the ground ( update working var, not actual) <<< --- TODO?

        // job object prototype - spawn_name,type, priority, state, body_type, dest_id, tick_issued, tick_complete
        //    states - assigned / complete / abandoned / timed out / unasssigned

        //Fillfrom -- 01aa - source - harv          // 01bb - container - deliv     // 01cc - storage - deliv/upgraders
        //Fillfrom -- 01dd - rec link - upgraders   // 01ee - ground - builder      // 01ff - mins from stor - deliv
        //Fillfrom -- 00gg - mins from cont - deliv //

        //Delivto  -- 02aa - closest cont - harv    // 02bb - send links - harv     // 02cc - spawn - deliv
        //Delivto  -- 02dd - tower - deliv          // 02ee - storage - deliv       // 02ff - controller - upgrader
        //Delivto  -- 00gg - mins to stor - deliv   // 02hh - mins to term - deliv  //

        //Work     -- 03aa - contruct - builder     // 03bb - repair - builder

        // look for idle creeps and find a task for them
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 01 - fillfrom - aa - source - harvesters
        /*
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
            var job = new Job(spawn_name,'01aa',1,'assigned','harvester',dest.id,Game.time,'');
            Log.debug("JQ: " + spawn_name + " newjob " + dest.id + " job " + job.type + " j_id: " + job.id );
            // push the job onto the job_queue
            Hive.memory.job_queue.push(job);
            // assign the job to the creep
            harv.memory.job = job.id;
          }
        }
        // END -- 01aa
        */
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*
        // 01 - fillfrom - bb - container - deliverers
        if ( containers.length != 0 ) {
          for ( let y of containers) {
            // while there is energy in the container, create jobs
            while ( y.memory.working_count >= deliver_carry_cap) {
              // create a job for each container
              var job = new Job(spawn_name,'01bb',1,'unassigned','deliverer',y.id,Game.time,'');
              Log.debug("JQ: " + spawn_name + " newjob " + y + " job " + job.type + " j_id: " + job.id );
              // push the job onto the job_queue
              Hive.memory.job_queue.push(job);
              // record the desired resource state
              var adjustmest = y.memory.working_count - deliver_carry_cap;
              if ( adjustmest < 0 ) { adjustmest = 0; }
              Log.debug("\tXX: " + spawn_name + " id: " + y.id + " curr: " + y.memory.working_count + " --adj: " + adjustmest );
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
        /*
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
            Log.debug("JQ: full harv: " + harv);

            if ( structure_link[0] != undefined ) {
              Log.debug("\t link : full harv dest: " + structure_link[0]);
              var dest = structure_link[0];

            }
            else if ( container != undefined ) {
              Log.debug("\t cont: full harv dest: " + container);
              var dest = container;
            }
            else {
              // no destination
            }
            // create a new job
            if ( dest != undefined ) {
              var job = new Job(spawn_name,'02aa',1,'assigned','harvester',dest.id,Game.time,'');
              Log.debug("JQ: " + spawn_name + " newjob " + dest.id + " job " + job.type + " j_id: " + job.id );
              // push the job onto the job_queue
              Hive.memory.job_queue.push(job);
              // assign the job to the creep
              harv.memory.job = job.id;
            }
          }
        }
        // END 02aa
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        */

        // 02 - delivto - cc - spawns extensions - deliverer
        // 02 - delivto - dd - towers - deliverer
        // 02 - delivto - ee - storage - deliverer

        // 02 - delivto - ff - controller - upgrader

        // 03 - work - aa - construction sites - builder
        // 03 - work - bb - repair jobs - builder

  }
};