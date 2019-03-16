const API_KEY = require('./API_KEY');

const googleMapsClient = require('@google/maps').createClient({
	key: API_KEY
});

class CommuteQuery {
	constructor(origin, destination, mode = "driving"){
		this.origins = [origin];
		this.destinations = [destination]
		this.mode = mode;
		this.avoid = ["tolls"];
		this.traffic_model = "best_guess";
		this.departure_time = "now"
		console.log("CREATED")
	}

	getCommute(){
		console.log("BOOM-COMMUTE")
		return new Promise(resolve => {
			googleMapsClient.distanceMatrix(this, (err, response) => {
				if(err){
					console.log(err)
				} else {
					resolve(response)
				}
				
			});
		})
	}

}

module.exports = CommuteQuery