// api/controllers/auth.controller.js
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) return next(errorHandler(404, 'User not found'));
     const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect)
      return next(errorHandler(401, 'Invalid email or password'));

    const token = jwt.sign({ id: user._id }, "jwt_secret_key"); // You can replace this with process.env.JWT if using .env

    const { password: pass, ...rest } = user._doc;
   res
  .status(200)
  .cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'Lax',     
  })
  .json(rest);

  } catch (error) {
    return next(errorHandler(404, error));
  
  }
};
