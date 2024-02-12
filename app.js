const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { errorLog } = require('./errorHandler');
const axios = require('axios');
const bodyParserErrorHandler = require('express-body-parser-error-handler'); // express-body-parser-error-handler modülünü içe aktarın

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParserErrorHandler()); // express-body-parser-error-handler modülünü kullanın

async function errorDate() {
  const currentDate = new Date().toLocaleDateString().replace(/-/g, '');
  const fileName = `${currentDate}.log`;
  return fileName;
}

app.use(async (req, res, next) => {
  try {
    const jsonData = req.body;
    if (jsonData) {
      console.log(jsonData);
    }

    req.errorLogFileName = await errorDate();
    console.log('API AYAKTA HATA YAZILACAK DOSYAYA ERİŞİYOR...');
    next();
  } catch (error) {
    console.error('Dosya adı oluşturulurken hata:', error);
    next(error);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/test-async-errors', async (req, res, next) => {
  try {
    await Promise.reject(new Error('Asenkron hata 1'));
    await Promise.reject(new Error('Asenkron hata 2'));
  } catch (error) {
    next(error);
  }
});

app.get('/indir', async (req, res) => {
  try {
    await fs.access(req.errorLogFileName);
    res.download(req.errorLogFileName, (err) => {
      if (err) {
        console.error('Dosya indirme hatası:', err);
        req.errorLogFileName = err && err.path ? err.path : req.errorLogFileName;
        res.status(500).send('Dosya indirme hatası');
      } else {
        console.log('İndirme Başarılı');
      }
    });
  } catch (error) {
    console.error('Dosya bulunamadı veya erişilemez:', error);
    res.status(500).send('Dosya indirme hatası');
  }
});

app.get('/get-json', (req, res) => {
  const jsonData = { "example": "data" }; // JSON verisini burada tanımlayın
  res.json(jsonData);
});


app.use((error, req, res, next) => {
  console.error('use dayım', error);
  errorLog(error)
  next();
});

app.listen(port, () => {
  console.log('Server http://localhost:' + port + ' adresinde çalışıyor');
});
