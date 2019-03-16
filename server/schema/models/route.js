/* 

object format

route {
    startLocation: location,
    endLocation location,
    currentTime: hh:mm,
    durations: [times hh:mm]

}

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    origin: String,
    destination: String,
    times: [{type: Object}]
})

module.exports = mongoose.model("Route", routeSchema);