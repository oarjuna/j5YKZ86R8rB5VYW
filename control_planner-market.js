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
    /// START MAIN LOGIC

    // the market ai should be able to issue these jobs
    // 01hh -- mins from terminal -- priority 7
    // 01ff -- mins from storage -- priorty 7
    // 02hh -- mins to terminal -- priority 7

    if ( Memory.minjob == true ) {
      // Pickup minerals from storage
      var job = new Job('Spawn1','01ff',7,'unassigned','deliverer','default',RESOURCE_KEANIUM,Game.time,'','');
      Hive.memory.job_queue.push(job);

      // deliver them to the terminal
      var job = new Job('Spawn1','02hh',7,'unassigned','deliverer','default',RESOURCE_KEANIUM,Game.time,'','');
      Hive.memory.job_queue.push(job);

      // disable this action
      Memory.minjob = false;
    }
    if ( Memory.sell == true ) {

      
      Memory.sell = false;
    }

    // if we need 1000 of a mineral at the terminal
      // create enough 01ff jobs // 01ff -- mins from storage -- priorty 7

      // create enough 02hh jobs // 02hh -- mins to term -- priority 7


  } // END MAIN LOGIC
};
