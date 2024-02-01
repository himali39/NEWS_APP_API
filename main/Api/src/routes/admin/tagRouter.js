const express = require("express");
const { addTag, getTagData, deleteTag, updateTag, updateTagStatus } = require("../../controllers/admin/adminTagController");
const verifyAdminToken = require("../../helper/verifyAdminToken");

const router = express.Router();

/* ----------------------- add Tag route ----------------------- */
router.post("/add-Tag", verifyAdminToken, addTag);

/* ----------------------- get Tag route ----------------------- */
router.get("/get-Tag", verifyAdminToken, getTagData);

/* ----------------------- delete Tag route  ----------------------- */
router.delete("/delete-Tag/:id", verifyAdminToken, deleteTag);

/* ----------------------- update Tag route  ----------------------- */
router.put("/update-Tag/:id", verifyAdminToken, updateTag);

/* ----------------------- update Tag status  ----------------------- */
router.put("/update-Status/:id", verifyAdminToken, updateTagStatus);

module.exports = router;
