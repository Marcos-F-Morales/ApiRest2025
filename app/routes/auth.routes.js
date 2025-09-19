module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  const authMiddleware = require("../middlewares/auth.middleware.js");

  const router = require("express").Router();

  // Registro de usuario
  router.post("/register", auth.register);

  // Login de usuario
  router.post("/login", auth.login);

  // Ruta protegida: perfil del usuario autenticado
  router.get("/perfil", authMiddleware, auth.perfil);

  // Montamos el router en el endpoint /api/auth
  app.use("/api/auth", router);
};