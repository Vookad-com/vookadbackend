"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireNotifier = exports.fireAuth = exports.myapp = void 0;
const { initializeApp } = require('firebase-admin/app');
const auth_1 = require("firebase-admin/auth");
const messaging_1 = require("firebase-admin/messaging");
require('dotenv').config();
var admin = require("firebase-admin");
var serviceAccount = require((_a = process.env.GOOGLE_APPLICATION_CREDENTIALS) !== null && _a !== void 0 ? _a : "");
exports.myapp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
exports.fireAuth = (0, auth_1.getAuth)(exports.myapp);
exports.fireNotifier = (0, messaging_1.getMessaging)(exports.myapp);
// fireAuth.app.options
