import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from './style';
import Modal from 'react-native-modal';

const Loading = () => {
    return (
        <Modal
            style={styles.body}
            isVisible={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={500}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
        >
            <View style={styles.container}>
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                <Text style={styles.text}>Mohon Tunggu...</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 20,
        width: '50%',
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'column',
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
