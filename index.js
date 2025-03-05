import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/crudRoutes';

const cors = require('cors');

const app = express(); // tworzymy aplikację i uruchamiamy serwer express
const PORT = 3000;
app.use(cors({ origin: 'http://localhost:5173' })); // Pozwala na żądania tylko z tego adresu


// moongose connection
//mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/CoresListDb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving static files
app.use(express.static('public'));


routes(app); //obslugujemy trasy w aplikacji

//Teraz utworzymy pierwszy endpoint

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);