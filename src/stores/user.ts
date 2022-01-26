import { Product } from "../types/product";
import create from "zustand";
import zustandFlipper from "react-native-flipper-zustand";


interface Cart {
    [productId: string]: number
}

export interface UserState {
    cart: Cart;
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    clearCart: () => void;
}

export const useUserStore = create(zustandFlipper(set => ({
    cart: {},
    addToCart: (newProduct: Product) =>
        set((state: UserState) => {
            const newValue = state.cart[newProduct.id] != null ? state.cart[newProduct.id] + 1 : 1;
            const targetProductId = newProduct.id;
            const newState = { cart: { ...state.cart, [targetProductId]: newValue } };
            return newState;
        }, false, "addToCart"),
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
