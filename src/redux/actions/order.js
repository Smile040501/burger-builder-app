import axios from "../../axios-orders";
import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
} from "../types";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData,
        },
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        payload: {
            error,
        },
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData, token) => async (dispatch, getState) => {
    dispatch(purchaseBurgerStart());
    try {
        const res = await axios.post(`/orders.json?auth=${token}`, orderData);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    } catch (err) {
        dispatch(purchaseBurgerFail(err));
    }
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: {
            orders,
        },
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: FETCH_ORDERS_FAIL,
        payload: {
            error,
        },
    };
};

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token, userId) => async (dispatch, getState) => {
    dispatch(fetchOrdersStart());
    try {
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        const res = await axios.get(`./orders.json${queryParams}`);
        const fetchedOrders = Object.entries(res.data).map(([key, val]) => ({
            id: key,
            ...val,
        }));
        dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
        dispatch(fetchOrdersFail(err));
    }
};
