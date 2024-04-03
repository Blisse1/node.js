const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/rolesList");
const verifiedRoles = require("../../middleware/verifyRoles");

router.route("/")
    .get(employeesController.getAllEmployees)
    .post(verifiedRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    .put(verifiedRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifiedRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id")
    .get(employeesController.getEmployee);

module.exports = router;

