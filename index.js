// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './src/routes/crudRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------- CORS -----------------
app.use(cors({
    origin: 'https://project-data-managment-crud-app.netlify.app', // front Netlify
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // jeśli używasz cookies lub auth
}));

// ----------------- Mongoose -----------------
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Połączono z MongoDB"))
    .catch(err => console.error("❌ Błąd połączenia z MongoDB:", err));

setInterval(async () => {
    try {
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('✅ Ping MongoDB – baza nadal aktywna');
    } catch (err) {
        console.error('⚠️ Błąd podczas pingowania MongoDB:', err.message);
    }
}, 300000); // 5 minut

// ----------------- Middleware -----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ----------------- Routes -----------------
routes(app);

// Testowy endpoint CORS
app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS działa poprawnie!' });
});

// Strona główna
app.get('/', (req, res) => {
    res.send(`Node and Express server is running on port ${PORT}`);
});

// ----------------- Start serwera -----------------
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});