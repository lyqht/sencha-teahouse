import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import {
    Badge,
    Box,
    Button, Icon,
    IconButton,
    Text,
    VStack,
} from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import { SvgUri } from "react-native-svg";
import ProductListItem from "../components/ProductListItem";
import { NavigationProps } from "../routes";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { Product } from "../types/product";

const CartDisplay = () => {
    const navigator = useNavigation<NavigationProps>();
    const {cart} = useUserStore();
    const qtyInCart =
        Object.keys(cart).length !== 0
            ? Object.values(cart).reduce((a, b) => a + b)
            : 0;
    return (
        <Box alignItems="flex-end" bg="white" zIndex={2} w="full" p={1} px={4}>
            <VStack>
                <Badge
                    colorScheme="primary"
                    rounded="full"
                    mb={-8}
                    mr={-2}
                    zIndex={1}
                    variant="solid"
                    alignSelf="flex-end"
                    _text={{
                        fontSize: 12,
                    }}>
                    {qtyInCart}
                </Badge>

                <IconButton
                    icon={
                        <Icon
                            as={
                                <SvgUri
                                    width="48"
                                    height="48"
                                    uri={
                                        "https://api.iconify.design/icon-park-outline:tea-drink.svg"
                                    }
                                />
                            }
                        />
                    }
                    bg={"white"}
                    borderRadius={50}
                    mt={2}
                    onPress={() => {
                        navigator.navigate("Checkout");
                    }}
                />
            </VStack>
        </Box>
    );
};

const HomeScreen: React.FC = () => {
    const products = useProductStore(state => state.products);
    const listRef = React.useRef<FlashList<Product>>(null);
    const _renderItem = ({item}: {item: Product}) => {
        const productListItemProps = {item};
        return <ProductListItem {...productListItemProps} />;
    };
    const scrollToTop = () => {
        listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };
    return (
        <SafeAreaView>
            <VStack h="full">
                <FlashList
                    ref={listRef}
                    keyExtractor={item => `${item.id}`}
                    data={products}
                    renderItem={_renderItem}
                    ListFooterComponent={
                        <VStack py={4} mx={"auto"}>
                            <Text fontSize={"xl"}>
                                That's all of our menu~
                            </Text>
                            <Button variant={"outline"} onPress={() => {scrollToTop();}}>
                                Scroll back to top
                            </Button>
                        </VStack>
                    }
                />
                <CartDisplay />
            </VStack>
        </SafeAreaView>
    );
};

export default HomeScreen;
