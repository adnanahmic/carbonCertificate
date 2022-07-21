"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var CarbonCertificateSchema = new mongoose_1.Schema({
    country: { type: String },
    owner: { type: mongoose_2.default.Types.ObjectId, ref: "User" },
    Status: {
        available: { type: Boolean },
        owned: { type: Boolean },
        transferred: { type: Boolean },
    },
});
exports.default = (0, mongoose_1.model)("CarbonCertificate", CarbonCertificateSchema);
