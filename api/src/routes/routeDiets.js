const { Router } = require("express");
const handlerDiets = require("../handlers/handlerDiets");
const routerDiets = Router();

routerDiets.get("/", handlerDiets);

module.exports = routerDiets;
