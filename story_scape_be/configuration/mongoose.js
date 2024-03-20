const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0/story_scape',{  useNewUrlParser: true,
useUnifiedTopology: true })

const db = mongoose.connection

db.on('error',(err)=>console.log('Error ',err.message))
db.once('open',()=>console.log("Connection to db established"))