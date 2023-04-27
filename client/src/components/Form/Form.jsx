import { useEffect, useState } from "react";
import Button from "../Button/Button";
import style from "./Form.module.css";
import { validation } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../redux/actions";

const Form = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getDiets());       // trae mis dietas
  }, [dispatch]);

  const [form, setForm] = useState({                   //mi estado local
    title: "",
    summary: "",
    healthScore: 0,
    instructions: "",
    image: "",
    diets: [],
  });

  const [errors, setErrors] = useState({            //mi estado local de error
    title: "",
    summary: "",
    healthScore: "",
    instructions: "",
    image: "",
    diets: "",
  });
  const setUnChecked = (boolean) => {
    return boolean;
  };
  const handleChange = (event) => {                  // se encarga de mi estado local
    const value = event.target.value;
    const target = event.target.name;

    const regexNum = /^([0-9])*$/;
    if (regexNum.test(target)) {
      //checkeo si es un checkbox
      if (!form.diets.includes(parseInt(target))) {
        // si no esta en form lo agrego
        setForm({ ...form, diets: [...form.diets, parseInt(target)] });
      } else {
        // si esta lo quito
        setForm({
          ...form,
          diets: [...form.diets.filter((diet) => diet !== parseInt(target))],
        });
      }
    } else {
      setForm({ ...form, [target]: value });

      validation({ ...form, [target]: value }, errors, setErrors, target);          //valida los errores
    }
  };
  setUnChecked(true);                             //si se creo correctamente
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Recipe created successfully");
    dispatch(postRecipe(form));
    setForm({
      title: "",
      summary: "",
      healthScore: 0,
      instructions: "",
      image: "",
      diets: [],
    });
    setUnChecked(false);
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Create you recipe:</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label htmlFor="title" className={style.label}>
          Title
        </label>
        <input
          onChange={handleChange}
          placeholder="Enter the title"
          type="text"
          name="title"
          value={form.title}
          className={errors.title ? style.error : style.input}
        ></input>
        {errors.title ? (
          <span className={style.msgError}>{errors.title}</span>
        ) : (
          <></>
        )}
        <label htmlFor="summary" className={style.label}>
          Summary
        </label>
        <textarea
          onChange={handleChange}
          placeholder="Enter the summary of the recipe"
          type="text"
          name="summary"
          value={form.summary}
          className={errors.summary ? style.error : style.input}
        ></textarea>
        {errors.summary ? (
          <span className={style.msgError}>{errors.summary}</span>
        ) : (
          <></>
        )}
        <label htmlFor="healthscore" className={style.label}>
          Health Score
        </label>
        <input
          onChange={handleChange}
          placeholder="Enter the health score of the recipe"
          type="number"
          name="healthScore"
          value={form.healthScore}
          className={errors.healthScore ? style.error : style.input}
        ></input>
        {errors.healthScore ? (
          <span className={style.msgError}>{errors.healthScore}</span>
        ) : (
          <></>
        )}
        <label htmlFor="instructions" className={style.label}>
          Instructions
        </label>
        <textarea
          onChange={handleChange}
          placeholder="Enter the step by step of the recipe"
          type="text"
          name="instructions"
          value={form.instructions}
          className={errors.instructions ? style.error : style.input}
        ></textarea>
        {errors.instructions ? (
          <span className={style.msgError}>{errors.instructions}</span>
        ) : (
          <></>
        )}
        <label htmlFor="image" className={style.label}>
          Image
        </label>
        <input
          onChange={handleChange}
          placeholder="Enter the url of the image"
          type="text"
          name="image"
          value={form.image}
          className={errors.image ? style.error : style.input}
        ></input>
        {errors.image ? (
          <span className={style.msgError}>{errors.image}</span>
        ) : (
          <></>
        )}
        <h2 className={style.label}>
          Select the diets which your recipe belongs to:
        </h2>
        {errors.diets ? (
          <span className={style.msgError}>{errors.diets}</span>
        ) : (
          <></>
        )}
        {diets.map((diet) => {
          return (
            <div key={diet.id}>
              <label htmlFor={diet.id} className={style.label}>
                {diet.name.toUpperCase()}
              </label>
              <input
                className={style.checkbox}
                type="checkbox"
                name={diet.id}
                id={diet.id}
                checked={form.diets.includes(diet.id)}
                onChange={handleChange}
              ></input>
            </div>
          );
        })}
        {/* ACA VA UN SELECTBOX CON TIPOS DE DIETA */}
        <Button
          text="Submit"
          display={
            form.title &&
            !errors.title &&
            !errors.summary &&
            !errors.instructions &&
            !errors.image &&
            !errors.diets
          }
          className={style.button}
        ></Button>
      </form>
    </div>
  );
};

export default Form;
