import Joi from "joi";

export const carbonCertificateSchema = {
  createCarbonCertificate: Joi.object({
    country: Joi.string().required(),
    owner: Joi.string().allow(""),
    Status: Joi.object({
      available: Joi.boolean().required(),
      owned: Joi.boolean().required(),
      transferred: Joi.boolean().required(),
    }),
  }),
};
