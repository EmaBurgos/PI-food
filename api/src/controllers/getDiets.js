const { Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;

const getDiets = async () => {
  let diets = await Diet.findAll(); // Si hay alguna en mi bd
  if (!diets.length) {
    await axios(
      `${URL}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    ).then(async ({ data }) => {
      const aux = data.results.flatMap((e) => e.diets); // Mapea y ignora los elementos vacios
      const arr = new Set(aux); //                         New set elimina los repetidos
      const apiDiets = [...arr, "vegetarian"]; //      agrego vegetarian ya que no me lo trae de la api
      for (let diet of apiDiets) {
        await Diet.create({ name: diet });  // y los agrego a mi db
      }
    });
  }

  return await Diet.findAll();
};

module.exports = getDiets;
