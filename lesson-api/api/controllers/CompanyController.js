// Importações de Serviços
const { HttpResponse } = require("../utils/httpResponse");
const database = require("../models");
const {
  isSystemCoordinator,
  isPartnershipManager,
} = require("../utils/userUtils");
const { viaCep } = require("../utils/viaCep");

class CompanyController {
  async getById(req, res) {
    const httpResponse = new HttpResponse(res);
    try {
      const { id } = req.params;

      //
      const company = await database.companies.findByPk(id, {
        include: [{ model: database.conditions }],
      });

      if (!company)
        return httpResponse.notFound(
          "Empresa não encontrada! Verifique se o ID é válido."
        );
      return httpResponse.ok({ company });
    } catch (error) {
      return httpResponse.internalError(error);
    }
  }

  async getAll(_, res) {
    const httpResponse = new HttpResponse(res);
    try {
      //
      const companies = await database.companies.findAll({
        include: [{ model: database.conditions }],
        order: [["name", "ASC"]],
      });

      return httpResponse.ok({ companies });
    } catch (error) {
      return httpResponse.internalError(error);
    }
  }

  async get(req, res) {
    const httpResponse = new HttpResponse(res);
    try {
      // Extrai parâmetros da requisição ou define valores padrão
      let { currentPage, pageSize } = req.query;
      currentPage = parseInt(currentPage, 10);
      pageSize = parseInt(pageSize, 10);
      if (isNaN(currentPage) || currentPage <= 0) {
        currentPage = 1;
      }
      if (isNaN(pageSize) || pageSize <= 0) {
        pageSize = 10;
      }

      // Calcula o deslocamento com base na página e no tamanho da página
      const offset = (currentPage - 1) * pageSize;

      //
      const { count, rows: companies } =
        await database.companies.findAndCountAll({
          include: [{ model: database.conditions }],
          order: [["name", "ASC"]],
          offset,
          limit: pageSize,
        });

      // Calcula a quantidade total de páginas com base na quantidade total de itens e no tamanho da página
      const totalPages = Math.ceil(count / pageSize);

      // Retorna a resposta, incluindo as informações do banco de dados, a quantidade total de páginas disponíveis e a página atual.
      return httpResponse.ok({
        companies,
        totalPages,
        currentPage,
      });
    } catch (error) {
      return httpResponse.internalError(error);
    }
  }

  async create(req, res) {
    const httpResponse = new HttpResponse(res);
    try {
      const {
        name,
        description,
        phone,
        email,
        website,
        cep,
        state,
        city,
        neighborhood,
        avenue,
        conditionId,
      } = req.body;

      // Verifica se o usuário logado tem permissão de administrador ou de gestor de parceiros
      const isCoordinator = await isSystemCoordinator(req.userId.id);
      const isManager = await isPartnershipManager(req.userId.id);
      if (!isCoordinator && !isManager) {
        return httpResponse.forbidden("Você não tem permissão para esta ação.");
      }

      // Verifica se todos os campos obrigatórios foram fornecidos e são válidos
      if (!name || !email || !cep || !conditionId)
        return httpResponse.badRequest(
          "Por favor, preencha todos os campos obrigatórios!"
        );

      //
      const companyAlreadyExists = await database.companies.findOne({
        where: { email },
      });
      if (companyAlreadyExists)
        return httpResponse.badRequest(
          "Já existe uma empresa com este endereço de email."
        );
      const isCEPValid = await viaCep(cep);
      if (!isCEPValid.valid) {
        return httpResponse.badRequest(isCEPValid.error);
      }
      if (conditionId) {
        const condition = await database.conditions.findOne({
          where: { id: conditionId },
        });
        if (!condition) {
          return httpResponse.notFound(
            "Condição inválida! Verifique se o ID é válido."
          );
        }
      }

      // Cria a nova empresa no banco de dados
      const company = await database.companies.create({
        name,
        description,
        phone,
        email,
        website,
        cep,
        state: isCEPValid.state,
        city: isCEPValid.city,
        neighborhood: isCEPValid.neighborhood,
        avenue: isCEPValid.avenue,
        conditionId,
      });
      return httpResponse.created(company);
    } catch (error) {
      return httpResponse.internalError(error);
    }
  }

