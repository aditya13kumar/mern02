const {ImageKit} = require('@imagekit/nodejs');

const ImageKitclient = new ImageKit({
    privateKey:process.env.ImageKit_private_key,
})

async function uploadfile(file){
    const result = await ImageKitclient.files.upload({
        file,
        fileName:"music" + Date.now(),
        folder:"sptify-music/music"
    })
    return result;
}

module.exports = { uploadfile }