import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItem/NavigationItem";

export default function NavigationItems(props) {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>
                Burger Builder
            </NavigationItem>
            {props.isAuthenticated && <NavigationItem link="/orders">Orders</NavigationItem>}
            {!props.isAuthenticated ? (
                <NavigationItem link="/auth">Authenticate</NavigationItem>
            ) : (
                <NavigationItem link="/logout">Logout</NavigationItem>
            )}
        </ul>
    );
}
