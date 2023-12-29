export interface FirebaseUser {
    iss: string;
    aud: string;
    auth_time: number;
    sub: string;
    iat: number;
    exp: number;
    phone_number: string;
    firebase: any;
    uid: string;
  }

export interface User {
  fcmToken:string;
  phone:string;
  fireId:string;
}  