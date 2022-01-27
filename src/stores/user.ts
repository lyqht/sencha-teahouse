import zustandFlipper from "react-native-flipper-zustand";
import create, { StateCreator } from "zustand";
import { Product } from "../types/product";

interface Cart {
    [productId: string]: number
}

export interface UserState {
    cart: Cart;
    addToCart: (product: Product) => void;
    addToCartInQty: (product: Product, qty: number) => void;
    removeFromCart: (product: Product) => void;
    clearCart: () => void;
}

type ZustandFlipper = (config: StateCreator<UserState>) => StateCreator<UserState>;

export const useUserStore = create((zustandFlipper as ZustandFlipper)(set => ({
    cart: {},
    addToCart: (newProduct: Product) =>
        set((state: UserState) => {
            const targetProductId = newProduct.id;
            const newValue = state.cart[targetProductId] != null ? state.cart[targetProductId] + 1 : 1;
            const newState = { cart: { ...state.cart, [targetProductId]: newValue } };
            return newState;
        }, false, "addToCart"),
    addToCartInQty: (newProduct: Product, quantity: number) =>
        set((state: UserState) => {
            const targetProductId = newProduct.id;
            const newState = { cart: { ...state.cart, [targetProductId]: quantity } };
            return newState;
        }, false, "addToCartInQty"),
    removeFromCart: (newProduct: Product) => {
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
        }, false, "removeFromCart");
    },
    clearCart: () => set(() => ({ cart: {} })),
})));
