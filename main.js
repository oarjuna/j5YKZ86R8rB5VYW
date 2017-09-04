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
var roleSoldier_melee = require('role.soldier_melee');
var roleSoldier_ranged = require('role.soldier_ranged');
var roleSoldier_healer = require('role.soldier_healer');

var gameStatus = require('status');
var roleSpawn = require('role.spawn');

var stats = require('screepsplus');
var general = require('role.general');

// START
module.exports.loop = function () {

  Object.defineProperty(StructureContainer.prototype, 'memory', {
      configurable: true,
      get: function() {
          if(_.isUndefined(Memory.myContainersMemory)) {
              Memory.myContainersMemory = {};
          }
          if(!_.isObject(Memory.myContainersMemory)) {
              return undefined;
          }
          return Memory.myContainersMemory[this.id] =
                  Memory.myContainersMemory[this.id] || {};
      },
      set: function(value) {
          if(_.isUndefined(Memory.myContainersMemory)) {
              Memory.myContainersMemory = {};
          }
          if(!_.isObject(Memory.myContainersMemory)) {
              throw new Error('Could not set source memory');
          }
          Memory.myContainersMemory[this.id] = value;
      }
  });

  Object.defineProperty(StructureContainer.prototype, 'working_count', {
    get: function () {
        if (this._working_count == undefined) {
            if (this.memory.working_count == undefined) {
                this.memory.working_count = this.store[RESOURCE_ENERGY];
                this._working_count = this.store[RESOURCE_ENERGY];
            }
            this._working_count = this.memory.working_count;
          }
        return this._working_count;
    },
    set: function(newValue) {
      // when storing in memory you will want to change the setter
      // to set the memory value as well as the local value
      this.memory.working_count = newValue;
      this._sources = newValue;
    },
    enumerable: false,
    configurable: true
});

  var Hive = {
    spawn_names: ['Spawn1','Spawn2','Spawn3','Spawn4'],
    spawn_levels:
                //  Harvest, Deliv, Upgrade, Build, Energy, RemoteHarv, Claim, Soldier, Repair, Sol-M ,Sol-R, Sol-H
                [
                  [ 2, 4, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0], // Spawn1
                  [ 2, 3, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0], // Spawn2
                  [ 2, 3, 4, 1, 0, 1, 0, 0, 0, 0, 0, 0], // Spawn3
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Spawn4
                ],
    sources:    [
                  [ '5873bcc211e3e4361b4d81ec','5873bcc211e3e4361b4d81ed'], // Spawn1
                  [ '5873bcc511e3e4361b4d822e','5873bcc511e3e4361b4d822f'], // Spawn2
                  [ '5873bcc711e3e4361b4d827e','5873bcc711e3e4361b4d827f'], // Spawn3
                  [ '000000000000000000000001','000000000000000000000002']  // Spawn4
                ],
    harvs_per_source: [
                        [1,1], // Spawn1
                        [1,1], // Spawn2
                        [1,1], // Spawn3
                        [0,0]  // Spawn4
                      ],
    links: [
            ['59a411fd06b5240409f8b847','59a446a802722c0fd674afdf'], // Spawn1
            ['59a76b55b9e281705d3b9dea','59a76faf7ced283f9816ea6d'], // Spawn2
            ['000000000000000000000001','000000000000000000000001'], // Spawn3
            ['000000000000000000000001','000000000000000000000001'], // Spawn4
          ],
    receiving_link: [
                    '59a446a802722c0fd674afdf', // Spawn1
                    '59a76b55b9e281705d3b9dea', // Spawn2
                    '000000000000000000000001', // Spawn3
                    '000000000000000000000001' // Spawn4
                  ],
    military_squad : [],
    job_queue : []
  };


  Object.defineProperty(Hive, 'memory', {
      configurable: true,
      get: function() {
          if(_.isUndefined(Memory.HiveMemory)) {
              Memory.HiveMemory = {};
          }
          if(!_.isObject(Memory.HiveMemory)) {
              return undefined;
          }
          return Memory.HiveMemory[this.id] =
                  Memory.HiveMemory[this.id] || {};
      },
      set: function(value) {
          if(_.isUndefined(Memory.HiveMemory)) {
              Memory.HiveMemory = {};
          }
          if(!_.isObject(Memory.HiveMemory)) {
              throw new Error('Could not set source memory');
          }
          Memory.HiveMemory[this.id] = value;
      }
  });


  // housekeeping -- check for memory entries of dead creeps by iterating over Memory.creeps
  for (let name in Memory.creeps) { if (Game.creeps[name] == undefined) { delete Memory.creeps[name]; } }

	// run the roles per creep
  for (let name in Game.creeps) {
  	var creep = Game.creeps[name];
    if (creep.memory.role == 'soldier')             { roleSoldier.run(creep); }
    else if (creep.memory.role == 'soldier_melee')  { roleSoldier_melee.run(creep); }
    else if (creep.memory.role == 'soldier_ranged') { roleSoldier_ranged.run(creep); }
    else if (creep.memory.role == 'soldier_healer') { roleSoldier_healer.run(creep); }
    else if (creep.memory.role == 'harvester')      { roleHarvester.run(creep); }
  	else if (creep.memory.role == 'deliverer')      { roleDeliverer.run(creep); }
  	else if (creep.memory.role == 'energy_mover')   { roleEnergyMover.run(creep); }
  	else if (creep.memory.role == 'upgrader')       { roleUpgrader.run(creep); }
  	else if (creep.memory.role == 'builder')        { roleBuilder.run(creep); }
  	else if (creep.memory.role == 'claimer')        { roleClaimer.run(creep); }
  	else if (creep.memory.role == 'repairer')       { roleRepairer.run(creep); }
  	else if (creep.memory.role == 'remote_harv')    { roleRemoteHarvester.run(creep); }

  }

  general.run(Hive);

  roleSpawn.run(0,Hive);
  roleSpawn.run(1,Hive);
  roleSpawn.run(2,Hive);

  gameStatus.display_status(0,Hive);
  gameStatus.display_status(1,Hive);
	gameStatus.display_status(2,Hive);

  console.log("#-------------------------------------------------------#  H, U, R, B, RH, C, De, EM, S");
  stats.collect_stats();
  //for (var spawn in Game.spawns){
    //roleSpawn.run(spawn);
	//}

};
