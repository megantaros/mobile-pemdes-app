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
import RouteAuth from './src/pages/Routes/RouteAuth';
import { Provider } from 'react-redux';
import { stores } from './src/stores/store';
import HomeTabs from './src/pages/Routes/HomeTab';
import InfoAccount from './src/pages/Settings/InfoAccount';
import { PRIMARY_COLOR } from './src/components/style';
import StatusLetters from './src/pages/Settings/StatusLetters';
import FormKtp from './src/pages/Form/FormKtp';
import FormKk from './src/pages/Form/FormKk';
import DetailKk from './src/pages/DetailLetter/DetailKk';
import DetailKtp from './src/pages/DetailLetter/DetailKtp';

export type RootStackParamList = {
  SplashScreen: undefined;
  Register: undefined;
  Login: undefined;
  AuthRoutes: undefined;
  UpdateProfile: undefined;
  HomeTabs: undefined;
  InfoAccount: undefined;
  StatusLetters: undefined;
  FormKtp: undefined;
  FormKk: undefined;
  DetailKk: { id: string };
  DetailKtp: { id: string };
};

function AppWrapper() {

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
        <RootStack.Screen
          name="UpdateProfile"
          component={RouteAuth}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="InfoAccount"
          component={InfoAccount}
          options={{
            headerShown: true,
            title: 'Info Akun',
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Viga-Regular',
              fontSize: 16,
            },
            headerBackImage(props) {
              return (
                <LeftIcon
                  {...props}
                  width={24}
                  height={24}
                  fill="#fff"
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="StatusLetters"
          component={StatusLetters}
          options={{
            headerShown: true,
            title: 'Permohonan Surat',
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
              borderBottomLeftRadius: 20,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Viga-Regular',
              fontSize: 16,
            },
            headerBackImage(props) {
              return (
                <LeftIcon
                  {...props}
                  width={24}
                  height={24}
                  fill="#fff"
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="FormKtp"
          component={FormKtp}
          options={{
            headerShown: true,
            title: 'Form Surat Pengantar KTP',
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Viga-Regular',
              fontSize: 16,
            },
            headerBackImage(props) {
              return (
                <LeftIcon
                  {...props}
                  width={24}
                  height={24}
                  fill="#fff"
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="FormKk"
          component={FormKk}
          options={{
            headerShown: true,
            title: 'Form Surat Pengantar KK',
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Viga-Regular',
              fontSize: 16,
            },
            headerBackImage(props) {
              return (
                <LeftIcon
                  {...props}
                  width={24}
                  height={24}
                  fill="#fff"
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="DetailKk"
          component={DetailKk}
          options={{
            headerShown: true,
            title: 'Detail Surat Pengantar KK',
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Viga-Regular',
              fontSize: 16,
            },
            headerBackImage(props) {
              return (
                <LeftIcon
                  {...props}
                  width={24}
                  height={24}
                  fill="#fff"
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="DetailKtp"
          component={DetailKtp}
          options={{
            headerShown: true,
            title: 'Detail Surat Pengantar KTP',
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Viga-Regular',
              fontSize: 16,
            },
            headerBackImage(props) {
              return (
                <LeftIcon
                  {...props}
                  width={24}
                  height={24}
                  fill="#fff"
                />
              );
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <Provider store={stores}>
      <AppWrapper />
    </Provider>
  );
};

export default App;
