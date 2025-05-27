import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User  from '../models/user.js';

export async function registerUser({ name, email, password, role }) {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error('User already exists.');
    error.status = 409;
    throw error;
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'user',
  });
  const userResponse = user.toJSON();
  delete userResponse.password;
  return userResponse;
}

export async function loginUser(email, password) {
  if (!email || !password) {
    const error = new Error('Email and password are required.');
    error.status = 400;
    throw error;
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error('Invalid credentials.');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const error = new Error('Invalid credentials.');
    error.status = 401;
    throw error;
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' }
  );
  const userResponse = user.toJSON();
  delete userResponse.password;
  return { token, user: userResponse };
}
