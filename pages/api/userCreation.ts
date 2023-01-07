import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseServerService } from './serverFirebase/services/services'

// This is a Next.js API route handler function that handles a POST request to create a new user in a Firebase project.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // First, check if the request method is a POST request
  if (req.method !== 'POST') {
    // If it is not a POST request, send a response with a status code of 405 (Method Not Allowed) and a message indicating that only POST requests are allowed
    res.status(405).send({ message: 'Only POST requests allowed' })
    return (new Error)
  }

  // Check if the request body is empty
  if (!req.body) {
    // If the request body is empty, send a response with a status code of 500 (Internal Server Error) and a message indicating that no data was posted
    res.status(500).json({message: "no data posted"})
  }

  // Destructure the email, password, and userName from the request body
  const {email, password, userName} = req.body

  try {
    // Call the `createNewUser` function from the `firebaseServerService` module, passing in the email, password, and userName as arguments
    const newUser = await firebaseServerService.createNewUser(email, password, userName)
    // Log the new user object to the console
    console.log(newUser)
    // Send a response with a status code of 200 (OK) and a message indicating that the user was created successfully
    res.status(200).json({message: "User created Succesfully"})
  } catch (err) {
    // If an error occurs, send a response with a status code of 500 (Internal Server Error) and the error message
    res.status(500).json({message: err})
  }
}