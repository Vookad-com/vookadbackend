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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const admin_1 = require("../schema/admin");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const accountSid = "ACae7ca100603b07db9a33a7b2b8a3efbb";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VAa983d927931ddab856aaed11bade267f";
const client = require("twilio")(accountSid, authToken);
const jwt_admin = process.env.JWT_ADMIN;
const checkPhonenSend = (_, { phone }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield admin_1.admin.findOne({ phone });
        if (!user) {
            const newUser = new admin_1.admin({
                phone,
                roles: ['superadmin'],
                name: 'Sahil',
            });
            user = yield newUser.save();
        }
        const otpStatus = yield sendOtp(phone);
        return { user, otp: otpStatus };
    }
    catch (error) {
        logger_1.default.error(error);
        throw new Error('User Does exist');
    }
});
const verifyOtp = (_, { verify }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, otp, uid } = verify;
        // const status = await verifyOtpTwilio(phone,otp);
        // if(status === "approved"){
        if (true) {
            const token = jwt.sign({ uid, exp: Math.floor(Date.now() / 1000) + 604800 }, jwt_admin);
            return { token };
        }
        throw new Error("otp incorrect");
    }
    catch (error) {
        logger_1.default.error(error);
        throw new Error('Error checking phone number');
    }
});
const verifyOtpTwilio = (phone, otp) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { status } = yield client.verify.v2
                .services(verifySid)
                .verificationChecks.create({ to: `+91${phone}`, code: otp });
            return resolve(status);
        }
        catch (error) {
            console.error(error);
            logger_1.default.error("error with twilio otp check");
            reject();
        }
    }));
});
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const sendOtp = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const verifyPhone = yield client.verify.v2
                .services(verifySid)
                .verifications.create({ to: `+91${phone}`, channel: "sms" });
            return res(verifyPhone.status);
        }
        catch (error) {
            logger_1.default.error(error);
            rej();
        }
    }));
});
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+919078101920", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
exports.default = {
    checkPhonenSend,
    verifyOtp
};
