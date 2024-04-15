import express from "express";
import admin from 'firebase-admin';
import bcrypt from 'bcryptjs'; // Import for password hashing
import serviceAccount from '../config/serviceAccountKey.json' assert { type: 'json' };


// Initialize Firebase Admin SDK with appropriate credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const registerRouter = express.Router();

registerRouter.post('/signup', async (req, res) => {
  const { name, email, contact, gender, goal, pass } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Get Firestore instance
    const db = admin.firestore();

    // Create a new user document
    const newUserRef = await db.collection('register').add({
      name,
      email,
      contact,
      gender,
      goal,
      password: hashedPassword
    });

    console.log('User registered successfully with ID:', newUserRef.id);
    res.status(200).send('Registered successfully');
  } catch (err) {
    console.error('Registration failed:', err);

    // Handle errors
    res.status(500).send('Registration failed: ' + err.message);
  }
});

export default registerRouter;
