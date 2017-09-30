module.exports = {
  run: function(room_num,Hive) {
    var spawn_name = Hive.spawn_names[room_num];

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

    // Ensure jobs exists to Harvesting from sources and minerals
    var harvesting_jobs = _.filter(Hive.memory.job_queue, function(s) {
      return  ( s.type == '01aa' && s.spawn_name == spawn_name );
    });
    // count the number of total # of harvs each room will spawn
    var harvs_needed =  _.sum(Hive.harvs_per_source[room_num]);

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

      //var job = new Job(spawn_name,'02aa',1,'unassigned','harvester','closest','carrying',Game.time,'','');
      var job = new Job(spawn_name,'02aa',1,'unassigned','harvester','closest',RESOURCE_ENERGY,Game.time,'','');

      Hive.memory.job_queue.push(job);
      Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " job " + job.type,'Planner');
    }

  }
};
