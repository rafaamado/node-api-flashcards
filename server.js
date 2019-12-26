require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();
app.use(express.json());

const {user, password, db, server} =  process.env;
const connectionString = `mongodb+srv://${user}:${password}@${server}/${db}`;

// Initializing database
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true} );

// Register models
requireDir('./src/models');

// API Routes
app.use('/api', require("./src/routes"));

app.listen(3001);
