module.exports = (app) => {
    require('./admin')(app);
    require('./balances')(app);
    require('./contract')(app);
    require('./job')(app);
    require('./auth')(app);
}
