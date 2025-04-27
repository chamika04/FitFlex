const mongoose = require('mongoose');

const NutbookingSchema = new mongoose.Schema({
    Date: String,
    TimeSlot: String,
    Nutritioner: String,
    packageType: String,
    Status: { type: String, default: 'Pending' } // Setting default value to 'Pending'
});

const NutBooking = mongoose.model("NutBooking", NutbookingSchema);

module.exports = NutBooking;
