const {Schema} = require("mongoose")

const enquireSchema = new Schema({
  name : String,
  email : String,
  message : String,
  vendor: { type: Schema.Types.ObjectId, ref: "vendor" },
  status: { 
    type: String, 
    enum: ['Contacting', 'Accepted', 'In Progress', 'Completed', 'Rejected'], 
    default: 'Contacting' 
  },
  history: [{ status: String, note: String, at: { type: Date, default: Date.now } }]
}, {
  timestamps : true
})

module.exports = enquireSchema