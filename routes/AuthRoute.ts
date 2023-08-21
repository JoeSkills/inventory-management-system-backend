import express from 'express';
import { login, signup, userVerification } from '../controllers/AuthController';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/', userVerification);

export default router;
