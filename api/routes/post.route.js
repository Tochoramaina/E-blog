import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { create, deletepost, getposts, updatepost } from '../controllers/post.controller';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getposts)
router.get('/deletepost/:postId/:userId', verifyToken, deletepost)
router.post('/updatepost/:postId/:userId', verifyToken, updatepost)
export default router;