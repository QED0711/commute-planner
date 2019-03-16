const googleMapsClient = require('@google/maps').createClient({
	key : "AIzaSyCcVjp8hhEkBMPaZeZV_FokWxM8W3aJXUc"
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
		googleMapsClient.distanceMatrix(this, (err, response) => {
			if(err){
				console.log(err)
			} else {
				console.log(response)
			}
			
		});
	}

}

module.exports = CommuteQuery