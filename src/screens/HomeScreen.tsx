import { FlatList, Text } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { Product, useStore } from "../store";

const HomeScreen: React.FC = () => {
    const products = useStore(state => state.products);


    const _renderItem = ({ item }: { item: Product }) => {
        return (
            <Text>{item.name}</Text>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlatList keyExtractor={(item, index) => `${item}+${index}`} data={products} renderItem={_renderItem} />
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
