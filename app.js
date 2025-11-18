import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

import indexRoute from './routes/index.js';
import dataRoute from './routes/data.js';
import homeRoute from './routes/home.js';
import loginRoute from  './routes/login.js'
import {verifyToken} from './verifytoken.js'
import {rateLimiter} from './ratelimiter.js'

app.use(express.json());



const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/',homeRoute);
app.use('/data',verifyToken,rateLimiter,dataRoute);
app.use('/index',indexRoute);
app.use('/login',loginRoute)

app.listen(3000,() => {
    console.log('Listening on port 3000...')
});

export default app
