const { Recipe } = require("../db");

const postRecipe = async ({
  title,
  image,
  summary,
  healthScore,
  instructions,
  diets,
}) => {
  const recipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    instructions,
  });
  await recipe.addDiet(diets);
};

module.exports = postRecipe;
