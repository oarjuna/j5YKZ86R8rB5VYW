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
    var spawn1MinHarv = 4;
    var spawn1MinReHa = 4;
    var spawn1MinLoHa = 3;
    var spawn1MinUgra = 0;
    var spawn1MinBuil = 1;
    var spawn1MinClai = 6;
    var spawn1MinSold = 0;
    var spawn1MinRepa = 0;
    var spawn1MinWall = 1;
    var spawn1MinEner = 3;

	// control Spawn2 levels
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

    // status 
    // count the number of creeps alive for each role
    var numSpawn1Harv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthpace == 'Spawn1');
    var numSpawn1ReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harvester' && c.memory.birthpace == 'Spawn1');
    var numSpawn1LoHa = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester' && c.memory.birthpace == 'Spawn1');
    var numSpawn1Upgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthpace == 'Spawn1');
    var numSpawn1Buil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthpace == 'Spawn1');
    var numSpawn1Clai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthpace == 'Spawn1');
    var numSpawn1Sold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthpace == 'Spawn1');
    var numSpawn1Repa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthpace == 'Spawn1');
    var numSpawn1WaRe = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.birthpace == 'Spawn1');
    var numSpawn1EnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthpace == 'Spawn1');

    var name = undefined;

    var status1 = " H: " + numSpawn1Harv + "/" + spawn1MinHarv + " U: " + numSpawn1Upgr + "/" + spawn1MinUgra;
    var status2 = "R: " + numSpawn1Repa + "/" + spawn1MinRepa + " B: " + numSpawn1Buil + "/" + spawn1MinBuil;
    var status3 = "RH: " + numSpawn1ReHa + "/" + spawn1MinReHa;

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var energyAvailable = Game.spawns.Spawn1.room.energyAvailable;

    var status4 = "E:  " + energyAvailable + "/" + energy;
    var status5 = " WR: " + numSpawn1WaRe + "/" + spawn1MinWall;
    var status6 = " C: " + numSpawn1Clai + "/" + spawn1MinClai;
    var status7 = " LH: " + numSpawn1LoHa + "/" + spawn1MinLoHa;
    var room = Game.spawns.Spawn1.room;
    var status8 = " UP: " + room.controller.progress + "/" + room.controller.progressTotal + 
	    	" lvl: " + room.controller.level;
    var status9 = " EM: " + numSpawn1EnMo  + "/" + spawn1MinEner;
    var status10 = " S: " + numSpawn1Sold + "/" + spawn1MinSold;

    console.log("\n#------------------#");
    console.log(status4 + status8 );
    console.log( status1 + " " + status2 + " " + status3 + status5 + status6 + status7 + status9 + status10);

    // if not enough harvesters
    if (numSpawn1Harv < spawn1MinHarv) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
	console.log("main -- spawning harvester");
        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numSpawn1Harv == 0) {
            // spawn one with what is available
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
    }

   // if not enough local harvesters
    else if (numSpawn1LoHa < spawn1MinLoHa) {
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
    else if (numSpawn1EnMo < spawn1MinEner) {
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
    else if (numSpawn1Sold < spawn1MinSold) {
        console.log("main -- spawning soldier");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'soldier2','Attack');
    }
    // if not enough upgraders
    else if (numSpawn1Upgr < spawn1MinUgra) {
        console.log("main -- spawning upgrader");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    // if not enough repairers
    else if (numSpawn1Repa < spawn1MinRepa) {
        console.log("main -- spawning repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numSpawn1Buil < spawn1MinBuil) {
        console.log("main -- spawning builder");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
	// claimers
    else if (numSpawn1Clai < spawn1MinClai) {
	// count the number of claimers per flag
        var c_flag1 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag1');
        var c_flag2 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag2');
        var c_flag3 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag3');
        var c_flag4 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag4');
        var c_flag5 = _.sum(Game.creeps,(c) => c.memory.role == 'claimer' && c.memory.destid == 'Flag5');

	var role;
        if ( c_flag1 == 0 ) { var dest = 'Flag1'; role = "claimer"; } 
        else if ( c_flag2 == 0 ) { var dest = 'Flag2'; role = "claimer"; } 
        else if ( c_flag3 == 0 ) { var dest = 'Flag3'; role = "claimer"; } 
        else if ( c_flag4 == 0 ) { var dest = 'Flag4'; role = "claimer"; } 
        else if ( c_flag5 == 1 ) { var dest = 'Flag5'; role = "claimer"; }  // allow two of these
        else { var dest = 'error'; } 

        console.log("main -- spawning claimer " + dest + " body - " + role);
        name = Game.spawns.Spawn1.createCustomCreep(energy, role, dest);
    }

    // if not enough wallRepairers
    else if (numSpawn1WaRe < spawn1MinWall) {
        // try to spawn one
        console.log("main -- spawning wall repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
    }
    // if not enough remote harvesters
    else if (numSpawn1ReHa < spawn1MinReHa) {
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
