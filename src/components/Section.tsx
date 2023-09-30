import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PRIMARY_COLOR } from './style';

type Props = {
    children: React.ReactNode;
    title?: string;
}

const Section: FC<Props> = ({ children, title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {/* <Text style={styles.text}>Misi</Text> */}

            <View style={{ marginBottom: 5 }} />

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontFamily: 'Viga-Regular',
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
});

export default Section;
