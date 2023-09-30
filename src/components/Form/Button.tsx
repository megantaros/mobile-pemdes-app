import React, { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { PRIMARY_COLOR, PRIMARY_FONT } from '../style';

type variant = { color?: string, backgroundColor?: string };

interface Props {
    title: string;
    onPress?: () => void;
    variant?: variant;
}

const ButtonVariant: FC<Props> = ({ title, onPress, variant }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: variant?.backgroundColor,
            padding: 10,
            borderRadius: 10,
            marginTop: 30,
            width: '100%',
            maxHeight: 42,
        },
        text: {
            fontFamily: PRIMARY_FONT,
            fontSize: 14,
            color: variant?.color,
        },
    });
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

ButtonVariant.defaultProps = {
    variant: {
        backgroundColor: PRIMARY_COLOR,
        color: '#fff',
    },
};

export default ButtonVariant;
