"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carbonCertificateSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.carbonCertificateSchema = {
    createCarbonCertificate: joi_1.default.object({
        country: joi_1.default.string().required(),
        owner: joi_1.default.string().allow(""),
        Status: joi_1.default.object({
            available: joi_1.default.boolean().required(),
            owned: joi_1.default.boolean().required(),
            transferred: joi_1.default.boolean().required(),
        }),
    }),
};
