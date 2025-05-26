import bcrypt from 'bcrypt';
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
