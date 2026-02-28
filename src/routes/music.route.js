const express = require('express');
const musiccontroller = require('../controllers/music.controller');
const authmiddleware = require('../middleware/auth.middleware')
const multer = require('multer');



const upload = multer({
    storage:multer.memoryStorage()
})
const route = express.Router();

route.post('/upload-music',authmiddleware.authartist  ,  upload.single("music"),musiccontroller.createmusic);

route.post('/album',authmiddleware.authartist    ,musiccontroller.createalbum);

route.get('/',authmiddleware.authuser,musiccontroller.getallmusic);


module.exports = route;