
const auth = require('./auth');
const authenticate = require('../../middleware/getProfile');
const CONST = require('../../common/const');

const MODULE = 'auth';
module.exports = (app) => {
    app.post(`/${CONST.API}/${MODULE}/authenticate`, auth.authenticateUser);
}
