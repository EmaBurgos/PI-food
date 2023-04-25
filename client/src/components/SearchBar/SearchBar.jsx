import { useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getRecipes, searchRecipe } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };
  const handleKeyPressed = (event) => {
    const key = event.key;
    if (search.length && key === "Enter") dispatch(searchRecipe(search));
    else dispatch(getRecipes());
  };
  return (
    <div className={style.container}>
      <input
        onChange={handleChange}
        onKeyPress={handleKeyPressed}
        className={style.input}
        value={search}
        type="search"
        placeholder="Search"
      ></input>
    </div>
  );
};

export default SearchBar;
