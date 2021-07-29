import React from "react";
import styles from "./Order.module.css";

export default function Order(props) {
    const ingredients = Object.entries(props.ingredients).map(([name, amount]) => ({
        name,
        amount,
    }));

    const ingredientOutput = ingredients.map((ig) => {
        return (
            <span
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    margin: "0 8px",
                    border: "1px solid #ccc",
                    padding: "5px",
                }}
                key={ig.name}
            >
                {ig.name} ({ig.amount})
            </span>
        );
    });

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>
                Price: <strong>INR: {(+props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
}
