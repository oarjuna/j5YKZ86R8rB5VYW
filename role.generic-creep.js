module.exports = {
	run: function(creep,Hive) {

//		return;
//		var spawn_name = Hive.spawn_names[spawn_num];

		if ( creep.memory.job != undefined) {
			// set state to working
			creep.memory.state = 'working';
			// receive orders
			// find your job
			var job = _.find(Hive.memory.job_queue,  function(o) { return o.id == creep.memory.job; });

			if ( job == undefined ) {
				// something happened to my job object. start over
				creep.memory.job = undefined;
				creep.memory.state = 'idle';
				return;
			}

			// get the dest object object
			var dest_obj =Game.getObjectById(job.dest_id);

			// job specfic oddness
			// drop off at storage in rooms without storage
			if ( job.type == '02ii' && dest_obj.structureType == STRUCTURE_CONTROLLER && creep.getActiveBodyparts(WORK) ) {
				Log.warn(creep + " no storage in this room, changing to 02ff !! ",'Generic');
				job.type = '02ff';
			}

			// harvesting jobs
			if ( job.type == '01aa') {
				job.dest_id = creep.memory.destid;
				var dest_obj =Game.getObjectById(job.dest_id);
			}

			var type = job.type;
			var type2 = type.slice(0,2);
			var type3 = type.slice(2);

			if ( dest_obj == undefined ) {
				Log.warn(creep + " dest_obj undefined!" );
				creep.memory.job = undefined;
				creep.memory.state = 'idle';
				job.state = 'abandoned';
				return;
			}

			if ( creep.ticksToLive < 4 ) {
					// TODO -- they should deposit anything they are carrying
					// TODO -- and try to get to someplace to be recycled if possible.
				creep.say('\uD83D\uDC80'); // 💀
				creep.memory.job = undefined;
				creep.memory.state = 'ttdie';
				job.state = 'abandoned';
				return;
			}
		}
		else if ( creep.memory.state == 'ttdie' ) {
			creep.say('\uD83D\uDC80'); // 💀
			return;
		}
		else {
			creep.say('\uD83D\uDCA4'); // 💤
			creep.memory.state = 'idle';
			return;
		}
		// TODO
		// if the creep is taking damage, it should abandon its job.
		// idea - move to spawn for recyling when close to death


		Log.debug(creep + " job.dest_id " + job.dest_id,'Generic');
		switch (job.type) {
			case '01aa' : // Fillfrom - 01aa - resource -> harv
			saytext = '\uD83D\uDD3A\u26CF'; // 🔺⛏
			break;
			case '01dd' :// Fillfrom - 01dd - rec link - upgraders
			saytext = '\uD83D\uDD3A\u26A1\uD83D\uDCE1'; // 🔺⚡📡
			break;
			case '01hh' :// Fillfrom - 01hh - energy from storage - upgraders
			saytext = '\uD83D\uDD3A\u26A1\uD83C\uDFE7'; //  🔺⚡🏧
			break;
			case '01bb' :// Fillfrom - 01bb - energy from container -> deliv or upgrader
			saytext = '\uD83D\uDD3A\u26A1\uD83D\uDCE6'; // 🔺⚡📦
			break;
			case '01cc' :// Fillfrom - 01cc - energy from storage   -> deliv
			saytext = '\uD83D\uDD3A\u26A1\uD83C\uDFE7'; // 🔺⚡🏧
			break;
			case '01ff' :// Fillfrom - 01ff - mins from storage     -> deliv
			saytext = '\uD83D\uDD3A\uD83D\uDC8E\uD83C\uDFE7'; // 🔺💎🏧
			break;
			case '01gg' :// Fillfrom - 01gg - mins from cont       -> deliv
			saytext = '\uD83D\uDD3A\uD83D\uDC8E\uD83D\uDCE6'; // 🔺💎📦
			break;
			case '01hh' :// Fillfrom - 01hh - mins from terminal --> deliv
			saytext = '\uD83D\uDD3A\uD83D\uDC8E\uD83D\uDCDE'; // 🔺💎📞
			break;
			case '02aa' :// Deliverto - 02aa - energy or mins to closest cont or link - harv
			saytext = '\uD83D\uDD3B\uD83D\uDCE6\uD83D\uDCE1'; // 🔻📦📡
			break;
			case '02cc' :// Deliverto - 02cc - energy to spawn or extension - deliv
			saytext = '\uD83D\uDD3B\u26A1\uD83D\uDD06'; // 🔻⚡🔆
			break;
			case '02dd' :// Deliverto - 02dd - energy to tower - deliv
			saytext = '\uD83D\uDD3B\u26A1\uD83D\uDD2B'; // 🔻⚡🔫
			break;
			case '02ee' :// Deliverto - 02ee - mins to storage - deliv
			saytext = '\uD83D\uDD3B\uD83D\uDC8E\uD83C\uDFE7'; // 🔻💎🏧
			break;
			case '02ff' :// Deliverto - 02ff - energy to controller - upgrader
			saytext = '\uD83D\uDD3B\u26A1\uD83D\uDCA2'; // 🔻⚡💢
			break;
			case '02gg' :// Deliverto - 02gg - energy to sending link - deliv
			saytext = '\uD83D\uDD3B\u26A1\uD83D\uDCE1'; // 🔻⚡📡
			break;
			case '02ii' :// Deliverto - 02ii - energy to storage - deliv
			saytext = '\uD83D\uDD3B\u26A1\uD83C\uDFE7'; // 🔻⚡🏧
			break;
			case '02hh' :// Deliverto - 02hh - mins to term - deliv
			saytext = '\uD83D\uDD3B\uD83D\uDC8E\uD83D\uDCDE'; // 🔻💎📞
			break;
			case '02jj' :// Deliverto - 02jj - energy to term - deliv
			saytext = '\uD83D\uDD3B\u26A1\uD83D\uDCDE'; // 🔻⚡📞
			break;
			case '03aa' :// Construct - 03aa - build object
			saytext = '\uD83D\uDD28'; // 🔨
			break;
			case '03bb' :// Construct - 03bb - repair object
			saytext = '\uD83D\uDEE0\uFE0F'; // 🛠️
			break;
			case '04aa' :// TravelTo - 04aa - any creep, travel to destination id
			saytext = 'travel'; //
			break;
		}

		creep.say(saytext);

		// if the dest_obj in range // range is diff for controllers
		if ( dest_obj != undefined && dest_obj.structureType == STRUCTURE_CONTROLLER) { var range = 3; }
		else { var range = 1; }

		if(creep.pos.inRangeTo(dest_obj,range)) {
			if ( type2 == '01' ) { // FILL up
				if ( type3 == 'aa') { // from source == harvest
					creep.harvest(dest_obj);
					if ( _.sum(creep.carry) == creep.carryCapacity  ) { var complete = true; }
					Log.debug(creep + " harvest !",'Generic');
				}
				else { // everything else uses withdraw
					creep.withdraw(dest_obj, job.extra);
					if ( dest_obj.structureType == STRUCTURE_LINK ) {
						var res_has = dest_obj.energy;
					}
					else {
						var res_has =  dest_obj.store[job.extra]
					}
					if ( res_has == undefined ) { res_has = 0; }

					Log.debug(creep + " X "+ job.extra + " GEN: creep.carry " + _.sum(creep.carry) + "/" + creep.carryCapacity + " dest_obj has " + res_has,'Generic');
					if ( _.sum(creep.carry) == creep.carryCapacity || res_has == 0 ) { var complete = true; }
				}
			}

			else if ( type2 == '02') { // DELIV
				if ( type3 == 'ff') { // to controller == upgrade
					creep.upgradeController(dest_obj);
					if ( _.sum(creep.carry) == 0 ) {
						var complete = true;
					}
				}
				else { // everything else uses transfer
					for ( r in creep.carry ) {
						Log.debug(creep + "xfer res " + r ,'Generic');
						creep.transfer(dest_obj, r); // from the creep
					}

					if ( dest_obj.structureType == STRUCTURE_STORAGE || dest_obj.structureType == STRUCTURE_CONTAINER ) {
							var res_has =  dest_obj.store[job.extra];
							var res_max = dest_obj.storeCapacity;
					}
					else {
						var res_has = dest_obj.energy;
						var res_max = dest_obj.energyCapacity;
					}

					if ( res_has == res_max ||  _.sum(creep.carry) == 0 ) {
						var complete = true;
					}
				}
			} // END DELIV

			else if ( type2 == '03') { // BUILD/REPAIR
				if ( type3 == 'aa') { // build
					creep.build(dest_obj);
				}
				else { // repair
					creep.repair(dest_obj);
				}

				// if build is 100% complete
				if ( creep.carry[RESOURCE_ENERGY] == 0 ) { var complete = true; }

			} // END BUILD / REPAIR




			if ( complete == true ) {
				Log.debug(creep.name + "GEN: task complete -- " + job.id,'Generic')
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
			creep.travelTo(dest_obj);
		} // END move

	} // END FUNCTION
}; // END MODULE
