// const environment = require('../env.json');

const encryption = {
    KEY: 'HireMeDeel@',
    SUPERSECRETTIME: 900,
    SUPERSECRETREFRESHTIME: 3600
}

module.exports = {
    AUTH: { ...encryption },
}
