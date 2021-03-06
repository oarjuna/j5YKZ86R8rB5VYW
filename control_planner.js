var plan_harvs = require('control_planner-harvs');
var plan_market = require('control_planner-market');
var plan_upgrade = require('control_planner-upgrader');
var plan_logistics = require('control_planner-logistics');
var plan_construction = require('control_planner-construction');
var plan_spawning = require('control_planner-spawning');

module.exports = {
  run: function(room_num,Hive) {
    var spawn_name = Hive.spawn_names[room_num];

    // TODO --
    // spawning on the queue
    // remote harvesting / reserving on the queue
    // market AI
    // military items / claiming on the queue
    // structure building

    // Run the various sub actors
    plan_harvs.run(room_num,Hive);
    plan_market.run(room_num,Hive);
    plan_upgrade.run(room_num,Hive);
    plan_logistics.run(room_num,Hive);
    plan_construction.run(room_num,Hive);
    plan_spawning.run(room_num,Hive);

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
  }
};
