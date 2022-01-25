import { AddIcon, Box, FlatList, HStack, IconButton, Image, Input, MinusIcon, Spacer, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { useStore } from "../store";
import { Product } from "../types/product";

const HomeScreen: React.FC = () => {
    const products = useStore(state => state.products);

    const _renderItem = ({ item }: { item: Product }) => {
        const { coverImage, name, price, quantity } = item;
        const maxQuantity = quantity;

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
                    <IconButton size={"md"} variant="solid" icon={<MinusIcon size="4" />}/>
                    <Input mx="3" textAlign={"center"} w={12} placeholder="0" keyboardType="number-pad" />
                    <IconButton size={"md"} variant="solid" icon={<AddIcon size="4" />} />
                </HStack>
            </HStack>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
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
