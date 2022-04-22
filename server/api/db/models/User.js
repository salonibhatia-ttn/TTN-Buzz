
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

    
})

// generating tokens

UserSchema.methods.generateAuthToken = async function(){
  try{
    //   console.log(this._id);
    const token = jwt.sign({_id:this._id.toString()}, process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({token:token})
       // console.log(token);
    await this.save();
    return token;
  }catch (error){
      res.send("the error part" + error);
      console.log("the error part"+ error);
  }
}


const User = mongoose.model('User',UserSchema);

module.exports = User;