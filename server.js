const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
// Config
const config = require('./server/config');

mongoose.Promise = require('bluebird');

mongoose.connect(config.MONGO_URI, { useMongoClient: true });
const monDb = mongoose.connection;


monDb.on('error', function () {
  console.error('MongoDB Connection Error. Please make sure that', config.MONGO_URI, 'is running.');
});

monDb.once('open', function callback () {
   console.info('Connected to MongoDB:', config.MONGO_URI);
});


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());


const port = process.env.PORT || '8083';
app.set('port', port);

// Serve static silent.html file at /silent
app.use('/silent', express.static(path.join(__dirname, './silent.html')));


// Set static path to Angualar App in dist
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
    app.use('/', express.static(path.join(__dirname, './dist')));
}

require('./server/api') (app, config);

// Pass routing to Angular app
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
  app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}

app.listen(port, () => console.log(`Server running on localhost:${port}`));
