//console.log('hola mundo');
const express = require('express');
const { errorLogs, handlerError } = require('./middleware/error.handler');
const apiRouter = require('./server');
const cors = require('cors');   
const app = express();
const port = 3000;

app.use(cors());    
app.use(express.json());

app.get('/', (req, res) => {
    //la req es la request, la peticion
    //la res seria la respuesta
    res.send('Hola mundo desde Express');
});

apiRouter(app);

app.use(errorLogs);
app.use(handlerError);

app.get('/help', (req, res) => {
    res.status(200).send('Ayuda desde Express');
});

app.get('/products', (req, res) => {
    res.json({
        'name': 'teclado',
        'price': 20,
        'category': 'tech'
    });
});

app.listen(port, (req, res) => {
    console.log(`Example app listening on port ${port}`);
});