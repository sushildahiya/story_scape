const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const   ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user')

const opts={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'story_156#Scape'
}
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try{
        const user=await User.findOne({email: jwt_payload.email})
           
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);                
            }
        
    }catch(err){
        console.log('Error in finding user in jwt', err);
        return done(err, false);
    }
   
}));


module.exports=passport