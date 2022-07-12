import zustandFlipper from "react-native-flipper-zustand";
import create, { StateCreator } from "zustand";
import { Product } from "../types/product";

interface Cart {
    [productId: string]: number
}

export interface UserState {
    cart: Cart;
    setCart: (cart: Cart) => void;
    addToCart: (product: Product) => void;
    addToCartInQty: (product: Product, qty: number) => void;
    removeOneFromCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    clearCart: () => void;
}

type ZustandFlipper = (config: StateCreator<UserState>) => StateCreator<UserState>;

export const useUserStore = create((zustandFlipper as ZustandFlipper)(set => ({
    cart: {},
    setCart: (cart) => {
        set(() => ({cart}), false, "setCart");
    },
    addToCart: (newProduct: Product) =>
        set((state: UserState) => {
            const targetProductId = newProduct.id;
            const newValue = state.cart[targetProductId] != null ? state.cart[targetProductId] + 1 : 1;
            return { cart: { ...state.cart, [targetProductId]: newValue } };
        }, false, "addToCart"),
    addToCartInQty: (newProduct: Product, quantity: number) =>
        set((state: UserState) => {
            const targetProductId = newProduct.id;
            return { cart: { ...state.cart, [targetProductId]: quantity } };
        }, false, "addToCartInQty"),
    removeOneFromCart: (newProduct: Product) => {
        set((state: UserState) => {
            const newState = {cart: {...state.cart}};
            const targetProductId = newProduct.id;
            const numSpecificProduct = state.cart[targetProductId];
            if (numSpecificProduct === 1) {
                delete newState.cart[targetProductId];
            } else {
                newState.cart[targetProductId] -= 1;
            }
            return newState;
        }, false, "removeOneFromCart");
    },
    removeFromCart: (newProduct: Product) => {
        set((state: UserState) => {
            const newState = {cart: {...state.cart}};
            const targetProductId = newProduct.id;
            delete newState.cart[targetProductId];
            return newState;
        }, false, "removeFromCart");
    },
    clearCart: () => set(() => ({ cart: {} })),
})));
