import logger from "../logger";
import { users } from "../schema/user";
require('dotenv').config();
const jwt = require('jsonwebtoken');

const accountSid = "ACae7ca100603b07db9a33a7b2b8a3efbb";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VAa983d927931ddab856aaed11bade267f";
const client = require("twilio")(accountSid, authToken);
const jwt_secret = process.env.JWT_SECRET;

const checkPhonenSend = async (_:any, { phone }:{phone:string}) =>{
    try {
        let user = await users.findOne({ phone });
        if (!user) {
            const newUser = new users({
                phone,
            });
            user = await newUser.save();
        }
        const otpStatus = await sendOtp(phone);
        return {user, otp: otpStatus};
      } catch (error) {
        logger.error(error);
        throw new Error('Error checking phone number');
      }
}

const verifyOtp = async (_:any, { verify }:{verify:{phone:string, otp: string, uid:string}}) => {
    try {
        const {phone, otp, uid} = verify;
        // const status = await verifyOtpTwilio(phone,otp);

        // if(status === "approved"){
        if(true){
            const token = jwt.sign(uid, jwt_secret);
            return {token}
        }
        throw new Error("otp incorrect");
    } catch (error) {
        logger.error(error);
        throw new Error('Error checking phone number');
    }
}

const verifyOtpTwilio = async (phone:string, otp:string) =>{
    return new Promise<string>(async (resolve, reject) => {
        try {
            const { status } = await client.verify.v2
                .services(verifySid)
                .verificationChecks.create({ to: `+91${phone}`, code: otp });

            return resolve(status)
        } catch (error) {
            console.error(error);
            logger.error("error with twilio otp check");
            reject();
        }

    })
}

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure

const sendOtp = async (phone:string) => {
    return new Promise(async (res,rej)=>{
        try {
            const verifyPhone = await client.verify.v2
                                        .services(verifySid)
                                        .verifications.create({ to: `+91${phone}`, channel: "sms" });
            return res(verifyPhone.status);

        } catch (error) {
            logger.error(error)
            rej();
        }

    });
}

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

export default {
    checkPhonenSend,
    verifyOtp
};
