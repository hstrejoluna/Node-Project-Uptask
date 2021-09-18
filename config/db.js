const Sequelize = require("sequelize");

const db = new Sequelize("uptasknode", "root", "osoregordete", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mariadb",
  operatorsAliases: 0,
  define: {
    timestamps: 0,
  },
  dialectOptions: {
    socketPath: "/var/run/mysqld/mysqld.sock",
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
