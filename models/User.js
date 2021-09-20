const Sequelize = require("sequelize");
const db = require("../config/db");
const Projects = require("../models/Projects");
const bcrypt = require("bcrypt-nodejs");

const Users = db.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Submit a valid email",
        },
        notEmpty: {
          msg: "Email can't be empty, trust me",
        },
      },
      unique: {
        args: true,
        msg: "User already registered, try another name ",
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is empty! you really need one!",
        },
      },
    },
    activo: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE,
  },
  {
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(
          user.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);

// Métodos personalizados
Users.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Users.hasMany(Projects);
    