const Favorite = require("../models/Favorite");


// GET favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).select("recipeId");
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD favorite
const addFavorite = async (req, res) => {
  const { recipeId } = req.body;

  const exists = await Favorite.findOne({
    user: req.user.id,
    recipeId,
  });

  if (exists) {
    return res.status(400).json({ message: "Already favorited" });
  }

  const favorite = await Favorite.create({
    user: req.user.id,
    recipeId,
  });

  res.status(201).json(favorite);
};

// REMOVE favorite
const removeFavorite = async (req, res) => {
  const { recipeId } = req.params;

  await Favorite.findOneAndDelete({
    user: req.user.id,
    recipeId,
  });

  res.json({ message: "Removed from favorites" });
};

module.exports = { getFavorites, addFavorite, removeFavorite };
