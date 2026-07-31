import { Router } from 'express';
import { registrarUsuario } from '../controllers/usuario.js';
import { login} from '../controllers/usuario.js'
const router = Router();

// Endpoint para crear usuario (POST /usuarios)
router.post('/', registrarUsuario);
router.post('/login', login);

export default router;