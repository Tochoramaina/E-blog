import express from 'express';
import { signup, signin} from '../controllers/auth.controllers.js';

const router = express.Router(); 
router.post('/signup', signup);
router.post('sign-in', signin)

export default router;