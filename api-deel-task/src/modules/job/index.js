
const job = require('./job');
const authenticate = require('../../middleware/getProfile');
const CONST = require('../../common/const');

const MODULE = 'jobs';
module.exports = (app) => {
    app.get(`/${CONST.API}/${MODULE}/unpaid`, authenticate.getProfile, job.getUnpaidJobs);
    app.post(`/${CONST.API}/${MODULE}/:job_id/pay`, authenticate.getProfile, job.payJob);
}
