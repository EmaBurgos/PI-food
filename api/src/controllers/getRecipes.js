const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Recipe } = require("../db");
const { getRecipeDiets } = require("./getRecipeByName");

const getRecipes = async () => {
  let recipesApi = await axios(
    `${URL}/complexSearch?apiKey=${API_KEY}&number=100&instructionsRequired=true&addRecipeInformation=true`
  ).then(async (res) => {
    let recipes = await res.data.results.map(
      ({ vegetarian, id, title, healthScore, image, diets }) => {       // una vez que llega mapeo la info q necesito
        return { vegetarian, id, title, healthScore, image, diets };
      }
    );
    for (const recipe of recipes) {  //itero y obtengo las dietas de las recipes
      recipe.diets = await getRecipeDiets(recipe.vegetarian, recipe.diets);
    }
    return recipes; 
  });
  let recipesDB = await Recipe.findAll();  // aca para obtener las recetas de la bd
  for (const recipe of recipesDB) { //itero en las recetas de recipesdb y obtengo las dietas
    let diets = await recipe.getDiets({ raw: true }); //raw solo duvuelve datos de la dieta
    recipe.dataValues = { ...recipe.dataValues, diets: [...diets] };
    //actualizo datavalues de la receta que incluye las dietas
  }
  return [...recipesDB, ...recipesApi];  //devuelve todas las recipes
};

module.exports = getRecipes;
