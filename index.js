import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/crudRoutes';
import dotenv from "dotenv";

dotenv.config();

const cors = require('cors');

const app = express(); // tworzymy aplikację i uruchamiamy serwer express
const PORT = 3000;

app.use(cors({
    origin: 'https://project-data-managment-crud-app.netlify.app', // Twoja aplikacja na Netlify
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));


mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Połączono z MongoDB"))
    .catch((err) => console.error("❌ Błąd połączenia z MongoDB:", err));

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
