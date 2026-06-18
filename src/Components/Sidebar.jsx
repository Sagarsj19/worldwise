import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

export default function SideBar(){
    return(
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>
            <footer className={styles.footer}>
                &copy; Copyright {new Date().getFullYear()} by worldwise INC.
            </footer>
        </div>
    );
}