// usamos la función require para cargar el módulo db.config.js para traer los parámetros preconfigurados de la BD
const dbConfig = require("../config/db.config.js");

// cargamos el módulo sequelize "ORM" para el manejo de las entidades como objetos
const Sequelize = require("sequelize");

// creamos una variable sequelize y la inicializamos como un Objeto Sequelize con la información de la BD
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // necesario para conexiones externas como Neon
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// creamos un objeto db
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// modelos existentes
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.empleados = require("./empleado.model.js")(sequelize, Sequelize);
db.proveedores = require("./proveedor.model.js")(sequelize, Sequelize);
db.departamentos = require("./departamento.model.js")(sequelize, Sequelize);
db.productos = require("./producto.model.js")(sequelize, Sequelize);

// nuevo modelo de autenticación
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);

// se utiliza el export para que el objeto db pueda ser accedido a través de otras clases
module.exports = db;