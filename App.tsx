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
import Register from './src/pages/Authentication/Register';
import Login from './src/pages/Authentication/Login';
import UpdateProfile from './src/pages/Authentication/UpdateProfile';
import HomeTabs from './src/pages/Menu/HomeTab';
import RegisterScreen from './src/pages/Authentication/Register';

export type RootStackParamList = {
  SplashScreen: undefined;
  Register: undefined;
  Login: undefined;
  UpdateProfile: undefined;
  HomeTabs: undefined;
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
          name="UpdateProfile"
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
