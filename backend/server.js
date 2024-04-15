import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import registerRouter from './api/register.js';
import signInRouter from './api/signin.js';
import logoutRouter from './api/logout.js';
import {authenticateJWT} from './api/functions.js'
import forgotRouter from './api/forgot-password.js';

dotenv.config();

const port = process.env.PORT || 5005;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/registerRouter', registerRouter);
app.use('/signInRouter', signInRouter);
app.use("/logoutRouter", logoutRouter);
app.use("/forgotRouter", forgotRouter);

// Protected endpoint that requires JWT token for access
app.get("/profile", authenticateJWT, (req, res) => {
  // Retrieve user data from decoded JWT token
  const user = req.user;
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
