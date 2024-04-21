import React, { createContext, useContext, useEffect, useState } from "react";
import { login, register, getUserId } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContext {
    token: string;
    setToken: (token: string) => void; 
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
    token: '',
    setToken: (token: string) => {},
    login: async () => {},
    register: async () => {},
    isLoading: false
})

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    const result = await getUserId(value); //if bad token
                    setToken(value);
                } else {
                    console.log("error null token");
                }
            } catch (error) {
                setToken('');
                console.log("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    },[])

    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await login(email, password);
            setToken(result);
            await AsyncStorage.setItem('token', result);
        } catch (error) {
            console.log(error)
        }
    };
    const handleRegister = async (email: string, password: string) => {
        try {
            const result = await register(email, password);
            console.log(result);
            //setToken(result);
            //await AsyncStorage.setItem("token", result);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            setToken: setToken,
            login: handleLogin,
            register: handleRegister,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
