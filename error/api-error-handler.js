const ApiError = require('./ApiError')


function apiErrorHandler(err,req,res,next){
    
    console.error(err);

    if(err instanceof ApiError){
        res.staus(err.code).json(err.message);
        return;
    }


    res.status(500).json('sometg,nh went wrong');
}

module.exports = apiErrorHandler;

// normal bir sunucu hatası bu diyor ynai 