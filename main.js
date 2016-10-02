// import modules
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleLocalHarvester = require('role.localharvester');
var roleRemoteHarvester = require('role.remoteharvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleClaimer = require('role.claimer');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleEnergyMover = require('role.energymover');
var roleSoldier = require('role.soldier');
var roleSpawn1 = require('role.spawn1');

module.exports.loop = function () {
    // housekeeping -- check for memory entries of dead creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) { if (Game.creeps[name] == undefined) { delete Memory.creeps[name]; } }

	// spawn levels
    	var spawn2MinHarv = 0; 
    	var spawn2MinReHa = 0;
    	var spawn2MinLoHa = 0; 
    	var spawn2MinUgra = 0;
    	var spawn2MinBuil = 0; 
    	var spawn2MinClai = 0; 
    	var spawn2MinSold = 0; 
    	var spawn2MinRepa = 0; 
    	var spawn2MinWall = 0; 
    	var spawn2MinEner = 0; 

	// run the roles per creep
    	for (let name in Game.creeps) {
        	var creep = Game.creeps[name];
        	if (creep.memory.role == 'harvester') {  roleHarvester.run(creep); }
        	else if (creep.memory.role == 'local_harvester') {  roleLocalHarvester.run(creep); }
        	else if (creep.memory.role == 'energy_mover') { roleEnergyMover.run(creep); }
        	else if (creep.memory.role == 'upgrader') { roleUpgrader.run(creep); }
        	else if (creep.memory.role == 'builder') { roleBuilder.run(creep); }
        	else if (creep.memory.role == 'claimer') { roleClaimer.run(creep); }
		else if (creep.memory.role == 'soldier') {  roleSoldier.run(creep); }
        	else if (creep.memory.role == 'repairer') { roleRepairer.run(creep); }
        	else if (creep.memory.role == 'wallRepairer') { roleWallRepairer.run(creep); }
        	else if (creep.memory.role == 'remote_harvester') { roleRemoteHarvester.run(creep); }

		creep.memory.birthpace = "Spawn1";
    	}

    	// Tower control
    	var towers = Game.rooms.E58N3.find(FIND_STRUCTURES, {
        	filter: (s) => s.structureType == STRUCTURE_TOWER
    	});
    	for (let tower of towers) {
        	var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		var repair_target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                	filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        	});
        	if (target != undefined) {
	    		console.log(tower + " -- attacking " + target);
            		tower.attack(target);
        	}
		else if (repair_target != undefined ) {
			tower.repair(repair_target);
		}	
    	}

    	// Link control
    	var linkfrom = Game.getObjectById("57ee7790b2cf99e1199ebf1c"); // storage link
    	var linkto =   Game.getObjectById("57ee896c291f632c3c83c6e4"); // controller link
    	var linkstatus = linkfrom.transferEnergy(linkto);
    	//console.log("link status -- " + linkstatus);

	roleSpawn1.run;

	// the same, born at Spawn2
    	var numSpawn2Harv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthpace == 'Spawn2');
    	var numSpawn2ReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harvester' && c.memory.birthpace == 'Spawn2');
    	var numSpawn2LoHa = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester' && c.memory.birthpace == 'Spawn2');
    	var numSpawn2Upgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthpace == 'Spawn2');
    	var numSpawn2Buil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthpace == 'Spawn2');
    	var numSpawn2Clai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthpace == 'Spawn2');
    	var numSpawn2Sold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthpace == 'Spawn2');
    	var numSpawn1Repa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthpace == 'Spawn2');
    	var numSpawn2WaRe = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.birthpace == 'Spawn2');
    	var numSpawn2EnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthpace == 'Spawn2');


};
