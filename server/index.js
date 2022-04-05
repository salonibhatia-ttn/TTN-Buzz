const mongoose = require('mongoose');
const express = require('express');
const app = express();



app.get("/", (req,res)=>{
  res.send("hello world from routes");
})

// connecting wtih react
app.post("/post",(req,res)=>{
  // res.send("hello world");
  console.log("connected to React");
  res.redirect("/");
})

//Listening on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});