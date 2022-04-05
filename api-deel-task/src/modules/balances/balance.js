const {sequelize} = require('../../model');
const util = require("../../common/util");

const depositToClientAccount = async (req, res) => {
    try {

        const user_profile_id = req.profile.id;

        const {Profile} = req.app.get('models');
        const {Contract} = req.app.get('models');
        const {Job} = req.app.get('models');

        const amount = req.body.amount;

        const client = await Profile.findByPk(user_profile_id);

        const max = await Profile.findAll({
            where: { id: user_profile_id, type:'client'},
            attributes: [
                [sequelize.fn('sum', sequelize.col('price')), 'max'],
            ],
            include: [{model: Contract, as: 'Client',
                       include: [{model: Job, where: {paid: null}}]
                     }]
        });

        await sequelize.transaction(async (t) => {

            maximumAmountToDeposit = max[0].dataValues.max;

            if(amount <= maximumAmountToDeposit*1.25){
                await client.increment({balance: parseInt(req.body.amount)},{transaction: t});
            }else{
                throw new Error('cannot deposit more than 25% of jobs to pay');
            }

        }).catch(err => {
            throw new Error(err.message);
        });

        await client.reload();

        util.successResponse(res, client);
    } catch (exception) {
        util.errorResponse(res, exception.message);
    }
}

module.exports = {
    depositToClientAccount
}
