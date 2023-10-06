import React from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from './style';

const Loading = () => {
    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.container}>
                <ActivityIndicator size="small" color={PRIMARY_COLOR} />
                <Text style={styles.text}>Mohon Tunggu...</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 20,
        // backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    text: {
        fontFamily: 'Viga-Regular',
        fontSize: 12,
        color: PRIMARY_COLOR,
    },
});

export default Loading;
