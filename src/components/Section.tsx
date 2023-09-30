import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PRIMARY_COLOR } from './style';

type Props = {
    children: React.ReactNode;
    title?: string;
    text?: string;
}

const Section: FC<Props> = ({ children, title, text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {text && (
                <Text style={styles.text}>{text}</Text>
            )}

            <View style={{ marginBottom: 10 }} />

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
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontWeight: '400',
        color: PRIMARY_COLOR,
        textAlign: 'center',
    },
});

export default Section;
