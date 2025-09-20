const express = require("express")
const {vendorRegistor, vendorLogin, getVendors} = require("../controllers/venderController")

const router = express.Router()

router.post("/register", vendorRegistor)
router.post("/login", vendorLogin)
router.get("/vendors", getVendors)

module.exports = router