const db = require("../models");
const Departamento = db.departamentos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({ message: "El nombre no puede estar vacío." });
    return;
  }

  const departamento = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    status: req.body.status ?? true
  };

  Departamento.create(departamento)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  let condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Departamento.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Departamento.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: `Error buscando departamento con id=${id}` }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Departamento.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Departamento actualizado." });
      else res.send({ message: `No se pudo actualizar departamento con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Departamento.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Departamento eliminado." });
      else res.send({ message: `No se encontró departamento con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Departamento.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} departamentos eliminados.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAllStatus = (req, res) => {
  Departamento.findAll({ where: { status: true } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};
