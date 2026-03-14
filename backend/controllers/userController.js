import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto'; // Built-in Node tool for secure random strings

export const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Generate a secure, random 64-character Verification Token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // 3. Create the User (isVerified will be false by default)
    const user = await User.create({
      name,
      email,
      password,
      phone,
      emailVerificationToken: verificationToken,
    });

    if (user) {
      // 4. Construct the Verification Link
      // This link will eventually point to your Frontend
      const verificationUrl = `http://localhost:5173/verify-email/${verificationToken}`;

      const message = `
        Welcome to NexusMart, ${user.name}! 
        To complete your registration, please verify your email by clicking the link below:
        ${verificationUrl}
      `;

      // 5. Send the Email
      try {
        await sendEmail({
          email: user.email,
          subject: 'Verify your NexusMart Account',
          message: message,
        });
      } catch (emailError) {
        console.error("Email failed to send:", emailError);
      }

      // 6. Response
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        message: 'Registration successful! Check your email to verify.',
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Verify email
// @route   GET /api/users/verify/:token
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    // 1. Find the user with this specific token
    const user = await User.findOne({ 
      emailVerificationToken: req.params.token 
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // 2. Update user status and clear the token
    user.isVerified = true;
    user.emailVerificationToken = undefined; // Token is one-time use
    await user.save();

    // 3. Response (Usually redirects to a "Success" page on the frontend)
    res.status(200).json({ 
      message: 'Email verified successfully! You can now access all features.' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error during verification' });
  }
};
// @desc    Forgot Password - Send OTP
// @route   POST /api/users/forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    // 1. Generate 6-Digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Set OTP and Expiry (10 minutes)
    user.passwordResetToken = otp;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();

    // 3. Send the Email
    const message = `Your password reset OTP is: ${otp}. It expires in 10 minutes.`;
    
    await sendEmail({
      email: user.email,
      subject: 'NexusMart Password Reset OTP',
      message,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP' });
  }
};
// @desc    Reset Password using OTP
// @route   POST /api/users/reset-password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // 1. Find user with valid OTP and check if expired
    const user = await User.findOne({
      email,
      passwordResetToken: otp,
      passwordResetExpires: { $gt: Date.now() }, // $gt means "Greater Than"
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // 2. Update Password (The pre-save hook in your model will hash this automatically!)
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};
// @desc    Auth user & get token
// @route   POST /api/users/login
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // INDUSTRY CHECK: Block login if not verified
    if (!user.isVerified) {
      return res.status(401).json({ 
        message: 'Please verify your email before logging in.' 
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
// @desc    Resend verification email
// @route   POST /api/users/resend-verify
export const resendVerification = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'This account is already verified.' });
    }

    // 1. Generate a fresh Token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = verificationToken;
    await user.save();

    // 2. Send the new link
    const verificationUrl = `http://localhost:5173/verify-email/${verificationToken}`;
    const message = `We heard you needed a new link! Verify your account here: ${verificationUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Resend: Verify your NexusMart Account',
      message: message,
    });

    res.status(200).json({ message: 'Verification email resent! Check your inbox.' });
  } catch (error) {
    res.status(500).json({ message: 'Error resending email' });
  }
};