import { Button, FlatList } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import CheckoutListItem from "../components/CheckoutListItem";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { Product } from "../types/product";

const CheckoutScreen: React.FC = () => {
    const { products } = useProductStore();
    const { cart } = useUserStore();
    const productsInCart = products.filter(product => Object.keys(cart).includes(product.id));

    return (
        <SafeAreaView>
            <FlatList h={"80%"} data={productsInCart} renderItem={({ item }: { item: Product }) => (<CheckoutListItem item={item} />)} />
            <Button mt={2} w={"80%"} p={4} mx={"auto"}>
                Buy these items
            </Button>
        </SafeAreaView>
    );
};

export default CheckoutScreen;
