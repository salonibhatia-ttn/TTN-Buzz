const mongoose = require ('mongoose');
const Post = require('./Post');

//ImageSchema 
const imageSchema = new mongoose.Schema({
 postId : {
   type: String,
   ref: 'Post',
   required: true
 },
 url : {
   type: String,
   required: true
 },
 dateCreated : {
   type: Date, 
   //required:true
 }
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;