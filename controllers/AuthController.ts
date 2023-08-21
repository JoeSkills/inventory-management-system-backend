import { RequestHandler } from 'express';
import User from '../models/UserModel';
import { createSecretToken } from '../utils/secretToken';
import bcrypt from 'bcrypt';
import jwt, { VerifyCallback } from 'jsonwebtoken';

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { email, username, createdAt } = req.body;

    const password = await bcrypt.hash(req.body.password, 12);

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const user = new User({ email, password, username, createdAt });

    await user.save();

    const token = createSecretToken(user._id);

    res
      .status(201)
      .json({
        message: 'User signed in successfully',
        success: true,
        token,
        user,
      });

    next();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
    console.log((error as Error).message);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ message: 'All fields are required' });

    const user = await User.findOne({ email });

    if (!user) return res.json({ message: 'Incorrect password or email' });

    const auth = await bcrypt.compare(password, user.password as string);

    if (!auth) return res.json({ message: 'Incorrect password or email' });

    const token = createSecretToken(user._id);

    res
      .status(200)
      .json({
        message: 'User logged in successfully',
        success: true,
        token,
        user,
      });
    next();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
    console.log((error as Error).message);
  }
};

export const userVerification: RequestHandler = (req, res) => {
  const token = req.body.token;

  if (!token) return res.json({ status: false });

  const verifyCallback: VerifyCallback = async (err, decoded) => {
    let user;
    const data = decoded as {
      id: string;
      exp: number;
      iat: number;
    };
    if (err) return res.json({ status: false });
    else {
      if (data) user = await User.findById(data.id);
      if (user) return res.status(200).json({ status: true, token });
      else return res.status(500).json({ status: false });
    }
  };

  jwt.verify(token, process.env.TOKEN_KEY as string, verifyCallback);
};
