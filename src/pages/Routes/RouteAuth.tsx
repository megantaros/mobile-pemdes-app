import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UpdateProfile from '../Authentication/UpdateProfile';
import HomeTabs from './HomeTab';
import InfoAccount from '../Settings/InfoAccount';
import { PRIMARY_COLOR } from '../../components/style';
import LeftIcon from '../../assets/icons/left-arrow.svg';
import StatusLetters from '../Settings/StatusLetters';
import DetailKk from '../DetailLetter/DetailKk';
import DetailKtp from '../DetailLetter/DetailKtp';
import FormKtp from '../Form/FormKtp';
import FormKk from '../Form/FormKk';

export type AuthStackParamList = {
    UpdateProfile: undefined;
    HomeTabs: undefined;
    InfoAccount: undefined;
    StatusLetters: undefined;
    FormKtp: undefined;
    FormKk: undefined;
    DetailKk: { id: string };
    DetailKtp: { id: string };
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
            <AuthStack.Screen
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
            <AuthStack.Screen
                name="StatusLetters"
                component={StatusLetters}
                options={{
                    headerShown: true,
                    title: 'Permohonan Surat',
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
            <AuthStack.Screen
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
            <AuthStack.Screen
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
            <AuthStack.Screen
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
            <AuthStack.Screen
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
        </AuthStack.Navigator>
    );
};

export default RouteAuth;

