import style from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={props.display ? style.button : style.noButton}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
