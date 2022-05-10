const mongoose = require('mongoose');
const User = require('./User');
const { Image, imageSchema } = require('./Image');
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
         type: [imageSchema],
         //ref: 'Image'
         //required: true
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
     dateCreated:{
         type:Date,
         //immautable: true
        
     }
}); 


const Post = mongoose.model("Post",postSchema);

module.exports= Post;