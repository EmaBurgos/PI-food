const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const getRecipeById = async (idreq) => {
  const validUUID =
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
   //si el uuid no coincide lo busca en la api
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
    //hago q las dietas de la receta traida de la API tengan el mismo formato que las dietas en 
    //la base de datos para guardarlas y buscar
    // las recetas por dieta
    for (let i = 0; i < diets.length; i++) {        // itero sobre la diets de la db
      let diet = await Diet.findOne({
        where: { name: { [Op.iLike]: `%${diets[i]}` } },
      });
      dietasDB.push(diet); // si se encuentra una dieta con el mismo nombre lo agrego a las dietas de mi db
    }
    if (vegetarian)
      dietasDB.push(await Diet.findOne({ where: { name: "vegetarian" } }));
    diets = dietasDB; // si tiene un dieta vegetariana la agrego y actualiazo diets

    return { id, title, summary, healthScore, instructions, image, diets };
  } else { // Si no es una de la api es una receta de la base de datos
    
    let recipeDB = await Recipe.findByPk(idreq.toString());
    let diets = await recipeDB.getDiets({ raw: true }); // raw devuelve un objeto js

    //como las recetas de la bd no tienen un array creo el objeto datavalues con el array
    //y agrego al response
    recipeDB.dataValues = { ...recipeDB.dataValues, diets: [...diets] };

    return recipeDB;
  }
};

module.exports = getRecipeById;
