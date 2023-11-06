import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import XCircelIcon from '../../assets/icons/x-circle.svg';
import ButtonVariant from '../Form/Button';
import { DANGER_COLOR, DANGER_COLOR_LIGHT, GRAY_COLOR, PRIMARY_COLOR } from '../style';

interface Props {
    description: string;
    isVisible: boolean;
    onPress: () => void;
}

const ModalError: FC<Props> = ({ isVisible, onPress, description }) => {

    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={500}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
        >
            <View style={styles.contentModal}>
                <View style={styles.headerModal}>
                    <XCircelIcon height={50} width={50} />
                    <Text style={styles.titleModal}>Error !</Text>
                </View>
                <Text style={styles.descModal}>{description}</Text>
                <View style={styles.modalAction}>
                    <ButtonVariant title="Ok" onPress={onPress} variant={{ backgroundColor: DANGER_COLOR, color: '#fff' }} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    contentModal: {
        borderRadius: 20,
        maxHeight: '50%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    headerModal: {
        backgroundColor: DANGER_COLOR_LIGHT,
        padding: 15,
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    titleModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 14,
        color: DANGER_COLOR,
    },
    descModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 12,
        color: GRAY_COLOR,
        textAlign: 'center',
    },
    modalAction: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default ModalError;
