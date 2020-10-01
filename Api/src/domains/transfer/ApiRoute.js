import express from 'express';
import Transfer from './ApiController';

let router = express.Router();

router.post('/create', Transfer.create);
router.get('/:id', Transfer.list)

export default router;
