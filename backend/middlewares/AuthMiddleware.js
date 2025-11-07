import pkg from 'jsonwebtoken';
const { verify } = pkg;

export const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if(!accessToken){
        return res.json({error: "User not logged in!"})
    }

    try{
        const validToken = verify(accessToken, "importantsecret");

        if(validToken){
            req.user = validToken
            return next();
        }
    }catch (err){
        return res.json({error: err});
    }
};