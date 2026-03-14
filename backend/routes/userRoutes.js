import express from 'express';
const router = express.Router();
import { 
  registerUser, 
  verifyEmail, 
  forgotPassword, 
  resetPassword,
  authUser,
  resendVerification // New import
} from '../controllers/userController.js';

// Auth & Registration
router.post('/login', authUser);
router.post('/register', registerUser);

// Verification & Recovery
router.get('/verify/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/resend-verify', resendVerification); // New route

export default router;