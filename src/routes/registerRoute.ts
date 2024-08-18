// In your app.ts or routes/user.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {

    const existingUser = await User.findOne({where: {username}});
    if(existingUser){
      return res.status(400).json({message: 'Username already taken.'});
    }

    const saltRounds = parseInt(process.env.SALT as string, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

router.get('/register', (req, res)=> {
  res.send('Registration page.')
})
export default router;
