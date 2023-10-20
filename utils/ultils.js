const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
module.exports = {

    generateToken: (payload)=>{
        const token = jwt.sign({...payload},process.env.SECRETKEY, {
            expiresIn: process.env.EXPIRED_TOKEN
        })
        const refresh = jwt.sign({...payload},process.env.SECRETKEY, {
            expiresIn: process.env.EXPIRED_REFRESHTOKEN
        })
        const exp = _.get(jwt.verify(refresh,process.env.SECRETKEY),'exp',null);
       
        return { token, refreshToken: refresh,exp}

    },
    hash: async(payload)=>{
        console.log({payload});
        const saltRounds =  10;
        return await bcrypt.hash(payload,saltRounds);
    },
    compare: async(payload, hash)=>{
        return await bcrypt.compare(payload,hash);
    }
}