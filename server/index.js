//@ts-check
const express = require('express');
const PORT = 3001;
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Using morgan middleware in 'dev' mode for logging
app.use(morgan('dev'));

// Setting up CORS to accept requests from specified origin (localhost:3000)

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Connecting to MongoDB using mongoose

mongoose.connect('mongodb://127.0.0.1:27017/todo')  .then(() => {
  console.log('FINE');
})
.catch(() => {
  console.log("BAD");
});
// Setting up mongoose connection and event handlers

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting with mongodb database:'));

db.once('open', function() {
  console.log('connected to mongodb database');
});    

db.on('disconnected', function () {
   //Reconnect on timeout
   mongoose.connect('mongodb://localhost:27017/todo');
   db = mongoose.connection;
});

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// Importing route handlers

const auth = require('./routes/auth.route');
const todo = require('./routes/todo.route');

// Using body-parser middleware to parse JSON and URL-encoded data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Setting up routes with middleware

app.use('/auth', auth.router);
app.use('/todo', auth.checkAuthentication, todo.router); // TODO: auth

// Middleware for handling not found (404) errors

app.use((req, res, next) => {
  var err = new Error('Route not found');
  const error = {
    error: err,
    status: 404
  }
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  const error = err.error ? err.error : err;
  const status = err.status ? err.status : 500;
  
  if (error === 'NOT_AUTHORIZED' || status === 401) {
    res.status(401);
    res.end();
    return;
  }
  res.status(status || 500);
  res.json({error});
  res.end();
});

// Starting the server on the specified PORT

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));

module.exports = app;
