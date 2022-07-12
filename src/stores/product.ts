import zustandFlipper from "react-native-flipper-zustand";
import create, { StateCreator } from "zustand";
import { Product } from "../types/product";

interface ProductState {
    products: Product[];
    setProducts: (products: Product[]) => void;
    addProduct: (product: Product) => void;
}

export type TeaFromCMS = Omit<Product, "coverImage"> & {
    coverImage: {url: string};
};

export interface CMSResponse {
    teas: TeaFromCMS[];
}

type ZustandFlipper = (config: StateCreator<ProductState>) => StateCreator<ProductState>;

export const useProductStore = create((zustandFlipper as ZustandFlipper)(set => ({
    products: [],
    addProduct: (newProduct: Product) =>
        set(state => ({products: [...state.products, newProduct]}), false, "addProduct"),
    setProducts: (products: Product[]) =>
        set(() => ({products}), false, "setProducts"),
})));
