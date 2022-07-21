import { RequestHandler } from "express";
import validator from "../utils/validator";
import { carbonCertificateSchema } from "./carbonCertificateSchema";

export const CreateCarbonCertificateValidation: RequestHandler = (
  req,
  res,
  next
) => validator(carbonCertificateSchema.createCarbonCertificate, req.body, next);
