import bcrypt from "bcryptjs";

const usuarioSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No permite correos duplicados en la base de datos
      lowercase: true,
      trim: true,
      validate: {
        validator: (valor) => {
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
            valor,
          );
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (valor) => {
          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,50}$/.test(
            valor,
          );
        },
      },
    },
    
    verificado: {
      type: Boolean,
      default: false,
    },
    codigoVerificacion: {
      type: String,
    },
    fechaExpiracionCodigo: {
      type: Date,
    },
  },

  {
    timestamps: true, //tengo la fecha y hora de creacion y actualizacion
  },
);
usuarioSchema.pre("save", async function () {
  const usuario = this;
  if (!usuario.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
  } catch (error) {
    console.error(error);
    throw error;
  }
});
const Usuario = mongoose.model("usuario", usuarioSchema); //vinculo elusuarioSchema con la DB
export default Usuario;

import mongoose, { Schema } from "mongoose";
