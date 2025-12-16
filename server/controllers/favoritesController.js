const Favorite = require("../models/Favorite");

const getFavorites = async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id });
  res.json(favorites);
};

const addFavorite = async (req, res) => {
  const { recipeId, title, image, nutrition } = req.body;
  const favorite = await Favorite.create({
    user: req.user._id,
    recipeId,
    title,
    image,
    nutrition,
  });
  res.status(201).json(favorite);
};

const removeFavorite = async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);
  if (!favorite) return res.status(404).json({ message: "Favorite not found" });
  if (favorite.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await favorite.remove();
  res.json({ message: "Favorite removed" });
};

module.exports = { getFavorites, addFavorite, removeFavorite };
