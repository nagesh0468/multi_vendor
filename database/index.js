const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("mongoose connected successfully"))
.catch(err => console.log(`connection faild ${err}`))