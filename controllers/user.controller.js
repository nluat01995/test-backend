const { signUp, signIn, signOut } = require("../services/user.service")
const { validationResult } = require('express-validator');
const { refreshToken } = require("../services/token.service");

class userController {

  // Register account
  signUp = async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.json(await signUp(req.body));
    }
    return res.status(400).json({ errors: result.array() })
  }
  // login account
  signIn = async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.json(await signIn(req.body));
    }
    return res.status(400).json({ errors: result.array() })
  }
  // sign out account
  signOut = async (req, res, next) => {
    return res.json(await signOut(req.auth))
  }
  // refresh token
  refreshToken = async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.json(await refreshToken(req.body))
    }
    return res.status(400).json({ errors: result.array() })
  }

}

module.exports = new userController();
