"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCarbonCertificate = exports.transferCarbonCertificate = exports.availableCarbonCertificate = exports.ownedCarbonCertificate = exports.createCarbonCertificate = exports.getExample = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var CarbonCertificate_1 = __importDefault(require("../model/CarbonCertificate"));
var User_1 = __importDefault(require("../model/User"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var getExample = function (req, res, next) {
    res.json({ message: "hello" });
};
exports.getExample = getExample;
var createCarbonCertificate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, country, owner, Status, certificate, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, country = _a.country, owner = _a.owner;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                Status = {
                    available: true,
                    owned: false,
                    transferred: false,
                };
                if (owner) {
                    Status.available = false;
                    Status.owned = true;
                }
                certificate = new CarbonCertificate_1.default({
                    country: country,
                    owner: owner,
                    Status: Status,
                });
                return [4 /*yield*/, certificate.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ success: true, data: certificate })];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, next(http_errors_1.default.InternalServerError)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCarbonCertificate = createCarbonCertificate;
var ownedCarbonCertificate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, userid, userOwnedCertificates, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentUser = (0, jwt_decode_1.default)(req.cookies.jwt);
                userid = currentUser.userId;
                return [4 /*yield*/, CarbonCertificate_1.default.find({
                        owner: userid,
                    })];
            case 1:
                userOwnedCertificates = _a.sent();
                return [2 /*return*/, res.status(200).json({ success: true, data: userOwnedCertificates })];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, next(http_errors_1.default.InternalServerError)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.ownedCarbonCertificate = ownedCarbonCertificate;
var availableCarbonCertificate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var availableStatus, availableCertificates, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                availableStatus = {
                    available: true,
                    owned: false,
                    transferred: false,
                };
                return [4 /*yield*/, CarbonCertificate_1.default.find({
                        Status: availableStatus,
                    })];
            case 1:
                availableCertificates = _a.sent();
                return [2 /*return*/, res.status(200).json({ success: true, data: availableCertificates })];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, next(http_errors_1.default.InternalServerError)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.availableCarbonCertificate = availableCarbonCertificate;
var transferCarbonCertificate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, transferToUser, certificateId, currentUser, userid, certificate, targetUser, transferDetails, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, transferToUser = _a.transferToUser, certificateId = _a.certificateId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                currentUser = (0, jwt_decode_1.default)(req.cookies.jwt);
                userid = currentUser.userId;
                return [4 /*yield*/, CarbonCertificate_1.default.findById(certificateId)];
            case 2:
                certificate = _b.sent();
                return [4 /*yield*/, User_1.default.findById(transferToUser)];
            case 3:
                targetUser = _b.sent();
                if (certificate && targetUser) {
                    if (certificate.owner) {
                        if (certificate.owner.toString() === userid) {
                            certificate.owner = transferToUser;
                            certificate.Status.transferred = true;
                        }
                        else {
                            throw new Error("userId does not match with the owner");
                        }
                    }
                    else {
                        throw new Error("Owner property is not available on the certificate");
                    }
                }
                else {
                    throw new Error("Certificate or User not found");
                }
                return [4 /*yield*/, CarbonCertificate_1.default.findByIdAndUpdate(certificateId, certificate, { new: true }).exec()];
            case 4:
                transferDetails = _b.sent();
                return [2 /*return*/, res.status(200).json({ success: true, data: transferDetails })];
            case 5:
                error_4 = _b.sent();
                return [2 /*return*/, next((0, http_errors_1.default)(error_4))];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.transferCarbonCertificate = transferCarbonCertificate;
var seedCarbonCertificate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, owner, country, availableStatus, ownedStatus, i, Status, availableCertificates, i, Status, ownedCertificates, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                currentUser = (0, jwt_decode_1.default)(req.cookies.jwt);
                owner = currentUser.userId;
                country = "canada";
                availableStatus = {
                    available: true,
                    owned: false,
                    transferred: false,
                };
                ownedStatus = {
                    available: false,
                    owned: true,
                    transferred: false,
                };
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 5)) return [3 /*break*/, 4];
                Status = availableStatus;
                availableCertificates = new CarbonCertificate_1.default({
                    country: country,
                    Status: Status,
                });
                return [4 /*yield*/, availableCertificates.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < 5)) return [3 /*break*/, 8];
                Status = ownedStatus;
                ownedCertificates = new CarbonCertificate_1.default({
                    country: country,
                    owner: owner,
                    Status: Status,
                });
                return [4 /*yield*/, ownedCertificates.save()];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/, res
                    .status(200)
                    .json({ success: true, msg: "Records inserted successfully" })];
            case 9:
                error_5 = _a.sent();
                return [2 /*return*/, next(http_errors_1.default.InternalServerError)];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.seedCarbonCertificate = seedCarbonCertificate;
