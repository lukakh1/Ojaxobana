// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { openDatabase } from './src/Datas/patarebisData';

import { Provider } from 'aniuta';

import HomeScreen from './src/screens/HomeScreen';
import QuestionsScreen from './src/screens/QuestionsScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

// SplashScreen.preventAutoHideAsync();

function App() {
  // const [dbLoaded, setDbLoaded] = useState(false);
  // const [isReady, setisReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Asomtavruli: require('./assets/fonts/Asomtavruli.ttf'),
    Helvetica: require('./assets/fonts/Helvetica.ttf'),
    banner: require('./assets/fonts/banner.ttf'),
  });
  const [dbLoaded, setDbLoaded] = useState(false);

  async function loadDb() {
    await openDatabase();
    setDbLoaded(true);
  }
  useEffect(() => {
    loadDb();
  }, []);
  // const onLayoutRootView = useCallback(async () => {
  //   if (isReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isReady]);

  // if (!isReady) {
  //   return null;
  // }
  if (fontsLoaded && dbLoaded) {
    return (
      <Provider
      // onLayout={onLayoutRootView}
      >
        <StatusBar style='auto' />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Questions' component={QuestionsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
