const router = require("express").Router();
const Image = require("../api/db/models/Image");
const Post = require("../api/db/models/Post");
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const upload = require('../multer');
const fs = require('fs');
//dotenv.config({path:'./cloudinary.env'});


cloudinary.config({ 
  cloud_name: 'buzz-snaps', 
  api_key: '947491522821455', 
  api_secret: 'Icm7LyorQzQ5Fax9tu7bGoqSdQc',
  secure: true
});

//make a post request


router.post('/upload-images', upload.array('image', 12), async function (req, res, next) {
  console.log(req.files);
  let files = req.files;
  for( let file of files) {
    cloudinary.uploader.upload(file.path,
   async  function(error, result) {
      if(result) {
      fs.unlinkSync(`./${file.path}`);
      let addImage = new Image(Object.assign(req.body, { url : result.url }))
      try{
        const savedImage = await addImage.save();
        res.status(200).json(savedImage);
     } catch(err) {
       res.status(500).json(err);
     }
      }
      console.log('cloudinary response after uploading', result, error)
    });
  }
  res.status(200).send('Ok');
})

module.exports = router;
