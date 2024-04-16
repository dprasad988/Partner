import express from 'express';
import admin from 'firebase-admin';

const resetPasswordRouter = express.Router();

resetPasswordRouter.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Check if the token exists in the database
    const db = admin.firestore();
    const userSnapshot = await db.collection('register').where('resetToken', '==', token).limit(1).get();

    if (userSnapshot.empty) {
      return res.status(404).send('Invalid or expired token');
    }

    // Assuming only one user found with the provided token
    const userData = userSnapshot.docs[0].data();

    // Update the user's password
    // Here, you would typically update the password in your database
    // For simplicity, let's assume you have a users collection in Firestore
    await db.collection('register').doc(userData.reg_id).update({ password: newPassword });

    // Clear the reset token
    await db.collection('register').doc(userData.reg_id).update({ resetToken: null });

    res.status(200).send('Password reset successful');
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Error resetting password');
  }
});

export default resetPasswordRouter;
