module.exports = {
  run: function(spawn_num,Hive) {
    [MinHarv,MinDeli,MinUgra,MinBuil,MinClReg,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
    var spawn_name = Hive.spawn_names[spawn_num];

    // ----- Below here lies job assignment logic
    // variables
/*
    var container_energy_floor = 100;
    var container_energy_ceiling = deliver_carry_cap;
    var tower_energy_ceiling = 250;
    var link_energy_celiing = 100;
    var empty = 0;
*/
    var deliver_carry_cap = 400;
    var harvester_carry_cap = 150;
    var job_TTL = 200;
    var tmpcreep, min_needed;

    // when a job is completed, times out, or is abandoned, remove it from the job_queue
    // find those jobs and remove them
    var removed = _.remove(Hive.memory.job_queue, function(s) {
        return  (( Game.time - s.tick_issued ) > job_TTL || s.state == 'abandoned' || s.state == 'complete');
      });

    // do things for each removed job
    for ( let x of removed ) {
      // find any creep with this job's id still assigned and remove it from their memory.job // TODO
    }

    // sort the joq queue based on job.priority priority
    var sorted_job_queue = Hive.memory.job_queue.sort(function(a, b) {
      return parseFloat(a.priority) - parseFloat(b.priority);
    });
    // now, try to assign jobs to creeps
    for ( let job of sorted_job_queue) {
    //for ( let job of Hive.memory.job_queue) {

      // TODO
      //Fillfrom - 01ee - ground - builder
      //Work - 03aa - contruct - builder
      //Work - 03bb - repair - builder

      if ( job.spawn_name == spawn_name && job.state == 'unassigned' ) {
        Log.debug("trying to assign " + job.id + " spawn " + job.spawn_name + " need " + job.body_type_req + " t: " + job.type + " d: " + job.dest_id + " x: " + job.extra,'Jobber');
        switch(job.type) {
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// FILL
// Fillfrom - 01aa - resource -> harv
// Fillfrom - 01dd - rec link - upgraders // TODO
// Fillfrom - 01hh - energy from storage - upgraders // TODO
// Fillfrom - 01jj - energy from containers - upgraders // TODO
// Fillfrom - 01bb - energy from container -> deliv
// Fillfrom - 01cc - energy from storage   -> deliv
// Fillfrom - 01ff - mins from storage     -> deliv
// Fillfrom - 01gg - mins from cont       -> deliv
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '01aa': // Fillfrom - 01aa - resource -> harv
            // find local, empty, idle, harvester, with memory.destid = job.dest_id (this is assigned at spawn)
             tmpcreep = _.find(Game.creeps, (c) =>
              ( c.memory.birthplace == job.spawn_name ) &&
              ( c.spawning != true ) &&
              ( _.sum(c.carry) < c.carryCapacity ) &&
              ( c.memory.state == 'idle' ) &&
              ( c.memory.role == 'harvester' ) &&
              ( c.memory.ryantest == true)
            );
          break; // END 01aa
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '01dd': // Fillfrom - 01dd - closest rec link - upgraders // TODO
          case '01hh': // Fillfrom - 01hh - energy from storage - upgraders // TODO
          case '01jj': // Fillfrom - 01jj - energy from closest containers - upgraders // TODO
          // local, empty, idle, upgrader
          tmpcreep = _.find(Game.creeps, (c) =>
            ( c.memory.birthplace == job.spawn_name ) &&
            ( c.spawning != true ) &&
            ( _.sum(c.carry) < c.carryCapacity ) &&
            ( c.memory.state == 'idle' ) &&
            ( c.memory.ryantest == true) &&
            ( c.memory.role == 'upgrader' )
            );
          break;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '01bb': // Fillfrom - 01bb - energy from container -> deliv
          case '01cc': // Fillfrom - 01cc - energy from storage   -> deliv
          case '01ff': // Fillfrom - 01ff - mins from storage     -> deliv
          case '01gg':  // Fillfrom - 01gg - mins from cont       -> deliv
            // local, empty, idle, deliverer
            tmpcreep = _.find(Game.creeps, (c) =>
              ( c.memory.birthplace == job.spawn_name ) &&
              ( c.spawning != true ) &&
              ( _.sum(c.carry) < c.carryCapacity ) &&
              ( c.memory.state == 'idle' ) &&
              ( c.memory.ryantest == true) &&
              ( c.memory.role == 'deliverer' )
              );
          break;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////   DELIVER
// Deliverto - 02aa - energy to closest cont/link - harv
// Deliverto - 02cc - energy to spawn or extension - deliv
// Deliverto - 02dd - energy to tower - deliv
// Deliverto - 02ee - mins to storage - deliv
// Deliverto - 02ff - energy to controller - upgrader
// Deliverto - 02gg - energy to sending link - deliv
// Deliverto - 02hh - mins to term - deliv
// Deliverto - 02ii - energy to storage - deliv
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '02aa': // Delivto - 02aa - energy to closest cont/link - harv
            // find creep per normal
            tmpcreep = _.find(Game.creeps, (c) =>
             ( c.memory.birthplace == job.spawn_name ) &&
             ( c.spawning != true ) &&
             ( c.carry[job.extra] > 0 ) &&
             ( c.memory.state == 'idle' ) &&
             ( c.memory.ryantest == true) &&
             ( c.memory.role == 'harvester' )
            );

            if ( tmpcreep != undefined ) {
              // Find nearby structures with enough space for a full drop off

              var near_cont = tmpcreep.pos.findClosestByPath(FIND_STRUCTURES, {
                  filter: (s) => (
                    ( s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) <= s.storeCapacity - harvester_carry_cap)
              )});

              // TODO -- have harvs make use of links and containers. prioritize empty links
              // TODO -- and limit range to 1 sq away.
              /*
              var near_links = tmpcreep.pos.findInRange(FIND_MY_STRUCTURES, {
                  filter: (s) => (
                    ( s.structureType == STRUCTURE_LINK && s.energy <= s.storeCapacity - harvester_carry_cap )
              )});
              */

              if ( near_cont != undefined ) {
                // set job dest_id to container id
                job.dest_id = near_cont.id;
                Log.debug(tmpcreep + " @ " + job.spawn_name + " container found "+ job.dest_id,'Jobber');
              }
              else {
                // no containers found? weird? unset the creep and warn.
                tmpcreep = undefined;
                Log.warn("\tJQ: creep can't find nearby container");
              }
            }
          break;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '02cc': // Deliverto - 02cc - energy to spawn or extension - deliv
            // TODO make this go to closest
            // find a creep full of the needed resource
            tmpcreep = _.find(Game.creeps, (c) =>
             ( c.memory.birthplace == job.spawn_name ) &&
             ( c.spawning != true ) &&
             ( c.carry[job.extra] > 0 ) &&
             ( c.memory.state == 'idle' ) &&
             ( c.memory.ryantest == true) &&
             ( c.memory.role == 'deliverer' )
            );
          break;
          // TODO -- find the closest job for this creep.
          // TODO -- next!!!!
          

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //      case '02cc': // Deliverto - 02cc - energy to spawn or extension - deliv
          case '02dd': // Deliverto - 02dd - energy to tower - deliv
          case '02ee': // Deliverto - 02ee - mins to storage - deliv
          case '02gg': // Deliverto - 02gg - energy to sending link - deliv
          case '02hh': // Deliverto - 02hh - mins to term - deliv
          case '02ii': // Deliverto - 02ii - energy to storage - deliv
            // find a creep full of the needed resource
            tmpcreep = _.find(Game.creeps, (c) =>
             ( c.memory.birthplace == job.spawn_name ) &&
             ( c.spawning != true ) &&
             ( c.carry[job.extra] > 0 ) &&
             ( c.memory.state == 'idle' ) &&
             ( c.memory.ryantest == true) &&
             ( c.memory.role == 'deliverer' )
            );
            // TODO -- find the closest job for this creep.


          break;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '02ff': // Deliverto - 02ff - energy to controller - upgrader
            // find a creep full of the needed resource
            tmpcreep = _.find(Game.creeps, (c) =>
             ( c.memory.birthplace == job.spawn_name ) &&
             ( c.spawning != true ) &&
             ( c.carry[job.extra] > 0 ) &&
             ( c.memory.state == 'idle' ) &&
             ( c.memory.ryantest == true) &&
             ( c.memory.role == 'upgrader' )
            );
          break;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        } // END switch block

        // if we found a creep
        if ( tmpcreep != undefined ) {
          Log.debug("\tJQ: " + tmpcreep + " @ " + job.spawn_name + " assgn to "+ job.id,'Jobber');
          // assign the job to the creep
          tmpcreep.memory.job = job.id;
          // mark the job as assigned
          job.state = 'assigned';
          // mark the creep as working
          tmpcreep.memory.state = 'assigned';
          // assign the creep to the job
          job.assigned_creep = tmpcreep.id;
        }
        else {
          // if not
          //Log.debug("\tJQ: " + tmpcreep + " @ " + job.spawn_name + " J_id:" + job.id + " failed to assign",'Jobber');
        }
        // clear the creep
        tmpcreep = undefined;

      } // END spawn_name check
    } // END job assignment loop

  } // END function
}; // END moduele.export
