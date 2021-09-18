const Sequelize = require("sequelize");

const sequelize = new Sequelize("uptasknode", "root", "osoregordete", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  operatorsAliases: false,
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
