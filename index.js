// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
