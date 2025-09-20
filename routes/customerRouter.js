const express = require("express");
const {createEnquire,
  getEnquire,
  updateVendor, getRequest} = require('../controllers/customerController')

  const router = express.Router()

  router.post("/enquire", createEnquire)
  router.post("/get", getEnquire)
  router.put("/update/:id", updateVendor)
  router.get("/getrequest/:vendor", getRequest)

  module.exports = router