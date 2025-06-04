// api/utils/verifyUser.js
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

const JWT_SECRET = 'irshad_secret_key_123'; // Or use process.env.JWT_SECRET

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));
    req.user = user;
    next();
  });
};
