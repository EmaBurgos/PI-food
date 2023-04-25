import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const ADD_RECIPE_DETAIL = "ADD_RECIPE_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const ORDER = "ORDER";
export const FILTER = "FILTER";
const URL_RECIPES = "http://localhost:3001/recipes";
const URL_DIETS = "http://localhost:3001/diets";

export const order = (judgment) => {
  return { type: ORDER, payload: judgment };
};
export const filter = (judgment) => {
  return { type: FILTER, payload: judgment };
};
export const postRecipe = (recipe) => {
  return async function () {
    await axios.post(URL_RECIPES, recipe).then((res) => {
      return res.data;
    });
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const response = await axios.get(URL_DIETS);
    dispatch({ type: GET_DIETS, payload: response.data });
  };
};

export const getRecipes = () => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_RECIPES}`);
    dispatch({ type: GET_RECIPES, payload: response.data });
  };
};

export const addRecipeDetail = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_RECIPES}/${id}`);
    dispatch({ type: ADD_RECIPE_DETAIL, payload: response.data });
  };
};

export const cleanDetail = () => {
  return function (dispatch) {
    dispatch({ type: CLEAN_DETAIL });
  };
};

export const searchRecipe = (name) => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_RECIPES}/?name=${name}`);
    dispatch({ type: SEARCH_RECIPE, payload: response.data });
  };
};
