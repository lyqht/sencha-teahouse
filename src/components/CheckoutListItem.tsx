import { AddIcon, HStack, IconButton, Image, Input, MinusIcon, Spacer, Text, VStack } from "native-base";
import React, { useCallback } from "react";
import { useUserStore } from "../stores/user";
import { Product } from "../types/product";

interface Props {
    item: Product,
}

const CheckoutListItem: React.FC<Props> = ({ item }) => {
    const { addToCart, addToCartInQty, removeFromCart } = useUserStore();
    const { coverImage, name, price, quantity, id } = item;
    const quantityInCart = useUserStore(useCallback(state => state.cart[id], [id]));
    const displayValue = quantityInCart != null ? quantityInCart : 0;

    const totalCost = price * quantityInCart;

    return (
        <HStack>
            <Image size={"120"} source={{uri: coverImage}} alt={name} />
            <VStack paddingX={4} paddingTop={4}>
                <Text fontSize={"md"}>{name}</Text>
                <Text fontSize={"xl"}>${totalCost.toFixed(2)}</Text>
                <Spacer />
                <Text m={0} p={0}>${price} per pc</Text>
            </VStack>
            <HStack position={"absolute"} right={0} bottom={0} mx={6} h={8}>
                <Spacer />
                <IconButton size={"md"} variant={`${displayValue === 0 ? "disabled" : "outline"}`} icon={<MinusIcon size="4" />} isDisabled={displayValue === 0} onPress={() => {removeFromCart(item);}}/>
                <Input mx="3" textAlign={"center"} w={12} keyboardType="number-pad" defaultValue="0" value={`${displayValue}`} onChangeText={(text) => {
                    const userInputQty = parseInt(text, 10);
                    if ( userInputQty < quantity) {
                        addToCartInQty(item, userInputQty);
                    } }} />
                <IconButton size={"md"} variant={`${displayValue === quantity ? "disabled" : "outline"}`} icon={<AddIcon size="4" />} isDisabled={displayValue === quantity} onPress={() => { addToCart(item); }} />
            </HStack>
        </HStack>
    );
};

export default CheckoutListItem;
