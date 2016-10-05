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
var roleSpawn2 = require('role.spawn2');
//var roleSpawn = require('role.spawn');


module.exports.loop = function () {
    // housekeeping -- check for memory entries of dead creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) { if (Game.creeps[name] == undefined) { delete Memory.creeps[name]; } }

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
    	}

    	// Tower control
    	var towers = Game.rooms.E57N4.find(FIND_STRUCTURES, {
        	filter: (s) => s.structureType == STRUCTURE_TOWER
    	});
    	for (let tower of towers) {
        	var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		var repair_target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                	filter: (s) => s.hits < s.hitsMax && 
					s.structureType != STRUCTURE_WALL &&
					s.structureType != STRUCTURE_RAMPART
        	});
        	if (target != undefined) {
	    		console.log(tower + " -- attacking " + target);
            		tower.attack(target);
        	}
		else if (repair_target != undefined ) {
			tower.repair(repair_target);
		}	
    	}
        // Tower control
        var towers = Game.rooms.E58N3.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_TOWER
        });
        for (let tower of towers) {
                var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var repair_target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => s.hits < s.hitsMax && 
					s.structureType != STRUCTURE_WALL &&
					s.structureType != STRUCTURE_RAMPART
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
    	var centerlink = Game.getObjectById("57ee7790b2cf99e1199ebf1c"); // storage link
    	var southlink =   Game.getObjectById("57eecdaa33926a476d1e764b"); // controller link
	var northlink = Game.getObjectById("57f45a291d1a9d5c42304e96"); // north link
    	var ls1 =  centerlink.transferEnergy(southlink);
    	var ls2 =  northlink.transferEnergy(centerlink);

	// Run the spawn logics
	roleSpawn1.run(100);
	roleSpawn2.run(100);
	console.log("link status -- center_to_contrl: " + ls1 + " north_to_center: " + ls2);

	for (var spawn in Game.spawns){
//		roleSpawn.run(spawn);
	}
};
