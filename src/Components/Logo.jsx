import styles from "./Logo.module.css";
import logo from "../assets/logo.png";
import {NavLink} from "react-router-dom";
function Logo() {
  return( <NavLink to="/">
    <img src={logo} alt="wordlwise logo" className={styles.logo}/>
    </NavLink>);
}

export default Logo;