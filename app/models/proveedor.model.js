module.exports = (sequelize, Sequelize) => {
  return sequelize.define("proveedor", {
    nombre: { type: Sequelize.STRING },
    empresa: { type: Sequelize.STRING },
    direccion: { type: Sequelize.STRING },
    telefono: { type: Sequelize.STRING },
    correo: { type: Sequelize.STRING },
    status: { type: Sequelize.BOOLEAN }
  });
};
    