import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import Router from './src/router';
import { AuthContextProvider } from './src/hooks/authContext';
import * as Font from 'expo-font';

const getFonts = () => Font.loadAsync({
  'kanit-regular': require('./assets/fonts/Kanit-Regular.ttf'),
  'kanit-bold': require('./assets/fonts/Kanit-Bold.ttf'),
  'kanit-light': require('./assets/fonts/Kanit-Light.ttf'),
  'kanit-semibold': require('./assets/fonts/Kanit-SemiBold.ttf')
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const getAsyncData = async () => {
      await getFonts();
      setFontsLoaded(true);
    }
    getAsyncData ();
 }, [])

  if(fontsLoaded)
  {
    console.log("have fonts");
    return ( 
      <AuthContextProvider>
        <Router/>
      </AuthContextProvider>      
    );
  }
}
