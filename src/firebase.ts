import { applicationDefault } from "firebase-admin/app";

const { initializeApp } = require('firebase-admin/app');
import { getAuth } from 'firebase-admin/auth';
require('dotenv').config();

var admin = require("firebase-admin");

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS ?? "");

export const myapp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const fireAuth = getAuth(myapp);
fireAuth.app.options