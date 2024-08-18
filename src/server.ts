import express, {Application, Request, Response} from 'express';
import sessionConfig from './config/session'
import  registerRoute  from './routes/registerRoute';
import passport from './config/passportConfig';
import loginRoute from './routes/loginRoute'

require('dotenv').config();

const app: Application = express();
const port = process.env.PORT || 3001;


// Initialize Redis store correctly
app.use(express.json());
app.use(sessionConfig())


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions

// Basic route to test the server
app.get('/', (req: Request, res: Response) => {
    res.send('Server with Redis session storage is up and running!');
});
app.use('/', registerRoute);
app.use('/', loginRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
