module.exports = {
  HOST: "ep-mute-pond-af6m3w58-pooler.c-2.us-west-2.aws.neon.tech", // HOST de la conexión
  USER: "neondb_owner", // Usuario
  PASSWORD: "npg_vpyfU8FPjo4K", // Contraseña
  DB: "neondb", // Nombre de la base de datos
  dialect: "postgres",
  pool: { 
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};