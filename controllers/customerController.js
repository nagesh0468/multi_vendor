const enquireModel = require("../database/models/enquireModel")
const mongoose = require("mongoose");

const createEnquire = async(req, res) => {
  const {name, email, message, vendor } = req.body;

  try {
    const enquire = await enquireModel.create({name, email, message, vendor,  history: [{ status: 'Contacting', note: 'Created by customer' }] })
     
    res.json({
      status : "success",
      message : "enquire sended successful ",
      enquire,
    })

  } catch (error) {
    console.log("vendor", error)
    res.json({
      status : "error",
      message : "something went wrong",
      error
    })
    
  }
}



const getEnquire = async (req, res) => {
  const { email } = req.body; 
  try {
    const enquiries = await enquireModel
      .find({ email })
      .populate("vendor", "-password");

    res.json({
      status: "success",
      message: "Fetched successfully",
      enquiries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getRequest = async(req, res) => {
  const {vendor} = req.params

console.log(req.params)
  try {
    const response = await enquireModel.find({ vendor: new mongoose.Types.ObjectId(vendor) }).populate("vendor", "-password")
    console.log("response", response)
    res.json({
      status : "success",
      message : "data fetched",
      response,
    })
    
  } catch (error) {
    console.log(error)
    res.json({
      status : "error",
      message : "something went wrong",
      error
    })
  }
}

const updateVendor = async(req, res) => {
  const {status, note} = req.body;
  try {
   const enquire = await enquireModel.findById(req.params.id)
    enquire.status = status;
  enquire.history.push({ status, note });
  await enquire.save();
  res.json({
    status : "success",
    message : "status updated"
  })
  } catch (error) {
    console.log("getting error", error)
    
  }
}


module.exports = {
  createEnquire,
  getEnquire,
  updateVendor,
  getRequest
}