import 'dotenv/config';
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userModel } from '../models/user.model.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/users/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google strategy callback reached');
    console.log('Profile:', profile);
    
    let user = await userModel.findOne({ googleId: profile.id });
    
    if (!user) {
      console.log('Creating new user');
      user = new userModel({
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0].value,
        // No password for Google OAuth users
      });
      await user.save();
    } else {
      console.log('User found:', user);
    }
    
    return done(null, user);
  } catch (error) {
    console.error('Error in Google strategy:', error);
    return done(error, null);
  }
}
));

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user:', id);
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});

export default passport;