module.exports = (sequelize, Sequelize) => {
  return sequelize.define("producto", {
    nombre: { type: Sequelize.STRING },
    descripcion: { type: Sequelize.STRING },
    precio: { type: Sequelize.FLOAT },
    stock: { type: Sequelize.INTEGER },
    proveedorId: { type: Sequelize.INTEGER }, // Relación con proveedor
    status: { type: Sequelize.BOOLEAN }
  });
};
