const {Schema} = require("mongoose")

const venderSchema = new Schema({
  name : String,
  vendorType : String,
  email : {
    type : String,
    unique : true
  },
  password : {
    type : String,
    min : 6,
    
  }
},
{
  timestamps : true
})

module.exports = venderSchema