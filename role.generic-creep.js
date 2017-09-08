module.exports = {
	run: function(Hive) {
		// creep states - source_bound / dest_bound / working / idle

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

		// job object prototype - type, priority, state, body_type, dest_id, tick_issued

    // receive orders
		var assigned_job = creep.memory.job;
		if ( assinged_job != 'undefined') { creep.memory.state = working; }
		

		// if the job is not complete -- TODO
		var job = Hive.memory.job_queue(assigned_job);
		var type1 = job.type;
		var type2 = job.type.slice(0,2);
		var type3 = job.type.slice(2);

		// get the dest_id and object
		var dest_id = job.dest_id;
		var dest_obj =Game.getObjectById(dest_id);

		console.log("GEN: " + type1 + " " + type2 + " " + type3 + " " + dest_id);

		// if the dest_obj in range
		if(creep.pos.isNearTo(dest_obj)) {
			// harvest/transfer from/transfer to/upgrade/repair to dest_id until energy is empty or full or build/repair is complete.\
			// update container.memory.working_var with amount withdrawn or transfered

			if ( type2 == '01' ) { // FILL up
				if ( type3 == 'aa') { // from source == harvest
					creep.harvest(dest_obj);
				}
				else { // everything else uses transfer
					creep.withdraw(dest_obj, RESOURCE_ENERGY); // from the dest_id
				}
			}

			else if ( type2 == '02') { // DELIV
				if ( type3 == 'ff') { // to controller == upgrade
					creep.upgrade(dest_obj);
				}
				else { // everything else uses transfer
					creep.transfer(dest_obj, RESOURCE_ENERGY); // from the creep
				}
			}

			else if ( type2 == '03 ') { // BUILD/REPAIR
				if ( type3 == 'aa') { // build
					creep.build(dest_obj);
				}
				else { // repair
					creep.repair(dest_obj);
				}
			}

			// check for job status. Is it complete?
				// set creep state to idle
				// mark cjob as complte

		}
		else {
			// else move towards dest_id
			creep.moveTo(dest_id);
		}


  }
};
