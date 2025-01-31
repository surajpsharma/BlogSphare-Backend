const express = require('express')
const mongoDB = require('./database/db')
const path = require('path')

const app = express()
const port = 4000
mongoDB();
app.post('/',(req,res)=>{
    res.send("Hello Worldd!")
})

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  app.use(express.json())
  app.use(express.urlencoded({ extended: true })); 
  app.use('/api',require("./Routes/CreateUser"))
  app.use('/api',require("./Routes/DisplayBlogs"))
  app.use('/api',require("./Routes/DisplayComment"))
  app.use('/api',require("./Routes/DisplayProfiles"))
  app.use('/api',require("./middleware/uploads"))
  app.use('/images', express.static('uploads'));

app.listen(port,()=>{
    console.log(`App listining on port ${port}`)
})
