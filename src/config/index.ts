import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const DB = process.env.DB!;
export const TEST_DB = process.env.TEST_DB!;
export const PORT = parseInt(process.env.PORT!);
export const TEST_PORT = parseInt(process.env.TEST_PORT!);
export const JWT_KEY = process.env.JWT_KEY!;
export const FRONTEND_URL = process.env.FRONTEND_URL!;

let testAccount = {
  user: "onie76@ethereal.email",
  pass: "AXsmfG9k5nj3PD57kJ",
};

export let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
});
