import express from 'express';
import jwt from 'jsonwebtoken';
import {getAuthUser} from '../authdb.js';


var router = express.Router();

router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    let authUser = getAuthUser(username);  

    if(authUser && ( authUser.password == password)){
        const token = jwt.sign({username : username},'my_secret_key', {
            expiresIn: '2h'
        })
        return res.json({
            "username" : username,
            "access_token": token,
            "token_type" : "Bearer",
            "expires_in" : "2h"
        })
    } else {
        res.status(401).json({"error":"Login failed"})
    }
})

export default router
