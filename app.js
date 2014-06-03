var express = require('express');
var app = express();
require('./config/globals')(app);
require('./config/express')(app);

var mongoose = require('mongoose');
var models   = require('./models');
var client   = mongoose.connect(app.get('mongo'), { server: { poolSize: 5 }})

require('./config/routes')(app)

// Start the app...
app.listen(app.get('port'), function() {
    console.info('Listening on port %d', app.get('port'));
});