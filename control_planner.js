var plan_harvs = require('control_planner-harvs');
var plan_market = require('control_planner-market');
var plan_upgrade = require('control_planner-upgrader');
var plan_logistics = require('control_planner-logistics');
var plan_construction = require('control_planner-construction');

module.exports = {
  run: function(spawn_num,Hive) {
    var spawn_name = Hive.spawn_names[spawn_num];

    // TODO --
    // Building and Repairing on the queue // TODO 1st!
    // remote harvesting on the queue
    // remote reserving on the queue
    // spawning on the queue
    // market AI
    // military items on the queue

    // Run the various sub actors
    plan_harvs.run(spawn_num,Hive);
    plan_market.run(spawn_num,Hive);
    plan_upgrade.run(spawn_num,Hive);
    plan_logistics.run(spawn_num,Hive);
    plan_construction.run(spawn_num,Hive);

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
