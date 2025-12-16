const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favoritesController");

router.use(protect); // All routes protected

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/:id", removeFavorite);

module.exports = router;
