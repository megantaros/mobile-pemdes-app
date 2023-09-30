import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UpdateProfile from '../Authentication/UpdateProfile';
import HomeTabs from './HomeTab';

export type AuthStackParamList = {
    UpdateProfile: undefined;
    HomeTabs: undefined;
};

const RouteAuth = () => {

    const AuthStack = createStackNavigator<AuthStackParamList>();

    return (
        <AuthStack.Navigator initialRouteName="HomeTabs">
            <AuthStack.Screen
                name="UpdateProfile"
                component={UpdateProfile}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
};

export default RouteAuth;

