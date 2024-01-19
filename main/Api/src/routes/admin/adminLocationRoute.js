const { addLocation, getLocation, deleteLocation, updateLocation } = require("../../controllers/admin/adminLocaltionConto");

const router = require("express").Router();

/* ------------------------- add Location data route ------------------------ */
router.post("/add-Location", addLocation);

/* ------------------------- get list Location data route ------------------------ */
router.get("/get-Location", getLocation);

/* ------------------------- delete list Location data route ------------------------ */
router.delete("/delete-Location/:id", deleteLocation);

/* ------------------------- update list Location data route ------------------------ */
router.put("/update-Location/:id", updateLocation);

module.exports = router;
