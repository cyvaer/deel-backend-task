
const admin = require('./admin');
const authenticate = require('../auth/authenticate');

const MODULE = 'admin';
module.exports = (app) => {
    app.get(`/${CONST.API}/${MODULE}/best-profession?start=&end=`, authenticate.isAuthenticated, admin.getBestProfession);
    app.get(`/${CONST.API}/${MODULE}/best-clients?start=&end=&limit=`, authenticate.isAuthenticated, admin.getBestClients);
}
