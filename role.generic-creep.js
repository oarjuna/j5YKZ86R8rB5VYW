module.exports = {
	run: function(Hive) {
		// creep states - source_bound / dest_bound / working / idle
		// job object prototype - type, priority, state, body_type, dest_id, tick_issued, tick_complete

		// 01 - fill - aa - source - harvesters
    // 01 - fill - bb - container - deliverers
		// 01 - fill - cc - storage - deliverers / upgraders
		// 01 - fill - dd - receiving links - upgraders
		// 01 - fill - ee - resources on the ground - builder
		// 02 - deliv - aa - closest container - harvesters
		// 02 - deliv - bb - sending links - harvesters
		// 02 - deliv - cc - spawns extensions - deliverer
		// 02 - deliv - dd - towers - deliverer
		// 02 - deliv - ee - storage - deliverer
		// 02 - deliv - ff - controller - upgrader
		// 03 - work - aa - construction site - builder
		// 03 - work - bb - repair job - builder

    // idea - move to spawn for recyling when close to death

    // receive orders
		var assigned_job = creep.memory.job;
		var job = Hive.memory.job_queue[assigned_job];
		var type = job.type;
		var type2 = type.slice(0,2);
		var type3 = type.slice(2);
		// job object prototype - type, priority, state, body_type, dest_id, tick_issued, tick_complete

		// get the dest_id and object
		var dest_id = job.dest_id;
		var dest_obj =Game.getObjectById(dest_id);

		if ( assigned_job != 'undefined') { creep.memory.state = 'working'; }
		else { creep.memory.state = 'idle'; }

		console.log("GEN: " + type1 + " " + type2 + " " + type3 + " " + dest_id);

		// if the dest_obj in range
		if(creep.pos.isNearTo(dest_obj)) { 	// harvest/transfer/withdraw/upgrade/repair dest_id

			if ( type2 == '01' ) { // FILL up
				if ( type3 == 'aa') { // from source == harvest
					creep.harvest(dest_obj);
				}
				else { // everything else uses transfer
					creep.withdraw(dest_obj, RESOURCE_ENERGY); // from the dest_id
					// if container, update dest_obj.memory.working_var with amount withdrawn
					if ( dest_obj.structureType == STRUCTURE_CONTAINER ) { dest_obj.memory.working_var -= creep.carryCapacity; }
				}
				// creep energy is full
				if ( creep.carry.energy == creep.carryCapacity ) { var complete = true; }
			}

			else if ( type2 == '02') { // DELIV
				if ( type3 == 'ff') { // to controller == upgrade
					creep.upgrade(dest_obj);
				}
				else { // everything else uses transfer
					creep.transfer(dest_obj, RESOURCE_ENERGY); // from the creep
					// if container, update dest_obj.memory.working_var with amount transfered
					if ( dest_obj.structureType == STRUCTURE_CONTAINER ) { dest_obj.memory.working_var += creep.carryCapacity; }
				}
				// if creep energy is 0
				if ( creep.carry.energy == 0 ) { var complete = true; }
			}

			else if ( type2 == '03 ') { // BUILD/REPAIR
				if ( type3 == 'aa') { // build
					creep.build(dest_obj);
				}
				else { // repair
					creep.repair(dest_obj);
				}

				// if build is 100% complete
				if ( type3 == 'aa' && ( dest_obj.progress == dest_obj.progressTotal ) ) { var complete = true; }
				// else if repair is complete
				else if ( dest_obj.hits == dest_obj.hitsMax ) { var complete = true; }

				if ( complete == true ) {
					// set creep state to idle
					creep.memory.state = 'idle';
					// mark job as complete in job_queue
					job.state = 'conplete';
					// set jobs tick_complete
					job.tick_complete = Game.time;
					// null out this creep's job memory
					creep.memory.job = undefined;
				}

			}

		}
		else {
			// else move towards dest_id
			creep.moveTo(dest_id);
		}


  }
};
