import express from 'express';
const logoutRouter = express.Router();

// Initialize an empty blacklist
let tokenBlacklist = [];

// Route handler for POST /logout
logoutRouter.post('/logout', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  // Remove the token from the blacklist
  const index = tokenBlacklist.indexOf(token);
  if (index !== -1) {
    tokenBlacklist.splice(index, 1);
  }

  res.status(200).json({ message: "Logout successful" });
});

export default logoutRouter;
