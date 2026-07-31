import mongoose, { Schema } from "mongoose";

const categoriaSchema = new Schema(
  {
    nombreCat: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    
  },
  {
    timestamps: true,
  },
);
const Categoria = mongoose.model("categoria", categoriaSchema);

export default Categoria;
