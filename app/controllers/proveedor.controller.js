const db = require("../models");
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({ message: "El contenido no puede estar vacío." });
    return;
  }

  const proveedor = {
    nombre: req.body.nombre,
    empresa: req.body.empresa,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    status: req.body.status ?? true
  };

  Proveedor.create(proveedor)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  let condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Proveedor.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Proveedor.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: `Error al buscar Proveedor con id=${id}` }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Proveedor.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Proveedor actualizado correctamente." });
      else res.send({ message: `No se pudo actualizar el proveedor con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: `Error actualizando proveedor con id=${id}` }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Proveedor.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Proveedor eliminado correctamente." });
      else res.send({ message: `No se encontró proveedor con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Proveedor.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} proveedores eliminados.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAllStatus = (req, res) => {
  Proveedor.findAll({ where: { status: true } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};
