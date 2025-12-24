const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favoritesController");


router.get("/", protect, getFavorites);
router.post("/", protect, addFavorite);
router.delete("/:recipeId", protect, removeFavorite);

module.exports = router;
