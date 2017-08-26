// import modules
require('prototype.spawn')();
var roleHarvester = require('role.new-harvester');
var roleDeliverer = require('role.deliverer');
var roleRemoteHarvester = require('role.remoteharvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleClaimer = require('role.claimer');
var roleRepairer = require('role.repairer');
var roleEnergyMover = require('role.energymover');
var roleSoldier = require('role.soldier');
var gameStatus = require('status');

var roleSpawn1 = require('role.spawn1');
var roleSpawn2 = require('role.spawn2');
var roleSpawn3 = require('role.spawn3');

//var roleSpawn = require('role.spawn');

//var spawn1MinHarv = 4; // 4
//var spawn2MinHarv = 3; // 3
/*
  Harvest, Deliv, Upgrade, Buid, Energy, RemoHarv, Claim, Soldier, Repair
*/
  // spawn levels

  var Empire = new Object();

  function Spawn(spawn_name,creep_levels) {
    this.name   = spawn_name;
    this.levels  = creep_levels;
  }

  var scl[0] = [ 4, 4, 5, 1, 0, 0, 1, 0, 0];
  var scl[1] = [ 3, 7, 1, 1, 0, 0, 1, 0, 0];
  var scl[2] = [ 2, 1, 0, 0, 0, 0, 0, 0, 0];

  for (var cur_spawn_tmp in Game.spawns){
     spawn_name = Game.spawns[cur_spawn_tmp].name;
     var tmp_foo = new Spaw(spawn_name)
   }

   console.log("KPP: -- " + Empire.spawn);

  //Empire.Spawn1.levels = [ 4, 4, 5, 1, 0, 0, 1, 0, 0];
  //Empire.Spawn2.levels = [ 3, 7, 1, 1, 0, 0, 1, 0, 0];

module.exports.loop = function () {
  // housekeeping -- check for memory entries of dead creeps by iterating over Memory.creeps
  for (let name in Memory.creeps) { if (Game.creeps[name] == undefined) { delete Memory.creeps[name]; } }

	// run the roles per creep
  for (let name in Game.creeps) {
  	var creep = Game.creeps[name];
  	if (creep.memory.role == 'harvester') {  roleHarvester.run(creep); }
  	else if (creep.memory.role == 'deliverer') {  roleDeliverer.run(creep); }
  	else if (creep.memory.role == 'energy_mover') { roleEnergyMover.run(creep); }
  	else if (creep.memory.role == 'upgrader') { roleUpgrader.run(creep); }
  	else if (creep.memory.role == 'builder') { roleBuilder.run(creep); }
  	else if (creep.memory.role == 'claimer') { roleClaimer.run(creep); }
    else if (creep.memory.role == 'soldier') {  roleSoldier.run(creep); }
  	else if (creep.memory.role == 'repairer') { roleRepairer.run(creep); }
  	else if (creep.memory.role == 'remote_harv') { roleRemoteHarvester.run(creep); }
  }

/*
  Harvest, Deliv, Upgrade, Buid, Energy, RemoHarv, Claim, Soldier, Repair
*/
  // Run the spawn logics
  roleSpawn1.run(scl[0][0],scl[0][1],scl[0][2],scl[0][3],scl[0][4],scl[0][5],scl[0][6],scl[0][7],scl[0][8]);
  roleSpawn2.run(scl[1][0],scl[1][1],scl[1][2],scl[1][3],scl[1][4],scl[1][5],scl[1][6],scl[1][7],scl[1][8]);
  //roleSpawn3.run(scl[2][0],scl[2][1],scl[2][2],scl[2][3],scl[2][4],scl[2][5],scl[2][6],scl[2][7],scl[2][8]);

	gameStatus.display_status(1);

  //for (var spawn in Game.spawns){
    //roleSpawn.run(spawn);
	//}

};
