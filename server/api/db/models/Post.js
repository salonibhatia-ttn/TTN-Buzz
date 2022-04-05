const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    

    userID:{
        type:String,
        ref:'USER',
        required:true,
     },
     text:{
        type:String,
        maxlength:250,
     },
     images:{
         type: Array,
         ref:'USER',
     },
     like:{
         type:Array,
         ref:'USER',
     },
     dislike:{
         type: Array,
         ref:'USER',

     },
     report:
        { 
          type:Array, //  [{userid:123,date:20.3.21},{userid:121,date:21.3.22},{}]
        }
     ,
     dateCreated:{
         type:Date,
         required:true,
     }
})


const Post = mongoose.model("POST",postSchema);

module.exports= Post;