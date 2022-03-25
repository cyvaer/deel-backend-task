
const job = require('./job');
const authenticate = require('../auth/authenticate');

const MODULE = 'job';
module.exports = (app) => {
    app.get(`/${CONST.API}/${MODULE}/unpaid`, authenticate.isAuthenticated, job.getUnpaidJobs);
    app.post(`/${CONST.API}/${MODULE}s/:job_id/pay`, authenticate.isAuthenticated, job.payJob);
}
