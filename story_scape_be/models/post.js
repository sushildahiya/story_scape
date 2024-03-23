const mongoose = require('mongoose')

/**
 * Schema of a post
 */
const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required:true
    },
   
    page_views:{
        type: Number,
        default: 6
    }
},{
    timestamps:true
})
// Create a model for post schema
const Post = mongoose.model('Post',postSchema)
module.exports=Post