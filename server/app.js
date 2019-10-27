// import libraries
// path is a built-in node library to handle file system paths
const path = require('path');
// express is a popular Model-View-Controller framework for Node
const express = require('express');
// compression library to gzip responses for smaller/faster transfer
const compression = require('compression');
// favicon library to handle favicon requests
const favicon = require('serve-favicon');
// Library to parse cookies from the requests
const cookieParser = require('cookie-parser');
// library to handle POST requests any information sent in an HTTP body
const bodyParser = require('body-parser');
// Mongoose is one of the most popular MongoDB libraries for node
const mongoose = require('mongoose');
// express handlebars is an express plugin for handlebars templating
const expressHandlebars = require('express-handlebars');
const session = require('express-session');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


// MONGODB address to connect to.
// process.env.MONGOLAB_URI is the variable automatically put into your
// node application by Heroku if you are using mongoLab
// otherwise fallback to localhost.
// The string after mongodb://localhost is the database name. It can be anything you want.
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/Domomaker';


// Newer versions of Mongoose have moved away from soon-to-be-deprecated
// MongoDB functionality. These changes are 'opt in', so we will opt in
// to them.
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// call mongoose's connect function and pass in the url.
// If there are any errors connecting, we will throw it and kill the server.
// Once connected, the mongoose package will stay connected for every file
// that requires it in this project
mongoose.connect(dbURL, mongooseOptions, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});
const router = require('./router.js');
const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  secret: 'Domo Arigato',
  resave: true,
  saveUninitialized: true,
}));
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());

router(app);

app.listen(port, (err) => {
    // if the app fails, throw the err
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});

