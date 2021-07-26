require('dotenv').config();

const express = require('express');
const DbConnect = require('./database');
const router = require('./routes')
const cors = require('cors');

const app = express()
const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
const PORT = process.env.PORTn || 8080;

DbConnect();
app.use(express.json());
app.use(router)

app.get('/', (req, res) => {
    res.send('Welcome to API')
})

app.listen(PORT, () => console.log(`Listing on port ${PORT}`))