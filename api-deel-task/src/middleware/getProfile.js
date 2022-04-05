const util = require("../common/util");
const getProfile = async (req, res, next) => {
    const {Profile} = req.app.get('models');
    const profile = await Profile.findOne({where: {id: req.query.profile_id || 0}});
    if(profile){
        req.profile = {...profile.dataValues};
    }else{
        return util.badRequest(res, 'Unauthorized',401);
    }
    next();
}
module.exports = {getProfile};
