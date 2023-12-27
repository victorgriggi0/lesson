// Importações de Serviços
import { api } from "./api";
import { getAccessToken } from "../utils/auth";

export async function getCompanyById(id) {
  try {
    const result = await api.get(`/company/${id}`);
    return {
      company: result.data.company,
    };
  } catch (error) {
    console.error("Erro de serviço:", error);
    throw error;
  }
}

export async function getAllCompanies() {
  try {
    const result = await api.get("/companies/all");
    return {
      companies: result.data.companies,
    };
  } catch (error) {
    console.error("Erro de serviço:", error);
    throw error;
  }
}

export async function getCompanies(currentPage, pageSize) {
  try {
    const result = await api.get("/companies", {
      params: {
        currentPage,
        pageSize,
      },
    });
    // Retorna diretamente os dados relevantes da resposta
    return {
      companies: result.data.companies,
      totalPages: result.data.totalPages,
      currentPage: result.data.currentPage,
    };
  } catch (error) {
    console.error("Erro de serviço:", error);
    throw error;
  }
}

export async function createCompany(data) {
  try {
    const result = await api.post(
      "/company",
      {
        name: data.companyName,
        description: data.companyDescription,
        phone: data.companyPhone,
        email: data.companyEmail,
        website: data.companyWebsite,
        cep: data.companyCep,
        conditionId: data.companyCondition,
      },
      {
        headers: {
          Authorization: getAccessToken(),
        },
      }
    );
    return result;
  } catch (error) {
    console.error("Erro de serviço:", error);
    throw error;
  }
}

export async function updateCompany(data) {
  try {
    const result = await api.put(
      `/company/${data.id}`,
      {
        name: data.companyName,
        description: data.companyDescription,
        phone: data.companyPhone,
        email: data.companyEmail,
        website: data.companyWebsite,
        cep: data.companyCep,
        conditionId: data.companyCondition,
      },
      {
        headers: {
          Authorization: getAccessToken(),
        },
      }
    );
    return result;
  } catch (error) {
    console.error("Erro de serviço:", error);
    throw error;
  }
}

export async function deleteCompany(data) {
  try {
    const result = await api.delete(`/company/${data.id}`, {
      headers: {
        Authorization: getAccessToken(),
      },
    });
    return result;
  } catch (error) {
    console.error("Erro de serviço:", error);
    throw error;
  }
}
