import request, { gql } from "graphql-request";
import create from "zustand";
import { CMS_BASE_URL } from "@env";

export interface Product {
    id: string,
    name: string,
    price: number,
    quantity: number,
}

interface ProductState {
    products: Product[],
    addProduct: (product: Product) => void,
    fetchProducts: () => void,
}

interface CMSResponse {
    teas: Product[]
}

export const useStore = create<ProductState>(set => ({
    products: [],
    addProduct: (newProduct: Product) => set(state => ({ products: [...state.products, newProduct] })),
    fetchProducts: async () => {
        const query = gql`
query MyQuery {
    teas {
    id
    name
    price
    quantity
    coverImage {
        url
    }
    }
}
                `;
        const { teas: fetchedProducts }: CMSResponse = await request(`${CMS_BASE_URL}`, query);
        set({ products: fetchedProducts });
    },
}));
