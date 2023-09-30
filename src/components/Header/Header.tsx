import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../style';
import ListIcon from '../../assets/icons/list.svg';

const logoKebumen = require('../../assets/img/logo-kebumen.png');
const avatar = require('../../assets/img/man.png');

const Header = () => {
    return (
        <View style={styles.container}>
            <Image source={logoKebumen} style={styles.image} />
            <View style={styles.containerText}>
                <Text style={styles.title}>Portal Pelayanan</Text>
                <Text style={styles.text}>Pemdes Kembaran</Text>
            </View>
            <ListIcon width={30} height={30} fill={'#fff'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_COLOR,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomEndRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
        flexDirection: 'row',
        gap: 5,
    },
    image: { width: 40, height: 40 },
    containerText: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 40,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
        fontFamily: 'Viga-Regular',
    },
    text: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Viga-Regular',
    },
});

export default Header;
