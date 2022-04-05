const mongoose = require ('mongoose');
const User = require('./User');
const Post = require('./Post')

//CommentSchema
const commentSchema = new mongoose.Schema({
 userId : {
   type: Array,
   ref: 'User',
   required: true
 },
 postId : {
  type: Array,
  ref: 'Post',
  required: true
 },
 text : {
   type: String,
   maxlength: 250,
   required: true
 },
 dateCreated: {
   type: Date,
   required: true
 }
});

const Comment = mongoose.model('COMMENT', commentSchema)
module.exports = Comment;