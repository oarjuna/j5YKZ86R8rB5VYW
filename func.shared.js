module.exports = function() {
	// create a new function for pickup energy 
	// pickup energy from the closest container
	Creep.prototype.pickupEnergy =
		function(foo) {
			console.log(creep + "TESTING SHARED FUNC" + foo);
		};
};
