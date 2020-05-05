const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Passport Config
require('./config/passport.local')(passport);

// DB Config
var db;
if (process.env.NODE_ENV === 'production') {
  console.log(process.env.mongoURI);
  console.log(process.env);
  db = process.env.mongoURI;
} else {
  db = require('./config/keys').mongoURI;
}
console.log(db);

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch((err) => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
const usersRouter = require('./routes/Users');
app.use('/users', usersRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
