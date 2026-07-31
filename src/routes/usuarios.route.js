import { Router } from 'express';
import { 
    registrarUsuario,
    login,
verificarCuenta,
solicitarNuevoCodigo
} from '../controllers/usuario.js';


const router = Router();

// Endpoint para crear usuario (POST /usuarios)
router.post('/', registrarUsuario);
router.post('/login', login);
router.post('/verificar-cuenta', verificarCuenta);
router.post('/nuevo-codigo', solicitarNuevoCodigo);

export default router;