const getRecipeById = require("../controllers/getRecipeById");
const { getRecipeByName } = require("../controllers/getRecipeByName");
const getRecipes = require("../controllers/getRecipes");
const postRecipe = require("../controllers/postRecipe");

const handlerIdRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerPostRecipe = (req, res) => {
  try {
    const { title, image, summary, healthScore, instructions, diets } =
      req.body;
    postRecipe({ title, image, summary, healthScore, instructions, diets });
    res.status(200).json({
      exito: { title, image, summary, healthScore, instructions, diets },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerGetRecipes = async (req, res) => {
  const { name } = req.query;
  let recipes;
  try {
    if (name) recipes = await getRecipeByName(name);
    else recipes = await getRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerIdRecipe,
  handlerPostRecipe,
  handlerGetRecipes,
};
