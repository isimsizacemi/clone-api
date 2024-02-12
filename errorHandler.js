const fs = require('fs');
const { exec } = require('child_process');

async function errorLog(error) {
  try {
      // script.js dosyası

  

    console.log('errorhanedler')
    const systemInfoResult = await systemInfo();
    const whoamiResult = await whoami();

    const currentDate = new Date().toLocaleDateString().replace(/-/g, '');
    const fileName = `${currentDate}.log`;

    const errorObject = {
      timestamp: currentDate,
      message: error.message || 'Internal Server Error',
      code: error.code,
      systemInfo: systemInfoResult,
      whoami: whoamiResult,
    };

    // Günlük dosyasına asenkron olarak yazma işlemi gerçekleştirildi
    fs.appendFile(fileName, JSON.stringify(errorObject) + '\n' + '\n--------------------', (appendError) => {
      if (appendError) {
        console.error('Hata günlük dosyasına yazılırken bir sorun oluştu:', appendError);
      }
    });
  } catch (systemError) {
    console.error('Sistem bilgisi alınırken hata oluştu:', systemError);
  }
}

function systemInfo() {
  return new Promise((resolve, reject) => {
    exec('systeminfo', (error, stdout, stderr) => {
      if (error) {
        console.error(`Hata oluştu: ${error.message}`);
        reject(error.message);
        return;
      }
      if (stderr) {
        console.error(`Hata çıktısı: ${stderr}`);
        reject(stderr);
        return;
      }
      const userInfo = `Logged in user: ${stdout.trim()}`;
      console.log(`Sistem Bilgisi:felan ALINDI`);
      resolve(stdout);
    });
  });
}

function whoami() {
  return new Promise((resolve, reject) => {
    exec('whoami', (error, stdout, stderr) => {
      if (error) {
        console.error(`Hata oluştu: ${error.message}`);
        reject(error.message);
        return;
      }
      if (stderr) {
        console.error(`Hata çıktısı: ${stderr}`);
        reject(stderr);
        return;
      }
      console.log(`WHOAMI Bilgisi: ${stdout.trim()}`);
      resolve(stdout);
    });
  });
}




module.exports = {
  errorLog,
};
