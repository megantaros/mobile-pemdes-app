import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const logoKebumen = require('../../assets/img/logo-kebumen.png');

interface Props {
    title?: string;
    description?: string;
}

const HeaderLogo = ({ title, description }: Props) => {
    return (
        <View style={styles.container}>
            <Image source={logoKebumen} style={styles.logo} />
            <View style={styles.row}>
                <Text style={styles.textTitle}>{title}</Text>
                <Text style={styles.textDescription}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 58,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    logo: {
        height: 58,
        maxWidth: 58,
        resizeMode: 'contain',
    },
    textTitle: {
        color: '#FFEBAD',
        fontFamily: 'Viga-Regular',
        fontSize: 16,
    },
    textDescription: {
        color: '#FFF',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        maxWidth: 200,
    },
});

export default HeaderLogo;
