const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const getRecipeById = async (idreq) => {
  const validUUID =
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

  if (!validUUID.test(idreq)) {
    let {
      vegetarian,
      id,
      title,
      summary,
      healthScore,
      instructions,
      image,
      diets,
    } = await axios(
      `${URL}/${idreq}/information?apiKey=${API_KEY}`
    ).then((res) => {
      return res.data;
    });
    let dietasDB = [];
    //basado en las dietas que posee la receta traida
    //creo una peticion a la base para que las dietas tengan el mismo formato
    //que tienen las dietas de las recetas traidas de la DB
    for (let i = 0; i < diets.length; i++) {
      let diet = await Diet.findOne({
        where: { name: { [Op.iLike]: `%${diets[i]}` } },
      });
      dietasDB.push(diet);
    }
    if (vegetarian)
      dietasDB.push(await Diet.findOne({ where: { name: "vegetarian" } }));
    diets = dietasDB;

    return { id, title, summary, healthScore, instructions, image, diets };
  } else {
    // las recetas de la db no poseen un array de dietas,
    // por ende tengo que crearlo y agregarlo en el response
    let recipeDB = await Recipe.findByPk(idreq.toString());
    let diets = await recipeDB.getDiets({ raw: true });
    recipeDB.dataValues = { ...recipeDB.dataValues, diets: [...diets] };

    return recipeDB;
  }
};

module.exports = getRecipeById;
