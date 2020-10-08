const express = require('express');
const router = express.Router();


/**
 * Upload middleware
 */
const upload = require("../configurations/uploadImage");


/**
 *
 * ouvrage controller
 */
const ouvrageController = require("../controllers/ouvrage");

router.post("/", upload.single("photo"), ouvrageController.create_ouvrage);



router.get('/', ouvrageController.get_all_ouvrage);

router.get('/:id', ouvrageController.get_ouvrage_by_id);

router.put('/:id', ouvrageController.edit_ouvrage);

router.delete("/:id", ouvrageController.delete_ouvrage);

module.exports = router;
