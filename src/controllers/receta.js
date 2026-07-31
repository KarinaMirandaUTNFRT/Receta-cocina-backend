import Receta from "../models/recetas.js";
export const obtenerRecetaId = async (req, res) => {
  try {
    console.log(req.params.id);
    const recetaBuscado = await Receta.findById(req.params.id);
        if (!recetaBuscado) {
      return res
        .status(404)
        .json({ mensaje: "no se encontro la receta por id" });
    }
    res.status(200).json(recetaBuscado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "ocurrio un error al buscar una receta por id" });
  }
};
export const listarRecetas = async (req, res) => {
  try {
    const Recetas = await Recetas.find().populate('categoria', 'nombreCat ')
    res.status(200).json(recetas);    

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "ocurrio un error al listar los recetas" });
  }
};
export const crearReceta = async (req, res) => {
  try {
    const nuevaReceta = new Receta(req.body);
    await nuevaReceta.save();
    res
      .status(201)
      .json({ mensaje: "La receta fue creada con éxito", nuevaReceta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al crear la receta" });
  }
};
export const editarReceta = async (req, res) => {
  try {
  
    const recetaActualizado = await Receta.findByIdAndUpdate(req.params.id, req.body, { new: true });


    if (!recetaActualizado) {
      return res.status(404).json({ mensaje: "No se encontró la receta para editar" });
    }

    res.status(200).json({
      mensaje: "La receta fue editada con éxito",
      recetaActualizado
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al intentar editar la receta" });
  }
};
export const actualizarParcialReceta = async (req, res) => {
  try {
  
    const recetaActualizado = await Receta.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );

    if (!recetaActualizado) {
      return res.status(404).json({ mensaje: "No se encontró la receta" });
    }

    res.status(200).json({
      mensaje: "Receta actualizado parcialmente con éxito",
      recetaActualizado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al aplicar el PATCH" });
  }
};
export const borrarReceta = async (req, res) => {
  try {
    
    const recetaEliminado = await Receta.findByIdAndDelete(req.params.id);

    if (!recetaEliminado) {
      return res.status(404).json({ mensaje: "No se encontró la receta que querés borrar" });
    }

   
    res.status(200).json({
      mensaje: "La receta fue eliminado con éxito",
      recetaEliminado 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al intentar borrar la receta" });
  }
};