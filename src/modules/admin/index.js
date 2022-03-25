
const admin = require('./admin');
const authenticate = require('../../middleware/getProfile');
const CONST = require('../../common/const');

const MODULE = 'admin';
module.exports = (app) => {
    app.get(`/${CONST.API}/${MODULE}/best-profession?start=&end=`, authenticate.getProfile, admin.getBestProfession);
    app.get(`/${CONST.API}/${MODULE}/best-clients?start=&end=&limit=`, authenticate.getProfile, admin.getBestClients);
    app.get(`/${CONST.API}/${MODULE}/best-clients?start=&end=&limit=`, authenticate.getProfile, admin.getBestClients);
}
