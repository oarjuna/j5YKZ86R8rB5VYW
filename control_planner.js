var plan_harvs = require('control_planner-harvs');
var plan_market = require('control_planner-market');
var plan_upgrade = require('control_planner-upgrader');
var plan_logistics = require('control_planner-logistics');

module.exports = {
  run: function(spawn_num,Hive) {
    var spawn_name = Hive.spawn_names[spawn_num];

    //if ( spawn_name != 'Spawn1' && spawn_name != 'Spawn2') { return; }
    //if ( spawn_name != 'Spawn1') { return; }

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

    // Run the various sub actors
    plan_harvs.run(spawn_num,Hive);
    plan_market.run(spawn_num,Hive);
    plan_upgrade.run(spawn_num,Hive);
    plan_logistics.run(spawn_num,Hive);

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

//######################################################################################################################
  // Are there any receiving links needing emptying?
// Fillfrom - 01hh - energy from storage - upgraders

  // Ensure these jobs exist
  var upgrader_job_list = _.filter(Hive.memory.job_queue, function(s) {
    return  ((
      s.type == '01hh' ) &&
      s.spawn_name == spawn_name
    );
  });

  //
  var num_of_upgraders = Hive.spawn_levels[spawn_num][2]; // deliverers
  Log.debug(" num of up " + num_of_upgraders + " num of jobs " + upgrader_job_list.length,"Planner");

    // do not assign, that happens in job assignment
  if (  upgrader_job_list.length <  num_of_upgraders ) {
    // else create a "go to storage" job
    // TODO
  }


    // Building and Repairing
    // create jobs to build and repair


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
