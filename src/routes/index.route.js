import { Router } from 'express';
import usuariosRouter from './usuarios.route.js';

const router = Router();

router.use('/usuarios', usuariosRouter);

export default router;