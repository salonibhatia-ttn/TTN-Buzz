const mongoose = require('mongoose');
const express = require('express');
const app = express();


//Listening on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});