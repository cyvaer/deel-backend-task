
const balance = require('./balance');
const authenticate = require('../../middleware/getProfile');
const CONST = require('../../common/const');

const MODULE = 'balances';
module.exports = (app) => {
    app.post(`/${CONST.API}/${MODULE}/deposit/:userId`, authenticate.getProfile, balance.depositToClientAccount);
}
