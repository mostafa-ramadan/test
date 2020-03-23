var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var ejs = require('ejs');
var app = express();
var port = 9000;
var db_url = 'mongodb://localhost:27017/diseasesDB';

// Mongoose Connect
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
    if (err)
        console.log(err);
    console.log("Connected with database");
});
// Set
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// madelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var project = require('./routes/disease.router');
app.use('/', project);

app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server Running On Port : ' + port);
});