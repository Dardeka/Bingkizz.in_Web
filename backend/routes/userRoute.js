import express from 'express';
import { getUser, login, register } from '../controller/userController.js';

const userRoute = express.Router();

// create new user
userRoute.post('/register', register)

// Login user
userRoute.post('/login', login)

// get user
userRoute.get('/:id', getUser)

export default userRoute