// In your app.ts or routes/user.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    console.log(user)

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

router.get('/register', (req, res)=> {
  res.send('Registration page.')
})
export default router;
