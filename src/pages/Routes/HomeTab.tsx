import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeIcon from '../../assets/icons/grid-fill.svg';
import ServiceIcon from '../../assets/icons/envelope-plus-fill.svg';
import AccountIcon from '../../assets/icons/gear-fill.svg';
import HomeScreen from '../Menu/HomeScreen';
import ServiceScreen from '../Menu/ServiceScreen';
import AccountScreen from '../Menu/AccountScreen';
import { PRIMARY_COLOR } from '../../components/style';
import { useAppSelector } from '../../hooks/hooks';

export type RootTabParamList = {
    Home: undefined;
    Service: undefined;
    Account: undefined;
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function HomeTabs() {

    const getUser = useAppSelector(state => state.user);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={
                {
                    tabBarActiveTintColor: '#d4eaf7',
                    tabBarInactiveTintColor: '#fff',
                    tabBarLabelStyle: {
                        fontFamily: 'Viga-Regular',
                        fontSize: 10,
                        marginBottom: 4,
                    },
                    tabBarIconStyle: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    tabBarStyle: {
                        backgroundColor: PRIMARY_COLOR,
                        borderTopWidth: 0,
                        elevation: 0,
                        height: 50,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                }
            }
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Beranda',
                    tabBarIcon: ({ color }) => (
                        <HomeIcon fill={color} width={20} height={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="Service"
                component={ServiceScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Layanan',
                    tabBarIcon: ({ color }) => (
                        <ServiceIcon fill={color} width={20} height={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Pengaturan',
                    tabBarIcon: ({ color }) => (
                        <AccountIcon fill={color} width={20} height={20} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
