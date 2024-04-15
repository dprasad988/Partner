import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://localhost:5005/forgotRouter/forgot-password', { email });
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setMessage('Error sending password reset email. Please try again later.');
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleForgotPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
