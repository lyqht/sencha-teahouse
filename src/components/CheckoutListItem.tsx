import { AddIcon, Box, CloseIcon, Divider, HStack, IconButton, Image, Input, MinusIcon, Spacer, Text, VStack } from "native-base";
import React, { useCallback } from "react";
import { useUserStore } from "../stores/user";
import { Product } from "../types/product";

interface Props {
    item: Product,
}

const CheckoutListItem: React.FC<Props> = ({ item }) => {
    const { addToCart, addToCartInQty, removeOneFromCart, removeFromCart } = useUserStore();
    const { coverImage, name, price, quantity, id } = item;
    const quantityInCart = useUserStore(useCallback(state => state.cart[id], [id]));
    const displayValue = quantityInCart != null ? quantityInCart : 0;

    const totalCost = price * quantityInCart;

    return (
        <Box>
            <HStack>
                <Image w={"40%"} source={{uri: coverImage}} alt={name} />
                <VStack w={"60%"} paddingX={4} py={4} mb={6}>
                    <IconButton position={"absolute"} right={0} p={5} icon={<CloseIcon size={4} />} onPress={() => {removeFromCart(item);}} />

                    <Text fontSize={"md"} mr={6}>{name}</Text>
                    <Text>${price} per pc</Text>
                    <HStack my={4} mr={2}>
                        <Spacer />
                        <Text fontSize={"2xl"}>${totalCost.toFixed(2)}</Text>
                    </HStack>
                </VStack>
                <HStack position={"absolute"} right={0} bottom={4} mx={6} h={8}>
                    <Spacer />
                    <IconButton size={"md"} variant={`${displayValue === 1 ? "disabled" : "outline"}`} icon={<MinusIcon size="4" />} isDisabled={displayValue === 1} onPress={() => {removeOneFromCart(item);}}/>
                    <Input mx="3" textAlign={"center"} w={12} keyboardType="number-pad" defaultValue="0" value={`${displayValue}`} onChangeText={(text) => {
                        const userInputQty = parseInt(text, 10);
                        if ( userInputQty < quantity) {
                            addToCartInQty(item, userInputQty);
                        } }} />
                    <IconButton size={"md"} variant={`${displayValue === quantity ? "disabled" : "outline"}`} icon={<AddIcon size="4" />} isDisabled={displayValue === quantity} onPress={() => { addToCart(item); }} />
                </HStack>
            </HStack>
            <Divider orientation="horizontal" />
        </Box>
    );
};

export default CheckoutListItem;
