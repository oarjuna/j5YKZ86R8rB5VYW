module.exports = {
	run: function(creep,Hive) {

		//return;
		Log.debug(creep + " GEN: " + creep.memory.job + " TTL " + creep.ticksToLive);

		if ( creep.memory.job != undefined) {
			// set state to working
			creep.memory.state = 'working';
			// receive orders
			// find your job
			var job = _.find(Hive.memory.job_queue,  function(o) { return o.id == creep.memory.job; });
			console.log("GEN: " + job.id + " ttl: " + creep.ticksToLive  +  " jst: " + job.state );
			var type = job.type;
			var type2 = type.slice(0,2);
			var type3 = type.slice(2);

			// job specfic changes
			if ( job.type == '01aa') { job.dest_id = creep.memory.destid; }

			// get the dest object object
			var dest_obj =Game.getObjectById(job.dest_id);

			if ( creep.ticksToLive < 10 ) {
				creep.say('\u1F480'); // 💀
				creep.memory.job = undefined;
				creep.memory.state = 'idle';
				job.state = 'abandoned';

			}

			//console.log("GEN: " + type + " " + type2 + " " + type3 + " " +  job.dest_id);
		}
		else {
			creep.memory.state = 'idle';
			return;
		}

		// TODO
		// if the creep is about to die or is taking damage, it should abandon its job.
		// idea - move to spawn for recyling when close to death

		// TTL
		// hits

		// if the dest_obj in range
		if(creep.pos.isNearTo(dest_obj)) { 	// harvest/transfer/withdraw/upgrade/repair dest_obj

			if ( type2 == '01' ) { // FILL up
				creep.say('\u26A0.F'); // 🚚
				if ( type3 == 'aa') { // from source == harvest
					creep.harvest(dest_obj);
				}
				else { // everything else uses withdraw
					creep.withdraw(dest_obj, job.extra);
					// if container, update dest_obj.memory.working_var with amount withdrawn
					//if ( dest_obj.structureType == STRUCTURE_CONTAINER ) { dest_obj.memory.working_var -= creep.carryCapacity; }
				}
				// creep energy is full
				if ( _.sum(creep.carry) == creep.carryCapacity ) { var complete = true; }
			}

			else if ( type2 == '02') { // DELIV
				creep.say('\u26A0.D'); // 🚚

				if ( type3 == 'ff') { // to controller == upgrade
					creep.upgrade(dest_obj);
				}
				else { // everything else uses transfer
					creep.transfer(dest_obj, job.extra); // from the creep
					// if container, update dest_obj.memory.working_var with amount transfered
					//if ( dest_obj.structureType == STRUCTURE_CONTAINER ) { dest_obj.memory.working_var += creep.carryCapacity; }
				}
				// if creep energy is 0
				if ( _.sum(creep.carry) == 0 ) { var complete = true; }

			} // END DELIV

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
			} // END BUILD / REPAIR

			if ( complete == true ) {
				Log.debug(creep + "GEN: task complete -- " + job.id)
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
			// else move towards dest_obj
			creep.moveTo(dest_obj);
		} // END move

	} // END FUNCTION
}; // END MODULE
