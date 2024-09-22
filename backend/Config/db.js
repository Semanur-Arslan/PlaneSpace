//MongoDb bağlantısını yaptım.
const mongoose = require('mongoose'); // Mongoose, MongoDB ile etkileşim kurmamı sağlayan kütüphane.

// Veritabanı bağlantısını asenkron olarak gerçekleştiren bir fonksiyon tanımladım.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,).then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch((err) => console.error('MongoDB bağlantı hatası:', err));
    
  } catch (err) {
    console.error(`MongoDB Bağlantı Hatası: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
