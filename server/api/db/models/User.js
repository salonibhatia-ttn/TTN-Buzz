
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        default:false, 

    },
    userEmailId:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required: true,
    },
    userStatus:{
        type: Boolean,
    },
    isLoggedIn:{
        type: Boolean,
        default:false,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:"",
    },
    userFriendList:{
        type: Array,
        // ref:'User'
        default:[],
        
    },
    friendRequest:{
        type: Array,
        // ref:'User'
    },
    profileViews:{
        type: Number,
      
    },
    Google:{},

    
})


const User = mongoose.model('User',UserSchema);

module.exports = User;