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

module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is local harvester, call local harvester script
        if (creep.memory.role == 'local_harvester') {
            roleLocalHarvester.run(creep);
        }
	
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        // if creep is claimer, call claimer script
        else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        // if creep is repairer, call repairer script
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        // if creep is wallRepairer, call wallRepairer script
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        // if creep is remote harvester
        else if (creep.memory.role == 'remote_harvester') {
            roleRemoteHarvester.run(creep);
	}
    }

    var towers = Game.rooms.E58N3.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	//console.log(tower + " -- reporting in ");
        if (target != undefined) {
	    console.log(tower + " -- attacking " + target);
            tower.attack(target);
        }
    }

    // setup some minimum numbers for different roles
    var minimumNumberOfHarvesters = 3;
    var minimumNumberOfRemoteHarvesters = 10;
    var minimumNumberOfLocalHarvesters = 2;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 2;
    var minimumNumberOfClaimers = 0;
    var minimumNumberOfRepairers = 2;
    var minimumNumberOfWallRepairers = 1;

    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfRemoteHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harvester');
    var numberOfLocalHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');

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

    console.log("\n#------------------#");
    console.log(status4 + " " + status1 + " " + status2 + " " + status3 + status5 + status6 + status7);

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

    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        console.log("main -- spawning upgrader");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        // try to spawn one
        console.log("main -- spawning repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        console.log("main -- spawning builder");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    else if (numberOfClaimers < minimumNumberOfClaimers) {
        // try to spawn one
        console.log("main -- spawning claimer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'claimer');
    }

    // if not enough wallRepairers
    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
        // try to spawn one
        console.log("main -- spawning wall repairer");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
    }
    // if not enough local harvesters
    else if (numberOfLocalHarvesters < minimumNumberOfLocalHarvesters) {
        // try to spawn one
        console.log("main -- spawning local_harvester");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'local_harvester');
    }
    // if not enough remote harvesters
    else if (numberOfRemoteHarvesters < minimumNumberOfRemoteHarvesters) {
        // try to spawn one
        console.log("main -- spawning remote_harvester");
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remote_harvester');
    }

};
