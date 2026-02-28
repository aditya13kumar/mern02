const usermodel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function registerUser(req,res){
    const {username, email, password, role = "user"} = req.body;


    const isuseralreadyexist = await usermodel.findOne({
        $or:[
            {username},{email}
        ]
    })
    if(isuseralreadyexist){
        return res.status(409).json({message : "User already exists"});
    }

    const hash = await bcrypt.hash(password,10)

    const user = await usermodel.create({
        username,
        email,
        password:hash,
        role
     })

    const token = jwt.sign({
        id:user._id,
        role: user.role,
    },process.env.JWT_SECRET);

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        }
    })
}

async function login(req,res){
    const {username,email , password} = req.body;

    const user = await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:"invalid users!!"
        })
    }

    const ispassword = await bcrypt.compare(password,user.password)

    if(!ispassword){
        return res.status(401).json({
            message:"passward invalid"
        })
    }

    const token = jwt.sign({
        id:user._id,
        role:user.role,
    },process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(200).json({
        message:"user logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        }
    })
}



module.exports = { registerUser , login }