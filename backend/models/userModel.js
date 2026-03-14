import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true },
    
    // Verification Status
    isVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    
    // Industry-Standard Security Tokens
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    
    // Phone OTP fields
    phoneOTP: String,
    phoneOTPExpires: Date,
  },
  { timestamps: true }
);

// 1. Password Comparison Method (For Login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 2. Password Hashing Middleware (Runs before saving to DB)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 3. THE FIX: Create the model and Export as default
const User = mongoose.model('User', userSchema);

export default User;