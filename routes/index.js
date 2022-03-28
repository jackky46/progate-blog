const express = require("express");
const router = express.Router();

const IndexControllers = require("../controllers/");

const checkAuthenticationMiddleware = require("../middlewares/checkAuthentication");

// Go to home page
router.get("/", IndexControllers.getHomePage);

// Go to dashboard
router.get(
  "/dashboard",
  checkAuthenticationMiddleware,
  IndexControllers.getDashboardPage
);

module.exports = router;