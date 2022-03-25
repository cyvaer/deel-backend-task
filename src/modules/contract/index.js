
const contract = require('./contract');
const authenticate = require('../auth/authenticate');

const MODULE = 'contracts';
module.exports = (app) => {
    app.get(`/${CONST.API}/${MODULE}/:id`, authenticate.isAuthenticated, contract.getContractById);
    app.get(`/${CONST.API}/${MODULE}`, authenticate.isAuthenticated, contract.getAllUserRelatedContracts);
}



