import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

import pkg from 'jsonwebtoken';
const { sign } = pkg;

// Create user and add into database
export const register = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { username, name, email, password, address, phoneNum } = userData;

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message: "User already exist."})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            name,
            email,
            password: hashedPassword,
            address,
            phoneNum
        })

        const savedUser = await newUser.save()
        res.status(200).json("SUCCESS")
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const targetUser = await User.findOne({username: username})

        if(!targetUser){
            return res.json({error: "User not found! Please do registration first!"})
        }

        bcrypt.compare(password, targetUser.password).then((match) => {
            if(!match) {
                return res.json({error: "Wrong username and password combination"})
            }

            const accessToken = sign(
                {username: targetUser.username, id: targetUser._id},
                "importantsecret"
            )
            return res.json(accessToken)
        })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}