const express = require("express");

const {getUser, addUser, removeUser} = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/userValidators");
const {checkLogin} = require("../middlewares/common/checkLogin");

const router = express.Router();

//user page
router.get("/",decorateHtmlResponse("User"), checkLogin, getUser);

//add user
router.post("/", checkLogin, avatarUpload, addUserValidators, addUserValidationHandler, addUser);

//delete
router.delete("/:id", removeUser);

module.exports = router;