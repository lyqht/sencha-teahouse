import { Button, Divider, FlatList, HStack, Spacer, Text, VStack } from "native-base";
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
    let totalCost = 0;

    productsInCart.forEach(product => { totalCost += product.price * cart[product.id]; });

    return (
        <SafeAreaView>
            <FlatList h={"80%"} data={productsInCart} renderItem={({ item }: { item: Product }) => (<CheckoutListItem item={item} />)} />
            <VStack>
                <Divider />
                <HStack w={"80%"} mx={"auto"} py={2} borderRadius={3} >
                    <Text fontSize={"2xl"}>Total:</Text>
                    <Spacer />
                    <Text fontSize={"2xl"}>${totalCost.toFixed(2)}</Text>
                </HStack>
                <Button mt={2} w={"80%"} p={4} mx={"auto"}>
                Buy these items
                </Button>
            </VStack>
        </SafeAreaView>
    );
};

export default CheckoutScreen;
