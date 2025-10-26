const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')

const {sign} = require('jsonwebtoken')

// this for registration
router.post('/regist', async (req, res) =>{
    const {username, email, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            email: email,
            password: hash
        });
        return res.json("SUCCESS");
    })
});

// this for login
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username} });

    if(!user) {
        return res.json({error:"User Doesn't Exist!"});
    }

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) return res.json({error: "Wrong Username and Password Combination"});

        const accessToken = sign(
            {username: user.username, id: user.id}, 
            "importantsecret"

        )
        return res.json(accessToken);
    })
});

module.exports = router;