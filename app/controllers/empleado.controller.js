const db = require("../models");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const empleado = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    puesto: req.body.puesto,
    salario: req.body.salario,
    correo: req.body.correo,
    telefono: req.body.telefono,
    ingreso: req.body.ingreso,
    status: req.body.status ?? false
  };

  Empleado.create(empleado)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  let condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Empleado.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Empleado.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: `Error retrieving Empleado with id=${id}` }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Empleado.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Empleado updated successfully." });
      else res.send({ message: `Cannot update Empleado with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: `Error updating Empleado with id=${id}` }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Empleado.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Empleado deleted successfully." });
      else res.send({ message: `Cannot delete Empleado with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: `Error deleting Empleado with id=${id}` }));
};

exports.deleteAll = (req, res) => {
  Empleado.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Empleados deleted.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAllStatus = (req, res) => {
  Empleado.findAll({ where: { status: true } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};
