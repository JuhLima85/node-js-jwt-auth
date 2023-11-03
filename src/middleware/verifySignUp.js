const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// Verifica a duplicação do nome de usuário
checkDuplicateUsername = (req, res, next) => {
   // Verifica se o nome de usuário e a senha são fornecidos na solicitação
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Falha! Nome de usuário e senha são obrigatórios."
    });
    return;
  }
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Falha! Nome de usuário já está em uso!"
      });
      return;
    }

      next();
    });  
};

// Verifica a existência de funções
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Falhou! A função não existe = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;