
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,

    },
    lastName:{
        type: String,
        required:true,

    },
    isAdmin:{
        type: Boolean,
        required:true,

    },
    userEmailId:{
        type:String,
        required:true,
        unique:true,

    },
    userStatus:{
        type: Boolean,
    },
    isLoggedIn:{
        type: Boolean,
    },
    profilePicture:{
        type:String,
    },
    coverPicture:{
        type:String,
    },
    userFriendList:{
        type: Array,
        ref:'USER'
        
    },
    friendRequest:{
        type: Array,
        ref:'USER'
    },
    profileViews:{
        type: Number,
      
    },

    
})


const User = mongoose.model("USER",userSchema);

module.exports = User;