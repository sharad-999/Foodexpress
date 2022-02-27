const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/RMS')
    .then(() => console.log("connection sucessful"))
    .catch((err) => console.log(err)); 