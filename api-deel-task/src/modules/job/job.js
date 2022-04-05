const { Op } = require("sequelize");
const util = require("../../common/util");
const {sequelize} = require('../../model');

const getUnpaidJobs = async (req, res) => {
    try {
        const user_profile_id = req.profile.id;

        const {Contract} = req.app.get('models');
        const {Job} = req.app.get('models');

        const unpaidJobs = await Contract.findAll(
            {where: {
                            status: 'in_progress',
                            [Op.or]: [{ContractorId: user_profile_id}, {ClientId: user_profile_id}]
                            },
                    include: [{model: Job, required: true,
                               where: {paid: { [Op.is]: null}}
                             }]
            });

        if(!unpaidJobs) return util.badRequest(res, 'Forbidden',403);

        util.successResponse(res, unpaidJobs);

    } catch (exception) {
        util.errorResponse(res, exception.message);
    }
}

const payJob = async (req, res) => {
    try {

        const user_profile_id = req.profile.id;
        const job_id = req.params.job_id;

        if(isNaN(job_id)) return util.badRequest(res, 'Bad request',400);

        const {Profile} = req.app.get('models');
        const {Contract} = req.app.get('models');
        const {Job} = req.app.get('models');

        const result = await Contract.findOne({
            where: {ClientId: user_profile_id},
            include: [
                {model: Profile, as: 'Client'},
                {model: Profile, as: 'Contractor'},
                {model: Job, where: {paid: { [Op.is]: null}, id: job_id}}
            ]
        }).catch(err=>{console.log(err)});

        if(!result){
            return util.badRequest(res, 'Job not found or already paid.',409);
        }

        const job =  result.Jobs[0];
        const client =  result.Client;
        const contractor = result.Contractor;

        await sequelize.transaction(async (t) => {

            if(client.balance<job.price){
                throw new Error('Not enough funds on client account');
            }

            await client.update({balance: client.balance - job.price},{transaction: t});
            await contractor.update({balance: contractor.balance + job.price},{transaction: t});
            await job.update({paid: true, paymentDate: Date.now()},{transaction: t});

        }).catch(err => {
            throw new Error(err.message);
        });

        util.successResponse(res, result);

    } catch (exception) {
        util.errorResponse(res, exception.message);
    }
}

module.exports = {
    getUnpaidJobs,
    payJob
}
