"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userControllers_1 = require("../controllers/userControllers");
var userValidation_1 = require("../validation/userValidation/userValidation");
var carbonCertificateController_1 = require("../controllers/carbonCertificateController");
var carbonCertificateValidation_1 = require("../validation/carbonCertificateValidation/carbonCertificateValidation");
var authChecker_1 = require("../middleware/authChecker");
var router = (0, express_1.Router)();
//Auth Routes
router.post("/signup", userValidation_1.signupUserValidation, userControllers_1.signupUser);
router.post("/signin", userValidation_1.signinUserValidation, userControllers_1.signinUser);
router.post("/send-verification-mail", userValidation_1.sendVerificationMailValidation, userControllers_1.sendVerificationMail);
router.post("/verify-user-mail", userValidation_1.verifyUserMailValidation, userControllers_1.verifyUserMail);
router.post("/verify-forgot-mail", userValidation_1.verifyForgotMailValidation, userControllers_1.verifyForgotMail);
router.post("/forgot-password", userValidation_1.sendForgotPasswordMailValidation, userControllers_1.sendForgotPasswordMail);
// carbon certificate Routes
router.post("/create-certificate", authChecker_1.authChecker, carbonCertificateValidation_1.CreateCarbonCertificateValidation, carbonCertificateController_1.createCarbonCertificate);
router.get("/owned-certificates", authChecker_1.authChecker, carbonCertificateController_1.ownedCarbonCertificate);
router.get("/available-certificates", authChecker_1.authChecker, carbonCertificateController_1.availableCarbonCertificate);
router.post("/transfer-certificate", authChecker_1.authChecker, carbonCertificateController_1.transferCarbonCertificate);
router.get("/seed", authChecker_1.authChecker, carbonCertificateController_1.seedCarbonCertificate);
exports.default = router;
