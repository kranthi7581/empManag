const express = require("express");
const controller = require("../controllers/companyController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", controller.createCompany);
router.get("/", controller.getCompanies);
router.get("/:id", controller.getCompanyById);
router.put("/:id", controller.updateCompany);
router.delete("/:id", controller.deleteCompany);

module.exports = router;
