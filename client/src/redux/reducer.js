import {
  ORDER,
  ADD_RECIPE_DETAIL,
  CLEAN_DETAIL,
  FILTER,
  GET_DIETS,
  GET_RECIPES,
  SEARCH_RECIPE,
} from "./actions";
import { ascendant, descendant } from "./funcionComparadora";

const initialState = {
  diets: [],
  recipes: [],
  recipeDetail: {},
  allRecipes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER:
      if (action.payload === "ascendenteAlf") {
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => ascendant(a.title, b.title)),
          ],
        };
      }
      if (action.payload === "descendenteAlf") {
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => descendant(a.title, b.title)),
          ],
        };
      }
      if (action.payload === "ascendenteHS") {
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => {
              return a.healthScore - b.healthScore;
            }),
          ],
        };
      }
      if (action.payload === "descendenteHS") {
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => {
              return b.healthScore - a.healthScore;
            }),
          ],
        };
      }
      return { ...state };
    case FILTER:
      const validUUID =
        /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

      if (action.payload === "All") {
        return { ...state, recipes: [...state.allRecipes] };
      }
      if (action.payload === "db") {
        return {
          ...state,
          recipes: [
            ...state.allRecipes.filter((recipe) => {
              return validUUID.test(recipe.id);
            }),
          ],
        };
      }
      if (action.payload === "api") {
        return {
          ...state,

          recipes: [
            ...state.allRecipes.filter((recipe) => {
              return !validUUID.test(recipe.id);
            }),
          ],
        };
      } else
        return {
          ...state,

          recipes: [
            ...state.allRecipes.filter((recipe) =>
              recipe.diets.find((element) => {
                return element.name === action.payload ? true : false;
              })
            ),
          ],
        };

    case GET_RECIPES:
      return {
        ...state,
        allRecipes: [...action.payload],
        recipes: [...action.payload],
      };
    case GET_DIETS:
      return {
        ...state,
        diets: [...action.payload],
      };
    case SEARCH_RECIPE:
      return {
        ...state,
        allRecipes: [...state.recipes],
        recipes: [...action.payload],
      };
    case ADD_RECIPE_DETAIL:
      const { id, title, summary, healthScore, instructions, image, diets } =
        action.payload;

      return {
        ...state,
        recipeDetail: {
          id,
          title,
          summary,
          healthScore,
          instructions,
          image,
          diets,
        },
      };

    case CLEAN_DETAIL:
      return { ...state, recipeDetail: {} };
    default:
      return { ...state };
  }
};

export default reducer;
