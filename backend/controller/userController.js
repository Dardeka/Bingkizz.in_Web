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

// login
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

// get user for order confirmation
export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userDetail = await User.findById(id)
        res.json(userDetail)
    } catch (error) {
        console.log({error: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId, name, address, phoneNum } = req.body;
        const image = req.file ? `/images/${req.file.filename}` : ''
        console.log('This is the image : ', image)
        const targetUser = await User.findByIdAndUpdate(userId, {name: name, address: address, phoneNum: phoneNum, profilePic: image})

        console.log("This is the user update: ",targetUser)
        return res.json({ message: 'User updated successfully', data: targetUser });
    } catch (error) {
        console.log({error: error.message})
    }
}   