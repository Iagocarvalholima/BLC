import express from 'express';
import auth from '../domains/auth/ApiRoute';

const router = express.Router();

router.use('/api/auth', auth);

export default router;
