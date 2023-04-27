import style from "./Error.module.css";

//mi componente error cuando el cliente se mueve alguna pagina que nosea home, ni form, about,etc.
const Error = () => {
  return (
    <div className={style.view}>
      <h1 className={style.title}>404 Page not found</h1>
    </div>
  );
};

export default Error;
