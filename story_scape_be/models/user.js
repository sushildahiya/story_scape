const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs')
const path = require('path');
const AVATAR_PATH = path.join('uploads/users/avatars');

/**
 * Schema for user s
 */
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    contact_no:{
        type: Number,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    follows:{
        type:Array,
        default:[]
    },
    avatar:{
        type:String,
        default:''
    }
},{
    timestamps:true
})

/**
 * Multer configuration for file type storage
 */
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
         //Check whether the directory exists or not
         if(!fs.existsSync(path.join(__dirname, '..', AVATAR_PATH))){
            //If directory doesn't exists creates a directory synchronously
            fs.mkdirSync(path.join(__dirname, '..', AVATAR_PATH), { recursive: true })
        }

      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

userSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema)
module.exports = User