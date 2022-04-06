// 
const dotenv = require("dotenv");
const express = require('express');
const app = express();
const mongoose = require('mongoose');


dotenv.config({path:'./config.env'});
// connecting database using mongoose

const DB = process.env.DATABASE;


mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>console.log(`no connection`));

app.use(express.json());


// assigning port  number
const PORT = process.env.PORT || 3001;


app.get("/", (req,res)=>{
    res.send("hello world");
})



app.listen(PORT, console.log(`Server on port ${PORT}`));

