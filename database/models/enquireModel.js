const {model} = require("mongoose")
const enquireSchema = require("../schemas/enquireSchema")

const enquireModel = model("Enquire", enquireSchema)

module.exports = enquireModel;