const jwt = require('jsonwebtoken');


async function authartist(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "artist"){
            return res.status(401).json({message:"role different"});
        }

        req.user = decoded

        next();
    }catch(err){
        console.log(err);

        return res.status(401).json({message:"errorrrrr"})
    }

}

async function authuser(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({
            message:"Unauthorized!!"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        if(decoded.role !== "user" && decoded.role !== "artist"){
            return res.status(403).json({message:"you don't have access!!"})
        }

        req.user = decoded;

        next();
    }catch(err){
        console.log(err);

        return res.status(401).json({message:"unathori"})
    }
}

module.exports = {authartist , authuser}; 