//Uygulamanın çalışacağı port'u belirterek sunucuyu çalıştırdım.

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
