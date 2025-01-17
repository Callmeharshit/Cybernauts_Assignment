import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, age, hobbies } = req.body;
        if (!username || !age) {
          res.status(400).json({ message: 'Invalid input' });
          return;
        }
        const newUser = new User({ username, age, hobbies });
        await newUser.save();
        res.status(201).json(newUser);
      } catch (err) {
        const error = err as Error; // Explicitly cast to Error
        res.status(500).json({ message: 'Server error', error: error.message });
      }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const updates = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
  
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json(updatedUser);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(204).send(); // No content
    } catch (err) {
      const error = err as Error; // Cast error to Error type
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };