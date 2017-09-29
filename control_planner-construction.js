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
    // get a list of all constuctions sites
    var constructionSites = Game.spawns[spawn_name].room.find(FIND_CONSTRUCTION_SITES);
    Log.debug(spawn_name + " sites: " + constructionSites.length,'Construct');

    for ( t of constructionSites ) {
      job_exists = _.find(Hive.memory.job_queue, function(s) {
        return  (
          s.spawn_name == spawn_name &&
          s.type == '03aa' &&
          s.dest_id == t.id
        );
      });

      if (  job_exists == undefined ) {
  //      var job = new Job(spawn_name,'03aa',5,'unassigned','builder',t.id,RESOURCE_ENERGY,Game.time,'','');
  //      Hive.memory.job_queue.push(job);
  //      Log.debug("NEWJOB : " + spawn_name + " jid " + job.id + " type " + job.type + " res " + job.extra + " dest " + t.structureType + " " + t.id,'Construct');
      }
    }

    // END
  }
};
