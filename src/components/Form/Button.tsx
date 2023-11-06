import React, { FC } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { PRIMARY_COLOR } from '../style';

type variant = { color?: string, backgroundColor?: string };

interface Props {
    title: string;
    onPress?: () => void;
    variant?: variant;
    isLoading?: boolean;
    margin?: number;
    icon?: React.ReactNode;
}

const ButtonVariant: FC<Props> = ({ title, onPress, variant, isLoading, margin, icon }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: variant?.backgroundColor,
            padding: 10,
            borderRadius: 10,
            marginTop: margin,
            width: '100%',
            maxHeight: 42,
            flexDirection: 'row',
            gap: 5,
        },
        text: {
            fontFamily: 'Viga-Regular',
            fontSize: 14,
            color: variant?.color,
        },
    });

    return (
        <Pressable style={styles.container} onPress={onPress}>
            {icon}
            <Text style={styles.text}>{title}</Text>
            {isLoading && <ActivityIndicator size={'small'} color={'#fff'} />}
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
