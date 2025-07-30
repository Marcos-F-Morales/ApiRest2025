module.exports = (sequelize, Sequelize) => {
  return sequelize.define("departamento", {
    nombre: { type: Sequelize.STRING },
    descripcion: { type: Sequelize.STRING },
    status: { type: Sequelize.BOOLEAN }
  });
};
