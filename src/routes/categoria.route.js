import { Router } from "express";
import { crearCategoria, listarCategorias } from "../controllers/categoria.js";

const router = Router();

router.post("/", crearCategoria);
router.get("/", listarCategorias);

export default router;