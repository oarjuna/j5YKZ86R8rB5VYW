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
var roleSpawn1 = require('role.spawn1');
var roleSpawn2 = require('role.spawn2');
var gameStatus = require('status');
//var roleSpawn = require('role.spawn');

//var spawn1MinHarv = 4; // 4
//var spawn2MinHarv = 3; // 3


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
  var spawn2MinHarv = 3; // 3
  var spawn2MinDeli = 7; // 3
  var spawn2MinUgra = 1; // 3
  var spawn2MinBuil = 1; // 1
  var spawn2MinEner = 0; // 1
  var spawn2MinReHa = 0;
  var spawn2MinClai = 1;
  var spawn2MinSold = 0;
  var spawn2MinRepa = 0;
*/
  // spawn levels
  spawn1_levels = [ 4, 4, 5, 1, 0, 0, 1, 0, 0];
  spawn1_levels = [ 3, 7, 1, 1, 0, 0, 1, 0, 0];
  
  // Run the spawn logics
  roleSpawn1.run(100);
  roleSpawn2.run(100);

	gameStatus.display_status(1);

  for (var spawn in Game.spawns){
    //roleSpawn.run(spawn);
	}

};
