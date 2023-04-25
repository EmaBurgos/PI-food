import style from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={style.container}>
      <p className={style.text}>
       Emanuel Burgos Developer🚀
      </p>
      <a href="https://www.linkedin.com/in/emanuel-burgos-439537195/" class="social-icon si-rounded si-small si-linkedin">
    <i class="icon-linkedin"></i>
    <i class="icon-linkedin"></i>
 </a>
    </div>
  );
};

export default Footer;
