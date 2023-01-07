import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  signInWithEmailAndPassword
} from "firebase/auth"
import { firebaseAuth } from "../config/firebase.config";


export const firebaseClientService = {

  // The `handleSigninWithGoogle` function allows the user to sign in with their Google account using the `signInWithPopup` method from the Firebase authentication library,
  // with the `GoogleAuthProvider` being passed as an argument.
  // This function returns a promise that resolves with the authentication result.
  handleSigninWithGoogle: async () => {
    
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    try {
      // Call the `signInWithPopup` method, passing in the `firebaseAuth` instance and the `provider` instance as arguments
      const response = await signInWithPopup(firebaseAuth, provider)
      return response
    } catch(err) {
      console.error(err)
    }
  },

  // The `handleSignout` function signs out the user by calling the `signOut` method from the Firebase authentication library.
  handleSignout: async () => {
    try {
      // Call the `signOut` method, passing in the `firebaseAuth` instance as an argument
      await signOut(firebaseAuth).then(() => {
        console.log("logged out")
      })
    } catch (error) {
      console.error(error)
    }
  },

  // The `logWithEmailAndPassword` function allows the user to sign in with their email and password by calling the `signInWithEmailAndPassword` method from the Firebase authentication library.
  logWithEmailAndPassword: async (email: string, password: string) => {
    try {
      // Call the `signInWithEmailAndPassword` method, passing in the `firebaseAuth` instance and the email and password as arguments
      const userLogged = await signInWithEmailAndPassword(firebaseAuth, email, password)
      return userLogged
    } catch (err) {
      // If an error occurs, log it to the console
      console.error(err)
    }
  },

  // The `getToken` function returns a promise that resolves with the user's Firebase ID token if the user is logged in.
  getToken: async () => {
    // Get the user's ID token by calling the `getIdToken` method on the `currentUser` property of the `firebaseAuth` instance
    //the bollean paramether forces the refresh of the id token keeping the auth session active for the user
    const token = await firebaseAuth.currentUser?.getIdToken(true)
    // Return the token
    return token
  },

    // The `getUser` function returns a promise that resolves with the user object
    getUser :  async ()=>{
      const user = await firebaseAuth.currentUser
      return (user)
    }
  }







