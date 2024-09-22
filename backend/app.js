const express = require('express');
const connectDB = require('./Config/db');
const dotenv = require('dotenv');
const cors = require('cors'); 
const rezervationRoutes = require('./Route/rezervationRoutes')

// .env dosyasını yükle
dotenv.config();

// MongoDB'ye bağlan
connectDB();

const app = express();

// CORS'u ayarla
app.use(cors()); // Tüm kaynaklar için CORS'u etkinleştir

// JSON formatını kabul et
app.use(express.json());

// Rezervasyon route'larını kullan
app.use('/api/rezervations', rezervationRoutes);


module.exports = app;
