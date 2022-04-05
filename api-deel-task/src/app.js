const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./modules/route')(app);

module.exports = app;
