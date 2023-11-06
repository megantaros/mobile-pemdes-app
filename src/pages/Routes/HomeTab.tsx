import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeIcon from '../../assets/icons/grid-fill.svg';
import ServiceIcon from '../../assets/icons/envelope-plus-fill.svg';
import SettingIcon from '../../assets/icons/gear-fill.svg';
import HomeScreen from '../Menu/HomeScreen';
import { INFO_COLOR, PRIMARY_COLOR } from '../../components/style';
import { RootStackParamList } from '../../../App';
import ServiceScreen from '../Menu/ServiceScreen';
import SettingScreen from '../Menu/AccountScreen';

export default function HomeTabs() {

    const Tab = createBottomTabNavigator<RootStackParamList>();

    return (
        <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: INFO_COLOR,
            tabBarInactiveTintColor: '#fff',
            tabBarLabelStyle: {
                fontFamily: 'Viga-Regular',
                fontSize: 10,
                marginBottom: 4,
            },
            tabBarIconStyle: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarStyle: {
                backgroundColor: PRIMARY_COLOR,
                borderTopWidth: 0,
                elevation: 0,
                height: 55,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                position: 'relative',
            },
        }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Beranda',
                    tabBarIcon: ({ color }) => (
                        <HomeIcon fill={color} width={25} height={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="ServiceScreen"
                component={ServiceScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Layanan',
                    tabBarIcon: ({ color }) => (
                        <ServiceIcon fill={color} width={25} height={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="SettingScreen"
                component={SettingScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Pengaturan',
                    tabBarIcon: ({ color }) => (
                        <SettingIcon fill={color} width={25} height={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
