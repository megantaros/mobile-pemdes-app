import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import HomeIcon from '../../assets/icons/grid-fill.svg';
import { PRIMARY_COLOR } from '../../components/style';
import ServiceScreen from './ServiceScreen';
import AccountScreen from './AccountScreen';

type RootTabParamList = {
    Home: undefined;
    Service: undefined;
    Account: undefined;
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function HomeTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={
                {
                    tabBarActiveTintColor: '#d4eaf7',
                    tabBarInactiveTintColor: '#fff',
                    tabBarLabelStyle: {
                        marginVertical: 0,
                        fontFamily: 'Viga-Regular',
                        fontSize: 10,
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
                        height: 45,
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
                    tabBarLabel: 'Service',
                    tabBarIcon: ({ color }) => (
                        <HomeIcon fill={color} width={20} height={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <HomeIcon fill={color} width={20} height={20} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
