import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";


const NavBar = () => {
  return (
    <div className={style.navBar}>
      
      <div className={style.menuContainer}>
        <NavLink
          to="/home"
          className={ style.active 
          }
        >
          Home  -🥗-  
        </NavLink>
        <div className={style.searchContainer}>
        <h1> Sweet Veggie APP</h1>

        </div>
        <NavLink
          to="/form"
          className={style.menuText 
          }
        >
          Form - Create you Recipe✍
        </NavLink>
        <NavLink
          to="/about"
          className={ style.menuText
          }
        >
          About Me🔎
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
