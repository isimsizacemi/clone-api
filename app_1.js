app.use('/hata', (req, res, next) => {
    console.log('Hatadayım')
    try {
      throw new Error('hi')
    } catch (error) {
      req.errors.push({
        timestamp: new Date().toString(),
        message: error || 'Internal Server Error',
        code: 5000,
      });
      errorLog(error);
    }
  
    try {
      throw new Error('hi--2')
    } catch (error) {
      req.errors.push({
        timestamp: new Date().toString(),
        message: error.message || 'Internal Server Error',
        code: 5000,
      });
      errorLog(error);
    }
  
    // ... add more errors as needed
  
    next();
  });

















  -


  app.use('/hata', (req, res, next) => {
    console.log('-------------------------');
    console.log('Hatadayım');
    console.log('------');
    try {
      throw new Error('hi');
    } catch (error) {
      req.errors = req.errors || []; // req.errors'ı initialize et
      req.errors.push({
        timestamp: new Date().toString(),
        message: error.message || 'Internal Server Error',
        code: 5000,
      });
      errorLog(error);
    }
  
    try {
      throw new Error('hi--2');
    } catch (error) {
      req.errors = req.errors || []; // req.errors'ı initialize et
      req.errors.push({
        timestamp: new Date().toString(),
        message: error.message || 'Internal Server Error',
        code: 5000,
      });
      errorLog(error);
    }
  
    // ... add more errors as needed
  
    next();
  });











  --------------



  // app.use((err, req, res, next) => {
//   console.log('HATA YAKALANDI');
//   console.error(err.stack);
  
//   const errorObject = {
//     timestamp: new Date().toString(),
//     message: err.message || 'Internal Server Error',
//     code: 5000,
//     json: req.url === '/get-json' ? { "example": "data" } : null // Hata rotası "/get-json" ise, JSON verisini ekleyin, değilse null olarak bırakın
//   };

//   req.errors = req.errors || [];
//   req.errors.push(errorObject);

//   fs.appendFile(req.errorLogFileName, JSON.stringify(req.errors, null, 2) + '\n\n--------------------', (writeErr) => {
//     if (writeErr) {
//       console.error('Dosya yazma hatası:', writeErr);
//     }
//   });

//   errorLog(err);

//   res.status(500).send(/* Hata yanıtı HTML'iniz */);
// });










-




// app.all('*' , (req,res,next) => {
//    console.log('adasdasd')
//    // res.status(400).json({
//    //   status : 'fail',
//    //   message : req.originalUrl
//    // })

//    const err = new Error(`hata ${req.originalUrl}`);
//    err.status = 'fail';
//    err.statusCode = 404;
//     next(err)
//  })

