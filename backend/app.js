const express = require('express');
const connectDB = require('./Config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const rezervationRoutes = require('./Route/rezervationRoutes')

// .env dosyasını yüklüyoruz
dotenv.config();

// MongoDB'ye bağlanıyoruz
connectDB();

// Express uygulamasını başlatıyoruz
const app = express();

// CORS'u ayarlarını ekliyoruz
app.use(cors());

// JSON formatını kabul etmek için ekledim
app.use(express.json());

// Rezervasyon route'larını kullanmak için tanımladım
app.use('/api/rezervations', rezervationRoutes);


module.exports = app;
