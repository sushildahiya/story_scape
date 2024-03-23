/**
 * Imports library and models
 */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const   ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user')

/**
 * Configur passport JWT for extraction strategy
 */
const opts={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_KEY
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