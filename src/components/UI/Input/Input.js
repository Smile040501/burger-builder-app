import React from "react";
import styles from "./Input.module.css";

export default function Input({
    elementType,
    elementConfig,
    value,
    changed,
    invalid,
    shouldValidate,
    touched,
    label,
    errorMessage,
}) {
    let inputElement = null;

    const inputClasses = [styles.InputElement];

    let validationError = null;

    if (touched && invalid && shouldValidate) {
        inputClasses.push(styles.Invalid);
        validationError = <p className={styles.ValidationError}>{errorMessage}</p>;
    }

    switch (elementType) {
        case "input":
            inputElement = (
                <input
                    className={inputClasses.join(" ")}
                    {...elementConfig}
                    value={value}
                    onChange={changed}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    className={inputClasses.join(" ")}
                    {...elementConfig}
                    value={value}
                    onChange={changed}
                />
            );
            break;
        case "select":
            inputElement = (
                <select className={inputClasses.join(" ")} value={value} onChange={changed}>
                    {elementConfig.options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        );
                    })}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(" ")}
                    {...elementConfig}
                    value={value}
                    onChange={changed}
                />
            );
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}
