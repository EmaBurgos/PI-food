import style from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = ({ name, image, id, healthScore, diets }) => {
  return (
    <Link className={style.card} to={`/detail/${id}`}>
      <h1 className={style.title}>{name}</h1>
      <h2 className={style.subTitle}>Health Score: {healthScore}</h2>
      <img src={image} alt={name} className={style.image} />
      <h2 className={style.subTitle}>Diets:</h2>
      <ul className={style.list}>
        {diets.map((diet) => {
          return <li key={diet.id}>{diet.name.toUpperCase()}</li>;
        })}
      </ul>
    </Link>
  );
};

export default Card;
