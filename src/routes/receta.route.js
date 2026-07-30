import { Router } from "express";
import {
  actualizarParcialReceta,
  borrarReceta,
  crearReceta,
  editarReceta,
  listarRecetas,
  obtenerRecetaId,
  
} from "../controllers/recetas.controllers.js";
import {
  validacionIDReceta,
  validacionReceta,
  validacionRecetaPatch,
} from "../middlewares/validacionReceta.js";
import { autenticador, esAdmin } from "../middlewares/authmiddleware.js";
//import { esAdmin } from "../controllers/usuario.controllers.js";

const router = Router();

router.route("/").post([autenticador,esAdmin,validacionReceta], crearReceta).get([autenticador,esAdmin], listarRecetas);
router
  .route("/:id")
  .get(validacionIDReceta, obtenerRecetaId)
  .delete([autenticador,esAdmin,validacionIDReceta], borrarReceta)
  .put([autenticador,esAdmin,validacionIDReceta, validacionReceta], editarReceta)
  .patch([autenticador,esAdmin,validacionRecetaPatch], editarReceta);
export default router;
