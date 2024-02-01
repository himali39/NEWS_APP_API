const { addLocation, getLocation, deleteLocation, updateLocation } = require("../../controllers/admin/adminLocaltionConto");
const verifyAdminToken = require("../../helper/verifyAdminToken");

const router = require("express").Router();

/* ------------------------- add Location data route ------------------------ */
router.post("/add-Location", verifyAdminToken, addLocation);

/* ------------------------- get list Location data route ------------------------ */
router.get("/get-Location", verifyAdminToken, getLocation);

/* ------------------------- delete list Location data route ------------------------ */
router.delete("/delete-Location/:id", verifyAdminToken, deleteLocation);

/* ------------------------- update list Location data route ------------------------ */
router.put("/update-Location/:id", verifyAdminToken, updateLocation);

module.exports = router;
