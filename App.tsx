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
import { Provider } from 'react-redux';
import { stores } from './src/stores/store';
import HomeTabs from './src/pages/Routes/HomeTab';
import { useAppSelector } from './src/hooks/hooks';
import InfoAccount from './src/pages/Settings/InfoAccount';
import UpdatePass from './src/pages/Authentication/UpdatePass';
import { PRIMARY_COLOR } from './src/components/style';
import Letters from './src/pages/Settings/Letters';
import FormDomisili from './src/pages/Form/FormDomisili';
import DetailDomisili from './src/pages/DetailLetter/DetailDomisili';

export type RootStackParamList = {
  SplashScreen: undefined;
  Register: undefined;
  Login: undefined;
  HomeTabs: undefined;
  HomeScreen: undefined;
  ServiceScreen: undefined;
  FormKtp: undefined;
  FormKk: undefined;
  FormDomisili: undefined;
  SettingScreen: undefined;
  InfoAccount: undefined;
  ModalUpdatePassword: { id_warga: string };
  LettersStack: undefined;
  Letters: undefined;
  DetailKk: { id: string };
  DetailKtp: { id: string };
  DetailDomisili: { id: string };
};

function AppWrapper() {

  const RootStack = createStackNavigator<RootStackParamList>();
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

  function screenOptions(title: string) {
    return (
      {
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: PRIMARY_COLOR,
          elevation: 0,
        },
        // headerTransparent: true,
        title: title,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Viga-Regular',
          fontSize: 16,
        },
      }
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="SplashScreen">

        <RootStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false, headerTruncatedBackTitle: '' }}
        />

        {isLoggedIn ? (
          <>
            <RootStack.Group>
              <RootStack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="InfoAccount"
                component={InfoAccount}
                options={screenOptions('Info Akun')}
              />
              <RootStack.Screen
                name="FormDomisili"
                component={FormDomisili}
                options={screenOptions('Form Domisili')}
              />
              <RootStack.Screen
                name="DetailDomisili"
                component={DetailDomisili}
                options={screenOptions('Detail Surat')}
              />
              <RootStack.Screen
                name="Letters"
                component={Letters}
                options={screenOptions('Status Surat')}
              />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
              <RootStack.Screen
                name="ModalUpdatePassword"
                component={UpdatePass}
                options={screenOptions('Update Password')}
              />
            </RootStack.Group>
          </>
        ) : (
          <RootStack.Group>
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
          </RootStack.Group>
        )}

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
