// const environment = require('../env.json');
// I should not version this file but it is left intentional for showing proposes.
const encryption = {
    KEY: 'HireMeDeel@',
    SUPERSECRETTIME: 900,
    SUPERSECRETREFRESHTIME: 3600
}

module.exports = {
    AUTH: { ...encryption },
}
