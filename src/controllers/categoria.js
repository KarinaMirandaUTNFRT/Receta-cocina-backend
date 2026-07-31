import Categoria from "../models/categoria.js";

// Crear una nueva categoría
export const crearCategoria = async (req, res) => {
  try {
    const { nombreCategoria } = req.body;

    // Verificar si ya existe
    const categoriaExistente = await Categoria.findOne({ nombreCategoria });
    if (categoriaExistente) {
      return res
        .status(400)
        .json({ mensaje: "Esta categoría ya existe" });
    }

    const nuevaCategoria = new Categoria({ nombreCategoria });
    await nuevaCategoria.save();

    res.status(201).json({
      mensaje: "Categoría creada con éxito",
      nuevaCategoria,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al crear la categoría" });
  }
};

// Obtener todas las categorías
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al listar las categorías" });
  }
};