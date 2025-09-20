const Vendor = require("../database/models/venderModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const vendorRegistor = async (req, res) => {
  const {email, password, name, vendorType} = req.body;
  try {
     const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = await Vendor.create({email, password : hashedPassword, name, vendorType})

  res.json({
    status : "success",
    message : "register successful",
    data: {
        id: vendor._id,
        email: vendor.email,
        name: vendor.name,
      },
  })
    
  } catch (error) {
    console.log("something went wrong", error)
    res.json({
      status : "error",
      message : "something went wrong",
      error,
    })
  }
  

}

const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

   
    const token = jwt.sign(
      { vendorId: vendor._id, email: vendor.email },
      process.env.JWT_SECRET || "SUPER_SECRET",
      { expiresIn: "8h" }
    );

   
    res.json({
      status: "success",
      message: "Login successful",
      token,
      data: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().select("-password")

    res.json({
      status : "success",
      message : "vendors are getting successful",
      vendors
    })
    
  } catch (error) {
    console.log("failed to fetch the vendor", error)
    res.json({
      status : "error",
      message : "failed to fetch list",
      error
    })
  }
}

module.exports = {
  vendorLogin,
  vendorRegistor,
  getVendors
}