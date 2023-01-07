import {getApp,getApps,initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"



const firebaseConfig = {
  

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,

  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,

  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,

  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUKET,

  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINSENDERID,

  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID

};



const app = getApps().length > 0 ? getApp("clientFirebase"): initializeApp(firebaseConfig,"clientFirebase")
export const firebaseAuth = getAuth(app);

