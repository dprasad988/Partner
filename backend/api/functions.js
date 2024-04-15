import jwt from 'jsonwebtoken';

// Middleware to authenticate requests using JWT tokens
export function authenticateJWT(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }
  
    // Check if the token is blacklisted
    if (tokenBlacklist.includes(token)) {
      return res.sendStatus(401); // Unauthorized
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
  
      // Set decoded token to req.user
      req.user = decoded;
      next();
    });
  }
