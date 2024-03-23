const jwt = require('jsonwebtoken');

module.exports.extractUserIdFromJWT = (token)=>{
    try {
      const decodedToken = jwt.verify(token, 'story_156#Scape');
      if (decodedToken.userId){
        return decodedToken.userId;
      }else{
        return decodedToken._id;
      }
       // Assuming 'userId' is the key in the payload containing the user ID
    } catch (error) {
      // Handle token verification error (e.g., invalid token)
      console.error('JWT verification failed:', error.message);
      return null;
    }
  }