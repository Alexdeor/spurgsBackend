import express, {Application, Request, Response} from 'express';
import sessionConfig from './config/session'
import  registerRoute  from './routes/registerRoute';
import passport from './config/passportConfig';
import loginRoute from './routes/loginRoute'
import socketConfig from './config/wsConfig';
import http from 'http';
import WebSocket, {WebSocketServer} from 'ws';
import errorHandler from './middleware/errorHandler'; 
import csrf from 'csurf';
import limiter from './middleware/limiter'; 

const csrfProtection = csrf({ cookie: true });


require('dotenv').config();

const app: Application = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server})
const port = process.env.PORT || 3001;

socketConfig(wss)
// Initialize Redis store correctly
app.use(csrfProtection);
app.use(express.json());
app.use(sessionConfig())


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions

// Basic route to test the server
app.get('/', (req: Request, res: Response) => {
    res.send('Server with Redis session storage is up and running!');
});

app.use('/register', csrfProtection, limiter);
app.use('/login', csrfProtection, limiter);
// Apply CSRF protection to routes that modify data

app.use('/', registerRoute);
app.use('/', loginRoute);


app.use(errorHandler)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
