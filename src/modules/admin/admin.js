


const getBestProfession = async (req, res) => {
    try {
        res.status(200).json(data);
    } catch (exception) {
        log.error(message);
        res.status(status).json({ error: true, message });
    }
}


const getBestClients = async (req, res) => {
    try {
        res.status(200).json(data);
    } catch (exception) {
        log.error(message);
        res.status(status).json({ error: true, message });
    }
}


module.exports = {
    getBestProfession,
    getBestClients,
}
