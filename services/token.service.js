const Token = require("../models/token.model");
const _ = require('lodash');
const User = require("../models/user.model");
const { generateToken } = require("../utils/ultils");
const { USER_MESSAGES, USER_MESSAGE_CODE } = require("../constants/user.constant");
const dateNow = new Date();
class tokenService {

    static async saveToken(body){
        try {
            const { id , refreshToken, expiresIn } =  body;
           return  await Token.createdOrUpdateToken({
            id,
            refreshToken: _.toString(refreshToken),
            expiresIn
            })
           
        } catch (error) {
            return {
                code: USER_MESSAGE_CODE.INTERNAL_ERROR_SERVER,
                message:USER_MESSAGES.INTERNAL_ERROR_SERVER
            }
        }
    }
    static async refreshToken(body){
        try {
            const { refreshToken: refresh }=body;
            let isExpiredToken = false;

            const refreshExist =  await Token.findRefreshToken({ refresh});
            if(!refreshExist){
                return {
                    code: USER_MESSAGE_CODE.REFRESH_TOKEN_NOT_EXIST,
                    message: USER_MESSAGES.REFRESH_TOKEN_NOT_EXIST
                }
            }
            if(_.toNumber(refreshExist.expiresIn) < dateNow.getTime()/1000)
            {
                isExpiredToken = true;
            }
            if(isExpiredToken){
                return {
                    code: USER_MESSAGE_CODE.INVALID_REFRESH_TOKEN,
                    message: USER_MESSAGES.INVALID_REFRESH_TOKEN
                }
            }
          
            if(refreshExist){
                const user = await User.findById({ id: refreshExist.userId });
                const tokens = generateToken(user);
                await tokenService.saveToken({
                    id: _.get(user,'id',null),
                    refreshToken: tokens.refreshToken,
                    expiresIn: tokens.exp
                })
                return {
                    code: USER_MESSAGE_CODE.REFRESH_TOKEN_SUCCESS,
                    message: USER_MESSAGES.REFRESH_TOKEN_SUCCESS,
                    token: tokens.token,
                    refreshToken: tokens.refreshToken
                }
            }
        
        } catch (error) {
            console.log(error);
            return {
                code: USER_MESSAGE_CODE.INTERNAL_ERROR_SERVER,
                message:USER_MESSAGES.INTERNAL_ERROR_SERVER
            }
        }
    }
}

module.exports =  tokenService;

