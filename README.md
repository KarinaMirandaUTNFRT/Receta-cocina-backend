# 🍳 API REST - Recetas de Cocina

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión de recetas de cocina, categorías y autenticación de usuarios con roles y seguridad mediante tokens JWT y Cookies.

---

## 🚀 Tecnologías Utilizadas

* **Node.js** - Entorno de ejecución para JavaScript.
* **Express.js** - Framework web para el desarrollo de la API.
* **MongoDB & Mongoose** - Base de datos NoSQL y ODM para el modelado de datos.
* **JSON Web Token (JWT)** - Autenticación y manejo de sesiones de forma segura.
* **Bcrypt.js** - Encriptación de contraseñas.
* **Cookie Parser** - Manejo de cookies HTTP-only para tokens de acceso.
* **Dotenv** - Gestión de variables de entorno.

---

## 📁 Estructura del Proyecto

```text
src/
├── config/           # Configuración de base de datos y entorno
├── controllers/      # Lógica de negocio (Usuarios, Recetas, Categorías)
├── middlewares/      # Middlewares de autenticación y autorización
├── models/           # Schemas de Mongoose
├── routes/           # Endpoints de la API
└── index.js          # Punto de entrada de la aplicación