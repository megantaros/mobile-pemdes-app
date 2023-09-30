import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    children: React.ReactNode;
    color?: string;
    style?: any;
}

const Card: FC<Props> = ({ children, color, style }) => {
    return (
        <View style={[styles.container, { backgroundColor: color }, style]}>
            {children}
        </View>
    );
};

Card.defaultProps = {
    color: '#fff',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
});

export default Card;
