var jobcontrol = require('control_job_assignment');
var towercontrol = require('control_towers');
var linkcontrol = require('control_links');
var plancontrol = require('control_planner');

module.exports = {
    run: function(room_num,Hive) {

      // run the towers for this room
      towercontrol.run(room_num,Hive);

      // run the links for this room
      linkcontrol.run(room_num,Hive);

      // run the planner for this room
      plancontrol.run(room_num,Hive);

      // run job control for this room
      jobcontrol.run(room_num,Hive);

  }
};
