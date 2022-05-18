const util = require("../../common/util");
const jwt = require("jsonwebtoken");
const config = require('../../common/config');
const { Op } = require("sequelize");

const authenticateUser = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const {Profile} = req.app.get('models');
        const profile = await Profile.findOne({
            attributes: {exclude: ['password']},
            where: {
                [Op.and]: [{email: email}, {password: password}]
        }});


        if(profile){
            req.profile = {...profile.dataValues};
            const token = generateToken(email, password);
            res.status(200).json({
                idToken: token,
                expiresIn: config.AUTH.SUPERSECRETREFRESHTIME
            });
        }else{
            return util.badRequest(res, 'Unauthorized',401);
        }


    } catch (exception) {
        util.errorResponse(res, exception.message);
    }
}

const generateToken = (email,type) => {
    const authToken = {};
    const jwt = require('jsonwebtoken');
    const payload = {
        email: email,
        type: type
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

module.exports = {
    authenticateUser
}
