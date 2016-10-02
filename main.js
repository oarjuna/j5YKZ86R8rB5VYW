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

module.exports.loop = function () {
    // housekeeping -- check for memory entries of dead creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) { if (Game.creeps[name] == undefined) { delete Memory.creeps[name]; } }

    // setup some minimum numbers fo1 different roles
    var minimumNumberOfHarvesters = 4;
    var minimumNumberOfRemoteHarvesters = 4;
    var minimumNumberOfLocalHarvesters = 3;
    var minimumNumberOfUpgraders = 0;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfClaimers = 4;
    var minimumNumberOfSoldiers = 0;
    var minimumNumberOfRepairers = 0;
    var minimumNumberOfWallRepairers = 1;
    var minimumNumberOfEnergyMovers = 3;

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

    // status
    // count the number of creeps alive for each role
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfRemoteHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harvester');
    var numberOfLocalHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
    var numberOfSoldiers = _.sum(Game.creeps, (c) => c.memory.role == 'soldier');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
    var numberOfEnergyMovers = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover');

    var name = undefined;

    var status1 = " H: " + numberOfHarvesters + "/" + minimumNumberOfHarvesters + " U: " + numberOfUpgraders + "/" + minimumNumberOfUpgraders;
    var status2 = "R: " + numberOfRepairers + "/" + minimumNumberOfRepairers + " B: " + numberOfBuilders + "/" + minimumNumberOfBuilders;
    var status3 = "RH: " + numberOfRemoteHarvesters + "/" + minimumNumberOfRemoteHarvesters;

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var energyAvailable = Game.spawns.Spawn1.room.energyAvailable;

    var status4 = "E:  " + energyAvailable + "/" + energy;
    var status5 = " WR: " + numberOfWallRepairers + "/" + minimumNumberOfWallRepairers;
    var status6 = " C: " + numberOfClaimers + "/" + minimumNumberOfClaimers;
    var status7 = " LH: " + numberOfLocalHarvesters + "/" + minimumNumberOfLocalHarvesters;
    var room = Game.spawns.Spawn1.room;
    var status8 = " UP: " + room.controller.progress + "/" + room.controller.progressTotal + 
	    	" lvl: " + room.controller.level;
    var status9 = " EM: " + numberOfEnergyMovers  + "/" + minimumNumberOfEnergyMovers;
    var status10 = " S: " + numberOfSoldiers + "/" + minimumNumberOfSoldiers;

    console.log("\n#------------------#");
    console.log(status4 + status8 );
    console.log( status1 + " " + status2 + " " + status3 + status5 + status6 + status7 + status9 + status10);

    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
	console.log("main -- spawning harvester");
        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            // spawn one with what is available
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
    }

   // if not enough local harvesters
    else if (numberOfLocalHarvesters < minimumNumberOfLocalHarvesters) {
        var lh_tmp = _.sum(Game.creeps,
                        (c) => c.memory.role == 'local_harvester' &&
                                c.memory.destid == '579faa710700be0674d30fd7'
                        );
        if ( lh_tmp < 2 ) { var dest = '579faa710700be0674d30fd7'; } // north
        else { var dest = '579faa710700be0674d30fd8'; } // south
        console.log("main -- spawning local_harvester -- " + dest + " -- " + lh_tmp);
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'local_harvester',dest);
    }
   // if not enough energy movers
    else if (numberOfEnergyMovers < minimumNumberOfEnergyMovers) {
        var st_num = _.sum(Game.creeps,
                        (c) => c.memory.role == 'energy_mover'  &&
				c.memory.destid == '57e7235e6b66411171b7f0f8'
                        );

	var c1_num = _.sum(Game.creeps,
                        (c) => c.memory.role == 'energy_mover' &&
                                c.memory.destid == '57e6b6f9bf7be6eb05caa521'
                        );

	var c2_num =  _.sum(Game.creeps,
                        (c) => c.memory.role == 'energy_mover' &&
                                c.memory.destid == '57e6b5c1135326b41e54835e'
                        );

        if ( st_num == 0 ) { var dest = '57e7235e6b66411171b7f0f8'; } // storage
        else if ( c1_num == 0 ) { var dest = '57e6b6f9bf7be6eb05caa521'; } // controller #1
        else if ( c2_num == 0 ){ var dest = '57e6b5c1135326b41e54835e'; } // controller  #2
	else {  var dest = '57e6530dfb8875006e762b5e'; } // controller #3
        console.log("main -- spawning energy_mover -- " + dest );
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'energy_mover',dest);
    }
    // if not enough soldiers
    else if (numberOfSoldiers < minimumNumberOfSoldiers) {
        console.log("main -- spawning soldier");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'soldier2','Attack');
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        console.log("main -- spawning upgrader");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        console.log("main -- spawning repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        console.log("main -- spawning builder");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
	// claimers
    else if (numberOfClaimers < minimumNumberOfClaimers) {
	// count the number of claimers per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag5');

        if ( c_flag1 == 0 ) { var dest = 'Flag1'; } 
        else if ( c_flag2 == 0 ) { var dest = 'Flag2'; } 
        else if ( c_flag3 == 0 ) { var dest = 'Flag3'; } 
        else if ( c_flag4 == 0 ) { var dest = 'Flag4'; } 
        else if ( c_flag5 == 0 ) { var dest = 'Flag5'; } 
        else { var dest = 'error'; } 

        console.log("main -- spawning claimer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'claimer',dest);
    }

    // if not enough wallRepairers
    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
        // try to spawn one
        console.log("main -- spawning wall repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
    }
    // if not enough remote harvesters
    else if (numberOfRemoteHarvesters < minimumNumberOfRemoteHarvesters) {
        // count the number of remote harvs per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'remote_harvester' && c.memory.destid == 'Flag5');

        if ( c_flag1 == 0 ) { var dest = 'Flag1'; }
        else if ( c_flag2 == 0 ) { var dest = 'Flag2'; }
        else if ( c_flag3 == 0 ) { var dest = 'Flag3'; }
        else if ( c_flag4 == 0 ) { var dest = 'Flag4'; }
        else if ( c_flag5 == 0 ) { var dest = 'Flag5'; }
        else { var dest = 'error'; }

        console.log("main -- spawning remote_harvester");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remote_harvester',dest);
    }

};
