var express = require('express');
const { signIn, signUp, signOut ,refreshToken} = require('../controllers/user.controller');
const validator = require('../validators/user.validator');


var router = express.Router();

/* POST SIGN UP */
router.post('/sign-up',validator.registorValidator,signUp);
/* POST SIGN IN */ 
router.post('/sign-in',validator.loginValidator ,signIn);
/* POST SIGN OUT */
router.post('/sign-out' ,signOut);
/* REFRESH TOKEN */
router.post('/refresh-token',validator.refreshValidator,refreshToken);
module.exports = router;
