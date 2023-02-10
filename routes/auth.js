import express from 'express';
import {
  login,
  register,
  logout,
  addEmotions,
  update,
} from '../controllers/auth.js';

//creating routes
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.put('/addemotions', addEmotions);
router.get('/update', update);

export default router;
