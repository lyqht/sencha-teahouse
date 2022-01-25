import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";
import { RootStackParamList } from "./routes";
import CheckoutScreen from "./screens/CheckoutScreen";
import HomeScreen from "./screens/HomeScreen";
import SummaryScreen from "./screens/SummaryScreen";
import { useStore } from "./store";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const NavStack = () => (
    <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name={"Home"} component={HomeScreen} />
        <RootStack.Screen name={"Checkout"} component={CheckoutScreen} />
        <RootStack.Screen name={"Summary"} component={SummaryScreen} />
    </RootStack.Navigator>
);

const App: React.FC = () => {
    const fetchProducts = useStore(state => state.fetchProducts);
    fetchProducts();

    return (
        <NativeBaseProvider>
            <FlipperAsyncStorage />
            <NavigationContainer>
                <NavStack />
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;
