module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
	
	// attack hostile creeps
	//var target = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
	//var target = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES);
	//var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	var t_target = '57eaaea6cb1526f2740513a4';
	var target = Game.getObjectById(t_target);
		console.log(creep + " ALERT -- found hostile creep!" + target);
//console.log(creep + " ALERT -- found hostile creep!" + creep.attack(target));
	if(target) {
		console.log(creep + " ALERT -- found hostile creep!" + target);
    		if(creep.attack(target) == ERR_NOT_IN_RANGE) {
		console.log(creep + " ALERT -- move!");
        		creep.moveTo(target);
    		}
	}	

        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            console.log(creep + " -- remoteharv -- xfer complete");
            creep.memory.working = false;
	    creep.memory.destid = undefined;
        }

        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            console.log(creep + " -- remoteharv -- energy capacity full. return.");
            creep.memory.working = true;
        }

        // assigned to transfer energy to a structure
        if (creep.memory.working == true) {
            
	    var room = Game.spawns.Spawn1.room;

	    // get a list of towers that need energy
	    var t_structures = room.find(FIND_STRUCTURES, {
		        filter: (i) => i.structureType == STRUCTURE_TOWER && 
		                       i.energy < 1000
	    });
	    // take the first one off the list
	    var t_structure = t_structures[0];

	    // get a list of containers that need energy
	    var c_structures = room.find(FIND_STRUCTURES, {
		    	filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
		    		       i.store[RESOURCE_ENERGY] < 2000
	    });
	    // take the first one off the list
	    var c_structure = c_structures[0];

	    // check towers in need first
	    if (t_structure != undefined) { var structure = t_structure; }
	    // then containers
	    else if (c_structure != undefined) { var structure = c_structure; }
	    // finally the controller
	    else { var structure = Game.rooms.E58N3.controller; }

	    var action_status = creep.transfer(structure, RESOURCE_ENERGY);

	    //console.log("CT: " + structure);
	    //console.log("CT: " + action_status);

	    // if we're not close enough to xfer
            if (action_status == ERR_NOT_IN_RANGE) {
                // move towards it
		//creep.say("rh-drop");
                creep.moveTo(structure);
            }
        }
        // creep is supposed to harvest energy from source
        else {
		//creep.memory.destid = undefined;
	  	 // if you don't know where to go
	    if ( creep.memory.destid == undefined) {
		// get a list of all flags
	    	var flag_list = Game.flags;
		// a working array
	    	var flags = [];
	    	// push a list of keys onto the array
	    	for (var key in flag_list) { flags.push(key);}
	    	// get a random number 
	    	var randomnum = _.random(0,3);
	    	// pick a random key form the array of keys 
	    	rnd_key = flags[randomnum];
	    	// assign the destination name to memory
	    	creep.memory.destid = rnd_key;
		dest = rnd_key;
		
	    	console.log(creep + " -- remoteharvester -- assigned dest: " + rnd_key);
	    }
	    else {
		var dest_key = creep.memory.destid;
		if ( dest_key == 'Flag1') {  dest = Game.flags.Flag1; }
		else if ( dest_key == 'Flag2') {  dest = Game.flags.Flag2; }
		else if ( dest_key == 'Flag3') {  dest = Game.flags.Flag3; }
		else if ( dest_key == 'Flag4') {  dest = Game.flags.Flag4; }
		else if ( dest_key == 'Flag5') {  dest = Game.flags.Flag1; }
		else { dest = 'error'; }
		//
		//579faa610700be0674d30e48 - flag1
		//579faa710700be0674d30fd5 - flag2
		//579faa820700be0674d3115a - flag3
		//579faa710700be0674d30fdb - flag4
		//579faa710700be0674d30fd7 -- home1
		//579faa710700be0674d30fd8 -- home2
		//
	    	//console.log(creep + " -- remoteharvester --  newdest: " + dest);
            }

	    if (creep.memory._move == undefined ) {
		creep.moveTo(dest);
	    }

	    if (dest_key != 'Flag9') {
		// normal harvest logic
	    	if (!(creep.spawning) && creep.memory._move.room == 'E58N3' ) {
	        	// move to flag1
			//creep.say("flag");
			//console.log(creep + " -- remoteharvester -- movingto: " + dest);
	    		creep.moveTo(dest);
	    	}	
	    	else {
            		// when you get there, find closest source and harvest
            		var source = creep.pos.findClosestByPath(FIND_SOURCES);
            		// try to harvest energy, if the source is not in range
            		if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                		// move towards the source
				//creep.say("source");
                		creep.moveTo(source);
            		}
	    	}
	    }
	    else {
		// Flag1 test logic
		var flag_id = '579faa610700be0674d30e48';	
		var source = Game.getObjectById(flag_id);
		console.log(creep + " Flag1 test " + flag_id + " -- " + source);
                // try to harvest energy, if the source is not in range
 	               if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                       // move towards the source
                       creep.say("!!");
                       creep.moveTo(source);
		}
	    }

        }
    }
};
