"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarbonCertificateValidation = void 0;
var validator_1 = __importDefault(require("../utils/validator"));
var carbonCertificateSchema_1 = require("./carbonCertificateSchema");
var CreateCarbonCertificateValidation = function (req, res, next) { return (0, validator_1.default)(carbonCertificateSchema_1.carbonCertificateSchema.createCarbonCertificate, req.body, next); };
exports.CreateCarbonCertificateValidation = CreateCarbonCertificateValidation;
