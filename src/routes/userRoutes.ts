import { Router } from "express";

import {
  sendVerificationMail,
  signinUser,
  signupUser,
  verifyUserMail,
  sendForgotPasswordMail,
  verifyForgotMail,
} from "../controllers/userControllers";
import {
  signupUserValidation,
  signinUserValidation,
  verifyUserMailValidation,
  sendVerificationMailValidation,
  verifyForgotMailValidation,
  sendForgotPasswordMailValidation,
} from "../validation/userValidation/userValidation";

import {
  createCarbonCertificate,
  ownedCarbonCertificate,
  availableCarbonCertificate,
  transferCarbonCertificate,
  seedCarbonCertificate,
} from "../controllers/carbonCertificateController";
import { CreateCarbonCertificateValidation } from "../validation/carbonCertificateValidation/carbonCertificateValidation";
import { authChecker } from "../middleware/authChecker";

const router = Router();

//Auth Routes
router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

router.post(
  "/send-verification-mail",
  sendVerificationMailValidation,
  sendVerificationMail
);

router.post("/verify-user-mail", verifyUserMailValidation, verifyUserMail);

router.post(
  "/verify-forgot-mail",
  verifyForgotMailValidation,
  verifyForgotMail
);
router.post(
  "/forgot-password",
  sendForgotPasswordMailValidation,
  sendForgotPasswordMail
);

// carbon certificate Routes
router.post(
  "/create-certificate",
  authChecker,
  CreateCarbonCertificateValidation,
  createCarbonCertificate
);

router.get("/owned-certificates", authChecker, ownedCarbonCertificate);

router.get("/available-certificates", 
authChecker, 
availableCarbonCertificate);

router.post("/transfer-certificate", authChecker, transferCarbonCertificate);

router.get("/seed", authChecker, seedCarbonCertificate);

export default router;
