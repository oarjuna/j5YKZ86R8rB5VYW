// import modules
require('prototype.spawn')();

var roleHarvester = require('role.new-harvester');
var roleDeliverer = require('role.deliverer');
var roleRemoteHarvester = require('role.remoteharvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleClaimer = require('role.claimer');
var roleRepairer = require('role.repairer');

var roleSoldier = require('role.soldier');
var roleSoldier_melee = require('role.soldier_melee');
var roleSoldier_ranged = require('role.soldier_ranged');
var roleSoldier_healer = require('role.soldier_healer');

var gameStatus = require('status');
var roleSpawn = require('control_spawn');

var roleGeneric = require('role.generic-creep');

var stats = require('screepsplus');
var general = require('role.general');

global.Log = require('Log')

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

Object.defineProperty(StructureController.prototype, 'memory', {
    configurable: true,
    get: function() {
        if(_.isUndefined(Memory.myControllersMemory)) {
            Memory.myControllersMemory = {};
        }
        if(!_.isObject(Memory.myControllersMemory)) {
            return undefined;
        }
        return Memory.myControllersMemory[this.id] =
                Memory.myControllersMemory[this.id] || {};
    },
    set: function(value) {
        if(_.isUndefined(Memory.myControllersMemory)) {
            Memory.myControllersMemory = {};
        }
        if(!_.isObject(Memory.myControllersMemory)) {
            throw new Error('Could not set source memory');
        }
        Memory.myControllersMemory[this.id] = value;
    }
});
/*
Object.defineProperty(StructureController.prototype, 'alert_state', {
  get: function () {
      if (this._alert_state == undefined) {
          if (this.memory.alert_state == undefined) {
              this.memory.alert_state = this.store[RESOURCE_ENERGY];
              this._alert_state = this.store[RESOURCE_ENERGY];
          }
          this._alert_state = this.memory.alert_state;
        }
      return this._alert_state;
  },
  set: function(newValue) {
    // when storing in memory you will want to change the setter
    // to set the memory value as well as the local value
    this.memory.alert_state = newValue;
    this._sources = newValue;
  },
  enumerable: false,
  configurable: true
});
*/

// xsinx
Creep.prototype.hasActiveBodypart = function (type) {
	for (let i = this.body.length - 1; i >= 0; i--) {
		if (this.body[i].hits <= 0) return false;
		if (this.body[i].type === type) return true;
	}
	return false;
};

  var Hive = {
    spawn_names: ['Spawn1','Spawn2','Spawn3','Spawn4'],
    spawn_levels:
                //  Harvest, Deliv, Upgrade, Build, Energy, RemoteHarv, Claim, Soldier, Repair, Sol-M ,Sol-R, Sol-H
                [// H  D  U  B Cr  Rh C  S  R Sm Sr SH
                  [ 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Spawn1
                  [ 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Spawn2
                  [ 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Spawn3
                  [ 2, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Spawn4
                ],
    sources:    [
                  [ '5873bcc211e3e4361b4d81ec','5873bcc211e3e4361b4d81ed','5873c16c63ad7a7555b7b2e1'], // Spawn1
                  [ '5873bcc511e3e4361b4d822e','5873bcc511e3e4361b4d822f','5873c16d63ad7a7555b7b2f3'], // Spawn2
                  [ '5873bcc711e3e4361b4d827e','5873bcc711e3e4361b4d827f','5873c16d63ad7a7555b7b302'], // Spawn3
                  [ '5873bcc911e3e4361b4d82e1','5873bcc911e3e4361b4d82e2']  // Spawn4
                ],
    harvs_per_source: [
                        [1,1,0], // Spawn1
                        [1,1,0], // Spawn2
                        [1,1,0], // Spawn3
                        [2,1]  // Spawn4
                      ],
    links: [
            ['59a411fd06b5240409f8b847','59a446a802722c0fd674afdf'], // Spawn1
            ['59a76b55b9e281705d3b9dea','59a76faf7ced283f9816ea6d'], // Spawn2
            ['59ad5f7548ab72269b30f527','59ad81d6cdfbbf72a0df0c3a'], // Spawn3
            ['000000000000000000000001','000000000000000000000001'], // Spawn4
          ],
    receiving_link: [
                    '59a446a802722c0fd674afdf', // Spawn1
                    '59a76b55b9e281705d3b9dea', // Spawn2
                    '59ad81d6cdfbbf72a0df0c3a', // Spawn3
                    '000000000000000000000001' // Spawn4
                  ],
    military_squad : [],
    job_queue : [],
    deliverer_carry_cap : [
                          '400', // Spawn1
                          '400', // Spawn2
                          '400', // Spawn3
                          '400'  // Spawn4
    ]
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

  Object.defineProperty(Hive , 'job_queue', {
    get: function () {
        if (this._job_queue == undefined) {
            if (this.memory.job_queue == undefined) {
                this.memory.job_queue = [];
                this._job_queue = [];
            }
            this._job_queue = this.memory.job_queue;
          }
        return this._job_queue;
    },
    set: function(newValue) {
      // when storing in memory you will want to change the setter
      // to set the memory value as well as the local value
      this.memory.job_queue = newValue;
      this._sources = newValue;
    },
    enumerable: false,
    configurable: true
});



console.log("------ START ------");

  // housekeeping -- check for memory entries of dead creeps by iterating over Memory.creeps
  for (let name in Memory.creeps) { if (Game.creeps[name] == undefined) { delete Memory.creeps[name]; } }

	// run the roles per creep
  for (let name in Game.creeps) {
  	var creep = Game.creeps[name];
    //creep.memory.job = undefined;
    if (creep.memory.role == 'soldier')             { roleSoldier.run(creep); }
    else if (creep.memory.ryantest == true ) { roleGeneric.run(creep,Hive); }
    else if (creep.memory.role == 'soldier_melee')  { roleSoldier_melee.run(creep); }
    else if (creep.memory.role == 'soldier_ranged') { roleSoldier_ranged.run(creep); }
    else if (creep.memory.role == 'soldier_healer') { roleSoldier_healer.run(creep); }
    else if (creep.memory.role == 'harvester')      { roleHarvester.run(creep); }
  	else if (creep.memory.role == 'deliverer')      { roleDeliverer.run(creep); }
  	else if (creep.memory.role == 'upgrader')       { roleUpgrader.run(creep); }
  	else if (creep.memory.role == 'builder')        { roleBuilder.run(creep); }
  	else if (creep.memory.role == 'claimer')        { roleClaimer.run(creep); }
    else if (creep.memory.role == 'claimer_reg')        { roleClaimer.run(creep); }
  	else if (creep.memory.role == 'repairer')       { roleRepairer.run(creep); }
  	else if (creep.memory.role == 'remote_harv')    { roleRemoteHarvester.run(creep); }


  }
  general.run(Hive);

  roleSpawn.run(0,Hive);
  roleSpawn.run(1,Hive);
  roleSpawn.run(2,Hive);
  roleSpawn.run(3,Hive);


  console.log("#-------------------------------------------------------#  H, U, R, B, RH, C, De, EM, S");

  gameStatus.display_status(0,Hive);
  gameStatus.display_status(1,Hive);
	gameStatus.display_status(2,Hive);
  gameStatus.display_status(3,Hive);

/*
  // display the job queue
  for ( let i of Hive.memory.job_queue ) {
    let foo = Game.getObjectById(i.dest_id);1
    console.log("JQ " + i.type + " dest - " + foo.store[RESOURCE_ENERGY]);

    console.log("JQ: " + job.spawn_name+ " index " + x + " type " + job.type + " " + job.dest_id);

  }
*/
  console.log("---- Job Queue ---- len: " + Hive.memory.job_queue.length);
  // display the job queue

  var sorted_job_queue = Hive.memory.job_queue.sort(function(a, b) {
    return parseFloat(a.priority) - parseFloat(b.priority);
  });

  //var sorted_job_queue = _.sortBy(Hive.memory.job_queue,  [function(o) { return o.type; }] );

  for ( let job of sorted_job_queue) {

    let tmp_obj = Game.getObjectById(job.assigned_creep);
    if ( tmp_obj != undefined ) { name = tmp_obj.name;}
    else { name = 'undefined'; }

    var dest_obj = Game.getObjectById(job.dest_id);

  if ( job.dest_id == 'closest' || job.dest_id == 'default' )  {  dest_type =  job.dest_id; }
  else { dest_type = dest_obj.structureType; }

  var type = job.type;
  var type2 = type.slice(0,2);
  if ( type2 == '01') { j_type = 'Fillfrom'; }
  else if ( type2 == '02' ) { j_type = 'Deliver'; }


    if ( job.state == 'assigned') {
      Log.info(job.id + "@" + job.spawn_name + "\tt: " + j_type + "\tp: " + job.priority + "\td: " + dest_type + "\ttq " + ( Game.time - job.tick_issued) + "\tcr: " + name ,'Queue');
    }
  }
  console.log("------ END ------");
  //console.log("#-------------------------------------------------------#  H, U, R, B, RH, C, De, EM, S");
  stats.collect_stats();
  Memory.stats.job_queue_length = Hive.memory.job_queue.length;
  //for (var spawn in Game.spawns){
    //roleSpawn.run(spawn);
	//}

};
