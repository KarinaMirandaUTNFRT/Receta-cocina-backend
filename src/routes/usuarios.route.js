import { Router } from 'express';

const router = Router();

// Endpoint para crear usuario (POST /usuarios)
router.post('/', (req, res) => {
  res.json({ mensaje: 'Ruta de creación de usuario lista' });
});

export default router;