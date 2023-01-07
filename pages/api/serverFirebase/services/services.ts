import admin from "firebase-admin";

const serviceAccount = require("../config/serviceAccountKey.json");

  // Check if the Firebase app is already initialized
   // Initialize the Firebase app with the service account key and the database URL
  if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVER_SERVICEACOUNT!)),
        databaseURL: 'https://****.firebaseio.com',
    });
}



export const firebaseServerService = {
  // Function for verifying a Firebase ID token
    verifyToken: async (token:string) => {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return { decodedToken };
      } catch (err) {
        return { err };
      }
    },
    // Function for creating a new user with the Firebase-admin service
    createNewUser : async (email:string, password:string, displayName:string)=>{ 
      const user = await admin.auth().createUser({
      email ,
      password ,
      displayName ,
      })
      return(user)
    }
  }