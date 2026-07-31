import { Router } from "express";
import {
  registrarUsuario,
  login,
  verificarCuenta,
  solicitarNuevoCodigo,
  logout
} from "../controllers/usuario.js";

const router = Router();

// Endpoint para crear usuario (POST /usuarios)
router.post("/", registrarUsuario);
router.post("/login", login);
router.post("/verificar-cuenta", verificarCuenta);
router.post("/nuevo-codigo", solicitarNuevoCodigo);
router.post("/logout", logout);
export default router;
