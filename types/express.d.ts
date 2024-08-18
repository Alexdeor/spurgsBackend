import { Request } from 'express-serve-static-core';
import User from '../src/models/User';


declare module 'express-serve-static-core' {
  interface Request {
    test?: string;
    // Add other custom properties here
  }
}

declare global {
  namespace Express {
      interface User extends User {}
  }
}