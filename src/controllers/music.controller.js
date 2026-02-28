const musicmodel = require('../model/music.models');
const jwt = require('jsonwebtoken');
const albummodel = require('../model/album.model')
const {uploadfile} = require("../srvices/storage.services");




async function createmusic (req,res){

   

    const {tittle} = req.body;
    const file = req.file;

    const result = await uploadfile(file.buffer.toString("base64"));

    const music = await musicmodel.create({
        uri:result.url,
        tittle,
        artist: req.user.id
    })

    res.status(201).json({
        message:"music created succesfully",
        music:{
            id:music._id,
            uri:music.uri,
            tittle:music.tittle,
            artist: req.user.id ,
        }
    })
   
   
    
}

async function createalbum(req,res){
   
        const {tittle,musicId} = req.body;

        const album = await albummodel.create({
            tittle,
            artist:req.user.id,
            music:musicId
        })

        res.status(201).json({
            message:"album created successfully",
            album:{
                id:album._id,
                tittle:album.tittle,
                music:album.music
            }
        })

    
}

async function getallmusic(req,res){

    const musics = await musicmodel.find().populate("artist","tittle username");

    res.status(200).json({
        message:"music fetched succesfully",
        musics:musics
    })

}
module.exports = {createmusic , createalbum , getallmusic}
