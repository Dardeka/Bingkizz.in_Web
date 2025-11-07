import express from 'express';
import { login, register } from '../controller/userController.js';

const userRoute = express.Router();

// create new user
userRoute.post('/register', register)

// Login user
userRoute.post('/login', login)

export default userRoute