
const admin = require('./admin');
const authenticate = require('../../middleware/getProfile');
const CONST = require('../../common/const');

const MODULE = 'admin';
module.exports = (app) => {
    app.get(`/${CONST.API}/${MODULE}/best-profession`, authenticate.getProfile, admin.getBestProfession);
    app.get(`/${CONST.API}/${MODULE}/best-clients/`, authenticate.getProfile, admin.getBestClients);
}
