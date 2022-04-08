const User = require("../api/db/models/User
")

const router =  require("express").Router(); 


// updating user

router.put("/:id", async (req,res)=>{
    if(req.body.userId ===req.body.id || req.user.isAdmin){
        
    }
})