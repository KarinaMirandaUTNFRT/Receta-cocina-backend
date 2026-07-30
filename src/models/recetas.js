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
      type: Schema.Types.ObjectId,
      required: true,
      ref: "categoria",
    },
    descripcionRecet: {
      type: String,
      minlength: 10,
      maxlength: 500,
      required: true,
    },
  },
  {
    timestamps: true, //tengo la fecha y hora de creacion y actualizacion
  },
);
const Receta = mongoose.model("Receta", RecetaSchema);
export default Receta;
