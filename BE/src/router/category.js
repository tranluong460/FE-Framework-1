import express from 'express';
import { create, getAll, get, remove, update } from '../controller/category';

const router = express.Router();
router.post('/category', create);
router.get('/category', getAll);
router.get('/category/:id', get);
router.put('/category/:id', update);
router.delete('/category/:id', remove);

export default router;

