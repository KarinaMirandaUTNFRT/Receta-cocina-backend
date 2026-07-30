import { Router } from 'express';
import { registrarUsuario } from '../controllers/usuario.js';
const router = Router();

// Endpoint para crear usuario (POST /usuarios)
router.post('/', registrarUsuario);

export default router;