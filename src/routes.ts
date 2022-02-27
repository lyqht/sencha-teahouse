import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    Checkout: undefined;
    Summary: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
