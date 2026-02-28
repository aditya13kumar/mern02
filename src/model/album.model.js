const mongoose= require('mongoose');

const albumSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
    },
    music:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"music"
    }],
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
})

const albummodel = mongoose.model("album",albumSchema);

module.exports = albummodel