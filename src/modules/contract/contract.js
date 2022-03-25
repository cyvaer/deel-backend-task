
const getContractById = async (req, res) => {
    try {
        res.send().status(200);
    } catch (exception) {
        log.error(message);
        res.status(status).json({ error: true, message });
    }
}

const getAllUserRelatedContracts = async (req, res) => {
    try {
        res.send().status(200);
    } catch (exception) {
        log.error(message);
        res.status(status).json({ error: true, message });
    }
}

module.exports = {
    getContractById,
    getAllUserRelatedContracts
}
