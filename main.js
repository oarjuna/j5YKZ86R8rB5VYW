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

var roleSpawn = require('role.spawn');

module.exports.loop = function () {
  var scl1 = [ 4, 4, 5, 1, 0, 0, 1, 0, 0];
  var scl2 = [ 3, 7, 1, 1, 0, 0, 1, 0, 0];
  var scl3 = [ 2, 1, 0, 0, 0, 0, 0, 0, 0];

  var Empire = {
    spawn_names: ['Spawn1','Spawn2','Spawn3','Spawn4'],
    spawn_levels:
                [
                  [ 4, 4, 5, 1, 0, 0, 1, 0, 0], // Spawn1
                  [ 3, 7, 1, 1, 0, 0, 1, 0, 0], // Spawn2
                  [ 1, 1, 0, 0, 0, 0, 0, 0, 0], // Spawn3
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Spawn4
                ],
    sources:    [
                  [ '5873bcc211e3e4361b4d81ec','5873bcc211e3e4361b4d81ed'], // Spawn1
                  [ '5873bcc511e3e4361b4d822e','5873bcc511e3e4361b4d822f'], // Spawn2
                  [ '5873bcc711e3e4361b4d827e','5873bcc711e3e4361b4d827f'], // Spawn3
                  [ '000000000000000000000001','000000000000000000000002']  // Spawn4
                ],
    harvs_per_source: [
                        [2,2], // Spawn1
                        [1,2], // Spawn2
                        [1,1], // Spawn3
                        [1,1]  // Spawn4
                      ]
  };


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

  roleSpawn1.run(scl1[0],scl1[1],scl1[2],scl1[3],scl1[4],scl1[5],scl1[6],scl1[7],scl1[8]);
  roleSpawn2.run(scl2[0],scl2[1],scl2[2],scl2[3],scl2[4],scl2[5],scl2[6],scl2[7],scl2[8]);
  roleSpawn.run(2,Empire);

  gameStatus.display_status(0,Empire);
  gameStatus.display_status(1,Empire);
	gameStatus.display_status(2,Empire);

  //for (var spawn in Game.spawns){
    //roleSpawn.run(spawn);
	//}

};
