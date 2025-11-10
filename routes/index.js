import {Router} from 'express';
let router = Router();


router.get('/',function(req,res,next){
     res.status(200).json({
        "hello": 'Hello World!' 
    });

});

export default router;