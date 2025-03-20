const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = app;
