const { Op } = require("sequelize");
const {sequelize} = require('../../model');
const util = require("../../common/util");

const getBestProfession = async (req, res) => {
    try {

        const start_date = req.query.start;
        const end_date = req.query.end;

        const {Contract} = req.app.get('models');
        const {Job} = req.app.get('models');
        const {Profile} = req.app.get('models');

        const earningsByProfession = await Job.findAll({
            attributes: [sequelize.col('profession'),[sequelize.fn('sum',sequelize.col('price')),'total_earned']],
            include: [{model: Contract, required: true,
                include: [{model: Profile, as: 'Contractor', required: true}]
            }],
            group: 'profession',
            raw: true,
            where: { paid: {[Op.not]: null}, paymentDate: {[Op.between]: [start_date, end_date]}},

        }).catch((error) =>console.log('error',error));

        if(!earningsByProfession || earningsByProfession.length === 0){
            return util.successResponse(res, 'no results found', 200);
        }

        const bestProfession = earningsByProfession.reduce((prev, curr)=>{
            return prev.total_paid > curr.total_earned ? prev : curr;
        });

        util.successResponse(res, {id: bestProfession.id, profession: bestProfession.profession, total_earned: bestProfession.total_earned});

    } catch (exception) {
        util.errorResponse(res, exception.message);
    }
}


const getBestClients = async (req, res) => {
    try {

        const start_date = req.query.start;
        const end_date = req.query.end;
        const limit = req.query.limit;

        const {Contract} = req.app.get('models');
        const {Job} = req.app.get('models');
        const {Profile} = req.app.get('models');

        const result = await Job.findAll({
            attributes: [sequelize.col('Contract.Client.id'),
                         sequelize.col('firstName'),
                         sequelize.col('lastName'),
                        [sequelize.fn('sum',sequelize.col('price')),'total_paid']],
            include: [{model: Contract, required: true,
                include: [{model: Profile, as: 'Client', required: true, attributes: [['id', 'Client_id']]}]
            }],
            group: ['Contract.Client.id'],
            order: [[sequelize.fn('sum',sequelize.col('price')),'DESC']],
            raw: true,
            limit: limit,
            where: { paid: {[Op.not]: null}, paymentDate: {[Op.between]: [start_date, end_date]}},


        }).catch((error) =>console.log('error',error));

        if(!result || result.length === 0){
            return util.successResponse(res, 'no results found', 200);
        }

        util.successResponse(res, result);
    } catch (exception) {
        util.errorResponse(res, exception.message);
    }
}

module.exports = {
    getBestProfession,
    getBestClients,
}
