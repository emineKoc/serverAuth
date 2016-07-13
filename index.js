const express = require('express');
const app = express();
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');
// App Set Up
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app)

// Server Set Up
const port = process.env.PORT || 3050;
const server = http.createServer(app)
server.listen(port)
