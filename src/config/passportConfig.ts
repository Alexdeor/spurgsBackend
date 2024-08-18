import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt'; 
import User from '../models/User';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password', 
        },
        async (username, password, done) =>{
            try{
                const user = await User.findOne({where: {username}});
                if(!user){
                    return done(null, false, {message: 'Incorrect username.'})
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch){
                    return done(null, false, {message: 'Incorrect password.'})
                }
                return done(null,user);
            }catch(error){
                return done(error); 
            }
        }
    )
);
passport.serializeUser((user, done)=>{
    done(null, (user as User).id);
});

passport.deserializeUser(async(id: number | string ,done)=>{
    try{
        const user = await User.findByPk(id);
        if(!user){
            return done(null, false);
        }
        done(null,user);
    }catch (error){
        done(error); 
    }
});

export default passport; 