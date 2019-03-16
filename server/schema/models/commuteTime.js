/* 

object format

commuteTime {
    startLocation: location,
    endLocation location,
    currentTime: hh:mm,
    durations: [times hh:mm]

}

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commuteTimeSchema = new Schema({
    startLocation: String,
    endLocation: String,
    currentTime: Number,
    durations: [{type: Number}]
})

module.exports = mongoose.model("CommuteTime", commuteTimeSchema);