const {model} = require('mongoose')
const venderSchema = require("../schemas/vendorSchema")

const venderModel = model("vendor", venderSchema)

module.exports = venderModel