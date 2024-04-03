import React from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import authRoutes from "./auth.router";
import gameRoutes from "./game.router";
import { useAuth } from "../hooks/authContext";
import { Text, ActivityIndicator } from "react-native";
import { Colours } from "../styles/colours"

const Router: React.FC  = () => {
    const auth = useAuth();
    
    if(auth.isLoading) {
        return (
            <SafeAreaView style = {
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }
            }>
                <ActivityIndicator size = "large" color = {Colours.PINK} />
            </SafeAreaView>
        )
    }

    return (
        <NavigationContainer>
            {auth.token ? gameRoutes:authRoutes}
        </NavigationContainer>
    )
}

export default Router;