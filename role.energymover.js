module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
		creep.say("^^");
		// move to destinaton 
		var dest_id = creep.memory.destid;
		var dest = Game.getObjectById(dest_id);
		var status = creep.moveTo(dest.pos);
		if ( status != 0 ) { 
			status = creep.moveTo(dest.pos);
			//console.log(creep + " move status: " + status);
		}
		else {
			// find nearby link
			var closelink = creep.pos.findInRange(FIND_MY_STRUCTURES, 2, 
					{filter: {
						structureType: STRUCTURE_LINK
					}})[0];
	
			// find the far away link
			var farlink = creep.pos.findInRange(FIND_MY_STRUCTURES, 999,
                                	{filter: {
                                        	structureType: STRUCTURE_LINK
                                	}})[1];
	
	
			// find nearby xfer destinations ( controller. storage, other?)
                	var storage = creep.pos.findInRange(FIND_MY_STRUCTURES, 5,
                                	{filter: {
                                        	structureType: STRUCTURE_STORAGE 
                                	}})[0];
		
	               	var controller = creep.pos.findInRange(FIND_MY_STRUCTURES, 5,
                                	{filter: {
                                        	structureType: STRUCTURE_CONTROLLER
                                	}})[0];
	
			//console.log(creep + " CL: " + closelink + " FL: " + farlink + 
			//	" ST: " + storage + " CT: " + controller);
	
			if ( controller != undefined ) {
				// load up on energy
				status = creep.withdraw(closelink, RESOURCE_ENERGY);
                		//console.log(creep + " mover load: " + closelink + " status: " + status);
				// upgrade the controller
				status = creep.upgradeController(controller)
                		//console.log(creep + " mover xfer: " + closelink + " ct: "
				 	//+ controller + " status: " + status);
			}		
			else if ( storage != undefined ) { 
				// load up on energy
				creep.withdraw(closelink, RESOURCE_ENERGY, '10');
				creep.transfer(storage, RESOURCE_ENERGY,);
				//status = creep.withdraw(storage, RESOURCE_ENERGY);
				// xfer energy to the link
				//status2 = creep.transfer(closelink, RESOURCE_ENERGY);
				// xfer to the far link
				//status = closelink.transferEnergy(farlink);
				//console.log(creep + " link xferstatus: " + status );
			}
		}
    	}
};
