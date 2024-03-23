/**
 * Imports
 **/
const Post = require('../models/post')
const extractUserId = require('../utils/utils')

/**
 * Create post and error handling
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.createPost = async (req, res) => {
  //Extract the token from authorization header
  const token = req.headers.authorization;
  const userId = extractUserId.extractUserIdFromJWT(token);
  // Checking whether authorization had userID or not if not returning 401
  if (!userId) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Check whether any of the field is empty if yes return the 400 error
    if (!req.body.title || !req.body.description || req.body.tags.length == 0) {
      return res.status(400).json({ error: "Title, description, tags are mandatory fields." })
    }

    let newPost = {
      userId: userId,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
    }
    // Create the post and returm the new post
    await Post.create(newPost)
    return res.status(200).json({ ...newPost });

  } catch (err) {
    // Handle other errors
    console.error(err);
    return res.status(500).send("Internal server error");
  }

}

/**
 * Fetch all the post
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.getAllPost = async (req, res) => {
  const posts = await Post.find().populate('userId')
  return res.status(200).json({ posts })
}

/**
 * Get post by ID
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.getPostById = async (req, res) => {
  try {
    // Fetch the post if present create a post object and send as a response
    const post = await Post.findById(req.params.id).populate('userId')
    const newPost = {
      id: post._id, title: post.title, description: post.description, tags: post.tags, username: post.userId.username, post_views: post.page_views, userId: post.userId._id, userAvatar: post.userId.avatar, createAt: post.userId.createdAt
    }
    return res.status(200).json(newPost)
  } catch (err) {
    /**
     * Throw not found error
     */
    return res.status(404).json({ error: "Not found" })
  }
}

/**
 * Delete post by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.deleteById = async (req, res) => {
  // Extract post using params id 
  const token = req.headers.authorization;
  const userId = extractUserId.extractUserIdFromJWT(token);
  const post = await Post.findById(req.params.id).populate('userId')
  // Extracting userId from authorization header and checking whether it matches with userId of user who created the post
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  } else if (post.userId.id !== userId) {
    return res.status(401).json({ error: 'Invalid User' })
  }
  // Delete the post
  const data = await Post.deleteOne({ _id: (req.params.id) })
  return res.status(200).json({ message: 'success' })
}

/**
 * Edit the post by id 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.editPostById = async (req, res) => {
  // Extract userId from authorization header
  const token = req.headers.authorization;
  const userId = extractUserId.extractUserIdFromJWT(token);
  const post = await Post.findById(req.params.id).populate('userId')
    // Extracting userId from authorization header and checking whether it matches with userId of user who created the post
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  } else if (post.userId.id !== userId) {
    return res.status(401).json({ error: 'Invalid User' })
  }
  // Update the post
  post.title = req.body.title
  post.description = req.body.description
  post.tags = req.body.tags
  post.save()
  return res.status(200).json({ message: 'success' })
}
