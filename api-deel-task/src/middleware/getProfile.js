const util = require("../common/util");
const config = require('../common/config');
const jwt = require("jsonwebtoken");


const getProfile = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    const token = req.headers.sessionid;

    return jwt.verify(JSON.parse(token).token, config.AUTH.KEY, function(err, decoded) {

        if(err){
            return util.badRequest(res, 'Unauthorized',401);
        }

        // err
        // decoded undefined
    });

    const {Profile} = req.app.get('models');
    const profile = await Profile.findOne({where: {id: req.query.profile_id || 0}});
    if(profile){
        req.profile = {...profile.dataValues};
        const token = generateToken(req.query.profile_id);
    }else{
        return util.badRequest(res, 'Unauthorized',401);
    }
    next();
}

const validateUser = (req, res) => {
    const profile_id = req.query.profile_id;
    const password = req.query.password;
};

const generateToken = (userId) => {
    const authToken = {};
    const jwt = require('jsonwebtoken');
    const payload = {
        ID: userId,
        // DB: dbName,
        // ROLE: role
    }
    const token = jwt.sign(payload, config.AUTH.KEY, {
        expiresIn: config.AUTH.SUPERSECRETTIME
    });
    const refreshToken = jwt.sign(payload, config.AUTH.KEY, {
        expiresIn: config.AUTH.SUPERSECRETREFRESHTIME
    });
    const response = { token, refreshToken };
    authToken[token] = response
    return (response);
}

module.exports = {getProfile};
