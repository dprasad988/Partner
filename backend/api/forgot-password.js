import express from 'express';
import crypto from 'crypto';
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    // Configure your email service provider here
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
  });
  

const forgotRouter = express.Router();

forgotRouter.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Retrieve user data from the 'register' collection in Firestore
    const db = admin.firestore();
    const userSnapshot = await db.collection('register').where('email', '==', email).limit(1).get();

    if (userSnapshot.empty) {
      return res.status(404).send('User not found');
    }

    // Assuming only one user found with the provided email
    const userData = userSnapshot.docs[0].data();
    const userId = userSnapshot.docs[0].id; // Get the document ID

    // Generate a random token
    const token = crypto.randomBytes(20).toString('hex');

    // Save the token with the user's email
    // Here, you would typically store the token in your database
    // For simplicity, let's assume you have a users collection in Firestore
    await db.collection('register').doc(userId).update({ resetToken: token });

    // Send password reset email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      text: `Click the link below to reset your password: http://localhost:3000/reset-password/${token}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).send('Error sending password reset email');
  }
});

export default forgotRouter;
