import style from "./About.module.css";
import image from "../../assets/images/foto.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={style.view}>
      <h1 className={style.title}>Sobre Mi!</h1>
      <div className={style.container}>
        <img src={image} alt="foto" className={style.image} />
        Hola!, Me llamo Emanuel Burgos, Este es el proyecto que realize
        en el Bootcamp de SoyHenry, Donde utilize React, Redux, Express,
        Sequelize y Postgres. Busco desarrollar mi conocimiento constantemente
        y me gusta aprender tecnologias nuevas. Amo la programación, el deporte y 
        el marketing. Busco mejorar el futuro de todos, con mis habilidades y poder
        participar o crear Proyectos De gran magnitud. Puedes visitar mi perfil de
        Github y LinkedIn, clickeando en los enlaces ⬇
        <div className={style.linkContainer}>
          <Link className={style.link} to="https://github.com/EmaBurgos">
            GitHub
          </Link>
          <Link
            className={style.link}
            to="https://www.linkedin.com/in/emanuel-burgos-439537195/"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
