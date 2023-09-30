import React, { FC } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { PRIMARY_COLOR } from './style';

interface Props {
    title: string;
    img: React.ReactNode;
    onPress: () => void;
}

const HorizontalItem: FC<Props> = ({ title, img, onPress }) => {

    return (
        <Pressable onPress={onPress}>
            <View style={styles.item}>
                <View style={styles.rowItem}>
                    <View style={styles.container}>
                        <Text style={styles.rowTitle}>{title}</Text>
                        <View style={styles.contentItem}>
                            {img}
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        height: 'auto',
        width: 135,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginRight: 10,
        padding: 10,
        borderLeftWidth: 3,
        borderLeftColor: PRIMARY_COLOR,
    },
    rowItem: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',
        overflow: 'hidden',
    },
    rowTitle: {
        fontSize: 12,
        height: 40,
        fontFamily: 'Viga-Regular',
        color: PRIMARY_COLOR,
    },
    contentItem: {
        backgroundColor: '#d4eaf7',
        height: 'auto',
        borderRadius: 10,
        padding: 10,
        width: '100%',
    },
});

export default HorizontalItem;
