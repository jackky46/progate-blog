const express = require('express');
const router = express.Router();

/* GET Read UserController */
const UserController = require('../controllers/users');

/* Show Register Page */
router.get("/register", UserController.getRegisterPage);

/* Register a User */
router.post("/register", UserController.registerUser);

/* Show Login Page */
router.get("/login", UserController.getLoginPage);

/* Login a User */
router.post("/login", UserController.loginUser);

/* Logout User */
router.get("/logout", UserController.logoutUser);

/* Facebook Login AUTH */
router.get("/facebook-login", UserController.facebookLogin);

/* Facebook Login AUTH Response */
router.get("/facebook-login/callback", UserController.facebookLoginCallback);


module.exports = router;