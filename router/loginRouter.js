const express = require("express");

const {getLogin, login, logout} = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { doLoginValidators, doLoginValidationHandler } = require("../middlewares/login/loginValidators");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");



const router = express.Router();

//login page
router.get("/",decorateHtmlResponse("Login"), redirectLoggedIn, getLogin);


//process login
router.post("/", 
    decorateHtmlResponse("Login"),
    doLoginValidators, 
    doLoginValidationHandler,
    login
);

//do logout
router.delete("/", logout);

module.exports = router;