const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY, URL } = process.env;

const getRecipeDiets = async (vegetarian, diets) => {
  let dietasDB = [];
  for (let i = 0; i < diets.length; i++) {
    let diet = await Diet.findOne({
      where: { name: { [Op.iLike]: `%${diets[i]}` } },
    });
    dietasDB.push(diet);
  }
  if (vegetarian)
    dietasDB.push(await Diet.findOne({ where: { name: "vegetarian" } }));
  return dietasDB;
};

const getRecipeByName = async (name) => {
  let recipesApi = await axios(
    `${URL}/complexSearch?query=${name}&apiKey=${API_KEY}&addRecipeInformation=true`
  ).then(async (res) => {
    let recipes = await res.data.results.map(
      ({ vegetarian, id, title, healthScore, image, diets }) => {
        return { vegetarian, id, title, healthScore, image, diets };
      }
    );
    for (const recipe of recipes) {
      recipe.diets = await getRecipeDiets(recipe.vegetarian, recipe.diets);
    }
    return recipes;
  });

  let recipesDB = await Recipe.findAll({
    where: { title: { [Op.iLike]: `%${name}%` } },
  });
  for (const recipe of recipesDB) {
    let diets = await recipe.getDiets({ raw: true });
    recipe.dataValues = { ...recipe.dataValues, diets: [...diets] };
  }
  return [...recipesDB, ...recipesApi];
};

module.exports = { getRecipeByName, getRecipeDiets };
