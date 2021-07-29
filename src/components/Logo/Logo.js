import React from "react";
import styles from "./Logo.module.css";
import burgerLogo from "../../assets/images/burger-logo.png";

export default function Logo(props) {
    return (
        <div className={styles.Logo}>
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    );
}
