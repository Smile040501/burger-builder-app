import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
} from "../types";
import { updateObject } from "../../shared/utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const addIngredient = (state, action) => {
    const { ingredientName } = action.payload;
    const updatedIngredients = updateObject(state.ingredients, {
        [ingredientName]: state.ingredients[ingredientName] + 1,
    });
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
        building: true,
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const { ingredientName } = action.payload;
    const updatedIngredients = updateObject(state.ingredients, {
        [ingredientName]: state.ingredients[ingredientName] - 1,
    });
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
        building: true,
    };
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    const { salad, bacon, cheese, meat } = action.payload.ingredients;
    return updateObject(state, {
        ingredients: { salad, bacon, cheese, meat },
        totalPrice: 4,
        error: false,
        building: false,
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return addIngredient(state, action);
        case REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case SET_INGREDIENTS:
            return setIngredients(state, action);
        case FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};

export default reducer;
