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
    const{termino,pagina,cantReceta} = req.query
  
    const paginanumero = parseInt(pagina)
    const limite = parseInt(cantReceta)
    const salto = (paginanumero-1) * limite
    const query = {}

    if(termino){
      query.nombreReceta = {$regex:termino,$options:"i"}
    }
   
    const [recetas, cantidadTotal] = await Promise.all ([
      Receta.find(query).populate('categoria', 'nombreCat  descripcionCat').skip(salto).limit(limite),
      Receta.countDocuments(query)

    ])
    res.status(200).json({
      recetas,
      cantidadTotal,
      paginaActual:paginaNumero,
      totalpaginas:Math.ceil(cantidadTotal / limite)
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "ocurrio un error al listar los recetas" });
  }
};
export const crearReceta = async (req, res) => {
  try {
    const nuevoReceta = new Receta(req.body);
    await nuevoReceta.save();
    res
      .status(201)
      .json({ mensaje: "La receta fue creado con éxito", nuevoReceta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al crear la receta" });
  }
};
export const editarReceta = async (req, res) => {
  try {
    // 1. Buscamos por el ID que viene en la URL y le pasamos los datos nuevos del req.body
    // { new: true } sirve para que MongoDB nos devuelva el documento YA modificado
    const recetaActualizado = await Receta.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // 2. Si el ID no existía en la base de datos, avisamos
    if (!recetaActualizado) {
      return res.status(404).json({ mensaje: "No se encontró la receta para editar" });
    }

    // 3. Si todo salió bien, respondemos con éxito y el objeto editada
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
    // Mongoose es inteligente: si en req.body solo viene el precio, solo actualiza el precio
    const recetaActualizado = await Receta.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Para que devuelva el objeto ya cambiado
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
    // Buscamos por el ID de la URL y lo eliminamos en el acto
    const recetaEliminado = await Receta.findByIdAndDelete(req.params.id);

    // Si el ID no existía en la base de datos, avisamos
    if (!recetaEliminado) {
      return res.status(404).json({ mensaje: "No se encontró la receta que querés borrar" });
    }

    // Si todo salió bien, respondemos con éxito
    res.status(200).json({
      mensaje: "La receta fue eliminado con éxito",
      recetaEliminado // Opcional: devolvemos el objeto que se borró
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al intentar borrar la receta" });
  }
};