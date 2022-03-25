
const contract = require('./contract');
const authenticate = require('../../middleware/getProfile');
const CONST = require('../../common/const');

const MODULE = 'contracts';
module.exports = (app) => {
    app.get(`/${CONST.API}/${MODULE}/:id`, authenticate.getProfile, contract.getContractById);
    app.get(`/${CONST.API}/${MODULE}`, authenticate.getProfile, contract.getAllUserRelatedContracts);
}



