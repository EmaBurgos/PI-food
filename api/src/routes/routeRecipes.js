const { Router } = require("express");
const {
  handlerIdRecipe,
  handlerPostRecipe,
  handlerGetRecipes,
} = require("../handlers/handlerRecipes");
const routeRecipes = Router();

routeRecipes.get("/", handlerGetRecipes);
routeRecipes.get("/:id", handlerIdRecipe);
routeRecipes.post("/", handlerPostRecipe);

module.exports = routeRecipes;
