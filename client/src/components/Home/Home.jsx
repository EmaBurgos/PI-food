import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import style from "./Home.module.css";
import { filter, getDiets, getRecipes, order } from "../../redux/actions";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const { recipes, diets } = useSelector((state) => state);             // Mi estado global

  const pagination = () => {
    return recipes.slice(firstRecipeInPage, firstRecipeInPage + 9);        // Mi pagination
  };

  const handleNext = () => {
    const nextPageStart = firstRecipeInPage + 9;                    // Next
    if (nextPageStart < recipes.length) {
    setCurretPage(nextPageStart);
    }
    };
  const handlePrevius = () => {
    if (firstRecipeInPage > 0) setCurretPage(firstRecipeInPage - 9);       // Previus
  };
  const handleOrder = (event) => {
    const judgment = event.target.value;                    // Ordernamiento
    dispatch(order(judgment));
  };
  const handleFilter = (event) => {
    const judgment = event.target.value;                   // Filtrado
    dispatch(filter(judgment));
  };
  const [firstRecipeInPage, setCurretPage] = useState(0);    // Mi estado local para las paginas

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());              // Mi hook dispatch trae mis recetas
  }, [dispatch]); 

  return (
    <div className={style.home}>
      
     
      <h1 className={style.title}>Recipes</h1>

      <SearchBar />

      <div className={style.buttonsContainer}>
        <select className={style.menu} name="order" onChange={handleOrder}>
          <option className={style.menuOption}>Order</option>
          <option className={style.menuOption} value="ascendenteAlf">
            A-Z ⬆
          </option>
          <option className={style.menuOption} value="descendenteAlf">         
            Z-A ⬇                                                         
          </option>
          <option className={style.menuOption} value="ascendenteHS">
            Health score ⬆
          </option>
          <option className={style.menuOption} value="descendenteHS">
            Health score ⬇
          </option>
        </select>
        <select className={style.menu} name="filter" onChange={handleFilter}>
          <option>All</option>

          {diets.map((diet) => {
            return <option key={diet.id}>{diet.name}</option>;
          })}
          <option value="db">Data Base</option>
          <option value="api">Spoon API</option>
        </select>
        <Button display={true} text="Previus" onClick={handlePrevius} />
        <Button display={true} text="Next" onClick={handleNext} />
      </div>
      {recipes.length ? (
        <Cards recipes={pagination()}></Cards>           // recipe se pasa como prop a card y renderiza las cartas
      ) : (
        <h1 className={style.loading}>Loading🥫🥫🥫</h1>    // Mientras recipe esta vacio mi mensaje
      )}
    </div>
  );
};

export default Home;
