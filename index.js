const express = require('express');
const app = express();
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');

// DB Set Up
mongoose.connect('mongodb://localhost:backendauth/backendauth')

// App Set Up
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app)

// Server Set Up
const port = process.env.PORT || 3050;
const server = http.createServer(app)
server.listen(port)
