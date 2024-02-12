const apiError = require('../error/ApiError')

class TwitterController{

    tweet(req,res,next){
        const {msg} = req.body;

        if(!msg){
            next(apiError.badRequest('mesaga field is requre '))
          
            return;
        }

        res.sendStatus(201);
    }

}

modele.exports = new TwitterController();