  async update(req, res) {
    const httpResponse = new HttpResponse(res);
    try {
      const { id } = req.params;
      const {
        name,
        description,
        phone,
        email,
        website,
        cep,
        state,
        city,
        neighborhood,
        avenue,
        conditionId,
      } = req.body;

      // Verifica se o usuário logado tem permissão de administrador ou de gestor de parceiros
      const isCoordinator = await isSystemCoordinator(req.userId.id);
      const isManager = await isPartnershipManager(req.userId.id);
      if (!isCoordinator && !isManager) {
        return httpResponse.forbidden("Você não tem permissão para esta ação.");
      }

      if (!id)
        return httpResponse.badRequest(
          "Parâmetros inválidos! Certifique-se de fornecer o ID da empresa."
        );

      const companyToUpdate = {};
      const companyExists = await database.companies.findByPk(id);
      if (!companyExists)
        return httpResponse.notFound(
          "Empresa não encontrada! Verifique se o ID é válido."
        );

      //
      if (name) {
        if (typeof name !== "string" || name.trim() === "") {
          return httpResponse.badRequest("Informe um nome para a empresa!");
        }

        companyToUpdate.name = name;
      }
      if (description) companyToUpdate.description = description;
      if (phone) companyToUpdate.phone = phone;
      if (email && email !== companyExists.email) {
        const companyAlreadyExists = await database.companies.findOne({
          where: { email },
        });
        if (companyAlreadyExists && companyAlreadyExists.id !== id) {
          return httpResponse.badRequest(
            "Já existe uma empresa com este endereço de email."
          );
        }
        companyToUpdate.email = email;
      }
      if (website) companyToUpdate.website = website;
      if (cep) {
        const isCEPValid = await viaCep(cep);
        if (!isCEPValid.valid) {
          return httpResponse.badRequest(isCEPValid.error);
        }
        companyToUpdate.cep = cep;
        (companyToUpdate.state = isCEPValid.state),
          (companyToUpdate.city = isCEPValid.city),
          (companyToUpdate.neighborhood = isCEPValid.neighborhood),
          (companyToUpdate.avenue = isCEPValid.avenue);
      }
      if (conditionId) {
        const condition = await database.conditions.findOne({
          where: { id: conditionId },
        });
        if (!condition) {
          return httpResponse.notFound(
            "Condição inválida! Verifique se o ID é válido."
          );
        }
        companyToUpdate.conditionId = conditionId;
      }

      // Realiza a atualização no banco de dados
      await database.companies.update(companyToUpdate, {
        where: { id },
      });
      return httpResponse.ok({
        message: "Empresa atualizada com sucesso.",
      });
    } catch (error) {
      return httpResponse.internalError(error);
    }
  }

  async delete(req, res) {
    const httpResponse = new HttpResponse(res);
    try {
      const { id } = req.params;

      // Verifica se o usuário logado tem permissão de administrador ou de gestor de parceiros
      const isCoordinator = await isSystemCoordinator(req.userId.id);
      const isManager = await isPartnershipManager(req.userId.id);
      if (!isCoordinator && !isManager) {
        return httpResponse.forbidden("Você não tem permissão para esta ação.");
      }

      if (!id)
        return httpResponse.badRequest(
          "Parâmetros inválidos! Certifique-se de fornecer o ID da empresa."
        );

      //
      const companyExists = await database.companies.findOne({
        where: { id },
      });
      if (!companyExists)
        return httpResponse.notFound(
          "Empresa não encontrada! Verifique se o ID é válido."
        );

      // Realiza a exclusão do usuário no banco de dados
      await database.companies.destroy({ where: { id } });
      return httpResponse.ok({
        message: "Empresa deletada com sucesso.",
      });
    } catch (error) {
      return httpResponse.internalError(error);
    }
  }
}

module.exports = CompanyController;
