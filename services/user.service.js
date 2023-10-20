const User = require("../models/user.model");
const _ = require('lodash');
const {  generateToken } = require("../utils/ultils");
const tokenService = require("./token.service");
const bcrypt =  require('bcrypt');
const { findByUserIdToken } = require("../models/token.model");
const { USER_MESSAGE_CODE, USER_MESSAGES } = require("../constants/user.constant");
class userService {
    static async signUp(body) {
        try {
            const { email, password, firstName, lastName } = body;
            const existEmail = await User.findByEmail({ email });
            if (existEmail) {
                return {
                    code: USER_MESSAGE_CODE.EMAIL_EXIST,
                    message: USER_MESSAGES.EMAIL_EXIST
                }
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.signUp({ email, hash: hashPassword, firstName, lastName });
            if (!user) {
                return {
                    code: USER_MESSAGE_CODE.REGISTER_ACCOUNT_FAILED,
                    message: USER_MESSAGES.REGISTER_ACCOUNT_FAILED
                }
            }
            const objectUser = await User.findById({ id: user[0] });
            if (!_.isEmpty(objectUser)) {
                return {
                    code: USER_MESSAGE_CODE.REGISTER_ACCOUNT_SUCCESS,
                    message: USER_MESSAGES.REGISTER_ACCOUNT_SUCCESS,
                    data: { ...objectUser, displayName: _.get(objectUser, 'firstName', '').concat(' ', _.get(objectUser, 'lastName', '')) }
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
    static async signIn(body) {
        try {
            const { email, password } = body;
            const user = await User.findByEmail({ email });
            if (!user) {
                return {
                    code: USER_MESSAGE_CODE.EMAIL_NOT_EXIST,
                    message: USER_MESSAGES.EMAIL_NOT_EXIST
                }
            }
            const isMatch = await bcrypt.compare(password, user.hash);
            if (!isMatch) {
                return {
                    code: USER_MESSAGE_CODE.LOGIN_FAILED,
                    message: USER_MESSAGES.LOGIN_FAILED
                }
            }
            const objectUser =  await User.findById({id: _.get(user,'id',null)});
            const tokens = generateToken(objectUser);
            await tokenService.saveToken({ id: objectUser.id, refreshToken: tokens.refreshToken, expiresIn: _.toString(tokens.exp) })
            if(objectUser){
                return {
                    code: USER_MESSAGE_CODE.LOGIN_SUCCESS,
                    message: USER_MESSAGES.LOGIN_SUCCESS,
                    data: {
                        user: {..._.pick(objectUser,['firstName','lastName','email']), displayName: _.get(objectUser, 'firstName', '').concat(' ', _.get(objectUser, 'lastName', ''))},
                        token: tokens.token,
                        refreshToken: tokens.refreshToken
                    }
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
    static async signOut(body) {
        try {
            const  { id: userId } = body;
            const removeRefresh =  await findByUserIdToken({
                userId
            })
            if(removeRefresh){
                return {
                    code: USER_MESSAGE_CODE.SIGN_OUT_SUCCESS,
                    message: USER_MESSAGES.SIGN_OUT_SUCCESS
                }
            }
        } catch (error) {
            return {
                code: USER_MESSAGE_CODE.INTERNAL_ERROR_SERVER,
                message:USER_MESSAGES.INTERNAL_ERROR_SERVER
            }
        }
    }
}


module.exports = userService;