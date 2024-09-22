const Rezervation = require('../Models/reservation'); 

// Rezervasyon ekleme
const createRezervation = async (req, res) => {
    try {
        const rezervation = new Rezervation(req.body);
        await rezervation.save();
        res.status(201).json({ message: 'Reservation saved successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Tüm rezervasyonları alma
const getAllRezervations = async (req, res) => {
    try {
        const rezervations = await Rezervation.find();
        res.json(rezervations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tek rezervasyonu alma
const getRezervationById = async (req, res) => {
    try {
        const rezervation = await Rezervation.findById(req.params.id);
        if (!rezervation) return res.status(404).json({ message: 'Reservation not found' });
        res.json(rezervation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Rezervasyonu güncelleme
const updateRezervation = async (req, res) => {
    try {
        const rezervation = await Rezervation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rezervation) return res.status(404).json({ message: 'Reservation not found' });
        res.json(rezervation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Rezervasyonu silme
const deleteRezervation = async (req, res) => {
    try {
        const rezervation = await Rezervation.findByIdAndDelete(req.params.id);
        if (!rezervation) return res.status(404).json({ message: 'Reservation not found' });
        res.json({ message: 'Reservation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRezervation,
    getAllRezervations,
    getRezervationById,
    updateRezervation,
    deleteRezervation
};
