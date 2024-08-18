import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = express.Router(); 


router.post('/login', (req: Request,res:Response,next:NextFunction)=>{
    passport.authenticate('local', (err: Error, user: any, info: any)=>{
        if(err){
            return next(err); 
        }
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        req.logIn(user, (err)=>{
            if(err){
                return next(err);
            }
            return res.status(200).json({message: 'Login successful', user})
        });
    })(req,res,next);
});

router.get('/login', (req, res)=> {
    res.send('Login page.')
  })

export default router; 