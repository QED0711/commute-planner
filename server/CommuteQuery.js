const googleMapsClient = require('@google/maps').createClient({
	key: "AIzaSyBpnUkjHlpYmffT6Rlsx9XxdyMr9w36Ufc"
	// key : "AIzaSyCcVjp8hhEkBMPaZeZV_FokWxM8W3aJXUc"
});

class CommuteQuery {
	constructor(origin, destination, mode = "driving"){
		this.origins = [origin];
		this.destinations = [destination]
		this.mode = mode;
		this.avoid = ["tolls"];
		this.traffic_model = "best_guess";
		this.departure_time = "now"
	}

	getCommute(){
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