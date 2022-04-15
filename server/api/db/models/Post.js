const mongoose = require('mongoose');
const User = require('./User');

const postSchema = new mongoose.Schema({
    

    userID:{
        type:String,
        ref:'User',
        required:true,
     },
     text:{
        type:String,
        maxlength:250,
     },
     images:{
         type: Array,
         ref:'Image',
     },
     like:{
         type:Array,
         ref:'User',
     },
     dislike:{
         type: Array,
         ref:'User',

     },
     report:
        { 
          type:Array, //  [{userid:123,date:20.3.21},{userid:121,date:21.3.22},{}]
        }
     ,
     createdAt:{
         type:Date,
         immautable: true
        
     }
}, {timestamps: true}); 


const Post = mongoose.model("Post",postSchema);

module.exports= Post;