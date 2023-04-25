import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addRecipeDetail, cleanDetail } from "../../redux/actions";
import style from "./Detail.module.css";

export const Detail = () => {
  const { recipeDetail } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRecipeDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id, dispatch]);

  return (
    <div className={style.detailView}>
      <h1 className={style.detailTitle}>Recipe Detail: </h1>
      {recipeDetail.title ? (
        <div className={style.container}>
          <h1 className={style.title}>{recipeDetail.title}</h1>
          <hr className={style.separator}></hr>

          <h2 className={style.subTitle}>Summary</h2>
          <hr className={style.separator}></hr>
          <p className={style.text}>
            {recipeDetail.summary.replace(/<[^>]*>/g, "")}
          </p>
          <hr className={style.separator}></hr>
          <p className={style.text}>Health Score: {recipeDetail.healthScore}</p>
          <hr className={style.separator}></hr>
          <h2 className={style.subTitle}>Instructions</h2>
          <hr className={style.separator}></hr>
          <p className={style.text}>
            {recipeDetail.instructions.replace(/<[^>]*>/g, "")}
          </p>
          <img
            className={style.image}
            src={recipeDetail.image}
            alt={recipeDetail.title}
          />
          <ul className={style.diets}>
            Diets
            <hr className={style.separator}></hr>
            {recipeDetail.diets.map((element) => {
              return (
                <li key={element.id} className={style.itemList}>
                  {element.name.toUpperCase()}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <h1 className={style.loading}>Loading...</h1>
      )}
    </div>
  );
};
