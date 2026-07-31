import { token } from "morgan";
import Usuario from "../models/usuario.js";
import transporter from "../utils/mailer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarioNuevo = await Usuario.find();
    res.status(201).json({ mensaje: "aqui creo un usuario" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al crear  el usuario" });
  }
};
export const obtenerUsuarioId = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    if (!usuarioBuscado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el usuario buscado" });
    }
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al buscar el usuario por ID" });
  }
};
export const crearUsuario = async (req, res) => {
  try {
    const emailExistente = await Usuario.findOne({ email: req.body.email });
    if (emailExistente) {
      return res
        .status(400)
        .json({ mensaje: "Este correo electrónico ya está registrado" });
    }

    const nuevoUsuario = new nuevoUsuario(req.body);
    await Usuario.save();
    res.status(201).json({
      mensaje: "El usuario fue creado con éxito",
      nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al crear el usuario" });
  }
};
export const editarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!usuarioActualizado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el usuario para editar" });
    }
    res.status(200).json({
      mensaje: "El usuario fue modificado con éxito",
      usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al intentar editar el usuario" });
  }
};
export const borrarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el usuario que querés borrar" });
    }
    res.status(200).json({
      mensaje: "El usuario fue eliminado con éxito",
      usuarioEliminado,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al intentar borrar el usuario" });
  }
};
export const editarParcialUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!usuarioActualizado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el usuario que querés editar" });
    }

    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al intentar actualizar el usuario" });
  }
};
export const registrarUsuario = async (req, res) => {
  try {
    const { nombreUsuario, email, password, rol } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res
        .status(409)
        .json({ mensaje: "El email enviado ya esta registrado" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const codigoVerificacion = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const fechaExpiracionCodigo = new Date(Date.now() + 15 * 60 * 1000);

    const datosUsuario = {
      nombreUsuario,
      email,
      password,
      codigoVerificacion,
      fechaExpiracionCodigo,
    };
    if (typeof rol === "string" && rol.trim() !== "") {
      datosUsuario.rol = rol.toLowerCase();
    }

    const usuarioNuevo = await Usuario.create(datosUsuario);

    await transporter.sendMail({
      from: '"Recetas" <no-reply@Recetas.com>',
      to: datosUsuario.email,
      subject: "🔑 Código de Verificación de Cuenta",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">¡Hola, ${datosUsuario.nombreUsuario}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Gracias por registrarte. Para activar tu cuenta y poder ingresar a la plataforma, por favor utiliza el siguiente código de verificación:
          </p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 4px; color: #007bff;">
            ${codigoVerificacion}
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">
            Este código vencerá en 15 minutos. Si no solicitaste este registro, puedes ignorar este correo de forma segura.
          </p>
        </div>
      `,
    });

    res.status(201).json({ mensaje: "El usuario fue creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrio un error al registrar usuarios" });
  }
};
export const verificarCuenta = async (req, res) => {
  try {
    const { email, codigo } = req.body;

    const usuarioBuscado = await Usuario.findOne({ email });
    if (!usuarioBuscado) {
      return res
        .status(404)
        .json({ mensaje: "no se ha encontrado el mail del ususario" });
    }

    if (usuarioBuscado.verificado) {
      return res.status(400).json({ mensaje: "Este mail ya esta verificado" });
    }

    if (new Date() > usuarioBuscado.fechaExpiracionCodigo) {
      return res.status(400).json({
        memsaje: "El codigo ha expirado, por favor solicita un nuevo codigo",
      });
    }

    if (usuarioBuscado.codigoVerificacion !== codigo) {
      return res
        .status(404)
        .json({ memsaje: "El codigo de verificacion es incorrecto" });
    }

    await Usuario.findByIdAndUpdate(usuarioBuscado._id, {
      $set: { verificado: true },
      $unset: { codigoVerificacion: 1, fechaExpiracionCodigo: 1 },
    });
    res.status(200).json({
      mensaje: "Cuenta verificada con exito. Ya puedes iniciar sesion",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje:
        "Ocurrio un error al validar el codigo de verificacion del usuario ",
    });
  }
};
export const solicitarNuevoCodigo = async (req, res) => {
  try {
    const { email } = req.body;

    const usuarioBuscado = await Usuario.findOne({ email });
    if (!usuarioBuscado) {
      return res.status(404).json({
        mensaje: "No se encontró ningun usuario con el email enviado",
      });
    }

    if (usuarioBuscado.verificado) {
      return res
        .status(400)
        .json({ mensaje: "Esta cuenta ya esta verificada" });
    }

    const codigoVerificacion = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const tiempoExpiracion = new Date(Date.now() + 15 * 60 * 1000);

    await Usuario.findByIdAndUpdate(usuarioBuscado._id, {
      codigoVerificacion,
      fechaExpiracionCodigo: tiempoExpiracion,
    });

    await transporter.sendMail({
      from: '"Recetarios" <no-reply@Recetarios.com>',
      to: usuarioBuscado.email,
      subject: "Nuevo codigo para verificacion",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">¡Hola, ${usuarioBuscado.nombreUsuario}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Para activar tu cuenta y poder ingresar a la plataforma, por favor utiliza el siguiente código de verificación:
          </p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 4px; color: #007bff;">
            ${codigoVerificacion}
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">
            Este código vencerá en 15 minutos. Si no solicitaste este registro, puedes ignorar este correo de forma segura.
          </p>
        </div>
      `,
    });
    res
      .status(200)
      .json({ mensaje: "El nuevo codigo de verificacion fue enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error al crear un nuevo código de verificación",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuarioBuscado = await Usuario.findOne({ email });
    if (!usuarioBuscado) {
      return res
        .status(401)
        .json({ mensaje: "Credenciales invalidas - email " });
    }

    if (!(await bcrypt.compare(password, usuarioBuscado.password))) {
      return res
        .status(401)
        .json({ mensaje: "Credenciales invalidas -password" });
    }
    if (!usuarioBuscado.verificado) {
      return res
        .status(401)
        .json({ mensaje: "Tu cuenta no fue verificada todavia" });
    }

    const token = jwt.sign(
      { id: usuarioBuscado._id, rol: usuarioBuscado.rol },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );
    res.cookie("cookieToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.status(200).json({
      mensaje: "login exitoso",
      nombre: usuarioBuscado.nombreUsuario,
      rol: usuarioBuscado.rol,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error al loguear un usuario ",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("cookieToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.status(200).json({ mensaje: "sesion cerrada exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "ocurrio un error al intentar cerrar sesion" });
  }
};
export const obtenerPerfil = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.user.id);
    if (!usuarioBuscado) {
      return res
        .status(404)
        .jsos({ mensaje: " No se encntro un usuario con ese ID" });
    }
    {
      const perfilUsuario = {
        nombreUsuario: usuarioBuscado.nombreUsuario,
        email: usuarioBuscado.email,
        rol: usuarioBuscado.rol,
      };
    }
    res.status(200).json(perfilUsuario);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al obtener el perfil de ususario" });
  }
};
