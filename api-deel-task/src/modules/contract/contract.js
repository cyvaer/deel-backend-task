const { Op } = require("sequelize");
const util = require("../../common/util");

const getContractById = async (req, res) => {
    try {
        const user_profile_id = req.profile.id;
        const contract_id = req.params.id;

        if(isNaN(contract_id)) return util.badRequest(res, 'Bad request',400);

        const {Contract} = req.app.get('models');

        const contract = await Contract.findOne(
            {where: {
                [Op.or]: [{ContractorId: user_profile_id}, {ClientId: user_profile_id}],
                    id: req.params.id
                }});

        if(!contract) return util.badRequest(res, 'Forbidden',403);

        util.successResponse(res, contract);

    } catch (exception) {
        util.errorResponse(res, exception.message);
    }
}

const getAllProfileRelatedContracts = async (req, res) => {
    try {
        const user_profile_id = req.profile.id;

        const {Contract} = req.app.get('models');

        const contracts = await Contract.findAll(
            {where: {
                    [Op.or]: [{ContractorId: user_profile_id}, {ClientId: user_profile_id}],
                    status: {[Op.not]: 'terminated'},
                }});

        if(!contracts) return util.badRequest(res, 'Unauthorized',403);

        util.successResponse(res, contracts);

    } catch (exception) {
        util.errorResponse(res, exception.message);
    }
}

module.exports = {
    getContractById,
    getAllProfileRelatedContracts
}
