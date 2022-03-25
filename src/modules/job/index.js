
const job = require('./job');
const authenticate = require('../../middleware/getProfile');
const CONST = require('../../common/const');

const MODULE = 'job';
module.exports = (app) => {
    app.get(`/${CONST.API}/${MODULE}/unpaid`, job.getUnpaidJobs);
    app.post(`/${CONST.API}/${MODULE}s/:job_id/pay`, authenticate.getProfile, job.payJob);
}
