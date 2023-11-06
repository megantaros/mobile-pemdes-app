import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import WarningIcon from '../../assets/icons/warning.svg';
import ButtonVariant from '../Form/Button';
import { GRAY_COLOR, WARNING_COLOR, WARNING_COLOR_LIGHT } from '../style';

interface Props {
    description: string;
    isVisible: boolean;
    onPress: () => void;
}

const ModalDanger: FC<Props> = ({ isVisible, onPress, description }) => {

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
                    <WarningIcon height={50} width={50} fill={WARNING_COLOR} />
                    <Text style={styles.titleModal}>Warning !</Text>
                </View>
                <Text style={styles.descModal}>{description}</Text>
                <View style={styles.modalAction}>
                    <ButtonVariant title="Ok" onPress={onPress} variant={{ backgroundColor: WARNING_COLOR, color: '#fff' }} />
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
        backgroundColor: WARNING_COLOR_LIGHT,
        padding: 15,
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    titleModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 18,
        color: WARNING_COLOR,
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

export default ModalDanger;
