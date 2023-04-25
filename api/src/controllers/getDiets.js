const { Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;

const getDiets = async () => {
  let diets = await Diet.findAll();
  if (!diets.length) {
    await axios(
      `${URL}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    ).then(async ({ data }) => {
      const aux = data.results.flatMap((e) => e.diets); // ignora los elementos vacios
      const arr = new Set(aux); // eliminamos repetidos
      const apiDiets = [...arr, "vegetarian"]; // agrego vegetarian ya que no me lo trae de la api
      for (let diet of apiDiets) {
        await Diet.create({ name: diet });
      }
    });
  }

  return await Diet.findAll();
};

module.exports = getDiets;
