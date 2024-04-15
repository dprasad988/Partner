import express from "express";
import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import JWT library
import crypto from 'crypto'; // Import crypto module

const signInRouter = express.Router();

// Generate a secure secret key for JWT token
const secretKey = crypto.randomBytes(32).toString('hex');

signInRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get Firestore instance
    const db = admin.firestore();

    // Query the register collection for the user with the provided email
    const userSnapshot = await db.collection('register').where('email', '==', email).limit(1).get();

    // Check if a user with the provided email exists
    if (userSnapshot.empty) {
      res.status(401).send("Invalid email or password");
      return;
    }

    // Get the user document data
    const userData = userSnapshot.docs[0].data();

    // Check if the provided password matches the hashed password stored in the document
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      res.status(401).send("Invalid email or password");
      return;
    }

    // Generate JWT token with user email as payload
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    res.json({ Login: true, token, userData });
  } catch (err) {
    console.error("Sign-in failed:", err);
    res.status(500).send("An error occurred during sign-in");
  }
});

export default signInRouter;
