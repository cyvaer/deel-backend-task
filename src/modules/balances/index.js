
const balance = require('./balance');
const authenticate = require('../auth/authenticate');

const MODULE = 'balances';
module.exports = (app) => {
    app.post(`/${CONST.API}/${MODULE}/deposit/:userId`, authenticate.isAuthenticated, balance.depositToClientAccount);
}
