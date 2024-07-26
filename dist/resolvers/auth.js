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
const mongoose = require('mongoose');
const logger_1 = __importDefault(require("../logger"));
const user_1 = require("../schema/user");
const firebase_1 = require("../firebase");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const accountSid = "ACae7ca100603b07db9a33a7b2b8a3efbb";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VA5db2a61c303a98f17b62c6b2e64181e2";
const client = require("twilio")(accountSid, authToken);
const jwt_secret = process.env.JWT_SECRET;
const checkPhonenSend = (_, { phone }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_1.users.findOne({ phone });
        if (!user) {
            const newUser = new user_1.users({
                phone,
            });
            user = yield newUser.save();
        }
        const otpStatus = yield sendOtp(phone);
        return { user, otp: otpStatus };
    }
    catch (error) {
        logger_1.default.error(error);
        throw new Error('Error checking phone number');
    }
});
const verifyOtp = (_, { verify }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, otp, uid } = verify;
        // const status = await verifyOtpTwilio(phone,otp);
        // if(status === "approved"){
        if (true) {
            const token = jwt.sign(uid, jwt_secret);
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
const createORCheck = (_, args, { usertoken }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield firebase_1.fireAuth.verifyIdToken(usertoken);
        let user = yield user_1.users.findOne({ fireId: token.uid });
        if (!user) {
            const newUser = new user_1.users({
                phone: token.phone_number,
                fireId: token.uid
            });
            user = yield newUser.save();
        }
        return user;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new Error('Error checking phone number');
    }
});
exports.default = {
    checkPhonenSend,
    verifyOtp,
    createORCheck
};
