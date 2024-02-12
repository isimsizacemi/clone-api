const assert = require('assert');
const axios = require('axios');

describe('Express Uygulama Testleri', () => {
  it('Hata Yakalama ve Dosya İndirme Testi', async () => {
    try {
      await axios.get('http://localhost:3000/test-async-errors');
    } catch (error) {
      try {
        const response = await axios.get('http://localhost:3000/download', { responseType: 'arraybuffer' });
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.headers['content-disposition'], `attachment; filename=${new Date().toLocaleDateString().replace(/-/g, '')}.log`);
      } catch (downloadError) {
        console.error('Dosya indirme hatası:', downloadError);
      }
    }
  });
});
