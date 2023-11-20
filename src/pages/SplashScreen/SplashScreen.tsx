import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, Image, LayoutAnimation, SafeAreaView, View, Platform, UIManager } from 'react-native';
import { RootStackParamList } from '../../../App';
import { useAppSelector } from '../../hooks/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen = ({ navigation }: Props) => {

    if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
    ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    LayoutAnimation.configureNext({
        duration: 1000,
        create: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.opacity,
        },
        update: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.opacity,
        },
        delete: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.opacity,
        },
    });

    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

    React.useEffect(() => {
        setTimeout(() => {
            isLoggedIn ? navigation.replace('HomeTabs') : navigation.replace('Login');
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/img/splash-screen.png')} style={styles.bgSplashScreen} />
            <View style={styles.section}>
                <Image source={require('../../assets/img/logo-kebumen.png')} style={styles.image} />
                <View style={styles.textHero}>
                    <Text style={styles.heading_1}>Portals Pelayanan</Text>
                    <Text style={styles.heading_2}>Pemdes Kembaran</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.textFooter}>© 2022 Copyright: Gita Megantara</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    bgSplashScreen: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        position: 'absolute',
    },
    section: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
    textHero: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    heading_1: {
        fontSize: 20,
        fontFamily: 'Viga-Regular',
        color: '#FFEBAD',
    },
    heading_2: {
        fontSize: 16,
        fontFamily: 'Viga-Regular',
        color: '#FFF',
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 30,
    },
    textFooter: {
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
        color: '#AFC7FB',
    },
});

export default SplashScreen;

