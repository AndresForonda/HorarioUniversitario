module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'horarioUniversidad',
    user: process.env.DB_USER || 'unicauca',
    password: process.env.DB_PASS || 'unicauca',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './horarioUniversidad.sqlite',
      define: {
        underscored: true
      }
    }
  },
  authentication: {
    jwtSecret: process.env.JWE_SECRET || 'secret'
  }
}
