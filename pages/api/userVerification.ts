import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseServerService } from './serverFirebase/services/services'

// This is a route handler function that handles a request to verify a user's Firebase ID token.
//Through the verification of that token, the function returns the data of the registered and logged-in user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request headers do not include an authorization header
  if (!req.headers.authorization) {
    // If the request headers do not include an authorization header, send a response with a status code of 500 (Internal Server Error) and a message indicating that no token was found
    res.status(500).json({message: "no token found"})
  }

  // Get the authorization header from the request headers
  const header = req.headers.authorization
  // Split the authorization header by space and get the second element (which should be the token)
  const token: string = header?.split(" ")[1]!

  try {
    // Call the `verifyToken` function from the `firebaseServerService` module, passing in the token as an argument
    const decodeValue = await firebaseServerService.verifyToken(token)
    // If the `decodeValue` is falsy (i.e. if the `verifyToken` function returns `null` or `undefined`), send a response with a status code of 400 (Bad Request) and a message indicating that no user was found
    if (!decodeValue) {
      res.status(400).json({message: "no user found"})
    }
    // Otherwise, send a response with the `decodeValue`
    res.send(decodeValue)
  } catch (err) {
    // If an error occurs, send a response with a status code of 500 (Internal Server Error) and the error message
    res.status(500).json({message: err})
  }
}