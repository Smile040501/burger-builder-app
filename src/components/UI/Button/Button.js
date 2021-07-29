import React from "react";
import styles from "./Button.module.css";

export default function Button(props) {
    return (
        <button
            className={[styles.Button, styles[props.btnType]].join(" ")}
            onClick={props.clicked}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}
