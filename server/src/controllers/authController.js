import { User } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // better UX message, Db constraints should be last
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      return res.status(400).json({ message: 'Email already Registerd!' });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ name, email, passwordHash, role });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists!' });
    }
    console.log('Registration Error: ', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "This email isn't registered yet :/" });
    }
    //compare pass
    const isMatch = bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password :(' });
    }
    //create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );
    //send res
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.log('Login error: ', err);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

export const me = async (req, res) => {
  //from middleware
  const userId = req.user.userId;

  const user = await User.findById(userId).select('name, role');
  if (!user) {
    return res.status(404).json({ message: 'User is not found' });
  }

  res
    .status(200)
    .json({ user: { id: user._id, name: user.name, role: user.role } });
};
