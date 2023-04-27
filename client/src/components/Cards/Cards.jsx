import Card from "../Card/Card";
import style from "./Cards.module.css";
const Cards = ({ recipes }) => {    // contiene a mis card y mapea para renderizar la info.
  return (
    <div className={style.container}>
      {recipes && recipes.map(({ title, image, id, diets, healthScore }) => {
        return (
          <Card
            key={id}
            id={id}
            name={title}
            image={image}
            diets={diets}
            healthScore={healthScore}
          />
        );
      })}
    </div>
  );
};

export default Cards;
