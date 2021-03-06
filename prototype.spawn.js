module.exports = function() {
// move = 50
// carry = 50
// work = 100

// 300
// 550
// 800
// 1300

  StructureSpawn.prototype.createCustomCreep =
  function(energy_avail, roleName, dest, birthplace,return_id) {

    if ( roleName == 'harvester') { var ryantest = true; }
    else if ( roleName == 'deliverer') { var ryantest = true; }
    else if ( roleName == 'upgrader') { var ryantest = true; }
    else if ( roleName == 'builder') { var ryantest = true; }
    else { var ryantest = false; }

    //var ryantest = false;
    // 300 - 549 energy_avail --- initial spawn
    if ( energy_avail <= 550 ) {
      if      (roleName == 'harvester') { var body = [ WORK, WORK, MOVE, CARRY ]; } // 250
      else if (roleName == 'builder')   { var body = [ WORK, MOVE, MOVE, CARRY, CARRY ]; } // 300
      else if (roleName == 'repairer')  { var body = [ WORK, MOVE, MOVE, CARRY, CARRY ]; } // 300
      else if (roleName == 'upgrader')  { var body = [ WORK, MOVE, MOVE, CARRY, CARRY ]; } // 300
      else if (roleName == 'deliverer') { var body = [ MOVE, MOVE, CARRY, CARRY, WORK ]; } // 300
      else if (roleName == "soldier")   { var body = [ TOUGH, TOUGH, TOUGH, TOUGH, MOVE, ATTACK ,MOVE, ATTACK]; } // 300
    }

    // 550 - 799 energy_avail
    else if ( energy_avail > 550 && energy_avail < 850 ) {
      if      (roleName == 'harvester')   { var body = [ WORK, WORK, WORK, MOVE, MOVE, CARRY  ]; }                          // 500
      else if (roleName == 'deliverer')   { var body = [ WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; }                  	// 500
      else if (roleName == 'upgrader')    { var body = [ WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ]; }                  	// 550


      else if (roleName == 'builder')     { var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY ]; }                   // 550
      else if (roleName == 'repairer')    { var body = [ WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ]; }                          // 550

      else if (roleName == "remote_harv") { var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; } // 700
      else if (roleName == "claimer")     { var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY ]; }              // 600
      else if (roleName == "claimer_lg")  { var body = [ CLAIM, MOVE, MOVE]; roleName = "claimer"; }                                    // 700
      else if (roleName == "soldier")     { var body = [ TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK]; }   // 550
    }

    // 800 energy_avail
    else if ( energy_avail >= 850 && energy_avail < 1000 ) {
      if      (roleName == 'harvester')   { var body = [ WORK,WORK,WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY ];  }         // 800
      else if (roleName == 'deliverer')   { var body = [ MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY,
                                                         MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY
                                          ]; }  // 800
      else if (roleName == 'upgrader')    { var body = [ WORK,WORK,WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ];  } // 750
      else if (roleName == 'builder')     { var body = [ WORK,WORK,WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY ];  }  // 750
      else if (roleName == 'repairer')    { var body = [ WORK,WORK,WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY ];  }         // 750

      else if (roleName == "remote_harv") { var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY ]; } // 700 }
      else if (roleName == "claimer")     { var body = [ WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY ]; } //  600 }
      else if (roleName == "claimer_lg")  { var body = [ CLAIM, MOVE, MOVE, MOVE, MOVE ]; roleName = "claimer";  } // 800 }
      else if (roleName == "soldier")     { var body = [ TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK];  }// 720 }
    }

    // >= 1100 energy_avail
    else if ( energy_avail >= 1000 ){
      if      (roleName == 'harvester') {
          var body = [ WORK,WORK,WORK,WORK,WORK,WORK,WORK,  // 700
                       MOVE, MOVE, MOVE, MOVE,             // 200
                       CARRY, CARRY ];                  // 100
      }         // 1000

      else if (roleName == 'upgrader')    {
        var body = [ WORK,WORK,WORK,WORK,WORK,WORK,  // 600
                  MOVE, MOVE,             // 100
                  CARRY, CARRY ];          // 100
      } // 800

      else if (roleName == 'deliverer')     {
        var body = [
                  MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,           // 400
                  CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY ];                  // 400
      }  // 800

      else if ( roleName == 'builder' || roleName == 'repairer')     {
        var body = [ WORK,WORK,WORK,WORK,  // 400
                  MOVE, MOVE,MOVE,MOVE, MOVE, MOVE,            // 300
                  CARRY, CARRY, CARRY, CARRY ];                  // 200
      }  // 900

      else if (roleName == "remote_harv")  {
          var body = [
	          WORK, WORK, WORK,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,           // 400
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY ];                  // 400
          }  // 800

      else if (roleName == "claimer")     { var body = [ CLAIM, CLAIM, MOVE, MOVE ];  } //  1350 }
      else if (roleName == "claimer_reg") { var body = [  WORK, WORK, WORK, WORK, WORK, WORK, WORK,  //700
                                                          MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, //350
                                                          CARRY, CARRY // 100
                                                      ]; } // 1150 }
      else if (roleName == "energy_mover"){ var body = [ WORK, WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY ]; } // 1100}

      // HEAL 250,RANGED_ATTACK 150,MOVE 50,ATTACK 80,TOUGH 10
      // W = creep weight ( # of body parts, excluding move and carry)
      // K = terrain factor ( .5 road, 1x plain, 5x swamp)
      // M = number of move parts
      // round up to the nearest integer
      // t = ceil(K * W / M)

      else if (roleName == "soldier") {
        var body = [ TOUGH,TOUGH,TOUGH,TOUGH,                               // 40 - 4
                     TOUGH,TOUGH,TOUGH,TOUGH,                               // 40 - 4
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,     // 500 - 10
                     MOVE,                                                   //  50 - 1
                     ATTACK,ATTACK,                                          // 160 - 2
                     HEAL                                                   // 250 - 1
                   ]; }     // 1040 total - balanced fatigue -- 66 to spawn - TTL 1500 - HITS 2200

      else if (roleName == "soldier_melee") {
        var body = [ TOUGH,TOUGH,TOUGH,TOUGH,                               // 40 - 4
                     TOUGH,TOUGH,TOUGH,TOUGH,                               // 40 - 4
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,     // 500 - 10
                     MOVE,MOVE,                                             // 100 - 2
                     ATTACK,ATTACK,ATTACK,ATTACK                            // 320 - 4
                   ]; }     // 1000 total - balanced fatigue

      else if (roleName == "soldier_ranged") {
        var body = [ TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,                          // 50 - 5
                     TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,                          // 50 - 5
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,     // 500 - 10
                     MOVE,MOVE,                                             // 100 - 2
                     RANGED_ATTACK,RANGED_ATTACK                            // 300 - 2
                   ]; }     // 1000 total - balanced fatigue

      else if (roleName == "soldier_healer"){
        var body = [ TOUGH,TOUGH,TOUGH,TOUGH,                               // 40 - 4
                     TOUGH,TOUGH,TOUGH,TOUGH,                               // 40 - 4
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,     // 500 - 10
                     HEAL,HEAL                                              // 500 - 2
                   ]; }     //  1080 total - balanced fatigue
    }

    // create creep with the created body and the given role
    //console.log("spawning -- " + roleName + " -- "+ energy_avail );
    return this.createCreep(body, undefined, { role: roleName, working: false, destid: dest, birthplace: birthplace, return_id: return_id, state: 'idle', ryantest : ryantest});
  };
};
