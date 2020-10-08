/* import lib */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const morgan = require('morgan');

/* import routes */
const ouvragesRoutes = require("./routes/ouvrage");


/* import config */
const response = require("./configurations/responsesTempalte");
const configMongo = require('./configurations/mognodb');

/* Connect to BDD */
mongoose.connect(configMongo.mongoUri, configMongo.option);


/* allow access to /uploads route */
//app.use('/uploads', express.static("uploads"))

/* use body-parser*/
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


/* use morgan*/
app.use(morgan("dev"));

/* allow access to /uploads route */
app.use('/uploads', express.static("uploads"))


app.use('/api/ouvrage', ouvragesRoutes); // url : /ouvrages-list

/* catch unfound routes */
app.use((req, res, next) => {
    const error = new Error("Page not found");
    next(error);
});

/* respons errors */
app.use((error, req, res, next) => {
    response(res, 500, false, error.message)
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    return next();
});

module.exports = app;
