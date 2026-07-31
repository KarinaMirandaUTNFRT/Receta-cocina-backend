import { body, param } from "express-validator";
import resultadovalidacion from "./resultadoValidacion.js";
import Receta from "../models/recetas.js";

const reglasReceta = [
  body("nombreReceta")
    .isString()
    .withMessage("El nombre del receta debe ser un string")
    .custom(async (valor, { req }) => {
      
      
      const { imagen, descripcion } = req.body;

      
      const recetaIdentica = await Receta.findOne({
        nombreReceta: valor,
        imagen,
        descripcion,
      });
       if (!recetaIdentica) {
        return true;
       }  
      if (req.params?.id && recetaIdentica._id.toString() === req.params.id) {
        return true;
      }
      throw new Error(
        "El nombre del receta ya existe en la base de datos, debes crear un nombre nuevo",
      );
    }),

    body("imagen")
    .isString()
    .withMessage("El nombre del la imagen debe ser un string")
    .matches(/^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/)
    .withMessage(
      "la imagen debe ser una URL valida con extension:jpg|jpeg|png|webp|avif|svg ",
    ),
  body("descripcion")
    .isString()
    .withMessage("La descripcion  de la imagen debe ser un string")
    .isLength({ min: 10, max: 500 })
    .withMessage("el numero del receta debe tener entre 10 y 500 caracteres"),
];
export const validacionReceta = [
  ...reglasReceta.map((regla) =>
    regla.notEmpty().withMessage("Este campo es obligatorio"),
  ),
  resultadovalidacion,
];

export const validacionRecetaPatch = [
  ...reglasReceta.map((regla) => regla.optional({ value: "falsy" })),
  resultadovalidacion,
];
export const validacionIDReceta = [
  param("id")
    .isMongoId()
    .withMessage("Este formato de ID no corresponde a un formato de Mongo"),
];
