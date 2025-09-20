require('dotenv').config({
  path : "./config.env"
})
require('./database')
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json({
    statue : "success",
    message : "app working fine"
  })
})
const PORT = process.env.PORT || 4000

const vendorRouter = require("./routes/vendorRoute")
const customerRouter = require("./routes/customerRouter")

app.use("/api/v1/vendor", vendorRouter)
app.use("/api/v1/customer", customerRouter)

app.listen(PORT, () => {
  console.log(`server is up at http://localhost:${PORT}`)
})
