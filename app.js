import express from 'express';

const app = express();

import indexRoute from './routes/index.js';
import dataRoute from './routes/data.js';
import homeRoute from './routes/home.js';

app.use(express.json());


app.use('/',homeRoute);
app.use('/data',dataRoute);
app.use('/index',indexRoute);

app.listen(3000,() => {
    console.log('Listening on port 3000...')
});

export default app
