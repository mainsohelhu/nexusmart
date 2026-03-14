import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  // This signs a new token using your JWT_SECRET from the .env file
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The user stays logged in for 30 days
  });
};

export default generateToken;