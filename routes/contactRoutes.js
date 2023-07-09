const express = require("express");
const router = express.Router();
const {
  getContacts,
  updateContact,
  createContact,
  deleteContact,
  getContact,
} = require("../controllers/contactController.js");
const validateToken = require("../middleware/validateToken.js");

router.use(validateToken)
router.route("/").get(getContacts);
router.route("/").post(createContact);
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);
module.exports = router;
