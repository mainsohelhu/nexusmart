import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { sendVerificationEmail } from '../utils/sendEmail.js';

export const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // 1. Create User (unverified)
  const verificationToken = Math.random().toString(36).substring(2, 15);
  
  const user = await User.create({
    name,
    email,
    password,
    phone,
    emailVerificationToken: verificationToken
  });

  if (user) {
    // 2. Trigger Email Flow (Async)
    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (error) {
      console.error("Email failed to send, but user created.");
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'Registration successful! Please check your email to verify your account.',
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};