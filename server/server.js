// import path from 'path';
// import { fileURLToPath } from 'url';

const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cakeRoutes = require('./routes/cakeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const path  = require('path');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
console.log(__dirname);

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/cakes', cakeRoutes);
app.use('/api/orders', orderRoutes);
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/build/index.html')));


// app.use(express.static('./client'))
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
