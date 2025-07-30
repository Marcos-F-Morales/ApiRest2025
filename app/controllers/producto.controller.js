const db = require("../models");
const Producto = db.productos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({ message: "El nombre no puede estar vacío." });
    return;
  }

  const producto = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
    proveedorId: req.body.proveedorId,
    status: req.body.status ?? true
  };

  Producto.create(producto)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  let condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Producto.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Producto.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: `Error con producto id=${id}` }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Producto.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Producto actualizado." });
      else res.send({ message: `No se pudo actualizar producto con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Producto.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Producto eliminado." });
      else res.send({ message: `No se encontró producto con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Producto.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} productos eliminados.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAllStatus = (req, res) => {
  Producto.findAll({ where: { status: true } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};
