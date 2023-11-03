const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:4200"]
};

// Configuração do CORS para permitir todas as origens
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Importe o módulo do Sequelize e os modelos
const db = require("./src/models");
const Role = db.role;

// Chame o método sync para criar as tabelas e associar os modelos
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// Função para adicionar registros iniciais de função
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao aplicativo da Juliana Lima." });
});

// routes
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});