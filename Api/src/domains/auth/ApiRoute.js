import express from 'express';
import Auth from './ApiController';

let router = express.Router();

router.post('/', Auth.login);
router.post('/create-account', Auth.createAccount);

export default router;
