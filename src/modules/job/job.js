
const getUnpaidJobs = async (req, res) => {
    try {
        res.status(200).json(data);
    } catch (exception) {
        log.error(message);
        res.status(status).json({ error: true, message });
    }
}

const payJob = async (req, res) => {
    try {
        res.status(200).json(data);
    } catch (exception) {
        log.error(message);
        res.status(status).json({ error: true, message });
    }
}

module.exports = {
    getUnpaidJobs,
    payJob
}
