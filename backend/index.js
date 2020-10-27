const express = require('express')
const mongoose= require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT||5000

app.listen(PORT, ()=>{
    console.log("Server started on port: ", PORT);
})


//mongodb+srv://maker:<password>@main.iyrvd.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB_CSTRING, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true},
    (err)=>{
        if(err) throw err;
        else console.log("Mongodb connected");
    })
//set up route
app.use("/users",require("./routes/userRouter"))