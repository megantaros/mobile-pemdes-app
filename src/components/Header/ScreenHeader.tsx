import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { PRIMARY_COLOR } from '../style';
import { Card, Divider } from 'react-native-paper';

const imageHeader = require('../../assets/img/header.png');

interface Props {
    title?: string;
    text?: string;
    body: React.ReactNode;
    action?: React.ReactNode;
}

export default function ScreenHeader({ title, text, body, action }: Props) {
    return (
        <>
            <Image source={imageHeader} style={styles.imgStyle} />
            <Card style={styles.cardStyle}>
                <Card.Content>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardText}>{text}</Text>
                    <Divider />
                    {body}
                </Card.Content>
                <Card.Actions style={styles.cardAction}>
                    {action}
                </Card.Actions>
            </Card>
        </>
    );
}

const styles = StyleSheet.create({
    imgStyle: {
        width: '100%',
        height: 260,
        objectFit: 'cover',
        resizeMode: 'cover',
        overflow: 'hidden',
    },
    cardStyle: {
        marginTop: -200,
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 10,
    },
    cardTitle: {
        fontFamily: 'Viga-Regular',
        fontSize: 14,
        color: PRIMARY_COLOR,
    },
    cardText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 10,
    },
    cardAction: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
    },
});
