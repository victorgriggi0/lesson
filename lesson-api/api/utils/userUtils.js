// Importações de Serviços
const database = require("../models");

const isSystemCoordinator = async (userId) => {
  const loggedInUser = await database.users.findByPk(userId);
  // Verifica se o usuário existe ou se tem a função de coordenador de sistema
  if (!loggedInUser || loggedInUser.roleId !== 1) {
    return false;
  }
  return true;
};

const isPartnershipManager = async (userId) => {
  const loggedInUser = await database.users.findByPk(userId);
  // Verifica se o usuário existe ou se tem a função de gestor de empresas
  if (!loggedInUser || loggedInUser.roleId !== 2) {
    return false;
  }
  return true;
};

module.exports = {
  isSystemCoordinator,
  isPartnershipManager,
};
