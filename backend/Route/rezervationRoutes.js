const express = require('express');
const router = express.Router();
const {
    createRezervation,
    getAllRezervations,
    getRezervationById,
    updateRezervation,
    deleteRezervation
} = require('../Controller/rezervationController');

// Rezervasyon rotaları
router.post('/', createRezervation);
router.get('/', getAllRezervations);
router.get('/:id', getRezervationById);
router.put('/:id', updateRezervation);
router.delete('/:id', deleteRezervation);

module.exports = router;
