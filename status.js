module.exports = {
   display_status: function(foo)
   {  //// start
	///    Game.spawns[i].createCreep(body);
        for (var spawn in Game.spawns.name){
		console.log(spawn + " helo!");
        }


        // count the number of creeps alive for each role born at Spawn1
        var numSpawn1Harv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.birthplace == 'Spawn1');
        var numSpawn1ReHa = _.sum(Game.creeps, (c) => c.memory.role == 'remote_harvester' && c.memory.birthplace == 'Spawn1');
        var numSpawn1LoHa = _.sum(Game.creeps, (c) => c.memory.role == 'local_harvester' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Upgr = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Buil = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Clai = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Sold = _.sum(Game.creeps, (c) => c.memory.role == 'soldier' && c.memory.birthplace == 'Spawn1');
        var numSpawn1Repa = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.birthplace == 'Spawn1');
        var numSpawn1WaRe = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.birthplace == 'Spawn1');
        var numSpawn1EnMo = _.sum(Game.creeps, (c) => c.memory.role == 'energy_mover' && c.memory.birthplace == 'Spawn1');

	      var roomSp1 = Game.spawns.Spawn1.room;
        var energySp1 = Game.spawns.Spawn1.room.energyCapacityAvailable;
        var energyAvailableSp1 = Game.spawns.Spawn1.room.energyAvailable;

        var status1Sp1 = "H: " + numSpawn1Harv + "/" + spawn1Harv;
        var status2Sp1 = " U: " + numSpawn1Upgr + "/" + spawn1MinUgra;
        var status3Sp1 = " R: " + numSpawn1Repa + "/" + spawn1MinRepa;
        var status4Sp1 = " B: " + numSpawn1Buil + "/" + spawn1MinBuil;
        var status5Sp1 = " RH: " + numSpawn1ReHa + "/" + spawn1MinReHa;
        var status6Sp1 = " WR: " + numSpawn1WaRe + "/" + spawn1MinWall;
        var status7Sp1 = " C: " + numSpawn1Clai + "/" + spawn1MinClai;
        var status8Sp1 = " LH: " + numSpawn1LoHa + "/" + spawn1MinLoHa;
        var status9Sp1 = " EM: " + numSpawn1EnMo  + "/" + spawn1MinEner;
        var status10Sp1 =" S: " + numSpawn1Sold + "/" + spawn1MinSold;

        var status11Sp1 = "E: " + energyAvailableSp1 + "/" + energySp1
        var status12Sp1 = " UP: " + roomSp1.controller.progress +
                         "/" + roomSp1.controller.progressTotal +
                        " lvl: " + roomSp1.controller.level;

        var status13Sp1 = " Stored -- " + Game.spawns.Spawn1.room.storage.store[RESOURCE_ENERGY];

        // print the thing
        console.log("Sp1: " + status11Sp1 + status12Sp1 + status13Sp1);
        console.log("Sp1: " + status1Sp1 + status2Sp1 + status3Sp1 + status4Sp1 + status5Sp1 + status6Sp1 +
                        status7Sp1 + status8Sp1 + status9Sp1 + status10Sp1);
////// end
   }
};
