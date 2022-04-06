// 
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connecting database using mongoose

const DB = "mongodb+srv://sandeep02bhatt:tothenew@cluster0.uf9e0.mongodb.net/TTN_BUZZ?retryWrites=true&w=majority";


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

