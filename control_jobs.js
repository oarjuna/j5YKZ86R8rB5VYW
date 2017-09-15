module.exports = {
  run: function(spawn_num,Hive) {
    [MinHarv,MinDeli,MinUgra,MinBuil,MinClReg,MinReHa,MinClai,MinSold,MinRepa,MinSolM,MinSolR,MinSolH] =  Hive.spawn_levels[spawn_num];
    var spawn_name = Hive.spawn_names[spawn_num];

    // ----- Below here lies job control
    // container info - actual energy / working energy
    // job states - assigned / complete / abandoned / timed out
    // creep state - source_bound / dest_bound / working / idle



    // variables
    var container_energy_floor = 100;
    var container_energy_ceiling = deliver_carry_cap;
    var tower_energy_ceiling = 250;
    var link_energy_celiing = 100;
    var empty = 0;
    var deliver_carry_cap = 400;
    var harvester_carry_cap = 150;
    var job_TTL = 1000;
    var tmpcreep, min_needed;


    // when a job is completed, times out, or is abandoned, remove it from the job_queue
    // find those jobs and remove them
    var removed = _.remove(Hive.memory.job_queue, function(s) {
        return  (( Game.time - s.tick_issued ) > job_TTL || s.state == 'abandoned' || s.state == 'complete');
      });

    // do things for each removed job
    for ( let x of removed ) {
      Log.debug("JQ: " + spawn_name + " removed job " + x.id + " dest " + x.dest_id);
      // if the job was timed out or abandoned, adjust any associated containers working_count
      if (( Game.time - x.tick_issued ) > job_TTL || x.state == 'abandoned' ) {
          // get the container associated with the removed job
          let rm_container_id = x.dest_id;
          // get its object
          let rm_container_obj = Game.getObjectById(rm_container_id);
          // if the obj is a container
          if ( rm_container_obj.structureType == STRUCTURE_CONTAINER ) {
            // add deliver_carry_cap back to container working_count since the job did not complete
            var adjustmest = rm_container_obj.memory.working_count + deliver_carry_cap;
            Log.debug("\tXX: " + spawn_name + " curr: " + rm_container_obj.memory.working_count + " ++adj: " + adjustmest);
            rm_container_obj.memory.working_count = rm_container_obj.memory.working_count + deliver_carry_cap;
          }
      }
      // find any creep with this job's id still assigned and remove it from their memory.job // TODO
    }

    // now, try to assign jobs to creeps
    for ( let job of Hive.memory.job_queue) {





      // 01ee - ground - builder

      //Delivto  -- 02aa - closest cont - harv    // 02bb - send links - harv     // 02cc - spawn - deliv
      //Delivto  -- 02dd - tower - deliv          // 02ee - storage - deliv       // 02ff - controller - upgrader
      //Delivto  -- 00gg - mins to stor - deliv   // 02hh - mins to term - deliv  //

      //Work     -- 03aa - contruct - builder     // 03bb - repair - builder

      // job object prototype - spawn_name,type, priority, state, body_type, dest_id, tick_issued, tick_complete
      //    states - assigned / complete / abandoned / timed out / unasssigned

      if ( job.spawn_name == spawn_name && job.state == 'unassigned' ) {
        Log.debug("JQ: trying to assign " + job.id + " spawn " + job.spawn_name + " need " + job.body_type_req + " t: " + job.type + " d: " + job.dest_id + " x: " + job.extra);
        switch(job.type) {
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '01aa': //Fillfrom -- 01aa - resource -> harv
            // find local, empty, idle, harvester, with memory.destid = job.dest_id (this is assigned at spawn)
             tmpcreep = _.find(Game.creeps, (c) =>
              ( c.memory.birthplace == job.spawn_name ) &&
              ( _.sum(c.carry) == 0 ) &&
              ( c.memory.state == 'idle' ) &&
              ( c.memory.role == 'harvester' ) &&
              ( c.memory.ryantest == true)
            );
          break; // END 01aa
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '01dd': // Fillfrom - 01dd - rec link - upgraders
          case '01hh': // Fillfrom - 01hh - energy from storage - upgraders
          case '01ii': // Fillfrom - 01ii - energy from storage - upgraders
          case '01jj': // Fillfrom - 01jj - energy from containers - upgraders
          // local, empty, idle, upgrader
          tmpcreep = _.find(Game.creeps, (c) =>
            ( c.memory.birthplace == job.spawn_name ) &&
            ( _.sum(c.carry) == 0 ) &&
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
              ( _.sum(c.carry) == 0 ) &&
              ( c.memory.state == 'idle' ) &&
              ( c.memory.ryantest == true) &&
              ( c.memory.role == 'deliverer' )
              );
          break; // END 01ff
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////   DELIVER
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '02aa': //Delivto  -- 02aa - closest cont - harv
            // find creep per normal
            tmpcreep = _.find(Game.creeps, (c) =>
             ( c.memory.birthplace == job.spawn_name ) &&
             ( c.carry[job.extra] > 0 ) &&
             ( c.memory.state == 'idle' ) &&
             ( c.memory.ryantest == true) &&
             ( c.memory.role == 'harvester' )
            );
            if ( tmpcreep != undefined ) {
              // Find nearby containers with enough space for a full drop off
              let near_cont = tmpcreep.pos.findClosestByPath(FIND_STRUCTURES, {
                  filter: (s) => (
                    ( s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) <= s.storeCapacity - harvester_carry_cap)
              )});
              if ( near_cont != undefined ) {
                // set job dest_id to container id
                job.dest_id = near_cont.id;
                Log.debug("\tJQ: " + tmpcreep + " @ " + job.spawn_name + " container found "+ job.dest_id);
              }
              else {
                // no containers found? weird? unset the creep and warn.
                tmpcreep = undefined;
                Log.warn("\tJQ: creep can't find nearby container");
              }
            }
          break;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          case '02hh': // Deliverto - 02hh - mins to term - deliv
            // find a creep full of the needed mineral
            tmpcreep = _.find(Game.creeps, (c) =>
             ( c.memory.birthplace == job.spawn_name ) &&
             ( c.carry[job.extra] == c.carryCapacity ) &&
             ( c.memory.state == 'idle' ) &&
             ( c.memory.ryantest == true) &&
             ( c.memory.role == 'deliverer' )
            );
          break;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        } // END switch block

        // if we found a creep
        if ( tmpcreep != undefined ) {
          Log.debug("\tJQ: " + tmpcreep + " @ " + job.spawn_name + " assgn to "+ job.id);
          // assign the job to the creep
          tmpcreep.memory.job = job.id;
          // mark the job as assigned
          job.state = 'assigned';
        }
        else {
          // if not
          Log.debug("\tJQ: " + tmpcreep + " @ " + job.spawn_name + " J_id:" + job.id + " failed to assign");
        }
        // clear the creep
        tmpcreep = undefined;

      } // END spawn_name check
    } // END job assignment loop

  } // END function
}; // END moduele.export
