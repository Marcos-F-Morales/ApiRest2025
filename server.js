// Importamos el módulo express
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// conexión a la base de datos
const db = require("./app/models");
db.sequelize.sync();
// Si necesitas reiniciar la BD, descomenta:
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// ruta simple
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

// rutas existentes
require("./app/routes/cliente.routes")(app);
require("./app/routes/empleado.routes")(app);
require("./app/routes/proveedor.routes")(app);
require("./app/routes/departamento.routes")(app);
require("./app/routes/producto.routes")(app);

// nueva ruta de autenticación
require("./app/routes/auth.routes")(app);

// puerto y escucha
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});