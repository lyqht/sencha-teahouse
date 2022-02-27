import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import React, { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";
import { RootStackParamList } from "./routes";
import CheckoutScreen from "./screens/CheckoutScreen";
import HomeScreen from "./screens/HomeScreen";
import SummaryScreen from "./screens/SummaryScreen";
import { useProductStore } from "./stores/product";
import { useUserStore } from "./stores/user";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const NavStack = () => (
    <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name={"Home"} component={HomeScreen} options={{
            title: "Sencha Teahouse",
        }} />
        <RootStack.Screen name={"Checkout"} component={CheckoutScreen} />
        <RootStack.Screen name={"Summary"} component={SummaryScreen} />
    </RootStack.Navigator>
);

const App: React.FC = () => {
    const fetchProducts = useProductStore(state => state.fetchProducts);
    fetchProducts();

    const appState = useRef(AppState.currentState);
    const { setItem, getItem } = useAsyncStorage("cart");
    let { setCart, cart } = useUserStore();


    useEffect(() => {
        (async () => {
            const retrievedCart = await getItem();
            if (retrievedCart !== null) {
                setCart(JSON.parse(retrievedCart));
            }
        })();
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (
                appState.current.match(/inactive|background/)
            ) {
                setItem(JSON.stringify(cart))
                    .then(() => {console.log("Set cart in async storage");})
                    .catch(console.error);
                console.log("App has gone inactive!");
            }

            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, [cart]);

    return (
        <NativeBaseProvider>
            <FlipperAsyncStorage />
            <SafeAreaProvider>
                <NavigationContainer>
                    <NavStack />
                </NavigationContainer>
            </SafeAreaProvider>
        </NativeBaseProvider>
    );
};

export default App;
