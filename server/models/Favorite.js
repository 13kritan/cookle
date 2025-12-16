const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipeId: { type: Number, required: true },
  title: String,
  image: String,
  nutrition: Object,
});

module.exports = mongoose.model("Favorite", favoriteSchema);
