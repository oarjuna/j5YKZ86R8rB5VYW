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
    /// START LOGIC
    //######################################################################################################################

    /// create jobs to upgrade the controller
    //// Upgrading the Controller

    // Deliverto - 02ff - energy to controller - upgrader
    // Ensure jobs exists to upgrade the controller
    var upgrade_jobs = _.filter(Hive.memory.job_queue, function(s) {
      return  ( s.type == '02ff' && s.spawn_name == spawn_name );
    });
    // count the number of total # of harvs each room will spawn
    var upgraders_needed =  Hive.spawn_levels[room_num][2]; // # of upgraders

    Log.debug(" 02ff " + upgrade_jobs.length + "/" + upgraders_needed,'Planner');

    // if we have less jobs than upgraders_needed
    if ( upgrade_jobs.length < upgraders_needed ) {
      // spawn a generic upgrade job
      var job = new Job(spawn_name,'02ff',1,'unassigned','upgrader','default',RESOURCE_ENERGY,Game.time,'','');
      Hive.memory.job_queue.push(job);
      Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " job " + job.type,'Planner');
    }

    //######################################################################################################################

  }
};
