const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const connectionString = require('./config/mongoConnection');

const app = express();
app.use(express.json());

// Initializing database
mongoose.connect(connectionString, {useNewUrlParser: true} );

// Register models
requireDir('./src/models');

// API Routes
app.use('/api', require("./src/routes"));

app.listen(3001);
