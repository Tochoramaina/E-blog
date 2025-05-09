import express from 'express';
import { signup, signin, google} from '../controllers/auth.controllers.js';

const router = express.Router(); 
router.post('/signup', signup);
router.post('sign-in', signin);
router.post('/google', google)

export default router;