import { Link } from "react-router-dom";
import style from "./Landing.module.css";


//mi landing page
const Landing = () => {
  return (
    <div className={style.Contenedor}>
      <div className={style.DivLargo}></div>
      <div className={style.Welcome}>
        <div
          style={{
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Hola!, Este es el proyecto individual: FOOD APP</h2>
          <h4>
              Realizado por Emanuel Burgos🥑
          </h4>
          <Link to={"/home"} className={style.Boton}>
            GOO!
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Landing;
