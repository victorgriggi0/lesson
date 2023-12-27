const { Router } = require("express");

// Importações de Serviços
const CompanyController = require("../controllers/CompanyController");
const { authMiddleware } = require("../security/authMiddleware");

const companyController = new CompanyController();
const router = Router();

router.get("/company/:id", companyController.getById);
router.get("/companies/all", companyController.getAll);
router.get("/companies", companyController.get);
router.post("/company", authMiddleware, companyController.create);
router.put("/company/:id", authMiddleware, companyController.update);
router.delete("/company/:id", authMiddleware, companyController.delete);

module.exports = router;
