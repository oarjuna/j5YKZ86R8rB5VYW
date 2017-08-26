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

//var roleSpawn = require('role.spawn');

//var spawn1MinHarv = 4; // 4
//var spawn2MinHarv = 3; // 3
/*
  Harvest, Deliv, Upgrade, Buid, Energy, RemoHarv, Claim, Soldier, Repair
*/
  // spawn levels
  var scl1 = [ 4, 4, 5, 1, 0, 0, 1, 0, 0];
  var scl2 = [ 3, 7, 1, 1, 0, 0, 1, 0, 0];

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
  // spawn levels
  //scl1 = [ 4, 4, 5, 1, 0, 0, 1, 0, 0];
  //scl2 = [ 3, 7, 1, 1, 0, 0, 1, 0, 0];

  // Run the spawn logics
  roleSpawn1.run(scl1[0],scl1[1],scl1[2],scl1[3],scl1[4],scl1[5],scl1[6],scl1[7],scl1[8]);
  roleSpawn2.run(scl2[0],scl2[1],scl2[2],scl2[3],scl2[4],scl2[5],scl2[6],scl2[7],scl2[8]);

	gameStatus.display_status(1);
  //gameStatus.display_status(spawn2_creep_levels);

  for (var spawn in Game.spawns){
    //roleSpawn.run(spawn);
	}

};
