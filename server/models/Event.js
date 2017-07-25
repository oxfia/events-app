const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const eventSchema = new Schema({
   title: { type: String, required: true },
   location: { type: String, required: true },
   startDateTime: { type: Date, required: true },
   endDateTime: { type: Date, required: true },
   description: String,
   viewPublic: { type: Boolean, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
