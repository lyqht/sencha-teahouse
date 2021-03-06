import { AddIcon, HStack, IconButton, Input, MinusIcon, Spacer, Text, VStack } from "native-base";
import React, { useCallback } from "react";
import FastImage from "react-native-fast-image";
import { useUserStore } from "../stores/user";
import { Product } from "../types/product";

interface Props {
    item: Product
}

const ProductListItem: React.FC<Props> = ({ item }) => {
    const { addToCart, addToCartInQty, removeFromCart } = useUserStore();
    const { coverImage, name, price, quantity, id } = item;
    const quantityInCart = useUserStore(useCallback(state => state.cart[id], [id]));
    const displayValue = quantityInCart != null ? quantityInCart : 0;

    return (
        <HStack>
            <FastImage style={{width: 120, height: 120}} source={{uri: coverImage}} accessibilityLabel={name} />
            <VStack paddingX={4} paddingTop={4}>
                <Text fontSize={"md"}>{name}</Text>
                <Text fontSize={"xl"}>${price}</Text>
                <Spacer />
                <Text m={0} p={0}>{quantity}px left</Text>
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

export default ProductListItem;
