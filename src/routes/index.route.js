import { Router } from 'express';
import usuariosRouter from './usuarios.route.js';
import recetasRouter from './receta.route.js'
const router = Router();

router.use('/usuarios', usuariosRouter);
router.use("/recetas", recetasRouter);

export default router;