import { Request, Response, NextFunction } from 'express';

// Extend the Express Request interface to include a custom 'test' property
declare module 'express-serve-static-core' {
  interface Request {
    test?: string;
  }
}