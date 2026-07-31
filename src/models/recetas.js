import mongoose, { Schema } from "mongoose";

const RecetaSchema = new Schema(
  {
    nombreReceta: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },

    imagen: {
      type: String,
      required: true,
      validate: (valor) =>
        /^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/.test(valor),
    },
    categoriaRecet: {
      type: String,
      required: true,
      ref: "categoria",
    },
    descripcionRecet: {
      type: String,
      minlength: 100,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Receta = mongoose.model("Receta", RecetaSchema);
export default Receta;
