/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
*/

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/pages/SplashScreen/SplashScreen';
import Login from './src/pages/Authentication/Login';
import RegisterScreen from './src/pages/Authentication/Register';
import RouteAuth from './src/pages/Routes/IsAuth';

export type RootStackParamList = {
  SplashScreen: undefined;
  Register: undefined;
  Login: undefined;
  AuthRoutes: undefined;
};

const App = () => {

  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="SplashScreen">
        <RootStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="AuthRoutes"
          component={RouteAuth}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
