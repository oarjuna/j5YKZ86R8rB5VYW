module.exports = {
  run: function(spawn_num,Hive) {
    var spawn_name = Hive.spawn_names[spawn_num];

    // Define the job object
    // job object prototype - spawn_name,type, priority, state, body_type_req, dest_id, extra, tick_issued, tick_complete
    //    states - assigned / complete / abandoned / timed out / unasssigned
    function Job (spawn_name,type,priority,state,body_type_req,dest_id,extra,tick_issued,tick_complete,assigned_creep) {
        this.spawn_name = spawn_name;
        this.type = type;
        this.priority = priority;
        this.state = state;
        this.body_type_req = body_type_req;
        this.dest_id = dest_id;
        this.extra = extra;
        this.tick_issued = tick_issued;
        this.tick_complete = tick_complete;
        this.assigned_creep = assigned_creep;
        this.uuid = function uuid()  {
          var uuid = "", i, random,uuidlen = 12;

          for (i = 0; i < uuidlen; i++) {
            random = Math.random() * 16 | 0;
            if (i == 8 || i == 12 || i == 16 || i == 20) {
              uuid += "-";
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
          }
          return uuid;
        };
        this.id = this.uuid();
    }

    /// START LOGIC
    [MinHarv,MinDeli,MinUgra,MinBuil,MinClReg,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
    var spawn_name = Hive.spawn_names[spawn_num];

    // count the number of creeps alive for each role born at
    var numHarv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == spawn_name);
    var numReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harv' && c.memory.birthplace == spawn_name);
    var numDeli = _.sum(Game.creeps, (c) => c.memory.role == 'deliverer' && c.memory.birthplace == spawn_name);
    var numUpgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == spawn_name);
    var numBuil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == spawn_name);
    var numClai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == spawn_name);
    var numSold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == spawn_name);
    var numSolM = _.sum(Game.creeps, (c) => c.memory.role == 'soldier_melee' && c.memory.birthplace == spawn_name);
    var numSolR = _.sum(Game.creeps, (c) => c.memory.role == 'soldier_ranged' && c.memory.birthplace == spawn_name);
    var numSolH = _.sum(Game.creeps, (c) => c.memory.role == 'soldier_healer' && c.memory.birthplace == spawn_name);
    var numRepa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == spawn_name);
    var numClReg = _.sum(Game.creeps, (c) => c.memory.role == 'claimer_reg' && c.memory.birthplace == spawn_name);


    var energy_avail = Game.spawns[spawn_name].room.energyCapacityAvailable;
    //if ( spawn_name == 'Spawn3' ) { energy_avail = 300; }

    // soldiers
    if (numSold < MinSold) {

     }
     else if (numSolM < MinSolM) {

    }
    else if (numSolR < MinSolR) {

    }
    else if (numSolH < MinSolH) {

    }

    // if not enough harvesters
    else  if (numHarv < MinHarv) {

    }

    // if not enough deliverers
    else if (numDeli < MinDeli) {

    }
    // if not enough  claimers w/ claim parts
    else if (numClReg < MinClReg) {

    }
    // if not enough soldiers
    else if (numSold < MinSold) {

    }
    // if not enough upgraders
    else if (numUpgr < MinUgra) {

    }
    // if not enough repairers
    else if (numRepa < MinRepa) {

    }
    // if not enough builders
    else if (numBuil < MinBuil) {

    }
    // if not enough remote harvesters
    else if (numReHa < MinReHa) {

    }
    // claimers w/o claim parts. remote general workers
    else if (numClai < MinClai) {

    }

  } // END LOGIC
};
