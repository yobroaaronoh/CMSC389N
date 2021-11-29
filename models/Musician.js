const mongoose = require('mongoose');

const MusicianSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    TypeOfMusic: {
        type: String,
        required: true,
    },
    PricePerHour: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('Musician', MusicianSchema);