const express = require("express");
const router = express.Router();
const { processSignUp, processLogin ,authCheck } = require("../controllers/signup&loginController");

router.post("/signupUser",processSignUp);
router.post("/loginUser", processLogin);
router.post("/authCheck",authCheck);

module.exports = router;