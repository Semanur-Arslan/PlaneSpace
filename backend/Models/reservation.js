const mongoose = require('mongoose');

// Rezervasyon verilerini tanımlayan şema oluşturdum.
const rezervationSchema = new mongoose.Schema({
    actualOffBlockTime: { type: String, required: false },
    estimatedLandingTime: { type: String, required: false },
    airline: { type: String, required: false },
    flightName: { type: String, required: true },
    flightNumber: { type: String, required: true },
    terminal: { type: String, required: false },
    timeOnBelt: { type: String, required: false },
    route: { type: String, required: true },
});


// Modeli kontrol ederek tanımlıyoruz
const Rezervation = mongoose.models.Rezervation || mongoose.model('Rezervation', rezervationSchema);

module.exports = Rezervation;
