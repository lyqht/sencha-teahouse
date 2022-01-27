import { AddIcon, FlatList, HStack, IconButton, Image, Input, MinusIcon, Spacer, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { Product } from "../types/product";

const HomeScreen: React.FC = () => {
    const products = useProductStore(state => state.products);
    const { cart, addToCart, addToCartInQty, removeFromCart } = useUserStore();
    // const [itemsInCart, setItemsInCart] = useState(cart);


    const _renderItem = ({ item }: { item: Product }) => {
        const { coverImage, name, price, quantity, id } = item;
        const displayValue = cart[id] != null ? cart[id] : 0;

        //TODO:  reduce re-rendering, only make the row affected re-render
        console.log({cart});

        return (
            <HStack>
                <Image size={"120"} source={{uri: coverImage}} alt={name} />
                <VStack paddingX={4} paddingTop={4}>
                    <Text fontSize={"md"}>{name}</Text>
                    <Text fontSize={"xl"}>${price}</Text>
                    <Spacer />
                    <Text m={0} p={0}>{quantity}px left</Text>
                </VStack>
                <HStack position={"absolute"} right={0} bottom={0} mx={6} h={8}>
                    <Spacer />
                    <IconButton size={"md"} variant={`${displayValue === 0 ? "disabled" : "solid"}`} icon={<MinusIcon size="4" />} isDisabled={displayValue === 0} onPress={() => {removeFromCart(item);}}/>
                    <Input mx="3" textAlign={"center"} w={12} keyboardType="number-pad" defaultValue="0" value={`${displayValue}`} onChangeText={(text) => {
                        const userInputQty = parseInt(text);
                        if ( userInputQty < quantity) {
                            addToCartInQty(item, userInputQty);
                        } }} />
                    <IconButton size={"md"} variant={`${displayValue === quantity ? "disabled" : "solid"}`} icon={<AddIcon size="4" />} isDisabled={displayValue === quantity} onPress={() => { addToCart(item); }} />
                </HStack>
            </HStack>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text>In cart: { Object.keys(cart).length !== 0 ? Object.values(cart).reduce((a, b) => a + b) : 0 }</Text>
            <FlatList w={"full"} keyExtractor={(item, index) => `${item}+${index}`} data={products} renderItem={_renderItem} />
        </SafeAreaView>
    );
};

interface Styles {
    container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#ecf0f1",
    },
});

export default HomeScreen;
