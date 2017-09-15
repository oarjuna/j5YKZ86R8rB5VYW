module.exports = {
	run: function(Hive) {
		// creep states - source_bound / dest_bound / working / idle
		// job object prototype - type, priority, state, body_type, dest_id, tick_issued, tick_complete

		//Fillfrom -- 01aa - source - harv          // 01bb - container - deliv     // 01cc - storage - deliv/upgraders
		//Fillfrom -- 01dd - rec link - upgraders   // 01ee - ground - builder
		//Delivto  -- 02aa - closest cont - harv    // 02bb - send links - harv     // 02cc - spawn - deliv
		//Delivto  -- 02dd - tower - deliv          // 02ee - storage - deliv       // 02ff - controller - upgrader
		//Work     -- 03aa - contruct - builder     // 03bb - repair - builder

    // idea - move to spawn for recyling when close to death

		var assigned_job = creep.memory.job;

		if ( assigned_job != 'undefined') {
			// set state to working
			creep.memory.state = 'working';
			// receive orders
			var job = Hive.memory.job_queue[assigned_job]; // this will not work without uuid // TODO
			var type = job.type;
			var type2 = type.slice(0,2);
			var type3 = type.slice(2);

			// get the dest_id and object
			var dest_id = job.dest_id;
			var dest_obj =Game.getObjectById(dest_id);

			console.log("GEN: " + type + " " + type2 + " " + type3 + " " + dest_id);
		}
		else {
			creep.memory.state = 'idle';
		}

		// TODO
		// if the creep is about to die or is taking damage, it should abandon its job.
		// TTL
		// hits

		// if the dest_obj in range
		if(creep.pos.isNearTo(dest_obj)) { 	// harvest/transfer/withdraw/upgrade/repair dest_id

			if ( type2 == '01' ) { // FILL up
				if ( type3 == 'aa') { // from source == harvest
					creep.harvest(dest_obj);
				}
				else if ( type3 == 'ff') {
					creep.withdraw(dest_obj, job.extra); // from the dest_id
					// if container, update dest_obj.memory.working_var with amount withdrawn
					//if ( dest_obj.structureType == STRUCTURE_CONTAINER ) { dest_obj.memory.working_var -= creep.carryCapacity; }
				}
				else { // everything else uses transfer
					creep.withdraw(dest_obj, RESOURCE_ENERGY); // from the dest_id
					// if container, update dest_obj.memory.working_var with amount withdrawn
					if ( dest_obj.structureType == STRUCTURE_CONTAINER ) { dest_obj.memory.working_var -= creep.carryCapacity; }
				}
				// creep energy is full
				if ( _.sum(creep.carry); == creep.carryCapacity ) { var complete = true; }
			}

			else if ( type2 == '02') { // DELIV
				if ( type3 == 'ff') { // to controller == upgrade
					creep.upgrade(dest_obj);
				}

				else if ( type3 == 'hh') { // min to storage // deliver
					creep.transfer(dest_obj, job.extra ); // from the creep
					// if container, update dest_obj.memory.working_var with amount transfered
					//if ( dest_obj.structureType == STRUCTURE_CONTAINER ) { dest_obj.memory.working_var += creep.carryCapacity; }
				}

				else { // everything else uses transfer
					creep.transfer(dest_obj, RESOURCE_ENERGY); // from the creep
					// if container, update dest_obj.memory.working_var with amount transfered
					if ( dest_obj.structureType == STRUCTURE_CONTAINER ) { dest_obj.memory.working_var += creep.carryCapacity; }
				}
				// if creep energy is 0
				if ( _.sum(creep.carry); == 0 ) { var complete = true; }
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
			}

			if ( complete == true ) {
				// set creep state to idle
				creep.memory.state = 'idle';
				// mark job as complete in job_queue
				job.state = 'complete';
				// set jobs tick_complete
				job.tick_complete = Game.time;
				// null out this creep's job memory
				creep.memory.job = undefined;
			}
		} // END is near to destination
		else {
			// else move towards dest_id
			creep.moveTo(dest_obj);
		} // END move

	} // END FUNCTION
}; // END MODULE
