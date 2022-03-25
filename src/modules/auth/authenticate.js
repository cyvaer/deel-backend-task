const db = require('../../common/connection');
const util = require("../../common/util");
const config = require('../../common/config');
const error = require('../../common/error');
const log = require('../../common/logger');
const SQL = require('./query');
const subscription = require('./subscription');

// Get user preferences
const userPreferences = async (userId, connection) => {
    let preference = {};
    const result = await db.execute(connection, SQL.preference(userId));
    if (result && result.length > 0) {
        try {
            preference = JSON.parse(result[0].CONTENT);
        } catch (exception) {
            log.error(exception);
        }
    }
    return preference;
}

// Encrypt the given password string
const encryptPassword = (password) => {
    const crypto = require('crypto');
    const cipher = crypto.createCipher('aes192', config.AUTH.KEY);
    let encPassword = cipher.update(password, 'utf8', 'hex');
    encPassword += cipher.final('hex');
    return encPassword;
}

// Populate user, office details and send the response
const getUserDetails = (user, connection, res, dbName) => {
    const userId = user.USER_ID;
    const role = user.ROLE;
    const tokenizer = require('./tokenization');
    const response = tokenizer.generateToken(userId, role, dbName);
    let userObj = {};
    userObj.user = {
        USER_ID: user.USER_ID,
        ROLE_ID: user.ROLE_ID,
        FIRST_NAME: user.FIRST_NAME,
        MIDDLE_NAME: user.MIDDLE_NAME,
        LAST_NAME: user.LAST_NAME,
        EMAIL: user.EMAIL,
        ADDRESS: user.ADDRESS,
        CITY: user.CITY,
        COUNTRY: user.COUNTRY,
        ZIP: user.ZIP,
        ROLE: user.ROLE,
        ROLE_NAME: user.ROLE_NAME,
        PHOTO_URL: user.PHOTO_URL ? util.getThumbnailUrl(user.PHOTO_URL) : null,
        companyName: user.companyName
    };
    userObj.token = response.token;
    res.cookie('auth', response.token);
}

// Validate the request is authenticated
const isAuthenticated = async (req, res, next) => {
    /* uncomment below two lines if you want to debug service without new token */
    // req.payload = { ID: 50, DB: 'staffplan', ROLE: 'ADMIN' };
    // const connection = await db.connection(req);
    // await db.useDB(connection, req.payload.DB);
    // next();
    try {
        const token = req.headers.sessionid;
        const tokenizer = require('./tokenization');
        if (tokenizer.validateToken(token)) {
            await tokenizer.refreshToken(token, req);
            const connection = await db.connection(req);
            await db.useDB(connection, req.payload.DB);
            next();
        } else {
            log.info('Authentication failed');
            util.errorResponse(res, `Failed to authenticate token`, 401);
        }
    } catch (exception) {
        log.error(exception);
        util.errorResponse(res, `Failed to authenticate token`, 401);
    }
};

// Validates user and password details
const validateUser = (req, res) => {
    const userName = req.body.username;
    const hostname = req.body.hostname;
    subscription.getCompanyDB(userName, hostname, req).then(({ connection, dbName, companyName }) => {
        db.useDB(connection, dbName).then(() => {
            const encPassword = encryptPassword(req.body.password);
            db.execute(connection, SQL.validate(userName, encPassword)).then(user => {
                if (user && user.length) {
                    user[0].companyName = companyName;
                    getUserDetails(user[0], connection, res, dbName);
                } else {
                    log.info('Authentication Failed');
                    util.errorResponse(res, `Authentication failed`, 401);
                }
            });
        });
    }).catch(exception => {
        log.error('Subscription service failed');
        util.errorResponse(res, exception);
    });
};

// Used to validate teh reset token and it's expiry
const validateResetToken = (resetId, hostname, req, callback) => {
    const tokenizer = require('./tokenization');
    tokenizer.parseResetToken(resetId, token => {
        if (token) {
            const userName = token.userName;
            const resetId = token.resetId;
            subscription.getCompanyDB(userName, hostname, req).then(({ connection, dbName }) => {
                db.useDB(connection, dbName).then(() => {
                    db.execute(connection, SQL.getuser(userName)).then(user => {
                        if (user && user.length) {
                            const userId = user[0].USER_ID;
                            db.execute(connection, SQL.validateResetId(userId, resetId, config.RESET_EXPIRY_IN_HOUR)).then((result) => {
                                if (result && result.length > 0) {
                                    callback({ valid: true, connection, user: user[0] });
                                } else {
                                    callback({ valid: false, error: error.EC_EXPIRED });
                                }
                            })
                        } else {
                            callback({ valid: false, error: error.EC_NO_EMAIL });
                        }
                    });
                });
            });
        } else {
            callback({ valid: false, error: error.EC_NO_EMAIL });
        }
    });
}

module.exports = {
    validateUser,
    reset,
    isAuthenticated
}
