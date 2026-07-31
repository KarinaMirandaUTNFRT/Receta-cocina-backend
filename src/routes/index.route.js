import { Router } from 'express';
import usuariosRouter from './usuarios.route.js';
import recetasRouter from './receta.route.js'
import categoriaRouter from './categoria.route.js';

const router = Router();

router.use('/usuarios', usuariosRouter);
router.use("/crear", recetasRouter);
router.use('/categorias', categoriaRouter);

export default router;