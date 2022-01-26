import {CMS_BASE_URL} from "@env";
import request, {gql} from "graphql-request";
import create from "zustand";
import {Product} from "./types/product";

interface ProductState {
    products: Product[];
    addProduct: (product: Product) => void;
    fetchProducts: () => void;
}

type TeaFromCMS = Omit<Product, "coverImage"> & {
    coverImage: {url: string};
};

interface CMSResponse {
    teas: TeaFromCMS[];
}

export const useStore = create<ProductState>(set => ({
    products: [],
    addProduct: (newProduct: Product) =>
        set(state => ({products: [...state.products, newProduct]})),
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
        const {teas: fetchedProducts}: CMSResponse = await request(
            `${CMS_BASE_URL}`,
            query,
        );
        set({
            products: fetchedProducts.map(product => ({
                ...product,
                coverImage: product.coverImage.url,
            })),
        });
    },
}));
