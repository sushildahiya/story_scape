const Post = require('../models/post')
const extractUserId = require('../utils/utils')

module.exports.createPost = async (req, res) => {
  const token = req.headers.authorization;
  const userId = extractUserId.extractUserIdFromJWT(token);

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" })
  }
  if (!userId) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {

    // Use the Employee model to upload the avatar using Multer middleware
    if (!req.body.title || !req.body.description || req.body.tags.length == 0) {
      return res.status(400).json({ error: "Title, description, tags are mandatory fields." })
    }


    let newPost = {
      userId: userId,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
    }
    // Check if a file was successfully uploaded
    await Post.create(newPost)
    return res.status(200).json({ ...newPost });

  } catch (err) {
    // Handle other errors
    console.error(err);
    return res.status(500).send("Internal server error");
  }

}

module.exports.getAllPost = async (req, res) => {
  const posts = await Post.find().populate('userId')
  return res.status(200).json({ posts })
}

module.exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId')
    const newPost = {
      id: post._id, title: post.title, description: post.description, tags: post.tags, username: post.userId.username, post_views: post.page_views, userId: post.userId._id, userAvatar: post.userId.avatar, createAt: post.userId.createdAt
    }
    return res.status(200).json(newPost)
  } catch (err) {
    return res.status(404).json({ error: "Not found" })
  }
}

module.exports.deleteById = async (req, res) => {
  const token = req.headers.authorization;
  const userId = extractUserId.extractUserIdFromJWT(token);
  const post = await Post.findById(req.params.id).populate('userId')
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  } else if (post.userId.id !== userId) {
    return res.status(401).json({ error: 'Invalid User' })
  }
  const data = await Post.deleteOne({ _id: (req.params.id) })
  return res.status(200).json({ message: 'success' })
}

module.exports.editPostById = async (req, res) => {
  console.log("----------------")
  const token = req.headers.authorization;
  const userId = extractUserId.extractUserIdFromJWT(token);
  const post = await Post.findById(req.params.id).populate('userId')
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  } else if (post.userId.id !== userId) {
    return res.status(401).json({ error: 'Invalid User' })
  }
  post.title = req.body.title
  post.description = req.body.description
  post.tags = req.body.tags
  post.save()
  return res.status(200).json({ message: 'success' })

}
