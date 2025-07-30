module.exports = (sequelize, Sequelize) => {
  const Empleado = sequelize.define("empleado", {
    nombre: {
      type: Sequelize.STRING
    },
    apellido: {
      type: Sequelize.STRING
    },
    puesto: {
      type: Sequelize.STRING
    },
    salario: {
      type: Sequelize.FLOAT
    },
    correo: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING
    },
    ingreso: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return Empleado;
};
