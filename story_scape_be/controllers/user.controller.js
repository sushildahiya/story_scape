const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const path = require('path')
const extractUserId = require('../utils/utils')

/**
 * Check user email uniqueness
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.emailValidation=async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(200).json({message:"Unqiue user"})
    }
    return res.status(409).json({error:"User exists, use a unqiue email."})
}

/**
 * Create a new user after validation of data
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.createUser=async(req,res)=>{
   const user = await User.findOne({email:req.body.email})
   let hashedPassword = ''
   // Data validation
   //Check whether field is empty
   if(req.body.username.length==0 || req.body.email.length==0){
    return res.status(403).json({error:"All the fields are required."})
   }
   //Check if user already exists
   if(user){
    return res.status(409).json({"error":"User already exists"})
   }
   // Compare password and confirm password
   if(req.body.password!==req.body.confirm_password){
    return res.status(403).json({error:"Password's doesn't match."})
   }
   //Validation for length of password
   if(req.body.password.length<8){
    return res.status(403).json({error:"Password length should be atleast 8 characters"})
   }
   //Validation for contact_no length
   if(req.body.contact_no.toString().length<10){
    return res.status(403).json({error:"Contact no can't be less than 10 digits."})
   }

   // hash the password
   hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
   var newUser = await User.create({...req.body,password:hashedPassword})
   
   //create the user and send token and user details as response
   return res.status(200).json({message: 'success',
   userId:newUser._id,
   username:newUser.username,
   email: newUser.email,
   contact_no:newUser.contact_no,
   avatar:newUser.avatar,
   follows:newUser.follows,
     token: jwt.sign(newUser.toJSON(), process.env.JWT_KEY, {
       expiresIn: 60*60*6
     })
})
}

/**
 * Create the user session generating the token if user credentials are valid
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.createSession=async (req,res)=>{
  //Validation for credentials emptiness
  if(!req.body.email || !req.body.password){
    return res.status(400).json({error:"Email and password can't be empty."})
  }
  const user = await User.findOne({email:req.body.email})
  // Check whether user exists or not
  if(!user){
    return res.status(404).json({error:"Email or password is invalid."})
  }else{
    const match = await bcrypt.compare(req.body.password, user.password);
    if(match){
      const userDetails={
        username:user.username,
        email: user.email,
        contact_no:user.contact_no,
        avatar:user.avatar,
        follows:user.follows,
        userId:user._id
      }

      //Generate jwt token and send response of user details
      return res.status(200).json({...userDetails,token: jwt.sign(userDetails, process.env.JWT_KEY, {
        expiresIn: 60*60*6
      })
      })
    }else{
      return res.status(404).json({error:"Email or password is invalid."})
    }
  }
}

/**
 * Upload avatar
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.uploadAvatar = async (req, res) => {
  try {
    const token = req.headers.authorization;
  const userId =  extractUserId.extractUserIdFromJWT(token);
    //Check user id extracted from authorization token
  if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
  }
      const user = await User.findById(userId);
        // Use the Employee model to upload the avatar using Multer middleware
      User.uploadedAvatar(req, res, async function (err) {
          if (err) {
              // Handle Multer errors
              console.log("Multer error: ", err.message);
              return res.status(500).send("Error uploading avatar");
          }
          // Check if a file was successfully uploaded
          if (req.file) {
              // Update the user's avatar path and save to the database
              user.avatar = path.join(User.avatarPath, req.file.filename);

              user.save();
              return res.status(200).json({ message: "success" ,avatar:user.avatar});
          } else {
              // If no file is provided, return a 400 status
              return res.status(400).send("No file provided");
          }
      });
  } catch (err) {
      // Handle other errors
      console.error(err);
      return res.status(500).send("Internal server error");
  }
}


