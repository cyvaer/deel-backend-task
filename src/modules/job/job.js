
const getUnpaidJobs = async (req, res) => {
    try {
        console.log('getUnpaidJobs works');
        res.send().status(200);
    } catch (exception) {
        log.error(message);
        res.status(status).json({ error: true, message });
    }
}

const payJob = async (req, res) => {
    try {
        res.send().status(200);
    } catch (exception) {
        log.error(message);
        res.status(status).json({ error: true, message });
    }
}

module.exports = {
    getUnpaidJobs,
    payJob
}
