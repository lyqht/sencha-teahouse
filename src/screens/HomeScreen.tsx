import { useNavigation } from "@react-navigation/native";
import { Badge, Box, FlatList, Icon, IconButton, VStack } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { SvgUri } from "react-native-svg";
import ProductListItem from "../components/ProductListItem";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { Product } from "../types/product";
import { RootStackParamList } from "../routes";

const CartDisplay = () => {
    const navigator = useNavigation<RootStackParamList>();
    const { cart } = useUserStore();
    const qtyInCart = Object.keys(cart).length !== 0 ? Object.values(cart).reduce((a, b) => a + b) : 0;
    return (
        <Box
            alignItems="flex-end" bg="white" zIndex={2} w="full" position={"absolute"} bottom={30} p={1} px={4} >
            <VStack>
                <Badge // bg="red.400"
                    colorScheme="primary" rounded="full" mb={-8} mr={-2} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                        fontSize: 12,
                    }}>
                    {qtyInCart}
                </Badge>

                <IconButton
                    icon={<Icon as={
                        <SvgUri width="48" height="48" uri={"https://api.iconify.design/icon-park-outline:tea-drink.svg"} />
                    }
                    />}
                    bg={"white"}
                    borderRadius={50}
                    mt={2}
                    onPress={() => {navigator.navigate("Checkout");}}
                />
            </VStack>
        </Box>
    );
};

const HomeScreen: React.FC = () => {
    const products = useProductStore(state => state.products);
    const _renderItem = ({ item }: { item: Product }) => {
        const productListItemProps = {item};
        return (
            <ProductListItem {...productListItemProps} />
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <CartDisplay />
            <FlatList w={"full"} keyExtractor={(item) => `${item.id}`} data={products} renderItem={_renderItem} />
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
